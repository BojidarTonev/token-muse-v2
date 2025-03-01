import { PublicKey } from '@solana/web3.js';

// Define the Phantom provider interface
interface PhantomProvider {
  connect: () => Promise<{ publicKey: PublicKey }>;
  disconnect: () => Promise<void>;
  signMessage: (message: Uint8Array) => Promise<{ signature: Uint8Array }>;
  isPhantom: boolean;
  isConnected: boolean;
  publicKey: PublicKey | null;
}

// Get the Phantom provider from the window object
export const getProvider = (): PhantomProvider | null => {
  if (typeof window !== 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const provider = (window as any).solana;
    if (provider?.isPhantom) {
      return provider as PhantomProvider;
    }
  }
  return null;
};

// Check if Phantom is installed
export const isPhantomInstalled = (): boolean => {
  return getProvider() !== null;
};

// Connect to Phantom wallet
export const connectWallet = async (): Promise<string | null> => {
  try {
    const provider = getProvider();
    
    if (!provider) {
      throw new Error('Phantom wallet not installed');
    }
    
    const response = await provider.connect();
    const publicKey = response.publicKey.toString();
    
    return publicKey;
  } catch (error) {
    console.error('Error connecting to wallet:', error);
    return null;
  }
};

// Disconnect from Phantom wallet
export const disconnectWallet = async (): Promise<boolean> => {
  try {
    const provider = getProvider();
    
    if (!provider) {
      throw new Error('Phantom wallet not installed');
    }
    
    await provider.disconnect();
    return true;
  } catch (error) {
    console.error('Error disconnecting from wallet:', error);
    return false;
  }
};

// Sign a message with Phantom wallet
export const signMessage = async (message: string): Promise<{ signature: string } | null> => {
  try {
    const provider = getProvider();
    
    if (!provider) {
      throw new Error('Phantom wallet not installed');
    }
    
    if (!provider.publicKey) {
      throw new Error('Wallet not connected');
    }
    
    // Convert message to Uint8Array
    const messageBytes = new TextEncoder().encode(message);
    
    // Sign the message
    const { signature } = await provider.signMessage(messageBytes);
    
    // Convert signature to base64 string
    const signatureBase64 = Buffer.from(signature).toString('base64');
    
    return { signature: signatureBase64 };
  } catch (error) {
    console.error('Error signing message:', error);
    return null;
  }
}; 