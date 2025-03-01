'use client';

import Navbar from "@/components/Navbar";
import { PageTransition, AnimatedElement } from "@/components/motion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Save, RotateCcw } from "lucide-react";
import { useAnimationPreference } from "@/hooks/useAnimationPreference";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function SettingsPage() {
  const { preference, updatePreference } = useAnimationPreference();
  const [selectedPreference, setSelectedPreference] = useState<'full' | 'reduced' | 'off'>(preference);
  
  // Update local state when the context preference changes
  useEffect(() => {
    setSelectedPreference(preference);
  }, [preference]);
  
  const handleSave = () => {
    updatePreference(selectedPreference);
    toast.success('Settings saved', {
      description: 'Your animation preferences have been updated.'
    });
  };
  
  const handleReset = () => {
    setSelectedPreference('full');
    updatePreference('full');
    toast.success('Settings reset', {
      description: 'Animation preferences have been reset to default.'
    });
  };
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <PageTransition>
        <main className="pt-24 pb-16 px-4 sm:px-6 md:px-8 lg:px-12 max-w-[1400px] mx-auto">
          <AnimatedElement animation="fadeIn">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="gradient-text">Settings</span>
              </h1>
              <p className="text-foreground/70 max-w-2xl mx-auto">
                Customize your experience on TokenMuse
              </p>
            </div>
          </AnimatedElement>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <AnimatedElement animation="slideRight" delay={0.1}>
                <div className="sticky top-24">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Settings className="h-5 w-5" />
                        Settings Menu
                      </CardTitle>
                      <CardDescription>
                        Configure your preferences
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Button variant="ghost" className="w-full justify-start font-medium">
                          Animation Settings
                        </Button>
                        <Button variant="ghost" className="w-full justify-start text-muted-foreground" disabled>
                          Theme Settings
                        </Button>
                        <Button variant="ghost" className="w-full justify-start text-muted-foreground" disabled>
                          Notification Settings
                        </Button>
                        <Button variant="ghost" className="w-full justify-start text-muted-foreground" disabled>
                          Account Settings
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </AnimatedElement>
            </div>
            
            <div className="md:col-span-2">
              <AnimatedElement animation="slideLeft" delay={0.2}>
                <Card>
                  <CardHeader>
                    <CardTitle>Animation Settings</CardTitle>
                    <CardDescription>
                      Control how animations appear throughout the application
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup 
                      value={selectedPreference} 
                      onValueChange={(value) => setSelectedPreference(value as 'full' | 'reduced' | 'off')}
                      className="flex flex-col space-y-6"
                    >
                      <div className="flex items-start space-x-3 p-4 rounded-lg border border-border hover:bg-accent/5 transition-colors">
                        <RadioGroupItem value="full" id="full" className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor="full" className="text-base font-medium cursor-pointer">
                            Full Animations
                          </Label>
                          <p className="text-sm text-muted-foreground mt-1">
                            Enable all animations and transitions for the richest visual experience. Includes page transitions, 
                            scroll animations, and interactive elements.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3 p-4 rounded-lg border border-border hover:bg-accent/5 transition-colors">
                        <RadioGroupItem value="reduced" id="reduced" className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor="reduced" className="text-base font-medium cursor-pointer">
                            Reduced Animations
                          </Label>
                          <p className="text-sm text-muted-foreground mt-1">
                            Simplified animations with reduced motion for a more subtle experience. Maintains visual feedback 
                            while minimizing movement for better accessibility.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3 p-4 rounded-lg border border-border hover:bg-accent/5 transition-colors">
                        <RadioGroupItem value="off" id="off" className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor="off" className="text-base font-medium cursor-pointer">
                            No Animations
                          </Label>
                          <p className="text-sm text-muted-foreground mt-1">
                            Disable all animations and transitions for a static interface. Best for users who prefer 
                            no motion or those with motion sensitivity.
                          </p>
                        </div>
                      </div>
                    </RadioGroup>
                    
                    <div className="flex justify-end gap-4 mt-8">
                      <Button 
                        variant="outline" 
                        onClick={handleReset}
                        className="flex items-center gap-2"
                      >
                        <RotateCcw className="h-4 w-4" />
                        Reset to Default
                      </Button>
                      <Button 
                        onClick={handleSave}
                        className="flex items-center gap-2"
                      >
                        <Save className="h-4 w-4" />
                        Save Changes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedElement>
            </div>
          </div>
        </main>
      </PageTransition>
    </div>
  );
} 