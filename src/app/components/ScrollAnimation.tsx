"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollAnimationProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}

export default function ScrollAnimation({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: ScrollAnimationProps) {
  const directionVariants = {
    up: { y: 60, opacity: 0 },
    down: { y: -60, opacity: 0 },
    left: { x: 60, opacity: 0 },
    right: { x: -60, opacity: 0 },
  };

  return (
    <motion.div
      initial={directionVariants[direction]}
      whileInView={{ y: 0, x: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.21, 1.11, 0.81, 0.99],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}


