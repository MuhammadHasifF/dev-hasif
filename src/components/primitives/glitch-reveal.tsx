"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Cyber red glitch-in. Card slot is BLANK by default. On viewport entry:
 *   1) Pure red static placeholder appears where the card will be (~120ms)
 *   2) Card materializes via stepped opacity + horizontal slice glitches
 *      with a red scanline tear sweeping through it
 *   3) Resolves to clean state
 * On exit: same sequence in reverse — card glitches back to red static,
 * then to nothing. Re-triggers on every viewport crossing.
 *
 * Reduced motion: 250ms fade, no glitch.
 */
type Props = {
  children: ReactNode;
  /** Kept for back-compat; no longer affects animation. */
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
        whileInView={{ opacity: 1, transition: { duration: 0.25, delay } }}
        viewport={{ once: false, amount }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  // Wrapper handles the structural reveal. Stepped easing on opacity gives
  // the digital "phasing in" feel, not a smooth fade.
  const wrapVariants: Variants = {
    hidden: {
      opacity: 0,
      filter: "blur(8px) saturate(2)",
      x: 0,
      y: 0,
    },
    visible: {
      // 5-step opacity staircase, mid-step jitter creates the glitchy phase-in
      opacity: [0, 0, 0.3, 0.15, 0.85, 1],
      filter: [
        "blur(8px) saturate(2)",
        "blur(8px) saturate(2)",
        "blur(2px) saturate(1.6)",
        "blur(4px) saturate(1.8)",
        "blur(0.8px) saturate(1.2)",
        "blur(0px) saturate(1)",
      ],
      x: [0, -3, 4, -2, 1, 0],
      y: [0, 1, -2, 1, 0, 0],
      transition: {
        duration: 0.62,
        delay,
        ease: "linear",
        times: [0, 0.18, 0.36, 0.55, 0.78, 1],
      },
    },
  };

  // Red static "placeholder" panel that's visible BEFORE the card phases in
  // and during the early steps. Scanline noise + red glow.
  const noiseVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: [0.95, 1, 0.85, 0.4, 0],
      transition: {
        duration: 0.42,
        delay,
        ease: "linear",
        times: [0, 0.25, 0.5, 0.8, 1],
      },
    },
  };

  // Red horizontal slice tearing through during the materialize step.
  const sliceVariants: Variants = {
    hidden: { y: "-12%", opacity: 0 },
    visible: {
      y: ["-12%", "30%", "65%", "112%"],
      opacity: [0, 1, 1, 0],
      transition: {
        duration: 0.45,
        delay: delay + 0.1,
        ease: "linear",
        times: [0, 0.25, 0.7, 1],
      },
    },
  };

  // Red RGB-shift ghost — fully red, no cyan
  const ghostVariants: Variants = {
    hidden: { x: -8, opacity: 0.85 },
    visible: {
      x: [-8, 6, -4, 2, 0],
      opacity: [0.85, 0.6, 0.4, 0.18, 0],
      transition: {
        duration: 0.5,
        delay,
        ease: "linear",
        times: [0, 0.25, 0.5, 0.75, 1],
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
      {/* Red static placeholder (visible before + during the phase-in,
          gone before the card resolves). */}
      <motion.span
        aria-hidden="true"
        variants={noiseVariants}
        className="pointer-events-none absolute inset-0 z-[3]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent 0 1px, color-mix(in oklab, var(--color-accent) 60%, transparent) 1px 2px), repeating-linear-gradient(to right, transparent 0 3px, color-mix(in oklab, var(--color-accent) 22%, transparent) 3px 4px)",
          backgroundColor: "color-mix(in oklab, var(--color-accent) 18%, #0a0306)",
          boxShadow:
            "inset 0 0 0 1px color-mix(in oklab, var(--color-accent) 80%, transparent), 0 0 24px color-mix(in oklab, var(--color-accent) 50%, transparent)",
          mixBlendMode: "normal",
          willChange: "opacity",
        }}
      />
      {/* Red horizontal slice tear */}
      <motion.span
        aria-hidden="true"
        variants={sliceVariants}
        className="pointer-events-none absolute inset-x-0 z-[4] h-[3px]"
        style={{
          top: 0,
          background:
            "linear-gradient(90deg, transparent, #ff5560 30%, #ffd6c2 50%, #ff5560 70%, transparent)",
          boxShadow:
            "0 0 16px var(--color-accent), 0 0 32px color-mix(in oklab, var(--color-accent) 60%, transparent)",
        }}
      />
      {/* Red RGB-shift ghost */}
      <motion.span
        aria-hidden="true"
        variants={ghostVariants}
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          background:
            "linear-gradient(90deg, color-mix(in oklab, var(--color-accent) 18%, transparent), transparent 50%, color-mix(in oklab, var(--color-accent) 18%, transparent))",
          mixBlendMode: "screen",
          willChange: "transform, opacity",
        }}
      />
      {/* Card content phasing in via the wrapVariants step opacity */}
      <motion.div
        variants={wrapVariants}
        className="relative z-[1]"
        style={{ willChange: "transform, opacity, filter" }}
      >
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
      initial="hidden"
      whileInView="visible"
      exit="hidden"
      viewport={{ once: false, amount: 0.4 }}
      className={`relative ${className ?? ""}`}
    >
      <motion.span
        aria-hidden="true"
        variants={{
          hidden: { x: -10, opacity: 0.85 },
          visible: {
            x: [-10, 6, -3, 0],
            opacity: [0.85, 0.5, 0.2, 0],
            transition: { duration: 0.5, ease: "linear", times: [0, 0.35, 0.7, 1] },
          },
        }}
        className="pointer-events-none absolute inset-0"
        style={{ color: "var(--color-accent)", mixBlendMode: "screen" }}
      >
        {children}
      </motion.span>
      <motion.span
        variants={{
          hidden: { opacity: 0, filter: "blur(4px)" },
          visible: {
            opacity: 1,
            filter: "blur(0px)",
            transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1] },
          },
        }}
        className="relative block"
      >
        {children}
      </motion.span>
    </motion.div>
  );
}
