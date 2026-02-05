import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import {
  getAllCaseStudies,
  getCaseStudyBySlug,
  getCaseStudyMeta,
} from "@/lib/case-studies";
import { siteConfig } from "@/site.config";

export async function generateStaticParams() {
  const all = await getAllCaseStudies();
  return all.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = await getCaseStudyMeta(slug);
  if (!meta) return {};
  return {
    title: `${meta.title} — Case study | ${siteConfig.name}`,
    description: meta.summary,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let caseStudy: Awaited<ReturnType<typeof getCaseStudyBySlug>>;

  try {
    caseStudy = await getCaseStudyBySlug(slug);
  } catch {
    notFound();
  }

  const { frontmatter, content } = caseStudy;

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-14 sm:py-16">
      <div className="flex items-center justify-between gap-4">
        <ButtonLink href="/case-studies" variant="ghost">
          <ArrowLeft className="h-4 w-4" />
          Back
        </ButtonLink>
        <Badge variant="muted">{frontmatter.year ?? frontmatter.date.slice(0, 4)}</Badge>
      </div>

      <h1 className="mt-8 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
        {frontmatter.title}
      </h1>
      <p className="mt-4 text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
        {frontmatter.summary}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {(frontmatter.tags ?? []).map((t) => (
          <Badge key={t} variant="muted">
            {t}
          </Badge>
        ))}
      </div>

      {frontmatter.links?.live || frontmatter.links?.repo ? (
        <div className="mt-8 flex flex-wrap gap-2">
          {frontmatter.links?.live ? (
            <ButtonLink
              href={frontmatter.links.live}
              target="_blank"
              rel="noreferrer"
              variant="secondary"
            >
              Live
            </ButtonLink>
          ) : null}
          {frontmatter.links?.repo ? (
            <ButtonLink
              href={frontmatter.links.repo}
              target="_blank"
              rel="noreferrer"
              variant="outline"
            >
              Repo
            </ButtonLink>
          ) : null}
        </div>
      ) : null}

      <article className="prose prose-invert mt-10 max-w-none prose-headings:tracking-tight prose-a:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-li:text-muted-foreground">
        {content}
      </article>

      <div className="mt-14 rounded-3xl border border-border/60 bg-card/30 p-8 text-sm text-muted-foreground shadow-sm backdrop-blur">
        <p>
          Want to add more? Create new MDX files in{" "}
          <code>content/case-studies</code> and they’ll appear automatically.
        </p>
        <p className="mt-4">
          Back to{" "}
          <Link
            href="/projects"
            className="text-foreground underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground/60"
          >
            projects
          </Link>{" "}
          or jump to{" "}
          <Link
            href="/timeline"
            className="text-foreground underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground/60"
          >
            the timeline
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
