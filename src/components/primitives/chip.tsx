import { cn } from "@/lib/utils";

export function Chip({
  children,
  className,
  tone = "default",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "default" | "accent";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em]",
        tone === "accent"
          ? "border-[var(--color-accent)]/60 bg-[color:color-mix(in_oklab,var(--color-accent)_12%,transparent)] text-[var(--color-accent)]"
          : "border-[var(--color-border)] bg-[var(--color-bg-2)] text-[var(--color-text-1)]",
        className
      )}
    >
      {children}
    </span>
  );
}
