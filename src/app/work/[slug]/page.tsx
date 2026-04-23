import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { projects, getProject } from "@/content/projects";
import { Section } from "@/components/primitives/section";
import { OrgLogo } from "@/components/primitives/org-tag";
import { Chip } from "@/components/primitives/chip";

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
      <div className="relative overflow-hidden border-b border-[var(--color-border)]">
        <div
          aria-hidden="true"
          className={`absolute inset-0 bg-gradient-to-br opacity-30 ${p.hue ?? "from-[var(--color-accent)] to-[var(--color-accent-2)]"}`}
          style={{ maskImage: "radial-gradient(ellipse at top, black, transparent 70%)" }}
        />
        <div className="mx-auto max-w-5xl px-4 pb-16 pt-32 sm:px-6">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm text-[var(--color-text-1)] hover:text-[var(--color-text-0)]"
          >
            <ArrowLeft className="h-4 w-4" /> All work
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <OrgLogo orgKey={p.orgKey} size="md" />
            <Chip>{p.category}</Chip>
            <span className="font-mono text-xs text-[var(--color-text-2)]">{p.year}</span>
          </div>
          <h1 className="mt-4 font-display text-4xl leading-[1.05] text-[var(--color-text-0)] md:text-6xl">
            {p.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-[var(--color-text-1)]">{p.tagline}</p>
        </div>
      </div>

      <Section>
        <div className="grid gap-10 md:grid-cols-3">
          <div className="prose prose-invert md:col-span-2 max-w-none text-[var(--color-text-0)]">
            <h2>Overview</h2>
            <p>{p.description}</p>
            {p.outcomes && p.outcomes.length > 0 && (
              <>
                <h2>Outcomes</h2>
                <ul>
                  {p.outcomes.map((o) => (
                    <li key={o}>{o}</li>
                  ))}
                </ul>
              </>
            )}
            {p.impact && p.impact.length > 0 && (
              <>
                <h2>Impact</h2>
                <ul>
                  {p.impact.map((o) => (
                    <li key={o}>{o}</li>
                  ))}
                </ul>
              </>
            )}
            <h2>Approach</h2>
            <p>
              This case study is intentionally brief — a fuller MDX writeup with
              screenshots, architecture diagrams, and decision notes lands as
              the content matures. Reach out if you&rsquo;d like to dig in.
            </p>
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-1)] p-5">
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
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-1)] p-5">
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
              <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-1)] p-5">
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
        </div>
      </Section>

      <Section>
        <Link
          href={`/work/${next.slug}`}
          className="group flex flex-col justify-between gap-6 overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-1)] p-8 transition-colors hover:border-[var(--color-accent)]/60 md:flex-row md:items-center"
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
          <div className="inline-flex h-12 items-center gap-2 rounded-full bg-[var(--color-text-0)] px-6 text-sm font-medium text-[var(--color-bg-0)] transition group-hover:gap-3">
            Read <ArrowRight className="h-4 w-4" />
          </div>
        </Link>
      </Section>
    </>
  );
}
