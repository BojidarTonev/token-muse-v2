'use client';

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Sparkles, 
  BookOpen, 
  Lightbulb, 
  Network, 
  Layers, 
  Zap, 
  FileText, 
  Pencil, 
  MessageSquare, 
  AlertCircle,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { PageTransition, AnimatedElement, ScrollReveal } from "@/components/motion";
import Navbar from "@/components/Navbar";

export default function NarrativePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <PageTransition>
        <main className="pt-24 pb-16 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
          <AnimatedElement animation="fadeIn" delay={0.1}>
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3">
                <h1 className="text-3xl font-bold">Narrative Engine</h1>
                <div className="px-3 py-1 bg-amber-500/10 text-amber-500 rounded-full text-xs font-medium flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  Coming Soon
                </div>
              </div>
              <p className="text-foreground/70 max-w-xl mx-auto mt-2">
                Harness the collective intelligence of agent networks to craft compelling narratives and content.
              </p>
            </div>
          </AnimatedElement>
          
          <AnimatedElement animation="fadeIn" delay={0.2}>
            <div className="feature-card overflow-hidden border-primary/30 bg-gradient-to-br from-background to-primary/5 mb-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-full bg-primary/10">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Introducing Narrative Engine</h2>
                  <p className="text-foreground/70">Transform your ideas into rich, multi-dimensional content</p>
                </div>
              </div>
              
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-1/2">
                  <p className="text-foreground/80 mb-6">
                    The Narrative Engine represents the next evolution in AI-powered content creation. By leveraging the 
                    combined capabilities of specialized agent networks, it transforms simple prompts into rich, 
                    contextually-aware narratives that capture the depth and nuance of your vision.
                  </p>
                  
                  <p className="text-foreground/80 mb-6">
                    Unlike traditional single-agent approaches, the Narrative Engine orchestrates multiple AI agents, 
                    each contributing their unique expertise to different aspects of your content. This collaborative 
                    approach results in more comprehensive, creative, and coherent outputs that truly understand the 
                    context of your request.
                  </p>
                  
                  <div className="bg-background/50 p-5 rounded-lg mb-6">
                    <h4 className="font-medium mb-4 flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-primary" />
                      How It Works
                    </h4>
                    
                    <ol className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-primary text-sm font-medium">1</span>
                        </div>
                        <div>
                          <span className="font-medium">Provide Context</span>
                          <p className="text-sm text-foreground/70 mt-1">
                            Share your vision, goals, and specific requirements for the narrative.
                          </p>
                        </div>
                      </li>
                      
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-primary text-sm font-medium">2</span>
                        </div>
                        <div>
                          <span className="font-medium">Select Network</span>
                          <p className="text-sm text-foreground/70 mt-1">
                            Choose from specialized agent networks designed for different content types and purposes.
                          </p>
                        </div>
                      </li>
                      
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-primary text-sm font-medium">3</span>
                        </div>
                        <div>
                          <span className="font-medium">Collaborative Creation</span>
                          <p className="text-sm text-foreground/70 mt-1">
                            Watch as multiple agents work together, each contributing their specialized expertise.
                          </p>
                        </div>
                      </li>
                      
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-primary text-sm font-medium">4</span>
                        </div>
                        <div>
                          <span className="font-medium">Refine & Iterate</span>
                          <p className="text-sm text-foreground/70 mt-1">
                            Provide feedback to refine the output until it perfectly matches your vision.
                          </p>
                        </div>
                      </li>
                    </ol>
                  </div>
                </div>
                
                <div className="lg:w-1/2">
                  <div className="feature-card h-full bg-background/50 flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-full bg-primary/10">
                        <Pencil className="w-4 h-4 text-primary" />
                      </div>
                      <h3 className="text-lg font-medium">Preview Experience</h3>
                    </div>
                    
                    <div className="flex-1 flex flex-col">
                      <div className="mb-4">
                        <label className="text-sm font-medium mb-2 block">Your Context</label>
                        <Textarea 
                          placeholder="Describe your narrative context and requirements..." 
                          rows={4}
                          className="resize-none bg-background/50"
                          disabled
                        />
                      </div>
                      
                      <div className="mb-4">
                        <label className="text-sm font-medium mb-2 block">Select Network</label>
                        <div className="bg-background/50 border border-border rounded-md p-3 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Network className="w-5 h-5 text-primary" />
                            <span>Storytelling Network</span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-foreground/50" />
                        </div>
                      </div>
                      
                      <div className="flex justify-end mb-6">
                        <Button 
                          variant="app" 
                          className="flex items-center gap-2 cursor-pointer"
                          disabled
                        >
                          <Sparkles className="w-4 h-4" />
                          Generate Narrative
                        </Button>
                      </div>
                      
                      <div className="flex-1 bg-background/30 border border-dashed border-border rounded-md p-4 flex items-center justify-center">
                        <div className="text-center">
                          <Sparkles className="w-8 h-8 text-primary/50 mx-auto mb-3" />
                          <p className="text-foreground/50 font-medium">Narrative output will appear here</p>
                          <p className="text-sm text-foreground/40 mt-1">Coming soon</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedElement>
          
          <ScrollReveal animation="fadeIn" delay={0.3}>
            <section className="mb-16">
              <h2 className="text-2xl font-semibold mb-4">Capabilities & Applications</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="feature-card">
                  <div className="p-3 rounded-full bg-primary/10 w-fit mb-4">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Content Creation</h3>
                  <p className="text-foreground/70">
                    Generate blog posts, articles, marketing copy, and other written content with depth and coherence that 
                    reflects your brand voice and messaging goals.
                  </p>
                </div>
                
                <div className="feature-card">
                  <div className="p-3 rounded-full bg-primary/10 w-fit mb-4">
                    <Layers className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Storytelling</h3>
                  <p className="text-foreground/70">
                    Craft compelling narratives, stories, and scenarios with rich character development, engaging plot 
                    structures, and thematic depth.
                  </p>
                </div>
                
                <div className="feature-card">
                  <div className="p-3 rounded-full bg-primary/10 w-fit mb-4">
                    <MessageSquare className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Conversational Content</h3>
                  <p className="text-foreground/70">
                    Create dialogue, scripts, and conversational content that feels natural, contextually appropriate, 
                    and true to character voices.
                  </p>
                </div>
              </div>
            </section>
          </ScrollReveal>
          
          <ScrollReveal animation="fadeIn" delay={0.4}>
            <section className="mb-16">
              <div className="feature-card bg-primary/5 border-primary/20">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">Be Among the First</h2>
                    <p className="text-foreground/70">Join our waitlist to get early access to the Narrative Engine</p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="md:flex-1">
                    <p className="text-foreground/80 mb-4">
                      The Narrative Engine is currently in development and will be available soon. Join our waitlist to be 
                      among the first to experience this revolutionary approach to AI-powered content creation.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link href="/network" className="flex-1">
                        <Button 
                          variant="outline" 
                          className="w-full flex items-center gap-2 cursor-pointer"
                        >
                          <Network className="w-4 h-4" />
                          Explore Networks
                        </Button>
                      </Link>
                      
                      <Button 
                        variant="app" 
                        className="flex-1 flex items-center gap-2 cursor-pointer"
                      >
                        <Sparkles className="w-4 h-4" />
                        Join Waitlist
                      </Button>
                    </div>
                  </div>
                  
                  <div className="md:w-1/3 flex justify-center">
                    <div className="relative w-48 h-48">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center animate-pulse-slow">
                          <BookOpen className="w-16 h-16 text-primary/70" />
                        </div>
                      </div>
                      <div className="absolute top-0 left-0 w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center animate-float-slow">
                        <Pencil className="w-6 h-6 text-blue-500" />
                      </div>
                      <div className="absolute bottom-4 right-0 w-14 h-14 rounded-full bg-amber-500/10 flex items-center justify-center animate-float-slow-reverse">
                        <Sparkles className="w-7 h-7 text-amber-500" />
                      </div>
                      <div className="absolute bottom-0 left-4 w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center animate-float-slow">
                        <Lightbulb className="w-5 h-5 text-green-500" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </ScrollReveal>
        </main>
      </PageTransition>
    </div>
  );
} 