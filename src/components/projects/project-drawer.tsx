"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect } from "react";
import { ExternalLink, X } from "lucide-react";
import { OrgLogo } from "@/components/primitives/org-tag";
import { Chip } from "@/components/primitives/chip";
import type { projects } from "@/content/projects";

/**
 * In-page drawer that opens when a project card is clicked. Slides down +
 * fades in (unified slide-down animation for every section's expand-in-
 * place per ask). Backdrop dims the rest of the page. Scroll-locked while
 * open. Esc closes.
 */
export function ProjectDrawer({
  project,
  open,
  onClose,
}: {
  project: (typeof projects)[number] | null;
  open: boolean;
  onClose: () => void;
}) {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prev;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && project && (
        <motion.div
          key="proj-drawer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/80 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} case study`}
        >
          <motion.div
            initial={reduce ? { opacity: 0 } : { y: -40, opacity: 0 }}
            animate={reduce ? { opacity: 1 } : { y: 0, opacity: 1, transition: { duration: 0.55, ease: [0.32, 0.72, 0, 1] } }}
            exit={reduce ? { opacity: 0 } : { y: -40, opacity: 0, transition: { duration: 0.3, ease: [0.32, 0.72, 0, 1] } }}
            className="relative mx-auto my-8 w-full max-w-3xl rounded-2xl border border-[var(--color-accent)]/30 bg-[var(--color-bg-0)] shadow-[0_0_60px_-12px_color-mix(in_oklab,var(--color-accent)_55%,transparent)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent" />
            <header className="flex items-start gap-4 border-b border-[var(--color-border)] px-6 py-5 md:px-8">
              <OrgLogo orgKey={project.orgKey} size="lg" />
              <div className="min-w-0 flex-1">
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-text-2)]">
                  <span className="text-[var(--color-accent)]">›</span> {project.category} · {project.year}
                </div>
                <h2 className="mt-1 font-display text-2xl leading-tight text-[var(--color-text-0)] md:text-3xl">
                  {project.title}
                </h2>
                <p className="mt-2 text-sm text-[var(--color-text-1)]">{project.tagline}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close project details"
                className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-[var(--color-border)] text-[var(--color-text-1)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              >
                <X className="h-5 w-5" />
              </button>
            </header>

            <div className="space-y-6 px-6 py-6 md:px-8 md:py-8">
              <p className="text-base leading-relaxed text-[var(--color-text-0)]/90">
                {project.description}
              </p>

              {project.outcomes && project.outcomes.length > 0 && (
                <DrawerList title="Outcomes" items={project.outcomes} />
              )}
              {project.impact && project.impact.length > 0 && (
                <DrawerList title="Impact" items={project.impact} />
              )}

              <div>
                <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-text-2)]">
                  Stack
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-md border border-[var(--color-border)] bg-[var(--color-bg-2)] px-2 py-0.5 font-mono text-[11px] text-[var(--color-text-0)]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {project.tags.length > 0 && (
                <div>
                  <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-text-2)]">
                    Tags
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((t) => (
                      <Chip key={t}>{t}</Chip>
                    ))}
                  </div>
                </div>
              )}

              {project.links && project.links.length > 0 && (
                <div>
                  <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-text-2)]">
                    Links
                  </div>
                  <ul className="space-y-2 text-sm">
                    {project.links.map((l) => (
                      <li key={l.href}>
                        <a
                          href={l.href}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 text-[var(--color-text-0)] hover:text-[var(--color-accent)]"
                        >
                          <ExternalLink className="h-3.5 w-3.5" /> {l.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DrawerList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-text-2)]">
        {title}
      </div>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm text-[var(--color-text-1)]">
            <span className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent)]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
