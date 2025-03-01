'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

// Define the context type
type WalletContextType = {
  publicKey: string | null;
  isConnecting: boolean;
  isConnected: boolean;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
};

// Create context with default values
const WalletContext = createContext<WalletContextType>({
  publicKey: null,
  isConnecting: false,
  isConnected: false,
  connect: async () => {},
  disconnect: async () => {},
});

// Hook to use the wallet context
export const useWallet = () => useContext(WalletContext);

// Provider component
export function WalletProvider({ children }: { children: ReactNode }) {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  // Check for existing connection on mount
  useEffect(() => {
    const savedPublicKey = localStorage.getItem('walletPublicKey');
    if (savedPublicKey) {
      setPublicKey(savedPublicKey);
      setIsConnected(true);
    }
  }, []);

  // Connect wallet function
  const connect = async () => {
    try {
      setIsConnecting(true);
      
      // Mock connection - in a real app, this would interact with a wallet
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate a mock public key
      const mockPublicKey = 'wallet' + Math.random().toString(36).substring(2, 10);
      
      // Save to state and localStorage
      setPublicKey(mockPublicKey);
      setIsConnected(true);
      localStorage.setItem('walletPublicKey', mockPublicKey);
      
      toast.success('Wallet connected successfully');
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      toast.error('Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  };

  // Disconnect wallet function
  const disconnect = async () => {
    try {
      setIsConnecting(true);
      
      // Mock disconnection
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Clear state and localStorage
      setPublicKey(null);
      setIsConnected(false);
      localStorage.removeItem('walletPublicKey');
      
      toast.success('Wallet disconnected');
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
      toast.error('Failed to disconnect wallet');
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <WalletContext.Provider
      value={{
        publicKey,
        isConnecting,
        isConnected,
        connect,
        disconnect,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
} 