'use client';

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, CircleAlert } from "lucide-react";
import Image from "next/image";
import { PageTransition, AnimatedElement, StaggerContainer, ScrollReveal } from "@/components/motion";

// Mock data for milestones
const milestones = [
  {
    quarter: "Q1 2023",
    title: "Platform Foundation",
    description: "Initial platform architecture and core functionality development.",
    status: "completed",
    items: [
      { text: "Core platform architecture design", status: "completed" },
      { text: "Initial UI/UX development", status: "completed" },
      { text: "Basic agent creation functionality", status: "completed" },
    ]
  },
  {
    quarter: "Q2 2023",
    title: "Agent Capabilities",
    description: "Expanding agent capabilities and interaction models.",
    status: "completed",
    items: [
      { text: "Advanced agent customization", status: "completed" },
      { text: "Multi-modal agent support", status: "completed" },
      { text: "Agent performance analytics", status: "completed" },
    ]
  },
  {
    quarter: "Q3 2023",
    title: "Network Development",
    description: "Building the foundation for agent networks and collaboration.",
    status: "completed",
    items: [
      { text: "Network creation interface", status: "completed" },
      { text: "Agent-to-agent communication", status: "completed" },
      { text: "Network visualization tools", status: "completed" },
    ]
  },
  {
    quarter: "Q4 2023",
    title: "Tokenomics Implementation",
    description: "Implementing the token economy and marketplace functionality.",
    status: "in-progress",
    items: [
      { text: "Token smart contract development", status: "completed" },
      { text: "Marketplace foundation", status: "completed" },
      { text: "Token utility implementation", status: "in-progress" },
    ]
  },
  {
    quarter: "Q1 2024",
    title: "Decentralization Phase",
    description: "Moving towards a more decentralized platform architecture.",
    status: "in-progress",
    items: [
      { text: "Decentralized storage integration", status: "completed" },
      { text: "Governance mechanism implementation", status: "in-progress" },
      { text: "Community contribution framework", status: "planned" },
    ]
  },
  {
    quarter: "Q2 2024",
    title: "Ecosystem Expansion",
    description: "Expanding the platform ecosystem and third-party integrations.",
    status: "planned",
    items: [
      { text: "Developer API and SDK", status: "planned" },
      { text: "Third-party integration framework", status: "planned" },
      { text: "Expanded agent capabilities", status: "planned" },
    ]
  },
  {
    quarter: "Q3 2024",
    title: "Advanced Collaboration",
    description: "Implementing advanced collaboration features and tools.",
    status: "planned",
    items: [
      { text: "Advanced network orchestration", status: "planned" },
      { text: "Cross-network collaboration", status: "planned" },
      { text: "Collaborative agent training", status: "planned" },
    ]
  },
  {
    quarter: "Q4 2024",
    title: "Global Scaling",
    description: "Scaling the platform globally with enhanced performance and capabilities.",
    status: "planned",
    items: [
      { text: "Global infrastructure scaling", status: "planned" },
      { text: "Enterprise-grade features", status: "planned" },
      { text: "Advanced tokenomics features", status: "planned" },
    ]
  },
];

