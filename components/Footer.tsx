import Link from "next/link";
import { Package, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background/20 backdrop-blur-xl border-t border-white/5 py-10 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-20 pointer-events-none"></div>
      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold gradient-text">AgentMint</span>
            </Link>
            <p className="text-sm text-foreground/70 max-w-xs leading-relaxed">
              Empowering creators with AI agents and decentralized tokenization
              on the blockchain.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-5">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/80">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/agents"
                  className="text-sm text-foreground/60 hover:text-primary transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/70"></span>
                  Agents
                </Link>
              </li>
              <li>
                <Link
                  href="/network"
                  className="text-sm text-foreground/60 hover:text-primary transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/70"></span>
                  Networks
                </Link>
              </li>
              <li>
                <Link
                  href="/dao"
                  className="text-sm text-foreground/60 hover:text-primary transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/70"></span>
                  DAO
                </Link>
              </li>
              <li>
                <Link
                  href="/roadmap"
                  className="text-sm text-foreground/60 hover:text-primary transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/70"></span>
                  Roadmap
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal and Social */}
          <div className="space-y-5">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/80">
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-sm text-foreground/60 hover:text-primary transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/70"></span>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-foreground/60 hover:text-primary transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/70"></span>
                  Terms & Conditions
                </Link>
              </li>
            </ul>

            <div className="pt-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/80 mb-4">
                Connect
              </h3>
              <div className="flex space-x-3">
                <a
                  href="https://x.com/AgnetMint_AI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 hover:bg-primary/10 text-foreground/60 hover:text-primary transition-colors border border-white/10"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  className="p-2 rounded-lg bg-white/5 text-foreground/40 cursor-not-allowed relative border border-white/10"
                  aria-disabled="true"
                >
                  <Package className="w-5 h-5" />
                  <span className="absolute -top-2 -right-2 bg-primary/20 text-primary text-[10px] font-medium px-1.5 py-0.5 rounded-full">
                    Soon
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-foreground/40">
            &copy; {new Date().getFullYear()} AgentMint. All rights reserved.
          </p>
          <p className="text-xs text-foreground/40 flex items-center mt-3 md:mt-0">
            Made with <Heart className="w-3 h-3 mx-1 text-primary" /> by the
            AgentMint Team
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
