"use client";

import { motion, useInView } from "framer-motion";
import { ReactNode, useRef } from "react";
import { useAnimationPreference } from "@/hooks/useAnimationPreference";

type AnimationType = "fadeIn" | "slideUp" | "slideRight" | "scale" | "bounce";

interface ScrollRevealProps {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
}

export const ScrollReveal = ({
  children,
  animation = "fadeIn",
  delay = 0,
  duration = 0.5,
  threshold = 0.1,
  className = "",
}: ScrollRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  const { animationsEnabled, reducedMotion, isMounted } =
    useAnimationPreference();

  // If not mounted yet or animations are disabled, render children directly
  if (!isMounted || !animationsEnabled) {
    return <div className={className}>{children}</div>;
  }

  // Adjust duration and delay based on reduced motion preference
  const adjustedDuration = reducedMotion ? Math.min(duration, 0.3) : duration;
  const adjustedDelay = reducedMotion ? Math.min(delay, 0.1) : delay;

  // Define standard variants
  const standardVariants = {
    fadeIn: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          duration: adjustedDuration,
          delay: adjustedDelay,
          ease: "easeOut",
        },
      },
    },
    slideUp: {
      hidden: { opacity: 0, y: 50 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: adjustedDuration,
          delay: adjustedDelay,
          ease: "easeOut",
        },
      },
    },
    slideRight: {
      hidden: { opacity: 0, x: -50 },
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          duration: adjustedDuration,
          delay: adjustedDelay,
          ease: "easeOut",
        },
      },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          duration: adjustedDuration,
          delay: adjustedDelay,
          ease: "easeOut",
        },
      },
    },
    bounce: {
      hidden: { opacity: 0, y: 50 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 15,
          delay: adjustedDelay,
        },
      },
    },
  };

  // Define reduced motion variants
  const reducedMotionVariants = {
    fadeIn: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          duration: adjustedDuration,
          delay: adjustedDelay,
          ease: "easeOut",
        },
      },
    },
    slideUp: {
      hidden: { opacity: 0, y: 10 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: adjustedDuration,
          delay: adjustedDelay,
          ease: "easeOut",
        },
      },
    },
    slideRight: {
      hidden: { opacity: 0, x: -10 },
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          duration: adjustedDuration,
          delay: adjustedDelay,
          ease: "easeOut",
        },
      },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.95 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          duration: adjustedDuration,
          delay: adjustedDelay,
          ease: "easeOut",
        },
      },
    },
    bounce: {
      hidden: { opacity: 0, y: 10 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: adjustedDuration,
          delay: adjustedDelay,
          ease: "easeOut",
        },
      },
    },
  };

  // Use the appropriate variants based on reduced motion preference
  const variants = reducedMotion ? reducedMotionVariants : standardVariants;

  return (
    <motion.div
      ref={ref}
      variants={variants[animation]}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
};
