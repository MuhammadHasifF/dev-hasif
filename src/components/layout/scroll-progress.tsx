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
      {/* top progress strip — burning fire trail with spark head */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[3px]"
      >
        {/* deep ember trail */}
        <div
          className="h-full origin-left will-change-transform"
          style={{
            transform: `scaleX(${p})`,
            background:
              "linear-gradient(90deg, transparent 0%, color-mix(in oklab, var(--color-accent) 35%, transparent) 30%, color-mix(in oklab, var(--color-accent) 80%, transparent) 70%, var(--color-accent) 100%)",
            transition: "transform 80ms linear",
            boxShadow:
              "0 0 6px color-mix(in oklab, var(--color-accent) 70%, transparent), 0 0 14px color-mix(in oklab, var(--color-accent) 35%, transparent)",
          }}
        />
        {/* hot-burn band that rides just behind the head */}
        <div
          className="absolute top-0 h-full w-[120px] motion-reduce:hidden"
          style={{
            left: `${p * 100}%`,
            transform: "translateX(-100%)",
            background:
              "linear-gradient(90deg, transparent 0%, color-mix(in oklab, var(--color-accent) 30%, transparent) 30%, #ff5560 70%, #ffd6c2 96%, #ffffff 100%)",
            filter: "blur(0.4px)",
            transition: "left 80ms linear",
            animation: "var(--animate-flicker)",
          }}
        />
        {/* spark head — white-hot core */}
        <div
          className="absolute top-1/2 h-[8px] w-[8px] -translate-y-1/2 rounded-full motion-reduce:hidden"
          style={{
            left: `${p * 100}%`,
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(circle, #ffffff 0%, #ffd6c2 25%, var(--color-accent-3) 50%, var(--color-accent) 75%, transparent 100%)",
            boxShadow:
              "0 0 8px #ffffff, 0 0 16px var(--color-accent-3), 0 0 28px var(--color-accent), 0 0 44px color-mix(in oklab, var(--color-accent) 80%, transparent)",
            transition: "left 80ms linear",
          }}
        />
        {/* spark plume — short flame curling up from the head */}
        <div
          className="absolute top-0 h-[10px] w-[26px] motion-reduce:hidden"
          style={{
            left: `${p * 100}%`,
            transform: "translate(-30%, -55%)",
            background:
              "radial-gradient(70% 110% at 100% 50%, #ffffff 0%, #ffe1c2 18%, var(--color-accent-3) 38%, color-mix(in oklab, var(--color-accent) 70%, transparent) 60%, transparent 80%)",
            filter: "blur(2.4px)",
            transition: "left 80ms linear",
            opacity: p > 0.001 ? 0.95 : 0,
            animation: "sparkFlicker 220ms steps(2, end) infinite",
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
