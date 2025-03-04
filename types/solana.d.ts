// Type definitions for Solana wallet adapter
interface SolanaProvider {
  isPhantom?: boolean;
  connect: () => Promise<{ publicKey: { toString: () => string } }>;
  disconnect: () => Promise<void>;
}

interface Window {
  solana?: SolanaProvider;
} 