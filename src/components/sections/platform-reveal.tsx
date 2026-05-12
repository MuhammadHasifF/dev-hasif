"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Wrap a platform banner so it tilts in from a slight 3D angle on viewport
 * entry, re-triggering on exit/re-entry. Staggered per index.
 */
export function PlatformReveal({
  children,
  index,
}: {
  children: ReactNode;
  index: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { duration: 0.35 } }}
        viewport={{ once: false, amount: 0.3 }}
      >
        {children}
      </motion.div>
    );
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, rotateX: -18, scale: 0.94 }}
      whileInView={{
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
        transition: {
          duration: 0.7,
          delay: index * 0.1,
          ease: [0.32, 0.72, 0, 1],
        },
      }}
      exit={{ opacity: 0, y: 18, rotateX: -10, scale: 0.96 }}
      viewport={{ once: false, amount: 0.3 }}
      style={{ transformPerspective: 900 }}
    >
      {children}
    </motion.div>
  );
}
