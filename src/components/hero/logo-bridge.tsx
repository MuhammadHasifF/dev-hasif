"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/**
 * Single small avatar mark that lives next to the hero headline. As the
 * hero scrolls out of view, this mark glitches off and the nav logo
 * (top-left) glitches in. Vice versa on scroll back up.
 *
 * The coordination is a single CSS variable on documentElement,
 * --hero-logo-on (1 = hero shows it, 0 = nav shows it). nav.tsx reads
 * it to fade/glitch its own logo in lockstep.
 */
export function HeroLogoBridge() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Default: hero owns the logo (it's at the top of the page)
    document.documentElement.style.setProperty("--hero-logo-on", "1");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          document.documentElement.style.setProperty("--hero-logo-on", e.isIntersecting ? "1" : "0");
        }
      },
      { rootMargin: "-72px 0px -50% 0px", threshold: 0 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      document.documentElement.style.setProperty("--hero-logo-on", "0");
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="hero-logo-mark inline-flex items-center"
      style={{
        opacity: "var(--hero-logo-on, 1)",
        transition: "opacity 220ms steps(2, end), filter 220ms steps(2, end)",
        filter:
          "drop-shadow(0 0 10px color-mix(in oklab, var(--color-accent) 70%, transparent))",
      }}
    >
      <span className="relative inline-flex h-[0.85em] w-[0.85em] items-center justify-center overflow-hidden rounded-full ring-2 ring-[var(--color-accent)] shadow-[0_0_24px_-4px_var(--color-accent)]">
        <Image
          src="/me/bamboo-forest.jpg"
          alt=""
          width={120}
          height={120}
          className="h-full w-full object-cover"
          style={{ objectPosition: "50% 30%" }}
        />
      </span>
    </div>
  );
}
