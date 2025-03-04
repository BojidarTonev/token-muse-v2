"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Wallet, LogOut, Copy, Check, ExternalLink } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  setAuthenticated,
  clearAuthentication,
} from "@/redux/features/app-state-slice";
import { toast } from "sonner";
import { connectAndAuthenticate, disconnectAndLogout } from "@/lib/auth";

interface WalletButtonProps {
  showText?: boolean;
}

export const WalletButton = ({ showText = true }: WalletButtonProps) => {
  const [isPhantomInstalled, setIsPhantomInstalled] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const dispatch = useAppDispatch();
  const { isAuthenticated, publicKey } = useAppSelector(
    (state) => state.appState
  );

  // Set mounted state on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Check if Phantom wallet is installed
  useEffect(() => {
    if (!isMounted) return;

    const checkPhantomWallet = () => {
      const isPhantom =
        typeof window !== "undefined" &&
        window.solana &&
        window.solana.isPhantom;
      setIsPhantomInstalled(!!isPhantom);
    };

    checkPhantomWallet();
    window.addEventListener("load", checkPhantomWallet);
    return () => window.removeEventListener("load", checkPhantomWallet);
  }, [isMounted]);

  // Handle wallet connection
  const connectWallet = async () => {
    try {
      if (!isPhantomInstalled) {
        window.open("https://phantom.app/", "_blank");
        return;
      }

      setIsConnecting(true);

      // Use the connectAndAuthenticate function from lib/auth.ts
      const result = await connectAndAuthenticate();

      if (result && result.publicKey) {
        // Set wallet info in Redux store
        dispatch(setAuthenticated({ publicKey: result.publicKey }));
        toast.success("Wallet connected successfully!");
      } else {
        throw new Error("Failed to authenticate with wallet");
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast.error("Failed to connect wallet. Please try again.");
    } finally {
      setIsConnecting(false);
    }
  };

  // Handle wallet disconnection
  const disconnectWallet = async () => {
    try {
      // Use the disconnectAndLogout function from lib/auth.ts
      const success = await disconnectAndLogout();

      if (success) {
        dispatch(clearAuthentication());
        setIsDropdownOpen(false);
        toast.success("Wallet disconnected successfully!");
      } else {
        throw new Error("Failed to disconnect wallet");
      }
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
      toast.error("Failed to disconnect wallet. Please try again.");
    }
  };

  // Copy wallet address to clipboard
  const copyAddress = () => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey);
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
    }
  };

  // Format wallet address for display
  const formatAddress = (address: string) => {
    if (!address) return "";
    return `${address.substring(0, 4)}...${address.substring(
      address.length - 4
    )}`;
  };

  // Toggle dropdown menu
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isMounted) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        isDropdownOpen &&
        !target.closest(".wallet-dropdown") &&
        !target.closest(".wallet-button")
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen, isMounted]);

  // Don't render anything on the server
  if (!isMounted) {
    return (
      <Button
        variant="outline"
        size="sm"
        className="px-3 py-2 h-auto rounded-lg border-white/10 bg-white/5 backdrop-blur-xl"
        disabled
      >
        <div className="flex items-center gap-2">
          <Wallet className="w-4 h-4" />
          {showText && <span>Loading...</span>}
        </div>
      </Button>
    );
  }

  return (
    <div className="relative">
      {isAuthenticated && publicKey ? (
        <>
          <Button
            variant="outline"
            size="sm"
            className="wallet-button px-3 py-2 h-auto rounded-lg border-white/10 bg-white/5 backdrop-blur-xl hover:bg-primary/10 hover:border-primary/30 transition-all"
            onClick={toggleDropdown}
          >
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                <Wallet className="w-3 h-3 text-primary" />
              </div>
              {showText && (
                <span className="text-sm font-medium">
                  {formatAddress(publicKey)}
                </span>
              )}
            </div>
          </Button>

          {isDropdownOpen && (
            <div className="wallet-dropdown absolute right-0 mt-2 w-64 bg-card/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-lg overflow-hidden z-50">
              <div className="p-4 border-b border-white/10">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-foreground/60">
                    Connected as
                  </span>
                  <a
                    href={`https://solscan.io/account/${publicKey}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary flex items-center gap-1 hover:underline"
                  >
                    View <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium truncate max-w-[180px]">
                    {formatAddress(publicKey)}
                  </span>
                  <button
                    onClick={copyAddress}
                    className="p-1 rounded-md hover:bg-white/5 text-foreground/60 hover:text-primary transition-colors"
                  >
                    {hasCopied ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
              <div className="p-2">
                <button
                  onClick={disconnectWallet}
                  className="w-full flex items-center gap-2 p-2 text-sm text-foreground/80 hover:text-destructive hover:bg-destructive/5 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Disconnect Wallet
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <Button
          variant="app"
          size="sm"
          className="px-3 py-2 h-auto rounded-lg"
          onClick={connectWallet}
          disabled={isConnecting}
        >
          <div className="flex items-center gap-2">
            <Wallet className="w-4 h-4" />
            {showText && (
              <span>
                {isConnecting
                  ? "Connecting..."
                  : isPhantomInstalled
                  ? "Connect Wallet"
                  : "Install Phantom"}
              </span>
            )}
          </div>
        </Button>
      )}
    </div>
  );
};
