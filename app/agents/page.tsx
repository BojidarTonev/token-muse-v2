"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Wallet, Users } from "lucide-react";
import Link from "next/link";
import {
  PageTransition,
  AnimatedElement,
  StaggerContainer,
  ScrollReveal,
} from "@/components/motion";
import { Agent } from "@/lib/supabase";
import { useAppSelector } from "@/redux/store";
import { fetchWithPublicKey } from "@/lib/api-utils";

type AgentTab = "my-agents" | "all-agents";

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [publicAgents, setPublicAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [publicLoading, setPublicLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<AgentTab>("my-agents");

  // Use Redux store for authentication state
  const { isAuthenticated, publicKey } = useAppSelector(
    (state) => state.appState
  );

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

          const response = await fetchWithPublicKey(
            "/api/agents",
            currentPublicKey
          );

          if (!response.ok) {
            console.error(
              "Error response:",
              response.status,
              response.statusText
            );
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
        console.error("Error fetching agents:", err);
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

        const response = await fetch("/api/agents/public");

        if (!response.ok) {
          console.error(
            "Error fetching public agents:",
            response.status,
            response.statusText
          );
          setPublicAgents([]);
        } else {
          const data = await response.json();
          setPublicAgents(data.agents || []);
        }
      } catch (err) {
        console.error("Error fetching public agents:", err);
        setPublicAgents([]);
      } finally {
        setPublicLoading(false);
      }
    };

    fetchPublicAgents();
  }, []);

  // Determine which agents to display based on active tab
  const displayedAgents = activeTab === "my-agents" ? agents : publicAgents;
  const isDisplayLoading = activeTab === "my-agents" ? loading : publicLoading;

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
    if (activeTab === "my-agents" && !isAuthenticated) {
      return (
        <div className="bg-card/80 backdrop-blur-sm rounded-lg p-8 text-center shadow-sm border border-border/30">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Wallet className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-3">Connect Your Wallet</h3>
          <p className="text-foreground/70 mb-8 max-w-md mx-auto leading-relaxed">
            You need to connect your wallet to view your agents and create new
            ones.
          </p>
        </div>
      );
    }

    // Show login prompt if viewing all agents but not authenticated
    if (activeTab === "all-agents" && !isAuthenticated) {
      return (
        <div className="bg-card/80 backdrop-blur-sm rounded-lg p-8 text-center shadow-sm border border-border/30">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Users className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-3">Connect Your Wallet</h3>
          <p className="text-foreground/70 mb-8 max-w-md mx-auto leading-relaxed">
            Connect your wallet to browse all available agents and interact with
            the Agent Mint ecosystem.
          </p>
        </div>
      );
    }

    if (displayedAgents.length === 0) {
      return (
        <div className="bg-card/80 backdrop-blur-sm rounded-lg p-8 text-center shadow-sm border border-border/30">
          {activeTab === "my-agents" ? (
            <>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">No Agents Found</h3>
              <p className="text-foreground/70 mb-8 max-w-md mx-auto leading-relaxed">
                You haven&apos;t created any agents yet. Create your first agent
                to get started.
              </p>
              <div className="flex justify-center">
                <Link href="/create-agent">
                  <Button
                    variant="app"
                    className="flex items-center gap-2 cursor-pointer rounded-full px-6 py-3 h-auto"
                  >
                    <Sparkles className="w-4 h-4" />
                    Create Your First Agent
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                No Public Agents Available
              </h3>
              <p className="text-foreground/70 mb-8 max-w-md mx-auto leading-relaxed">
                There are no public agents available at the moment. Be the first
                to create one!
              </p>
            </>
          )}
        </div>
      );
    }

    return (
      <StaggerContainer
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        delay={0.1}
      >
        {displayedAgents.map((agent, index) => (
          <ScrollReveal
            key={`agent-${agent.id}-${index}`}
            animation="fadeIn"
            delay={index * 0.05}
          >
            <Link href={`/agents/${agent.id}`} className="block h-full">
              <div className="feature-card group cursor-pointer h-full hover:border-primary/50 transition-colors">
                <div className="relative w-full h-48 mb-4 rounded-md overflow-hidden bg-background/50">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src={`/agent-${(agent.type || "text").toLowerCase()}.svg`}
                      alt={agent.name || "AI Agent"}
                      className="w-24 h-24 object-contain transition-transform duration-300 group-hover:scale-110"
                      onError={(e) => {
                        // Fallback to a default image if the specified one fails to load
                        const target = e.target as HTMLImageElement;
                        target.src = "/agent-writer.svg"; // Simple fallback
                      }}
                    />
                  </div>
                  <div className="absolute top-2 right-2 bg-card/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium border border-border/20">
                    {agent.type || "Unknown"}
                  </div>
                  {activeTab === "all-agents" &&
                    agent.owner_key === publicKey && (
                      <div className="absolute top-2 left-2 bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium border border-primary/20">
                        Your Agent
                      </div>
                    )}
                </div>

                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {agent.name}
                </h3>
                <p className="text-sm text-foreground/70 mb-4 line-clamp-2 leading-relaxed">
                  {agent.description || "No description provided."}
                </p>

                <div className="flex justify-between items-center">
                  <span className="text-xs text-foreground/60">
                    ID: #{agent.id.substring(0, 8)}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs px-3 py-1 h-auto rounded-full border-primary/20 text-primary hover:bg-primary/10"
                  >
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
    <PageTransition>
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-12">
        <div className="mb-12">
          <AnimatedElement animation="slideUp" delay={0.1}>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">AI Agents</h1>
          </AnimatedElement>
          <AnimatedElement animation="fadeIn" delay={0.2}>
            <p className="text-foreground/70 max-w-2xl leading-relaxed">
              Browse and interact with AI agents that can generate creative
              outputs including art, music, text, and code. Connect your wallet
              to create your own agents.
            </p>
          </AnimatedElement>
        </div>

        <AnimatedElement animation="fadeIn" delay={0.3}>
          <div className="flex flex-wrap gap-2 mb-8 p-1 bg-background/50 backdrop-blur-sm rounded-full border border-border/20 inline-flex">
            <button
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === "my-agents"
                  ? "bg-primary text-white shadow-md"
                  : "text-foreground/70 hover:text-foreground hover:bg-background/80"
              }`}
              onClick={() => setActiveTab("my-agents")}
            >
              My Agents
            </button>
            <button
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === "all-agents"
                  ? "bg-primary text-white shadow-md"
                  : "text-foreground/70 hover:text-foreground hover:bg-background/80"
              }`}
              onClick={() => setActiveTab("all-agents")}
            >
              All Agents
            </button>
          </div>
        </AnimatedElement>

        <AnimatedElement animation="fadeIn" delay={0.4}>
          {renderContent()}
        </AnimatedElement>

        {isAuthenticated && activeTab === "my-agents" && (
          <AnimatedElement animation="slideUp" delay={0.5}>
            <div className="mt-12 flex justify-center">
              <Link href="/create-agent">
                <Button
                  variant="app"
                  size="lg"
                  className="rounded-full px-6 py-6 h-auto text-base"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Create New Agent
                </Button>
              </Link>
            </div>
          </AnimatedElement>
        )}
      </div>
    </PageTransition>
  );
}
