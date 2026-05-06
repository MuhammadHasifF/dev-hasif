import Link from "next/link";
import { DiagonalArrow } from "@/components/primitives/diagonal-arrow";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary";

const variants: Record<Variant, string> = {
  primary: "panel-cta panel-cta-primary group",
  secondary: "panel-cta group",
};

type Common = {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
};

export function ArrowLink({
  href,
  external,
  variant = "secondary",
  className,
  children,
  ...rest
}: Common & { href: string; external?: boolean } & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const cls = cn(variants[variant], className);
  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener" className={cls} {...rest}>
        <span>{children}</span>
        <DiagonalArrow />
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      <span>{children}</span>
      <DiagonalArrow />
    </Link>
  );
}
