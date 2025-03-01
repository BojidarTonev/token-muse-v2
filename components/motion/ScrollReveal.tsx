'use client';

import { motion, useInView } from 'framer-motion';
import { ReactNode, useRef } from 'react';
import { useAnimationPreference } from '@/hooks/useAnimationPreference';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  animation?: 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale' | 'none';
  distance?: number;
  duration?: number;
  once?: boolean;
  threshold?: number;
}

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  animation = 'fadeIn',
  distance = 50,
  duration = 0.5,
  once = true,
  threshold = 0.1
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });
  const { isEnabled, isReduced } = useAnimationPreference();
  
  // If animations are disabled, just render children
  if (!isEnabled) {
    return <div className={className}>{children}</div>;
  }
  
  // Adjust animation parameters for reduced motion
  const adjustedDistance = isReduced ? Math.min(distance, 10) : distance;
  const adjustedDuration = isReduced ? Math.min(duration, 0.3) : duration;
  const adjustedDelay = isReduced ? Math.min(delay, 0.1) : delay;
  
  // For reduced motion, use 'fadeIn' animation if not 'none'
  const effectiveAnimation = isReduced && animation !== 'none' ? 'fadeIn' : animation;
  
  // Define initial position based on animation type
  let initialX = 0;
  let initialY = 0;
  let initialScale = 1;
  let initialOpacity = 0;
  
  switch (effectiveAnimation) {
    case 'slideUp':
      initialY = adjustedDistance;
      break;
    case 'slideDown':
      initialY = -adjustedDistance;
      break;
    case 'slideLeft':
      initialX = adjustedDistance;
      break;
    case 'slideRight':
      initialX = -adjustedDistance;
      break;
    case 'scale':
      initialScale = 0.9;
      break;
    case 'none':
      initialOpacity = 1; // No fade effect for 'none'
      break;
    // fadeIn is the default case with just opacity change
  }
  
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: initialOpacity, x: initialX, y: initialY, scale: initialScale }}
      animate={
        isInView
          ? { opacity: 1, x: 0, y: 0, scale: 1 }
          : { opacity: initialOpacity, x: initialX, y: initialY, scale: initialScale }
      }
      transition={{
        duration: adjustedDuration,
        delay: adjustedDelay,
        ease: 'easeOut'
      }}
    >
      {children}
    </motion.div>
  );
} 