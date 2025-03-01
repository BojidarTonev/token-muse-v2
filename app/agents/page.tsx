'use client';

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Wallet, Users } from "lucide-react";
import Link from "next/link";
import { PageTransition, AnimatedElement, StaggerContainer, ScrollReveal } from "@/components/motion";
import { Agent } from "@/lib/supabase";
import { useAppSelector } from "@/redux/store";
import { fetchWithPublicKey } from "@/lib/api-utils";

type AgentTab = 'my-agents' | 'all-agents';

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [publicAgents, setPublicAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [publicLoading, setPublicLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<AgentTab>('my-agents');
  
  // Use Redux store for authentication state
  const { isAuthenticated, publicKey } = useAppSelector(state => state.appState);

  // Debug log to check authentication status
  useEffect(() => {
    console.log("Authentication status:", { isAuthenticated, publicKey });
  }, [isAuthenticated, publicKey]);

  // Fetch user's agents
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        setLoading(true);

        // Capture current values to avoid issues with changing dependencies
        const currentPublicKey = publicKey;
        const currentIsAuthenticated = isAuthenticated;

        // Always attempt to fetch agents if authenticated
        if (currentIsAuthenticated && currentPublicKey) {
          console.log("Fetching agents with public key:", currentPublicKey); // Debug log
          
          const response = await fetchWithPublicKey('/api/agents', currentPublicKey);

          if (!response.ok) {
            console.error('Error response:', response.status, response.statusText);
            // Don't throw an error, just set empty agents
            setAgents([]);
          } else {
            const data = await response.json();
            setAgents(data.agents || []);
          }
        } else {
          // If not authenticated, just set empty agents
          setAgents([]);
        }
      } catch (err) {
        console.error('Error fetching agents:', err);
        // Don't show error to user, just set empty agents
        setAgents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, [isAuthenticated, publicKey]);

  // Fetch all public agents
  useEffect(() => {
    const fetchPublicAgents = async () => {
      try {
        setPublicLoading(true);

        const response = await fetch('/api/agents/public');

        if (!response.ok) {
          console.error('Error fetching public agents:', response.status, response.statusText);
          setPublicAgents([]);
        } else {
          const data = await response.json();
          setPublicAgents(data.agents || []);
        }
      } catch (err) {
        console.error('Error fetching public agents:', err);
        setPublicAgents([]);
      } finally {
        setPublicLoading(false);
      }
    };

    fetchPublicAgents();
  }, []);

  // Determine which agents to display based on active tab
  const displayedAgents = activeTab === 'my-agents' ? agents : publicAgents;
  const isDisplayLoading = activeTab === 'my-agents' ? loading : publicLoading;

  // Render content based on authentication status and data
  const renderContent = () => {
    if (isDisplayLoading) {
      return (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      );
    }

    // Show login prompt if trying to view my agents but not authenticated
    if (activeTab === 'my-agents' && !isAuthenticated) {
      return (
        <div className="bg-card rounded-lg p-8 text-center shadow-sm">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Wallet className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Connect Your Wallet</h3>
          <p className="text-foreground/70 mb-6 max-w-md mx-auto">
            You need to connect your wallet to view your agents and create new ones.
          </p>
        </div>
      );
    }

    if (displayedAgents.length === 0) {
      return (
        <div className="bg-card rounded-lg p-8 text-center shadow-sm">
          {activeTab === 'my-agents' ? (
            <>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No Agents Found</h3>
              <p className="text-foreground/70 mb-6 max-w-md mx-auto">
                You haven&apos;t created any agents yet. Create your first agent to get started.
              </p>
              <Link href="/create-agent">
                <Button variant="app" className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Create Your First Agent
                </Button>
              </Link>
            </>
          ) : (
            <>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No Public Agents Available</h3>
              <p className="text-foreground/70 mb-6 max-w-md mx-auto">
                There are no public agents available at the moment. Be the first to create one!
              </p>
            </>
          )}
        </div>
      );
    }

    return (
      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" delay={0.1}>
        {displayedAgents.map((agent, index) => (
          <ScrollReveal key={`agent-${agent.id}-${index}`} animation="fadeIn" delay={index * 0.05}>
            <Link href={`/agents/${agent.id}`} className="block h-full">
              <div className="feature-card group cursor-pointer h-full hover:border-primary/50 transition-colors">
                <div className="relative w-full h-48 mb-4 rounded-md overflow-hidden bg-background/50">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src={agent.image_url || `/agent-${(agent.type || 'text').toLowerCase()}.svg`}
                      alt={agent.name || 'AI Agent'}
                      className="w-24 h-24 object-contain transition-transform duration-300 group-hover:scale-110"
                      onError={(e) => {
                        // Fallback to a default image if the specified one fails to load
                        const target = e.target as HTMLImageElement;
                        
                        try {
                          // Always use the type-based fallback for simplicity and reliability
                          const safeType = agent.type ? agent.type.toLowerCase() : 'text';
                          target.src = `/agent-${safeType}.svg`;
                        } catch {
                          // If there's any error, use a generic fallback
                          target.src = "/agent-writer.svg";
                        }
                        
                        // If that fails too, use a generic fallback
                        target.onerror = () => {
                          target.src = "/agent-writer.svg";
                          target.onerror = null; // Prevent infinite loop
                        };
                      }}
                    />
                  </div>
                  <div className="absolute top-2 right-2 bg-card px-2 py-1 rounded-full text-xs font-medium">
                    {agent.type || 'Unknown'}
                  </div>
                  {activeTab === 'all-agents' && agent.owner_key === publicKey && (
                    <div className="absolute top-2 left-2 bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                      Your Agent
                    </div>
                  )}
                </div>
                
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {agent.name}
                </h3>
                <p className="text-sm text-foreground/70 mb-4 line-clamp-2">
                  {agent.description || "No description provided."}
                </p>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs text-foreground/60">ID: #{agent.id.substring(0, 8)}</span>
                  <Button variant="outline" size="sm" className="text-primary border-primary hover:bg-primary/10">
                    View Details
                  </Button>
                </div>
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </StaggerContainer>
    );
  };

  return (
    <div className="bg-background text-foreground">
      <PageTransition>
        <main className="pt-24 pb-16 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
          <AnimatedElement animation="fadeIn" delay={0.1}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-2">AI Agents</h1>
                <p className="text-foreground/70 max-w-xl">
                  Browse our collection of specialized AI agents, each tokenized as a unique digital asset on the blockchain.
                </p>
              </div>
              
              <div className="mt-4 md:mt-0">
                <Link href="/create-agent">
                  <Button variant="app" className="flex items-center gap-2" disabled={!isAuthenticated}>
                    <Sparkles className="w-4 h-4" />
                    Create Agent
                  </Button>
                </Link>
              </div>
            </div>
          </AnimatedElement>
          
          <AnimatedElement animation="fadeIn" delay={0.2}>
            <div className="flex mb-8 border-b border-border">
              <button
                className={`px-4 py-2 font-medium text-sm flex items-center gap-2 ${
                  activeTab === 'my-agents' 
                    ? 'text-primary border-b-2 border-primary' 
                    : 'text-foreground/70 hover:text-foreground'
                }`}
                onClick={() => setActiveTab('my-agents')}
              >
                <Wallet className="w-4 h-4" />
                My Agents
              </button>
              <button
                className={`px-4 py-2 font-medium text-sm flex items-center gap-2 ${
                  activeTab === 'all-agents' 
                    ? 'text-primary border-b-2 border-primary' 
                    : 'text-foreground/70 hover:text-foreground'
                }`}
                onClick={() => setActiveTab('all-agents')}
              >
                <Users className="w-4 h-4" />
                All Agents
              </button>
            </div>
          </AnimatedElement>
          
          {renderContent()}
        </main>
      </PageTransition>
    </div>
  );
} 