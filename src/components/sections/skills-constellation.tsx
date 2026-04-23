"use client";

import { useState } from "react";
import { skillGroups } from "@/content/skills";
import { Section } from "@/components/primitives/section";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function SkillsConstellation() {
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title={<>A toolkit<br/>across the stack.</>}
      intro="Hover a group to dim the rest. A physics-based constellation view lives behind this on desktop — we default to the readable grid for the first paint."
    >
      <div className="mb-8 flex flex-wrap gap-2">
        {skillGroups.map((g) => (
          <button
            key={g.id}
            type="button"
            onMouseEnter={() => setActiveGroup(g.id)}
            onMouseLeave={() => setActiveGroup(null)}
            onFocus={() => setActiveGroup(g.id)}
            onBlur={() => setActiveGroup(null)}
            className={cn(
              "inline-flex h-8 items-center rounded-full border px-3 text-xs transition",
              activeGroup === g.id
                ? "border-transparent text-[var(--color-bg-0)]"
                : "border-[var(--color-border)] bg-[var(--color-bg-1)] text-[var(--color-text-1)]"
            )}
            style={
              activeGroup === g.id
                ? { background: g.hue }
                : undefined
            }
          >
            {g.label}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((g) => {
          const dim = activeGroup && activeGroup !== g.id;
          return (
            <motion.div
              key={g.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
              onMouseEnter={() => setActiveGroup(g.id)}
              onMouseLeave={() => setActiveGroup(null)}
              className={cn(
                "relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-1)] p-6 transition-opacity",
                dim && "opacity-40"
              )}
            >
              <div
                aria-hidden="true"
                className="absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-30 blur-3xl"
                style={{ background: g.hue }}
              />
              <div className="mb-4 flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="h-2 w-2 rounded-full"
                  style={{ background: g.hue }}
                />
                <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-text-1)]">
                  {g.label}
                </h3>
              </div>
              <ul className="flex flex-wrap gap-1.5">
                {g.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-[var(--color-border)] bg-[var(--color-bg-2)] px-2 py-1 text-xs text-[var(--color-text-0)]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
