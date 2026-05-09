"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/primitives/section";
import { Reveal } from "@/components/primitives/reveal";

export function AboutTeaser() {
  return (
    <Section
      id="about"
      eyebrow="ABOUT"
      index={1}
      total={7}
      stamp="// ORIGIN"
      title={["Engineer.", "Researcher.", "Builder."]}
    >
      <div className="grid items-start gap-12 md:grid-cols-2">
        <Reveal>
          <p className="text-pretty text-lg leading-relaxed text-[var(--color-text-0)]/90">
            Applied AI undergraduate and full-stack engineer shipping{" "}
            <span className="text-[var(--color-accent)]">data products</span>{" "}
            end-to-end , {" "}
            <span className="text-[var(--color-accent)]">data pipelines</span>,{" "}
            <span className="text-[var(--color-accent)]">predictive modeling</span>,{" "}
            <span className="text-[var(--color-accent)]">LLM applications</span>, and
            the web platforms that surface insights to real users.
          </p>
          <p className="mt-6 max-w-xl text-[var(--color-text-1)]">
            I&rsquo;ve built ML forecasting pipelines at Deloitte, real-time 3D
            web platforms at SIT, and analytics dashboards across government
            engagements. Comfortable across the modern data and web stack , 
            Python, SQL, TypeScript, React/Next.js, scikit-learn, LangChain , 
            with a working knowledge of cybersecurity and automation from time
            spent in a national SOC and on RPA projects.
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
