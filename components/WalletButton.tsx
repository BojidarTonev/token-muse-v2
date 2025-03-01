import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { Loader2, Wallet, LogOut } from 'lucide-react';
import { toast } from 'sonner';

// Type guard to check if an error has a message property
function isErrorWithMessage(error: unknown): error is { message: string } {
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

interface WalletButtonProps {
  showText?: boolean;
}

export const WalletButton = ({ showText = true }: WalletButtonProps) => {
  const { isAuthenticated, publicKey, isLoading, error, isWalletInstalled, connect, disconnect } = useAuth();
  const [isConnecting, setIsConnecting] = useState(false);
  const [isDisconnecting, setIsDisconnecting] = useState(false);

  // Handle connect button click
  const handleConnect = async () => {
    if (!isWalletInstalled) {
      toast.error('Wallet Not Found', {
        description: 'Please install Phantom wallet to continue',
      });
      window.open('https://phantom.app/', '_blank');
      return;
    }

    setIsConnecting(true);
    try {
      const success = await connect();
      if (success) {
        toast.success('Connected', {
          description: 'Successfully connected to wallet',
        });
      } else if (error) {
        toast.error('Connection Failed', {
          description: error,
        });
      }
    } catch (err: unknown) {
      toast.error('Connection Error', {
        description: getErrorMessage(err),
      });
    } finally {
      setIsConnecting(false);
    }
  };

  // Handle disconnect button click
  const handleDisconnect = async () => {
    setIsDisconnecting(true);
    try {
      const success = await disconnect();
      if (success) {
        toast.success('Disconnected', {
          description: 'Successfully disconnected from wallet',
        });
      } else if (error) {
        toast.error('Disconnect Failed', {
          description: error,
        });
      }
    } catch (err: unknown) {
      toast.error('Disconnect Error', {
        description: getErrorMessage(err),
      });
    } finally {
      setIsDisconnecting(false);
    }
  };

  // Format public key for display
  const formatPublicKey = (key: string) => {
    if (!key) return '';
    return `${key.slice(0, 4)}...${key.slice(-4)}`;
  };

  // If not authenticated, show connect button
  if (!isAuthenticated) {
    return (
      <Button
        onClick={handleConnect}
        disabled={isLoading || isConnecting}
        className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
      >
        {isLoading || isConnecting ? (
          <>
            <Loader2 className={`h-4 w-4 animate-spin ${showText ? 'mr-2' : ''}`} />
            {showText && 'Connecting...'}
          </>
        ) : (
          <>
            <Wallet className={`h-4 w-4 ${showText ? 'mr-2' : ''}`} />
            {showText && 'Connect Wallet'}
          </>
        )}
      </Button>
    );
  }

  // If authenticated, show button with public key and sign out icon
  return (
    <Button
      onClick={handleDisconnect}
      disabled={isLoading || isDisconnecting}
      variant="outline"
      className="border-pink-500 text-pink-500 hover:bg-pink-50 hover:text-pink-600 transition-colors"
    >
      {isLoading || isDisconnecting ? (
        <>
          <Loader2 className={`h-4 w-4 animate-spin ${showText ? 'mr-2' : ''}`} />
          {showText && 'Disconnecting...'}
        </>
      ) : (
        <>
          <LogOut className={`h-4 w-4 ${showText ? 'mr-2' : ''}`} />
          {showText && formatPublicKey(publicKey || '')}
        </>
      )}
    </Button>
  );
}; 