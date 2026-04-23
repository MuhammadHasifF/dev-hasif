"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/primitives/section";
import { Reveal } from "@/components/primitives/reveal";
import { useRef } from "react";

export function AboutTeaser() {
  const cardRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(1200px) rotateX(${-y * 6}deg) rotateY(${x * 8}deg)`;
  };
  const onLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = "perspective(1200px) rotateX(0) rotateY(0)";
  };

  return (
    <Section eyebrow="About" title={<span>Engineer. Researcher.<br/>Operator.</span>}>
      <div className="grid items-start gap-12 md:grid-cols-2">
        <Reveal>
          <p className="text-pretty text-lg leading-relaxed text-[var(--color-text-0)]/90">
            Analytically driven and technically versatile, with hands-on
            experience across <span className="text-[var(--color-accent)]">data analysis</span>,
            <span className="text-[var(--color-accent-2)]"> cybersecurity</span>,
            <span className="text-[var(--color-accent-3)]"> automation</span>, and
            operational technology. I&rsquo;ve supported national-level
            initiatives through real-time data systems, geospatial dashboards,
            RPA solutions, and predictive modeling.
          </p>
          <p className="mt-6 max-w-xl text-[var(--color-text-1)]">
            Known for leading teams under pressure, adapting quickly in dynamic
            environments, and communicating complex ideas with clarity. My
            work sits at the intersection of research, engineering, and the
            operators who rely on both.
          </p>
          <div className="mt-8">
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-0)]"
            >
              Read the long version
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            ref={cardRef}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-2)] transition-transform duration-300 ease-[var(--ease-apple)] will-change-transform"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 30% 20%, color-mix(in oklab, var(--color-accent) 35%, transparent), transparent 60%), radial-gradient(circle at 70% 80%, color-mix(in oklab, var(--color-accent-2) 30%, transparent), transparent 60%)",
              }}
            />
            <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay" />
            <div className="absolute left-0 bottom-0 p-6 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-text-1)]">
              <div>MHMD HASIF</div>
              <div className="text-[var(--color-text-2)]">SG · 2026</div>
            </div>
            <div className="absolute right-6 top-6 text-right font-display text-5xl leading-none text-[var(--color-text-0)]">
              H.
            </div>
            {/* If a real photo is dropped at /me.jpg the gradient card sits as a fallback. */}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
