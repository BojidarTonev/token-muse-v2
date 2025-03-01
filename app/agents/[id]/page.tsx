import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Share2, Sparkles, MessageSquare, Code, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Mock data for agents (this would typically come from an API or database)
const agents = [
  {
    id: "1",
    name: "Creative Writer",
    description: "Specialized in generating creative stories, poems, and narrative content.",
    longDescription: "The Creative Writer agent is designed to produce high-quality written content across various creative formats. It excels at crafting engaging narratives, compelling characters, and evocative descriptions. Whether you need a short story, poem, screenplay, or novel chapter, this agent leverages advanced language models to deliver content that resonates with readers.",
    type: "Text",
    image: "/agent-writer.svg",
    capabilities: ["Story Generation", "Character Development", "Poetry", "Screenplay Writing", "Content Editing"],
    tokenCost: 150,
    creator: "TokenMuse Labs",
    dateCreated: "2023-09-15",
    version: "2.1.0",
    usageSamples: [
      "Generate a short story about a space explorer discovering a new planet",
      "Write a sonnet about the changing seasons",
      "Create a character profile for a fantasy novel protagonist"
    ]
  },
  {
    id: "2",
    name: "Visual Artist",
    description: "Creates stunning digital art, illustrations, and visual designs.",
    longDescription: "The Visual Artist agent combines advanced image generation capabilities with artistic sensibilities to create beautiful digital artwork. From illustrations and concept art to abstract compositions and visual designs, this agent can produce high-quality images based on textual descriptions. It understands composition, color theory, and various artistic styles.",
    type: "Image",
    image: "/agent-artist.svg",
    capabilities: ["Digital Illustration", "Concept Art", "Pattern Design", "Character Design", "Style Transfer"],
    tokenCost: 250,
    creator: "ArtGen Collective",
    dateCreated: "2023-10-22",
    version: "1.8.5",
    usageSamples: [
      "Create a fantasy landscape with mountains and a castle",
      "Generate a portrait in the style of impressionism",
      "Design a futuristic vehicle concept"
    ]
  },
  {
    id: "3",
    name: "Music Composer",
    description: "Composes original music tracks across various genres and styles.",
    longDescription: "The Music Composer agent is designed to create original musical compositions across a wide range of genres and styles. It can generate melodies, harmonies, rhythms, and complete arrangements based on specified parameters. This agent understands music theory and can adapt to different moods, tempos, and instrumentation requirements.",
    type: "Audio",
    image: "/agent-composer.svg",
    capabilities: ["Melody Composition", "Harmony Generation", "Beat Production", "Orchestral Arrangement", "Genre Adaptation"],
    tokenCost: 200,
    creator: "Harmonic AI",
    dateCreated: "2023-11-05",
    version: "1.5.2",
    usageSamples: [
      "Compose a relaxing ambient track for meditation",
      "Create an upbeat pop song with verse-chorus structure",
      "Generate a classical piano piece in the style of Chopin"
    ]
  },
  {
    id: "4",
    name: "Code Generator",
    description: "Writes clean, efficient code in multiple programming languages.",
    longDescription: "The Code Generator agent specializes in producing clean, efficient, and well-documented code across multiple programming languages and frameworks. It can handle everything from simple scripts to complex applications, following best practices and design patterns. This agent is particularly useful for rapid prototyping, solving algorithmic challenges, and automating repetitive coding tasks.",
    type: "Code",
    image: "/agent-coder.svg",
    capabilities: ["Full-Stack Development", "Algorithm Design", "API Integration", "Debugging", "Code Optimization"],
    tokenCost: 180,
    creator: "DevMatrix",
    dateCreated: "2023-08-30",
    version: "3.0.1",
    usageSamples: [
      "Create a React component for a user profile page",
      "Write a Python script to process and analyze CSV data",
      "Generate a RESTful API endpoint in Node.js"
    ]
  },
  {
    id: "5",
    name: "Data Analyst",
    description: "Processes and visualizes complex data sets for insights.",
    longDescription: "The Data Analyst agent is designed to process, analyze, and visualize complex datasets to extract meaningful insights. It can handle various data formats, perform statistical analyses, create visualizations, and generate comprehensive reports. This agent excels at identifying patterns, trends, and correlations that might not be immediately apparent in raw data.",
    type: "Data",
    image: "/agent-analyst.svg",
    capabilities: ["Statistical Analysis", "Data Visualization", "Predictive Modeling", "Report Generation", "Trend Identification"],
    tokenCost: 220,
    creator: "Insight Analytics",
    dateCreated: "2023-07-18",
    version: "2.3.4",
    usageSamples: [
      "Analyze customer purchase patterns from transaction data",
      "Create visualizations of website traffic over time",
      "Generate a predictive model for stock price movements"
    ]
  },
  {
    id: "6",
    name: "Marketing Expert",
    description: "Creates compelling marketing copy and campaign strategies.",
    longDescription: "The Marketing Expert agent specializes in creating persuasive marketing content and developing effective campaign strategies. From catchy taglines and compelling product descriptions to comprehensive marketing plans, this agent combines creativity with strategic thinking to help businesses connect with their target audiences and drive conversions.",
    type: "Text",
    image: "/agent-marketer.svg",
    capabilities: ["Copywriting", "Campaign Planning", "Brand Messaging", "Content Strategy", "Market Analysis"],
    tokenCost: 170,
    creator: "BrandGenius",
    dateCreated: "2023-09-02",
    version: "2.2.0",
    usageSamples: [
      "Write a compelling product description for a new smartphone",
      "Create a social media campaign plan for a restaurant opening",
      "Develop a tagline for an eco-friendly clothing brand"
    ]
  },
];

