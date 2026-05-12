"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { skillGroups } from "@/content/skills";
import { Section } from "@/components/primitives/section";
import { cn } from "@/lib/utils";

/**
 * SKILLS, flat HUD grid. Per-chip red glitch reveal on viewport entry
 * (re-triggers on scroll up + down). Group panels themselves don't move,
 * only the chips inside.
 */
export function SkillsConstellation() {
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

  return (
    <Section
      id="skills"
      eyebrow="SKILLS"
      index={4}
      total={7}
      stamp="// STACK"
      title={["A toolkit", "across the stack."]}
      intro="Filter by group to highlight the cluster. Each cell is a discrete capability, not a marketing word."
    >
      <div className="mb-6 flex flex-wrap gap-2">
        <FilterChip
          active={activeGroup === null}
          onMouseEnter={() => setActiveGroup(null)}
          onFocus={() => setActiveGroup(null)}
          color="var(--color-accent)"
        >
          ALL
        </FilterChip>
        {skillGroups.map((g) => (
          <FilterChip
            key={g.id}
            active={activeGroup === g.id}
            onMouseEnter={() => setActiveGroup(g.id)}
            onMouseLeave={() => setActiveGroup(null)}
            onFocus={() => setActiveGroup(g.id)}
            onBlur={() => setActiveGroup(null)}
            color={g.hue}
          >
            {g.label}
          </FilterChip>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((g) => {
          const dim = activeGroup && activeGroup !== g.id;
          return (
            <div
              key={g.id}
              className={cn(
                "hud-panel hud-panel-hover relative overflow-hidden p-6 transition-opacity",
                dim && "opacity-30",
              )}
            >
              <div
                aria-hidden="true"
                className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-25 blur-3xl"
                style={{ background: g.hue }}
              />
              <div className="mb-4 flex items-center gap-2">
                <span aria-hidden="true" className="h-2 w-2 rounded-full" style={{ background: g.hue }} />
                <h3 className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-text-1)]">
                  {g.label}
                </h3>
                <span className="ml-auto font-mono text-[10px] text-[var(--color-text-2)]">
                  {String(g.items.length).padStart(2, "0")}
                </span>
              </div>
              <ul className="flex flex-wrap gap-1.5">
                {g.items.map((item, i) => (
                  <GlitchChip key={item} delay={i * 0.04} item={item} />
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

function GlitchChip({ item, delay }: { item: string; delay: number }) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <motion.li
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { duration: 0.25, delay } }}
        viewport={{ once: false, amount: 0.5 }}
        className="rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-2)] px-2 py-1 font-mono text-[11px] text-[var(--color-text-0)]"
      >
        {item}
      </motion.li>
    );
  }

  return (
    <motion.li
      initial="hidden"
      whileInView="visible"
      exit="hidden"
      viewport={{ once: false, amount: 0.4 }}
      className="relative inline-block"
      style={{ willChange: "transform, opacity" }}
    >
      {/* Red noise placeholder, visible just before the chip resolves */}
      <motion.span
        aria-hidden="true"
        variants={{
          hidden: { opacity: 0.95 },
          visible: {
            opacity: [0.95, 1, 0.6, 0],
            transition: { duration: 0.35, delay, ease: "linear", times: [0, 0.25, 0.6, 1] },
          },
        }}
        className="pointer-events-none absolute inset-0 z-[1] rounded-sm"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent 0 1px, color-mix(in oklab, var(--color-accent) 70%, transparent) 1px 2px)",
          backgroundColor: "color-mix(in oklab, var(--color-accent) 20%, #0a0306)",
          boxShadow:
            "inset 0 0 0 1px color-mix(in oklab, var(--color-accent) 80%, transparent), 0 0 12px color-mix(in oklab, var(--color-accent) 50%, transparent)",
        }}
      />
      {/* Red RGB-shift ghost */}
      <motion.span
        aria-hidden="true"
        variants={{
          hidden: { x: -4, opacity: 0.7 },
          visible: {
            x: [-4, 3, -2, 0],
            opacity: [0.7, 0.4, 0.15, 0],
            transition: { duration: 0.45, delay, ease: "linear", times: [0, 0.35, 0.7, 1] },
          },
        }}
        className="pointer-events-none absolute inset-0 rounded-sm font-mono text-[11px]"
        style={{
          color: "var(--color-accent)",
          mixBlendMode: "screen",
          padding: "4px 8px",
        }}
      >
        {item}
      </motion.span>
      <motion.span
        variants={{
          hidden: { opacity: 0, filter: "blur(3px)" },
          visible: {
            opacity: [0, 0, 0.4, 0.2, 1],
            filter: ["blur(3px)", "blur(3px)", "blur(1px)", "blur(2px)", "blur(0px)"],
            transition: { duration: 0.5, delay, ease: "linear", times: [0, 0.15, 0.35, 0.55, 1] },
          },
        }}
        className="relative inline-block rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-2)] px-2 py-1 font-mono text-[11px] text-[var(--color-text-0)]"
      >
        {item}
      </motion.span>
    </motion.li>
  );
}

function FilterChip({
  active,
  color,
  children,
  ...rest
}: {
  active: boolean;
  color: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex h-8 items-center rounded-sm border px-3 font-mono text-[10px] uppercase tracking-[0.18em] transition",
        active
          ? "text-white"
          : "border-[var(--color-border)] bg-[var(--color-bg-1)] text-[var(--color-text-1)] hover:text-[var(--color-text-0)]",
      )}
      style={active ? { background: color, borderColor: color } : undefined}
      {...rest}
    >
      {children}
    </button>
  );
}
