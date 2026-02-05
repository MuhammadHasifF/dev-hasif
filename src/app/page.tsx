import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { NowPill } from "@/components/site/now-pill";
import { ScrollFade } from "@/components/motion/scroll-fade";
import { ScrollTimeIndicator } from "@/components/motion/scroll-time-indicator";
import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { projects } from "@/content/projects";
import { getAllCaseStudies } from "@/lib/case-studies";

const highlights = [
  { label: "Focus", value: "Sleek UI + interactivity" },
  { label: "Style", value: "Obsidian / Graphite" },
  { label: "Format", value: "Projects + case studies" },
] as const;

export default async function Home() {
  const featured = projects
    .filter((p) => p.featured)
    .slice(0, 3)
    .map((p) => ({
      title: p.title,
      description: p.description,
      year: String(p.year),
      tags: p.tags.slice(0, 3),
      href: p.caseStudySlug ? `/case-studies/${p.caseStudySlug}` : `/projects#${p.id}`,
    }));

  const latestCaseStudies = (await getAllCaseStudies()).slice(0, 2);

  return (
    <div className="mx-auto w-full max-w-6xl px-4">
      <ScrollTimeIndicator />

      <ScrollFade className="relative flex min-h-[calc(100dvh-4rem)] flex-col justify-center py-16 sm:py-20">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute left-[25%] top-[65%] h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl" />
        </div>

        <NowPill />

        <h1 className="mt-6 text-balance text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl">
          Crafting{" "}
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            interactive
          </span>{" "}
          products with calm, dark minimalism.
        </h1>

        <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground sm:text-xl">
          A portfolio designed like a product: big typographic impact, subtle
          depth, and scroll-driven motion—without sacrificing accessibility or
          performance.
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {highlights.map((h) => (
            <Badge key={h.label} variant="muted" className="px-4 py-2 text-sm">
              <span className="text-foreground">{h.label}:</span>{" "}
              <span className="ml-1">{h.value}</span>
            </Badge>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/projects" size="lg">
            View projects <ArrowRight className="h-4 w-4" />
          </ButtonLink>
          <ButtonLink href="/case-studies" variant="secondary" size="lg">
            Read case studies
          </ButtonLink>
        </div>

        <div className="mt-10 flex items-center gap-3 text-xs text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5" />
          <span>
            Scroll for highlights, or jump straight to{" "}
            <Link
              href="/timeline"
              className="text-foreground underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground/60"
            >
              the timeline
            </Link>
            .
          </span>
        </div>
      </ScrollFade>

      <Reveal>
        <section className="py-16 sm:py-20">
        <div className="flex items-end justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Featured work
            </h2>
            <p className="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              A curated set of projects with product-level polish. Each one is
              designed to feel fast, focused, and intentional.
            </p>
          </div>
          <ButtonLink href="/projects" variant="ghost" className="hidden sm:inline-flex">
            All projects <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {featured.map((p) => (
            <Link
              key={p.title}
              href={p.href}
              className="group relative rounded-3xl border border-border/60 bg-card/40 p-6 shadow-sm backdrop-blur transition hover:bg-card/60 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="font-mono">{p.year}</span>
                    <span aria-hidden className="h-1 w-1 rounded-full bg-border" />
                    <span className="font-medium text-foreground">{p.title}</span>
                  </div>
                  <p className="text-sm leading-6 text-muted-foreground">
                    {p.description}
                  </p>
                </div>
                <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-foreground" />
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <Badge key={t} variant="muted">
                    {t}
                  </Badge>
                ))}
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 sm:hidden">
          <ButtonLink href="/projects" variant="ghost" className="w-full">
            All projects <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        </div>
        </section>
      </Reveal>

      <Reveal delay={0.05}>
        <section className="py-16 sm:py-20">
        <div className="grid gap-8 rounded-3xl border border-border/60 bg-card/30 p-8 shadow-sm backdrop-blur md:grid-cols-2 md:items-center">
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Case studies that show the thinking
            </h2>
            <p className="text-sm leading-7 text-muted-foreground sm:text-base">
              A small number of flagship projects, documented end-to-end:
              constraints, iterations, decisions, and outcomes.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <ButtonLink href="/case-studies" variant="secondary" size="lg">
              Browse case studies <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline" size="lg">
              Contact
            </ButtonLink>
          </div>
        </div>

        {latestCaseStudies.length ? (
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {latestCaseStudies.map((c) => (
              <Link
                key={c.slug}
                href={`/case-studies/${c.slug}`}
                className="group rounded-3xl border border-border/60 bg-card/40 p-6 shadow-sm backdrop-blur transition hover:bg-card/60 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="font-mono">
                        {c.year ?? c.date.slice(0, 4)}
                      </span>
                      <span
                        aria-hidden
                        className="h-1 w-1 rounded-full bg-border"
                      />
                      <span className="font-medium text-foreground">
                        {c.title}
                      </span>
                    </div>
                    <p className="text-sm leading-6 text-muted-foreground">
                      {c.summary}
                    </p>
                  </div>
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-foreground" />
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {(c.tags ?? []).slice(0, 4).map((t) => (
                    <Badge key={t} variant="muted">
                      {t}
                    </Badge>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        ) : null}
        </section>
      </Reveal>
    </div>
  );
}
