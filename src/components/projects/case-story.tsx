"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

type Project = {
  title: string;
  description: string;
  outcomes?: string[];
  impact?: string[];
  stack: string[];
  hue?: string;
};

export function CaseStory({ project: p }: { project: Project }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const sections: { eyebrow: string; title: string; body: string | string[] }[] = [
    {
      eyebrow: "Overview",
      title: "What this is",
      body: p.description,
    },
    ...(p.outcomes && p.outcomes.length > 0
      ? [{ eyebrow: "Outcomes", title: "What it shipped", body: p.outcomes }]
      : []),
    ...(p.impact && p.impact.length > 0
      ? [{ eyebrow: "Impact", title: "What it changed", body: p.impact }]
      : []),
    {
      eyebrow: "Approach",
      title: "How it came together",
      body:
        "A fuller MDX writeup with screenshots, architecture diagrams, and decision notes lands as the content matures. Reach out if you'd like to dig in.",
    },
  ];

  const visualRotate = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const visualHue = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const visualFilter = useTransform(visualHue, (v) => `hue-rotate(${v}deg)`);

  if (reduce) {
    return (
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        {sections.map((s, i) => (
          <div key={i} className="mb-10">
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-text-2)]">
              {s.eyebrow}
            </div>
            <h2 className="mt-2 font-display text-3xl text-[var(--color-text-0)]">{s.title}</h2>
            <BodyContent body={s.body} />
          </div>
        ))}
      </section>
    );
  }

  return (
    <section
      ref={ref}
      className="relative mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 sm:px-6 md:grid-cols-12 md:gap-12"
    >
      <div className="md:col-span-7">
        {sections.map((s, i) => (
          <StoryBlock key={i} section={s} progress={scrollYProgress} index={i} total={sections.length} />
        ))}
      </div>

      <aside className="hidden md:col-span-5 md:block">
        <div className="sticky top-24 flex flex-col items-center justify-center">
          <motion.div
            style={{ rotate: visualRotate, filter: visualFilter }}
            className="hud-panel relative aspect-square w-[88%] overflow-hidden p-0"
          >
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  "conic-gradient(from 0deg, color-mix(in oklab, var(--color-accent) 22%, transparent), transparent 30%, color-mix(in oklab, var(--color-accent-2) 18%, transparent), transparent 65%, color-mix(in oklab, var(--color-accent) 22%, transparent))",
              }}
            />
            <div className="absolute inset-0 bg-scanlines opacity-30" />
            <div className="absolute inset-0 bg-noise opacity-[0.04] mix-blend-overlay" />
            <div className="absolute inset-4 border border-[var(--color-accent)]/30" />
            <div className="absolute inset-8 border border-[var(--color-accent)]/15" />
            <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-accent)] shadow-[0_0_12px_var(--color-accent)]" />
            <div className="absolute bottom-3 left-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-text-0)]/80">
              <span className="text-[var(--color-accent)]">›</span> {p.title}
            </div>
          </motion.div>
          <div className="mt-6 flex flex-wrap justify-center gap-1.5 px-6">
            {p.stack.slice(0, 6).map((s) => (
              <span
                key={s}
                className="rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-2)] px-2 py-0.5 font-mono text-[10px] text-[var(--color-text-1)]"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </aside>
    </section>
  );
}

function StoryBlock({
  section,
  progress,
  index,
  total,
}: {
  section: { eyebrow: string; title: string; body: string | string[] };
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  index: number;
  total: number;
}) {
  const start = index / total;
  const peak = (index + 0.5) / total;
  const end = (index + 1) / total;
  const opacity = useTransform(progress, [start, peak, end], [0.4, 1, 0.5]);
  const x = useTransform(progress, [start, peak], [-30, 0]);

  return (
    <motion.div
      style={{ opacity, x }}
      className="flex min-h-[60vh] flex-col justify-center py-12 first:pt-0"
    >
      <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-text-2)]">
        {section.eyebrow}
      </div>
      <h2 className="mt-2 font-display text-3xl text-[var(--color-text-0)] md:text-5xl">
        {section.title}
      </h2>
      <BodyContent body={section.body} />
    </motion.div>
  );
}

function BodyContent({ body }: { body: string | string[] }) {
  if (Array.isArray(body)) {
    return (
      <ul className="mt-6 space-y-3 text-base text-[var(--color-text-1)] md:text-lg">
        {body.map((b) => (
          <li key={b} className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--color-text-1)] md:text-lg">
      {body}
    </p>
  );
}
