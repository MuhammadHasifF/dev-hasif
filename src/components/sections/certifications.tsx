"use client";

import { useEffect, useRef, useState } from "react";
import { Award as AwardIcon, Medal, ShieldCheck, Star, Trophy } from "lucide-react";
import { Section } from "@/components/primitives/section";
import { OrgLogo } from "@/components/primitives/org-tag";
import { certifications } from "@/content/certifications";
import { awards } from "@/content/awards";

function awardGlyph(title: string) {
  const t = title.toLowerCase();
  if (t.includes("best operational")) return Medal;
  if (t.includes("trainee")) return ShieldCheck;
  if (t.includes("chairperson")) return Trophy;
  if (t.includes("edusave")) return AwardIcon;
  return Star;
}

const trophyGradients = [
  "conic-gradient(from 120deg at 50% 50%, color-mix(in oklab, var(--color-accent) 38%, transparent), transparent 38%, color-mix(in oklab, var(--color-accent-2) 26%, transparent) 60%, transparent 90%)",
  "radial-gradient(60% 80% at 30% 30%, color-mix(in oklab, var(--color-accent-3) 32%, transparent), transparent 70%)",
  "conic-gradient(from 220deg at 50% 50%, color-mix(in oklab, var(--color-accent) 32%, transparent), transparent 40%, color-mix(in oklab, var(--color-accent) 18%, transparent) 80%)",
  "radial-gradient(70% 70% at 70% 70%, color-mix(in oklab, var(--color-accent) 38%, transparent), transparent 65%)",
  "conic-gradient(from 60deg at 50% 50%, color-mix(in oklab, var(--color-accent-2) 30%, transparent), transparent 30%, color-mix(in oklab, var(--color-accent-3) 28%, transparent) 60%, transparent 95%)",
  "radial-gradient(80% 60% at 20% 80%, color-mix(in oklab, var(--color-accent) 36%, transparent), transparent 70%)",
];

function useInViewClass(amount = 0.3) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) setInView(e.isIntersecting);
      },
      { threshold: amount },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [amount]);
  return { ref, inView };
}

export function CertificationsAwards() {
  return (
    <Section
      id="credentials"
      eyebrow="CREDENTIALS"
      index={5}
      total={7}
      stamp="// PAPER TRAIL"
      title={["Certifications", "& recognitions."]}
      intro="The paper trail. Certifications, awards, and honors earned along the way."
    >
      <div className="grid gap-10 md:grid-cols-5">
        <div className="md:col-span-3">
          <div className="mb-4 font-mono text-xs uppercase tracking-widest text-[var(--color-text-2)]">
            Certifications
          </div>
          <CertList items={certifications} />
        </div>

        <div className="md:col-span-2">
          <div className="mb-4 font-mono text-xs uppercase tracking-widest text-[var(--color-text-2)]">
            Awards &amp; honors
          </div>
          <TrophyGrid awards={awards} />
        </div>
      </div>
    </Section>
  );
}

function CertList({ items }: { items: typeof certifications }) {
  const { ref, inView } = useInViewClass(0.1);
  return (
    <ol
      ref={ref as React.Ref<HTMLOListElement>}
      className={`hud-panel cert-list overflow-hidden divide-y divide-[var(--color-border)] ${inView ? "in-view" : ""}`}
    >
      {items.map((c, i) => (
        <li
          key={c.title + i}
          className="cert-row flex items-center gap-4 px-4 py-4"
          style={{ animationDelay: `${i * 70}ms` } as React.CSSProperties}
        >
          <OrgLogo orgKey={c.orgKey} size="md" />
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm text-[var(--color-text-0)]">{c.title}</div>
            <div className="text-xs text-[var(--color-text-1)]">{c.issuer}</div>
          </div>
          <div className="font-mono text-[11px] text-[var(--color-text-2)]">{c.date}</div>
        </li>
      ))}
    </ol>
  );
}

function TrophyGrid({ awards: list }: { awards: typeof awards }) {
  const { ref, inView } = useInViewClass(0.15);
  return (
    <div
      ref={ref as React.Ref<HTMLDivElement>}
      className={`trophy-grid grid grid-cols-2 gap-3 ${inView ? "in-view" : ""}`}
    >
      {list.map((a, i) => {
        const Glyph = awardGlyph(a.title);
        const gradient = trophyGradients[i % trophyGradients.length];
        return (
          <div
            key={a.title + a.year + i}
            className="trophy-card group relative aspect-square overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-1)] p-4 transition-colors hover:border-[var(--color-accent)]"
            style={{ animationDelay: `${i * 100}ms` } as React.CSSProperties}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-70 transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: gradient }}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-2 rounded-lg border border-[var(--color-accent)]/15"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-25 mix-blend-overlay"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to bottom, transparent 0 2px, rgba(255,255,255,0.04) 2px 3px)",
              }}
            />
            <div className="relative flex h-full flex-col justify-between">
              <div className="flex items-start justify-between">
                <div
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[var(--color-accent)]/40 bg-[var(--color-bg-2)]/80 text-[var(--color-accent)] shadow-[0_0_18px_-6px_var(--color-accent)] transition-transform duration-500 group-hover:scale-110"
                  aria-hidden="true"
                >
                  <Glyph className="h-4 w-4" />
                </div>
                <div className="font-mono text-[10px] tracking-[0.22em] text-[var(--color-text-2)]">
                  {a.year}
                </div>
              </div>
              <div>
                <div className="text-xs font-medium leading-snug text-[var(--color-text-0)]">
                  {a.title}
                </div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-2)]">
                  {a.issuer}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
