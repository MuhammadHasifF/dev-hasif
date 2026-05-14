"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Red-glitch reveal on viewport entry. Pure CSS — no Framer Motion per card.
 * A single IntersectionObserver toggles `.in-view` on the wrapper; the
 * accompanying keyframes in globals.css do the rest. Re-triggers each
 * time the element crosses the viewport (scroll up + down).
 *
 * Reduced motion is handled in CSS (the .glitch-reveal-in class only
 * animates when prefers-reduced-motion is no-preference).
 */
type Props = {
  children: ReactNode;
  /** Kept for back-compat. */
  side?: "left" | "right";
  delay?: number;
  className?: string;
  amount?: number;
};

export function GlitchReveal({ children, delay = 0, className = "", amount = 0.25 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          setInView(e.isIntersecting);
        }
      },
      { threshold: amount },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [amount]);

  return (
    <div
      ref={ref}
      className={`glitch-reveal-in ${inView ? "in-view" : ""} ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

/**
 * Re-triggering glitch wrapper for section titles. Same primitive, lighter
 * animation (no scanline tear).
 */
export function GlitchTitle({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) setInView(e.isIntersecting);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`glitch-title-in ${inView ? "in-view" : ""} ${className}`}>
      {children}
    </div>
  );
}
