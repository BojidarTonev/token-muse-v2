import { connectWallet, disconnectWallet, signMessage } from './wallet';

// Store auth token in localStorage
const TOKEN_KEY = 'agent_mint_auth_token';
const PUBLIC_KEY = 'agent_mint_public_key';

// Check if code is running in browser
const isBrowser = typeof window !== 'undefined';

// Connect to wallet and authenticate with backend
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const connectAndAuthenticate = async (): Promise<{ user: any; publicKey: string } | null> => {
  if (!isBrowser) return null;
  
  try {
    // Connect to wallet
    const publicKey = await connectWallet();
    
    if (!publicKey) {
      throw new Error('Failed to connect to wallet');
    }
    
    // Sign a message to prove ownership
    const timestamp = Date.now().toString();
    const message = `Sign this message to authenticate with AgentMint: ${timestamp}`;
    const signatureData = await signMessage(message);
    
    if (!signatureData) {
      throw new Error('Failed to sign message');
    }
    
    // Call the backend to authenticate
    const response = await fetch('/api/auth/connect', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        publicKey,
        signature: signatureData.signature,
        message,
        timestamp,
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Authentication failed');
    }
    
    const data = await response.json();
    
    // Store the token and public key
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(PUBLIC_KEY, publicKey);
    
    return {
      user: data.user,
      publicKey,
    };
  } catch (error) {
    console.error('Authentication error:', error);
    // If authentication fails, disconnect the wallet
    await disconnectWallet();
    return null;
  }
};

// Disconnect from wallet and clear auth data
export const disconnectAndLogout = async (): Promise<boolean> => {
  if (!isBrowser) return false;
  
  try {
    // Disconnect from wallet
    await disconnectWallet();
    
    // Clear auth data
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(PUBLIC_KEY);
    
    return true;
  } catch (error) {
    console.error('Logout error:', error);
    return false;
  }
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  if (!isBrowser) {
    return false;
  }
  
  return !!localStorage.getItem(TOKEN_KEY) && !!localStorage.getItem(PUBLIC_KEY);
};

// Get the stored auth token
export const getAuthToken = (): string | null => {
  if (!isBrowser) {
    return null;
  }
  
  return localStorage.getItem(TOKEN_KEY);
};

// Get the stored public key
export const getPublicKey = (): string | null => {
  if (!isBrowser) {
    return null;
  }
  
  return localStorage.getItem(PUBLIC_KEY);
};

// Add auth headers to fetch requests
export const addAuthHeaders = (headers: HeadersInit = {}): HeadersInit => {
  const token = getAuthToken();
  const publicKey = getPublicKey();
  
  if (!token || !publicKey) {
    return headers;
  }
  
  return {
    ...headers,
    'x-auth-token': token,
    'x-public-key': publicKey,
  };
}; 