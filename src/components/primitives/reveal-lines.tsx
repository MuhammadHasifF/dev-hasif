"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Masked-line reveal: split children into lines (each child maps to one line),
 * each line clips its text and the inner span translates from y:110% to y:0
 * once the wrapper enters the viewport.
 *
 * Usage:
 *   <RevealLines>
 *     <span>First line</span>
 *     <span>Second line</span>
 *   </RevealLines>
 */
export function RevealLines({
  children,
  className,
  stagger = 70,
  threshold = 0.35,
  once = false,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  threshold?: number;
  /** When false (default), reveals replay each time the element re-enters the viewport. */
  once?: boolean;
  as?: "h1" | "h2" | "h3" | "div";
}) {
  const ref = useRef<HTMLDivElement>(null);
  // Visible by default so content never disappears if IntersectionObserver
  // is delayed, blocked, or unavailable. Off-screen instances are reset by
  // the observer after hydration and still animate when scrolled into view.
  const [active, setActive] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setActive(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setActive(true);
            if (once) {
              io.disconnect();
              break;
            }
          } else if (!once) {
            setActive(false);
          }
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, once]);

  const items = Array.isArray(children) ? children : [children];

  return (
    <Tag ref={ref as React.Ref<HTMLDivElement>} className={cn(className)}>
      {items.map((child, i) => (
        <span
          key={i}
          className={cn("reveal-line", active && "in-view")}
          style={{ transitionDelay: `${i * stagger}ms` }}
        >
          <span style={{ transitionDelay: `${i * stagger}ms` }}>{child}</span>
        </span>
      ))}
    </Tag>
  );
}
