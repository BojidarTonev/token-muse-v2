"use client";

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Zap,
  Users,
  Sparkles,
  Star,
  Brain,
  Cpu,
  Rocket,
  Database,
  Link as LinkIcon,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  PageTransition,
  AnimatedElement,
  ScrollReveal,
} from "@/components/motion";
import { useState, useEffect, useCallback } from "react";
import { useAppSelector } from "@/redux/store";
import { fetchWithPublicKey } from "@/lib/api-utils";

// Featured network with existing agents
const featuredNetwork = {
  id: "innovation-nexus",
  name: "Innovation Nexus",
  description:
    "Our flagship network combining strategic thinking, creative innovation, and technical expertise to solve complex problems and generate breakthrough ideas.",
  agents: [
    {
      name: "Quantum",
      role: "Strategic Analysis",
      icon: Brain,
      color: "text-blue-500",
    },
    {
      name: "Athena",
      role: "Knowledge Integration",
      icon: Database,
      color: "text-purple-500",
    },
    {
      name: "Nexus",
      role: "System Architecture",
      icon: Cpu,
      color: "text-green-500",
    },
    {
      name: "Nova",
      role: "Creative Synthesis",
      icon: Sparkles,
      color: "text-amber-500",
    },
    {
      name: "Aria",
      role: "Communication",
      icon: LinkIcon,
      color: "text-rose-500",
    },
  ],
  capabilities: [
    "Cross-domain problem solving",
    "Innovative concept generation",
    "Technical implementation planning",
    "Knowledge synthesis and integration",
    "Strategic roadmap development",
  ],
  image: "/network-innovation.svg",
};

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
  agent_count?: number;
}

