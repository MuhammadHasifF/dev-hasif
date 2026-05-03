"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  children: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  className?: string;
  stagger?: number;
  delay?: number;
  y?: number;
  duration?: number;
  once?: boolean;
  by?: "char" | "word";
};

export function SplitText({
  children,
  as: Tag = "h2",
  className,
  stagger = 0.022,
  delay = 0,
  y = 28,
  duration = 0.7,
  once = true,
  by = "char",
}: Props) {
  const reduce = useReducedMotion();
  const text = String(children);

  if (reduce) {
    return <Tag className={className}>{text}</Tag>;
  }

  const words = text.split(" ");

  return (
    <Tag className={cn(className)} aria-label={text}>
      <span aria-hidden="true" className="inline">
        {words.map((word, wi) => {
          const isLast = wi === words.length - 1;
          if (by === "word") {
            return (
              <span key={wi} className="inline-block overflow-hidden align-bottom">
                <motion.span
                  className="inline-block will-change-transform"
                  initial={{ y, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once, margin: "-80px" }}
                  transition={{
                    duration,
                    delay: delay + wi * stagger * 6,
                    ease: [0.32, 0.72, 0, 1],
                  }}
                >
                  {word}
                </motion.span>
                {!isLast && <span>&nbsp;</span>}
              </span>
            );
          }
          const chars = Array.from(word);
          const charIndex = words.slice(0, wi).reduce((n, w) => n + w.length, 0);
          return (
            <span key={wi} className="inline-block whitespace-nowrap">
              {chars.map((ch, ci) => {
                const idx = charIndex + ci;
                return (
                  <span key={ci} className="inline-block overflow-hidden align-bottom leading-[1.05]">
                    <motion.span
                      className="inline-block will-change-transform"
                      initial={{ y, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once, margin: "-80px" }}
                      transition={{
                        duration,
                        delay: delay + idx * stagger,
                        ease: [0.32, 0.72, 0, 1],
                      }}
                    >
                      {ch}
                    </motion.span>
                  </span>
                );
              })}
              {!isLast && <span>&nbsp;</span>}
            </span>
          );
        })}
      </span>
    </Tag>
  );
}