export default function AgentDetailsPage({ params }: { params: { id: string } }) {
  // Find the agent with the matching ID
  const agent = agents.find(a => a.id === params.id);
  
  // If no agent is found, we could redirect or show an error
  if (!agent) {
    return (
      <div className="bg-background text-foreground">
        <Navbar />
        <main className="pt-24 pb-16 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Agent Not Found</h1>
            <p className="mb-8">The agent you're looking for doesn't exist or has been removed.</p>
            <Link href="/agents">
              <Button variant="app">Back to Agents</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }
  
  return (
    <div className="bg-background text-foreground">
      <Navbar />
      
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
            <Image
              src={agent.image}
              alt={agent.name}
              width={180}
              height={180}
              className="transition-transform duration-300 hover:scale-105"
            />
          </div>
          
          <div className="md:col-span-2">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div>
                <div className="inline-block bg-card px-3 py-1 rounded-full text-xs font-medium mb-2">
                  {agent.type}
                </div>
                <h1 className="text-3xl font-bold mb-2">{agent.name}</h1>
                <p className="text-foreground/70 mb-4">{agent.longDescription}</p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
                <Button variant="app" size="sm" className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Use Agent
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
              <div className="bg-background/50 p-3 rounded-md border border-border/10">
                <div className="text-xs text-foreground/60">Creator</div>
                <div className="font-medium">{agent.creator}</div>
              </div>
              <div className="bg-background/50 p-3 rounded-md border border-border/10">
                <div className="text-xs text-foreground/60">Version</div>
                <div className="font-medium">{agent.version}</div>
              </div>
              <div className="bg-background/50 p-3 rounded-md border border-border/10">
                <div className="text-xs text-foreground/60">Created</div>
                <div className="font-medium">{agent.dateCreated}</div>
              </div>
              <div className="bg-background/50 p-3 rounded-md border border-border/10 sm:col-span-3">
                <div className="text-xs text-foreground/60">Token Cost</div>
                <div className="font-medium flex items-center gap-2">
                  <span>{agent.tokenCost} $MUSE</span>
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
            {agent.capabilities.map((capability, index) => (
              <div key={index} className="feature-card p-4 flex items-center gap-3">
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
          <h2 className="text-2xl font-bold mb-6">Example Prompts</h2>
          <div className="space-y-4">
            {agent.usageSamples.map((sample, index) => (
              <div key={index} className="feature-card p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-primary/10 mt-1">
                    <MessageSquare className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-foreground/90">{sample}</p>
                    <div className="mt-2 flex justify-end">
                      <Button variant="ghost" size="sm" className="text-xs text-primary hover:bg-primary/10">
                        Try this prompt
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
          <h2 className="text-2xl font-bold mb-6">Integration</h2>
          <div className="feature-card p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-3">API Access</h3>
                <p className="text-sm text-foreground/70 mb-4">
                  Integrate this agent directly into your applications with our simple API. Access the full capabilities programmatically.
                </p>
                <Button variant="outline" className="flex items-center gap-2">
                  <Code className="w-4 h-4" />
                  View API Docs
                </Button>
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-3">Download SDK</h3>
                <p className="text-sm text-foreground/70 mb-4">
                  Get our software development kit to easily incorporate this agent into your projects with minimal setup.
                </p>
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download SDK
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related agents */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Related Agents</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents
              .filter(a => a.id !== agent.id && a.type === agent.type)
              .slice(0, 3)
              .map((relatedAgent) => (
                <Link href={`/agents/${relatedAgent.id}`} key={relatedAgent.id}>
                  <div className="feature-card group cursor-pointer h-full">
                    <div className="relative w-full h-40 mb-4 rounded-md overflow-hidden bg-background/50">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Image
                          src={relatedAgent.image}
                          alt={relatedAgent.name}
                          width={80}
                          height={80}
                          className="transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                      <div className="absolute top-2 right-2 bg-card px-2 py-1 rounded-full text-xs font-medium">
                        {relatedAgent.type}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {relatedAgent.name}
                    </h3>
                    <p className="text-sm text-foreground/70 mb-4">
                      {relatedAgent.description}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </main>
    </div>
  );
} 