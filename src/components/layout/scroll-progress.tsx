"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Scroll progress as a HUD data-stream:
 *  - cyan core line, scaled by progress
 *  - leading "head" tick that glows
 *  - bottom-right percentage readout (mono)
 *  - rAF-throttled scroll listener (single rAF; no per-frame loop)
 */
export function ScrollProgress() {
  const [p, setP] = useState(0);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const next = max > 0 ? h.scrollTop / max : 0;
      setP(next);
      if (labelRef.current) {
        labelRef.current.textContent = `${Math.round(next * 100).toString().padStart(3, "0")}%`;
      }
    };
    update();
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* top progress strip */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[2px]"
      >
        <div
          className="h-full origin-left will-change-transform"
          style={{
            transform: `scaleX(${p})`,
            background:
              "linear-gradient(90deg, transparent, color-mix(in oklab, var(--color-accent) 80%, transparent) 60%, var(--color-accent))",
            transition: "transform 80ms linear",
            boxShadow: "0 0 8px color-mix(in oklab, var(--color-accent) 60%, transparent)",
          }}
        />
        {/* leading head tick */}
        <div
          className="absolute top-0 h-full w-[10px] motion-reduce:hidden"
          style={{
            left: `${p * 100}%`,
            transform: "translateX(-50%)",
            background:
              "radial-gradient(60% 100% at 50% 50%, color-mix(in oklab, var(--color-accent) 100%, transparent), transparent 80%)",
            transition: "left 80ms linear",
          }}
        />
      </div>

      {/* fixed bottom-right HUD readout */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed bottom-3 right-3 z-[70] hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-text-2)] md:flex"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)] shadow-[0_0_8px_var(--color-accent)]" />
        <span>SCROLL</span>
        <span ref={labelRef} className="text-[var(--color-accent)]">000%</span>
      </div>
    </>
  );
}
