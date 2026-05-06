import { cn } from "@/lib/utils";

export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  className,
  anchor,
}: {
  id?: string;
  eyebrow?: string;
  title?: React.ReactNode;
  intro?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  anchor?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn("relative mx-auto w-full max-w-6xl px-4 py-24 sm:px-6 md:py-32", className)}
    >
      {(eyebrow || title || intro) && (
        <header className="mb-12 flex flex-col gap-4 md:mb-16">
          {eyebrow && (
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-text-2)]">
              <span aria-hidden="true" className="inline-block h-2 w-2 rotate-45 border border-[var(--color-accent)]" />
              <span className="h-px w-8 bg-[var(--color-accent)]/60" />
              <span className="text-[var(--color-accent)]">{eyebrow}</span>
            </div>
          )}
          {title && (
            <h2 className="font-display text-balance text-4xl leading-[1.05] text-[var(--color-text-0)] md:text-6xl">
              {title}
            </h2>
          )}
          {intro && (
            <p className="max-w-2xl text-pretty text-[var(--color-text-1)] md:text-lg">{intro}</p>
          )}
        </header>
      )}
      {anchor && id && (
        <a href={`#${id}`} className="sr-only">
          Section anchor
        </a>
      )}
      {children}
    </section>
  );
}
