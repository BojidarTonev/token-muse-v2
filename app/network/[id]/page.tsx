'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Network, 
  Sparkles, 
  Brain, 
  Cpu, 
  Database, 
  Users, 
  Code, 
  Globe, 
  Send, 
  Download, 
  Copy, 
  Check,
  ArrowRight,
  ExternalLink,
  AlertCircle,
  Clock,
  Settings,
  FileText,
  Image,
  Video,
  Bell,
  BarChart,
  Calendar
} from "lucide-react";
import Link from "next/link";
import { PageTransition, AnimatedElement } from "@/components/motion";
import { Agent } from "@/lib/supabase";
import { useAppSelector } from "@/redux/store";
import { fetchWithPublicKey } from "@/lib/api-utils";
import { useParams } from "next/navigation";

// Define Network type
interface Network {
  id: string;
  name: string;
  description?: string;
  purpose?: string;
  image_url?: string;
  owner_key: string;
  created_at: string;
  updated_at: string;
}

// Define NetworkAgent type
interface NetworkAgent {
  agent_id: string;
  role: string;
  agents: Agent;
}

export default function NetworkDetailsPage() {
  const params = useParams();
  const networkId = params.id as string;
  
  // Network state
  const [network, setNetwork] = useState<Network | null>(null);
  const [networkAgents, setNetworkAgents] = useState<NetworkAgent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // UI state
  const [activeTab, setActiveTab] = useState<'overview' | 'prompt' | 'sdk' | 'api'>('overview');
  const [copiedSDK, setCopiedSDK] = useState(false);
  const [copiedAPI, setCopiedAPI] = useState(false);
  
  // Authentication state from Redux
  const { isAuthenticated, publicKey } = useAppSelector(state => state.appState);
  
  // Fetch network details
  useEffect(() => {
    const fetchNetworkDetails = async () => {
      if (!isAuthenticated || !publicKey) {
        setError('Authentication required to view network details');
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetchWithPublicKey(`/api/networks/${networkId}`, publicKey);
        
        if (!response.ok) {
          throw new Error('Failed to fetch network details');
        }
        
        const data = await response.json();
        setNetwork(data.network);
        setNetworkAgents(data.agents || []);
      } catch (err) {
        console.error('Error fetching network details:', err);
        setError('Failed to load network details. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchNetworkDetails();
  }, [networkId, isAuthenticated, publicKey]);
  
  // Copy to clipboard function
  const copyToClipboard = (text: string, type: 'sdk' | 'api') => {
    navigator.clipboard.writeText(text);
    if (type === 'sdk') {
      setCopiedSDK(true);
      setTimeout(() => setCopiedSDK(false), 2000);
    } else {
      setCopiedAPI(true);
      setTimeout(() => setCopiedAPI(false), 2000);
    }
  };
  
  // Render agent icon based on type
  const renderAgentIcon = (agent: Agent) => {
    let Icon = Brain;
    if (agent.type?.toLowerCase().includes('data')) Icon = Database;
    else if (agent.type?.toLowerCase().includes('code')) Icon = Cpu;
    else if (agent.type?.toLowerCase().includes('creative')) Icon = Sparkles;
    
    // Determine color based on role
    let color = "text-blue-500";
    const role = networkAgents.find(na => na.agent_id === agent.id)?.role;
    if (role === "processor") color = "text-green-500";
    else if (role === "analyzer") color = "text-purple-500";
    else if (role === "creator") color = "text-amber-500";
    else if (role === "validator") color = "text-rose-500";
    else if (role === "primary") color = "text-blue-500";
    
    return (
      <div className={`w-10 h-10 rounded-full ${color.replace('text-', 'bg-')}/10 flex items-center justify-center border border-${color.replace('text-', '')}/20`}>
        <Icon className={`w-5 h-5 ${color}`} />
      </div>
    );
  };
  
  // Render role badge
  const renderRoleBadge = (role: string) => {
    let color = "bg-blue-500/10 text-blue-500";
    if (role === "processor") color = "bg-green-500/10 text-green-500";
    else if (role === "analyzer") color = "bg-purple-500/10 text-purple-500";
    else if (role === "creator") color = "bg-amber-500/10 text-amber-500";
    else if (role === "validator") color = "bg-rose-500/10 text-rose-500";
    else if (role === "primary") color = "bg-blue-500/10 text-blue-500";
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </span>
    );
  };
  
  // Render tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Network Information */}
            <div className="feature-card">
              <h3 className="text-lg font-medium mb-4">Network Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="text-sm text-foreground/70 mb-1">Name</div>
                  <div className="font-medium">{network?.name}</div>
                </div>
                
                <div>
                  <div className="text-sm text-foreground/70 mb-1">Created</div>
                  <div>{network?.created_at ? new Date(network.created_at).toLocaleDateString() : '-'}</div>
                </div>
                
                {network?.description && (
                  <div className="md:col-span-2">
                    <div className="text-sm text-foreground/70 mb-1">Description</div>
                    <div>{network.description}</div>
                  </div>
                )}
                
                {network?.purpose && (
                  <div className="md:col-span-2">
                    <div className="text-sm text-foreground/70 mb-1">Purpose</div>
                    <div>{network.purpose}</div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Network Agents */}
            <div className="feature-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Network Agents</h3>
                <div className="text-sm text-foreground/70">
                  {networkAgents.length} agent{networkAgents.length !== 1 ? 's' : ''}
                </div>
              </div>
              
              {networkAgents.length === 0 ? (
                <div className="text-center py-10 border border-dashed border-border rounded-lg">
                  <p className="text-foreground/70">
                    No agents in this network.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {networkAgents.map(({ agent_id, role, agents: agent }) => (
                    <div key={agent_id} className="flex items-center gap-4 p-3 bg-background/50 rounded-lg">
                      {renderAgentIcon(agent)}
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{agent.name}</div>
                            <div className="text-xs text-foreground/70 mt-1">
                              {agent.type || 'Unknown type'}
                            </div>
                          </div>
                          
                          <div>
                            {renderRoleBadge(role)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Network Visualization */}
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
                        {network?.name || "Network"}
                      </div>
                    </div>
                    
                    {/* Agent nodes with connecting lines */}
                    {networkAgents.map(({ agent_id, role, agents: agent }, index) => {
                      // Calculate position in a circle around the center
                      const angle = (index / networkAgents.length) * Math.PI * 2;
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
                      if (role === "processor") color = "text-green-500";
                      else if (role === "analyzer") color = "text-purple-500";
                      else if (role === "creator") color = "text-amber-500";
                      else if (role === "validator") color = "text-rose-500";
                      
                      return (
                        <div key={agent_id} className="absolute w-12 h-12 transform -translate-x-1/2 -translate-y-1/2" style={{ top, left }}>
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
          </div>
        );
        
      case 'prompt':
        return (
          <div className="space-y-6">
            <div className="feature-card">
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-lg font-medium">Automated Content Engine</h3>
                <div className="px-3 py-1 bg-amber-500/10 text-amber-500 rounded-full text-xs font-medium flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  In Development
                </div>
              </div>
              
              <p className="text-foreground/70 mb-6">
                Transform your content strategy with our advanced multi-agent content generation system. 
                This network-powered engine will leverage the unique capabilities of each agent in your network 
                to create sophisticated, multi-modal content across various formats.
              </p>
              
              <div className="bg-background/50 p-5 rounded-lg mb-6">
                <h4 className="font-medium mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  Key Capabilities
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex gap-3">
                    <div className="p-2 rounded-full bg-blue-500/10 flex-shrink-0 mt-1">
                      <Cpu className="w-4 h-4 text-blue-500" />
                    </div>
                    <div>
                      <span className="font-medium text-sm">Multi-modal Generation</span>
                      <p className="text-xs text-foreground/70 mt-1">
                        Automatically create text, code, images, audio, and video content from a single prompt, with each agent handling its specialized domain.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="p-2 rounded-full bg-purple-500/10 flex-shrink-0 mt-1">
                      <Clock className="w-4 h-4 text-purple-500" />
                    </div>
                    <div>
                      <span className="font-medium text-sm">Intelligent Scheduling</span>
                      <p className="text-xs text-foreground/70 mt-1">
                        Set up automated publishing schedules across multiple platforms with smart timing optimization.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="p-2 rounded-full bg-green-500/10 flex-shrink-0 mt-1">
                      <Settings className="w-4 h-4 text-green-500" />
                    </div>
                    <div>
                      <span className="font-medium text-sm">Customizable Workflows</span>
                      <p className="text-xs text-foreground/70 mt-1">
                        Design sophisticated content pipelines with agent-specific tasks, review stages, and approval processes.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="p-2 rounded-full bg-amber-500/10 flex-shrink-0 mt-1">
                      <BarChart className="w-4 h-4 text-amber-500" />
                    </div>
                    <div>
                      <span className="font-medium text-sm">Performance Analytics</span>
                      <p className="text-xs text-foreground/70 mt-1">
                        Track content performance and automatically refine generation parameters based on audience engagement.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-background/50 p-5 rounded-lg mb-6 border border-dashed border-primary/30">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Network className="w-4 h-4 text-primary" />
                  </div>
                  <h4 className="font-medium">How It Works</h4>
                </div>
                
                <p className="text-sm text-foreground/70 mb-4">
                  The Automated Content Engine analyzes your network&lsquo;s agent composition and capabilities to create an 
                  intelligent content generation pipeline. Each agent contributes its specialized expertise:
                </p>
                
                <div className="space-y-3 mb-4">
                  {networkAgents.map(({ agent_id, role, agents: agent }) => (
                    <div key={agent_id} className="flex items-start gap-3 bg-background/30 p-3 rounded-md">
                      {renderAgentIcon(agent)}
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{agent.name}</span>
                          {renderRoleBadge(role)}
                        </div>
                        <p className="text-xs text-foreground/70 mt-1">
                          {role === "processor" && "Processes and structures raw content data"}
                          {role === "analyzer" && "Analyzes content for quality and relevance"}
                          {role === "creator" && "Generates creative content elements"}
                          {role === "validator" && "Ensures content accuracy and compliance"}
                          {role === "primary" && "Orchestrates the content generation process"}
                          {!["processor", "analyzer", "creator", "validator", "primary"].includes(role) && 
                            `Contributes ${agent.type || "specialized"} capabilities to the content pipeline`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-background/50 p-5 rounded-lg border border-border">
                <h4 className="font-medium mb-4">Preview Experience</h4>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Content Brief</label>
                    <Textarea 
                      placeholder="Describe the content you want to generate..." 
                      rows={3}
                      className="resize-none bg-background/30"
                      disabled
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Output Formats</label>
                      <div className="bg-background/30 p-3 rounded-md border border-border/50 flex flex-wrap gap-2 opacity-60">
                        <div className="px-2 py-1 bg-background/50 rounded-md text-xs flex items-center gap-1">
                          <FileText className="w-3 h-3" />
                          Blog Post
                        </div>
                        <div className="px-2 py-1 bg-background/50 rounded-md text-xs flex items-center gap-1">
                          <Code className="w-3 h-3" />
                          Code
                        </div>
                        <div className="px-2 py-1 bg-background/50 rounded-md text-xs flex items-center gap-1">
                          <Image className="w-3 h-3" />
                          Images
                        </div>
                        <div className="px-2 py-1 bg-background/50 rounded-md text-xs flex items-center gap-1">
                          <Video className="w-3 h-3" />
                          Video
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block">Publishing Schedule</label>
                      <div className="bg-background/30 p-3 rounded-md border border-border/50 opacity-60">
                        <div className="flex items-center gap-2 text-xs text-foreground/70">
                          <Calendar className="w-3 h-3" />
                          <span>Schedule not configured</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      variant="app" 
                      className="flex items-center gap-2 cursor-pointer"
                      disabled
                    >
                      <Sparkles className="w-4 h-4" />
                      Generate Content
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center mt-6">
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2 cursor-pointer"
                  disabled
                >
                  <Bell className="w-4 h-4" />
                  Get Notified When Available
                </Button>
              </div>
            </div>
          </div>
        );
        
      case 'sdk':
        return (
          <div className="space-y-6">
            <div className="feature-card">
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-lg font-medium">SDK Integration</h3>
                <div className="px-3 py-1 bg-amber-500/10 text-amber-500 rounded-full text-xs font-medium flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  In Development
                </div>
              </div>
              
              <p className="text-foreground/70 mb-6">
                Integrate this network into your applications using our JavaScript/TypeScript SDK.
                This feature is currently in development and will be available soon.
              </p>
              
              <div className="bg-background/50 p-4 rounded-lg border border-border">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium">Installation</div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 text-xs cursor-pointer"
                    onClick={() => copyToClipboard('npm install @token-muse/sdk', 'sdk')}
                  >
                    {copiedSDK ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                <pre className="bg-background p-3 rounded text-sm overflow-x-auto">
                  npm install @token-muse/sdk
                </pre>
              </div>
              
              <div className="bg-background/50 p-4 rounded-lg border border-border mt-4">
                <div className="text-sm font-medium mb-2">Example Usage</div>
                <pre className="bg-background p-3 rounded text-sm overflow-x-auto">
{`import { TokenMuse } from '@token-muse/sdk';

// Initialize the SDK
const tokenMuse = new TokenMuse({
  apiKey: 'YOUR_API_KEY'
});

// Use the network
const response = await tokenMuse.networks.prompt('${networkId}', {
  prompt: 'Your prompt here'
});

console.log(response);`}
                </pre>
              </div>
              
              <div className="flex justify-center mt-6">
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2 cursor-pointer"
                  disabled={true}
                >
                  <Download className="w-4 h-4" />
                  Download SDK Documentation
                </Button>
              </div>
            </div>
          </div>
        );
        
      case 'api':
        return (
          <div className="space-y-6">
            <div className="feature-card">
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-lg font-medium">API Integration</h3>
                <div className="px-3 py-1 bg-amber-500/10 text-amber-500 rounded-full text-xs font-medium flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  In Development
                </div>
              </div>
              
              <p className="text-foreground/70 mb-6">
                Integrate this network directly into your applications using our REST API.
                This feature is currently in development and will be available soon.
              </p>
              
              <div className="bg-background/50 p-4 rounded-lg border border-border">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium">API Endpoint</div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 text-xs cursor-pointer"
                    onClick={() => copyToClipboard(`https://api.tokenmuse.ai/v1/networks/${networkId}/prompt`, 'api')}
                  >
                    {copiedAPI ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                <pre className="bg-background p-3 rounded text-sm overflow-x-auto">
                  https://api.tokenmuse.ai/v1/networks/{networkId}/prompt
                </pre>
              </div>
              
              <div className="bg-background/50 p-4 rounded-lg border border-border mt-4">
                <div className="text-sm font-medium mb-2">Example Request</div>
                <pre className="bg-background p-3 rounded text-sm overflow-x-auto">
{`// POST https://api.tokenmuse.ai/v1/networks/${networkId}/prompt
{
  "prompt": "Your prompt here",
  "options": {
    "temperature": 0.7,
    "max_tokens": 1000
  }
}`}
                </pre>
              </div>
              
              <div className="flex justify-center mt-6">
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2 cursor-pointer"
                  disabled={true}
                >
                  <ExternalLink className="w-4 h-4" />
                  View API Documentation
                </Button>
              </div>
            </div>
          </div>
        );
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="max-w-md w-full p-6 text-center">
          <div className="mb-4">
            <AlertCircle className="w-12 h-12 text-destructive mx-auto" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Error</h2>
          <p className="text-foreground/70 mb-6">{error}</p>
          <Link href="/network">
            <Button variant="outline" className="cursor-pointer">
              Back to Networks
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  
  if (!network) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="max-w-md w-full p-6 text-center">
          <div className="mb-4">
            <AlertCircle className="w-12 h-12 text-destructive mx-auto" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Network Not Found</h2>
          <p className="text-foreground/70 mb-6">The network you&#39;re looking for doesn&apos;t exist or you don&lsquo;t have permission to view it.</p>
          <Link href="/network">
            <Button variant="outline" className="cursor-pointer">
              Back to Networks
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PageTransition>
        <main className="pt-24 pb-16 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
          <AnimatedElement animation="fadeIn" delay={0.1}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-2">{network.name}</h1>
                <p className="text-foreground/70 max-w-xl">
                  {network.description || "A collaborative network of AI agents working together."}
                </p>
              </div>
              
              <div className="mt-4 md:mt-0 flex gap-2">
                <Link href="/network">
                  <Button variant="outline" className="flex items-center gap-2 cursor-pointer">
                    Back to Networks
                  </Button>
                </Link>
                
                <Link href="/create-network">
                  <Button variant="app" className="flex items-center gap-2 cursor-pointer">
                    <ArrowRight className="w-4 h-4" />
                    Create New Network
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
                  <h2 className="text-xl font-semibold">Network Details</h2>
                  <p className="text-foreground/70">View and interact with your agent network</p>
                </div>
              </div>
              
              <div className="flex border-b border-border mb-6 overflow-x-auto">
                <button
                  className={`px-4 py-2 font-medium text-sm flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                    activeTab === 'overview' 
                      ? 'text-primary border-b-2 border-primary' 
                      : 'text-foreground/70 hover:text-foreground'
                  }`}
                  onClick={() => setActiveTab('overview')}
                >
                  <Users className="w-4 h-4" />
                  Network Overview
                </button>
                <button
                  className={`px-4 py-2 font-medium text-sm flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                    activeTab === 'prompt' 
                      ? 'text-primary border-b-2 border-primary' 
                      : 'text-foreground/70 hover:text-foreground'
                  }`}
                  onClick={() => setActiveTab('prompt')}
                >
                  <Send className="w-4 h-4" />
                  Prompt Network
                </button>
                <button
                  className={`px-4 py-2 font-medium text-sm flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                    activeTab === 'sdk' 
                      ? 'text-primary border-b-2 border-primary' 
                      : 'text-foreground/70 hover:text-foreground'
                  }`}
                  onClick={() => setActiveTab('sdk')}
                >
                  <Code className="w-4 h-4" />
                  SDK Integration
                </button>
                <button
                  className={`px-4 py-2 font-medium text-sm flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                    activeTab === 'api' 
                      ? 'text-primary border-b-2 border-primary' 
                      : 'text-foreground/70 hover:text-foreground'
                  }`}
                  onClick={() => setActiveTab('api')}
                >
                  <Globe className="w-4 h-4" />
                  API Integration
                </button>
              </div>
              
              {renderTabContent()}
            </div>
          </AnimatedElement>
        </main>
      </PageTransition>
    </div>
  );
} 