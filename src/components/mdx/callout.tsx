import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type Variant = "info" | "success" | "warning";

const variants: Record<Variant, string> = {
  info: "border-primary/30 bg-primary/10",
  success: "border-emerald-400/30 bg-emerald-400/10",
  warning: "border-amber-300/30 bg-amber-300/10",
};

export function Callout({
  title,
  children,
  variant = "info",
}: {
  title?: string;
  children: ReactNode;
  variant?: Variant;
}) {
  return (
    <div
      className={cn(
        "not-prose rounded-3xl border p-6 text-sm leading-7 shadow-sm backdrop-blur",
        variants[variant],
      )}
    >
      {title ? (
        <p className="font-medium text-foreground">{title}</p>
      ) : null}
      <div className={cn(title ? "mt-2 text-muted-foreground" : "text-muted-foreground")}>
        {children}
      </div>
    </div>
  );
}

