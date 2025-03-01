import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { 
  setLoading, 
  setError, 
  setAuthenticated, 
  clearAuthentication 
} from '@/redux/features/app-state-slice';
import { 
  connectAndAuthenticate, 
  disconnectAndLogout, 
  isAuthenticated, 
  getPublicKey 
} from '@/lib/auth';
import { isPhantomInstalled } from '@/lib/wallet';

// Define a type for errors
interface ErrorWithMessage {
  message: string;
}

// Type guard to check if an error has a message property
function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as Record<string, unknown>).message === 'string'
  );
}

// Function to extract error message
function getErrorMessage(error: unknown): string {
  if (isErrorWithMessage(error)) {
    return error.message;
  }
  return String(error);
}

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated: isAuthenticatedState, publicKey, isLoading, error } = useAppSelector(state => state.appState);
  
  // Check if wallet is installed
  const isWalletInstalled = isPhantomInstalled();
  
  // Initialize auth state from localStorage on component mount
  useEffect(() => {
    const initializeAuth = () => {
      if (isAuthenticated()) {
        const storedPublicKey = getPublicKey();
        if (storedPublicKey) {
          dispatch(setAuthenticated({ publicKey: storedPublicKey }));
        }
      }
    };
    
    initializeAuth();
  }, [dispatch]);
  
  // Connect wallet and authenticate
  const connect = useCallback(async () => {
    if (!isWalletInstalled) {
      dispatch(setError('Phantom wallet is not installed'));
      return false;
    }
    
    dispatch(setLoading(true));
    dispatch(setError(null));
    
    try {
      const result = await connectAndAuthenticate();
      
      if (result) {
        dispatch(setAuthenticated({ publicKey: result.publicKey }));
        return true;
      } else {
        dispatch(setError('Failed to authenticate'));
        return false;
      }
    } catch (error: unknown) {
      dispatch(setError(getErrorMessage(error)));
      return false;
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, isWalletInstalled]);
  
  // Disconnect wallet and logout
  const disconnect = useCallback(async () => {
    dispatch(setLoading(true));
    
    try {
      const success = await disconnectAndLogout();
      
      if (success) {
        dispatch(clearAuthentication());
        return true;
      } else {
        dispatch(setError('Failed to logout'));
        return false;
      }
    } catch (error: unknown) {
      dispatch(setError(getErrorMessage(error)));
      return false;
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);
  
  return {
    isAuthenticated: isAuthenticatedState,
    publicKey,
    isLoading,
    error,
    isWalletInstalled,
    connect,
    disconnect
  };
}; 