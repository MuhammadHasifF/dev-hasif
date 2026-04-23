"use client";

import { Section } from "@/components/primitives/section";
import { OrgLogo } from "@/components/primitives/org-tag";
import { certifications } from "@/content/certifications";
import { awards } from "@/content/awards";
import { Reveal } from "@/components/primitives/reveal";

export function CertificationsAwards() {
  return (
    <Section
      id="credentials"
      eyebrow="Credentials"
      title={<>Certifications<br/>&amp; recognitions.</>}
      intro="The paper trail — certifications, awards, and honors earned along the way."
    >
      <div className="grid gap-10 md:grid-cols-5">
        <div className="md:col-span-3">
          <div className="mb-4 font-mono text-xs uppercase tracking-widest text-[var(--color-text-2)]">
            Certifications
          </div>
          <ol className="divide-y divide-[var(--color-border)] overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-1)]">
            {certifications.map((c, i) => (
              <li key={c.title + i} className="flex items-center gap-4 px-4 py-4">
                <OrgLogo orgKey={c.orgKey} size="md" />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm text-[var(--color-text-0)]">{c.title}</div>
                  <div className="text-xs text-[var(--color-text-1)]">{c.issuer}</div>
                </div>
                <div className="font-mono text-[11px] text-[var(--color-text-2)]">{c.date}</div>
              </li>
            ))}
          </ol>
        </div>

        <div className="md:col-span-2">
          <div className="mb-4 font-mono text-xs uppercase tracking-widest text-[var(--color-text-2)]">
            Awards &amp; honors
          </div>
          <div className="grid grid-cols-2 gap-3">
            {awards.map((a, i) => (
              <Reveal key={a.title + i} delay={i * 0.04}>
                <div className="group relative aspect-square overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-1)] p-4">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-60 transition-opacity group-hover:opacity-100"
                    style={{
                      background:
                        "conic-gradient(from 120deg at 50% 50%, color-mix(in oklab, var(--color-accent) 30%, transparent), transparent 40%, color-mix(in oklab, var(--color-accent-2) 25%, transparent) 60%, transparent 90%)",
                    }}
                  />
                  <div className="relative flex h-full flex-col justify-between">
                    <div className="font-display text-2xl leading-none text-[var(--color-text-0)]">
                      ★
                    </div>
                    <div>
                      <div className="text-xs font-medium text-[var(--color-text-0)]">{a.title}</div>
                      <div className="mt-1 font-mono text-[10px] text-[var(--color-text-2)]">
                        {a.issuer} · {a.year}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
