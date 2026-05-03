"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export type BackgroundVariant =
  | "home"
  | "about"
  | "work"
  | "case"
  | "experience"
  | "contact"
  | "resume"
  | "writing"
  | "notfound";

type Props = { variant: BackgroundVariant; className?: string };

/**
 * Persistent decorative background that varies per route while keeping
 * the same dark palette + accent set. Pointer-tracked spotlight on every
 * page; per-variant motifs layered behind.
 */
export function PageBackground({ variant, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      el.style.setProperty("--mx", `${e.clientX}px`);
      el.style.setProperty("--my", `${e.clientY}px`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed inset-0 -z-10 overflow-hidden",
        className,
      )}
      style={
        {
          ["--mx" as string]: "50vw",
          ["--my" as string]: "50vh",
        } as React.CSSProperties
      }
    >
      {/* Universal cursor spotlight */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(600px circle at var(--mx) var(--my), color-mix(in oklab, var(--color-accent) 12%, transparent), transparent 60%)",
        }}
      />

      {variant === "home" && <HomeMotif />}
      {variant === "about" && <AboutMotif />}
      {variant === "work" && <WorkMotif />}
      {variant === "case" && <CaseMotif />}
      {variant === "experience" && <ExperienceMotif />}
      {variant === "contact" && <ContactMotif />}
      {variant === "resume" && <ResumeMotif />}
      {variant === "writing" && <WritingMotif />}
      {variant === "notfound" && <NotFoundMotif />}

      {/* Subtle vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 0%, transparent 60%, color-mix(in oklab, var(--color-bg-0) 70%, transparent))",
        }}
      />
    </div>
  );
}

function HomeMotif() {
  // Soft accent blobs that float
  return (
    <>
      <div
        className="absolute -left-40 top-[10%] h-[520px] w-[520px] rounded-full blur-3xl opacity-30 motion-reduce:hidden"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-accent) 60%, transparent), transparent 70%)",
          animation: "float 14s ease-in-out infinite",
        }}
      />
      <div
        className="absolute -right-40 top-[40%] h-[600px] w-[600px] rounded-full blur-3xl opacity-25 motion-reduce:hidden"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-accent-2) 60%, transparent), transparent 70%)",
          animation: "float 18s ease-in-out infinite reverse",
        }}
      />
    </>
  );
}

function AboutMotif() {
  // Animated gradient mesh that breathes
  return (
    <div
      className="absolute inset-0 opacity-50 motion-reduce:opacity-30"
      style={{
        background:
          "radial-gradient(50% 60% at 20% 30%, color-mix(in oklab, var(--color-accent-3) 35%, transparent), transparent 70%), radial-gradient(50% 60% at 80% 70%, color-mix(in oklab, var(--color-accent) 30%, transparent), transparent 70%), radial-gradient(60% 60% at 60% 20%, color-mix(in oklab, var(--color-accent-2) 25%, transparent), transparent 70%)",
        animation: "meshBreathe 18s ease-in-out infinite",
        filter: "blur(40px)",
      }}
    />
  );
}

function WorkMotif() {
  // Dot grid that lights up under cursor
  return (
    <>
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--color-text-1) 1px, transparent 1.4px)",
          backgroundSize: "26px 26px",
          maskImage:
            "radial-gradient(380px circle at var(--mx) var(--my), black 30%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(380px circle at var(--mx) var(--my), black 30%, transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--color-text-2) 1px, transparent 1.4px)",
          backgroundSize: "26px 26px",
        }}
      />
    </>
  );
}

function CaseMotif() {
  return (
    <>
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-text-2) 1px, transparent 1px), linear-gradient(to bottom, var(--color-text-2) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "linear-gradient(to bottom, black, transparent 80%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black, transparent 80%)",
        }}
      />
    </>
  );
}

function ExperienceMotif() {
  return (
    <div
      className="absolute inset-0 opacity-30"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, color-mix(in oklab, var(--color-accent) 30%, transparent), transparent 40%)",
        maskImage:
          "linear-gradient(to bottom, black, transparent 70%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, black, transparent 70%)",
      }}
    />
  );
}

function ContactMotif() {
  return (
    <>
      <div
        className="absolute right-[10%] top-[20%] h-[460px] w-[460px] rounded-full blur-3xl opacity-30 motion-reduce:hidden"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-accent) 55%, transparent), transparent 70%)",
          animation: "float 16s ease-in-out infinite",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-text-2) 1px, transparent 1px)",
          backgroundSize: "120px 100%",
        }}
      />
    </>
  );
}

function ResumeMotif() {
  // CRT scanline frame
  return (
    <div
      className="absolute inset-0 opacity-[0.12] mix-blend-overlay motion-reduce:hidden"
      style={{
        backgroundImage:
          "repeating-linear-gradient(to bottom, color-mix(in oklab, var(--color-accent-2) 60%, transparent) 0 1px, transparent 1px 3px)",
      }}
    />
  );
}

function WritingMotif() {
  return (
    <div
      className="absolute inset-0 opacity-[0.05]"
      style={{
        backgroundImage:
          "repeating-linear-gradient(to bottom, var(--color-text-1) 0 1px, transparent 1px 32px)",
      }}
    />
  );
}

function NotFoundMotif() {
  return (
    <div
      className="absolute inset-0 opacity-40"
      style={{
        background:
          "radial-gradient(60% 60% at 50% 50%, color-mix(in oklab, var(--color-accent-3) 25%, transparent), transparent 70%)",
        filter: "blur(60px)",
      }}
    />
  );
}
