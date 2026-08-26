"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Platform banner reveal. CSS-only animation triggered via a single
 * IntersectionObserver per banner — no Framer Motion overhead, no
 * per-frame work below the Skills section.
 */
export function PlatformReveal({
  children,
  index,
}: {
  children: ReactNode;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) setInView(e.isIntersecting);
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`platform-reveal ${inView ? "in-view" : ""}`}
      style={{ animationDelay: `${index * 100}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
