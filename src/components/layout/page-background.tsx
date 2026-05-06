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
 * Per-route accent. The global CyberGrid handles the shared moving backdrop;
 * this layer only adds a *stationary* tinted disc + faint ambience to give
 * each page its own identity. Pure CSS, zero rAF.
 */
export function PageBackground({ variant, className }: Props) {
  const cfg = VARIANTS[variant];
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed inset-0 -z-10 overflow-hidden",
        className,
      )}
    >
      {/* Stationary tinted disc — anchored differently per page */}
      <div
        className="absolute rounded-full opacity-40 motion-reduce:opacity-20"
        style={{
          top: cfg.top,
          left: cfg.left,
          right: cfg.right,
          bottom: cfg.bottom,
          width: cfg.size,
          height: cfg.size,
          background: `radial-gradient(circle, color-mix(in oklab, ${cfg.color} 40%, transparent), transparent 65%)`,
          filter: "blur(80px)",
        }}
      />
      {/* Page-specific motif overlay */}
      {cfg.motif === "circuit" && <Circuit />}
      {cfg.motif === "rays"    && <Rays />}
      {cfg.motif === "ripple"  && <Ripple />}
      {cfg.motif === "code"    && <CodeRain />}
      {cfg.motif === "compass" && <Compass />}
    </div>
  );
}

const VARIANTS: Record<
  BackgroundVariant,
  {
    color: string;
    top?: string; left?: string; right?: string; bottom?: string;
    size: string;
    motif: "circuit" | "rays" | "ripple" | "code" | "compass" | "none";
  }
> = {
  home:      { color: "var(--color-accent)",   top: "8%",  left: "50%", size: "720px",  motif: "none" },
  about:     { color: "var(--color-accent-3)", top: "18%", right: "8%", size: "560px",  motif: "circuit" },
  work:      { color: "var(--color-accent)",   top: "12%", left: "10%", size: "520px",  motif: "compass" },
  case:      { color: "var(--color-accent-2)", top: "0%",  left: "50%", size: "640px",  motif: "rays" },
  experience:{ color: "var(--color-warning)",  bottom: "10%", left: "50%", size: "640px", motif: "rays" },
  contact:   { color: "var(--color-accent)",   top: "30%", left: "50%", size: "520px",  motif: "ripple" },
  resume:    { color: "var(--color-accent-2)", top: "10%", left: "50%", size: "560px",  motif: "code" },
  writing:   { color: "var(--color-accent-3)", top: "20%", left: "20%", size: "480px",  motif: "code" },
  notfound:  { color: "var(--color-danger)",   top: "30%", left: "50%", size: "560px",  motif: "rays" },
};

/* ── circuit traces ── */
function Circuit() {
  return (
    <svg
      className="absolute right-[6%] top-[14%] h-[420px] w-[420px] opacity-30 motion-reduce:opacity-15"
      viewBox="0 0 200 200"
      fill="none"
      stroke="currentColor"
      style={{ color: "var(--color-accent)" }}
    >
      <g strokeWidth="0.6">
        <path d="M10 40 L70 40 L70 80 L130 80 L130 30 L190 30" strokeDasharray="2 2" />
        <path d="M10 120 L60 120 L60 160 L120 160 L120 110 L190 110" strokeDasharray="2 2" />
        <circle cx="70" cy="80" r="2" fill="currentColor" />
        <circle cx="130" cy="80" r="2" fill="currentColor" />
        <circle cx="120" cy="160" r="2" fill="currentColor" />
        <circle cx="60" cy="120" r="2" fill="currentColor" />
      </g>
      <g stroke="var(--color-accent-3)" strokeWidth="0.4" opacity="0.5">
        <path d="M10 70 L40 70 L40 100 L100 100" strokeDasharray="1 3" />
      </g>
    </svg>
  );
}

/* ── rising rays — sun-rays from a pivot ── */
function Rays() {
  return (
    <div
      className="absolute inset-0 opacity-[0.08] motion-reduce:opacity-[0.04]"
      style={{
        backgroundImage:
          "repeating-conic-gradient(from 200deg at 50% 0%, color-mix(in oklab, var(--color-accent) 50%, transparent) 0deg 1.6deg, transparent 1.6deg 14deg)",
        maskImage: "radial-gradient(60% 80% at 50% 0%, black, transparent 80%)",
        WebkitMaskImage: "radial-gradient(60% 80% at 50% 0%, black, transparent 80%)",
      }}
    />
  );
}

/* ── concentric rings — hover spotlight target ── */
function Ripple() {
  return (
    <div className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 motion-reduce:hidden">
      {[0, 1, 2].map((r) => (
        <span
          key={r}
          className="absolute left-1/2 top-1/2 block h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full border"
          style={{
            borderColor: "color-mix(in oklab, var(--color-accent) 50%, transparent)",
            borderWidth: 1,
            animation: `pulseSoft ${4 + r}s ease-in-out ${r * 0.6}s infinite`,
            transform: `translate(-50%, -50%) scale(${0.6 + r * 0.4})`,
          }}
        />
      ))}
    </div>
  );
}

/* ── code-rain vertical streams ── */
function CodeRain() {
  return (
    <div
      className="absolute inset-0 opacity-[0.07] motion-reduce:hidden"
      style={{
        backgroundImage:
          "repeating-linear-gradient(to bottom, color-mix(in oklab, var(--color-accent) 50%, transparent) 0 1px, transparent 1px 36px), repeating-linear-gradient(to right, color-mix(in oklab, var(--color-accent) 22%, transparent) 0 1px, transparent 1px 96px)",
      }}
    />
  );
}

/* ── tactical compass ring ── */
function Compass() {
  return (
    <svg
      className="absolute right-[8%] top-[18%] h-[360px] w-[360px] opacity-[0.18] motion-reduce:opacity-[0.1]"
      viewBox="0 0 200 200"
      fill="none"
      stroke="var(--color-accent)"
      strokeWidth="0.5"
    >
      <circle cx="100" cy="100" r="80" />
      <circle cx="100" cy="100" r="60" strokeDasharray="2 4" />
      <circle cx="100" cy="100" r="40" />
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i * 30 * Math.PI) / 180;
        const x1 = 100 + Math.cos(a) * 80;
        const y1 = 100 + Math.sin(a) * 80;
        const x2 = 100 + Math.cos(a) * 88;
        const y2 = 100 + Math.sin(a) * 88;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
      })}
      <line x1="100" y1="20" x2="100" y2="180" strokeDasharray="1 3" opacity="0.6" />
      <line x1="20" y1="100" x2="180" y2="100" strokeDasharray="1 3" opacity="0.6" />
    </svg>
  );
}
