"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { RevealLines } from "@/components/primitives/reveal-lines";
import { cn } from "@/lib/utils";

export function Section({
  id,
  eyebrow,
  index,
  total = 6,
  stamp,
  title,
  intro,
  children,
  className,
}: {
  id?: string;
  eyebrow?: string;
  index?: number;
  total?: number;
  stamp?: string;
  title?: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  const headerRef = useRef<HTMLDivElement>(null);
  const [hairlineLive, setHairlineLive] = useState(false);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setHairlineLive(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setHairlineLive(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const idx = index !== undefined ? String(index).padStart(2, "0") : null;
  const tot = String(total).padStart(2, "0");

  return (
    <section
      id={id}
      className={cn("relative mx-auto w-full max-w-6xl px-4 py-24 sm:px-6 md:py-32", className)}
    >
      {(eyebrow || title || intro || idx) && (
        <div ref={headerRef} className="mb-10 md:mb-14">
          <div className="section-bar mb-5">
            <span className="text-[var(--color-text-1)]">
              {idx ? (
                <>
                  <span className="text-[var(--color-accent)]">{idx}</span>
                  <span className="text-[var(--color-text-2)]"> / {tot}</span>
                </>
              ) : (
                <span className="text-[var(--color-text-2)]">SECTION</span>
              )}
            </span>
            <span className="truncate text-[var(--color-text-1)]">
              {eyebrow ? (
                <>
                  <span className="text-[var(--color-accent)]">/ </span>
                  {eyebrow}
                </>
              ) : (
                "/"
              )}
            </span>
            <span className="hidden text-[var(--color-text-2)] sm:inline">
              {stamp ?? "SCROLL ↓"}
            </span>
          </div>

          <div className={cn("hairline", hairlineLive && "in-view")} />

          {title && (
            <RevealLines
              as="h2"
              className="mt-10 font-display text-balance text-5xl font-medium leading-[0.95] tracking-tight text-[var(--color-text-0)] md:text-7xl"
              stagger={70}
            >
              {Array.isArray(title) ? title : [title]}
            </RevealLines>
          )}

          {intro && (
            <p className="mt-6 max-w-2xl text-pretty text-base text-[var(--color-text-1)] md:text-lg">
              {intro}
            </p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
