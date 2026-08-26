"use client";

import { useEffect, useRef, useState } from "react";
import { skillGroups } from "@/content/skills";
import { Section } from "@/components/primitives/section";
import { cn } from "@/lib/utils";

/**
 * SKILLS, flat HUD grid. Each chip glitches in red on viewport entry via
 * pure CSS keyframes, driven by ONE IntersectionObserver per group panel.
 * Cheap to paint even with 80+ chips on the page.
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
              <SkillChipList items={g.items} />
            </div>
          );
        })}
      </div>
    </Section>
  );
}

function SkillChipList({ items }: { items: string[] }) {
  const ref = useRef<HTMLUListElement>(null);
  const [inView, setInView] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) setInView(e.isIntersecting);
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <ul
      ref={ref}
      className={`flex flex-wrap gap-1.5 skill-chip-list ${inView ? "in-view" : ""}`}
    >
      {items.map((item, i) => (
        <li
          key={item}
          className="skill-chip-glitch rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-2)] px-2 py-1 font-mono text-[11px] text-[var(--color-text-0)]"
          style={{ animationDelay: `${i * 32}ms` } as React.CSSProperties}
        >
          {item}
        </li>
      ))}
    </ul>
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
