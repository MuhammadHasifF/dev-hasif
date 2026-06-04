"use client";

import { useEffect, useRef, useState } from "react";
import { FlameTip } from "@/components/primitives/flame-tip";

/**
 * One DOM source of truth for both the fill bar AND the flame at its tip.
 * The parent strip has a single CSS variable `--p` set by a rAF-coalesced
 * scroll listener; the bar scales by --p and the flame is positioned by
 * left:calc(var(--p) * 100%). No second tween, no transition lag — they
 * share the same source and update on the same frame.
 */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [hasProgress, setHasProgress] = useState(false);

  useEffect(() => {
    let raf = 0;
    let lastP = -1;
    const update = () => {
      raf = 0;
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const next = max > 0 ? h.scrollTop / max : 0;
      if (Math.abs(next - lastP) < 0.0005) return;
      lastP = next;
      const el = ref.current;
      if (el) el.style.setProperty("--p", next.toFixed(4));
      setHasProgress(next > 0.001);
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
      {/* Outer wrapper is taller than the bar so the flame can render fully
          downward into the viewport without being clipped. The bar still
          sits at the very top edge (h-[3px] on the inner div). */}
      <div
        ref={ref}
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[42px]"
        style={{ ["--p" as string]: "0", overflow: "visible" } as React.CSSProperties}
      >
        {/* Fill bar — scaleX driven by --p, no transition */}
        <div
          className="origin-left"
          style={{
            transform: "scaleX(var(--p))",
            height: "3px",
            background:
              "linear-gradient(90deg, transparent 0%, color-mix(in oklab, var(--color-accent) 35%, transparent) 30%, color-mix(in oklab, var(--color-accent) 80%, transparent) 70%, var(--color-accent) 100%)",
            boxShadow:
              "0 0 6px color-mix(in oklab, var(--color-accent) 70%, transparent), 0 0 14px color-mix(in oklab, var(--color-accent) 35%, transparent)",
          }}
        />
        {/* Flame at the tip — sits in the same DOM parent driven by --p,
            so they always update on the same frame. */}
        {hasProgress && (
          <div
            className="absolute"
            style={{
              left: "calc(var(--p) * 100%)",
              top: 0,
            }}
          >
            <FlameTip progress={1} orientation="horizontal" size={28} />
          </div>
        )}
      </div>

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
