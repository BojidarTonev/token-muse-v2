'use client';

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Sparkles, Filter, ArrowUpDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PageTransition, AnimatedElement, StaggerContainer, ScrollReveal } from "@/components/motion";

// Mock data for agents
const agents = [
  {
    id: 1,
    name: "Creative Writer",
    description: "Specialized in generating creative stories, poems, and narrative content.",
    type: "Text",
    image: "/agent-writer.svg",
  },
  {
    id: 2,
    name: "Visual Artist",
    description: "Creates stunning digital art, illustrations, and visual designs.",
    type: "Image",
    image: "/agent-artist.svg",
  },
  {
    id: 3,
    name: "Music Composer",
    description: "Composes original music tracks across various genres and styles.",
    type: "Audio",
    image: "/agent-composer.svg",
  },
  {
    id: 4,
    name: "Code Generator",
    description: "Writes clean, efficient code in multiple programming languages.",
    type: "Code",
    image: "/agent-coder.svg",
  },
  {
    id: 5,
    name: "Data Analyst",
    description: "Processes and visualizes complex data sets for insights.",
    type: "Data",
    image: "/agent-analyst.svg",
  },
  {
    id: 6,
    name: "Marketing Expert",
    description: "Creates compelling marketing copy and campaign strategies.",
    type: "Text",
    image: "/agent-marketer.svg",
  },
];

export default function AgentsPage() {
  return (
    <div className="bg-background text-foreground">
      <Navbar />
      
      <PageTransition>
        <main className="pt-24 pb-16 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <AnimatedElement animation="slideUp">
              <div>
                <h1 className="text-3xl font-bold mb-2">AI Agents</h1>
                <p className="text-foreground/70 max-w-xl">
                  Browse our collection of specialized AI agents, each tokenized as a unique digital asset on the blockchain.
                </p>
              </div>
            </AnimatedElement>
            
            <AnimatedElement animation="slideLeft" delay={0.2}>
              <div className="mt-4 md:mt-0">
                <Link href="/create-agent">
                  <Button variant="app" className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Create Agent
                  </Button>
                </Link>
              </div>
            </AnimatedElement>
          </div>
          
          <AnimatedElement animation="fadeIn" delay={0.3}>
            <div className="flex flex-wrap gap-4 mb-8">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4" />
                Sort
              </Button>
              <Button variant="outline" size="sm" className="bg-primary/10 border-primary text-primary">
                All
              </Button>
              <Button variant="outline" size="sm">Text</Button>
              <Button variant="outline" size="sm">Image</Button>
              <Button variant="outline" size="sm">Audio</Button>
              <Button variant="outline" size="sm">Code</Button>
            </div>
          </AnimatedElement>
          
          <StaggerContainer delayFactor={0.4} staggerChildren={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {agents.map((agent) => (
                <ScrollReveal 
                  key={agent.id} 
                  animation="slideUp" 
                  className="h-full"
                  threshold={0.1}
                >
                  <Link href={`/agents/${agent.id}`} className="block h-full">
                    <div className="feature-card group cursor-pointer h-full">
                      <div className="relative w-full h-48 mb-4 rounded-md overflow-hidden bg-background/50">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Image
                            src={agent.image}
                            alt={agent.name}
                            width={100}
                            height={100}
                            className="transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                        <div className="absolute top-2 right-2 bg-card px-2 py-1 rounded-full text-xs font-medium">
                          {agent.type}
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {agent.name}
                      </h3>
                      <p className="text-sm text-foreground/70 mb-4">
                        {agent.description}
                      </p>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-foreground/60">ID: #{agent.id}</span>
                        <Button variant="outline" size="sm" className="text-primary border-primary hover:bg-primary/10">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </StaggerContainer>
        </main>
      </PageTransition>
    </div>
  );
} 