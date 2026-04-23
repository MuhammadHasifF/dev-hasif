"use client";

import { ArrowDown, ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { Magnetic } from "@/components/primitives/magnetic";
import { siteConfig } from "@/../site.config";

const HeroCanvas = dynamic(() => import("@/components/hero/hero-canvas").then((m) => m.HeroCanvas), {
  ssr: false,
  loading: () => null,
});

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative flex min-h-[100svh] w-full items-center overflow-hidden">
      {/* Background WebGL layer */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {!reduce && <HeroCanvas />}
        {reduce && (
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 30% 40%, color-mix(in oklab, var(--color-accent) 30%, transparent), transparent 55%), radial-gradient(circle at 70% 70%, color-mix(in oklab, var(--color-accent-2) 25%, transparent), transparent 55%)",
            }}
          />
        )}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,var(--color-bg-0)_70%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(ellipse 80% 60% at 50% 40%, black 20%, transparent 80%)",
          }}
        />
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 pt-28 sm:px-6 md:pt-24">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.32, 0.72, 0, 1] }}
          className="flex items-center gap-3 font-mono text-xs text-[var(--color-text-1)]"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-[var(--color-success)] opacity-60" />
            <span className="relative h-2 w-2 rounded-full bg-[var(--color-success)]" />
          </span>
          <span>Available for research &amp; engineering roles</span>
          <span className="text-[var(--color-text-2)]">·</span>
          <MapPin className="h-3 w-3" />
          <span>Singapore</span>
        </motion.div>

        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
          className="font-display text-[14vw] leading-[0.88] tracking-tight text-[var(--color-text-0)] md:text-[11vw] lg:text-[9.5rem]"
        >
          <span className="block">Muhammad</span>
          <span className="block gradient-text">Hasif.</span>
        </motion.h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.32, 0.72, 0, 1] }}
          className="max-w-2xl text-balance text-lg text-[var(--color-text-1)] md:text-xl"
        >
          {siteConfig.tagline}
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease: [0.32, 0.72, 0, 1] }}
          className="flex flex-wrap items-center gap-3"
        >
          <Magnetic>
            <Link
              href="/work"
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-[var(--color-text-0)] px-6 text-sm font-medium text-[var(--color-bg-0)] transition hover:opacity-90"
            >
              View work
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Magnetic>
          <Magnetic>
            <Link
              href="/contact"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-1)] px-6 text-sm text-[var(--color-text-0)] transition hover:border-[var(--color-accent)]"
            >
              Get in touch
            </Link>
          </Magnetic>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-10 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-text-2)]"
        >
          <ArrowDown className="h-3 w-3 animate-bounce" />
          Scroll to explore
        </motion.div>
      </div>
    </section>
  );
}
