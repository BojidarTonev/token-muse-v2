'use client';

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Plus, Network, ArrowRight, Zap, Users, Sparkles, Construction } from "lucide-react";
import Image from "next/image";
import { PageTransition, AnimatedElement, StaggerContainer, ScrollReveal } from "@/components/motion";

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

export default function NetworkPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <PageTransition>
        <main className="pt-24 pb-16 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
          <AnimatedElement animation="fadeIn" delay={0.1}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-3xl font-bold">Agent Networks</h1>
                  <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    <Construction className="w-3 h-3" />
                    Coming Soon
                  </span>
                </div>
                <p className="text-foreground/70 max-w-xl">
                  Connect multiple AI agents into collaborative networks to tackle complex creative and problem-solving tasks.
                </p>
              </div>
            </div>
          </AnimatedElement>
          
          {/* Development Banner */}
          <ScrollReveal animation="fadeIn" delay={0.2}>
            <div className="feature-card mb-12 border-primary/20 bg-primary/5">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-full bg-primary/20">
                  <Construction className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">This Feature is Under Development</h2>
              </div>
              <p className="text-foreground/80 mb-4">
                We&lsquo;re working hard to bring you Agent Networks - a revolutionary way to connect multiple specialized AI agents 
                into powerful collaborative systems. Stay tuned for the release!
              </p>
              <div className="bg-background/50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">What to expect:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    <span>Create networks of specialized agents that work together on complex tasks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    <span>Design custom workflows where outputs from one agent become inputs for another</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    <span>Solve problems that require multiple types of expertise and capabilities</span>
                  </li>
                </ul>
              </div>
            </div>
          </ScrollReveal>
          
          {/* Featured Network */}
          <ScrollReveal animation="fadeIn" delay={0.2}>
            <section className="mb-16">
              <div className="feature-card overflow-hidden">
                <div className="flex flex-col md:flex-row gap-8">
                  <AnimatedElement animation="slideRight" delay={0.3} className="md:w-1/2">
                    <h2 className="text-2xl font-semibold mb-4">Featured Network Preview</h2>
                    <h3 className="text-xl font-medium mb-2 text-primary">Narrative Engine</h3>
                    <p className="text-foreground/70 mb-6">
                      A powerful network of specialized agents that collaborate to create immersive narratives across multiple media formats.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-background/50 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Users className="w-4 h-4 text-primary" />
                          <span className="font-medium">8 Agents</span>
                        </div>
                        <span className="text-xs text-foreground/60">Working together</span>
                      </div>
                      
                      <div className="bg-background/50 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Zap className="w-4 h-4 text-primary" />
                          <span className="font-medium">215 Outputs</span>
                        </div>
                        <span className="text-xs text-foreground/60">Generated so far</span>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="border-primary text-primary hover:bg-primary/10" disabled>
                      Coming Soon
                    </Button>
                  </AnimatedElement>
                  
                  <AnimatedElement animation="scale" delay={0.4} className="md:w-1/2 relative min-h-[300px]">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative w-full h-full">
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 glow">
                          <Image 
                            src="/network-icon.svg" 
                            alt="Network Icon" 
                            width={128} 
                            height={128}
                            className="animate-float"
                          />
                        </div>
                        <div className="absolute top-1/4 left-1/4 w-16 h-16 glow">
                          <Image 
                            src="/agent-writer.svg" 
                            alt="Writer Agent" 
                            width={64} 
                            height={64}
                            className="animate-float-slow"
                          />
                        </div>
                        <div className="absolute bottom-1/4 right-1/4 w-16 h-16 glow">
                          <Image 
                            src="/agent-artist.svg" 
                            alt="Artist Agent" 
                            width={64} 
                            height={64}
                            className="animate-float-reverse"
                          />
                        </div>
                        <div className="absolute top-1/3 right-1/4 w-12 h-12 glow">
                          <Image 
                            src="/agent-composer.svg" 
                            alt="Composer Agent" 
                            width={48} 
                            height={48}
                            className="animate-float"
                          />
                        </div>
                        <div className="absolute bottom-1/3 left-1/3 w-12 h-12 glow">
                          <Image 
                            src="/agent-coder.svg" 
                            alt="Coder Agent" 
                            width={48} 
                            height={48}
                            className="animate-float-slow"
                          />
                        </div>
                      </div>
                    </div>
                  </AnimatedElement>
                </div>
              </div>
            </section>
          </ScrollReveal>
          
          {/* Network List */}
          <ScrollReveal animation="fadeIn" delay={0.3}>
            <section>
              <h2 className="text-2xl font-semibold mb-4">Planned Network Templates</h2>
              <p className="text-foreground/70 mb-8">
                These are some of the network templates we&lsquo;re developing for the initial release. Each template will provide a starting point that you can customize for your specific needs.
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
                        <span className="text-xs text-foreground/60">Coming Soon</span>
                        <Button variant="outline" size="sm" className="text-primary border-primary hover:bg-primary/10 flex items-center gap-1" disabled>
                          <Construction className="w-3 h-3" />
                          In Development
                        </Button>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
                
                {/* Join Waitlist Card */}
                <ScrollReveal animation="fadeIn" delay={0.4}>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 flex flex-col items-center justify-center text-center h-[350px] hover:border-primary/50 transition-colors">
                    <div className="w-16 h-16 rounded-full bg-background flex items-center justify-center mb-4">
                      <Plus className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Join the Waitlist</h3>
                    <p className="text-sm text-foreground/70 mb-6">
                      Be the first to know when Agent Networks are available and get early access to this powerful feature.
                    </p>
                    <Button variant="app" size="sm" className="flex items-center gap-2">
                      Join Waitlist
                      <ArrowRight className="w-4 h-4" />
                    </Button>
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