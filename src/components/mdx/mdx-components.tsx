import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";
import { Callout } from "@/components/mdx/callout";
import { Badge } from "@/components/ui/badge";

export const mdxComponents = {
  Callout,
  Badge,
  a: (props: ComponentPropsWithoutRef<"a">) => {
    const href = props.href ?? "#";
    const className = cn(
      "underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground/60",
      props.className,
    );

    const isInternal = href.startsWith("/") && !href.startsWith("//");
    const isAnchor = href.startsWith("#");
    const isMail = href.startsWith("mailto:");
    const isTel = href.startsWith("tel:");

    if (isInternal) {
      return (
        <Link href={href} className={cn("text-foreground", className)}>
          {props.children}
        </Link>
      );
    }

    return (
      <a
        {...props}
        href={href}
        className={cn("text-foreground", className)}
        target={isAnchor || isMail || isTel ? undefined : "_blank"}
        rel={isAnchor || isMail || isTel ? undefined : "noreferrer"}
      />
    );
  },
  img: (props: ComponentPropsWithoutRef<"img">) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...props}
      alt={props.alt ?? ""}
      className={cn(
        "rounded-3xl border border-border/60 bg-card/20 shadow-sm",
        props.className,
      )}
    />
  ),
};
