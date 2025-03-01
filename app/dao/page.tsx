'use client'

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Vote, Users, FileText, BarChart3, Shield, Lightbulb, ArrowRight } from "lucide-react";
import Image from "next/image";
import { PageTransition, AnimatedElement, StaggerContainer, ScrollReveal } from "@/components/motion";

// Mock proposal data
const activeProposals = [
  {
    id: "PROP-2023-07",
    title: "Implement Cross-Chain Agent Deployment",
    votes: { for: 68, against: 12, abstain: 20 },
    status: "Active",
    daysLeft: 3
  },
  {
    id: "PROP-2023-08",
    title: "Increase Token Burn Rate to 2% per Transaction",
    votes: { for: 52, against: 38, abstain: 10 },
    status: "Active",
    daysLeft: 5
  },
  {
    id: "PROP-2023-09",
    title: "Add Support for Audio-Based AI Agents",
    votes: { for: 75, against: 5, abstain: 20 },
    status: "Active",
    daysLeft: 2
  }
];

export default function DAOPage() {
  return (
    <div className="bg-background text-foreground">
      <Navbar />
      
      <PageTransition>
        <main className="pt-24 pb-16 px-4 sm:px-6 md:px-8 lg:px-12 max-w-[1400px] mx-auto">
          <AnimatedElement animation="fadeIn">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="gradient-text">TokenMuse</span> DAO
              </h1>
              <p className="text-foreground/70 max-w-2xl mx-auto">
                A decentralized governance system that puts the future of the platform in the hands of the community.
              </p>
            </div>
          </AnimatedElement>
          
          {/* DAO Overview */}
          <section className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <ScrollReveal animation="slideRight">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Governance Overview</h2>
                  <p className="text-foreground/70 mb-6">
                    TokenMuse DAO enables token holders to participate in platform governance, vote on proposals, and shape the future of the ecosystem.
                  </p>
                  
                  <StaggerContainer delayFactor={0.1} staggerChildren={0.1}>
                    <div className="space-y-4">
                      <AnimatedElement animation="fadeIn">
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-full bg-primary/10 mt-1">
                            <Vote className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold">Voting Power</h3>
                            <p className="text-sm text-foreground/70">1 $MUSE token = 1 vote, with a minimum holding period of 14 days.</p>
                          </div>
                        </div>
                      </AnimatedElement>
                      
                      <AnimatedElement animation="fadeIn">
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-full bg-primary/10 mt-1">
                            <FileText className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold">Proposal Process</h3>
                            <p className="text-sm text-foreground/70">Any holder with at least 100,000 $MUSE can submit proposals for community vote.</p>
                          </div>
                        </div>
                      </AnimatedElement>
                      
                      <AnimatedElement animation="fadeIn">
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-full bg-primary/10 mt-1">
                            <Shield className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold">Security Measures</h3>
                            <p className="text-sm text-foreground/70">Multi-signature treasury and timelock mechanisms to ensure safe governance.</p>
                          </div>
                        </div>
                      </AnimatedElement>
                    </div>
                  </StaggerContainer>
                </div>
              </ScrollReveal>
              
              <ScrollReveal animation="scale" threshold={0.1}>
                <div className="relative">
                  <div className="relative w-full h-64 md:h-80 glow">
                    <Image 
                      src="/dao-illustration.svg" 
                      alt="DAO Governance" 
                      fill
                      className="object-contain animate-float"
                    />
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </section>
          
          {/* Active Proposals */}
          <ScrollReveal animation="fadeIn" delay={0.2}>
            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-6">Active Proposals</h2>
              <div className="feature-card">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-medium">ID</th>
                        <th className="text-left py-3 px-4 font-medium">Title</th>
                        <th className="text-left py-3 px-4 font-medium">Votes</th>
                        <th className="text-left py-3 px-4 font-medium">Status</th>
                        <th className="text-left py-3 px-4 font-medium">Days Left</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeProposals.map((proposal) => (
                        <tr key={proposal.id} className="border-b border-border hover:bg-accent/5 transition-colors">
                          <td className="py-3 px-4">#{proposal.id}</td>
                          <td className="py-3 px-4 font-medium">{proposal.title}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <div className="w-16 bg-background/50 h-2 rounded-full">
                                <div 
                                  className="bg-primary h-2 rounded-full" 
                                  style={{ width: `${(proposal.votes.for / (proposal.votes.for + proposal.votes.against)) * 100}%` }}
                                ></div>
                              </div>
                              <span className="text-sm">{proposal.votes.for}/{proposal.votes.for + proposal.votes.against}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                              proposal.status === 'Active' ? 'bg-green-500/20 text-green-500' :
                              proposal.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-500' :
                              'bg-blue-500/20 text-blue-500'
                            }`}>
                              {proposal.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">{proposal.daysLeft}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </ScrollReveal>
          
          {/* Governance Statistics */}
          <ScrollReveal animation="fadeIn" delay={0.3}>
            <section>
              <h2 className="text-2xl font-bold mb-6">Governance Statistics</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="feature-card">
                  <h3 className="text-lg font-semibold mb-2">Total Proposals</h3>
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold">124</span>
                    <span className="text-green-500 text-sm mb-1">+12% this month</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Total proposals submitted since launch
                  </p>
                </div>
                
                <div className="feature-card">
                  <h3 className="text-lg font-semibold mb-2">Voting Participation</h3>
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold">68%</span>
                    <span className="text-green-500 text-sm mb-1">+5% this month</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Average participation rate in governance votes
                  </p>
                </div>
                
                <div className="feature-card">
                  <h3 className="text-lg font-semibold mb-2">Tokens Staked</h3>
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold">42.5M</span>
                    <span className="text-green-500 text-sm mb-1">+8% this month</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Total MUSE tokens staked for governance
                  </p>
                </div>
              </div>
            </section>
          </ScrollReveal>
        </main>
      </PageTransition>
    </div>
  );
} 