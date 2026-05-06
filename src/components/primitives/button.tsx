import Link from "next/link";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { DiagonalArrow } from "@/components/primitives/diagonal-arrow";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group inline-flex items-center gap-2.5 font-mono uppercase tracking-[0.2em] transition-[transform,background-color,border-color,color,box-shadow] duration-300 ease-[var(--ease-out-expo)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--color-accent)] text-white border border-[var(--color-accent)] hover:shadow-[0_0_36px_-4px_color-mix(in_oklab,var(--color-accent)_72%,transparent)] hover:bg-[color:color-mix(in_oklab,var(--color-accent)_88%,white)]",
  secondary:
    "border border-[var(--color-border-strong)] bg-[var(--color-bg-1)] text-[var(--color-text-0)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] hover:bg-[color:color-mix(in_oklab,var(--color-accent)_6%,var(--color-bg-1))] hover:shadow-[0_0_28px_-6px_color-mix(in_oklab,var(--color-accent)_60%,transparent)]",
  ghost: "text-[var(--color-text-1)] hover:text-[var(--color-accent)]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3 text-[10px]",
  md: "h-11 px-5 text-[11px]",
  lg: "h-12 px-6 text-xs",
};

type Common = {
  variant?: Variant;
  size?: Size;
  className?: string;
  withArrow?: boolean;
};

type AsLinkProps = Common & { href: string; children: React.ReactNode; external?: boolean };
type AsButtonProps = Common & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  href,
  external,
  withArrow = true,
  children,
  ...rest
}: AsLinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const cls = cn(base, variants[variant], sizes[size], className);
  const inner = (
    <>
      <span>{children}</span>
      {withArrow && variant !== "ghost" && <DiagonalArrow />}
    </>
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener" className={cls} {...rest}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {inner}
    </Link>
  );
}

export const Button = forwardRef<HTMLButtonElement, AsButtonProps>(function Button(
  { variant = "primary", size = "md", className, withArrow = false, children, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      <span>{children}</span>
      {withArrow && variant !== "ghost" && <DiagonalArrow />}
    </button>
  );
});
