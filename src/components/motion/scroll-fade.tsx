"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import type { ReactNode } from "react";
import { useRef } from "react";

import { cn } from "@/lib/cn";

export function ScrollFade({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const filter = useTransform(
    scrollYProgress,
    [0, 1],
    ["blur(0px)", "blur(6px)"],
  );
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.98]);

  return (
    <motion.section
      ref={ref}
      style={{ y, opacity, filter, scale }}
      className={cn("will-change-transform", className)}
    >
      {children}
    </motion.section>
  );
}

