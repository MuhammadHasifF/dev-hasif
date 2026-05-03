import Link from "next/link";
import { PageBackground } from "@/components/layout/page-background";
import { ScatteredFour } from "@/components/layout/scattered-four";

export default function NotFound() {
  return (
    <>
      <PageBackground variant="notfound" />
      <div className="relative mx-auto flex min-h-[calc(100vh-56px)] max-w-6xl flex-col items-center justify-center px-4 pt-14 text-center sm:px-6">
        <ScatteredFour />
        <div className="-mt-8 max-w-lg">
          <h1 className="font-display text-4xl text-[var(--color-text-0)]">Page off the map.</h1>
          <p className="mt-3 text-[var(--color-text-1)]">
            The route you&rsquo;re after doesn&rsquo;t exist — yet. Move your
            cursor through the digits, then head home.
          </p>
          <div className="mt-6 flex items-center justify-center gap-2">
            <Link
              href="/"
              className="inline-flex h-10 items-center rounded-full bg-[var(--color-text-0)] px-5 text-sm font-medium text-[var(--color-bg-0)] hover:opacity-90"
            >
              Take me home
            </Link>
            <Link
              href="/work"
              className="inline-flex h-10 items-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg-1)] px-5 text-sm text-[var(--color-text-0)] hover:border-[var(--color-accent)]"
            >
              See the work
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
