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
                  href="https://github.com/tokenmuse" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-background hover:bg-primary/10 text-foreground/60 hover:text-primary transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a 
                  href="https://twitter.com/tokenmuse" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-background hover:bg-primary/10 text-foreground/60 hover:text-primary transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a 
                  href="https://www.npmjs.com/package/tokenmuse" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-background hover:bg-primary/10 text-foreground/60 hover:text-primary transition-colors"
                >
                  <Package className="w-5 h-5" />
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