import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { RevealItem, RevealStagger } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { getAllCaseStudies } from "@/lib/case-studies";

export default async function CaseStudiesPage() {
  const caseStudies = await getAllCaseStudies();
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:py-16">
      <div className="space-y-3">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Case studies
        </h1>
        <p className="max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
          Deep dives into a few flagship projects: goals, constraints,
          iterations, and outcomes.
        </p>
      </div>

      <RevealStagger className="mt-10 grid gap-4 md:grid-cols-2">
        {caseStudies.map((c) => (
          <RevealItem key={c.slug}>
            <Link
              href={`/case-studies/${c.slug}`}
              className="group block rounded-3xl border border-border/60 bg-card/40 p-6 shadow-sm backdrop-blur transition hover:bg-card/60 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="font-mono">{c.year ?? c.date.slice(0, 4)}</span>
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
                {(c.tags ?? []).map((t) => (
                  <Badge key={t} variant="muted">
                    {t}
                  </Badge>
                ))}
              </div>
            </Link>
          </RevealItem>
        ))}
      </RevealStagger>
    </div>
  );
}