export default function RoadmapPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <PageTransition>
        <main className="pt-24 pb-16 px-4 sm:px-6 md:px-8 lg:px-12 max-w-[1400px] mx-auto">
          <AnimatedElement animation="fadeIn" delay={0.1}>
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Development <span className="gradient-text">Roadmap</span>
              </h1>
              <p className="text-foreground/70 max-w-2xl mx-auto">
                Our journey to build the most advanced decentralized AI agent platform with blockchain tokenization.
              </p>
            </div>
          </AnimatedElement>
          
          {/* Current Progress Section */}
          <section className="mb-12">
            <ScrollReveal animation="fadeIn">
              <h2 className="text-xl md:text-2xl font-bold mb-6">Current Progress</h2>
            </ScrollReveal>
            
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6" delay={0.1}>
              <ScrollReveal animation="slideUp" delay={0.1}>
                <div className="feature-card h-full">
                  <h3 className="text-lg md:text-xl font-semibold mb-3">Platform Development</h3>
                  <div className="w-full bg-background/50 h-4 rounded-full mb-2">
                    <div className="bg-primary h-4 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  <p className="text-sm text-foreground/70">
                    75% complete - Core platform features and UI/UX implementation
                  </p>
                </div>
              </ScrollReveal>
              
              <ScrollReveal animation="slideUp" delay={0.2}>
                <div className="feature-card h-full">
                  <h3 className="text-lg md:text-xl font-semibold mb-3">AI Agent Capabilities</h3>
                  <div className="w-full bg-background/50 h-4 rounded-full mb-2">
                    <div className="bg-primary h-4 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <p className="text-sm text-foreground/70">
                    60% complete - Agent creation, customization, and network functionality
                  </p>
                </div>
              </ScrollReveal>
              
              <ScrollReveal animation="slideUp" delay={0.3}>
                <div className="feature-card h-full sm:col-span-2 lg:col-span-1">
                  <h3 className="text-lg md:text-xl font-semibold mb-3">Tokenomics Implementation</h3>
                  <div className="w-full bg-background/50 h-4 rounded-full mb-2">
                    <div className="bg-primary h-4 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                  <p className="text-sm text-foreground/70">
                    40% complete - Token economy, marketplace, and governance
                  </p>
                </div>
              </ScrollReveal>
            </StaggerContainer>
          </section>
          
          {/* Development Timeline */}
          <section className="mb-12">
            <ScrollReveal animation="fadeIn">
              <h2 className="text-xl md:text-2xl font-bold mb-6">Development Timeline</h2>
            </ScrollReveal>
            
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6" delay={0.15}>
              {milestones.map((milestone, index) => (
                <ScrollReveal key={index} animation="slideUp" delay={index * 0.1}>
                  <div className="feature-card h-full">
                    <div className="flex flex-col h-full">
                      <div className="mb-4">
                        <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-2 ${
                          milestone.status === 'completed' ? 'bg-green-500/20 text-green-500' :
                          milestone.status === 'in-progress' ? 'bg-primary/20 text-primary' :
                          'bg-secondary/20 text-secondary-foreground'
                        }`}>
                          {milestone.quarter}
                        </div>
                        <h3 className="text-lg md:text-xl font-semibold mb-2">{milestone.title}</h3>
                        <p className="text-sm text-foreground/70 mb-3">
                          {milestone.description}
                        </p>
                        <div className={`flex items-center gap-2 text-sm ${
                          milestone.status === 'completed' ? 'text-green-500' :
                          milestone.status === 'in-progress' ? 'text-primary' :
                          'text-secondary-foreground'
                        }`}>
                          {milestone.status === 'completed' ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : milestone.status === 'in-progress' ? (
                            <Clock className="w-4 h-4" />
                          ) : (
                            <CircleAlert className="w-4 h-4" />
                          )}
                          <span className="capitalize">{milestone.status}</span>
                        </div>
                      </div>
                      
                      <div className="flex-grow">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {milestone.items.map((item, itemIndex) => (
                            <div key={itemIndex} className="bg-background/50 p-3 rounded-lg">
                              <div className="flex items-start gap-2">
                                {item.status === 'completed' ? (
                                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                ) : item.status === 'in-progress' ? (
                                  <Clock className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                ) : (
                                  <CircleAlert className="w-4 h-4 text-secondary-foreground mt-0.5 flex-shrink-0" />
                                )}
                                <span className="text-sm">{item.text}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </StaggerContainer>
          </section>
          
          {/* Community Feature Voting */}
          <section>
            <ScrollReveal animation="fadeIn">
              <h2 className="text-xl md:text-2xl font-bold mb-6">Community Feature Voting</h2>
            </ScrollReveal>
            
            <ScrollReveal animation="slideUp" delay={0.2}>
              <div className="feature-card">
                <p className="text-foreground/70 mb-6">
                  Help shape the future of TokenMuse by voting on upcoming features and priorities.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-8">
                  <ScrollReveal animation="fadeIn" delay={0.3}>
                    <div className="bg-background/50 p-4 md:p-6 rounded-lg">
                      <h3 className="text-base md:text-lg font-semibold mb-3">Advanced Agent Training</h3>
                      <p className="text-sm text-foreground/70 mb-4">
                        Implement advanced training capabilities for agents, allowing users to fine-tune their behavior and responses.
                      </p>
                      <div className="w-full bg-background h-4 rounded-full mb-2">
                        <div className="bg-primary h-4 rounded-full" style={{ width: '68%' }}></div>
                      </div>
                      <div className="flex justify-between text-xs text-foreground/60">
                        <span>68% Support</span>
                        <span>1,245 Votes</span>
                      </div>
                    </div>
                  </ScrollReveal>
                  
                  <ScrollReveal animation="fadeIn" delay={0.4}>
                    <div className="bg-background/50 p-4 md:p-6 rounded-lg">
                      <h3 className="text-base md:text-lg font-semibold mb-3">Cross-Chain Integration</h3>
                      <p className="text-sm text-foreground/70 mb-4">
                        Expand tokenization capabilities to support multiple blockchain networks and cross-chain functionality.
                      </p>
                      <div className="w-full bg-background h-4 rounded-full mb-2">
                        <div className="bg-primary h-4 rounded-full" style={{ width: '82%' }}></div>
                      </div>
                      <div className="flex justify-between text-xs text-foreground/60">
                        <span>82% Support</span>
                        <span>1,876 Votes</span>
                      </div>
                    </div>
                  </ScrollReveal>
                </div>
                
                <AnimatedElement animation="fadeIn" delay={0.5}>
                  <div className="text-center">
                    <Button variant="app" className="rounded-full">
                      Vote on Features
                    </Button>
                  </div>
                </AnimatedElement>
              </div>
            </ScrollReveal>
          </section>
        </main>
      </PageTransition>
    </div>
  );
} 