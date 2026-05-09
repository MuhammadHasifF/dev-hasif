"use client";

import { useEffect, useRef, useState } from "react";
import { FlameTip } from "@/components/primitives/flame-tip";

/**
 * Scroll progress as a HUD data-stream:
 *  - red core line, scaled by progress
 *  - burning flame tip + spark trail at the leading edge (FlameTip)
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
        {/* Burning flame tip + sparks at the leading edge */}
        {p > 0.001 && (
          <FlameTip progress={p} orientation="horizontal" size={20} />
        )}
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
