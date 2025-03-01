'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { useAnimationPreference } from '@/hooks/useAnimationPreference';

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const { isEnabled, isReduced } = useAnimationPreference();
  
  // If animations are disabled, just render children
  if (!isEnabled) {
    return <div className="w-full">{children}</div>;
  }
  
  // Use reduced animations if preferred
  const transitionSettings = isReduced 
    ? {
        type: 'tween',
        duration: 0.2,
      }
    : {
        type: 'spring',
        stiffness: 100,
        damping: 20,
        duration: 0.3,
      };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: isReduced ? 10 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: isReduced ? 10 : 20 }}
      transition={transitionSettings}
      className="w-full"
    >
      {children}
    </motion.div>
  );
} 