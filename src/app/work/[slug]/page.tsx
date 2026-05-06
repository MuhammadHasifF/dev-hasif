import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ExternalLink } from "lucide-react";
import { projects, getProject } from "@/content/projects";
import { Section } from "@/components/primitives/section";
import { Chip } from "@/components/primitives/chip";
import { CaseHero } from "@/components/projects/case-hero";
import { CaseStory } from "@/components/projects/case-story";
import { PageBackground } from "@/components/layout/page-background";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.tagline,
    openGraph: { title: p.title, description: p.tagline },
  };
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const idx = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <>
      <PageBackground variant="case" />
      <CaseHero project={p} />
      <CaseStory project={p} />

      <Section>
        <aside className="grid gap-4 md:grid-cols-2">
          <div className="hud-panel p-5">
            <div className="mb-2 font-mono text-[11px] uppercase tracking-widest text-[var(--color-text-2)]">
              Stack
            </div>
            <div className="flex flex-wrap gap-1.5">
              {p.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-md border border-[var(--color-border)] bg-[var(--color-bg-2)] px-2 py-0.5 font-mono text-[11px] text-[var(--color-text-0)]"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div className="hud-panel p-5">
            <div className="mb-2 font-mono text-[11px] uppercase tracking-widest text-[var(--color-text-2)]">
              Tags
            </div>
            <div className="flex flex-wrap gap-1.5">
              {p.tags.map((t) => (
                <Chip key={t}>{t}</Chip>
              ))}
            </div>
          </div>
          {p.links && p.links.length > 0 && (
            <div className="hud-panel p-5 md:col-span-2">
              <div className="mb-2 font-mono text-[11px] uppercase tracking-widest text-[var(--color-text-2)]">
                Links
              </div>
              <ul className="space-y-2 text-sm">
                {p.links.map((l) => (
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
        </aside>
      </Section>

      <Section>
        <Link
          href={`/work/${next.slug}`}
          className="hud-panel hud-panel-hover group flex flex-col justify-between gap-6 overflow-hidden p-8 transition-colors md:flex-row md:items-center"
        >
          <div>
            <div className="font-mono text-[11px] uppercase tracking-widest text-[var(--color-text-2)]">
              Next project
            </div>
            <div className="mt-2 font-display text-3xl text-[var(--color-text-0)] md:text-4xl">
              {next.title}
            </div>
            <div className="mt-1 text-sm text-[var(--color-text-1)]">{next.tagline}</div>
          </div>
          <div className="inline-flex h-12 items-center gap-2 rounded-sm border border-[var(--color-accent)] bg-[var(--color-accent)] px-6 font-mono text-[11px] uppercase tracking-[0.18em] text-white transition-[box-shadow,gap] group-hover:gap-3 group-hover:shadow-[0_0_24px_-4px_var(--color-accent)]">
            Read <ArrowRight className="h-4 w-4" />
          </div>
        </Link>
      </Section>
    </>
  );
}
