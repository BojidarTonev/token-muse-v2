"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type AnimationPreference = "full" | "reduced" | "off";

interface AnimationContextType {
  animationsEnabled: boolean;
  reducedMotion: boolean;
  preference: AnimationPreference;
  setPreference: (preference: AnimationPreference) => void;
  isMounted: boolean;
}

const AnimationContext = createContext<AnimationContextType | undefined>(
  undefined
);

export function AnimationProvider({ children }: { children: ReactNode }) {
  const [preference, setPreference] = useState<AnimationPreference>("full");
  const [systemReducedMotion, setSystemReducedMotion] =
    useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // Set mounted state on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Check for system preference on mount
  useEffect(() => {
    // Only run on client-side
    if (!isMounted) return;

    // Get saved preference from localStorage
    const savedPreference = localStorage.getItem(
      "animationPreference"
    ) as AnimationPreference | null;
    if (savedPreference) {
      setPreference(savedPreference);
    }

    // Check for system preference for reduced motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setSystemReducedMotion(mediaQuery.matches);

    // Update if system preference changes
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [isMounted]);

  // Save preference to localStorage when it changes
  useEffect(() => {
    if (!isMounted) return;
    localStorage.setItem("animationPreference", preference);
  }, [preference, isMounted]);

  // Determine if animations should be enabled based on preference
  // Disable animations on server or during initial client render
  const animationsEnabled = isMounted && preference !== "off";

  // Determine if reduced motion should be used
  // Use reduced motion if preference is 'reduced' or if system preference is set and preference is 'full'
  const reducedMotion =
    preference === "reduced" || (systemReducedMotion && preference === "full");

  return (
    <AnimationContext.Provider
      value={{
        animationsEnabled,
        reducedMotion,
        preference,
        setPreference,
        isMounted,
      }}
    >
      {children}
    </AnimationContext.Provider>
  );
}

export function useAnimationPreference() {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error(
      "useAnimationPreference must be used within an AnimationProvider"
    );
  }
  return context;
}
