"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

import { cn } from "@/lib/cn";
import { Badge } from "@/components/ui/badge";

export type TimelineItem = {
  year: string;
  title: string;
  description: string;
};

export function TimelineScroller({
  items,
  className,
}: {
  items: TimelineItem[];
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeYear, setActiveYear] = useState(items[0]?.year);

  const sections = useMemo(
    () => items.map((it) => ({ ...it, id: `y-${it.year}-${slugify(it.title)}` })),
    [items],
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const nodes = Array.from(
      el.querySelectorAll<HTMLElement>("[data-year]"),
    );

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0),
          )[0];

        if (!visible) return;
        const year = visible.target.getAttribute("data-year");
        if (year) setActiveYear(year);
      },
      { root: null, threshold: [0.35, 0.5, 0.65], rootMargin: "-30% 0px -55% 0px" },
    );

    for (const n of nodes) io.observe(n);
    return () => io.disconnect();
  }, [sections]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const fillHeight = useTransform(scrollYProgress, [0, 1], ["10%", "100%"]);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <div className="grid gap-10 md:grid-cols-[240px_1fr]">
        <div className="hidden md:block">
          <div className="sticky top-24">
            <div className="relative rounded-3xl border border-border/60 bg-card/30 p-6 shadow-sm backdrop-blur">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-muted-foreground">
                  Chapters
                </p>
                <Badge variant="muted" className="font-mono">
                  {activeYear}
                </Badge>
              </div>

              <div className="relative mt-5 h-36 overflow-hidden rounded-2xl bg-muted/40">
                <motion.div
                  className="absolute inset-x-0 bottom-0 origin-bottom bg-gradient-to-t from-primary/35 via-accent/15 to-transparent"
                  style={{ height: fillHeight }}
                />
                <div className="absolute inset-0 [mask-image:radial-gradient(circle_at_center,black,transparent_70%)]" />
              </div>

              <ul className="mt-6 space-y-1">
                {items.map((it) => {
                  const active = it.year === activeYear;
                  return (
                    <li key={`${it.year}-${it.title}`}>
                      <a
                        href={`#y-${it.year}-${slugify(it.title)}`}
                        className={cn(
                          "flex items-center justify-between rounded-2xl px-3 py-2 text-sm transition",
                          active
                            ? "bg-card/70 text-foreground"
                            : "text-muted-foreground hover:bg-card/50 hover:text-foreground",
                        )}
                      >
                        <span className="font-mono text-xs">{it.year}</span>
                        <span className="ml-3 flex-1 truncate">{it.title}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {sections.map((m, idx) => (
            <motion.section
              key={m.id}
              id={m.id}
              data-year={m.year}
              initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{
                duration: 0.6,
                ease: [0.21, 0.9, 0.2, 1],
                delay: idx === 0 ? 0 : 0.02,
              }}
              className="rounded-3xl border border-border/60 bg-card/40 p-7 shadow-sm backdrop-blur"
            >
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="muted" className="font-mono">
                  {m.year}
                </Badge>
                <h2 className="text-lg font-semibold tracking-tight">
                  {m.title}
                </h2>
              </div>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {m.description}
              </p>
            </motion.section>
          ))}
        </div>
      </div>
    </div>
  );
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, "-")
    .replaceAll(/(^-|-$)/g, "");
}
