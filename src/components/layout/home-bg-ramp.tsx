"use client";

import { useEffect, useRef } from "react";

/**
 * Also writes a global --burn-gate CSS variable on documentElement so other
 * components (footer, contact, github activity, etc.) can darken their text
 * + lighten their borders in lockstep with the red wash.
 */

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
    let lastRamp = -1;
    let lastGateStep = -1;
    const root = document.documentElement;
    const apply = () => {
      pending = false;
      // Round ramp to 3 decimals so we don't write the same value repeatedly.
      const ramp = Math.round(p * 1000) / 1000;
      if (ramp !== lastRamp) {
        lastRamp = ramp;
        el.style.setProperty("--ramp", ramp.toFixed(3));
      }
      // Gate STEPPED to 25 positions (0.04 each). Each step write triggers a
      // global color-mix recalc on every element bound to --color-text-{1,2};
      // continuous writes were the lag source from Skills onwards.
      const gateRaw = Math.max(0, Math.min(1, (p - 0.82) * 6.5)) * (1 - Math.max(0, (p - 0.97) * 5));
      const gateStep = Math.round(gateRaw * 25);
      if (gateStep !== lastGateStep) {
        lastGateStep = gateStep;
        root.style.setProperty("--burn-gate", (gateStep / 25).toFixed(2));
      }
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
      root.style.removeProperty("--burn-gate");
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
          // Stay 0 through All Projects + Skills. Ramp begins at ~ramp 0.82
          // (past mid-Skills, into Credentials) and climbs to peak by ~0.97
          // (Contact). Footer eases back slightly.
          ["--gate" as string]:
            "calc(min(1, max(0, (var(--ramp) - 0.82) * 6.5)) * (1 - max(0, (var(--ramp) - 0.97) * 5)))",
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
