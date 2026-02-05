"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Github, Search, X } from "lucide-react";
import { useMemo, useState } from "react";

import { cn } from "@/lib/cn";
import type { Project } from "@/content/projects";
import { Badge } from "@/components/ui/badge";

type SortKey = "featured" | "newest" | "az";

function bySort(sort: SortKey, a: Project, b: Project) {
  if (sort === "az") return a.title.localeCompare(b.title);
  if (sort === "newest") return b.year - a.year;
  if (sort === "featured") {
    const fa = a.featured ? 1 : 0;
    const fb = b.featured ? 1 : 0;
    if (fb !== fa) return fb - fa;
    return b.year - a.year;
  }
  return 0;
}

export function ProjectsGrid({
  projects,
  className,
}: {
  projects: Project[];
  className?: string;
}) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [sort, setSort] = useState<SortKey>("featured");

  const tags = useMemo(() => {
    const map = new Map<string, number>();
    for (const p of projects) {
      for (const t of p.tags) map.set(t, (map.get(t) ?? 0) + 1);
    }
    return Array.from(map.entries())
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([t]) => t);
  }, [projects]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects
      .filter((p) => {
        if (!q) return true;
        return (
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
        );
      })
      .filter((p) => (selected.length ? selected.every((t) => p.tags.includes(t)) : true))
      .slice()
      .sort((a, b) => bySort(sort, a, b));
  }, [projects, query, selected, sort]);

  const hasFilters = query.trim().length > 0 || selected.length > 0;

  return (
    <div className={cn("space-y-6", className)}>
      <div className="rounded-3xl border border-border/60 bg-card/30 p-4 shadow-sm backdrop-blur">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects, tags, keywords…"
              className={cn(
                "h-11 w-full rounded-2xl border border-border/60 bg-background/40 pl-10 pr-3 text-sm text-foreground shadow-sm outline-none backdrop-blur",
                "placeholder:text-muted-foreground",
                "focus-visible:ring-2 focus-visible:ring-ring/60",
              )}
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="h-11 rounded-2xl border border-border/60 bg-background/40 px-3 text-sm text-foreground shadow-sm outline-none backdrop-blur focus-visible:ring-2 focus-visible:ring-ring/60"
              aria-label="Sort projects"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="az">A–Z</option>
            </select>

            {hasFilters ? (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setSelected([]);
                }}
                className="inline-flex h-11 items-center gap-2 rounded-2xl border border-border/60 bg-background/40 px-3 text-sm text-muted-foreground shadow-sm backdrop-blur transition hover:bg-card/50 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:outline-none"
              >
                <X className="h-4 w-4" />
                Clear
              </button>
            ) : null}
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((t) => {
            const active = selected.includes(t);
            return (
              <button
                key={t}
                type="button"
                onClick={() =>
                  setSelected((prev) =>
                    prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t],
                  )
                }
                className={cn(
                  "rounded-full border px-3 py-1 text-xs transition",
                  active
                    ? "border-primary/40 bg-primary/15 text-foreground"
                    : "border-border/60 bg-card/20 text-muted-foreground hover:bg-card/40 hover:text-foreground",
                )}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>

      <motion.div layout className="grid gap-4 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((p) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 10, filter: "blur(6px)" }}
              transition={{ duration: 0.35, ease: [0.21, 0.9, 0.2, 1] }}
            >
              <ProjectCard project={p} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 ? (
        <div className="rounded-3xl border border-border/60 bg-card/30 p-8 text-sm text-muted-foreground shadow-sm backdrop-blur">
          No matches. Try a different search term or clear filters.
        </div>
      ) : null}
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const primary =
    project.caseStudySlug
      ? { href: `/case-studies/${project.caseStudySlug}`, label: "Read case study", external: false }
      : project.links?.live
        ? { href: project.links.live, label: "Open live", external: true }
        : project.links?.repo
          ? { href: project.links.repo, label: "View repo", external: true }
          : { href: `/projects#${project.id}`, label: "View", external: false };

  return (
    <div
      id={project.id}
      className="rounded-3xl border border-border/60 bg-card/40 p-6 shadow-sm backdrop-blur transition hover:bg-card/60 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span className="font-mono">{project.year}</span>
            <span aria-hidden className="h-1 w-1 rounded-full bg-border" />
            <span className="font-medium text-foreground">{project.title}</span>
            {project.featured ? <Badge variant="muted">Featured</Badge> : null}
            {project.caseStudySlug ? (
              <Badge variant="muted">Case study</Badge>
            ) : null}
          </div>
          <p className="text-sm leading-6 text-muted-foreground">
            {project.description}
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.tags.map((t) => (
          <Badge key={t} variant="muted">
            {t}
          </Badge>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <Link
          href={primary.href}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:brightness-110 focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:outline-none"
          target={primary.external ? "_blank" : undefined}
          rel={primary.external ? "noreferrer" : undefined}
        >
          {primary.label}
          <ExternalLink className="h-4 w-4" />
        </Link>

        {project.links?.live && primary.href !== project.links.live ? (
          <Link
            href={project.links.live}
            className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/40 px-4 py-2 text-sm text-muted-foreground shadow-sm backdrop-blur transition hover:bg-card/50 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:outline-none"
            target="_blank"
            rel="noreferrer"
          >
            Live <ExternalLink className="h-4 w-4" />
          </Link>
        ) : null}

        {project.links?.repo && primary.href !== project.links.repo ? (
          <Link
            href={project.links.repo}
            className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/40 px-4 py-2 text-sm text-muted-foreground shadow-sm backdrop-blur transition hover:bg-card/50 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:outline-none"
            target="_blank"
            rel="noreferrer"
          >
            Repo <Github className="h-4 w-4" />
          </Link>
        ) : null}
      </div>
    </div>
  );
}
