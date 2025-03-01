'use client';

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Plus, Network, ArrowRight, Zap, Users, Sparkles, Star, Brain, Cpu, Rocket, Database, Link as LinkIcon, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PageTransition, AnimatedElement, StaggerContainer, ScrollReveal } from "@/components/motion";
import { useState } from "react";

// Mock data for networks
const networks = [
  {
    id: 1,
    name: "Creative Studio",
    description: "A network of agents specialized in creative content production, including writing, visual art, and music composition.",
    agents: 5,
    outputs: 127,
    image: "/network-creative.svg",
  },
  {
    id: 2,
    name: "Marketing Suite",
    description: "Interconnected agents focused on marketing content creation, campaign analysis, and audience targeting.",
    agents: 4,
    outputs: 89,
    image: "/network-marketing.svg",
  },
  {
    id: 3,
    name: "Development Team",
    description: "A collaborative network of coding agents that work together to build software solutions.",
    agents: 6,
    outputs: 152,
    image: "/network-dev.svg",
  },
];

// Featured network with existing agents
const featuredNetwork = {
  id: "innovation-nexus",
  name: "Innovation Nexus",
  description: "Our flagship network combining strategic thinking, creative innovation, and technical expertise to solve complex problems and generate breakthrough ideas.",
  agents: [
    { name: "Quantum", role: "Strategic Analysis", icon: Brain, color: "text-blue-500" },
    { name: "Athena", role: "Knowledge Integration", icon: Database, color: "text-purple-500" },
    { name: "Nexus", role: "System Architecture", icon: Cpu, color: "text-green-500" },
    { name: "Nova", role: "Creative Synthesis", icon: Sparkles, color: "text-amber-500" },
    { name: "Aria", role: "Communication", icon: LinkIcon, color: "text-rose-500" }
  ],
  capabilities: [
    "Cross-domain problem solving",
    "Innovative concept generation",
    "Technical implementation planning",
    "Knowledge synthesis and integration",
    "Strategic roadmap development"
  ],
  image: "/network-innovation.svg"
};

