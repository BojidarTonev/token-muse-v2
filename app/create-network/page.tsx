'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Plus, 
  X, 
  Search, 
  Network, 
  Sparkles, 
  Brain, 
  Cpu, 
  Database, 
  ArrowRight,
  Save,
  Trash2
} from "lucide-react";
import Link from "next/link";
import { PageTransition, AnimatedElement } from "@/components/motion";
import { Agent } from "@/lib/supabase";
import { useAppSelector } from "@/redux/store";
import { fetchWithPublicKey } from "@/lib/api-utils";

// Agent role options for the network
const roleOptions = [
  { value: "primary", label: "Primary Agent", description: "The main agent that coordinates the network" },
  { value: "processor", label: "Data Processor", description: "Processes and transforms data for other agents" },
  { value: "analyzer", label: "Analyzer", description: "Analyzes and extracts insights from data" },
  { value: "creator", label: "Content Creator", description: "Generates creative content based on inputs" },
  { value: "validator", label: "Validator", description: "Validates outputs from other agents" },
];

export default function CreateNetworkPage() {
  // Network state
  const [networkName, setNetworkName] = useState("");
  const [networkDescription, setNetworkDescription] = useState("");
  const [networkPurpose, setNetworkPurpose] = useState("");
  
  // Agents state
  const [availableAgents, setAvailableAgents] = useState<Agent[]>([]);
  const [selectedAgents, setSelectedAgents] = useState<(Agent & { role: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  // UI state
  const [activeStep, setActiveStep] = useState<'info' | 'agents' | 'review'>('info');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Authentication state from Redux
  const { isAuthenticated, publicKey } = useAppSelector(state => state.appState);
  
  // Fetch available agents
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (isAuthenticated && publicKey) {
          // Fetch all public agents and user's own agents
          const publicResponse = await fetch('/api/agents/public');
          const userResponse = await fetchWithPublicKey('/api/agents', publicKey);
          
          if (!publicResponse.ok || !userResponse.ok) {
            throw new Error('Failed to fetch agents');
          }
          
          const publicData = await publicResponse.json();
          const userData = await userResponse.json();
          
          // Combine and deduplicate agents
          const publicAgents = publicData.agents || [];
          const userAgents = userData.agents || [];
          
          // Use a Map to deduplicate by ID
          const agentsMap = new Map();
          [...publicAgents, ...userAgents].forEach(agent => {
            agentsMap.set(agent.id, agent);
          });
          
          setAvailableAgents(Array.from(agentsMap.values()));
        } else {
          // If not authenticated, just fetch public agents
          const response = await fetch('/api/agents/public');
          
          if (!response.ok) {
            throw new Error('Failed to fetch agents');
          }
          
          const data = await response.json();
          setAvailableAgents(data.agents || []);
        }
      } catch (err) {
        console.error('Error fetching agents:', err);
        setError('Failed to load available agents. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchAgents();
  }, [isAuthenticated, publicKey]);
  
  // Filter agents based on search query
  const filteredAgents = availableAgents.filter(agent => {
    const query = searchQuery.toLowerCase();
    return (
      agent.name.toLowerCase().includes(query) ||
      (agent.description && agent.description.toLowerCase().includes(query)) ||
      agent.type.toLowerCase().includes(query)
    );
  });
  
  // Add agent to network
  const addAgentToNetwork = (agent: Agent) => {
    if (selectedAgents.some(a => a.id === agent.id)) {
      return; // Agent already added
    }
    
    setSelectedAgents([...selectedAgents, { ...agent, role: "primary" }]);
  };
  
  // Remove agent from network
  const removeAgentFromNetwork = (agentId: string) => {
    setSelectedAgents(selectedAgents.filter(agent => agent.id !== agentId));
  };
  
  // Update agent role in network
  const updateAgentRole = (agentId: string, role: string) => {
    setSelectedAgents(
      selectedAgents.map(agent => 
        agent.id === agentId ? { ...agent, role } : agent
      )
    );
  };
  
  // Create network
  const createNetwork = async () => {
    if (!isAuthenticated || !publicKey) {
      setError('You must be authenticated to create a network');
      return;
    }
    
    if (!networkName.trim()) {
      setError('Network name is required');
      return;
    }
    
    if (selectedAgents.length < 2) {
      setError('A network must contain at least 2 agents');
      return;
    }
    
    try {
      setIsSubmitting(true);
      setError(null);
      
      // Prepare network data
      const networkData = {
        name: networkName.trim(),
        description: networkDescription.trim() || undefined,
        purpose: networkPurpose.trim() || undefined,
        owner_key: publicKey,
      };
      
      // Create network
      const networkResponse = await fetchWithPublicKey(
        '/api/networks',
        publicKey,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ network: networkData }),
        }
      );
      
      if (!networkResponse.ok) {
        throw new Error('Failed to create network');
      }
      
      const networkResult = await networkResponse.json();
      const networkId = networkResult.network.id;
      
      // Add agents to network
      for (const agent of selectedAgents) {
        console.log(`Adding agent ${agent.id} with role ${agent.role} to network ${networkId}`);
        
        const agentResponse = await fetchWithPublicKey(
          `/api/networks/${networkId}/agents`,
          publicKey,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              agentId: agent.id,
              role: agent.role 
            }),
          }
        );
        
        if (!agentResponse.ok) {
          const errorData = await agentResponse.json();
          console.error(`Failed to add agent ${agent.id} to network:`, errorData);
          throw new Error(`Failed to add agent ${agent.id} to network: ${errorData.error || 'Unknown error'}`);
        }
      }
      
      // Redirect to network page
      window.location.href = `/network/${networkId}`;
      
    } catch (err) {
      console.error('Error creating network:', err);
      setError('Failed to create network. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Render agent card
  const renderAgentCard = (agent: Agent & { role?: string }, isSelected = false, showAddButton = true) => (
    <div 
      key={agent.id} 
      className={`feature-card group p-4 transition-all ${
        isSelected ? 'border-primary/50 bg-primary/5' : ''
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 flex-shrink-0">
          {/* Determine icon based on agent type */}
          {(() => {
            let Icon = Brain;
            if (agent.type?.toLowerCase().includes('data')) Icon = Database;
            else if (agent.type?.toLowerCase().includes('code')) Icon = Cpu;
            else if (agent.type?.toLowerCase().includes('creative')) Icon = Sparkles;
            
            return (
              <div className="w-full h-full flex items-center justify-center bg-primary/10 rounded-full">
                <Icon className="w-6 h-6 text-primary" />
              </div>
            );
          })()}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-base font-medium truncate">{agent.name}</h3>
              <div className="inline-block bg-card px-2 py-0.5 rounded-full text-xs font-medium mt-1">
                {agent.type || 'Unknown'}
              </div>
            </div>
            
            {showAddButton ? (
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 rounded-full hover:bg-primary/10 hover:text-primary cursor-pointer"
                onClick={() => addAgentToNetwork(agent)}
                disabled={isSelected}
              >
                <Plus className="h-4 w-4" />
              </Button>
            ) : (
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 rounded-full hover:bg-destructive/10 hover:text-destructive cursor-pointer"
                onClick={() => removeAgentFromNetwork(agent.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          
          {agent.description && (
            <p className="text-sm text-foreground/70 mt-2 line-clamp-2">
              {agent.description}
            </p>
          )}
          
          {!showAddButton && (
            <div className="mt-3">
              <label className="text-xs text-foreground/70 mb-1 block">
                Role in Network
              </label>
              <select 
                className="w-full bg-background border border-border rounded-md px-3 py-1 text-sm"
                value={agent.role || "primary"}
                onChange={(e) => updateAgentRole(agent.id, e.target.value)}
              >
                {roleOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>
    </div>
  );
  
  // Render step content
  const renderStepContent = () => {
    switch (activeStep) {
      case 'info':
        return (
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Network Name</label>
              <Input 
                placeholder="Enter network name" 
                value={networkName}
                onChange={(e) => setNetworkName(e.target.value)}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Description</label>
              <Textarea 
                placeholder="Describe what this network does" 
                value={networkDescription}
                onChange={(e) => setNetworkDescription(e.target.value)}
                rows={3}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Purpose</label>
              <Textarea 
                placeholder="What is the main purpose of this network?" 
                value={networkPurpose}
                onChange={(e) => setNetworkPurpose(e.target.value)}
                rows={3}
              />
            </div>
            
            <div className="flex justify-end">
              <Button 
                variant="app" 
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setActiveStep('agents')}
                disabled={!networkName.trim()}
              >
                Next: Select Agents
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        );
        
      case 'agents':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Available Agents</h3>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50 w-4 h-4" />
                    <Input 
                      placeholder="Search agents" 
                      className="pl-9 w-[200px]"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                
                {loading ? (
                  <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                  </div>
                ) : filteredAgents.length === 0 ? (
                  <div className="text-center py-10 border border-dashed border-border rounded-lg">
                    <p className="text-foreground/70">No agents found matching your search.</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                    {filteredAgents.map(agent => renderAgentCard(
                      agent, 
                      selectedAgents.some(a => a.id === agent.id)
                    ))}
                  </div>
                )}
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Selected Agents</h3>
                  <div className="text-sm text-foreground/70">
                    {selectedAgents.length} selected
                  </div>
                </div>
                
                {selectedAgents.length === 0 ? (
                  <div className="text-center py-10 border border-dashed border-border rounded-lg">
                    <p className="text-foreground/70">
                      Add agents from the left panel to include them in your network.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                    {selectedAgents.map(agent => renderAgentCard(agent, true, false))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setActiveStep('info')}
              >
                Back to Network Info
              </Button>
              
              <Button 
                variant="app" 
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setActiveStep('review')}
                disabled={selectedAgents.length < 2}
              >
                Next: Review Network
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        );
        
      case 'review':
        return (
          <div className="space-y-6">
            <div className="feature-card">
              <h3 className="text-lg font-medium mb-4">Network Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="text-sm text-foreground/70 mb-1">Name</div>
                  <div className="font-medium">{networkName}</div>
                </div>
                
                {networkDescription && (
                  <div>
                    <div className="text-sm text-foreground/70 mb-1">Description</div>
                    <div>{networkDescription}</div>
                  </div>
                )}
                
                {networkPurpose && (
                  <div className="md:col-span-2">
                    <div className="text-sm text-foreground/70 mb-1">Purpose</div>
                    <div>{networkPurpose}</div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="feature-card">
              <h3 className="text-lg font-medium mb-4">Network Agents ({selectedAgents.length})</h3>
              
              <div className="space-y-4">
                {selectedAgents.map(agent => {
                  // Determine icon based on agent type
                  let Icon = Brain;
                  if (agent.type?.toLowerCase().includes('data')) Icon = Database;
                  else if (agent.type?.toLowerCase().includes('code')) Icon = Cpu;
                  else if (agent.type?.toLowerCase().includes('creative')) Icon = Sparkles;
                  
                  return (
                    <div key={agent.id} className="flex items-center gap-4 p-3 bg-background/50 rounded-lg">
                      <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-primary/10 rounded-full">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{agent.name}</div>
                            <div className="text-xs text-foreground/70">
                              {roleOptions.find(r => r.value === agent.role)?.label || agent.role}
                            </div>
                          </div>
                          
                          <div className="text-xs bg-card px-2 py-0.5 rounded-full">
                            {agent.type}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="feature-card">
              <h3 className="text-lg font-medium mb-4">Network Visualization</h3>
              
              <div className="relative h-[300px] bg-background/50 rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    {/* Central network hub */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 glow">
                      <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                        <Network className="w-12 h-12 text-primary" />
                      </div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 whitespace-nowrap text-xs font-medium">
                        {networkName || "New Network"}
                      </div>
                    </div>
                    
                    {/* Agent nodes with connecting lines */}
                    {selectedAgents.map((agent, index) => {
                      // Calculate position in a circle around the center
                      const angle = (index / selectedAgents.length) * Math.PI * 2;
                      const radius = 100; // Distance from center
                      const top = `calc(50% + ${Math.sin(angle) * radius}px)`;
                      const left = `calc(50% + ${Math.cos(angle) * radius}px)`;
                      
                      // Determine icon based on agent type
                      let Icon = Brain;
                      if (agent.type?.toLowerCase().includes('data')) Icon = Database;
                      else if (agent.type?.toLowerCase().includes('code')) Icon = Cpu;
                      else if (agent.type?.toLowerCase().includes('creative')) Icon = Sparkles;
                      
                      // Determine color based on role
                      let color = "text-blue-500";
                      if (agent.role === "processor") color = "text-green-500";
                      else if (agent.role === "analyzer") color = "text-purple-500";
                      else if (agent.role === "creator") color = "text-amber-500";
                      else if (agent.role === "validator") color = "text-rose-500";
                      
                      return (
                        <div key={agent.id} className="absolute w-12 h-12 transform -translate-x-1/2 -translate-y-1/2" style={{ top, left }}>
                          {/* Connection line to center */}
                          <div className="absolute top-1/2 left-1/2 w-[100px] h-0.5 bg-gradient-to-r from-primary/10 to-primary/50 origin-left" 
                            style={{ transform: `rotate(${angle + Math.PI}rad)` }} />
                          
                          {/* Agent icon */}
                          <div className={`w-12 h-12 rounded-full ${color.replace('text-', 'bg-')}/10 flex items-center justify-center border border-${color.replace('text-', '')}/20`}>
                            <Icon className={`w-6 h-6 ${color}`} />
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
            
            {error && (
              <div className="bg-destructive/10 text-destructive p-3 rounded-md">
                {error}
              </div>
            )}
            
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setActiveStep('agents')}
              >
                Back to Agents
              </Button>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2 text-destructive hover:bg-destructive/10 cursor-pointer"
                  onClick={() => {
                    setNetworkName("");
                    setNetworkDescription("");
                    setNetworkPurpose("");
                    setSelectedAgents([]);
                    setActiveStep('info');
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                  Reset
                </Button>
                
                <Button 
                  variant="app" 
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={createNetwork}
                  disabled={isSubmitting || !isAuthenticated}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-background"></div>
                      Creating...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Create Network
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        );
    }
  };
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PageTransition>
        <main className="pt-24 pb-16 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
          <AnimatedElement animation="fadeIn" delay={0.1}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-2">Create Network</h1>
                <p className="text-foreground/70 max-w-xl">
                  Build a powerful network by connecting multiple AI agents to work together on complex tasks.
                </p>
              </div>
              
              <div className="mt-4 md:mt-0">
                <Link href="/network">
                  <Button variant="outline" className="flex items-center gap-2 cursor-pointer">
                    Back to Networks
                  </Button>
                </Link>
              </div>
            </div>
          </AnimatedElement>
          
          <AnimatedElement animation="fadeIn" delay={0.2}>
            <div className="feature-card mb-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-full bg-primary/10">
                  <Network className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Network Creation Wizard</h2>
                  <p className="text-foreground/70">Follow the steps below to create your custom agent network</p>
                </div>
              </div>
              
              <div className="flex border-b border-border mb-6">
                <button
                  className={`px-4 py-2 font-medium text-sm flex items-center gap-2 cursor-pointer ${
                    activeStep === 'info' 
                      ? 'text-primary border-b-2 border-primary' 
                      : 'text-foreground/70 hover:text-foreground'
                  }`}
                  onClick={() => setActiveStep('info')}
                >
                  1. Network Info
                </button>
                <button
                  className={`px-4 py-2 font-medium text-sm flex items-center gap-2 cursor-pointer ${
                    activeStep === 'agents' 
                      ? 'text-primary border-b-2 border-primary' 
                      : 'text-foreground/70 hover:text-foreground'
                  }`}
                  onClick={() => networkName && setActiveStep('agents')}
                  disabled={!networkName}
                >
                  2. Select Agents
                </button>
                <button
                  className={`px-4 py-2 font-medium text-sm flex items-center gap-2 cursor-pointer ${
                    activeStep === 'review' 
                      ? 'text-primary border-b-2 border-primary' 
                      : 'text-foreground/70 hover:text-foreground'
                  }`}
                  onClick={() => networkName && selectedAgents.length >= 2 && setActiveStep('review')}
                  disabled={!networkName || selectedAgents.length < 2}
                >
                  3. Review & Create
                </button>
              </div>
              
              {renderStepContent()}
            </div>
          </AnimatedElement>
        </main>
      </PageTransition>
    </div>
  );
} 