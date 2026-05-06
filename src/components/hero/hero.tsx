"use client";

import { ArrowDown, ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Magnetic } from "@/components/primitives/magnetic";
import { siteConfig } from "@/../site.config";

export function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] w-full items-center overflow-hidden"
    >
      {/* HUD background — CSS-only, GPU-cheap */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {/* large glow disc behind the title */}
        <div
          className="absolute left-1/2 top-1/2 h-[80vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 motion-reduce:opacity-25"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--color-accent) 30%, transparent), transparent 60%)",
            filter: "blur(60px)",
          }}
        />
        {/* dotted grid + scanlines */}
        <div className="absolute inset-0 bg-cyber-dots opacity-[0.35]" />
        {/* heavy vignette mask so it dies at edges */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, var(--color-bg-0) 100%)",
          }}
        />
        {/* corner brackets */}
        <CornerBrackets />
      </div>

      <motion.div
        style={reduce ? undefined : { y: titleY, opacity: titleOpacity }}
        className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 pt-28 sm:px-6 md:pt-24"
      >
        {/* SYS label */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.32, 0.72, 0, 1] }}
          className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-text-1)]"
        >
          <span className="hud-chip">SYS · ONLINE</span>
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-[var(--color-success)] opacity-60" />
            <span className="relative h-2 w-2 rounded-full bg-[var(--color-success)]" />
          </span>
          <span>Available for research &amp; engineering roles</span>
          <span className="text-[var(--color-text-2)]">·</span>
          <MapPin className="h-3 w-3 text-[var(--color-accent)]" />
          <span>Singapore</span>
        </motion.div>

        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
          className="font-display text-[14vw] leading-[0.88] tracking-tight text-[var(--color-text-0)] md:text-[11vw] lg:text-[9.5rem]"
        >
          <span className="block">Muhammad</span>
          <span className="block gradient-text">Hasif<span className="text-[var(--color-accent)]">.</span></span>
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
            <Link href="/work" className="hud-btn hud-btn-primary">
              View work
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Magnetic>
          <Magnetic>
            <Link href="/contact" className="hud-btn">
              Get in touch
            </Link>
          </Magnetic>
        </motion.div>

        {/* HUD bottom strip */}
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-10 grid grid-cols-2 gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-text-2)] sm:grid-cols-4"
        >
          <HudCell k="NODE" v="r3cap-01" />
          <HudCell k="ROLE" v="research-eng" />
          <HudCell k="LOC"  v="sg/01.367N" />
          <HudCell k="VER"  v="v2.6.0" />
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-text-2)]"
        >
          <ArrowDown className="h-3 w-3 animate-bounce text-[var(--color-accent)]" />
          Scroll to explore
        </motion.div>
      </motion.div>
    </section>
  );
}

function HudCell({ k, v }: { k: string; v: string }) {
  return (
    <div className="border-l border-[var(--color-border)] pl-3">
      <div className="text-[var(--color-text-2)]">{k}</div>
      <div className="text-[var(--color-accent)]">{v}</div>
    </div>
  );
}

function CornerBrackets() {
  const arm = "absolute h-px w-12 bg-[color:color-mix(in_oklab,var(--color-accent)_50%,transparent)]";
  const armV = "absolute w-px h-12 bg-[color:color-mix(in_oklab,var(--color-accent)_50%,transparent)]";
  return (
    <>
      <div className={`${arm} top-24 left-6`} />
      <div className={`${armV} top-24 left-6`} />
      <div className={`${arm} top-24 right-6`} />
      <div className={`${armV} top-24 right-6`} />
      <div className={`${arm} bottom-6 left-6`} />
      <div className={`${armV} bottom-6 left-6 -translate-y-12`} />
      <div className={`${arm} bottom-6 right-6`} />
      <div className={`${armV} bottom-6 right-6 -translate-y-12`} />
    </>
  );
}
