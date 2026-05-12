"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Award as AwardIcon, Medal, ShieldCheck, Star, Trophy } from "lucide-react";
import { Section } from "@/components/primitives/section";
import { OrgLogo } from "@/components/primitives/org-tag";
import { certifications } from "@/content/certifications";
import { awards } from "@/content/awards";

/** Pick a glyph for each award based on its title. Keeps the trophy cards
 *  visually varied without needing per-award imagery. */
function awardGlyph(title: string) {
  const t = title.toLowerCase();
  if (t.includes("best operational")) return Medal;
  if (t.includes("trainee")) return ShieldCheck;
  if (t.includes("chairperson")) return Trophy;
  if (t.includes("edusave")) return AwardIcon;
  return Star;
}

/** Different gradient per index keeps the trophy grid feeling unique. */
const trophyGradients = [
  "conic-gradient(from 120deg at 50% 50%, color-mix(in oklab, var(--color-accent) 38%, transparent), transparent 38%, color-mix(in oklab, var(--color-accent-2) 26%, transparent) 60%, transparent 90%)",
  "radial-gradient(60% 80% at 30% 30%, color-mix(in oklab, var(--color-accent-3) 32%, transparent), transparent 70%)",
  "conic-gradient(from 220deg at 50% 50%, color-mix(in oklab, var(--color-accent) 32%, transparent), transparent 40%, color-mix(in oklab, var(--color-accent) 18%, transparent) 80%)",
  "radial-gradient(70% 70% at 70% 70%, color-mix(in oklab, var(--color-accent) 38%, transparent), transparent 65%)",
  "conic-gradient(from 60deg at 50% 50%, color-mix(in oklab, var(--color-accent-2) 30%, transparent), transparent 30%, color-mix(in oklab, var(--color-accent-3) 28%, transparent) 60%, transparent 95%)",
  "radial-gradient(80% 60% at 20% 80%, color-mix(in oklab, var(--color-accent) 36%, transparent), transparent 70%)",
];

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
        {/* Certifications list — re-triggering stagger reveal */}
        <div className="md:col-span-3">
          <div className="mb-4 font-mono text-xs uppercase tracking-widest text-[var(--color-text-2)]">
            Certifications
          </div>
          <ol className="hud-panel divide-y divide-[var(--color-border)] overflow-hidden">
            {certifications.map((c, i) => (
              <CertRow key={c.title + i} c={c} index={i} />
            ))}
          </ol>
        </div>

        {/* Awards trophy grid */}
        <div className="md:col-span-2">
          <div className="mb-4 font-mono text-xs uppercase tracking-widest text-[var(--color-text-2)]">
            Awards &amp; honors
          </div>
          <div className="grid grid-cols-2 gap-3">
            {awards.map((a, i) => (
              <TrophyCard key={a.title + a.year + i} award={a} index={i} />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function CertRow({
  c,
  index,
}: {
  c: (typeof certifications)[number];
  index: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.li
      initial={reduce ? { opacity: 0 } : { opacity: 0, x: -14 }}
      whileInView={{ opacity: 1, x: 0, transition: { duration: 0.45, delay: index * 0.05, ease: [0.32, 0.72, 0, 1] } }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, x: -14 }}
      viewport={{ once: false, amount: 0.4 }}
      className="flex items-center gap-4 px-4 py-4"
    >
      <OrgLogo orgKey={c.orgKey} size="md" />
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm text-[var(--color-text-0)]">{c.title}</div>
        <div className="text-xs text-[var(--color-text-1)]">{c.issuer}</div>
      </div>
      <div className="font-mono text-[11px] text-[var(--color-text-2)]">{c.date}</div>
    </motion.li>
  );
}

function TrophyCard({
  award,
  index,
}: {
  award: (typeof awards)[number];
  index: number;
}) {
  const reduce = useReducedMotion();
  const Glyph = awardGlyph(award.title);
  const gradient = trophyGradients[index % trophyGradients.length];

  if (reduce) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { duration: 0.35 } }}
        viewport={{ once: false, amount: 0.4 }}
        className="group relative aspect-square overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-1)] p-4"
      >
        <TrophyInner award={award} Glyph={Glyph} gradient={gradient} />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      exit="hidden"
      viewport={{ once: false, amount: 0.4 }}
      variants={{
        hidden: { opacity: 0, rotateY: -85, scale: 0.85 },
        visible: {
          opacity: 1,
          rotateY: 0,
          scale: 1,
          transition: {
            duration: 0.7,
            delay: index * 0.08,
            ease: [0.32, 0.72, 0, 1],
          },
        },
      }}
      style={{ transformPerspective: 800, transformStyle: "preserve-3d" }}
      className="group relative aspect-square overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-1)] p-4 transition-colors hover:border-[var(--color-accent)]"
    >
      <TrophyInner award={award} Glyph={Glyph} gradient={gradient} />
    </motion.div>
  );
}

function TrophyInner({
  award,
  Glyph,
  gradient,
}: {
  award: (typeof awards)[number];
  Glyph: typeof Star;
  gradient: string;
}) {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: gradient }}
      />
      {/* Faint border ring */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-2 rounded-lg border border-[var(--color-accent)]/15"
      />
      {/* Scanline shimmer */}
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
            {award.year}
          </div>
        </div>
        <div>
          <div className="text-xs font-medium leading-snug text-[var(--color-text-0)]">
            {award.title}
          </div>
          <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-2)]">
            {award.issuer}
          </div>
        </div>
      </div>
    </>
  );
}
