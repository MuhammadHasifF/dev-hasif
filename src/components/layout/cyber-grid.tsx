"use client";

/**
 * CYBER-GRID — global ambient backdrop, CSS-only.
 *
 *  - drifting dotted grid (background-position keyframes, GPU-cheap)
 *  - one rotating conic gradient (60–80s, transform on a single element)
 *  - thin scan beam descending the viewport every 8s
 *  - faint scanlines + vignette
 *  - cursor-follow spotlight using a CSS variable updated on mousemove
 *    (hover-capable devices only; reduced-motion respected)
 *
 * No requestAnimationFrame loops. No canvas. No WebGL.
 */
import { useEffect, useRef } from "react";

export function CyberGrid() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const hover = window.matchMedia("(hover: hover)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!hover || reduce) return;

    let pending = false;
    let mx = 0;
    let my = 0;
    const apply = () => {
      pending = false;
      el.style.setProperty("--mx", `${mx}px`);
      el.style.setProperty("--my", `${my}px`);
    };
    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (pending) return;
      pending = true;
      requestAnimationFrame(apply);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-20 overflow-hidden"
      style={
        {
          backgroundColor: "var(--color-bg-0)",
          ["--mx" as string]: "50vw",
          ["--my" as string]: "50vh",
        } as React.CSSProperties
      }
    >
      {/* Drifting grid — 64×64 cells, slow translate via background-position keyframes */}
      <div
        className="absolute inset-0 bg-cyber-grid opacity-[0.55] motion-reduce:opacity-30"
        style={{ animation: "var(--animate-grid-drift)" }}
      />
      {/* Rotating conic glow — single transform, GPU-composited */}
      <div
        className="absolute left-1/2 top-1/2 h-[160vmax] w-[160vmax] -translate-x-1/2 -translate-y-1/2 opacity-[0.35] motion-reduce:opacity-15 will-change-transform"
        style={{
          background:
            "conic-gradient(from 0deg at 50% 50%, transparent 0deg, color-mix(in oklab, var(--color-accent) 24%, transparent) 60deg, transparent 120deg, color-mix(in oklab, var(--color-accent-3) 14%, transparent) 220deg, transparent 280deg, color-mix(in oklab, var(--color-accent) 20%, transparent) 340deg, transparent 360deg)",
          filter: "blur(60px)",
          animation: "var(--animate-conic-spin)",
        }}
      />
      {/* Counter-rotating second conic for depth */}
      <div
        className="absolute left-1/2 top-1/2 h-[120vmax] w-[120vmax] -translate-x-1/2 -translate-y-1/2 opacity-[0.18] motion-reduce:hidden will-change-transform"
        style={{
          background:
            "conic-gradient(from 90deg at 50% 50%, transparent 0deg, color-mix(in oklab, var(--color-accent-2) 30%, transparent) 90deg, transparent 180deg, color-mix(in oklab, var(--color-accent) 24%, transparent) 270deg, transparent 360deg)",
          filter: "blur(80px)",
          animation: "var(--animate-conic-spin-reverse)",
        }}
      />
      {/* Cursor-follow spotlight */}
      <div
        className="absolute inset-0 motion-reduce:hidden"
        style={{
          background:
            "radial-gradient(560px circle at var(--mx) var(--my), color-mix(in oklab, var(--color-accent) 16%, transparent), transparent 60%)",
        }}
      />
      {/* Descending scan beam */}
      <div
        className="absolute inset-x-0 top-0 h-[40vh] motion-reduce:hidden"
        style={{
          background:
            "linear-gradient(to bottom, transparent, color-mix(in oklab, var(--color-accent) 22%, transparent) 40%, color-mix(in oklab, var(--color-accent) 8%, transparent) 60%, transparent)",
          mixBlendMode: "screen",
          opacity: 0.22,
          animation: "var(--animate-scan)",
        }}
      />
      {/* Scanlines overlay */}
      <div className="absolute inset-0 bg-scanlines opacity-[0.18] mix-blend-overlay" />
      {/* Bottom vignette for legibility */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 50%, transparent 45%, color-mix(in oklab, var(--color-bg-0) 95%, transparent))",
        }}
      />
    </div>
  );
}
