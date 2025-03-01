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
          <AnimatedElement animation="fadeIn">
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
              <h2 className="text-2xl font-bold mb-6">Token Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="feature-card">
                  <h3 className="text-xl font-semibold mb-4">Token Details</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Name:</span>
                      <span className="font-medium">TokenMuse</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Symbol:</span>
                      <span className="font-medium">MUSE</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Supply:</span>
                      <span className="font-medium">100,000,000 MUSE</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Blockchain:</span>
                      <span className="font-medium">Ethereum (ERC-20)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Initial Price:</span>
                      <span className="font-medium">$0.05 USD</span>
                    </div>
                  </div>
                </div>
                
                <div className="feature-card">
                  <h3 className="text-xl font-semibold mb-4">Token Utility</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium">Platform Access</span>
                        <p className="text-sm text-muted-foreground">Access premium features and advanced agent capabilities</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium">Governance</span>
                        <p className="text-sm text-muted-foreground">Vote on platform upgrades and feature prioritization</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium">Marketplace Transactions</span>
                        <p className="text-sm text-muted-foreground">Buy, sell, and trade AI agents and components</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium">Staking Rewards</span>
                        <p className="text-sm text-muted-foreground">Earn passive income by staking tokens</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          </ScrollReveal>
          
          {/* Revenue Split Model */}
          <ScrollReveal animation="fadeIn" delay={0.2}>
            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-6">Revenue Split Model</h2>
              <div className="feature-card">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Platform Revenue Distribution</h3>
                    <p className="text-muted-foreground mb-6">
                      Our revenue model is designed to fairly distribute platform earnings among all stakeholders, 
                      ensuring sustainable growth and rewarding active participation.
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Creator Rewards (40%)</span>
                          <span className="text-sm font-medium">40%</span>
                        </div>
                        <div className="w-full bg-background/50 h-3 rounded-full">
                          <div className="bg-primary h-3 rounded-full" style={{ width: '40%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Staking Rewards (25%)</span>
                          <span className="text-sm font-medium">25%</span>
                        </div>
                        <div className="w-full bg-background/50 h-3 rounded-full">
                          <div className="bg-primary h-3 rounded-full" style={{ width: '25%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Platform Development (20%)</span>
                          <span className="text-sm font-medium">20%</span>
                        </div>
                        <div className="w-full bg-background/50 h-3 rounded-full">
                          <div className="bg-primary h-3 rounded-full" style={{ width: '20%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Token Burns (10%)</span>
                          <span className="text-sm font-medium">10%</span>
                        </div>
                        <div className="w-full bg-background/50 h-3 rounded-full">
                          <div className="bg-primary h-3 rounded-full" style={{ width: '10%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Community Treasury (5%)</span>
                          <span className="text-sm font-medium">5%</span>
                        </div>
                        <div className="w-full bg-background/50 h-3 rounded-full">
                          <div className="bg-primary h-3 rounded-full" style={{ width: '5%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center">
                    <div className="relative w-64 h-64">
                      <Image 
                        src="/images/revenue-chart.svg" 
                        alt="Revenue Distribution Chart" 
                        width={256} 
                        height={256}
                        className="animate-pulse-slow"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </ScrollReveal>
          
          {/* Token Burn Section */}
          <ScrollReveal animation="fadeIn" threshold={0.1} className="mb-12">
            <section>
              <AnimatedElement animation="slideUp">
                <h2 className="text-2xl font-bold mb-6 text-center">Token Burn Strategy</h2>
              </AnimatedElement>
              
              <div className="feature-card p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <ScrollReveal animation="scale" threshold={0.1} className="order-2 md:order-1">
                    <div className="relative">
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
                  </ScrollReveal>
                  
                  <ScrollReveal animation="slideLeft" className="order-1 md:order-2">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Strategic Token Burn</h3>
                      <p className="text-foreground/70 mb-4 text-sm">
                        To enhance token value and create a deflationary mechanism, we&apos;re implementing a strategic burn of 25% of the developer allocation.
                      </p>
                      
                      <StaggerContainer delayFactor={0.1} staggerChildren={0.1}>
                        <div className="space-y-4">
                          <AnimatedElement animation="fadeIn">
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
                          </AnimatedElement>
                          
                          <AnimatedElement animation="fadeIn" delay={0.2}>
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
                          </AnimatedElement>
                        </div>
                      </StaggerContainer>
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            </section>
          </ScrollReveal>
          
          {/* Token Distribution */}
          <section className="mb-16">
            <AnimatedElement animation="slideUp">
              <h2 className="text-2xl font-bold mb-8 text-center">Token Distribution</h2>
            </AnimatedElement>
            
            <StaggerContainer delayFactor={0.2} staggerChildren={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <ScrollReveal animation="slideUp">
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
                
                <ScrollReveal animation="slideUp">
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
                
                <div className="feature-card text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">20%</span>
                  </div>
                  <h3 className="font-semibold mb-2">Private Sale</h3>
                  <p className="text-sm text-foreground/70">
                    Distributed to early investors and strategic partners.
                  </p>
                </div>
                
                <div className="feature-card text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">15%</span>
                  </div>
                  <h3 className="font-semibold mb-2">Treasury & Reserves</h3>
                  <p className="text-sm text-foreground/70">
                    Held in reserve for future development, partnerships, and liquidity.
                  </p>
                </div>
              </div>
            </StaggerContainer>
          </section>
          
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