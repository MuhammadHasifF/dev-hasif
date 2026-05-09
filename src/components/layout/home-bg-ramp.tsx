"use client";

import { useEffect, useRef } from "react";

/**
 * Home-only fixed gradient layer driven by document scroll progress.
 * Stays transparent through Hero / Marquee / Stats / About, begins shifting
 * to red around ~3/4 of the way through the Experience section, deepens
 * through Work / Skills / Credentials / Live Feed, peaks at Contact, then
 * eases off into the footer.
 *
 * Uses a single rAF-coalesced scroll listener so it never blocks the
 * main thread. All layers are pointer-events: none.
 */
export function HomeBgRamp() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let pending = false;
    let p = 0;
    const apply = () => {
      pending = false;
      el.style.setProperty("--ramp", p.toFixed(4));
    };
    const update = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      p = Math.min(1, Math.max(0, window.scrollY / max));
      if (!pending) {
        pending = true;
        requestAnimationFrame(apply);
      }
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-[15] overflow-hidden"
      style={
        {
          ["--ramp" as string]: "0",
          // Stay 0 through All Projects + first half of Skills (matches the
          // dark Experience-section feel). Ramp begins at ~ramp 0.78 (mid-
          // Skills) and climbs to peak by ~0.96 (Contact). Footer eases back.
          ["--gate" as string]:
            "calc(min(1, max(0, (var(--ramp) - 0.78) * 5.0)) * (1 - max(0, (var(--ramp) - 0.97) * 5)))",
        } as React.CSSProperties
      }
    >
      {/* Full-screen bright red flood (the "whole screen turns red" layer) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 120% at 50% 60%, color-mix(in oklab, #ff1e3c 78%, transparent) 0%, color-mix(in oklab, var(--color-accent) 50%, transparent) 45%, color-mix(in oklab, var(--color-accent) 22%, transparent) 80%, transparent 100%)",
          opacity: "calc(var(--gate) * 0.92)",
          mixBlendMode: "screen",
        }}
      />
      {/* Secondary saturating wash so dark surfaces also climb red */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in oklab, var(--color-accent) 30%, transparent) 0%, color-mix(in oklab, #ff1e3c 45%, transparent) 50%, color-mix(in oklab, var(--color-accent) 30%, transparent) 100%)",
          opacity: "calc(var(--gate) * 0.55)",
          mixBlendMode: "lighten",
        }}
      />
      {/* Vignette deepening at edges to keep content readable on red */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 100% at 50% 50%, transparent 35%, rgba(0,0,0,0.55) 100%)",
          opacity: "calc(var(--gate) * 0.65)",
        }}
      />
    </div>
  );
}
