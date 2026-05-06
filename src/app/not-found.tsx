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
          <div className="mb-3 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--color-accent)]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-accent)] shadow-[0_0_8px_var(--color-accent)]" />
            ERR · 404 · NODE_NOT_FOUND
          </div>
          <h1 className="font-display text-4xl text-[var(--color-text-0)]">Page off the map.</h1>
          <p className="mt-3 text-[var(--color-text-1)]">
            The route you&rsquo;re after doesn&rsquo;t exist. Yet. Move your
            cursor through the digits, then head home.
          </p>
          <div className="mt-6 flex items-center justify-center gap-2">
            <Link
              href="/"
              className="inline-flex h-10 items-center rounded-sm border border-[var(--color-accent)] bg-[var(--color-accent)] px-5 font-mono text-[11px] uppercase tracking-[0.18em] text-black transition-[box-shadow,transform] hover:shadow-[0_0_24px_-4px_var(--color-accent)] active:scale-[0.98]"
            >
              Take me home
            </Link>
            <Link
              href="/work"
              className="inline-flex h-10 items-center rounded-sm border border-[var(--color-accent)]/50 bg-[color:color-mix(in_oklab,var(--color-accent)_6%,var(--color-bg-1))] px-5 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-text-0)] transition-[border-color,background-color,box-shadow] hover:border-[var(--color-accent)] hover:bg-[color:color-mix(in_oklab,var(--color-accent)_14%,var(--color-bg-1))] hover:shadow-[0_0_24px_-4px_color-mix(in_oklab,var(--color-accent)_60%,transparent)]"
            >
              See the work
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
