"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
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

  // Translate the rail from 0 → -(N-1) * card width (in vw units approx).
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-78%"]);

  if (reduce) {
    return (
      <Section
        eyebrow="FEATURED"
        index={2}
        total={8}
        stamp="// CASE FILES"
        title={["Selected work."]}
      >
        <div className="grid gap-4 md:grid-cols-2">
          {featured.map((p) => (
            <FeaturedCard key={p.slug} project={p} />
          ))}
        </div>
      </Section>
    );
  }

  return (
    <section
      ref={targetRef}
      aria-label="Featured projects rail"
      className="relative h-[400vh]"
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mx-auto mb-6 flex w-full max-w-6xl items-end justify-between px-4 sm:px-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-text-2)]">
              <span className="h-px w-8 bg-[var(--color-border)]" />
              Featured
            </div>
            <h2 className="mt-2 font-display text-4xl leading-tight text-[var(--color-text-0)] md:text-6xl">
              Selected work, side-scrolled.
            </h2>
          </div>
          <div className="hidden text-right font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-text-2)] md:block">
            Scroll →
          </div>
        </div>

        <motion.div style={{ x }} className="flex gap-6 px-[10vw]">
          {featured.map((p) => (
            <div key={p.slug} className="shrink-0 w-[80vw] md:w-[60vw] lg:w-[44vw]">
              <FeaturedCard project={p} />
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

function FeaturedCard({ project: p }: { project: (typeof projects)[number] }) {
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
      <div className="absolute inset-0 bg-noise opacity-[0.04] mix-blend-overlay" />
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
    </Link>
  );
}
