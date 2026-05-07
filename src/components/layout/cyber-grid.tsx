"use client";

import { useEffect, useRef } from "react";

export function CyberGrid() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const hover = window.matchMedia("(hover: hover)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let pending = false;
    let mx = 0;
    let my = 0;
    let sp = 0;
    const apply = () => {
      pending = false;
      el.style.setProperty("--mx", `${mx}px`);
      el.style.setProperty("--my", `${my}px`);
      el.style.setProperty("--sp", `${sp.toFixed(4)}`);
    };
    const schedule = () => {
      if (pending) return;
      pending = true;
      requestAnimationFrame(apply);
    };
    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      schedule();
    };
    const onScroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      sp = Math.min(1, Math.max(0, window.scrollY / max));
      schedule();
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    if (hover && !reduce) {
      window.addEventListener("pointermove", onMove, { passive: true });
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-20 overflow-hidden"
      style={
        {
          backgroundColor: "#000",
          ["--mx" as string]: "50vw",
          ["--my" as string]: "50vh",
          ["--sp" as string]: "0",
          // hue rotates from 0 → -28deg as you scroll (red → deeper crimson/magenta)
          ["--hue" as string]: "calc(var(--sp) * -28deg)",
        } as React.CSSProperties
      }
    >
      {/* Drifting accent disc that rises and intensifies as you scroll */}
      <div
        className="absolute left-1/2 top-[10%] h-[120vmax] w-[120vmax] -translate-x-1/2 will-change-transform motion-reduce:hidden"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklab, var(--color-accent) 22%, transparent), transparent 70%)",
          filter:
            "blur(60px) hue-rotate(var(--hue))",
          opacity: "calc(0.35 + var(--sp) * 0.55)",
          transform:
            "translate(-50%, calc(-12vh + var(--sp) * -42vh)) scale(calc(1 + var(--sp) * 0.35))",
        }}
      />
      <div
        className="absolute inset-0 bg-cyber-grid opacity-[0.22] motion-reduce:opacity-15"
        style={{
          animation: "var(--animate-grid-drift)",
          transform: "translateY(calc(var(--sp) * -6vh))",
        }}
      />
      <div
        className="absolute left-1/2 top-1/2 h-[180vmax] w-[180vmax] -translate-x-1/2 -translate-y-1/2 opacity-[0.18] motion-reduce:opacity-8 will-change-transform"
        style={{
          background:
            "conic-gradient(from 0deg at 50% 50%, transparent 0deg, color-mix(in oklab, var(--color-accent) 14%, transparent) 70deg, transparent 140deg, transparent 220deg, color-mix(in oklab, var(--color-accent) 10%, transparent) 320deg, transparent 360deg)",
          filter: "blur(80px) hue-rotate(var(--hue))",
          animation: "var(--animate-conic-spin)",
        }}
      />
      <div
        className="absolute inset-0 motion-reduce:hidden"
        style={{
          background:
            "radial-gradient(420px circle at var(--mx) var(--my), color-mix(in oklab, var(--color-accent) 9%, transparent), transparent 70%)",
          filter: "hue-rotate(var(--hue))",
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-[36vh] motion-reduce:hidden"
        style={{
          background:
            "linear-gradient(to bottom, transparent, color-mix(in oklab, var(--color-accent) 10%, transparent) 50%, transparent)",
          mixBlendMode: "screen",
          opacity: 0.12,
          animation: "var(--animate-scan)",
        }}
      />
      <div className="absolute inset-0 bg-scanlines opacity-[0.28] mix-blend-overlay" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 35%, transparent 35%, rgba(0,0,0,0.55) 75%, rgba(0,0,0,0.92) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.35), transparent 25%, transparent 70%, rgba(0,0,0,0.6))",
        }}
      />
    </div>
  );
}
