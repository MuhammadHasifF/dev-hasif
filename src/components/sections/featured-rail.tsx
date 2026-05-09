"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/content/projects";
import { Section } from "@/components/primitives/section";
import { DiagonalArrow } from "@/components/primitives/diagonal-arrow";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const featured = projects.filter((p) => p.featured).slice(0, 5);

export function FeaturedRail() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    if (!containerRef.current || !pinRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".feat-stack-card");
      if (!cards.length) return;

      // Card 0 starts visible; the rest start below.
      gsap.set(cards[0], { yPercent: 0, opacity: 1, scale: 1, filter: "blur(0px)" });
      cards.slice(1).forEach((c) => {
        gsap.set(c, { yPercent: 60, opacity: 0, scale: 0.94, filter: "blur(8px)" });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${cards.length * 100}%`,
          pin: pinRef.current,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      cards.forEach((card, i) => {
        if (i === 0) return;
        const slot = i - 1; // 0-indexed slot in the timeline
        // Outgoing card slides up + fades; incoming card slides up into place.
        tl.to(
          cards[i - 1],
          { yPercent: -22, opacity: 0, scale: 0.96, filter: "blur(6px)", duration: 1, ease: "power2.inOut" },
          slot,
        );
        tl.to(
          card,
          { yPercent: 0, opacity: 1, scale: 1, filter: "blur(0px)", duration: 1, ease: "power2.out" },
          slot,
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [reduce]);

  // Reduced-motion fallback: simple grid, no pinning.
  if (reduce) {
    return (
      <Section
        eyebrow="FEATURED"
        index={3}
        total={7}
        stamp="// CASE FILES"
        title={["Featured Work."]}
      >
        <div className="grid gap-4 md:grid-cols-2">
          {featured.map((p) => (
            <FeaturedStaticCard key={p.slug} project={p} />
          ))}
        </div>
      </Section>
    );
  }

  return (
    <section
      ref={containerRef}
      aria-label="Featured projects — pinned vertical stack"
      className="relative"
      style={{ height: `${(featured.length + 1) * 100}dvh` }}
    >
      <div
        ref={pinRef}
        className="relative flex h-[100dvh] w-full items-center justify-center overflow-hidden"
      >
        {/* Constant red bg — locked, no hue shift, no pulsing */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(140% 110% at 50% 100%, #2a0a0c 0%, #1a0608 55%, #0d0306 90%, #050204 100%)",
          }}
        />
        {/* Soft top + bottom feathered edges so it dissolves into the global ramp */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[18vh]"
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0.85), transparent)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[18vh]"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.85), transparent)",
          }}
        />
        <div className="absolute inset-0 bg-scanlines opacity-20 mix-blend-overlay" aria-hidden="true" />

        {/* Header */}
        <div className="absolute inset-x-0 top-[12vh] z-10 mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-text-2)]">
                <span className="h-px w-8 bg-[var(--color-border)]" />
                <span className="text-[var(--color-accent)]">03</span>
                <span>/ 07 · FEATURED</span>
              </div>
              <h2 className="mt-2 font-display text-4xl leading-tight text-[var(--color-text-0)] md:text-6xl">
                Featured Work.
              </h2>
            </div>
            <div className="hidden text-right font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-text-2)] md:block">
              Scroll ↓
            </div>
          </div>
        </div>

        {/* Card stack */}
        <div className="relative z-[1] mx-auto flex h-full w-full max-w-5xl items-center justify-center px-4 sm:px-6">
          {featured.map((p) => (
            <FeaturedStackCard key={p.slug} project={p} />
          ))}
        </div>

        {/* Footer counter */}
        <div className="absolute inset-x-0 bottom-8 z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-text-2)] sm:px-6">
          <span>{`${featured.length} CASE FILES`}</span>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 transition-colors hover:text-[var(--color-accent)]"
          >
            See every project <DiagonalArrow />
          </Link>
        </div>
      </div>
    </section>
  );
}

function FeaturedStackCard({ project: p }: { project: (typeof projects)[number] }) {
  return (
    <Link
      href={`/work/${p.slug}`}
      className="feat-stack-card hud-panel hud-panel-hover group absolute left-1/2 top-1/2 block w-[88vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-hidden p-8 transition-colors md:w-[60vw] md:p-10"
      style={{ willChange: "transform, opacity, filter" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-40"
        style={{ background: "var(--color-accent)" }}
      />
      <div className="absolute inset-0 bg-noise opacity-[0.04] mix-blend-overlay" />
      <CardBody p={p} />
    </Link>
  );
}

function FeaturedStaticCard({ project: p }: { project: (typeof projects)[number] }) {
  return (
    <Link
      href={`/work/${p.slug}`}
      className="hud-panel hud-panel-hover group relative block h-full min-h-[420px] overflow-hidden p-8 transition-colors"
    >
      <div className="absolute inset-0 bg-noise opacity-[0.04] mix-blend-overlay" />
      <CardBody p={p} />
    </Link>
  );
}

function CardBody({ p }: { p: (typeof projects)[number] }) {
  return (
    <div className="relative flex h-full flex-col">
      <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-text-2)]">
        <span>{p.category}</span>
        <span>{p.year}</span>
      </div>
      <h3 className="mt-6 font-display text-3xl leading-tight text-[var(--color-text-0)] md:text-4xl">
        {p.title}
      </h3>
      <p className="mt-3 max-w-md text-sm text-[var(--color-text-1)] md:text-base">
        {p.tagline}
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-2">
        {p.stack.slice(0, 4).map((s) => (
          <span
            key={s}
            className="rounded-full border border-[var(--color-border)] bg-[var(--color-bg-2)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-[var(--color-text-1)]"
          >
            {s}
          </span>
        ))}
      </div>
      <div className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-text-0)]">
        Read case study
        <DiagonalArrow />
      </div>
    </div>
  );
}
