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
      className="relative border-y border-[var(--color-border)] bg-[color:color-mix(in_oklab,var(--color-bg-1)_50%,transparent)]"
    >
      {/* Top mono bar */}
      <div className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-text-2)] sm:px-6">
        <span className="text-[var(--color-text-1)]">{"/// PARTNERS & ORGS"}</span>
        <span className="flex items-center gap-2">
          <span>{orgs.length.toString().padStart(2, "0")} NODES</span>
          <span aria-hidden="true" className="relative inline-flex h-2 w-2 items-center justify-center">
            {/* Outer expanding shockwave ring */}
            <span
              className="absolute inset-0 rounded-full"
              style={{
                background: "var(--color-accent)",
                animation: "var(--animate-pulse-ring)",
              }}
            />
            {/* Hot bloom halo */}
            <span
              className="absolute -inset-1 rounded-full opacity-80"
              style={{
                background:
                  "radial-gradient(circle, color-mix(in oklab, var(--color-accent) 65%, transparent) 0%, transparent 70%)",
                animation: "var(--animate-pulse-soft)",
                filter: "blur(1.5px)",
              }}
            />
            {/* Bright core */}
            <span
              className="relative h-1.5 w-1.5 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, #ffffff 0%, var(--color-accent) 55%, var(--color-accent-2) 100%)",
                boxShadow:
                  "0 0 6px var(--color-accent), 0 0 14px color-mix(in oklab, var(--color-accent) 80%, transparent), 0 0 28px color-mix(in oklab, var(--color-accent) 50%, transparent)",
                animation: "var(--animate-flicker)",
              }}
            />
          </span>
        </span>
      </div>

      <div className="mask-fade-x overflow-hidden py-10">
        <div className="flex min-w-max items-center gap-14 animate-[var(--animate-marquee)] hover:[animation-play-state:paused]">
          {items.map((key, i) => (
            <div key={`${key}-${i}`} className="flex items-center gap-4 opacity-50 transition-opacity duration-300 hover:opacity-100">
              <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--color-text-2)]">{"///"}</span>
              <OrgLogo orgKey={key} size="lg" />
              <span className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--color-text-1)]">
                {key.replace("-", " ")}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
