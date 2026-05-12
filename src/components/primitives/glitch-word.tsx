"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * Continuous cyberpunk red-glitch wrapper around a single word or short
 * phrase. Same chromatic-aberration shimmer as the hero MUHAMMAD/DEV
 * HASIF title, but lighter and inline so it can sit inside paragraphs +
 * headlines without disrupting layout. Pauses when the document is
 * hidden so it doesn't burn CPU in background tabs.
 *
 * Reduced motion: renders the word statically with no animation.
 */
export function GlitchWord({
  children,
  intensity = 1,
}: {
  children: ReactNode;
  /** Multiplier for jitter amplitude (0.5 = subtle, 1 = normal, 2 = heavy). */
  intensity?: number;
}) {
  const [tick, setTick] = useState(0);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reduce) return;
    let cancelled = false;
    let timeout: ReturnType<typeof setTimeout>;
    let visible = !document.hidden;
    const onVisibility = () => {
      visible = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibility);
    const step = () => {
      if (cancelled) return;
      if (!visible) {
        timeout = setTimeout(step, 600);
        return;
      }
      setTick((t) => t + 1);
      timeout = setTimeout(step, 90 + Math.random() * 220);
    };
    step();
    return () => {
      cancelled = true;
      clearTimeout(timeout);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduce]);

  if (reduce) {
    return <span className="relative inline-block">{children}</span>;
  }

  // Pseudo-random offset per tick, scaled by intensity.
  const seed = tick * 0.6180339887;
  const r = (n: number) => ((Math.sin(seed * (n + 1)) + 1) * 0.5);
  const dxR = (r(1) - 0.5) * 8 * intensity;
  const dxC = (r(2) - 0.5) * 8 * intensity;
  const dy = (r(3) - 0.5) * 2 * intensity;
  const sliceY = 18 + r(4) * 60;
  const sliceH = 8 + r(5) * 18;
  const showSlice = r(6) > 0.55;

  const clip = showSlice
    ? `polygon(0% 0%, 100% 0%, 100% ${sliceY}%, ${30 + r(7) * 40}% ${sliceY}%, ${30 + r(8) * 40}% ${Math.min(100, sliceY + sliceH)}%, 100% ${Math.min(100, sliceY + sliceH)}%, 100% 100%, 0% 100%)`
    : undefined;

  return (
    <span className="relative inline-block" style={{ willChange: "transform" }}>
      {/* Red ghost layer */}
      <span
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          color: "var(--color-accent)",
          mixBlendMode: "screen",
          transform: `translate3d(${dxR}px, ${dy}px, 0)`,
          opacity: 0.85,
          textShadow: "0 0 14px color-mix(in oklab, var(--color-accent) 70%, transparent)",
          clipPath: clip,
          pointerEvents: "none",
        }}
      >
        {children}
      </span>
      {/* Hot red secondary */}
      <span
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          color: "#ff5560",
          mixBlendMode: "screen",
          transform: `translate3d(${dxC}px, ${-dy}px, 0)`,
          opacity: 0.55,
          clipPath: clip,
          pointerEvents: "none",
        }}
      >
        {children}
      </span>
      <span className="relative">{children}</span>
    </span>
  );
}
