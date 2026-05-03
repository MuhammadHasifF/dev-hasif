"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

const TEXT = "404";

export function ScatteredFour() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const root = containerRef.current;
    if (!root) return;
    const letters = Array.from(root.querySelectorAll<HTMLSpanElement>("[data-letter]"));
    const state = letters.map(() => ({ x: 0, y: 0, vx: 0, vy: 0 }));

    let raf = 0;
    let mx = -9999;
    let my = -9999;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const tick = () => {
      letters.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = cx - mx;
        const dy = cy - my;
        const dist2 = dx * dx + dy * dy;
        const radius = 220;
        const s = state[i];
        if (dist2 < radius * radius && dist2 > 0.01) {
          const dist = Math.sqrt(dist2);
          const force = (1 - dist / radius) * 30;
          s.vx += (dx / dist) * force * 0.06;
          s.vy += (dy / dist) * force * 0.06;
        }
        // spring back
        s.vx += -s.x * 0.12;
        s.vy += -s.y * 0.12;
        s.vx *= 0.78;
        s.vy *= 0.78;
        s.x += s.vx;
        s.y += s.vy;
        el.style.transform = `translate3d(${s.x}px, ${s.y}px, 0)`;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, [reduce]);

  return (
    <div
      ref={containerRef}
      aria-label="404"
      className="relative flex select-none items-center justify-center font-display text-[28vw] leading-none tracking-tight text-[var(--color-bg-2)]"
    >
      {Array.from(TEXT).map((ch, i) => (
        <span
          key={i}
          data-letter
          className="inline-block will-change-transform"
        >
          {ch}
        </span>
      ))}
    </div>
  );
}
