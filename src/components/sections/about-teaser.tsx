"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/primitives/section";
import { Reveal } from "@/components/primitives/reveal";

export function AboutTeaser() {
  return (
    <Section
      eyebrow="ABOUT"
      index={1}
      total={8}
      stamp="// ORIGIN"
      title={["Engineer.", "Researcher.", "Operator."]}
    >
      <div className="grid items-start gap-12 md:grid-cols-2">
        <Reveal>
          <p className="text-pretty text-lg leading-relaxed text-[var(--color-text-0)]/90">
            Analytically driven and technically versatile, with hands-on
            experience across <span className="text-[var(--color-accent)]">data analysis</span>,{" "}
            <span className="text-[var(--color-accent)]">cybersecurity</span>,{" "}
            <span className="text-[var(--color-accent)]">automation</span>, and
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
              className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-text-0)] transition-colors hover:text-[var(--color-accent)]"
            >
              Read the long version
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <figure className="hud-panel relative aspect-[4/5] overflow-hidden p-0">
            <Image
              src="/me/pagoda.jpg"
              alt="Hōkan-ji Pagoda, Higashiyama, Kyoto"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
              priority={false}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.45) 70%, rgba(0,0,0,0.85) 100%)",
              }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 mix-blend-overlay"
              style={{
                background:
                  "radial-gradient(60% 80% at 70% 90%, color-mix(in oklab, var(--color-accent) 32%, transparent) 0%, transparent 60%)",
              }}
            />
            <div className="absolute inset-0 bg-scanlines opacity-25" />

            <div className="absolute right-5 top-5 text-right">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-text-2)]">
                ID · 001
              </div>
              <div className="mt-1 font-display text-5xl leading-none text-[var(--color-text-0)]">
                H<span className="text-[var(--color-accent)]">.</span>
              </div>
            </div>

            <figcaption className="absolute left-5 bottom-5 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-text-1)]">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)] shadow-[0_0_8px_var(--color-accent)]" />
                <span>HŌKAN-JI · KYOTO</span>
              </div>
              <div className="mt-1 text-[var(--color-text-2)]">SG · NODE_2026</div>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </Section>
  );
}
