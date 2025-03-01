'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { useAnimationPreference } from '@/hooks/useAnimationPreference';

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  delayFactor?: number;
  staggerChildren?: number;
}

export default function StaggerContainer({
  children,
  className = '',
  delayFactor = 0,
  staggerChildren = 0.1
}: StaggerContainerProps) {
  const { isEnabled, isReduced } = useAnimationPreference();
  
  // If animations are disabled, just render children
  if (!isEnabled) {
    return <div className={className}>{children}</div>;
  }
  
  // Adjust stagger timing for reduced motion
  const adjustedStaggerChildren = isReduced ? Math.min(staggerChildren, 0.05) : staggerChildren;
  const adjustedDelayFactor = isReduced ? Math.min(delayFactor, 0.1) : delayFactor;
  
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            delayChildren: adjustedDelayFactor,
            staggerChildren: adjustedStaggerChildren
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
} 