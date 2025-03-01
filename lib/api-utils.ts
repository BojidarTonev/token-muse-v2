/**
 * Utility functions for API requests
 */

// Constants for local storage keys
const TOKEN_KEY = 'token_muse_auth_token';

/**
 * Gets the auth token from local storage
 * @returns The auth token or null if not found
 */
export const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') {
    return null;
  }
  
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * Adds the public key and auth token to the request headers
 * @param publicKey The public key from the Redux store
 * @param headers Optional existing headers
 * @returns Headers with the public key and auth token added
 */
export const addAuthHeaders = (publicKey: string | null, headers: HeadersInit = {}): HeadersInit => {
  if (!publicKey) {
    return headers;
  }
  
  const authToken = getAuthToken();
  const newHeaders: HeadersInit = {
    ...headers,
    'x-public-key': publicKey,
  };
  
  if (authToken) {
    newHeaders['x-auth-token'] = authToken;
  }
  
  return newHeaders;
};

/**
 * Creates a fetch request with the public key and auth token headers
 * @param url The URL to fetch
 * @param publicKey The public key from the Redux store
 * @param options Optional fetch options
 * @returns The fetch response
 */
export const fetchWithPublicKey = async (
  url: string, 
  publicKey: string | null,
  options: RequestInit = {}
): Promise<Response> => {
  const headers = addAuthHeaders(publicKey, options.headers || {});
  
  return fetch(url, {
    ...options,
    headers,
  });
}; 