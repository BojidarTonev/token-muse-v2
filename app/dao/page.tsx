"use client";

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  Vote,
  Users,
  FileText,
  BarChart3,
  Shield,
  Lightbulb,
  ArrowRight,
  Clock,
  Construction,
  Calendar,
} from "lucide-react";
import Image from "next/image";
import {
  PageTransition,
  AnimatedElement,
  StaggerContainer,
  ScrollReveal,
} from "@/components/motion";

// Mock proposal data
const activeProposals = [
  {
    id: "PROP-2023-07",
    title: "Implement Cross-Chain Agent Deployment",
    votes: { for: 68, against: 12, abstain: 20 },
    status: "Active",
    daysLeft: 3,
  },
  {
    id: "PROP-2023-08",
    title: "Increase Token Burn Rate to 2% per Transaction",
    votes: { for: 52, against: 38, abstain: 10 },
    status: "Active",
    daysLeft: 5,
  },
  {
    id: "PROP-2023-09",
    title: "Add Support for Audio-Based AI Agents",
    votes: { for: 75, against: 5, abstain: 20 },
    status: "Active",
    daysLeft: 2,
  },
];

export default function DAOPage() {
  return (
    <div className="bg-background text-foreground">
      <Navbar />

      <PageTransition>
        <main className="pt-24 pb-16 px-4 sm:px-6 md:px-8 lg:px-12 max-w-[1400px] mx-auto">
          <AnimatedElement animation="fadeIn" delay={0.1}>
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="gradient-text">AgentMint</span> DAO
              </h1>
              <p className="text-foreground/70 max-w-2xl mx-auto">
                A decentralized governance system that puts the future of the
                platform in the hands of the community.
              </p>

              {/* Development Banner */}
              <div className="mt-6 mx-auto max-w-3xl">
                <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4 flex items-center gap-4">
                  <div className="p-3 rounded-full bg-secondary/20 flex-shrink-0">
                    <Construction className="w-5 h-5 text-secondary-foreground" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-secondary-foreground mb-1">
                      Under Development
                    </h3>
                    <p className="text-sm text-foreground/70">
                      The AgentMint DAO is currently in development and will
                      launch at the end of Q1 2025. This preview showcases the
                      planned functionality.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedElement>

          {/* Launch Timeline */}
          <section className="mb-12">
            <ScrollReveal animation="fadeIn">
              <div className="feature-card p-6 border-primary/20 bg-primary/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>

                <div className="flex flex-col md:flex-row gap-8 relative">
                  <div className="md:w-2/3">
                    <h2 className="text-2xl font-bold mb-4">
                      DAO Launch Timeline
                    </h2>
                    <p className="text-foreground/80 mb-6">
                      We&apos;re working hard to build a robust governance
                      system that will empower our community to shape the future
                      of AgentMint. The DAO will launch at the end of Q1 2025
                      with full voting capabilities.
                    </p>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-full bg-primary/10 mt-1">
                          <Calendar className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Q4 2024</h3>
                          <p className="text-sm text-foreground/70">
                            Smart contract development and security audits
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-full bg-primary/10 mt-1">
                          <Calendar className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Q1 2025</h3>
                          <p className="text-sm text-foreground/70">
                            Governance interface testing and community
                            onboarding
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-full bg-primary/10 mt-1">
                          <Lightbulb className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">End of Q1 2025</h3>
                          <p className="text-sm text-foreground/70">
                            Official DAO launch with full voting capabilities
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="md:w-1/3 flex items-center justify-center">
                    <div className="relative w-48 h-48">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Image
                          src="/ai-timeline.svg"
                          alt="DAO Timeline"
                          width={192}
                          height={192}
                          className="w-full h-full animate-pulse-slow"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </section>

          {/* DAO Overview */}
          <section className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <AnimatedElement animation="slideRight" delay={0.2}>
                <div>
                  <h2 className="text-2xl font-bold mb-4">
                    Governance Overview
                  </h2>
                  <p className="text-foreground/70 mb-6 text-sm">
                    The AgentMint DAO will enable token holders to participate
                    in platform governance through proposal creation, voting,
                    and implementation oversight.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-full bg-primary/10 mt-1">
                        <Vote className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Voting Power</h3>
                        <p className="text-sm text-foreground/70">
                          1 $MINT = 1 Vote, with quadratic voting for key
                          decisions
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-full bg-primary/10 mt-1">
                        <FileText className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Proposal Threshold</h3>
                        <p className="text-sm text-foreground/70">
                          100,000 $MINT tokens required to submit a proposal
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-full bg-primary/10 mt-1">
                        <Shield className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Execution Timelock</h3>
                        <p className="text-sm text-foreground/70">
                          48-hour delay between approval and implementation
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedElement>

              <AnimatedElement animation="scale" delay={0.3}>
                <div className="relative">
                  <div className="relative w-full h-48 md:h-64 glow">
                    <Image
                      src="/ai-governance.svg"
                      alt="DAO Governance"
                      fill
                      className="object-contain animate-float"
                    />
                  </div>
                </div>
              </AnimatedElement>
            </div>
          </section>

          {/* Governance Process */}
          <section className="mb-12">
            <ScrollReveal animation="fadeIn">
              <h2 className="text-2xl font-bold mb-6 text-center">
                Governance Process
              </h2>
            </ScrollReveal>

            <StaggerContainer
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
              delay={0.1}
            >
              <ScrollReveal animation="slideUp" delay={0.1}>
                <div className="feature-card p-5 relative">
                  <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                    1
                  </div>
                  <h3 className="text-lg font-semibold mb-2 mt-2">
                    Proposal Creation
                  </h3>
                  <p className="text-sm text-foreground/70">
                    Community members with sufficient tokens can submit
                    proposals for platform changes, feature additions, or
                    treasury allocations.
                  </p>
                  <div className="mt-4 flex justify-end">
                    <ArrowRight className="w-5 h-5 text-primary" />
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="slideUp" delay={0.2}>
                <div className="feature-card p-5 relative">
                  <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                    2
                  </div>
                  <h3 className="text-lg font-semibold mb-2 mt-2">
                    Community Voting
                  </h3>
                  <p className="text-sm text-foreground/70">
                    Token holders vote on active proposals during a 7-day voting
                    period, with votes weighted by token holdings.
                  </p>
                  <div className="mt-4 flex justify-end">
                    <ArrowRight className="w-5 h-5 text-primary" />
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="slideUp" delay={0.3}>
                <div className="feature-card p-5 relative">
                  <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                    3
                  </div>
                  <h3 className="text-lg font-semibold mb-2 mt-2">
                    Implementation
                  </h3>
                  <p className="text-sm text-foreground/70">
                    Approved proposals enter a 48-hour timelock before being
                    implemented by the protocol&#39;s smart contracts.
                  </p>
                  <div className="mt-4 flex justify-end">
                    <Lightbulb className="w-5 h-5 text-primary" />
                  </div>
                </div>
              </ScrollReveal>
            </StaggerContainer>
          </section>

          {/* Active Proposals */}
          <section className="mb-12">
            <ScrollReveal animation="fadeIn">
              <h2 className="text-2xl font-bold mb-6 text-center">
                Active Proposals
              </h2>

              <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
                <div className="md:w-1/3">
                  <div className="relative w-64 h-64">
                    <Image
                      src="/ai-proposal.svg"
                      alt="AI Proposal System"
                      width={256}
                      height={256}
                      className="w-full h-full"
                    />
                  </div>
                </div>

                <div className="md:w-2/3">
                  <p className="text-foreground/70 mb-6">
                    The following proposals showcase examples of the types of
                    decisions that will be voted on by the DAO. AI-assisted
                    proposal analysis will help token holders make informed
                    decisions.
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  Preview: Active Proposals
                </h2>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-secondary-foreground bg-secondary/10 px-3 py-1 rounded-full">
                    <Clock className="w-3 h-3 inline-block mr-1" />
                    Coming Q1 2025
                  </span>
                  <Button
                    variant="app"
                    className="rounded-full text-sm"
                    disabled
                  >
                    Submit Proposal
                  </Button>
                </div>
              </div>

              <div className="feature-card p-5 border-secondary/20 bg-secondary/5 mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <Construction className="w-5 h-5 text-secondary-foreground" />
                  <p className="text-sm font-medium text-secondary-foreground">
                    This is a preview of how proposals will work when the DAO
                    launches in Q1 2025. The data shown is simulated.
                  </p>
                </div>
              </div>

              <StaggerContainer className="space-y-4" delay={0.1}>
                {activeProposals.map((proposal, index) => (
                  <ScrollReveal
                    key={proposal.id}
                    animation="slideUp"
                    delay={index * 0.1}
                  >
                    <div className="feature-card p-5">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-medium text-foreground/60">
                              {proposal.id}
                            </span>
                            <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                              {proposal.daysLeft} days left
                            </span>
                          </div>
                          <h3 className="font-semibold">{proposal.title}</h3>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 items-center">
                          <div className="flex-1 min-w-[180px]">
                            <div className="flex justify-between text-xs mb-1">
                              <span>For: {proposal.votes.for}%</span>
                              <span>Against: {proposal.votes.against}%</span>
                            </div>
                            <div className="w-full h-2 bg-background/50 rounded-full overflow-hidden flex">
                              <div
                                className="h-full bg-primary"
                                style={{ width: `${proposal.votes.for}%` }}
                              ></div>
                              <div
                                className="h-full bg-destructive"
                                style={{ width: `${proposal.votes.against}%` }}
                              ></div>
                              <div
                                className="h-full bg-muted"
                                style={{ width: `${proposal.votes.abstain}%` }}
                              ></div>
                            </div>
                          </div>

                          <Button
                            variant="outline"
                            size="sm"
                            className="whitespace-nowrap"
                            disabled
                          >
                            Cast Vote
                          </Button>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </StaggerContainer>

              <AnimatedElement animation="fadeIn" delay={0.5}>
                <div className="mt-6 text-center">
                  <Button variant="outline" className="text-sm" disabled>
                    View All Proposals
                  </Button>
                </div>
              </AnimatedElement>
            </ScrollReveal>
          </section>

          {/* DAO Stats - Preview */}
          <ScrollReveal animation="fadeIn" delay={0.3}>
            <section>
              <div className="flex items-center justify-center gap-3 mb-6">
                <h2 className="text-2xl font-bold text-center">
                  Preview: DAO Statistics
                </h2>
                <span className="text-xs text-secondary-foreground bg-secondary/10 px-3 py-1 rounded-full">
                  <Clock className="w-3 h-3 inline-block mr-1" />
                  Coming Q1 2025
                </span>
              </div>

              <div className="feature-card p-5 border-secondary/20 bg-secondary/5 mb-6 text-center">
                <div className="flex items-center justify-center gap-3 mb-1">
                  <Construction className="w-5 h-5 text-secondary-foreground" />
                  <p className="text-sm font-medium text-secondary-foreground">
                    These statistics are simulated projections for the DAO
                    launch
                  </p>
                </div>
              </div>

              <StaggerContainer
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                delay={0.1}
              >
                <ScrollReveal animation="slideUp" delay={0.1}>
                  <div className="feature-card p-5 text-center">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div className="text-2xl font-bold mb-1">12,458</div>
                    <p className="text-sm text-foreground/70">Active Voters</p>
                  </div>
                </ScrollReveal>

                <ScrollReveal animation="slideUp" delay={0.2}>
                  <div className="feature-card p-5 text-center">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div className="text-2xl font-bold mb-1">87</div>
                    <p className="text-sm text-foreground/70">
                      Proposals Passed
                    </p>
                  </div>
                </ScrollReveal>

                <ScrollReveal animation="slideUp" delay={0.3}>
                  <div className="feature-card p-5 text-center">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-primary" />
                    </div>
                    <div className="text-2xl font-bold mb-1">64.3%</div>
                    <p className="text-sm text-foreground/70">
                      Avg. Participation
                    </p>
                  </div>
                </ScrollReveal>

                <ScrollReveal animation="slideUp" delay={0.4}>
                  <div className="feature-card p-5 text-center">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-primary" />
                    </div>
                    <div className="text-2xl font-bold mb-1">$8.2M</div>
                    <p className="text-sm text-foreground/70">Treasury Value</p>
                  </div>
                </ScrollReveal>
              </StaggerContainer>
            </section>
          </ScrollReveal>
        </main>
      </PageTransition>
    </div>
  );
}
