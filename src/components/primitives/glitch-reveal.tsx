"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Cyberpunk red-glitch reveal. The card stays in place (no translation).
 * On entry it: rapidly jitters, throws a couple of red RGB-shift pulses,
 * a horizontal scanline tear sweeps top to bottom, then it crisp-resolves.
 * On exit (scroll up past the card OR scroll down past it) it plays the
 * same glitch in reverse so cards re-trigger every time the viewport
 * crosses them.
 *
 * Reduced motion: 300ms fade, no glitch.
 */
type Props = {
  children: ReactNode;
  /** Kept for back-compat with existing call sites; ignored visually now. */
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
        whileInView={{ opacity: 1, transition: { duration: 0.3, delay } }}
        viewport={{ once: false, amount }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  // Container variants, opacity + brief jitter on entry, also drives stepped
  // reveals of inner ghost layers.
  const wrapVariants: Variants = {
    hidden: { opacity: 0, x: 0, y: 0, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      x: [0, -3, 4, -2, 3, 0],
      y: [0, 2, -2, 1, 0, 0],
      transition: {
        duration: 0.55,
        delay,
        ease: [0.32, 0.72, 0, 1],
        x: { duration: 0.45, delay, times: [0, 0.15, 0.3, 0.5, 0.75, 1] },
        y: { duration: 0.45, delay, times: [0, 0.15, 0.3, 0.5, 0.75, 1] },
      },
    },
  };

  // Red RGB-shift ghost. Splits left then right then snaps to 0.
  const redVariants: Variants = {
    hidden: { x: -8, opacity: 0.85 },
    visible: {
      x: [-8, 6, -4, 2, 0],
      opacity: [0.9, 0.7, 0.5, 0.25, 0],
      transition: {
        duration: 0.55,
        delay,
        ease: "linear",
        times: [0, 0.25, 0.5, 0.75, 1],
      },
    },
  };

  // Hot red ghost (lighter shade, slightly different timing for chromatic depth).
  const hotVariants: Variants = {
    hidden: { x: 8, opacity: 0.7 },
    visible: {
      x: [8, -4, 3, -1, 0],
      opacity: [0.7, 0.5, 0.3, 0.15, 0],
      transition: {
        duration: 0.55,
        delay: delay + 0.04,
        ease: "linear",
        times: [0, 0.25, 0.5, 0.75, 1],
      },
    },
  };

  // Horizontal scanline tear, sweeps top to bottom briefly during entry.
  const scanVariants: Variants = {
    hidden: { y: "-12%", opacity: 0 },
    visible: {
      y: ["-12%", "112%"],
      opacity: [0, 1, 1, 0],
      transition: {
        duration: 0.42,
        delay: delay + 0.1,
        ease: "linear",
        times: [0, 0.2, 0.85, 1],
      },
    },
  };

  // Pixel-row noise band (cyberpunk static slice during the burst).
  const noiseVariants: Variants = {
    hidden: { opacity: 0, scaleY: 0.4 },
    visible: {
      opacity: [0, 0.85, 0, 0.6, 0],
      scaleY: [0.4, 1, 0.6, 1.1, 0.5],
      transition: {
        duration: 0.4,
        delay: delay + 0.05,
        ease: "linear",
        times: [0, 0.2, 0.45, 0.7, 1],
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      exit="hidden"
      viewport={{ once: false, amount }}
      variants={wrapVariants}
      className={`relative ${className ?? ""}`}
      style={{ willChange: "transform, opacity, filter" }}
    >
      {/* Red RGB-shift ghost layer */}
      <motion.span
        aria-hidden="true"
        variants={redVariants}
        className="pointer-events-none absolute inset-0"
        style={{
          boxShadow:
            "inset 0 0 0 1px color-mix(in oklab, var(--color-accent) 80%, transparent)",
          background:
            "linear-gradient(90deg, color-mix(in oklab, var(--color-accent) 22%, transparent), transparent 50%, color-mix(in oklab, var(--color-accent) 22%, transparent))",
          mixBlendMode: "screen",
          willChange: "transform, opacity",
        }}
      />
      {/* Hot red ghost (higher saturation, opposite-direction shift) */}
      <motion.span
        aria-hidden="true"
        variants={hotVariants}
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, transparent, color-mix(in oklab, #ff5560 32%, transparent) 50%, transparent)",
          mixBlendMode: "screen",
          willChange: "transform, opacity",
        }}
      />
      {/* Pixel-noise static band */}
      <motion.span
        aria-hidden="true"
        variants={noiseVariants}
        className="pointer-events-none absolute inset-x-0"
        style={{
          top: "30%",
          height: "32%",
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent 0 1px, color-mix(in oklab, var(--color-accent) 28%, transparent) 1px 2px)",
          mixBlendMode: "screen",
          transformOrigin: "center",
        }}
      />
      {/* Scanline tear */}
      <motion.span
        aria-hidden="true"
        variants={scanVariants}
        className="pointer-events-none absolute inset-x-0 z-[2] h-[2px]"
        style={{
          top: 0,
          background:
            "linear-gradient(90deg, transparent, color-mix(in oklab, var(--color-accent) 95%, transparent), transparent)",
          boxShadow:
            "0 0 16px color-mix(in oklab, var(--color-accent) 80%, transparent), 0 0 32px color-mix(in oklab, var(--color-accent) 50%, transparent)",
        }}
      />
      {children}
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
