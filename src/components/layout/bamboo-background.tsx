"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Procedural bamboo backdrop. Three SVG layers (far / mid / near) with:
 *   a) scroll parallax (translateY proportional to window.scrollY)
 *   b) gentle sway loop (CSS keyframes per-layer)
 *   c) cursor-tracked horizontal parallax (per-layer strength)
 *   d) dark warm gradient overlay on top to keep content legible
 *
 * Stalks are SVG <g> nodes built once on mount with deterministic spacing
 * so SSR/CSR markup doesn't drift.
 */
export function BambooBackground() {
  const rootRef = useRef<HTMLDivElement>(null);
  const farRef = useRef<HTMLDivElement>(null);
  const midRef = useRef<HTMLDivElement>(null);
  const nearRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    let raf = 0;
    let mx = 0;
    let scrollY = 0;
    let targetMx = 0;

    const onMove = (e: PointerEvent) => {
      // -1 .. 1 from screen center
      targetMx = (e.clientX / window.innerWidth) * 2 - 1;
    };
    const onScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    const tick = () => {
      mx += (targetMx - mx) * 0.06;
      const far = farRef.current;
      const mid = midRef.current;
      const near = nearRef.current;
      if (far) {
        far.style.setProperty("--cursor-x", `${mx * 6}px`);
        far.style.transform = `translate3d(${mx * 6}px, ${scrollY * -0.04}px, 0)`;
      }
      if (mid) {
        mid.style.setProperty("--cursor-x-mid", `${mx * 14}px`);
        mid.style.transform = `translate3d(${mx * 14}px, ${scrollY * -0.09}px, 0)`;
      }
      if (near) {
        near.style.setProperty("--cursor-x-near", `${mx * 28}px`);
        near.style.transform = `translate3d(${mx * 28}px, ${scrollY * -0.16}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, [reduce]);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-20 overflow-hidden"
      style={{
        background:
          "radial-gradient(120% 100% at 50% 10%, #15110d 0%, #0c0a08 60%, #07050300 100%), linear-gradient(to bottom, #0c0a08 0%, #110d09 60%, #0a0805 100%)",
      }}
    >
      {/* DEEPEST layer — actual dark bamboo photo, very subtle */}
      <div
        className="absolute inset-0 opacity-40 motion-reduce:opacity-25"
        style={{
          backgroundImage: "url('/textures/bamboo.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "blur(1.5px) saturate(0.9) brightness(0.55)",
          mixBlendMode: "screen",
        }}
      />
      {/* FAR layer — many thin pale stalks, slow */}
      <div
        ref={farRef}
        className="absolute inset-0 will-change-transform motion-reduce:!transform-none"
        style={{
          animation: reduce ? undefined : "var(--animate-bamboo-sway-a)",
          filter: "blur(2.5px)",
          opacity: 0.32,
          transformOrigin: "50% 100%",
        }}
      >
        <BambooLayer count={26} hue="#1f3a2c" minWidth={6} maxWidth={12} seed={11} />
      </div>

      {/* MID layer — medium stalks */}
      <div
        ref={midRef}
        className="absolute inset-0 will-change-transform motion-reduce:!transform-none"
        style={{
          animation: reduce ? undefined : "var(--animate-bamboo-sway-b)",
          filter: "blur(0.6px)",
          opacity: 0.55,
          transformOrigin: "50% 100%",
        }}
      >
        <BambooLayer count={14} hue="#2a5a44" minWidth={14} maxWidth={26} seed={29} />
      </div>

      {/* NEAR layer — large foreground stalks at edges */}
      <div
        ref={nearRef}
        className="absolute inset-0 will-change-transform motion-reduce:!transform-none"
        style={{
          animation: reduce ? undefined : "var(--animate-bamboo-sway-c)",
          opacity: 0.78,
          transformOrigin: "50% 100%",
        }}
      >
        <BambooLayer count={5} hue="#3a7a5e" minWidth={36} maxWidth={58} seed={47} edges />
      </div>

      {/* warm gold mist near top */}
      <div
        className="absolute inset-x-0 top-0 h-[44vh]"
        style={{
          background:
            "radial-gradient(80% 100% at 50% 0%, color-mix(in oklab, #c9a857 22%, transparent), transparent 70%)",
          mixBlendMode: "screen",
          opacity: 0.5,
        }}
      />

      {/* dark overlay for legibility */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, color-mix(in oklab, #0c0a08 55%, transparent) 0%, color-mix(in oklab, #0c0a08 30%, transparent) 30%, color-mix(in oklab, #0c0a08 65%, transparent) 75%, #0c0a08 100%)",
        }}
      />

      {/* faint warm vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 50%, transparent 50%, color-mix(in oklab, #0c0a08 88%, transparent))",
        }}
      />
    </div>
  );
}

type LayerProps = {
  count: number;
  hue: string;
  minWidth: number;
  maxWidth: number;
  seed: number;
  edges?: boolean;
};

function BambooLayer({ count, hue, minWidth, maxWidth, seed, edges }: LayerProps) {
  const stalks = buildStalks(count, minWidth, maxWidth, seed, edges ?? false);
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 1600 1000"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`stalk-${seed}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={hue} stopOpacity="0.15" />
          <stop offset="48%" stopColor={hue} stopOpacity="0.95" />
          <stop offset="100%" stopColor={hue} stopOpacity="0.15" />
        </linearGradient>
        <linearGradient id={`leaf-${seed}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={hue} stopOpacity="0.9" />
          <stop offset="100%" stopColor={hue} stopOpacity="0.2" />
        </linearGradient>
      </defs>
      {stalks.map((s, i) => (
        <g key={i} transform={`translate(${s.x} 0)`}>
          {/* stalk shaft */}
          <rect
            x={-s.w / 2}
            y={-40}
            width={s.w}
            height={1080}
            fill={`url(#stalk-${seed})`}
            rx={s.w * 0.35}
          />
          {/* nodes (joints) every ~120-180px */}
          {s.nodes.map((ny, j) => (
            <g key={j}>
              <rect
                x={-s.w * 0.6}
                y={ny - 4}
                width={s.w * 1.2}
                height={6}
                fill={hue}
                opacity="0.55"
                rx={2}
              />
              <rect
                x={-s.w * 0.6}
                y={ny - 2}
                width={s.w * 1.2}
                height={2}
                fill="#000"
                opacity="0.35"
              />
            </g>
          ))}
          {/* leaves at top-ish nodes */}
          {s.leaves.map((l, k) => (
            <path
              key={k}
              d={leafPath(l.size, l.dir)}
              transform={`translate(${l.dir > 0 ? s.w / 2 : -s.w / 2} ${l.y}) rotate(${l.dir * (10 + l.tilt)})`}
              fill={`url(#leaf-${seed})`}
              opacity={0.85}
            />
          ))}
        </g>
      ))}
    </svg>
  );
}

