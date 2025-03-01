'use client';

import { useEffect, useState, use } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Construction, MessageSquare, Code, Zap } from "lucide-react";
import Link from "next/link";
import { PageTransition } from "@/components/motion";
import { Agent } from "@/lib/supabase";
import { useAppSelector } from "@/redux/store";
import { fetchWithPublicKey } from "@/lib/api-utils";

export default function AgentDetailsPage({ params }: { params: { id: string } }) {
  // Unwrap params using React.use()
  const unwrappedParams = params instanceof Promise ? use(params) : params;
  const agentId = unwrappedParams.id;
  
  const [agent, setAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Use Redux store for authentication state
  const { isAuthenticated, publicKey } = useAppSelector(state => state.appState);

  // Fetch agent data
  useEffect(() => {
    const fetchAgentDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        // Capture current values to avoid issues with changing dependencies
        const currentPublicKey = publicKey;
        const currentIsAuthenticated = isAuthenticated;

        // Fetch agent details from API with public key if authenticated
        let response;
        if (currentIsAuthenticated && currentPublicKey) {
          response = await fetchWithPublicKey(`/api/agents/${agentId}`, currentPublicKey);
        } else {
          response = await fetch(`/api/agents/${agentId}`);
        }

        if (!response.ok) {
          console.error('Error fetching agent details:', response.status, response.statusText);
          setError('Failed to load agent details');
          setAgent(null);
        } else {
          const data = await response.json();
          setAgent(data.agent || null);
        }
      } catch (err) {
        console.error('Error fetching agent details:', err);
        setError('An unexpected error occurred');
        setAgent(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAgentDetails();
  }, [agentId, isAuthenticated, publicKey]);

  // Show loading state
  if (loading) {
    return (
      <div className="bg-background text-foreground">
        <PageTransition>
          <main className="pt-24 pb-16 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          </main>
        </PageTransition>
      </div>
    );
  }
  
  // Show error state
  if (error || !agent) {
    return (
      <div className="bg-background text-foreground">
        <PageTransition>
          <main className="pt-24 pb-16 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-4">Agent Not Found</h1>
              <p className="mb-8">{error || "The agent you're looking for doesn't exist or has been removed."}</p>
              <Link href="/agents">
                <Button variant="app">Back to Agents</Button>
              </Link>
            </div>
          </main>
        </PageTransition>
      </div>
    );
  }
  
  // For now, let's use the mock data for related agents and capabilities
  // In a real app, these would come from the API
  const capabilities = agent.capabilities || ["AI Assistant", "Text Generation", "Knowledge Base"];
  const usageSamples = agent.usage_samples || [
    "Ask me about any topic",
    "Generate creative content",
    "Help with problem-solving"
  ];
  
  return (
    <div className="bg-background text-foreground">
      <PageTransition>
        <main className="pt-24 pb-16 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
          {/* Back button */}
          <div className="mb-8">
            <Link href="/agents">
              <Button variant="ghost" className="flex items-center gap-2 hover:bg-background/50">
                <ArrowLeft className="w-4 h-4" />
                Back to Agents
              </Button>
            </Link>
          </div>
          
          {/* Agent header */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="feature-card flex items-center justify-center p-8">
              <img
                src={agent.image_url || `/agent-${agent.type?.toLowerCase() || 'text'}.svg`}
                alt={agent.name || 'AI Agent'}
                className="w-44 h-44 object-contain transition-transform duration-300 hover:scale-105"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  try {
                    const safeType = agent.type ? agent.type.toLowerCase() : 'text';
                    target.src = `/agent-${safeType}.svg`;
                  } catch {
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
            
            <div className="md:col-span-2">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <div className="inline-block bg-card px-3 py-1 rounded-full text-xs font-medium mb-2">
                    {agent.type || 'Unknown'}
                  </div>
                  <h1 className="text-3xl font-bold mb-2">{agent.name}</h1>
                  <p className="text-foreground/70 mb-4">{agent.description || "No description provided."}</p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <div className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    <Construction className="w-3 h-3" />
                    Coming Soon
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
                <div className="bg-background/50 p-3 rounded-md border border-border/10">
                  <div className="text-xs text-foreground/60">Creator</div>
                  <div className="font-medium text-xs overflow-hidden text-ellipsis">{agent.owner_key || "Unknown"}</div>
                </div>
                <div className="bg-background/50 p-3 rounded-md border border-border/10">
                  <div className="text-xs text-foreground/60">Version</div>
                  <div className="font-medium">{agent.version || "1.0.0"}</div>
                </div>
                <div className="bg-background/50 p-3 rounded-md border border-border/10">
                  <div className="text-xs text-foreground/60">Created</div>
                  <div className="font-medium">{agent.created_at ? new Date(agent.created_at).toLocaleDateString() : "Unknown"}</div>
                </div>
                <div className="bg-background/50 p-3 rounded-md border border-border/10 sm:col-span-3">
                  <div className="text-xs text-foreground/60">Token Cost</div>
                  <div className="font-medium flex items-center gap-2">
                    <span>{agent.token_cost || 100} $MUSE</span>
                    <span className="text-xs text-foreground/40">per generation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Agent capabilities */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Capabilities</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {capabilities.map((capability, index) => (
                <div key={`capability-${index}-${capability}`} className="feature-card p-4 flex items-center gap-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Zap className="w-4 h-4 text-primary" />
                  </div>
                  <span>{capability}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Usage examples */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <h2 className="text-2xl font-bold">Example Prompts</h2>
              <div className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                <Construction className="w-3 h-3" />
                Coming Soon
              </div>
            </div>
            <div className="space-y-4">
              {usageSamples.map((sample, index) => (
                <div key={`sample-${index}`} className="feature-card p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-primary/10 mt-1">
                      <MessageSquare className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-foreground/90">{sample}</p>
                      <div className="mt-2 flex justify-end">
                        <Button variant="ghost" size="sm" className="text-xs text-primary hover:bg-primary/10" disabled>
                          Coming Soon
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Integration section */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <h2 className="text-2xl font-bold">Integration</h2>
              <div className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                <Construction className="w-3 h-3" />
                Coming Soon
              </div>
            </div>
            <div className="feature-card p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-3">API Access</h3>
                  <p className="text-sm text-foreground/70 mb-4">
                    Soon you'll be able to integrate this agent directly into your applications with our simple API. 
                    Access the full capabilities programmatically and build powerful solutions.
                  </p>
                  <Button variant="outline" className="flex items-center gap-2" disabled>
                    <Code className="w-4 h-4" />
                    API Docs Coming Soon
                  </Button>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-3">Download SDK</h3>
                  <p className="text-sm text-foreground/70 mb-4">
                    We're developing a comprehensive SDK to easily incorporate this agent into your projects with minimal setup.
                    Join our waitlist to be the first to know when it's available.
                  </p>
                  <Button variant="outline" className="flex items-center gap-2" disabled>
                    <Download className="w-4 h-4" />
                    SDK Coming Soon
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </PageTransition>
    </div>
  );
} 