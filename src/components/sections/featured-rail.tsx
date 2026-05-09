"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { projects } from "@/content/projects";
import { Section } from "@/components/primitives/section";
import { DiagonalArrow } from "@/components/primitives/diagonal-arrow";

const featured = projects.filter((p) => p.featured).slice(0, 5);

export function FeaturedRail() {
  const targetRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // Translate the rail right, to, left as the user scrolls vertically.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-78%"]);

  // Smooth bg fill: black at start, ramps to a deep cinematic red as the rail
  // travels. No diagonal lines, no stripes, just a single soft radial wash
  // moving with the rail.
  const bgRedMix = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const bgX = useTransform(scrollYProgress, [0, 1], ["18%", "82%"]);

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
            <FeaturedCardStatic key={p.slug} project={p} />
          ))}
        </div>
      </Section>
    );
  }

  const total = featured.length + 1;

  return (
    <section
      ref={targetRef}
      aria-label="Featured projects rail"
      className="relative h-[400vh]"
    >
      <div className="sticky top-0 flex h-[100dvh] flex-col justify-center overflow-hidden">
        {/* Smooth, single-piece red wash that follows the rail.
            No stripes, no patterns, no seams. Pure black at start,
            deep cinematic red at the end. */}
        <SmoothRedBg progress={scrollYProgress} bgX={bgX} bgRedMix={bgRedMix} />

        <div className="relative z-[1] mx-auto mb-6 flex w-full max-w-6xl items-end justify-between px-4 sm:px-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-text-2)]">
              <span className="h-px w-8 bg-[var(--color-border)]" />
              Featured
            </div>
            <h2 className="mt-2 font-display text-4xl leading-tight text-[var(--color-text-0)] md:text-6xl">
              Featured Work.
            </h2>
          </div>
          <div className="hidden text-right font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-text-2)] md:block">
            Scroll →
          </div>
        </div>

        <motion.div style={{ x }} className="relative z-[1] flex gap-6 px-[10vw]">
          {featured.map((p, i) => (
            <div key={p.slug} className="shrink-0 w-[80vw] md:w-[60vw] lg:w-[44vw]">
              <FeaturedCardMotion project={p} index={i} progress={scrollYProgress} total={total} />
            </div>
          ))}
          <div className="shrink-0 w-[80vw] md:w-[60vw] lg:w-[44vw]">
            <Link
              href="/work"
              className="hud-panel group flex h-full min-h-[420px] flex-col items-center justify-center gap-3 p-12 text-center transition-colors hover:border-[var(--color-accent)]"
            >
              <span className="font-display text-3xl text-[var(--color-text-0)] md:text-4xl">
                See every project
              </span>
              <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-text-1)] transition-colors group-hover:text-[var(--color-accent)]">
                Browse the full grid
                <DiagonalArrow />
              </span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/**
 * Smooth, single-piece red bg.
 *  - Solid base layer fades from #050204 (near-black) to #1a0608 (deep red)
 *  - One soft red glow that drifts with the rail, no edges, no stripes
 *  - Faint vignette to keep cards readable
 * Built so there is no visible boundary between this section and adjacent
 * sections, the global cyber grid still shows through the partially
 * transparent layers, so it stitches in instead of cutting hard.
 */
function SmoothRedBg({
  progress,
  bgX,
  bgRedMix,
}: {
  progress: MotionValue<number>;
  bgX: MotionValue<string>;
  bgRedMix: MotionValue<number>;
}) {
  const baseBg = useTransform(
    bgRedMix,
    (m) =>
      `linear-gradient(180deg, rgba(5,2,4,${0.92 - m * 0.18}) 0%, rgba(${Math.round(
        5 + m * 35,
      )},${Math.round(2 + m * 4)},${Math.round(4 + m * 8)},${0.94 - m * 0.06}) 100%)`,
  );
  const glowBg = useTransform(
    bgX,
    (x) =>
      `radial-gradient(50% 80% at ${x} 50%, color-mix(in oklab, var(--color-accent) 28%, transparent) 0%, color-mix(in oklab, var(--color-accent) 8%, transparent) 45%, transparent 75%)`,
  );
  const glowOpacity = useTransform(progress, [0, 0.2, 1], [0, 0.55, 0.85]);

  return (
    <>
      {/* Base black to deep red wash */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: baseBg }}
      />
      {/* Travelling soft red glow, no edges */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: glowBg, opacity: glowOpacity }}
      />
      {/* Top + bottom feathered edges so the section blends seamlessly into
          adjacent areas, no hard horizontal lines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[18vh]"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.85), transparent)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[18vh]"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.85), transparent)",
        }}
      />
    </>
  );
}

function FeaturedCardMotion({
  project: p,
  index,
  progress,
  total,
}: {
  project: (typeof projects)[number];
  index: number;
  progress: MotionValue<number>;
  total: number;
}) {
  const slot = index / Math.max(1, total - 1);

  // Soft accent wash that peaks when the card is centered. No stripes.
  const peakOpacity = useTransform(progress, (v) => {
    const dist = Math.abs(v - slot);
    return Math.max(0, 0.5 - dist * 1.4);
  });

  return (
    <Link
      href={`/work/${p.slug}`}
      className="hud-panel hud-panel-hover group relative block h-full min-h-[420px] overflow-hidden p-8 transition-colors"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-40"
        style={{ background: "var(--color-accent)" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 50%, color-mix(in oklab, var(--color-accent) 36%, transparent), transparent 70%)",
          opacity: peakOpacity,
          mixBlendMode: "screen",
        }}
      />
      <div className="absolute inset-0 bg-noise opacity-[0.04] mix-blend-overlay" />
      <CardBody p={p} />
    </Link>
  );
}

function FeaturedCardStatic({ project: p }: { project: (typeof projects)[number] }) {
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
      <div className="mt-auto flex flex-wrap items-center gap-2 pt-8">
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
