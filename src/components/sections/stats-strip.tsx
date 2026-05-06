"use client";

import { Reveal } from "@/components/primitives/reveal";
import { StatCounter } from "@/components/primitives/stat-counter";
import { projects } from "@/content/projects";
import { experience } from "@/content/experience";
import { certifications } from "@/content/certifications";
import { awards } from "@/content/awards";

export function StatsStrip() {
  const stats = [
    { value: projects.length,        suffix: "", label: "PROJECTS",    code: "PRJ" },
    { value: experience.length,      suffix: "", label: "ROLES · 6 ORGS", code: "ROL" },
    { value: certifications.length,  suffix: "", label: "CERTS",       code: "CRT" },
    { value: awards.length,          suffix: "", label: "AWARDS",      code: "AWD" },
  ];

  return (
    <section className="relative mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <Reveal>
        <div className="grid grid-cols-2 gap-px overflow-hidden border border-[var(--color-border)] bg-[var(--color-border)] md:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="relative bg-[var(--color-bg-1)] p-6 transition-colors hover:bg-[var(--color-bg-2)]"
            >
              <div className="mb-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-text-2)]">
                <span className="text-[var(--color-accent)]">[{s.code}]</span>
                <span>{s.label}</span>
              </div>
              <div className="font-display text-4xl text-[var(--color-text-0)] md:text-5xl">
                <StatCounter value={s.value} suffix={s.suffix} />
                <span className="text-[var(--color-accent)]">+</span>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
