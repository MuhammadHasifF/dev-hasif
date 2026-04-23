"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useMemo, useState } from "react";
import { AnimatePresence, motion, LayoutGroup } from "framer-motion";
import { projects, projectCategories, type ProjectCategory } from "@/content/projects";
import { Section } from "@/components/primitives/section";
import { OrgLogo } from "@/components/primitives/org-tag";
import { Chip } from "@/components/primitives/chip";
import { cn } from "@/lib/utils";

const bentoSize: Record<number, string> = {
  0: "md:col-span-3 md:row-span-2",
  1: "md:col-span-3 md:row-span-1",
  2: "md:col-span-2 md:row-span-1",
  3: "md:col-span-2 md:row-span-1",
  4: "md:col-span-2 md:row-span-1",
  5: "md:col-span-3 md:row-span-1",
  6: "md:col-span-3 md:row-span-1",
  7: "md:col-span-3 md:row-span-1",
};

export function ProjectsBento() {
  const [filter, setFilter] = useState<ProjectCategory | "All">("All");
  const filtered = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <Section
      id="work"
      eyebrow="Selected work"
      title={<>Built for the field,<br/>tuned for scale.</>}
      intro="A cross-section of research engineering, government operations, cybersecurity, and data work I've led or contributed to."
    >
      <div className="mb-8 flex flex-wrap items-center gap-2">
        {projectCategories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setFilter(c)}
            className={cn(
              "relative inline-flex h-8 items-center rounded-full border px-3 text-xs transition",
              filter === c
                ? "border-transparent bg-[var(--color-text-0)] text-[var(--color-bg-0)]"
                : "border-[var(--color-border)] bg-[var(--color-bg-1)] text-[var(--color-text-1)] hover:text-[var(--color-text-0)]"
            )}
          >
            {c}
          </button>
        ))}
        <div className="ml-auto hidden font-mono text-[10px] uppercase tracking-widest text-[var(--color-text-2)] md:block">
          {filtered.length} project{filtered.length === 1 ? "" : "s"}
        </div>
      </div>

      <LayoutGroup id="projects-bento">
        <div className="grid auto-rows-[minmax(170px,auto)] grid-cols-1 gap-4 md:grid-cols-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.div
                key={p.slug}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                className={cn("group", bentoSize[i % 8] ?? "md:col-span-3 md:row-span-1")}
              >
                <Link
                  href={`/work/${p.slug}`}
                  className="relative flex h-full min-h-[170px] flex-col justify-between overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-1)] p-6 transition-colors hover:border-[var(--color-accent)]/60"
                >
                  <div
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                      "bg-gradient-to-br",
                      p.hue ?? "from-[var(--color-accent)] to-[var(--color-accent-2)]"
                    )}
                    style={{ maskImage: "radial-gradient(ellipse at top left, black 30%, transparent 70%)" }}
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 opacity-[0.04] bg-[radial-gradient(circle_at_1px_1px,var(--color-text-0)_1px,transparent_1px)] [background-size:14px_14px]"
                  />
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <OrgLogo orgKey={p.orgKey} size="md" />
                      <Chip>{p.category}</Chip>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-[var(--color-text-2)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                  <div className="mt-6">
                    <h3 className="font-display text-xl leading-tight text-[var(--color-text-0)] md:text-2xl">
                      {p.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-[var(--color-text-1)]">{p.tagline}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {p.stack.slice(0, 4).map((s) => (
                        <span
                          key={s}
                          className="rounded-md border border-[var(--color-border)] bg-[var(--color-bg-2)] px-2 py-0.5 font-mono text-[10px] text-[var(--color-text-1)]"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-[var(--color-text-2)]">
                    <span>{p.year}</span>
                    <span>{p.org}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </LayoutGroup>

      <div className="mt-10 flex justify-center">
        <Link
          href="/work"
          className="inline-flex h-10 items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-1)] px-5 text-sm text-[var(--color-text-0)] hover:border-[var(--color-accent)]"
        >
          All projects <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </Section>
  );
}
