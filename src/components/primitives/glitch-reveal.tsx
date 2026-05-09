"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Side = "left" | "right";

/**
 * Glitch slide-in wrapper. Card content slides from the given side with a
 * chromatic-aberration glitch + brief scanline tear, then crisp resolves.
 * Re-triggers on every viewport entry/exit (scrolls down AND up).
 *
 * Reduced motion: simple 300ms fade, no slide, no glitch.
 */
export function GlitchReveal({
  children,
  side,
  delay = 0,
  className,
  amount = 0.3,
}: {
  children: ReactNode;
  side: Side;
  delay?: number;
  className?: string;
  amount?: number;
}) {
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

  const dir = side === "left" ? -1 : 1;
  const variants: Variants = {
    hidden: {
      opacity: 0,
      x: dir * 56,
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        delay,
        ease: [0.32, 0.72, 0, 1],
      },
    },
  };

  // Chromatic aberration shadow that decays from ±8px to 0.
  const chromaVariants: Variants = {
    hidden: {
      boxShadow:
        `${dir * 8}px 0 0 rgba(255, 30, 60, 0.55), ${-dir * 8}px 0 0 rgba(0, 229, 255, 0.45)`,
    },
    visible: {
      boxShadow: "0 0 0 rgba(255,30,60,0), 0 0 0 rgba(0,229,255,0)",
      transition: { duration: 0.55, delay, ease: [0.32, 0.72, 0, 1] },
    },
  };

  // Scanline tear sweeping top → bottom briefly during entry.
  const scanVariants: Variants = {
    hidden: { y: "-10%", opacity: 0 },
    visible: {
      y: ["-10%", "110%"],
      opacity: [0, 1, 0],
      transition: { duration: 0.5, delay: delay + 0.15, ease: "linear" },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      exit="hidden"
      viewport={{ once: false, amount }}
      variants={variants}
      className={`relative ${className ?? ""}`}
      style={{ willChange: "transform, opacity, filter" }}
    >
      {/* Chromatic aberration shadow */}
      <motion.span
        aria-hidden="true"
        variants={chromaVariants}
        className="pointer-events-none absolute inset-0 -z-[1] rounded-[inherit]"
      />
      {/* Scanline tear */}
      <motion.span
        aria-hidden="true"
        variants={scanVariants}
        className="pointer-events-none absolute inset-x-0 z-[2] h-[2px]"
        style={{
          top: 0,
          background:
            "linear-gradient(90deg, transparent, color-mix(in oklab, var(--color-accent) 90%, transparent), transparent)",
          boxShadow: "0 0 14px color-mix(in oklab, var(--color-accent) 70%, transparent)",
        }}
      />
      {children}
    </motion.div>
  );
}

/**
 * Glitch reveal for a section title (or any single text element).
 * Renders three offset copies (red/cyan ghosts + main) that converge on entry,
 * splits apart on exit, replays each time the title re-enters the viewport.
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
      {/* Red ghost */}
      <motion.span
        aria-hidden="true"
        variants={{
          hidden: { x: -10, opacity: 0.85 },
          visible: { x: 0, opacity: 0, transition: { duration: 0.55, ease: [0.32, 0.72, 0, 1] } },
        }}
        className="pointer-events-none absolute inset-0"
        style={{
          color: "var(--color-accent)",
          mixBlendMode: "screen",
          willChange: "transform, opacity",
        }}
      >
        {children}
      </motion.span>
      {/* Cyan ghost */}
      <motion.span
        aria-hidden="true"
        variants={{
          hidden: { x: 10, opacity: 0.7 },
          visible: { x: 0, opacity: 0, transition: { duration: 0.55, ease: [0.32, 0.72, 0, 1] } },
        }}
        className="pointer-events-none absolute inset-0"
        style={{
          color: "#00e5ff",
          mixBlendMode: "screen",
          willChange: "transform, opacity",
        }}
      >
        {children}
      </motion.span>
      {/* Main */}
      <motion.span
        variants={{
          hidden: { opacity: 0, filter: "blur(4px)" },
          visible: { opacity: 1, filter: "blur(0px)", transition: { duration: 0.55, ease: [0.32, 0.72, 0, 1] } },
        }}
        className="relative block"
      >
        {children}
      </motion.span>
    </motion.div>
  );
}
