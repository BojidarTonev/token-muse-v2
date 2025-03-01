'use client';

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { Sparkles, Network, MessageSquare, ExternalLink, BarChart3 } from "lucide-react";
import { PageTransition, AnimatedElement, StaggerContainer, ScrollReveal } from "@/components/motion";

// Flag to control visibility of trading cards
const SHOW_TRADING_CARDS = false;

export default function Home() {
  const pumpfunUrl = "https://pump.fun/token/muse";
  const dexscreenerUrl = "https://dexscreener.com/solana/muse";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <PageTransition>
        {/* Trading Cards - Conditionally rendered */}
        {SHOW_TRADING_CARDS && (
          <div className="fixed top-24 right-6 z-40 flex flex-col gap-3 md:flex-col md:items-end">
            <AnimatedElement animation="fadeIn" delay={0.2}>
              <Link href={pumpfunUrl} target="_blank" rel="noopener noreferrer">
                <div className="feature-card p-3 hover:bg-background/80 transition-colors cursor-pointer group w-auto md:w-auto">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-full bg-primary/10 flex-shrink-0">
                      <Image 
                        src="/token-icon.svg" 
                        alt="MUSE Token" 
                        width={20} 
                        height={20}
                      />
                    </div>
                    <div className="hidden sm:block">
                      <div className="text-xs font-medium">pump.fun</div>
                      <div className="text-[10px] text-foreground/60">Trade $MUSE</div>
                    </div>
                    <div className="sm:hidden">
                      <div className="text-xs font-medium">pump.fun</div>
                    </div>
                    <ExternalLink className="w-3 h-3 text-foreground/40 group-hover:text-primary transition-colors ml-1" />
                  </div>
                </div>
              </Link>
            </AnimatedElement>
            
            <AnimatedElement animation="fadeIn" delay={0.3}>
              <Link href={dexscreenerUrl} target="_blank" rel="noopener noreferrer">
                <div className="feature-card p-3 hover:bg-background/80 transition-colors cursor-pointer group w-auto md:w-auto">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-full bg-primary/10 flex-shrink-0">
                      <BarChart3 className="w-4 h-4 text-primary" />
                    </div>
                    <div className="hidden sm:block">
                      <div className="text-xs font-medium">DexScreener</div>
                      <div className="text-[10px] text-foreground/60">View Chart</div>
                    </div>
                    <div className="sm:hidden">
                      <div className="text-xs font-medium">DexScreener</div>
                    </div>
                    <ExternalLink className="w-3 h-3 text-foreground/40 group-hover:text-primary transition-colors ml-1" />
                  </div>
                </div>
              </Link>
            </AnimatedElement>
          </div>
        )}
        
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
          <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-20 right-20 opacity-80">
              <div className="relative w-64 h-64 glow">
                <Image 
                  src="/token-icon.svg" 
                  alt="Token Icon" 
                  width={256} 
                  height={256}
                  className="animate-float"
                />
              </div>
            </div>
            <div className="absolute top-60 right-60 opacity-60">
              <div className="relative w-16 h-16 glow">
                <Image 
                  src="/coin-icon.svg" 
                  alt="Coin Icon" 
                  width={64} 
                  height={64}
                  className="animate-float-slow"
                />
              </div>
            </div>
            <div className="absolute top-80 right-40 opacity-70">
              <div className="relative w-24 h-24 glow">
                <Image 
                  src="/coin-icon.svg" 
                  alt="Coin Icon" 
                  width={96} 
                  height={96}
                  className="animate-float-reverse"
                />
              </div>
            </div>
          </div>
          
          <div className="relative z-10 max-w-2xl">
            <AnimatedElement animation="slideUp" delay={0.1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                <span>Decentralized.</span><br />
                <span>Scalable.</span><br />
                <span className="gradient-text">Liquid.</span>
              </h1>
            </AnimatedElement>
            
            <AnimatedElement animation="fadeIn" delay={0.3}>
              <p className="text-lg text-foreground/80 mb-8 max-w-lg">
                A platform for multimodal AI agents with blockchain tokenization, enabling creative collaboration and innovative problem-solving.
              </p>
            </AnimatedElement>
            
            <AnimatedElement animation="fadeIn" delay={0.5}>
              <div className="flex flex-wrap gap-4">
                <Link href="/agents">
                  <Button variant="app" size="lg" className="rounded-full">
                    Explore Agents
                  </Button>
                </Link>
                <Link href="/create-agent">
                  <Button variant="outline" size="lg" className="rounded-full border-primary text-primary hover:bg-primary/10">
                    Create Agent
                  </Button>
                </Link>
              </div>
            </AnimatedElement>
          </div>
        </section>
        
        {/* Feature Cards Section */}
        <section className="py-16 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6" delay={0.15}>
            {/* Card 1 */}
            <ScrollReveal animation="fadeIn" delay={0.1}>
              <div className="feature-card">
                <div className="mb-4 p-2 rounded-full bg-background w-10 h-10 flex items-center justify-center border border-border">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Create AI Agents</h3>
                <p className="text-sm text-foreground/70">
                  Deploy individual multimodal AI agents capable of generating creative outputs including art, music, text, and code based on your prompts.
                </p>
              </div>
            </ScrollReveal>
            
            {/* Card 2 */}
            <ScrollReveal animation="fadeIn" delay={0.2}>
              <div className="feature-card">
                <div className="mb-4 p-2 rounded-full bg-background w-10 h-10 flex items-center justify-center border border-border">
                  <Network className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Build Agent Networks</h3>
                <p className="text-sm text-foreground/70">
                  Connect multiple specialized agents into cohesive networks that collaborate on complex tasks, sharing contextual data for unified outputs.
                </p>
              </div>
            </ScrollReveal>
            
            {/* Card 3 */}
            <ScrollReveal animation="fadeIn" delay={0.3}>
              <div className="feature-card">
                <div className="mb-4 p-2 rounded-full bg-background w-10 h-10 flex items-center justify-center border border-border">
                  <MessageSquare className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Narrative-Driven Collaboration</h3>
                <p className="text-sm text-foreground/70">
                  Define master narratives that distribute prompts across your agent network, enabling coordinated responses to solve complex creative challenges.
                </p>
              </div>
            </ScrollReveal>
          </StaggerContainer>
        </section>
        
        {/* TokenMuse Section */}
        <section className="py-16 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
          <ScrollReveal animation="slideUp">
            <div className="text-center mb-8">
              <h2 className="text-sm uppercase tracking-wider text-foreground/60 mb-2">HOW IT WORKS</h2>
              <h3 className="text-4xl font-bold">
                <span className="gradient-text">$MUSE</span> Token
              </h3>
            </div>
          </ScrollReveal>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <ScrollReveal animation="slideRight" delay={0.2}>
              <div className="max-w-lg">
                <p className="text-lg mb-6">
                  Each AI agent is tokenized as a unique digital asset on the blockchain. Use $MUSE tokens to create, customize, and deploy agents with advanced capabilities and higher output quality.
                </p>
                <Link href="/tokenomics">
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                    Learn About Tokenomics
                  </Button>
                </Link>
              </div>
            </ScrollReveal>
            
            <ScrollReveal animation="scale" delay={0.4}>
              <div className="relative w-64 h-64 glow">
                <Image 
                  src="/token-3d.svg" 
                  alt="MUSE Token" 
                  width={256} 
                  height={256}
                  className="animate-float"
                />
              </div>
            </ScrollReveal>
          </div>
        </section>
      </PageTransition>
    </div>
  );
}
