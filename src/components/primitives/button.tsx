import Link from "next/link";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-sm font-mono uppercase tracking-[0.18em] transition-[transform,background-color,border-color,color,box-shadow] duration-300 ease-[var(--ease-apple)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--color-accent)] text-black border border-[var(--color-accent)] hover:shadow-[0_0_24px_-4px_var(--color-accent)]",
  secondary:
    "border border-[var(--color-accent)]/50 bg-[color:color-mix(in_oklab,var(--color-accent)_6%,var(--color-bg-1))] text-[var(--color-text-0)] hover:border-[var(--color-accent)] hover:bg-[color:color-mix(in_oklab,var(--color-accent)_14%,var(--color-bg-1))] hover:shadow-[0_0_24px_-4px_color-mix(in_oklab,var(--color-accent)_60%,transparent)]",
  ghost: "text-[var(--color-text-1)] hover:text-[var(--color-text-0)]",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-[10px]",
  md: "h-10 px-5 text-[11px]",
  lg: "h-12 px-6 text-xs",
};

type Common = { variant?: Variant; size?: Size; className?: string };

type AsLinkProps = Common & { href: string; children: React.ReactNode; external?: boolean };
type AsButtonProps = Common & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  href,
  external,
  children,
  ...rest
}: AsLinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const cls = cn(base, variants[variant], sizes[size], className);
  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener" className={cls} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}

export const Button = forwardRef<HTMLButtonElement, AsButtonProps>(function Button(
  { variant = "primary", size = "md", className, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
});
