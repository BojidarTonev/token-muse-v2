"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { WalletButton } from "./WalletButton";

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showWalletText, setShowWalletText] = useState(true);

  // Handle responsive wallet button display
  useEffect(() => {
    const handleResize = () => {
      setShowWalletText(window.innerWidth >= 1000);
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isActive = (path: string) => {
    if (
      path === "/agents" &&
      (pathname === "/create-agent" || pathname.startsWith("/agents/"))
    ) {
      return true;
    }
    if (
      path === "/network" &&
      (pathname === "/create-network" || pathname.startsWith("/network/"))
    ) {
      return true;
    }
    if (path === "/narrative" && pathname.startsWith("/narrative")) {
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
    { path: "/agents", label: "Agents" },
    { path: "/network", label: "Networks" },
    { path: "/narrative", label: "Narrative", badge: "Coming Soon" },
    { path: "/roadmap", label: "Roadmap" },
    { path: "/tokenomics", label: "Tokenomics" },
    { path: "/dao", label: "DAO" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 bg-background/30 backdrop-blur-xl border-b border-white/5">
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-10 h-10 overflow-hidden rounded-lg animate-pulse-glow">
            <Image
              src="/logo.png"
              alt="AgentMint Logo"
              width={40}
              height={40}
              className="object-contain w-full h-full"
            />
          </div>
          <span className="text-xl font-bold gradient-text">AgentMint</span>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-1">
        {baseNavLinks.map((link) => (
          <Link
            key={link.path}
            href={link.path}
            className={`px-3 py-2 rounded-lg text-sm transition-all relative ${
              isActive(link.path)
                ? "text-primary font-medium bg-primary/10 backdrop-blur-xl"
                : "text-foreground/80 hover:text-foreground hover:bg-white/5"
            }`}
          >
            <div className="flex items-center gap-1.5">
              {link.label}
              {link.badge && (
                <span className="text-[10px] px-1.5 py-0.5 bg-amber-500/20 text-amber-400 rounded-full font-medium flex items-center gap-0.5">
                  <AlertCircle className="w-2 h-2" />
                  {link.badge}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4">
        {/* Connect Wallet Button */}
        <WalletButton showText={showWalletText} />

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center justify-center p-2 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? (
            <X className="w-5 h-5 text-foreground" />
          ) : (
            <Menu className="w-5 h-5 text-foreground" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[61px] bg-background/95 backdrop-blur-xl z-40 flex flex-col">
          <div className="flex flex-col p-4 space-y-1">
            {baseNavLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`p-3 rounded-lg transition-all ${
                  isActive(link.path)
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-foreground/80 hover:text-foreground hover:bg-white/5"
                }`}
                onClick={closeMenu}
              >
                <div className="flex items-center gap-2">
                  {link.label}
                  {link.badge && (
                    <span className="text-xs px-2 py-0.5 bg-amber-500/20 text-amber-400 rounded-full font-medium flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {link.badge}
                    </span>
                  )}
                </div>
              </Link>
            ))}

            {/* Additional links for mobile menu */}
            <div className="pt-4 mt-4 border-t border-white/10">
              <h3 className="text-xs uppercase text-foreground/50 font-medium mb-2 px-3">
                Legal
              </h3>
              <Link
                href="/privacy-policy"
                className="p-3 rounded-lg text-foreground/80 hover:text-foreground hover:bg-white/5 block"
                onClick={closeMenu}
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="p-3 rounded-lg text-foreground/80 hover:text-foreground hover:bg-white/5 block mt-1"
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
