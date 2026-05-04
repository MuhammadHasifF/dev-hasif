"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

export function PullQuote({ children }: { children: string }) {
  const ref = useRef<HTMLQuoteElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 30%"],
  });

  const text = String(children).trim();
  const words = text.split(/\s+/);

  return (
    <blockquote
      ref={ref}
      className="not-prose my-8 border-l-2 border-[var(--color-accent)] pl-5 font-display text-2xl leading-snug text-[var(--color-text-0)] md:text-3xl"
    >
      {reduce ? (
        <span className="opacity-90">&ldquo;{text}&rdquo;</span>
      ) : (
        <span>
          <span aria-hidden>&ldquo;</span>
          {words.map((w, i) => (
            <ScrollWord key={i} progress={scrollYProgress} index={i} total={words.length}>
              {w}
            </ScrollWord>
          ))}
          <span aria-hidden>&rdquo;</span>
          <span className="sr-only">{text}</span>
        </span>
      )}
    </blockquote>
  );
}

function ScrollWord({
  progress,
  index,
  total,
  children,
}: {
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  index: number;
  total: number;
  children: string;
}) {
  const start = index / total;
  const end = Math.min(1, start + 1.4 / total);
  const opacity = useTransform(progress, [start, end], [0.18, 1]);
  return (
    <>
      <motion.span style={{ opacity }} className="inline-block">
        {children}
      </motion.span>{" "}
    </>
  );
}
