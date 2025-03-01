import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";

// Import Solana Web3.js script
import Script from "next/script";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TokenMuse AI",
  description: "Decentralized. Scalable. Liquid. A platform for multimodal AI agents with blockchain tokenization.",
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
      </head>
      <body
        className={`${montserrat.variable} font-montserrat antialiased min-h-screen flex flex-col`}
      >
        <Providers>
          <Navbar />
          <main className="flex-grow pt-20">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
