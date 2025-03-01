'use client';

import { Button } from '@/components/ui/button';
import { Loader2, LogOut, Wallet } from 'lucide-react';
import { useWallet } from '@/context/WalletContext';
import { useAnimationPreference } from '@/hooks/useAnimationPreference';
import { motion } from 'framer-motion';

export default function WalletButton() {
  const { publicKey, isConnected, isConnecting, connect, disconnect } = useWallet();
  const { isEnabled } = useAnimationPreference();

  const formatPublicKey = (key: string) => {
    if (!key) return '';
    return `${key.slice(0, 4)}...${key.slice(-4)}`;
  };

  const handleClick = () => {
    if (isConnected) {
      disconnect();
    } else {
      connect();
    }
  };

  // Wrap with motion component if animations are enabled
  const ButtonWrapper = isEnabled ? motion.div : 'div';
  const motionProps = isEnabled
    ? {
        whileHover: { scale: 1.05 },
        whileTap: { scale: 0.95 },
        transition: { type: 'spring', stiffness: 400, damping: 17 }
      }
    : {};

  return (
    <ButtonWrapper {...motionProps}>
      <Button
        onClick={handleClick}
        disabled={isConnecting}
        className={`relative ${
          isConnected
            ? 'bg-background border border-pink-600 text-foreground hover:bg-accent'
            : 'bg-gradient-to-r from-pink-600 to-purple-600 text-white hover:from-pink-700 hover:to-purple-700'
        }`}
      >
        {isConnecting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {isConnected ? 'Disconnecting...' : 'Connecting...'}
          </>
        ) : (
          <>
            {isConnected ? (
              <>
                {formatPublicKey(publicKey || '')}
                <LogOut className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                <Wallet className="mr-2 h-4 w-4" />
                Connect Wallet
              </>
            )}
          </>
        )}
      </Button>
    </ButtonWrapper>
  );
} 