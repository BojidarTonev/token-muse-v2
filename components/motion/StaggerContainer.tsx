'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { useAnimationPreference } from '@/hooks/useAnimationPreference';

interface StaggerContainerProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export const StaggerContainer = ({ 
  children, 
  delay = 0.1, 
  className = '' 
}: StaggerContainerProps) => {
  const { animationsEnabled, reducedMotion } = useAnimationPreference();

  // If animations are disabled, render children directly
  if (!animationsEnabled) {
    return <div className={className}>{children}</div>;
  }

  // Adjust delay based on reduced motion preference
  const staggerDelay = reducedMotion ? Math.min(delay, 0.05) : delay;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: reducedMotion ? 0.05 : 0.1,
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className={className}
    >
      {children}
    </motion.div>
  );
}; 