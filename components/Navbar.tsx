'use client'

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, AlertCircle } from "lucide-react";
import { useState } from "react";
import { WalletButton } from './WalletButton';

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const isActive = (path: string) => {
    if (path === '/agents' && (pathname === '/create-agent' || pathname.startsWith('/agents/'))) {
      return true;
    }
    if (path === '/network' && (pathname === '/create-network' || pathname.startsWith('/network/'))) {
      return true;
    }
    if (path === '/narrative' && pathname.startsWith('/narrative')) {
      return true;
    }
    return pathname === path;
  };
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  // Base navigation links available to all users
  const baseNavLinks = [
    { path: '/agents', label: 'Agents' },
    { path: '/network', label: 'Networks' },
    { path: '/narrative', label: 'Narrative', badge: 'Coming Soon' },
    { path: '/roadmap', label: 'Roadmap' },
    { path: '/tokenomics', label: 'Tokenomics' },
    { path: '/dao', label: 'DAO' },
  ];
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-background/80 backdrop-blur-md border-b border-border/20">
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.jpg" 
            alt="TokenMuse Logo" 
            width={32} 
            height={32} 
            className="rounded-full"
          />
          <span className="text-xl font-bold gradient-text">TokenMuse</span>
        </Link>
      </div>
      
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-6">
        {baseNavLinks.map((link) => (
          <Link 
            key={link.path}
            href={link.path} 
            className={`text-sm transition-colors relative ${
              isActive(link.path) 
                ? 'text-primary font-medium' 
                : 'text-foreground/80 hover:text-foreground'
            }`}
          >
            <div className="flex items-center gap-1.5">
              {link.label}
              {link.badge && (
                <span className="text-[10px] px-1.5 py-0.5 bg-amber-500/10 text-amber-500 rounded-full font-medium flex items-center gap-0.5">
                  <AlertCircle className="w-2 h-2" />
                  {link.badge}
                </span>
              )}
            </div>
            {isActive(link.path) && (
              <span className="absolute -bottom-1.5 left-0 w-full h-0.5 bg-primary rounded-full"></span>
            )}
          </Link>
        ))}
      </div>
      
      <div className="flex items-center gap-4">
        {/* Connect Wallet Button */}
        <WalletButton />
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden flex items-center justify-center"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 text-foreground" />
          ) : (
            <Menu className="w-6 h-6 text-foreground" />
          )}
        </button>
      </div>
      
      {/* Mobile Navigation Overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[73px] bg-background/95 backdrop-blur-sm z-40 flex flex-col">
          <div className="flex flex-col p-6 space-y-2 bg-background/95">
            {baseNavLinks.map((link) => (
              <Link 
                key={link.path}
                href={link.path} 
                className={`text-lg transition-colors p-3 rounded-md ${
                  isActive(link.path) 
                    ? 'bg-primary/10 text-primary font-medium' 
                    : 'text-foreground/80 hover:text-foreground hover:bg-background/80'
                }`}
                onClick={closeMenu}
              >
                <div className="flex items-center gap-2">
                  {link.label}
                  {link.badge && (
                    <span className="text-xs px-2 py-0.5 bg-amber-500/10 text-amber-500 rounded-full font-medium flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {link.badge}
                    </span>
                  )}
                </div>
              </Link>
            ))}
            
            {/* Additional links for mobile menu */}
            <div className="pt-4 mt-4 border-t border-border/10">
              <h3 className="text-xs uppercase text-foreground/50 font-medium mb-2 px-3">Legal</h3>
              <Link 
                href="/privacy-policy" 
                className="text-lg transition-colors p-3 rounded-md text-foreground/80 hover:text-foreground hover:bg-background/80 block"
                onClick={closeMenu}
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms" 
                className="text-lg transition-colors p-3 rounded-md text-foreground/80 hover:text-foreground hover:bg-background/80 block mt-2"
                onClick={closeMenu}
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 