export default function NetworkPage() {
  const [showContent, setShowContent] = useState(false);
  const [viewMode, setViewMode] = useState<"featured" | "my">("featured");
  const [userNetworks, setUserNetworks] = useState<Network[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Get authentication state from Redux
  const auth = useAppSelector((state) => state.appState);
  const isAuthenticated = auth?.isAuthenticated;
  const publicKey = auth?.publicKey;

  // Set mounted state on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Function to fetch user networks - wrapped in useCallback
  const fetchUserNetworks = useCallback(async () => {
    if (!isAuthenticated || !publicKey) {
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const response = await fetchWithPublicKey(
        `/api/networks?owner=${publicKey}`,
        publicKey
      );
      if (response.ok) {
        const data = await response.json();
        setUserNetworks(data);
      } else {
        console.error("Failed to fetch networks");
        setError("Failed to load your networks. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching networks:", error);
      setError("Error fetching networks. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, publicKey]);

  // Fetch user networks when in "My Networks" mode
  useEffect(() => {
    if (isMounted && viewMode === "my" && isAuthenticated && publicKey) {
      fetchUserNetworks();
    }
  }, [viewMode, isAuthenticated, publicKey, fetchUserNetworks, isMounted]);

  // Don't render anything on the server or until client-side hydration is complete
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="pt-24 pb-16 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-center items-center text-center md:items-center mb-6">
            <div>
              <div className="mb-4">
                <h1 className="text-3xl font-bold">Agent Networks</h1>
              </div>
              <p className="text-foreground/70 max-w-xl">
                Connect multiple AI agents into collaborative networks to tackle
                complex creative and problem-solving tasks.
              </p>
            </div>
          </div>
          <div className="flex justify-center mb-8">
            <div className="bg-background/50 border border-border rounded-full p-1 flex">
              <button
                className="px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer"
                disabled
              >
                Information
              </button>
              <button
                className="px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer"
                disabled
              >
                My Networks
              </button>
            </div>
          </div>
          <div className="h-64 flex items-center justify-center">
            <p className="text-foreground/50">Loading...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <PageTransition>
        <main className="pt-24 pb-16 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
          <AnimatedElement animation="fadeIn" delay={0.1}>
            <div className="flex flex-col md:flex-row justify-center items-center text-center md:items-center mb-6">
              <div>
                <div className="mb-4">
                  <h1 className="text-3xl font-bold">Agent Networks</h1>
                </div>
                <p className="text-foreground/70 max-w-xl">
                  Connect multiple AI agents into collaborative networks to
                  tackle complex creative and problem-solving tasks.
                </p>
              </div>
            </div>
          </AnimatedElement>

          {/* Network View Toggle */}
          <AnimatedElement animation="fadeIn" delay={0.15}>
            <div className="flex justify-center mb-8">
              <div className="bg-background/50 border border-border rounded-full p-1 flex">
                <button
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                    viewMode === "featured"
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-background/80"
                  }`}
                  onClick={() => setViewMode("featured")}
                >
                  Information
                </button>
                <button
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                    viewMode === "my"
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-background/80"
                  }`}
                  onClick={() => setViewMode("my")}
                >
                  My Networks
                </button>
              </div>
            </div>
          </AnimatedElement>

          {viewMode === "featured" ? (
            <>
              {/* Featured Network - Developer Showcase */}
              <ScrollReveal animation="fadeIn" delay={0.2}>
                <section className="mb-16">
                  <div className="feature-card overflow-hidden border-primary/30 bg-gradient-to-br from-background to-primary/5">
                    <div className="absolute top-4 right-4 bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <Star className="w-3 h-3" fill="currentColor" />
                      Developer Showcase
                    </div>

                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h2 className="text-2xl font-semibold mb-2">
                          Featured Network
                        </h2>
                        <h3 className="text-xl font-medium text-primary">
                          {featuredNetwork.name}
                        </h3>
                      </div>
                      <Button
                        variant="ghost"
                        className="p-2 hover:bg-primary/10 rounded-full flex items-center gap-2 cursor-pointer"
                        onClick={() => setShowContent(!showContent)}
                      >
                        <span className="text-sm text-foreground/70">
                          {showContent ? "Hide details" : "Show details"}
                        </span>
                        {showContent ? (
                          <ChevronUp className="w-5 h-5 text-primary" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-primary" />
                        )}
                      </Button>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">
                      <div className="lg:w-1/2">
                        <p className="text-foreground/80 mb-6">
                          {featuredNetwork.description}
                        </p>

                        {/* Network details that will be shown/hidden */}
                        <div
                          className={`transition-all duration-500 ease-in-out overflow-hidden ${
                            showContent
                              ? "max-h-[1000px] opacity-100"
                              : "max-h-0 opacity-0"
                          }`}
                        >
                          <div className="bg-background/50 p-5 rounded-lg mb-6">
                            <h4 className="font-medium mb-4 flex items-center gap-2">
                              <Users className="w-4 h-4 text-primary" />
                              Network Agents
                            </h4>

                            <div className="space-y-3">
                              {featuredNetwork.agents.map((agent) => (
                                <div
                                  key={agent.name}
                                  className="flex items-center gap-3 p-3 rounded-md bg-background/70 hover:bg-background transition-colors"
                                >
                                  <div
                                    className={`p-2 rounded-full ${agent.color.replace(
                                      "text-",
                                      "bg-"
                                    )}/10`}
                                  >
                                    <agent.icon
                                      className={`w-4 h-4 ${agent.color}`}
                                    />
                                  </div>
                                  <div>
                                    <div className="font-medium">
                                      {agent.name}
                                    </div>
                                    <div className="text-xs text-foreground/60">
                                      {agent.role}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="bg-background/50 p-5 rounded-lg mb-6">
                            <h4 className="font-medium mb-4 flex items-center gap-2">
                              <Zap className="w-4 h-4 text-primary" />
                              Network Capabilities
                            </h4>

                            <ul className="space-y-2">
                              {featuredNetwork.capabilities.map(
                                (capability) => (
                                  <li
                                    key={capability}
                                    className="flex items-start gap-2"
                                  >
                                    <Rocket className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                                    <span>{capability}</span>
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        </div>

                        <Link href="/create-network">
                          <Button
                            variant="app"
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <Plus className="w-4 h-4" />
                            Create Your Own Network
                          </Button>
                        </Link>
                      </div>

                      <div className="lg:w-1/2 relative min-h-[400px]">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="relative w-full h-full">
                            {/* Central network hub */}
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 glow">
                              <Image
                                src="/network-icon.svg"
                                alt="Network Hub"
                                width={128}
                                height={128}
                                className="animate-pulse"
                              />
                            </div>

                            {/* Agent nodes with connecting lines - always visible */}
                            {featuredNetwork.agents.map((agent, index) => {
                              // Calculate position in a circle around the center
                              const angle =
                                (index / featuredNetwork.agents.length) *
                                Math.PI *
                                2;
                              const radius = 120; // Distance from center
                              const top = `calc(50% + ${
                                Math.sin(angle) * radius
                              }px)`;
                              const left = `calc(50% + ${
                                Math.cos(angle) * radius
                              }px)`;

                              return (
                                <div
                                  key={agent.name}
                                  className="absolute w-16 h-16 transform -translate-x-1/2 -translate-y-1/2 glow"
                                  style={{ top, left }}
                                >
                                  {/* Connection line to center */}
                                  <div
                                    className="absolute top-1/2 left-1/2 w-[120px] h-0.5 bg-gradient-to-r from-primary/10 to-primary/50 origin-left"
                                    style={{
                                      transform: `rotate(${
                                        angle + Math.PI
                                      }rad)`,
                                    }}
                                  />

                                  {/* Agent icon */}
                                  <div
                                    className={`w-16 h-16 rounded-full ${agent.color.replace(
                                      "text-",
                                      "bg-"
                                    )}/10 flex items-center justify-center animate-float-slow border border-${agent.color.replace(
                                      "text-",
                                      ""
                                    )}/20`}
                                  >
                                    <agent.icon
                                      className={`w-8 h-8 ${agent.color}`}
                                    />
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
                </section>
              </ScrollReveal>

              {/* What are Networks? */}
              <ScrollReveal animation="fadeIn" delay={0.3}>
                <section className="mb-16">
                  <h2 className="text-2xl font-semibold mb-4">
                    What are Agent Networks?
                  </h2>
                  <div className="feature-card">
                    <p className="text-foreground/80 mb-6">
                      Agent Networks are powerful systems that connect multiple
                      specialized AI agents to work together on complex tasks.
                      By combining the unique capabilities of different agents,
                      networks can achieve results that would be impossible for
                      a single agent.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div className="bg-background/50 p-5 rounded-lg">
                        <div className="p-3 rounded-full bg-primary/10 w-fit mb-4">
                          <LinkIcon className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="text-lg font-medium mb-2">
                          Seamless Collaboration
                        </h3>
                        <p className="text-sm text-foreground/70">
                          Agents in a network communicate with each other,
                          passing information and results between them to build
                          on each other&apos;s work.
                        </p>
                      </div>

                      <div className="bg-background/50 p-5 rounded-lg">
                        <div className="p-3 rounded-full bg-primary/10 w-fit mb-4">
                          <Zap className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="text-lg font-medium mb-2">
                          Enhanced Capabilities
                        </h3>
                        <p className="text-sm text-foreground/70">
                          Networks combine the strengths of multiple agents,
                          enabling them to tackle more complex problems than any
                          single agent could handle.
                        </p>
                      </div>

                      <div className="bg-background/50 p-5 rounded-lg">
                        <div className="p-3 rounded-full bg-primary/10 w-fit mb-4">
                          <Rocket className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="text-lg font-medium mb-2">
                          Workflow Automation
                        </h3>
                        <p className="text-sm text-foreground/70">
                          Define custom workflows where outputs from one agent
                          automatically become inputs for another, creating
                          efficient processing pipelines.
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <Link href="/create-network">
                        <Button
                          variant="app"
                          size="lg"
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <Plus className="w-4 h-4" />
                          Create Your First Network
                        </Button>
                      </Link>
                    </div>
                  </div>
                </section>
              </ScrollReveal>
            </>
          ) : (
            <ScrollReveal animation="fadeIn" delay={0.2}>
              <section className="mb-16">
                {!isAuthenticated ? (
                  <div className="feature-card text-center py-16 flex flex-col items-center">
                    <div className="mb-6">
                      <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                        <Users className="w-10 h-10 text-primary" />
                      </div>
                    </div>
                    <h2 className="text-2xl font-semibold mb-3">
                      Authentication Required
                    </h2>
                    <p className="text-foreground/70 max-w-md mx-auto mb-8 text-center">
                      You need to be logged in to view and manage your networks.
                      Please log in to access this functionality.
                    </p>
                  </div>
                ) : isLoading ? (
                  <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                  </div>
                ) : error ? (
                  <div className="bg-destructive/10 text-destructive p-6 rounded-lg text-center">
                    <p>{error}</p>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={fetchUserNetworks}
                    >
                      Try Again
                    </Button>
                  </div>
                ) : userNetworks.length === 0 ? (
                  <div className="feature-card text-center py-16 flex flex-col items-center">
                    <div className="mb-6">
                      <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                        <Plus className="w-10 h-10 text-primary" />
                      </div>
                    </div>
                    <h2 className="text-2xl font-semibold mb-3">
                      No Networks Yet
                    </h2>
                    <p className="text-foreground/70 max-w-md mx-auto mb-8 text-center">
                      You haven&apos;t created any networks yet. Start by
                      creating your first network to connect multiple agents
                      together.
                    </p>
                    <div className="flex justify-center w-full">
                      <Link href="/create-network">
                        <Button
                          variant="app"
                          size="lg"
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <Plus className="w-4 h-4" />
                          Create Your First Network
                        </Button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-semibold">My Networks</h2>
                      <Link href="/create-network">
                        <Button
                          variant="app"
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <Plus className="w-4 h-4" />
                          Create New Network
                        </Button>
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {userNetworks.map((network) => (
                        <Link href={`/network/${network.id}`} key={network.id}>
                          <div className="feature-card h-full hover:border-primary/50 transition-colors cursor-pointer">
                            <div className="flex items-center gap-4 mb-4">
                              <div className="p-3 rounded-full bg-primary/10">
                                <Plus className="w-5 h-5 text-primary" />
                              </div>
                              <h3 className="text-lg font-medium truncate">
                                {network.name}
                              </h3>
                            </div>

                            {network.description && (
                              <p className="text-foreground/70 mb-4 line-clamp-2">
                                {network.description}
                              </p>
                            )}

                            <div className="mt-auto pt-4 flex justify-between items-center text-sm text-foreground/60">
                              <div>
                                Created:{" "}
                                {new Date(
                                  network.created_at
                                ).toLocaleDateString()}
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                {network.agent_count || 0} agents
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </>
                )}
              </section>
            </ScrollReveal>
          )}
        </main>
      </PageTransition>
    </div>
  );
}
