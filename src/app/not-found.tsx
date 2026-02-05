import Link from "next/link";

import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-20">
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">404</p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Page not found
        </h1>
        <p className="text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
          This route doesn’t exist yet. Head back to the homepage or explore the
          projects list.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/" size="lg">
          Home
        </ButtonLink>
        <ButtonLink href="/projects" variant="secondary" size="lg">
          Projects
        </ButtonLink>
        <Link
          href="/case-studies"
          className="inline-flex h-12 items-center justify-center rounded-full border border-border/70 px-6 text-base font-medium text-foreground transition hover:bg-card/50"
        >
          Case studies
        </Link>
      </div>
    </div>
  );
}

