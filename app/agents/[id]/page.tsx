'use client';

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Construction, MessageSquare, Code, Zap, Send, User, Bot } from "lucide-react";
import Link from "next/link";
import { PageTransition } from "@/components/motion";
import { Agent } from "@/lib/supabase";
import { useAppSelector } from "@/redux/store";
import { fetchWithPublicKey } from "@/lib/api-utils";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";

// Define message interface
interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'agent';
  timestamp: Date;
}

export default function AgentDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const [agentId, setAgentId] = useState<string | null>(null);
  const [agent, setAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Chat state
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  
  // Use Redux store for authentication state
  const { isAuthenticated, publicKey } = useAppSelector(state => state.appState);

  // Handle params resolution
  useEffect(() => {
    const resolveParams = async () => {
      try {
        const resolvedParams = await params;
        setAgentId(resolvedParams.id);
      } catch (err) {
        console.error('Error resolving params:', err);
        setError('Invalid agent ID');
      }
    };
    
    resolveParams();
  }, [params]);

  // Fetch agent data
  useEffect(() => {
    if (!agentId) return;
    
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

  // Handle sending a message
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsSending(true);
    
    try {
      // Prepare message history for the API
      const messageHistory = messages.map(msg => ({
        content: msg.content,
        sender: msg.sender
      }));
      
      // Prepare headers with authentication
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      
      // Add authentication headers if authenticated
      if (isAuthenticated && publicKey) {
        headers['x-public-key'] = publicKey;
      }
      
      // Call the chat API
      const response = await fetch(`/api/agents/${agentId}/chat`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          message: inputMessage,
          messageHistory
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get response from agent');
      }
      
      const data = await response.json();
      
      // Add agent response
      const agentMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        sender: 'agent',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, agentMessage]);
    } catch (err) {
      console.error('Error getting agent response:', err);
      
      // Add error message
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I encountered an error while processing your request. Please try again later.",
        sender: 'agent',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsSending(false);
    }
  };

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
  
  return (
    <div className="bg-background text-foreground">
      <PageTransition>
        <main className="pt-24 pb-16 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
          {/* Back button */}
          <div className="mb-8">
            <Link href="/agents">
              <Button variant="ghost" className="flex items-center gap-2 hover:bg-background/50 cursor-pointer">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Agents</span>
              </Button>
            </Link>
          </div>
          
          {/* Agent header */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="feature-card flex items-center justify-center p-8">
              <Image
                src={`/agent-${agent.type?.toLowerCase() || 'text'}.svg`}
                alt={agent.name || 'AI Agent'}
                width={176}
                height={176}
                className="w-44 h-44 object-contain transition-transform duration-300 hover:scale-105"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/agent-writer.svg"; // Fallback to a default SVG
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
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
                <div className="bg-background/50 p-3 rounded-md border border-border/10">
                  <div className="text-xs text-foreground/60">Creator</div>
                  <div className="font-medium text-xs overflow-hidden text-ellipsis">{agent.owner_key || "Unknown"}</div>
                </div>
                <div className="bg-background/50 p-3 rounded-md border border-border/10">
                  <div className="text-xs text-foreground/60">Version</div>
                  <div className="font-medium">1.0.0</div>
                </div>
                <div className="bg-background/50 p-3 rounded-md border border-border/10">
                  <div className="text-xs text-foreground/60">Created</div>
                  <div className="font-medium">{agent.created_at ? new Date(agent.created_at).toLocaleDateString() : "Unknown"}</div>
                </div>
                <div className="bg-background/50 p-3 rounded-md border border-border/10 sm:col-span-3">
                  <div className="text-xs text-foreground/60">Token Cost</div>
                  <div className="font-medium flex items-center gap-2">
                    <span>100 $MUSE</span>
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
          
          {/* Chat with Agent */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <h2 className="text-2xl font-bold">Chat with Agent</h2>
              <div className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                <Construction className="w-3 h-3" />
                Beta
              </div>
            </div>
            
            <div className="feature-card p-0 overflow-hidden">
              {/* Chat header */}
              <div className="p-4 border-b border-border/30 bg-background/50 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">{agent.name}</h3>
                  <p className="text-xs text-foreground/60">{agent.type || 'AI Agent'}</p>
                </div>
              </div>
              
              {/* Chat messages */}
              <div className="p-6 max-h-[400px] overflow-y-auto flex flex-col gap-4">
                {messages.length === 0 ? (
                  <div className="text-center py-8">
                    <MessageSquare className="w-12 h-12 text-foreground/20 mx-auto mb-3" />
                    <p className="text-foreground/50 font-medium">Start a conversation with {agent.name}</p>
                    <p className="text-sm text-foreground/40 mt-1">Ask a question or provide a prompt</p>
                  </div>
                ) : (
                  messages.map((message) => (
                    <div 
                      key={message.id} 
                      className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
                    >
                      {message.sender === 'agent' && (
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex-shrink-0 flex items-center justify-center">
                          <Bot className="w-4 h-4 text-primary" />
                        </div>
                      )}
                      
                      <div 
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.sender === 'user' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-background/50 border border-border/30'
                        } transition-all duration-300 ease-in-out`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className="text-[10px] mt-1 opacity-70 text-right">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                      
                      {message.sender === 'user' && (
                        <div className="w-8 h-8 rounded-full bg-foreground/10 flex-shrink-0 flex items-center justify-center">
                          <User className="w-4 h-4 text-foreground/70" />
                        </div>
                      )}
                    </div>
                  ))
                )}
                
                {isSending && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex-shrink-0 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                    <div className="bg-background/50 border border-border/30 p-4 rounded-lg max-w-[80%]">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-primary/40 animate-pulse"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-primary/60 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-primary/80 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                        <span className="text-xs text-foreground/50 ml-1">Thinking...</span>
                      </div>
                      <div className="mt-1.5 text-[10px] text-foreground/30 text-right">
                        {agent.name} is generating a response
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Chat input */}
              <div className="p-4 border-t border-border/30 bg-background/50">
                <div className="flex gap-2">
                  <Textarea 
                    placeholder={`Message ${agent.name}...`}
                    className="resize-none bg-background/30 min-h-[50px] max-h-[120px]"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button 
                    variant="app" 
                    size="icon" 
                    className="h-[50px] w-[50px] flex-shrink-0"
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isSending}
                  >
                    {isSending ? (
                      <div className="animate-spin h-5 w-5 border-2 border-primary/30 border-t-primary rounded-full" />
                    ) : (
                      <Send className="h-5 w-5" />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-foreground/40 mt-2 text-center">
                  Press Enter to send, Shift+Enter for new line
                </p>
              </div>
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
                    Soon you&lsquo;ll be able to integrate this agent directly into your applications with our simple API. 
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
                    We&lsquo;re developing a comprehensive SDK to easily incorporate this agent into your projects with minimal setup.
                    Join our waitlist to be the first to know when it&lsquo;s available.
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