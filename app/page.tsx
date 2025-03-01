import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { Sparkles, Network, MessageSquare } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 opacity-80">
            <div className="relative w-64 h-64 glow">
              <Image 
                src="/token-icon.svg" 
                alt="Token Icon" 
                width={256} 
                height={256}
                className="animate-float"
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
                className="animate-float-slow"
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
                className="animate-float-reverse"
              />
            </div>
          </div>
        </div>
        
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span>Decentralized.</span><br />
            <span>Scalable.</span><br />
            <span className="gradient-text">Liquid.</span>
          </h1>
          <p className="text-lg text-foreground/80 mb-8 max-w-lg">
            A platform for multimodal AI agents with blockchain tokenization, enabling creative collaboration and innovative problem-solving.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/agents">
              <Button variant="app" size="lg" className="rounded-full">
                Explore Agents
              </Button>
            </Link>
            <Link href="/create-agent">
              <Button variant="outline" size="lg" className="rounded-full border-primary text-primary hover:bg-primary/10">
                Create Agent
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Feature Cards Section */}
      <section className="py-16 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="feature-card">
            <div className="mb-4 p-2 rounded-full bg-background w-10 h-10 flex items-center justify-center border border-border">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Create AI Agents</h3>
            <p className="text-sm text-foreground/70">
              Deploy individual multimodal AI agents capable of generating creative outputs including art, music, text, and code based on your prompts.
            </p>
          </div>
          
          {/* Card 2 */}
          <div className="feature-card">
            <div className="mb-4 p-2 rounded-full bg-background w-10 h-10 flex items-center justify-center border border-border">
              <Network className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Build Agent Networks</h3>
            <p className="text-sm text-foreground/70">
              Connect multiple specialized agents into cohesive networks that collaborate on complex tasks, sharing contextual data for unified outputs.
            </p>
          </div>
          
          {/* Card 3 */}
          <div className="feature-card">
            <div className="mb-4 p-2 rounded-full bg-background w-10 h-10 flex items-center justify-center border border-border">
              <MessageSquare className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Narrative-Driven Collaboration</h3>
            <p className="text-sm text-foreground/70">
              Define master narratives that distribute prompts across your agent network, enabling coordinated responses to solve complex creative challenges.
            </p>
          </div>
        </div>
      </section>
      
      {/* TokenMuse Section */}
      <section className="py-16 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-sm uppercase tracking-wider text-foreground/60 mb-2">HOW IT WORKS</h2>
          <h3 className="text-4xl font-bold">
            <span className="gradient-text">$MUSE</span> Token
          </h3>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-lg">
            <p className="text-lg mb-6">
              Each AI agent is tokenized as a unique digital asset on the blockchain. Use $MUSE tokens to create, customize, and deploy agents with advanced capabilities and higher output quality.
            </p>
            <Link href="/tokenomics">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                Learn About Tokenomics
              </Button>
            </Link>
          </div>
          
          <div className="relative w-64 h-64 glow">
            <Image 
              src="/token-3d.svg" 
              alt="MUSE Token" 
              width={256} 
              height={256}
              className="animate-float"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
