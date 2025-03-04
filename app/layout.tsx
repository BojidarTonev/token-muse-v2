import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/react";

// Import Solana Web3.js script
import Script from "next/script";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AgentMint AI",
  description:
    "Decentralized. Scalable. Liquid. A platform for multimodal AI agents with blockchain tokenization.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Add Phantom wallet detection */}
        <Script
          src="https://unpkg.com/@solana/web3.js@latest/lib/index.iife.min.js"
          strategy="beforeInteractive"
        />
        <Analytics />
      </head>
      <body
        className={`${montserrat.variable} font-montserrat antialiased min-h-screen flex flex-col bg-background`}
      >
        {/* Background elements */}
        <div className="fixed inset-0 dot-pattern opacity-10 pointer-events-none z-0"></div>

        {/* Gradient orbs */}
        <div className="fixed top-0 left-1/4 w-[500px] h-[500px] orb -translate-x-1/2 -translate-y-1/2 z-0"></div>
        <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] orb translate-x-1/3 translate-y-1/3 z-0"></div>

        {/* Radial gradient overlay */}
        <div className="fixed inset-0 bg-gradient-radial from-transparent to-background z-0"></div>

        {/* Content */}
        <Providers>
          <div className="relative z-10 flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow pt-16">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
