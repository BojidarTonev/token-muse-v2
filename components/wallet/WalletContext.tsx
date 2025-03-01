'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { connectWallet, disconnectWallet, isPhantomInstalled, signMessage } from '@/lib/wallet';
import { useAuth } from '@/hooks/useAuth';

// Define the context type
interface WalletContextType {
  isConnected: boolean;
  publicKey: string | null;
  isLoading: boolean;
  error: string | null;
  connect: () => Promise<boolean>;
  disconnect: () => Promise<boolean>;
  signMessage: (message: string) => Promise<{ signature: string } | null>;
}

// Create the context with default values
const WalletContext = createContext<WalletContextType>({
  isConnected: false,
  publicKey: null,
  isLoading: false,
  error: null,
  connect: async () => false,
  disconnect: async () => false,
  signMessage: async () => null,
});

// Provider component
export function WalletProvider({ children }: { children: ReactNode }) {
  // Use the auth hook to manage authentication state
  const { 
    isAuthenticated, 
    publicKey, 
    isLoading, 
    error, 
    connect: authConnect, 
    disconnect: authDisconnect 
  } = useAuth();

  // Connect to wallet
  const connect = async (): Promise<boolean> => {
    return await authConnect();
  };

  // Disconnect from wallet
  const disconnect = async (): Promise<boolean> => {
    return await authDisconnect();
  };

  // Sign a message
  const handleSignMessage = async (message: string) => {
    return await signMessage(message);
  };

  // Context value
  const value = {
    isConnected: isAuthenticated,
    publicKey,
    isLoading,
    error,
    connect,
    disconnect,
    signMessage: handleSignMessage,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
}

// Custom hook to use the wallet context
export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
} 