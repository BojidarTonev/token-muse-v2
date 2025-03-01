'use client'

import Navbar from "@/components/Navbar";
import { Flame, Percent, CheckCircle } from "lucide-react";
import Image from "next/image";
import { PageTransition, AnimatedElement, StaggerContainer, ScrollReveal } from "@/components/motion";

export default function TokenomicsPage() {
  return (
    <div className="bg-background text-foreground">
      <Navbar />
      
      <PageTransition>
        <main className="pt-24 pb-16 px-4 sm:px-6 md:px-8 lg:px-12 max-w-[1400px] mx-auto">
          <AnimatedElement animation="fadeIn" delay={0.1}>
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="gradient-text">$MUSE</span> Tokenomics
              </h1>
              <p className="text-foreground/70 max-w-2xl mx-auto">
                A comprehensive breakdown of the platform&#39;s token economy, distribution model, and utility.
              </p>
            </div>
          </AnimatedElement>
          
          {/* Token Overview */}
          <ScrollReveal animation="fadeIn" delay={0.1}>
            <section className="mb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <AnimatedElement animation="slideRight" delay={0.2}>
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Token Overview</h2>
                    <p className="text-foreground/70 mb-6">
                      The $MUSE token is the native utility token of the TokenMuse AI platform, powering the ecosystem and providing governance rights to holders.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-full bg-primary/10 mt-1">
                          <CheckCircle className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Total Supply</h3>
                          <p className="text-sm text-foreground/70">1,000,000,000 $MUSE</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-full bg-primary/10 mt-1">
                          <Flame className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Burn Mechanism</h3>
                          <p className="text-sm text-foreground/70">25% of developer tokens will be burned to reduce supply and increase scarcity.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-full bg-primary/10 mt-1">
                          <CheckCircle className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Vesting Schedule</h3>
                          <p className="text-sm text-foreground/70">Team and investor tokens are subject to a 24-month vesting period with a 6-month cliff.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedElement>
                
                <AnimatedElement animation="scale" delay={0.3}>
                  <div className="relative">
                    <div className="relative w-full h-64 md:h-80 glow">
                      <Image 
                        src="/token-3d.svg" 
                        alt="MUSE Token" 
                        fill
                        className="object-contain animate-float"
                      />
                    </div>
                  </div>
                </AnimatedElement>
              </div>
            </section>
          </ScrollReveal>
          
          {/* Revenue Split Section */}
          <ScrollReveal animation="fadeIn" delay={0.2}>
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-center">Revenue Split Model</h2>
              
              <div className="feature-card p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <AnimatedElement animation="slideRight" delay={0.3}>
                    <div>
                      <h3 className="text-lg font-semibold mb-3">70-30 Revenue Distribution</h3>
                      <p className="text-foreground/70 mb-4 text-sm">
                        Our platform operates on a fair and transparent revenue model that prioritizes our users and creators while ensuring sustainable development.
                      </p>
                      
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "var(--primary)" }}></div>
                              <span className="text-sm font-medium">Users & Creators</span>
                            </div>
                            <span className="text-sm font-bold">70%</span>
                          </div>
                          <div className="w-full bg-background/50 h-2 rounded-full">
                            <div className="bg-primary h-2 rounded-full" style={{ width: '70%' }}></div>
                          </div>
                        </div>
                        
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "var(--chart-2)" }}></div>
                              <span className="text-sm font-medium">Platform & Development</span>
                            </div>
                            <span className="text-sm font-bold">30%</span>
                          </div>
                          <div className="w-full bg-background/50 h-2 rounded-full">
                            <div className="h-2 rounded-full" style={{ width: '30%', backgroundColor: "var(--chart-2)" }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </AnimatedElement>
                  
                  <AnimatedElement animation="scale" delay={0.4}>
                    <div className="relative">
                      <div className="aspect-square relative max-w-[200px] mx-auto">
                        {/* Custom donut chart */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="relative w-full h-full">
                            <svg viewBox="0 0 100 100" className="w-full h-full">
                              <circle cx="50" cy="50" r="40" fill="transparent" stroke="var(--chart-2)" strokeWidth="20" strokeDasharray="251.2" strokeDashoffset="0" />
                              <circle cx="50" cy="50" r="40" fill="transparent" stroke="var(--primary)" strokeWidth="20" strokeDasharray="251.2" strokeDashoffset="75.36" />
                              <text x="50" y="50" textAnchor="middle" dominantBaseline="middle" fill="currentColor" fontSize="16" fontWeight="bold">70/30</text>
                            </svg>
                          </div>
                        </div>
                        
                        {/* Legend */}
                        <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-6">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "var(--primary)" }}></div>
                            <span className="text-xs">Users & Creators</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "var(--chart-2)" }}></div>
                            <span className="text-xs">Platform</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </AnimatedElement>
                </div>
              </div>
            </section>
          </ScrollReveal>
          
          {/* Token Burn Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center">Token Burn Strategy</h2>
            
            <div className="feature-card p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="order-2 md:order-1 relative">
                  <div className="aspect-square relative max-w-[180px] mx-auto">
                    {/* Custom burn chart */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative w-full h-full">
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                          <defs>
                            <linearGradient id="burnGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="var(--primary)" />
                              <stop offset="100%" stopColor="var(--chart-2)" />
                            </linearGradient>
                          </defs>
                          <circle cx="50" cy="50" r="45" fill="transparent" stroke="var(--chart-2)" strokeWidth="10" />
                          <path d="M50,5 A45,45 0 0,1 95,50" fill="transparent" stroke="var(--primary)" strokeWidth="10" />
                          <text x="50" y="45" textAnchor="middle" dominantBaseline="middle" fill="currentColor" fontSize="16" fontWeight="bold">25%</text>
                          <text x="50" y="60" textAnchor="middle" dominantBaseline="middle" fill="currentColor" fontSize="10">Burn Rate</text>
                        </svg>
                      </div>
                    </div>
                    
                    {/* Flame icon overlay */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-10">
                      <Flame className="w-24 h-24 text-primary" />
                    </div>
                  </div>
                </div>
                
                <div className="order-1 md:order-2">
                  <h3 className="text-lg font-semibold mb-3">Strategic Token Burn</h3>
                  <p className="text-foreground/70 mb-4 text-sm">
                    To enhance token value and create a deflationary mechanism, we&apos;re implementing a strategic burn of 25% of the developer allocation.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Flame className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium">Developer Token Burn</span>
                        </div>
                        <span className="text-sm font-bold">25%</span>
                      </div>
                      <div className="w-full bg-background/50 h-2 rounded-full">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '25%' }}></div>
                      </div>
                    </div>
                    
                    <div className="bg-background/30 p-3 rounded-lg border border-border/50">
                      <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                        <Percent className="w-4 h-4 text-primary" />
                        Burn Benefits
                      </h4>
                      <ul className="text-xs text-foreground/70 space-y-1">
                        <li className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          <span>Increases token scarcity and potential value</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          <span>Creates deflationary pressure on total supply</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          <span>Demonstrates long-term commitment to token holders</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Token Distribution */}
          <ScrollReveal animation="fadeIn" delay={0.3}>
            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-8 text-center">Token Distribution</h2>
              
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" delay={0.1}>
                <ScrollReveal animation="slideUp" delay={0.1}>
                  <div className="feature-card text-center">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary">40%</span>
                    </div>
                    <h3 className="font-semibold mb-2">Community & Ecosystem</h3>
                    <p className="text-sm text-foreground/70">
                      Reserved for community incentives, grants, and ecosystem growth.
                    </p>
                  </div>
                </ScrollReveal>
                
                <ScrollReveal animation="slideUp" delay={0.2}>
                  <div className="feature-card text-center">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary">25%</span>
                    </div>
                    <h3 className="font-semibold mb-2">Team & Advisors</h3>
                    <p className="text-sm text-foreground/70">
                      Allocated to the founding team and advisors with a 24-month vesting period.
                    </p>
                  </div>
                </ScrollReveal>
              </StaggerContainer>
            </section>
          </ScrollReveal>
          
          {/* Token Utility */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8">Token Utility</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="feature-card">
                <h3 className="text-xl font-semibold mb-3">Agent Creation & Customization</h3>
                <p className="text-sm text-foreground/70">
                  Use $MUSE tokens to create and customize AI agents with advanced capabilities and higher output quality.
                </p>
              </div>
              
              <div className="feature-card">
                <h3 className="text-xl font-semibold mb-3">Governance Rights</h3>
                <p className="text-sm text-foreground/70">
                  $MUSE holders can vote on platform upgrades, feature prioritization, and treasury allocations.
                </p>
              </div>
              
              <div className="feature-card">
                <h3 className="text-xl font-semibold mb-3">Revenue Sharing</h3>
                <p className="text-sm text-foreground/70">
                  Stake $MUSE to earn a share of platform fees generated from agent licensing and marketplace transactions.
                </p>
              </div>
            </div>
          </section>
        </main>
      </PageTransition>
    </div>
  );
} 