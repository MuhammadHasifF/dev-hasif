"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { OrgLogo } from "@/components/primitives/org-tag";
import { Chip } from "@/components/primitives/chip";

type Project = {
  slug: string;
  title: string;
  tagline: string;
  year: string;
  org: string;
  orgKey: string;
  category: string;
  hue?: string;
};

export function CaseHero({ project: p }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <div
      ref={ref}
      className="relative overflow-hidden border-b border-[var(--color-border)]"
    >
      <motion.div
        aria-hidden="true"
        style={reduce ? undefined : { scale: bgScale, y: bgY }}
        className={`absolute inset-0 bg-gradient-to-br opacity-30 ${p.hue ?? "from-[var(--color-accent)] to-[var(--color-accent-2)]"}`}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          maskImage: "radial-gradient(ellipse at top, black, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at top, black, transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-text-2) 1px, transparent 1px), linear-gradient(to bottom, var(--color-text-2) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "linear-gradient(to bottom, black, transparent 80%)",
          WebkitMaskImage: "linear-gradient(to bottom, black, transparent 80%)",
        }}
      />

      <motion.div
        style={reduce ? undefined : { y: titleY, opacity: titleOpacity }}
        className="relative mx-auto max-w-5xl px-4 pb-20 pt-32 sm:px-6"
      >
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-sm text-[var(--color-text-1)] hover:text-[var(--color-text-0)]"
        >
          <ArrowLeft className="h-4 w-4" /> All work
        </Link>
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <OrgLogo orgKey={p.orgKey} size="md" />
          <Chip>{p.category}</Chip>
          <span className="font-mono text-xs text-[var(--color-text-2)]">{p.year}</span>
        </div>
        <h1 className="mt-4 font-display text-4xl leading-[1.05] text-[var(--color-text-0)] md:text-7xl">
          {p.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-[var(--color-text-1)] md:text-xl">
          {p.tagline}
        </p>
      </motion.div>
    </div>
  );
}
