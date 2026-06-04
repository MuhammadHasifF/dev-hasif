"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Phase = "idle" | "enter" | "exit";

/**
 * Hero avatar that GLITCHES in/out in sync with the MUHAMMAD ↔ DEV swap.
 *
 * Previous version transitioned width/opacity/margin smoothly → read as
 * a slide, not a glitch. This version snaps the layout instantly and
 * uses two dedicated keyframes for the enter and exit beats so the
 * avatar pops + RGB-splits + clip-slices the same family as the text.
 *
 *  - GlitchHeadline dispatches `hero-word-swap` with detail.word.
 *  - When word === "DEV":  setVisible(true) immediately → enter glitch.
 *  - When word === "MUHAMMAD": exit glitch plays → after 480ms hide.
 *  - --hero-logo-on (hero off-screen) overrides everything to hidden.
 */
export function HeroLogoBridge() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [heroOn, setHeroOn] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--hero-logo-on", "1");
    root.style.setProperty("--hero-word-dev", "0");

    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const on = e.isIntersecting;
          root.style.setProperty("--hero-logo-on", on ? "1" : "0");
          setHeroOn(on);
        }
      },
      { rootMargin: "-72px 0px -50% 0px", threshold: 0 },
    );
    io.observe(el);

    let exitTimer: ReturnType<typeof setTimeout> | null = null;
    let phaseTimer: ReturnType<typeof setTimeout> | null = null;

    const onSwap = (e: Event) => {
      const word = (e as CustomEvent<{ word: "DEV" | "MUHAMMAD" }>).detail?.word;
      root.style.setProperty(
        "--hero-word-dev",
        word === "DEV" ? "1" : "0",
      );
      if (word === "DEV") {
        // Make visible IMMEDIATELY so the enter glitch has something to mask.
        if (exitTimer) clearTimeout(exitTimer);
        if (phaseTimer) clearTimeout(phaseTimer);
        setVisible(true);
        setPhase("enter");
        phaseTimer = setTimeout(() => setPhase("idle"), 500);
      } else {
        // Play the exit glitch first, hide after.
        if (phaseTimer) clearTimeout(phaseTimer);
        setPhase("exit");
        phaseTimer = setTimeout(() => setPhase("idle"), 500);
        if (exitTimer) clearTimeout(exitTimer);
        exitTimer = setTimeout(() => setVisible(false), 480);
      }
    };

    window.addEventListener("hero-word-swap", onSwap as EventListener);

    return () => {
      io.disconnect();
      window.removeEventListener("hero-word-swap", onSwap as EventListener);
      if (exitTimer) clearTimeout(exitTimer);
      if (phaseTimer) clearTimeout(phaseTimer);
      root.style.setProperty("--hero-logo-on", "0");
      root.style.setProperty("--hero-word-dev", "0");
    };
  }, []);

  const stateClass = !visible || !heroOn ? "is-hidden" : "is-visible";
  const phaseClass =
    phase === "enter"
      ? "is-glitch-in"
      : phase === "exit"
        ? "is-glitch-out"
        : "";

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`hero-logo-mark relative inline-flex shrink-0 items-center justify-center ${stateClass} ${phaseClass}`}
    >
      {/* Ambient red glow halo */}
      <span
        aria-hidden="true"
        className="hero-logo-halo pointer-events-none absolute"
        style={{
          inset: "-22%",
          background:
            "radial-gradient(closest-side, color-mix(in oklab, var(--color-accent) 50%, transparent) 0%, color-mix(in oklab, var(--color-accent) 18%, transparent) 55%, transparent 80%)",
          filter: "blur(8px)",
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
