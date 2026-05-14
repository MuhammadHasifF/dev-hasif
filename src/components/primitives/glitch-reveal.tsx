"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Lightweight glitch-reveal for project cards / list items. Card starts
 * invisible, glitches in via a single stepped-opacity layer with a brief
 * scanline tear, then resolves. Reverses on exit (re-triggers each
 * viewport crossing). Two motion layers max per card, so the all-projects
 * grid stays cheap.
 *
 * Reduced motion: simple 220ms fade.
 */
type Props = {
  children: ReactNode;
  /** Kept for back-compat. */
  side?: "left" | "right";
  delay?: number;
  className?: string;
  amount?: number;
};

export function GlitchReveal({ children, delay = 0, className, amount = 0.3 }: Props) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { duration: 0.22, delay } }}
        viewport={{ once: false, amount }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  const wrapVariants: Variants = {
    hidden: { opacity: 0, filter: "blur(6px)" },
    visible: {
      opacity: [0, 0.2, 0.1, 0.8, 1],
      filter: ["blur(6px)", "blur(3px)", "blur(4px)", "blur(1px)", "blur(0px)"],
      transition: {
        duration: 0.5,
        delay,
        ease: "linear",
        times: [0, 0.25, 0.45, 0.75, 1],
      },
    },
  };

  const sliceVariants: Variants = {
    hidden: { y: "-12%", opacity: 0 },
    visible: {
      y: ["-12%", "112%"],
      opacity: [0, 1, 0],
      transition: {
        duration: 0.36,
        delay: delay + 0.06,
        ease: "linear",
        times: [0, 0.55, 1],
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      exit="hidden"
      viewport={{ once: false, amount }}
      className={`relative ${className ?? ""}`}
    >
      <motion.span
        aria-hidden="true"
        variants={sliceVariants}
        className="pointer-events-none absolute inset-x-0 z-[2] h-[2px]"
        style={{
          top: 0,
          background:
            "linear-gradient(90deg, transparent, color-mix(in oklab, var(--color-accent) 95%, transparent), transparent)",
          boxShadow:
            "0 0 14px color-mix(in oklab, var(--color-accent) 70%, transparent)",
          willChange: "transform, opacity",
        }}
      />
      <motion.div variants={wrapVariants} className="relative z-[1]" style={{ willChange: "opacity, filter" }}>
        {children}
      </motion.div>
    </motion.div>
  );
}

/**
 * Single-element red-glitch title. Re-triggers on every viewport crossing.
 */
export function GlitchTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { duration: 0.3 } }}
        viewport={{ once: false, amount: 0.4 }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(4px)" }}
      whileInView={{
        opacity: 1,
        filter: "blur(0px)",
        transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1] },
      }}
      exit={{ opacity: 0, filter: "blur(4px)" }}
      viewport={{ once: false, amount: 0.4 }}
      className={`relative ${className ?? ""}`}
    >
      {children}
    </motion.div>
  );
}
