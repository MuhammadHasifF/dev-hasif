import Link from "next/link";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-[transform,background-color,border-color,color] duration-300 ease-[var(--ease-apple)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--color-text-0)] text-[var(--color-bg-0)] hover:bg-[var(--color-text-0)]/90",
  secondary:
    "border border-[var(--color-border)] bg-[var(--color-bg-1)] text-[var(--color-text-0)] hover:border-[var(--color-accent)]",
  ghost: "text-[var(--color-text-1)] hover:text-[var(--color-text-0)]",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-5 text-sm",
  lg: "h-12 px-6 text-base",
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
