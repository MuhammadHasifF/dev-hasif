"use client";

import { useEffect, useState } from "react";

const SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export function Konami() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    let i = 0;
    const onKey = (e: KeyboardEvent) => {
      const expected = SEQUENCE[i];
      if (e.key.toLowerCase() === expected.toLowerCase()) {
        i += 1;
        if (i === SEQUENCE.length) {
          i = 0;
          setOn(true);
          window.setTimeout(() => setOn(false), 6000);
        }
      } else {
        i = 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!on) return null;

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[95] mix-blend-screen"
        style={{
          background:
            "conic-gradient(from 0deg, #ff0080, #ff8c00, #ffd700, #32cd32, #00bfff, #8a2be2, #ff0080)",
          animation: "spin 2.5s linear infinite",
          opacity: 0.18,
        }}
      />
      <div
        role="status"
        className="fixed bottom-6 left-1/2 z-[96] -translate-x-1/2 rounded-full border border-[var(--color-accent)] bg-[var(--color-bg-0)]/90 px-4 py-2 font-mono text-xs text-[var(--color-text-0)] shadow-glow"
      >
        ↑ ↑ ↓ ↓ ← → ← → B A · you found it. ✦
      </div>
      <style>{`@keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }`}</style>
    </>
  );
}
