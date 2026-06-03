"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/**
 * Large circular avatar mark next to the hero headline.
 *
 * Visibility:
 *   - In hero view → driven by --hero-logo-on (1 when hero is on screen)
 *   - First word state → --hero-word-dev (1 when headline is showing "DEV",
 *     0 when showing "MUHAMMAD"). Avatar only shows next to "DEV HASIF",
 *     glitches in/out exactly when the headline glitches in/out.
 *   - Nav logo opacity = 1 - hero-logo-on so it owns the spot when the
 *     hero scrolls off.
 *
 * Glitch sync: GlitchHeadline dispatches a "hero-word-swap" CustomEvent
 * at the same beat as the text swap. This component listens and toggles
 * a one-shot `.is-glitching` class for ~520ms so the RGB-shift ghosts +
 * stepped scale-up play at the EXACT instant the word changes. No fade.
 */
export function HeroLogoBridge() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    // Start: hero on, headline shows MUHAMMAD → logo hidden, no glitch.
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

    // Trigger one-shot glitch class on every word swap.
    let timer: ReturnType<typeof setTimeout> | null = null;
    const onSwap = () => {
      el.classList.remove("is-glitching");
      // Force reflow so the animation restarts.
      void el.offsetWidth;
      el.classList.add("is-glitching");
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => el.classList.remove("is-glitching"), 540);
    };
    window.addEventListener("hero-word-swap", onSwap);

    return () => {
      io.disconnect();
      window.removeEventListener("hero-word-swap", onSwap);
      if (timer) clearTimeout(timer);
      root.style.setProperty("--hero-logo-on", "0");
      root.style.setProperty("--hero-word-dev", "0");
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="hero-logo-mark relative inline-flex shrink-0 items-center justify-center"
    >
      {/* Ambient red glow halo — no hard ring */}
      <span
        aria-hidden="true"
        className="hero-logo-halo pointer-events-none absolute"
        style={{
          inset: "-22%",
          background:
            "radial-gradient(closest-side, color-mix(in oklab, var(--color-accent) 50%, transparent) 0%, color-mix(in oklab, var(--color-accent) 18%, transparent) 55%, transparent 80%)",
          filter: "blur(8px)",
          opacity: "calc(var(--hero-logo-on, 1) * var(--hero-word-dev, 0) * 0.85)",
          transition: "opacity 200ms steps(3, end)",
        }}
      />
      <span className="hero-logo-circle relative inline-flex h-full w-full items-center justify-center overflow-hidden rounded-full">
        {/* Cyan RGB-split ghost */}
        <span
          aria-hidden="true"
          className="hero-logo-ghost hero-logo-ghost-cyan pointer-events-none absolute inset-0 overflow-hidden rounded-full"
        >
          <Image
            src="/me/bamboo-forest.jpg"
            alt=""
            width={400}
            height={400}
            className="h-full w-full object-cover"
            style={{ objectPosition: "50% 30%", filter: "hue-rotate(180deg) saturate(1.6)" }}
          />
        </span>
        {/* Red RGB-split ghost */}
        <span
          aria-hidden="true"
          className="hero-logo-ghost hero-logo-ghost-red pointer-events-none absolute inset-0 overflow-hidden rounded-full"
        >
          <Image
            src="/me/bamboo-forest.jpg"
            alt=""
            width={400}
            height={400}
            className="h-full w-full object-cover"
            style={{ objectPosition: "50% 30%", filter: "saturate(1.6) brightness(1.1)" }}
          />
        </span>
        {/* Main photo */}
        <Image
          src="/me/bamboo-forest.jpg"
          alt=""
          width={400}
          height={400}
          className="relative h-full w-full object-cover"
          style={{ objectPosition: "50% 30%" }}
          priority
        />
      </span>
    </div>
  );
}
