"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/**
 * Large avatar mark that lives next to the hero headline.
 *
 * Visibility rules:
 *   - In hero view → driven by --hero-logo-on (1 when hero is on screen)
 *   - First word state → --hero-word-dev (1 when headline is showing "DEV",
 *     0 when showing "MUHAMMAD"). The avatar only shows next to "DEV HASIF",
 *     so it glitches in when the headline glitches to DEV and glitches out
 *     when it swaps back to MUHAMMAD.
 *   - Nav logo binds to (1 - hero-logo-on), so it owns the spot whenever
 *     the hero is off screen, regardless of the swap state.
 *
 * Size: matches the headline text height — clamp matches the h1 in
 * glitch-headline.tsx (3rem → 14vw → 11rem).
 */
export function HeroLogoBridge() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    // Start: hero is on, headline shows MUHAMMAD → logo hidden.
    root.style.setProperty("--hero-logo-on", "1");
    root.style.setProperty("--hero-word-dev", "0");
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          root.style.setProperty("--hero-logo-on", e.isIntersecting ? "1" : "0");
        }
      },
      { rootMargin: "-72px 0px -50% 0px", threshold: 0 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      root.style.setProperty("--hero-logo-on", "0");
      root.style.setProperty("--hero-word-dev", "0");
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="hero-logo-mark relative inline-flex shrink-0 items-center justify-center"
      style={
        {
          // height = headline line-height × text size, clamp-matched. Tighter
          // on phone (2rem floor) so headline + avatar still fit at 375px.
          width: "calc(clamp(2rem, 10vw, 9rem) * var(--hero-word-dev, 0))",
          height: "clamp(2rem, 10vw, 9rem)",
          marginLeft: "calc(var(--hero-word-dev, 0) * 0.4rem)",
          // visibility = hero-on AND headline shows "DEV"
          opacity: "calc(var(--hero-logo-on, 1) * var(--hero-word-dev, 0))",
          transform:
            "scale(calc(0.6 + var(--hero-word-dev, 0) * 0.4))",
          transition:
            "opacity 180ms steps(3, end), transform 220ms cubic-bezier(0.32, 0.72, 0, 1), width 220ms cubic-bezier(0.32, 0.72, 0, 1), margin-left 220ms cubic-bezier(0.32, 0.72, 0, 1)",
          filter:
            "drop-shadow(0 0 14px color-mix(in oklab, var(--color-accent) 80%, transparent)) drop-shadow(0 0 28px color-mix(in oklab, var(--color-accent) 45%, transparent))",
          overflow: "hidden",
        } as React.CSSProperties
      }
    >
      <span className="relative inline-flex h-full w-full items-center justify-center overflow-hidden rounded-full ring-[3px] ring-[var(--color-accent)] shadow-[0_0_48px_-6px_var(--color-accent)]">
        <Image
          src="/me/bamboo-forest.jpg"
          alt=""
          width={400}
          height={400}
          className="h-full w-full object-cover"
          style={{ objectPosition: "50% 30%" }}
          priority
        />
        {/* Red overlay on top so the photo reads "cyber red" not neutral */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 100% at 50% 50%, transparent 30%, color-mix(in oklab, var(--color-accent) 35%, transparent) 100%)",
            mixBlendMode: "screen",
          }}
        />
      </span>
    </div>
  );
}
