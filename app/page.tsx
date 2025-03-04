"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { ExternalLink, BarChart3 } from "lucide-react";
import {
  PageTransition,
  AnimatedElement,
  StaggerContainer,
  ScrollReveal,
} from "@/components/motion";

// Flag to control visibility of trading cards
const SHOW_TRADING_CARDS = true;

export default function Home() {
  const pumpfunUrl =
    "https://pump.fun/coin/CWCWYMjdUtzG7irTaor4hraen3FtaM3xDSBNfprbXzVm";
  const dexscreenerUrl =
    "https://dexscreener.com/solana/CWCWYMjdUtzG7irTaor4hraen3FtaM3xDSBNfprbXzVm";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <PageTransition>
        {/* Trading Cards - Conditionally rendered */}
        {SHOW_TRADING_CARDS && (
          <div className="fixed top-20 right-6 z-40 flex flex-col gap-2 md:flex-col md:items-end">
            <AnimatedElement animation="fadeIn" delay={0.2}>
              <Link href={pumpfunUrl} target="_blank" rel="noopener noreferrer">
                <div className="glass-effect p-2.5 hover:bg-primary/5 transition-colors cursor-pointer group w-auto md:w-auto">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-full bg-primary/10 flex-shrink-0">
                      <Image
                        src="/neurolink-token.svg"
                        alt="AGENTMINT"
                        width={20}
                        height={20}
                        className="w-full h-full"
                      />
                    </div>
                    <div className="hidden sm:block">
                      <div className="text-xs font-medium">pump.fun</div>
                      <div className="text-[10px] text-foreground/60">
                        Trade #AGENTMINT
                      </div>
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
              <Link
                href={dexscreenerUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="glass-effect p-2.5 hover:bg-primary/5 transition-colors cursor-pointer group w-auto md:w-auto">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-full bg-primary/10 flex-shrink-0">
                      <BarChart3 className="w-4 h-4 text-primary" />
                    </div>
                    <div className="hidden sm:block">
                      <div className="text-xs font-medium">DexScreener</div>
                      <div className="text-[10px] text-foreground/60">
                        View Chart
                      </div>
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
        <section className="relative pt-28 pb-20 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
          <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-20 right-20 opacity-80">
              <div className="relative w-64 h-64 glow">
                <Image
                  src="/cube-icon.svg"
                  alt="Cube Icon"
                  width={256}
                  height={256}
                  className="animate-float w-full h-full"
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
                  className="animate-float-slow w-full h-full"
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
                  className="animate-float-reverse w-full h-full"
                />
              </div>
            </div>
          </div>

          <div className="relative z-10 max-w-2xl">
            <AnimatedElement animation="slideUp" delay={0.1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span>Decentralized.</span>
                <br />
                <span>Scalable.</span>
                <br />
                <span className="gradient-text">Liquid.</span>
              </h1>
            </AnimatedElement>

            <AnimatedElement animation="fadeIn" delay={0.3}>
              <p className="text-lg text-foreground/80 mb-10 max-w-lg leading-relaxed">
                A platform for multimodal AI agents with blockchain
                tokenization, enabling creative collaboration and innovative
                problem-solving.
              </p>
            </AnimatedElement>

            <AnimatedElement animation="fadeIn" delay={0.5}>
              <div className="flex flex-wrap gap-4">
                <Link href="/agents">
                  <Button
                    variant="app"
                    size="lg"
                    className="rounded-full px-6 py-6 h-auto text-base animate-pulse-glow"
                  >
                    Explore Agents
                  </Button>
                </Link>
                <Link href="/create-agent">
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-full border-primary/30 text-primary hover:bg-primary/10 px-6 py-6 h-auto text-base"
                  >
                    Create Agent
                  </Button>
                </Link>
              </div>
            </AnimatedElement>
          </div>
        </section>

        {/* Feature Cards Section */}
        <section className="py-20 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
          <StaggerContainer
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            delay={0.15}
          >
            {/* Card 1 */}
            <ScrollReveal animation="fadeIn" delay={0.1}>
              <div className="feature-card h-full">
                <div className="mb-5 w-16 h-16 flex items-center justify-center">
                  <Image
                    src="/ai-brain-icon.svg"
                    alt="AI Brain"
                    width={64}
                    height={64}
                    className="object-contain w-full h-full"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-3">Create AI Agents</h3>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  Deploy individual multimodal AI agents capable of generating
                  creative outputs including art, music, text, and code based on
                  your prompts.
                </p>
              </div>
            </ScrollReveal>

            {/* Card 2 */}
            <ScrollReveal animation="fadeIn" delay={0.2}>
              <div className="feature-card h-full">
                <div className="mb-5 w-16 h-16 flex items-center justify-center">
                  <Image
                    src="/network-icon.svg"
                    alt="Network"
                    width={64}
                    height={64}
                    className="object-contain w-full h-full"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Build Agent Networks
                </h3>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  Connect multiple specialized agents into cohesive networks
                  that collaborate on complex tasks, sharing contextual data for
                  unified outputs.
                </p>
              </div>
            </ScrollReveal>

            {/* Card 3 */}
            <ScrollReveal animation="fadeIn" delay={0.3}>
              <div className="feature-card h-full">
                <div className="mb-5 w-16 h-16 flex items-center justify-center">
                  <Image
                    src="/cube-icon.svg"
                    alt="Cube"
                    width={64}
                    height={64}
                    className="object-contain w-full h-full"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Narrative-Driven Collaboration
                </h3>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  Define master narratives that distribute prompts across your
                  agent network, enabling coordinated responses to solve complex
                  creative challenges.
                </p>
              </div>
            </ScrollReveal>
          </StaggerContainer>
        </section>

        {/* AgentMint Section */}
        <section className="py-20 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
          <ScrollReveal animation="slideUp">
            <div className="text-center mb-12">
              <h2 className="text-sm uppercase tracking-wider text-foreground/60 mb-3">
                HOW IT WORKS
              </h2>
              <h3 className="text-4xl font-bold">
                <span className="gradient-text">$MINT</span> Token
              </h3>
            </div>
          </ScrollReveal>

          <div className="flex flex-col md:flex-row items-center justify-between gap-16">
            <ScrollReveal animation="slideRight" delay={0.2}>
              <div className="max-w-lg">
                <p className="text-lg mb-8 leading-relaxed">
                  Each AI agent is tokenized as a unique digital asset on the
                  blockchain. Use $MINT tokens to create, customize, and deploy
                  agents with advanced capabilities and higher output quality.
                </p>
                <Link href="/tokenomics">
                  <Button
                    variant="outline"
                    className="rounded-full border-primary/30 text-primary hover:bg-primary/10 px-6 py-3 h-auto"
                  >
                    Learn About Tokenomics
                  </Button>
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fadeIn" delay={0.3}>
              <div className="flex flex-col items-center">
                <div className="relative w-[300px] h-[300px]">
                  <Image
                    src="/token-neurolink-icon.svg"
                    alt="MINT Token"
                    width={300}
                    height={300}
                    className="animate-pulse-slow w-full h-full"
                  />
                </div>
                <div className="text-center mt-4">
                  <h3 className="text-2xl font-bold">AGENTMINT</h3>
                  <p className="text-muted-foreground">
                    The native token of the AgentMint platform
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal animation="fadeIn">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/20 to-indigo-500/20 backdrop-blur-xl border border-primary/20">
                <div className="absolute inset-0 dot-pattern opacity-10"></div>
                <div className="relative z-10 p-8 md:p-12 lg:p-16">
                  <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                      Ready to Build with AI?
                    </h2>
                    <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
                      Start creating your own AI agents today and join the
                      decentralized AI revolution.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                      <Link href="/agents">
                        <Button
                          variant="app"
                          size="lg"
                          className="rounded-full px-6 py-6 h-auto text-base animate-pulse-glow"
                        >
                          Get Started
                        </Button>
                      </Link>
                      <Link href="/roadmap">
                        <Button
                          variant="outline"
                          size="lg"
                          className="rounded-full border-primary/30 text-primary hover:bg-primary/10 px-6 py-6 h-auto text-base"
                        >
                          View Roadmap
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </PageTransition>
    </div>
  );
}
