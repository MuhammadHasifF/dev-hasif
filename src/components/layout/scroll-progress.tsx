"use client";

import { useEffect, useRef } from "react";

/**
 * Top scroll progress bar. Single CSS variable `--p` written by a rAF-
 * coalesced scroll listener. The fill bar scales horizontally from --p.
 * No tip flame — was buggy / costly, removed at user request.
 */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

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
      <div
        ref={ref}
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[3px]"
        style={{ ["--p" as string]: "0" } as React.CSSProperties}
      >
        <div
          className="h-full origin-left"
          style={{
            transform: "scaleX(var(--p))",
            background:
              "linear-gradient(90deg, transparent 0%, color-mix(in oklab, var(--color-accent) 35%, transparent) 30%, color-mix(in oklab, var(--color-accent) 80%, transparent) 70%, var(--color-accent) 100%)",
            boxShadow:
              "0 0 6px color-mix(in oklab, var(--color-accent) 70%, transparent), 0 0 14px color-mix(in oklab, var(--color-accent) 35%, transparent)",
          }}
        />
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
