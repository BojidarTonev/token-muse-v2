import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Settings, Image as ImageIcon, FileText, Music, Code } from "lucide-react";
import Image from "next/image";

export default function CreateAgentPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="pt-24 pb-16 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Create Your <span className="gradient-text">AI Agent</span>
          </h1>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Deploy a customized AI agent with specialized capabilities, tokenized as a unique digital asset on the blockchain.
          </p>
        </div>
        
        {/* Step Indicator */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-semibold">
              1
            </div>
            <div className="w-20 h-1 bg-primary"></div>
            <div className="w-10 h-10 rounded-full bg-card border border-primary/50 flex items-center justify-center text-foreground/70 font-semibold">
              2
            </div>
            <div className="w-20 h-1 bg-border"></div>
            <div className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-foreground/70 font-semibold">
              3
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="md:col-span-2">
            <div className="feature-card">
              <h2 className="text-2xl font-semibold mb-6">Basic Information</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Agent Name</label>
                  <input 
                    type="text" 
                    placeholder="Enter a name for your agent"
                    className="w-full px-4 py-2 rounded-md bg-background border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Agent Type</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="border border-primary/50 rounded-md p-3 flex flex-col items-center cursor-pointer bg-primary/5">
                      <FileText className="w-6 h-6 text-primary mb-2" />
                      <span className="text-sm">Text</span>
                    </div>
                    <div className="border border-border rounded-md p-3 flex flex-col items-center cursor-pointer hover:border-primary/50 hover:bg-primary/5">
                      <ImageIcon className="w-6 h-6 mb-2" />
                      <span className="text-sm">Image</span>
                    </div>
                    <div className="border border-border rounded-md p-3 flex flex-col items-center cursor-pointer hover:border-primary/50 hover:bg-primary/5">
                      <Music className="w-6 h-6 mb-2" />
                      <span className="text-sm">Audio</span>
                    </div>
                    <div className="border border-border rounded-md p-3 flex flex-col items-center cursor-pointer hover:border-primary/50 hover:bg-primary/5">
                      <Code className="w-6 h-6 mb-2" />
                      <span className="text-sm">Code</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea 
                    placeholder="Describe what your agent does..."
                    rows={4}
                    className="w-full px-4 py-2 rounded-md bg-background border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Initial Prompt</label>
                  <textarea 
                    placeholder="Enter a prompt that defines your agent's behavior and capabilities..."
                    rows={6}
                    className="w-full px-4 py-2 rounded-md bg-background border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  ></textarea>
                </div>
                
                <div className="flex justify-between items-center pt-4">
                  <Button variant="outline">
                    Save Draft
                  </Button>
                  <Button variant="app" className="flex items-center gap-2">
                    Continue to Customization
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Preview Section */}
          <div>
            <div className="feature-card sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Agent Preview</h2>
              
              <div className="relative w-full h-48 mb-4 rounded-md overflow-hidden bg-background/50 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="w-16 h-16 text-primary/30" />
                </div>
                <div className="absolute bottom-2 right-2 bg-card px-2 py-1 rounded-full text-xs font-medium">
                  Text
                </div>
              </div>
              
              <h3 className="text-lg font-semibold mb-2">
                Creative Writer
              </h3>
              <p className="text-sm text-foreground/70 mb-6">
                A specialized AI agent that generates creative stories, poems, and narrative content based on your prompts.
              </p>
              
              <div className="border-t border-border pt-4">
                <h4 className="text-sm font-medium mb-2">Advanced Settings</h4>
                <Button variant="outline" size="sm" className="w-full flex items-center justify-center gap-2">
                  <Settings className="w-4 h-4" />
                  Customize Parameters
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 