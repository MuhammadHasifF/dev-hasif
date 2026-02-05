import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

type Variant = "default" | "muted";

const variants: Record<Variant, string> = {
  default: "border-border/60 bg-card/40 text-foreground",
  muted: "border-border/60 bg-muted/40 text-muted-foreground",
};

export function Badge({
  className,
  variant = "default",
  ...props
}: HTMLAttributes<HTMLSpanElement> & { variant?: Variant }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs leading-none backdrop-blur",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}

