"use client";

import { useEffect, useState } from "react";

/**
 * Magnitude-style permanent timestamp.
 * Fixed top-right of the viewport in mono. Ticks every second.
 */
export function LiveClock() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const hh = d.getHours().toString().padStart(2, "0");
      const mm = d.getMinutes().toString().padStart(2, "0");
      const ss = d.getSeconds().toString().padStart(2, "0");
      setTime(`${hh}:${mm}:${ss}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed right-4 top-[68px] z-[60] hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-text-2)] sm:flex md:right-6"
    >
      <span className="status-dot" />
      <span className="text-[var(--color-text-1)]">SGT</span>
      <span className="text-[var(--color-accent)]">{time}</span>
    </div>
  );
}
