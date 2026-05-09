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
          // gate the ramp: stays at 0 until ~ramp 0.42 (≈ 3/4 through Experience for a typical home),
          // hits full intensity around ~0.94 (Contact), eases back at the very end (footer).
          ["--gate" as string]:
            "calc(min(1, max(0, (var(--ramp) - 0.42) * 1.95)) * (1 - max(0, (var(--ramp) - 0.94) * 4)))",
        } as React.CSSProperties
      }
    >
      {/* Bottom-anchored bright red wash that climbs the page */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(140% 110% at 50% 100%, color-mix(in oklab, var(--color-accent) 70%, transparent) 0%, color-mix(in oklab, var(--color-accent) 32%, transparent) 35%, transparent 75%)",
          opacity: "calc(var(--gate) * 0.82)",
          mixBlendMode: "screen",
        }}
      />
      {/* Soft red atmosphere that fills the lower viewport */}
      <div
        className="absolute inset-x-0 bottom-0 h-[70vh]"
        style={{
          background:
            "linear-gradient(to top, color-mix(in oklab, #ff1e3c 60%, transparent) 0%, color-mix(in oklab, var(--color-accent) 22%, transparent) 45%, transparent 90%)",
          opacity: "calc(var(--gate) * 0.78)",
          mixBlendMode: "screen",
        }}
      />
      {/* Vignette deepening toward the bottom — keeps content readable on red */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 100% at 50% 100%, transparent 50%, rgba(0,0,0,0.45) 100%)",
          opacity: "calc(var(--gate) * 0.6)",
        }}
      />
    </div>
  );
}
