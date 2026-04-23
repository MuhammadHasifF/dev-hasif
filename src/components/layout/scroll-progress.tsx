"use client";

import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const update = () => {
      const h = document.documentElement;
      const scroll = h.scrollTop;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? scroll / max : 0);
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
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-0.5 origin-left"
      style={{
        transform: `scaleX(${p})`,
        background:
          "linear-gradient(90deg, var(--color-accent), var(--color-accent-2), var(--color-accent-3))",
        transition: "transform 120ms linear",
      }}
    />
  );
}
