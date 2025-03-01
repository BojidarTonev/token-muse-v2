'use client';

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sparkles, Settings, Image as ImageIcon, FileText, Music, Code, AlertCircle } from "lucide-react";
import { PageTransition, AnimatedElement, StaggerContainer, ScrollReveal } from "@/components/motion";
import { useAppSelector } from "@/redux/store";
import { fetchWithPublicKey } from "@/lib/api-utils";
import Image from "next/image";

// Define agent types
const AGENT_TYPES = ["Text", "Image", "Audio", "Code", "Data"];

// Default agent image URL
const DEFAULT_AGENT_IMAGE = "https://files.oaiusercontent.com/file-5XEVEiRMg2eESYDkAFsRDf?se=2025-03-01T17%3A20%3A56Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Dc2776df8-abf5-472c-9acd-d8f5a9129ccb.webp&sig=ycDzSzGVWR8LUjg%2Boo/FzmP5RqES4aHiEv4F2Ohn0Vo%3D";

export default function CreateAgentPage() {
  const router = useRouter();
  
  // Use Redux store for authentication state
  const { isAuthenticated, publicKey } = useAppSelector(state => state.appState);
  
  // Form state
  const [name, setName] = useState("");
  const [type, setType] = useState("Text");
  const [description, setDescription] = useState("");
  const [capabilities, setCapabilities] = useState<string[]>([]);
  
  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [customCapability, setCustomCapability] = useState("");
  const [formValid, setFormValid] = useState(false);
  
  // Debug log to check authentication status
  useEffect(() => {
    console.log("Create Agent - Authentication status:", { isAuthenticated, publicKey });
  }, [isAuthenticated, publicKey]);
  
  // Check form validity
  useEffect(() => {
    setFormValid(name.trim() !== "" && type !== "");
  }, [name, type]);
  
  // Predefined capabilities
  const predefinedCapabilities = [
    "Creative Writing",
    "Content Summarization",
    "Data Analysis",
    "Code Generation",
    "Image Creation",
    "Music Composition",
    "Translation",
    "Question Answering"
  ];
  
  // Handle capability selection
  const toggleCapability = (capability: string) => {
    if (capabilities.includes(capability)) {
      setCapabilities(capabilities.filter(c => c !== capability));
    } else {
      setCapabilities([...capabilities, capability]);
    }
  };
  
  // Add custom capability
  const addCustomCapability = () => {
    if (customCapability.trim() && !capabilities.includes(customCapability)) {
      setCapabilities([...capabilities, customCapability]);
      setCustomCapability("");
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Capture current values to avoid issues with changing dependencies
    const currentPublicKey = publicKey;
    const currentIsAuthenticated = isAuthenticated;
    
    if (!currentIsAuthenticated || !currentPublicKey) {
      setError("Please connect your wallet to create an agent");
      return;
    }
    
    if (!name.trim()) {
      setError("Agent name is required");
      return;
    }
    
    if (!type) {
      setError("Agent type is required");
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      console.log("Submitting with public key:", currentPublicKey); // Debug log
      
      const response = await fetchWithPublicKey('/api/agents', currentPublicKey, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          description,
          type,
          capabilities,
          parameters: {},
          image_url: DEFAULT_AGENT_IMAGE
        })
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create agent');
      }
      
      // Redirect to agents page
      router.push('/agents');
    } catch (err) {
      console.error('Error creating agent:', err);
      setError(err instanceof Error ? err.message : 'Failed to create agent');
    } finally {
      setLoading(false);
    }
  };

  // Handle image error
  const handleImageError = () => {
    console.error("Failed to load agent image");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <PageTransition>
        <main className="pt-24 pb-16 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
          <AnimatedElement animation="fadeIn" delay={0.1}>
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">
                Create Your <span className="gradient-text">AI Agent</span>
              </h1>
              <p className="text-foreground/70 max-w-2xl mx-auto">
                Deploy a customized AI agent with specialized capabilities, tokenized as a unique digital asset on the blockchain.
              </p>
            </div>
          </AnimatedElement>
          
          {!isAuthenticated && (
            <div className="bg-amber-500/10 text-amber-500 p-4 rounded-md flex items-center gap-2 mb-6">
              <AlertCircle className="w-5 h-5" />
              <p>Please connect your wallet to create an agent.</p>
            </div>
          )}
          
          {error && (
            <div className="bg-destructive/10 text-destructive p-4 rounded-md flex items-center gap-2 mb-6">
              <AlertCircle className="w-5 h-5" />
              <p>{error}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Form Section */}
              <ScrollReveal animation="slideUp" delay={0.3} className="md:col-span-2">
                <div className="feature-card">
                  <h2 className="text-2xl font-semibold mb-6">Basic Information</h2>
                  
                  <StaggerContainer className="space-y-6" delay={0.1}>
                    <AnimatedElement animation="fadeIn" delay={0.1}>
                      <div>
                        <label className="block text-sm font-medium mb-2">Agent Name</label>
                        <input 
                          type="text" 
                          placeholder="Enter a name for your agent"
                          className="w-full px-4 py-2 rounded-md bg-background border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                    </AnimatedElement>
                    
                    <AnimatedElement animation="fadeIn" delay={0.2}>
                      <div>
                        <label className="block text-sm font-medium mb-2">Agent Type</label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {AGENT_TYPES.map((agentType) => (
                            <div 
                              key={`agent-type-${agentType}`}
                              className={`border ${type === agentType ? 'border-primary/50 bg-primary/5' : 'border-border hover:border-primary/50 hover:bg-primary/5'} rounded-md p-3 flex flex-col items-center cursor-pointer`}
                              onClick={() => setType(agentType)}
                            >
                              {agentType === "Text" && <FileText className={`w-6 h-6 mb-2 ${type === agentType ? 'text-primary' : ''}`} />}
                              {agentType === "Image" && <ImageIcon className={`w-6 h-6 mb-2 ${type === agentType ? 'text-primary' : ''}`} />}
                              {agentType === "Audio" && <Music className={`w-6 h-6 mb-2 ${type === agentType ? 'text-primary' : ''}`} />}
                              {agentType === "Code" && <Code className={`w-6 h-6 mb-2 ${type === agentType ? 'text-primary' : ''}`} />}
                              {agentType === "Data" && <Settings className={`w-6 h-6 mb-2 ${type === agentType ? 'text-primary' : ''}`} />}
                              <span className="text-sm">{agentType}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </AnimatedElement>
                    
                    <AnimatedElement animation="fadeIn" delay={0.3}>
                      <div>
                        <label className="block text-sm font-medium mb-2">Description</label>
                        <textarea 
                          placeholder="Describe what your agent does..."
                          rows={4}
                          className="w-full px-4 py-2 rounded-md bg-background border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                      </div>
                    </AnimatedElement>
                    
                    <AnimatedElement animation="fadeIn" delay={0.5}>
                      <div>
                        <label className="block text-sm font-medium mb-2">Capabilities</label>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {predefinedCapabilities.map((capability) => (
                            <button
                              key={`capability-${capability}`}
                              type="button"
                              className={`px-3 py-1 rounded-full text-sm ${
                                capabilities.includes(capability)
                                  ? 'bg-primary text-white'
                                  : 'bg-card hover:bg-primary/10'
                              }`}
                              onClick={() => toggleCapability(capability)}
                            >
                              {capability}
                            </button>
                          ))}
                        </div>
                        
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Add custom capability"
                            className="flex-1 px-4 py-2 rounded-md bg-background border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                            value={customCapability}
                            onChange={(e) => setCustomCapability(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomCapability())}
                          />
                          <Button 
                            type="button"
                            variant="outline"
                            onClick={addCustomCapability}
                          >
                            Add
                          </Button>
                        </div>
                        
                        {capabilities.length > 0 && (
                          <div className="mt-4">
                            <h4 className="text-sm font-medium mb-2">Selected Capabilities:</h4>
                            <div className="flex flex-wrap gap-2">
                              {capabilities.map((capability) => (
                                <div 
                                  key={`selected-capability-${capability}`}
                                  className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                                >
                                  {capability}
                                  <button
                                    type="button"
                                    className="w-4 h-4 rounded-full bg-primary/20 hover:bg-primary/30 flex items-center justify-center"
                                    onClick={() => toggleCapability(capability)}
                                  >
                                    ×
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </AnimatedElement>
                    
                    <AnimatedElement animation="fadeIn" delay={0.6}>
                      <div className="flex justify-between items-center pt-4">
                        <Button 
                          type="button"
                          variant="outline"
                          onClick={() => router.push('/agents')}
                        >
                          Cancel
                        </Button>
                        <Button 
                          type="submit" 
                          variant="app" 
                          className="flex items-center gap-2"
                          disabled={loading || !isAuthenticated || !formValid}
                        >
                          {loading ? (
                            <>
                              <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
                              Creating...
                            </>
                          ) : (
                            <>
                              Create Agent
                              <Sparkles className="w-4 h-4" />
                            </>
                          )}
                        </Button>
                      </div>
                    </AnimatedElement>
                  </StaggerContainer>
                </div>
              </ScrollReveal>
              
              {/* Preview Section */}
              <ScrollReveal animation="slideUp" delay={0.4}>
                <div className="feature-card sticky top-24">
                  <h2 className="text-xl font-semibold mb-4">Agent Preview</h2>
                  
                  <div className="relative w-full h-48 mb-4 rounded-md overflow-hidden bg-background/50 flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Image 
                        src="/robo-template.webp"
                        alt={name || "Agent"} 
                        width={96}
                        height={96}
                        className="w-24 h-24 object-contain"
                        onError={handleImageError}
                      />
                    </div>
                    <div className="absolute bottom-2 right-2 bg-card px-2 py-1 rounded-full text-xs font-medium">
                      {type}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-2">
                    {name || "New Agent"}
                  </h3>
                  <p className="text-sm text-foreground/70 mb-6">
                    {description || "No description provided."}
                  </p>
                  
                  {capabilities.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-sm font-medium mb-2">Capabilities:</h4>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {capabilities.slice(0, 5).map((capability) => (
                          <span 
                            key={`preview-capability-${capability}`}
                            className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs"
                          >
                            {capability}
                          </span>
                        ))}
                        {capabilities.length > 5 && (
                          <span className="bg-card px-2 py-0.5 rounded-full text-xs">
                            +{capabilities.length - 5} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            </div>
          </form>
        </main>
      </PageTransition>
    </div>
  );
} 