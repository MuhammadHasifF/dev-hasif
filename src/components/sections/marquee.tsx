"use client";

import { OrgLogo } from "@/components/primitives/org-tag";

const orgs = [
  "sit",
  "spf",
  "htx",
  "mom",
  "deloitte",
  "hitachi",
  "temasek-poly",
  "govtech",
  "harvard",
  "uipath",
];

export function Marquee() {
  const items = [...orgs, ...orgs];
  return (
    <section
      aria-label="Organizations I've worked with"
      className="relative border-y border-[var(--color-border)] bg-[var(--color-bg-1)]/40 py-10"
    >
      <div className="mb-4 px-4 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-text-2)] sm:px-6">
        Where the work has landed
      </div>
      <div className="mask-fade-x overflow-hidden">
        <div className="flex min-w-max gap-12 animate-[var(--animate-marquee)] hover:[animation-play-state:paused]">
          {items.map((key, i) => (
            <div key={`${key}-${i}`} className="flex items-center gap-3 opacity-60 transition hover:opacity-100">
              <OrgLogo orgKey={key} size="lg" />
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-text-1)]">
                {key.replace("-", " ")}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
