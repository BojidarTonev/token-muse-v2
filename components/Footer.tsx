import Link from "next/link";
import { Github, Twitter, Package, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border/10 py-8 px-4">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Link href="/" className="text-xl font-bold gradient-text">
              TokenMuse
            </Link>
            <p className="text-sm text-foreground/60 max-w-xs">
              Empowering creators with AI agents and decentralized tokenization on the blockchain.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/agents" className="text-sm text-foreground/60 hover:text-primary transition-colors">
                  Agents
                </Link>
              </li>
              <li>
                <Link href="/network" className="text-sm text-foreground/60 hover:text-primary transition-colors">
                  Networks
                </Link>
              </li>
              <li>
                <Link href="/dao" className="text-sm text-foreground/60 hover:text-primary transition-colors">
                  DAO
                </Link>
              </li>
              <li>
                <Link href="/roadmap" className="text-sm text-foreground/60 hover:text-primary transition-colors">
                  Roadmap
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Legal and Social */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy" className="text-sm text-foreground/60 hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-foreground/60 hover:text-primary transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
            
            <div className="pt-4">
              <h3 className="text-sm font-semibold mb-3">Connect</h3>
              <div className="flex space-x-4">
                <a 
                  href="https://twitter.com/tokenmuse" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-background hover:bg-primary/10 text-foreground/60 hover:text-primary transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a 
                  href="https://www.npmjs.com/package/tokenmuse" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-background hover:bg-primary/10 text-foreground/60 hover:text-primary transition-colors relative"
                >
                  <Package className="w-5 h-5" />
                  <span className="absolute -top-2 -right-2 bg-primary/20 text-primary text-[10px] font-medium px-1.5 py-0.5 rounded-full">Soon</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-border/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-foreground/40">
            &copy; {new Date().getFullYear()} TokenMuse. All rights reserved.
          </p>
          <p className="text-xs text-foreground/40 flex items-center mt-2 md:mt-0">
            Made with <Heart className="w-3 h-3 mx-1 text-primary" /> by the TokenMuse Team
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 