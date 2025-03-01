import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { useAnimationPreference } from '@/hooks/useAnimationPreference';

interface PageTransitionProps {
  children: ReactNode;
}

export const PageTransition = ({ children }: PageTransitionProps) => {
  const { animationsEnabled, reducedMotion } = useAnimationPreference();

  // If animations are disabled, render children directly
  if (!animationsEnabled) {
    return <>{children}</>;
  }

  // Define transition settings based on reduced motion preference
  const transition = reducedMotion
    ? {
        type: 'tween',
        duration: 0.2,
      }
    : {
        type: 'spring',
        stiffness: 260,
        damping: 20,
        duration: 0.3,
      };

  return (
    <motion.div
      initial={{ opacity: 0, y: reducedMotion ? 10 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: reducedMotion ? 10 : 20 }}
      transition={transition}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}; 