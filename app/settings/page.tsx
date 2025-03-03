"use client";

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { PageTransition, AnimatedElement } from "@/components/motion";
import { useAnimationPreference } from "@/hooks/useAnimationPreference";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Settings, Sparkles, Zap, EyeOff } from "lucide-react";

export default function SettingsPage() {
  const { preference, setPreference } = useAnimationPreference();
  const [selectedPreference, setSelectedPreference] = useState<
    "full" | "reduced" | "off"
  >(preference);

  // Update local state when the global preference changes
  useEffect(() => {
    setSelectedPreference(preference);
  }, [preference]);

  const handleSave = () => {
    setPreference(selectedPreference);
    toast.success("Animation preferences saved!");
  };

  const handleReset = () => {
    setSelectedPreference("full");
    setPreference("full");
    toast.success("Animation preferences reset to default!");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <PageTransition>
        <main className="pt-24 pb-16 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
          <AnimatedElement animation="fadeIn" delay={0.1}>
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="gradient-text">Settings</span>
              </h1>
              <p className="text-foreground/70 max-w-2xl mx-auto">
                Customize your experience with AgentMint AI
              </p>
            </div>
          </AnimatedElement>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Settings Menu */}
            <AnimatedElement
              animation="slideRight"
              delay={0.2}
              className="md:col-span-1"
            >
              <div className="feature-card">
                <h2 className="text-xl font-semibold mb-4">Settings Menu</h2>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-2 rounded-md bg-primary/10 text-primary">
                    <Settings className="w-4 h-4" />
                    <span>Animation Settings</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-md hover:bg-card cursor-pointer">
                    <span>Account Settings</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-md hover:bg-card cursor-pointer">
                    <span>Wallet Settings</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-md hover:bg-card cursor-pointer">
                    <span>Notification Settings</span>
                  </div>
                </div>
              </div>
            </AnimatedElement>

            {/* Animation Settings */}
            <AnimatedElement
              animation="fadeIn"
              delay={0.3}
              className="md:col-span-3"
            >
              <div className="feature-card">
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <h2 className="text-2xl font-semibold">Animation Settings</h2>
                </div>

                <p className="text-foreground/70 mb-6">
                  Customize how animations appear throughout the application.
                  Choose the option that best suits your preferences and
                  accessibility needs.
                </p>

                <div className="space-y-6 mb-8">
                  {/* Full Animations */}
                  <div
                    className={`p-4 rounded-lg border-2 cursor-pointer ${
                      selectedPreference === "full"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => setSelectedPreference("full")}
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-full bg-primary/10 mt-1">
                        <Sparkles className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Full Animations</h3>
                        <p className="text-sm text-foreground/70">
                          Enable all animations with full motion effects. Best
                          for standard viewing experience.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Reduced Animations */}
                  <div
                    className={`p-4 rounded-lg border-2 cursor-pointer ${
                      selectedPreference === "reduced"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => setSelectedPreference("reduced")}
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-full bg-primary/10 mt-1">
                        <Zap className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">
                          Reduced Animations
                        </h3>
                        <p className="text-sm text-foreground/70">
                          Simplified animations with less motion. Better for
                          those who prefer subtle effects.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* No Animations */}
                  <div
                    className={`p-4 rounded-lg border-2 cursor-pointer ${
                      selectedPreference === "off"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => setSelectedPreference("off")}
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-full bg-primary/10 mt-1">
                        <EyeOff className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">No Animations</h3>
                        <p className="text-sm text-foreground/70">
                          Disable all animations. Best for accessibility or
                          performance concerns.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={handleReset}>
                    Reset to Default
                  </Button>
                  <Button variant="app" onClick={handleSave}>
                    Save Changes
                  </Button>
                </div>
              </div>
            </AnimatedElement>
          </div>
        </main>
      </PageTransition>
    </div>
  );
}