export default function NetworkPage() {
  const [showContent, setShowContent] = useState(false);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <PageTransition>
        <main className="pt-24 pb-16 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
          <AnimatedElement animation="fadeIn" delay={0.1}>
            <div className="flex flex-col md:flex-row justify-center items-center text-center md:items-center mb-6">
              <div>
                <div className="mb-4">
                  <h1 className="text-3xl font-bold">Agent Networks</h1>
                </div>
                <p className="text-foreground/70 max-w-xl">
                  Connect multiple AI agents into collaborative networks to tackle complex creative and problem-solving tasks.
                </p>
              </div>
            </div>
          </AnimatedElement>
          
          {/* Featured Network - Developer Showcase */}
          <ScrollReveal animation="fadeIn" delay={0.2}>
            <section className="mb-16">
              <div className="feature-card overflow-hidden border-primary/30 bg-gradient-to-br from-background to-primary/5">
                <div className="absolute top-4 right-4 bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                  <Star className="w-3 h-3" fill="currentColor" />
                  Developer Showcase
                </div>
                
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h2 className="text-2xl font-semibold mb-2">Featured Network</h2>
                    <h3 className="text-xl font-medium text-primary">{featuredNetwork.name}</h3>
                  </div>
                  <Button 
                    variant="ghost" 
                    className="p-2 hover:bg-primary/10 rounded-full flex items-center gap-2 cursor-pointer"
                    onClick={() => setShowContent(!showContent)}
                  >
                    <span className="text-sm text-foreground/70">
                      {showContent ? "Hide details" : "Show details"}
                    </span>
                    {showContent ? (
                      <ChevronUp className="w-5 h-5 text-primary" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-primary" />
                    )}
                  </Button>
                </div>
                
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="lg:w-1/2">
                    <p className="text-foreground/80 mb-6">
                      {featuredNetwork.description}
                    </p>
                    
                    {/* Network details that will be shown/hidden */}
                    <div 
                      className={`transition-all duration-500 ease-in-out overflow-hidden ${
                        showContent ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="bg-background/50 p-5 rounded-lg mb-6">
                        <h4 className="font-medium mb-4 flex items-center gap-2">
                          <Users className="w-4 h-4 text-primary" />
                          Network Agents
                        </h4>
                        
                        <div className="space-y-3">
                          {featuredNetwork.agents.map((agent) => (
                            <div key={agent.name} className="flex items-center gap-3 p-3 rounded-md bg-background/70 hover:bg-background transition-colors">
                              <div className={`p-2 rounded-full ${agent.color.replace('text-', 'bg-')}/10`}>
                                <agent.icon className={`w-4 h-4 ${agent.color}`} />
                              </div>
                              <div>
                                <div className="font-medium">{agent.name}</div>
                                <div className="text-xs text-foreground/60">{agent.role}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="bg-background/50 p-5 rounded-lg mb-6">
                        <h4 className="font-medium mb-4 flex items-center gap-2">
                          <Zap className="w-4 h-4 text-primary" />
                          Network Capabilities
                        </h4>
                        
                        <ul className="space-y-2">
                          {featuredNetwork.capabilities.map((capability) => (
                            <li key={capability} className="flex items-start gap-2">
                              <Rocket className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                              <span>{capability}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <Link href="/create-network">
                      <Button variant="app" className="flex items-center gap-2 cursor-pointer">
                        <Plus className="w-4 h-4" />
                        Create Your Own Network
                      </Button>
                    </Link>
                  </div>
                  
                  <div className="lg:w-1/2 relative min-h-[400px]">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative w-full h-full">
                        {/* Central network hub */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 glow">
                          <Image 
                            src="/network-icon.svg" 
                            alt="Network Hub" 
                            width={128} 
                            height={128}
                            className="animate-pulse"
                          />
                        </div>
                        
                        {/* Agent nodes with connecting lines - always visible */}
                        {featuredNetwork.agents.map((agent, index) => {
                          // Calculate position in a circle around the center
                          const angle = (index / featuredNetwork.agents.length) * Math.PI * 2;
                          const radius = 120; // Distance from center
                          const top = `calc(50% + ${Math.sin(angle) * radius}px)`;
                          const left = `calc(50% + ${Math.cos(angle) * radius}px)`;
                          
                          return (
                            <div key={agent.name} className="absolute w-16 h-16 transform -translate-x-1/2 -translate-y-1/2 glow" style={{ top, left }}>
                              {/* Connection line to center */}
                              <div className="absolute top-1/2 left-1/2 w-[120px] h-0.5 bg-gradient-to-r from-primary/10 to-primary/50 origin-left" 
                                style={{ transform: `rotate(${angle + Math.PI}rad)` }} />
                              
                              {/* Agent icon */}
                              <div className={`w-16 h-16 rounded-full ${agent.color.replace('text-', 'bg-')}/10 flex items-center justify-center animate-float-slow border border-${agent.color.replace('text-', '')}/20`}>
                                <agent.icon className={`w-8 h-8 ${agent.color}`} />
                              </div>
                              
                              {/* Agent name */}
                              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 whitespace-nowrap text-xs font-medium">
                                {agent.name}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </ScrollReveal>
          
          {/* What are Networks? */}
          <ScrollReveal animation="fadeIn" delay={0.3}>
            <section className="mb-16">
              <h2 className="text-2xl font-semibold mb-4">What are Agent Networks?</h2>
              <div className="feature-card">
                <p className="text-foreground/80 mb-6">
                  Agent Networks are powerful systems that connect multiple specialized AI agents to work together on complex tasks. 
                  By combining the unique capabilities of different agents, networks can achieve results that would be impossible for a single agent.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-background/50 p-5 rounded-lg">
                    <div className="p-3 rounded-full bg-primary/10 w-fit mb-4">
                      <LinkIcon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Seamless Collaboration</h3>
                    <p className="text-sm text-foreground/70">
                      Agents in a network communicate with each other, passing information and results between them to build on each other&apos;s work.
                    </p>
                  </div>
                  
                  <div className="bg-background/50 p-5 rounded-lg">
                    <div className="p-3 rounded-full bg-primary/10 w-fit mb-4">
                      <Zap className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Enhanced Capabilities</h3>
                    <p className="text-sm text-foreground/70">
                      Networks combine the strengths of multiple agents, enabling them to tackle more complex problems than any single agent could handle.
                    </p>
                  </div>
                  
                  <div className="bg-background/50 p-5 rounded-lg">
                    <div className="p-3 rounded-full bg-primary/10 w-fit mb-4">
                      <Rocket className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Workflow Automation</h3>
                    <p className="text-sm text-foreground/70">
                      Define custom workflows where outputs from one agent automatically become inputs for another, creating efficient processing pipelines.
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <Link href="/create-network">
                    <Button variant="app" size="lg" className="flex items-center gap-2 cursor-pointer">
                      <Plus className="w-4 h-4" />
                      Create Your First Network
                    </Button>
                  </Link>
                </div>
              </div>
            </section>
          </ScrollReveal>
          
          {/* Network List */}
          <ScrollReveal animation="fadeIn" delay={0.3}>
            <section>
              <h2 className="text-2xl font-semibold mb-4">Network Templates</h2>
              <p className="text-foreground/70 mb-8">
                Start with one of our pre-configured network templates or create your own custom network from scratch.
              </p>
              
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6" delay={0.1}>
                {networks.map((network, index) => (
                  <ScrollReveal key={network.id} animation="slideUp" delay={index * 0.05}>
                    <div className="feature-card group h-full">
                      <div className="relative w-full h-48 mb-4 rounded-md overflow-hidden bg-background/50">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Image
                            src={network.image}
                            alt={network.name}
                            width={100}
                            height={100}
                            className="transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                        <div className="absolute top-2 right-2 bg-card px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                          <Network className="w-3 h-3" />
                          <span>{network.agents} Agents</span>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {network.name}
                      </h3>
                      <p className="text-sm text-foreground/70 mb-4">
                        {network.description}
                      </p>
                      
                      <div className="flex justify-between items-center">
                        <Link href="/create-network">
                          <Button variant="outline" size="sm" className="text-primary border-primary hover:bg-primary/10 flex items-center gap-1">
                            <Plus className="w-3 h-3" />
                            Use Template
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
                
                {/* Create Custom Network Card */}
                <ScrollReveal animation="fadeIn" delay={0.4}>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 flex flex-col items-center justify-center text-center h-[350px] hover:border-primary/50 transition-colors">
                    <div className="w-16 h-16 rounded-full bg-background flex items-center justify-center mb-4">
                      <Plus className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Create Custom Network</h3>
                    <p className="text-sm text-foreground/70 mb-6">
                      Build your own custom network from scratch by selecting agents and defining their connections.
                    </p>
                    <Link href="/create-network">
                      <Button variant="app" size="sm" className="flex items-center gap-2" disabled>
                        Start Building
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </ScrollReveal>
              </StaggerContainer>
            </section>
          </ScrollReveal>
        </main>
      </PageTransition>
    </div>
  );
} 