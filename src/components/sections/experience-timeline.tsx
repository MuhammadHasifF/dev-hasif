"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { experience } from "@/content/experience";
import { Section } from "@/components/primitives/section";
import { OrgLogo } from "@/components/primitives/org-tag";
import { Chip } from "@/components/primitives/chip";
import { cn } from "@/lib/utils";

export function ExperienceTimeline() {
  const [open, setOpen] = useState<string | null>(experience[0]?.company ?? null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start 80%", "end 30%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <Section
      id="experience"
      eyebrow="EXPERIENCE"
      index={4}
      total={8}
      stamp="// TIMELINE"
      title={["Six roles. Six", "very different playbooks."]}
      intro="From research engineering to a Security Operations Center to a national Police Force. I've shipped across the stack and the chain of command."
    >
      <div ref={wrapRef} className="relative">
        <div
          aria-hidden="true"
          className="absolute left-[18px] top-0 h-full w-px md:left-1/2 md:-translate-x-1/2"
          style={{
            background:
              "linear-gradient(var(--color-border), color-mix(in oklab, var(--color-border) 80%, transparent), var(--color-border))",
          }}
        />
        <motion.div
          aria-hidden="true"
          style={{ height: lineHeight }}
          className="absolute left-[18px] top-0 w-px origin-top md:left-1/2 md:-translate-x-1/2"
        >
          <div
            className="h-full w-full"
            style={{
              background:
                "linear-gradient(to bottom, transparent, var(--color-accent), var(--color-accent-2))",
              boxShadow: "0 0 12px color-mix(in oklab, var(--color-accent) 60%, transparent)",
            }}
          />
        </motion.div>
        <ol className="space-y-10 md:space-y-16">
          {experience.map((r, i) => {
            const isLeft = i % 2 === 0;
            const isOpen = open === r.company + r.title;
            const id = r.company + r.title;
            return (
              <li
                key={id}
                className="relative grid grid-cols-[44px_1fr] items-start gap-4 md:grid-cols-[1fr_44px_1fr] md:gap-10"
              >
                <div className="relative z-10 flex h-10 w-10 items-center justify-center md:col-start-2 md:mx-auto">
                  <span className="absolute inset-0 rounded-full bg-[var(--color-bg-0)]" />
                  <motion.span
                    initial={{ scale: 0.6, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                    className="relative flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg-1)]"
                  >
                    <OrgLogo orgKey={r.orgKey} size="sm" />
                  </motion.span>
                </div>
                <div className={cn("min-w-0", isLeft ? "md:col-start-1 md:row-start-1" : "md:col-start-3 md:row-start-1")}>
                  <RoleCard r={r} isOpen={isOpen} onToggle={() => setOpen(isOpen ? null : id)} align="left" />
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}

function RoleCard({
  r,
  isOpen,
  onToggle,
  align,
}: {
  r: (typeof experience)[number];
  isOpen: boolean;
  onToggle: () => void;
  align: "left" | "right";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
      className={cn(
        "hud-panel hud-panel-hover group p-5 text-left transition-colors",
        align === "right" && "text-left"
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <Chip>{r.type}</Chip>
        <span className="font-mono text-[11px] text-[var(--color-text-2)]">
          {r.start} → {r.end ?? "Present"}
        </span>
      </div>
      <h3 className="mt-3 font-display text-xl leading-tight text-[var(--color-text-0)] md:text-2xl">
        {r.title}
      </h3>
      <div className="mt-1 text-sm text-[var(--color-text-1)]">{r.company}</div>
      <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-1)]">{r.summary}</p>

      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-[var(--color-text-0)]"
      >
        {isOpen ? "Hide highlights" : "Show highlights"}
        <ChevronDown className={cn("h-3 w-3 transition", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
          className="overflow-hidden"
        >
          <ul className="mt-4 space-y-2 border-l border-[var(--color-border)] pl-4 text-sm text-[var(--color-text-1)]">
            {r.highlights.map((h) => (
              <li key={h} className="relative">
                <span className="absolute -left-[21px] top-2 h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                {h}
              </li>
            ))}
          </ul>
          {r.awards && r.awards.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {r.awards.map((a) => (
                <Chip key={a} tone="accent">
                  🏅 {a}
                </Chip>
              ))}
            </div>
          )}
          {r.tech && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {r.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-[var(--color-border)] bg-[var(--color-bg-2)] px-2 py-0.5 font-mono text-[10px] text-[var(--color-text-1)]"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
