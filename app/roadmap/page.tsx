'use client';

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, CircleAlert, Users, Vote, Network, Sparkles, Blocks } from "lucide-react";
import { PageTransition, AnimatedElement, StaggerContainer, ScrollReveal } from "@/components/motion";

// Mock data for milestones
const milestones = [
  {
    quarter: "Q3 2024",
    title: "Platform Foundation",
    description: "Initial platform architecture and core functionality development.",
    status: "completed",
    icon: <Sparkles className="w-5 h-5" />,
    items: [
      { text: "Core platform architecture design", status: "completed" },
      { text: "Initial UI/UX development", status: "completed" },
      { text: "Basic agent creation functionality", status: "completed" },
    ]
  },
    {
    quarter: "Q4 2024",
    title: "Tokenomics Implementation",
    description: "Implementing the token economy and marketplace functionality.",
    status: "completed",
    icon: <Blocks className="w-5 h-5" />,
    items: [
      { text: "Token economic model finalization", status: "completed" },
      { text: "Marketplace foundation", status: "completed" },
      { text: "Token utility implementation", status: "completed" },
    ]
  },
  
  {
    quarter: "Q1 2025",
    title: "Network Development",
    description: "Building the foundation for agent networks and collaboration.",
    status: "completed",
    icon: <Network className="w-5 h-5" />,
    items: [
      { text: "Network creation interface", status: "completed" },
      { text: "Agent-to-agent communication", status: "completed" },
      { text: "Network visualization tools", status: "completed" },
    ]
  },
 {
    quarter: "Q2 2025",
    title: "Narrative Engine",
    description: "Implementing collaborative narrative generation capabilities.",
    status: "in-progress",
    icon: <Users className="w-5 h-5" />,
    items: [
      { text: "Multi-agent narrative collaboration", status: "in-progress" },
      { text: "Context-aware content generation", status: "in-progress" },
      { text: "Narrative visualization and editing tools", status: "in-progress" },
    ]
  },
  {
    quarter: "Q3 2025",
    title: "DAO Governance Launch",
    description: "Launching decentralized governance for the platform.",
    status: "planned",
    icon: <Vote className="w-5 h-5" />,
    items: [
      { text: "DAO smart contract development", status: "planned" },
      { text: "Governance proposal system", status: "planned" },
      { text: "Community voting mechanism", status: "planned" },
    ]
  },
  {
    quarter: "Q4 2025",
    title: "Decentralization Phase",
    description: "Moving towards a more decentralized platform architecture.",
    status: "planned",
    icon: <Blocks className="w-5 h-5" />,
    items: [
      { text: "Decentralized storage integration", status: "planned" },
      { text: "Governance mechanism implementation", status: "planned" },
      { text: "Community contribution framework", status: "planned" },
    ]
  },
  {
    quarter: "Q1 2026",
    title: "Ecosystem Expansion",
    description: "Expanding the platform ecosystem and third-party integrations.",
    status: "planned",
    icon: <Sparkles className="w-5 h-5" />,
    items: [
      { text: "Developer API and SDK", status: "planned" },
      { text: "Third-party integration framework", status: "planned" },
      { text: "Expanded agent capabilities", status: "planned" },
    ]
  },
  {
    quarter: "Q2 2026",
    title: "Global Scaling",
    description: "Scaling the platform globally with enhanced performance and capabilities.",
    status: "planned",
    icon: <Sparkles className="w-5 h-5" />,
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
                Our journey to build the most advanced decentralized AI agent platform with blockchain tokenization and DAO governance.
              </p>
            </div>
          </AnimatedElement>
          
          {/* Current Progress Section */}
          <section className="mb-16">
            <ScrollReveal animation="fadeIn">
              <h2 className="text-xl md:text-2xl font-bold mb-6">Current Progress</h2>
            </ScrollReveal>
            
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6" delay={0.1}>
              <ScrollReveal animation="slideUp" delay={0.1}>
                <div className="feature-card h-full relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary/30"></div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-full bg-primary/10">
                        <Sparkles className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="text-lg md:text-xl font-semibold">Platform Development</h3>
                    </div>
                    <div className="w-full bg-background/50 h-3 rounded-full mb-2 overflow-hidden">
                      <div className="bg-primary h-3 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                    <div className="flex justify-between text-xs text-foreground/60 mb-4">
                      <span>75% complete</span>
                      <span className="text-primary font-medium">In Progress</span>
                    </div>
                    <p className="text-sm text-foreground/70">
                      Core platform features and UI/UX implementation
                    </p>
                  </div>
                </div>
              </ScrollReveal>
              
              <ScrollReveal animation="slideUp" delay={0.2}>
                <div className="feature-card h-full relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary/30"></div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-full bg-primary/10">
                        <Network className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="text-lg md:text-xl font-semibold">Network Development</h3>
                    </div>
                    <div className="w-full bg-background/50 h-3 rounded-full mb-2 overflow-hidden">
                      <div className="bg-primary h-3 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                    <div className="flex justify-between text-xs text-foreground/60 mb-4">
                      <span>90% complete</span>
                      <span className="text-primary font-medium">In Progress</span>
                    </div>
                    <p className="text-sm text-foreground/70">
                      Agent networks and collaborative systems
                    </p>
                  </div>
                </div>
              </ScrollReveal>
              
              <ScrollReveal animation="slideUp" delay={0.3}>
                <div className="feature-card h-full relative overflow-hidden group sm:col-span-2 lg:col-span-1">
                  <div className="absolute top-0 left-0 w-1 h-full bg-secondary/30"></div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-full bg-secondary/10">
                        <Vote className="w-5 h-5 text-secondary-foreground" />
                      </div>
                      <h3 className="text-lg md:text-xl font-semibold">DAO Governance</h3>
                    </div>
                    <div className="w-full bg-background/50 h-3 rounded-full mb-2 overflow-hidden">
                      <div className="bg-primary h-3 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                    <div className="flex justify-between text-xs text-foreground/60 mb-4">
                      <span>60% complete</span>
                      <span className="text-secondary-foreground font-medium">In Progress</span>
                    </div>
                    <p className="text-sm text-foreground/70">
                      DAO structure, governance mechanisms, and community voting
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </StaggerContainer>
          </section>
          
          {/* DAO Governance Section */}
          <section className="mb-16">
            <ScrollReveal animation="fadeIn">
              <h2 className="text-xl md:text-2xl font-bold mb-6">DAO Governance</h2>
            </ScrollReveal>
            
            <ScrollReveal animation="slideUp" delay={0.2}>
              <div className="feature-card p-6 border-primary/20 bg-primary/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>
                
                <div className="flex flex-col md:flex-row gap-8 relative">
                  <div className="md:w-2/3">
                    <h3 className="text-xl font-semibold mb-4">Decentralized Autonomous Organization</h3>
                    <p className="text-foreground/80 mb-4">
                      We&lsquo;re building a DAO to give our community direct control over the platform&#39;s future. Token holders will be able to propose and vote on key decisions, ensuring the platform evolves according to the needs of its users.
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div className="bg-background/50 p-4 rounded-lg backdrop-blur-sm">
                        <div className="flex items-center gap-2 mb-2">
                          <Vote className="w-5 h-5 text-primary" />
                          <span className="font-medium">Governance Voting</span>
                        </div>
                        <p className="text-sm text-foreground/70">
                          Token holders will be able to vote on platform upgrades, feature prioritization, and treasury allocations.
                        </p>
                      </div>
                      
                      <div className="bg-background/50 p-4 rounded-lg backdrop-blur-sm">
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="w-5 h-5 text-primary" />
                          <span className="font-medium">Community-Led Development</span>
                        </div>
                        <p className="text-sm text-foreground/70">
                          The community will be able to propose new features, improvements, and partnerships through the DAO.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:w-1/3 flex items-center justify-center">
                    <div className="relative w-48 h-48">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center animate-pulse-slow">
                          <div className="w-24 h-24 rounded-full bg-primary/30 flex items-center justify-center">
                            <div className="w-16 h-16 rounded-full bg-primary/40 flex items-center justify-center">
                              <Vote className="w-8 h-8 text-primary" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </section>
          
          {/* Development Timeline */}
          <section className="mb-16">
            <ScrollReveal animation="fadeIn">
              <h2 className="text-xl md:text-2xl font-bold mb-6">Development Timeline</h2>
            </ScrollReveal>
            
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6" delay={0.15}>
              {milestones.map((milestone, index) => (
                <ScrollReveal key={index} animation="slideUp" delay={index * 0.1}>
                  <div className={`feature-card h-full relative overflow-hidden ${
                    milestone.status === 'completed' ? 'border-green-500/20' :
                    milestone.status === 'in-progress' ? 'border-primary/20' :
                    'border-secondary/20'
                  }`}>
                    <div className={`absolute top-0 left-0 w-1 h-full ${
                      milestone.status === 'completed' ? 'bg-green-500' :
                      milestone.status === 'in-progress' ? 'bg-primary' :
                      'bg-secondary/50'
                    }`}></div>
                    
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                          milestone.status === 'completed' ? 'bg-green-500/20 text-green-500' :
                          milestone.status === 'in-progress' ? 'bg-primary/20 text-primary' :
                          'bg-secondary/20 text-secondary-foreground'
                        }`}>
                          {milestone.quarter}
                          {milestone.status === 'completed' ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : milestone.status === 'in-progress' ? (
                            <Clock className="w-4 h-4" />
                          ) : (
                            <CircleAlert className="w-4 h-4" />
                          )}
                        </div>
                        
                        <div className={`p-2 rounded-full ${
                          milestone.status === 'completed' ? 'bg-green-500/10' :
                          milestone.status === 'in-progress' ? 'bg-primary/10' :
                          'bg-secondary/10'
                        }`}>
                          <div className={
                            milestone.status === 'completed' ? 'text-green-500' :
                            milestone.status === 'in-progress' ? 'text-primary' :
                            'text-secondary-foreground'
                          }>
                            {milestone.icon}
                          </div>
                        </div>
                      </div>
                      
                      <h3 className="text-lg md:text-xl font-semibold mb-2">{milestone.title}</h3>
                      <p className="text-sm text-foreground/70 mb-4">
                        {milestone.description}
                      </p>
                      
                      <div className="flex-grow">
                        <div className="space-y-3">
                          {milestone.items.map((item, itemIndex) => (
                            <div key={itemIndex} className={`p-3 rounded-lg ${
                              item.status === 'completed' ? 'bg-green-500/5 border border-green-500/20' :
                              item.status === 'in-progress' ? 'bg-primary/5 border border-primary/20' :
                              'bg-background/50 border border-border/10'
                            }`}>
                              <div className="flex items-start gap-2">
                                {item.status === 'completed' ? (
                                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                ) : item.status === 'in-progress' ? (
                                  <Clock className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                ) : (
                                  <CircleAlert className="w-4 h-4 text-secondary-foreground mt-0.5 flex-shrink-0" />
                                )}
                                <span className={`text-sm ${
                                  item.status === 'completed' ? 'text-green-500' :
                                  item.status === 'in-progress' ? 'text-primary' :
                                  'text-foreground/70'
                                }`}>{item.text}</span>
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
              <div className="feature-card p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-xl"></div>
                
                <p className="text-foreground/70 mb-8 max-w-2xl">
                  Help shape the future of TokenMuse by voting on upcoming features and priorities. This is a preview of how our DAO governance will work.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-8">
                  <ScrollReveal animation="fadeIn" delay={0.3}>
                    <div className="bg-background/50 p-5 rounded-lg border border-border/10 relative overflow-hidden">
                      <div className="absolute top-0 right-0 h-full w-1 bg-primary/20 rounded-r-lg"></div>
                      <h3 className="text-base md:text-lg font-semibold mb-3">Advanced Agent Training</h3>
                      <p className="text-sm text-foreground/70 mb-4">
                        Implement advanced training capabilities for agents, allowing users to fine-tune their behavior and responses.
                      </p>
                      <div className="w-full bg-background h-3 rounded-full mb-2 overflow-hidden">
                        <div className="bg-primary h-3 rounded-full" style={{ width: '68%' }}></div>
                      </div>
                      <div className="flex justify-between text-xs text-foreground/60">
                        <span>68% Support</span>
                        <span>1,245 Votes</span>
                      </div>
                    </div>
                  </ScrollReveal>
                  
                  <ScrollReveal animation="fadeIn" delay={0.4}>
                    <div className="bg-background/50 p-5 rounded-lg border border-border/10 relative overflow-hidden">
                      <div className="absolute top-0 right-0 h-full w-1 bg-primary rounded-r-lg"></div>
                      <h3 className="text-base md:text-lg font-semibold mb-3">Cross-Chain Integration</h3>
                      <p className="text-sm text-foreground/70 mb-4">
                        Expand tokenization capabilities to support multiple blockchain networks and cross-chain functionality.
                      </p>
                      <div className="w-full bg-background h-3 rounded-full mb-2 overflow-hidden">
                        <div className="bg-primary h-3 rounded-full" style={{ width: '82%' }}></div>
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
                    <Button variant="app" className="rounded-full px-8">
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