function leafPath(size: number, dir: number) {
  const w = size;
  const h = size * 0.28;
  const x = dir > 0 ? 1 : -1;
  // curved leaf
  return `M 0 0 Q ${(w / 2) * x} ${-h * 0.7} ${w * x} 0 Q ${(w / 2) * x} ${h * 0.7} 0 0 Z`;
}

type Stalk = {
  x: number;
  w: number;
  nodes: number[];
  leaves: { y: number; size: number; dir: number; tilt: number }[];
};

function buildStalks(
  count: number,
  minW: number,
  maxW: number,
  seed: number,
  edges: boolean,
): Stalk[] {
  const rng = mulberry32(seed);
  const out: Stalk[] = [];
  for (let i = 0; i < count; i++) {
    let x: number;
    if (edges) {
      // bias near horizontal edges
      const side = i % 2 === 0 ? -1 : 1;
      x =
        side < 0
          ? rng() * 280 + 20
          : 1600 - (rng() * 280 + 20);
    } else {
      x = rng() * 1600;
    }
    const w = minW + rng() * (maxW - minW);
    const nodeCount = 5 + Math.floor(rng() * 4);
    const nodes: number[] = [];
    let yCursor = -20 + rng() * 80;
    for (let n = 0; n < nodeCount; n++) {
      yCursor += 130 + rng() * 90;
      nodes.push(yCursor);
    }
    const leafCount = 2 + Math.floor(rng() * 3);
    const leaves = [];
    for (let l = 0; l < leafCount; l++) {
      const node = nodes[Math.floor(rng() * nodes.length)];
      leaves.push({
        y: node + (rng() - 0.5) * 30,
        size: 60 + rng() * 80,
        dir: rng() > 0.5 ? 1 : -1,
        tilt: (rng() - 0.5) * 18,
      });
    }
    out.push({ x, w, nodes, leaves });
  }
  return out;
}

function mulberry32(a: number) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
