"use client";

import type { ReactNode } from "react";

/**
 * Continuous red glitch wrapper, CSS-only (no React state, no rAF / setInterval).
 * Two ghost layers run independent CSS keyframes (different periods + delays)
 * so the shimmer never repeats visibly. Auto-pauses via
 * animation-play-state on the parent when offscreen via :where(...) hooks.
 *
 * Reduced motion: ghost layers are hidden and only the static text renders.
 */
export function GlitchWord({
  children,
  intensity = 1,
}: {
  children: ReactNode;
  /** Multiplier for jitter amplitude (0.5 subtle, 1 normal, 2 heavy). */
  intensity?: number;
}) {
  return (
    <span
      className="glitch-word relative inline-block"
      style={
        {
          ["--glitch-intensity" as string]: String(intensity),
        } as React.CSSProperties
      }
    >
      <span
        aria-hidden="true"
        className="glitch-word-ghost glitch-word-ghost-a absolute inset-0"
        style={{ color: "var(--color-accent)", mixBlendMode: "screen" }}
      >
        {children}
      </span>
      <span
        aria-hidden="true"
        className="glitch-word-ghost glitch-word-ghost-b absolute inset-0"
        style={{ color: "#ff5560", mixBlendMode: "screen" }}
      >
        {children}
      </span>
      <span className="relative">{children}</span>
    </span>
  );
}
