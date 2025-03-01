import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowRight, Network, FileText, Image as ImageIcon, Music, Code } from "lucide-react";

export default function CreateNarrativePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="pt-24 pb-16 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Create a <span className="gradient-text">Narrative</span>
          </h1>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Define a master narrative or problem statement that will be distributed to all agents in your selected network.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="md:col-span-2">
            <div className="feature-card">
              <h2 className="text-2xl font-semibold mb-6">Narrative Details</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Select Network</label>
                  <select className="w-full px-4 py-2 rounded-md bg-background border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
                    <option value="">Choose a network</option>
                    <option value="1">Creative Studio (5 Agents)</option>
                    <option value="2">Marketing Suite (4 Agents)</option>
                    <option value="3">Development Team (6 Agents)</option>
                    <option value="4">Narrative Engine (8 Agents)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Narrative Title</label>
                  <input 
                    type="text" 
                    placeholder="Enter a title for your narrative"
                    className="w-full px-4 py-2 rounded-md bg-background border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Narrative Type</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="border border-primary/50 rounded-md p-3 flex flex-col items-center cursor-pointer bg-primary/5">
                      <FileText className="w-6 h-6 text-primary mb-2" />
                      <span className="text-sm">Story</span>
                    </div>
                    <div className="border border-border rounded-md p-3 flex flex-col items-center cursor-pointer hover:border-primary/50 hover:bg-primary/5">
                      <ImageIcon className="w-6 h-6 mb-2" />
                      <span className="text-sm">Visual</span>
                    </div>
                    <div className="border border-border rounded-md p-3 flex flex-col items-center cursor-pointer hover:border-primary/50 hover:bg-primary/5">
                      <Code className="w-6 h-6 mb-2" />
                      <span className="text-sm">Technical</span>
                    </div>
                    <div className="border border-border rounded-md p-3 flex flex-col items-center cursor-pointer hover:border-primary/50 hover:bg-primary/5">
                      <Music className="w-6 h-6 mb-2" />
                      <span className="text-sm">Mixed</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Master Prompt</label>
                  <textarea 
                    placeholder="Enter the master prompt that will be distributed to all agents in the network..."
                    rows={8}
                    className="w-full px-4 py-2 rounded-md bg-background border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  ></textarea>
                  <p className="text-xs text-foreground/60 mt-2">
                    This prompt will be intelligently adapted for each agent based on their specific capabilities and role within the network.
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Additional Context (Optional)</label>
                  <textarea 
                    placeholder="Provide any additional context or specific instructions for the narrative..."
                    rows={4}
                    className="w-full px-4 py-2 rounded-md bg-background border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  ></textarea>
                </div>
                
                <div className="flex justify-between items-center pt-4">
                  <Button variant="outline">
                    Save Draft
                  </Button>
                  <Button variant="app" className="flex items-center gap-2">
                    Generate Narrative
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Preview Section */}
          <div>
            <div className="feature-card sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Network Preview</h2>
              
              <div className="relative w-full h-48 mb-4 rounded-md overflow-hidden bg-background/50 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Network className="w-16 h-16 text-primary/30" />
                </div>
                <div className="absolute bottom-2 right-2 bg-card px-2 py-1 rounded-full text-xs font-medium">
                  5 Agents
                </div>
              </div>
              
              <h3 className="text-lg font-semibold mb-2">
                Creative Studio
              </h3>
              <p className="text-sm text-foreground/70 mb-6">
                A network of agents specialized in creative content production, including writing, visual art, and music composition.
              </p>
              
              <div className="border-t border-border pt-4">
                <h4 className="text-sm font-medium mb-2">Agent Distribution</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span className="text-xs">Writer Agent</span>
                    </div>
                    <span className="text-xs text-foreground/60">Text</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#8A2BE2]"></div>
                      <span className="text-xs">Artist Agent</span>
                    </div>
                    <span className="text-xs text-foreground/60">Image</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#9370DB]"></div>
                      <span className="text-xs">Composer Agent</span>
                    </div>
                    <span className="text-xs text-foreground/60">Audio</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#DA70D6]"></div>
                      <span className="text-xs">Editor Agent</span>
                    </div>
                    <span className="text-xs text-foreground/60">Text</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#FF69B4]"></div>
                      <span className="text-xs">Animator Agent</span>
                    </div>
                    <span className="text-xs text-foreground/60">Video</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 