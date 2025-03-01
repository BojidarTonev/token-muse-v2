'use client';

import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';
import { useAnimationPreference } from '@/hooks/useAnimationPreference';

interface AnimatedElementProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale' | 'none';
}

const animations: Record<string, Variants> = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  slideUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  },
  slideLeft: {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 }
  },
  slideRight: {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 }
  },
  scale: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 }
  },
  none: {
    hidden: {},
    visible: {}
  }
};

// Reduced motion variants
const reducedAnimations: Record<string, Variants> = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  slideUp: {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  },
  slideLeft: {
    hidden: { opacity: 0, x: 10 },
    visible: { opacity: 1, x: 0 }
  },
  slideRight: {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  },
  scale: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 }
  },
  none: {
    hidden: {},
    visible: {}
  }
};

export default function AnimatedElement({
  children,
  delay = 0,
  duration = 0.5,
  className = '',
  animation = 'fadeIn'
}: AnimatedElementProps) {
  const { isEnabled, isReduced } = useAnimationPreference();
  
  // If animations are disabled, just render children
  if (!isEnabled) {
    return <div className={className}>{children}</div>;
  }
  
  // Use appropriate animation variants based on preference
  const variants = isReduced ? reducedAnimations[animation] : animations[animation];
  
  // Adjust duration for reduced motion
  const adjustedDuration = isReduced ? Math.min(duration, 0.3) : duration;
  
  // Adjust delay for reduced motion
  const adjustedDelay = isReduced ? Math.min(delay, 0.1) : delay;
  
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{
        duration: adjustedDuration,
        delay: adjustedDelay,
        ease: [0.25, 0.1, 0.25, 1.0] // Custom easing curve
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
} 