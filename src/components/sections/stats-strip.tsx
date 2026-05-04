"use client";

import { Reveal } from "@/components/primitives/reveal";
import { StatCounter } from "@/components/primitives/stat-counter";
import { projects } from "@/content/projects";
import { experience } from "@/content/experience";
import { certifications } from "@/content/certifications";
import { awards } from "@/content/awards";

export function StatsStrip() {
  const stats = [
    { value: projects.length, suffix: "", label: "Projects shipped" },
    { value: experience.length, suffix: "", label: "Roles, six orgs" },
    { value: certifications.length, suffix: "", label: "Certifications" },
    { value: awards.length, suffix: "", label: "Awards & honours" },
  ];

  return (
    <section className="relative mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <Reveal>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-border)] md:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-[var(--color-bg-1)] p-6 transition-colors hover:bg-[var(--color-bg-2)]"
            >
              <div className="font-display text-4xl text-[var(--color-text-0)] md:text-5xl">
                <StatCounter value={s.value} suffix={s.suffix} />
                <span className="text-[var(--color-accent)]">+</span>
              </div>
              <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-text-2)]">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
