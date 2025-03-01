'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Settings } from 'lucide-react';
import { useAnimationPreference } from '@/hooks/useAnimationPreference';

export default function AnimationSettings() {
  const { preference, updatePreference } = useAnimationPreference();
  const [open, setOpen] = useState(false);

  const handlePreferenceChange = (value: 'full' | 'reduced' | 'off') => {
    updatePreference(value);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="fixed bottom-4 right-4 z-50 bg-background/80 backdrop-blur-sm border border-border hover:bg-accent"
          aria-label="Animation Settings"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Animation Settings</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <RadioGroup 
            defaultValue={preference} 
            onValueChange={(value) => handlePreferenceChange(value as 'full' | 'reduced' | 'off')}
            className="flex flex-col space-y-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="full" id="full" />
              <Label htmlFor="full" className="cursor-pointer">
                <div className="font-medium">Full Animations</div>
                <p className="text-sm text-muted-foreground">
                  Enable all animations and transitions
                </p>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="reduced" id="reduced" />
              <Label htmlFor="reduced" className="cursor-pointer">
                <div className="font-medium">Reduced Animations</div>
                <p className="text-sm text-muted-foreground">
                  Simplified animations with reduced motion
                </p>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="off" id="off" />
              <Label htmlFor="off" className="cursor-pointer">
                <div className="font-medium">No Animations</div>
                <p className="text-sm text-muted-foreground">
                  Disable all animations and transitions
                </p>
              </Label>
            </div>
          </RadioGroup>
        </div>
      </DialogContent>
    </Dialog>
  );
} 