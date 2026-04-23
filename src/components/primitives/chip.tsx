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
        "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider",
        tone === "accent"
          ? "border-[var(--color-accent)]/40 bg-[color:color-mix(in_oklab,var(--color-accent)_10%,transparent)] text-[var(--color-accent)]"
          : "border-[var(--color-border)] bg-[var(--color-bg-1)] text-[var(--color-text-1)]",
        className
      )}
    >
      {children}
    </span>
  );
}
