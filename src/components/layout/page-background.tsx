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
 * Per-route decorative motifs layered above the always-on bamboo backdrop.
 * Each variant uses a distinct zen motif tied to the page's intent so no two
 * routes share the same imagery — see HomeMotif / WorkMotif / etc. below.
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
      {/* Universal cursor spotlight — warm jade tint */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(620px circle at var(--mx) var(--my), color-mix(in oklab, var(--color-accent) 16%, transparent), transparent 60%)",
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
    </div>
  );
}

/* ---------------- Home — rising warm sun + drifting embers ---------------- */
function HomeMotif() {
  return (
    <>
      <div
        className="absolute left-1/2 top-[8%] h-[680px] w-[680px] -translate-x-1/2 rounded-full blur-3xl opacity-35 motion-reduce:opacity-20"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-accent-2) 70%, transparent), transparent 65%)",
          animation: "var(--animate-ink-breathe)",
        }}
      />
      <div
        className="absolute -left-32 bottom-[18%] h-[420px] w-[420px] rounded-full blur-3xl opacity-25 motion-reduce:hidden"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-accent) 65%, transparent), transparent 70%)",
          animation: "float 14s ease-in-out infinite",
        }}
      />
      <Embers />
    </>
  );
}

function Embers() {
  // gold dust drifting upward — pure CSS, deterministic positions
  const dots = Array.from({ length: 22 }, (_, i) => i);
  return (
    <div className="absolute inset-0 motion-reduce:hidden">
      {dots.map((i) => {
        const left = (i * 4.7 + 7) % 100;
        const delay = (i * 0.31) % 6;
        const dur = 14 + (i % 6) * 2;
        const size = 1.5 + (i % 4) * 0.6;
        return (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${left}%`,
              bottom: "-10px",
              width: size,
              height: size,
              background:
                "color-mix(in oklab, var(--color-accent-2) 80%, transparent)",
              opacity: 0.55,
              filter: "blur(0.4px)",
              animation: `drift ${dur}s linear ${delay}s infinite, float ${dur / 2}s ease-in-out ${delay}s infinite`,
              transform: "translateY(-100vh)",
            }}
          />
        );
      })}
    </div>
  );
}

/* ---------------- About — concentric ink-wash circles + warm mesh ---------------- */
function AboutMotif() {
  return (
    <>
      <div
        className="absolute inset-0 opacity-50 motion-reduce:opacity-25"
        style={{
          background:
            "radial-gradient(40% 50% at 22% 32%, color-mix(in oklab, var(--color-accent-3) 28%, transparent), transparent 70%), radial-gradient(50% 60% at 80% 70%, color-mix(in oklab, var(--color-accent) 24%, transparent), transparent 70%), radial-gradient(60% 60% at 60% 18%, color-mix(in oklab, var(--color-accent-2) 22%, transparent), transparent 70%)",
          animation: "var(--animate-mesh-breathe)",
          filter: "blur(50px)",
        }}
      />
      {/* enso-style ink rings */}
      <svg
        className="absolute right-[8%] top-[18%] h-[420px] w-[420px] opacity-25 motion-reduce:opacity-15"
        viewBox="0 0 200 200"
        fill="none"
      >
        {[80, 64, 48, 32].map((r, i) => (
          <circle
            key={r}
            cx="100"
            cy="100"
            r={r}
            stroke="var(--color-accent-2)"
            strokeWidth={0.6 + i * 0.3}
            strokeDasharray={`${r * 0.85} ${r * 0.45}`}
            strokeLinecap="round"
            style={{
              transformOrigin: "center",
              animation: `bambooSwayA ${22 + i * 6}s ease-in-out infinite`,
              opacity: 0.7 - i * 0.12,
            }}
          />
        ))}
      </svg>
    </>
  );
}

/* ---------------- Work — shoji screen lattice + cursor reveal ---------------- */
function WorkMotif() {
  return (
    <>
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(to right, color-mix(in oklab, var(--color-accent-2) 60%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--color-accent-2) 60%, transparent) 1px, transparent 1px)",
          backgroundSize: "72px 56px",
          maskImage:
            "radial-gradient(420px circle at var(--mx) var(--my), black 30%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(420px circle at var(--mx) var(--my), black 30%, transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-text-2) 1px, transparent 1px), linear-gradient(to bottom, var(--color-text-2) 1px, transparent 1px)",
          backgroundSize: "72px 56px",
        }}
      />
    </>
  );
}

/* ---------------- Case — temple roof tile pattern ---------------- */
function CaseMotif() {
  return (
    <>
      <div
        className="absolute inset-x-0 top-0 h-[60vh] opacity-[0.08]"
        style={{
          backgroundImage:
            "repeating-radial-gradient(circle at 50% 100%, transparent 0 38px, color-mix(in oklab, var(--color-accent-3) 70%, transparent) 38px 40px, transparent 40px 76px)",
          backgroundSize: "120px 60px",
          maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-text-2) 1px, transparent 1px)",
          backgroundSize: "96px 100%",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 30%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 30%, transparent 100%)",
        }}
      />
    </>
  );
}

/* ---------------- Experience — rising sun radial + horizon line ---------------- */
function ExperienceMotif() {
  return (
    <>
      <div
        className="absolute inset-x-0 bottom-0 h-[70vh]"
        style={{
          background:
            "radial-gradient(80% 100% at 50% 100%, color-mix(in oklab, var(--color-accent-3) 35%, transparent) 0%, color-mix(in oklab, var(--color-accent-2) 14%, transparent) 35%, transparent 70%)",
          maskImage: "linear-gradient(to top, black 30%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to top, black 30%, transparent 100%)",
        }}
      />
      {/* radiating sunray slats */}
      <div
        className="absolute inset-x-0 bottom-[18vh] h-[60vh] opacity-[0.1]"
        style={{
          backgroundImage:
            "repeating-conic-gradient(from 200deg at 50% 100%, color-mix(in oklab, var(--color-accent-2) 60%, transparent) 0deg 2deg, transparent 2deg 14deg)",
          maskImage: "radial-gradient(60% 100% at 50% 100%, black, transparent 80%)",
          WebkitMaskImage: "radial-gradient(60% 100% at 50% 100%, black, transparent 80%)",
        }}
      />
    </>
  );
}

/* ---------------- Contact — koi pond ripples ---------------- */
function ContactMotif() {
  const ripples = [0, 1, 2];
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 80% at 50% 60%, color-mix(in oklab, var(--color-accent) 12%, transparent), transparent 70%)",
        }}
      />
      <div className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 motion-reduce:hidden">
        {ripples.map((r) => (
          <span
            key={r}
            className="absolute left-1/2 top-1/2 block h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border"
            style={{
              borderColor:
                "color-mix(in oklab, var(--color-accent) 55%, transparent)",
              borderWidth: 1,
              animation: `ripple 7s ease-out ${r * 2.2}s infinite`,
            }}
          />
        ))}
      </div>
      <div
        className="absolute right-[8%] top-[14%] h-[260px] w-[260px] motion-reduce:hidden"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-accent-3) 50%, transparent), transparent 70%)",
          filter: "blur(40px)",
          animation: "float 12s ease-in-out infinite",
        }}
      />
    </>
  );
}

/* ---------------- Resume — rice paper texture + warm spotlight ---------------- */
function ResumeMotif() {
  return (
    <>
      <div className="absolute inset-0 bg-rice-paper opacity-30 mix-blend-screen" />
      <div
        className="absolute inset-x-0 top-0 h-[40vh]"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 0%, color-mix(in oklab, var(--color-accent-2) 22%, transparent), transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.08] motion-reduce:hidden"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, color-mix(in oklab, var(--color-accent-2) 60%, transparent) 0 1px, transparent 1px 4px)",
          mixBlendMode: "overlay",
        }}
      />
    </>
  );
}

/* ---------------- Writing — vertical rule guides + ink stroke ---------------- */
function WritingMotif() {
  return (
    <>
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, var(--color-text-1) 0 1px, transparent 1px 36px)",
        }}
      />
      <svg
        className="absolute right-[6%] top-[22%] h-[280px] w-[280px] opacity-25 motion-reduce:opacity-15"
        viewBox="0 0 200 200"
      >
        <path
          d="M 30 130 Q 60 50 100 120 T 170 80"
          stroke="var(--color-accent-3)"
          strokeWidth={3}
          strokeLinecap="round"
          fill="none"
          style={{ animation: "var(--animate-ink-breathe)" }}
        />
      </svg>
    </>
  );
}

/* ---------------- 404 — drifting petals ---------------- */
function NotFoundMotif() {
  const petals = Array.from({ length: 14 }, (_, i) => i);
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 60% at 50% 40%, color-mix(in oklab, var(--color-accent-3) 24%, transparent), transparent 70%)",
          filter: "blur(50px)",
        }}
      />
      <div className="absolute inset-0 motion-reduce:hidden">
        {petals.map((i) => {
          const left = (i * 7.3 + 5) % 100;
          const delay = (i * 0.5) % 8;
          const dur = 18 + (i % 5) * 3;
          return (
            <span
              key={i}
              className="absolute h-2 w-2 rotate-45 rounded-[1px]"
              style={{
                left: `${left}%`,
                top: "-10px",
                background:
                  "color-mix(in oklab, var(--color-accent-3) 75%, transparent)",
                opacity: 0.6,
                animation: `drift ${dur}s linear ${delay}s infinite, float ${dur / 3}s ease-in-out ${delay}s infinite`,
                transform: "translateY(110vh) rotate(45deg)",
              }}
            />
          );
        })}
      </div>
    </>
  );
}
