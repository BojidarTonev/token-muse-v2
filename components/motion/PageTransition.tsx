"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useId } from "react";
import { useAnimationPreference } from "@/hooks/useAnimationPreference";

interface PageTransitionProps {
  children: ReactNode;
}

export const PageTransition = ({ children }: PageTransitionProps) => {
  const { animationsEnabled, reducedMotion, isMounted } =
    useAnimationPreference();
  // Generate a stable ID for the key
  const contentId = useId();

  // If not mounted yet or animations are disabled, render children directly
  if (!isMounted || !animationsEnabled) {
    return <>{children}</>;
  }

  // Define transition settings based on reduced motion preference
  const transition = reducedMotion
    ? {
        type: "tween",
        duration: 0.2,
      }
    : {
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 0.3,
      };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={contentId}
        initial={{ opacity: 0, y: reducedMotion ? 10 : 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: reducedMotion ? 10 : 20 }}
        transition={transition}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
