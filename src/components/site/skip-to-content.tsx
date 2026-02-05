export function SkipToContent() {
  return (
    <a
      className="sr-only fixed left-4 top-4 z-[100] rounded-lg border border-border bg-background px-4 py-2 text-sm text-foreground shadow-sm outline-none focus:not-sr-only focus-visible:ring-2 focus-visible:ring-ring/60"
      href="#content"
    >
      Skip to content
    </a>
  );
}

