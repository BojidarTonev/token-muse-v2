'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

type AnimationPreference = 'full' | 'reduced' | 'off';

interface AnimationContextType {
  preference: AnimationPreference;
  setPreference: (pref: AnimationPreference) => void;
  isEnabled: boolean;
  isReduced: boolean;
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export function AnimationProvider({ children }: { children: ReactNode }) {
  // Default to full animations, but respect user's system preferences
  const [preference, setPreference] = useState<AnimationPreference>('full');
  
  useEffect(() => {
    // Check for saved preference in localStorage
    const savedPreference = localStorage.getItem('animation-preference') as AnimationPreference | null;
    
    if (savedPreference) {
      setPreference(savedPreference);
    } else if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // If no saved preference but user has reduced motion preference
      setPreference('reduced');
    }
  }, []);
  
  const updatePreference = (pref: AnimationPreference) => {
    setPreference(pref);
    localStorage.setItem('animation-preference', pref);
  };
  
  const value = {
    preference,
    setPreference: updatePreference,
    isEnabled: preference !== 'off',
    isReduced: preference === 'reduced'
  };
  
  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
}

export function useAnimationPreference() {
  const context = useContext(AnimationContext);
  
  if (context === undefined) {
    throw new Error('useAnimationPreference must be used within an AnimationProvider');
  }
  
  return context;
} 