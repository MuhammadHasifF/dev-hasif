"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * Cinematic scroll bridge between Hero and About.
 *
 *  - magnitude.be move: a massive panorama image rises from below the
 *    viewport as the user scrolls, then pins.
 *  - foe.design move: oversized words translate horizontally past the
 *    viewport, in counter-direction to the panorama.
 *  - q-industrial move: a slow orbiting ring + drifting marker dot
 *    persistently rotates as the section is in view.
 */
export function ManifestoScroll() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const panoramaY = useTransform(scrollYProgress, [0, 0.5, 1], ["100%", "0%", "-30%"]);
  const panoramaScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1, 1.05]);
  const wordX = useTransform(scrollYProgress, [0, 1], ["20%", "-60%"]);
  const wordOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const orbit = useTransform(scrollYProgress, [0, 1], [0, 360]);

  // Section-scoped hue shift: 0deg → -32deg into deep crimson as user scrolls through.
  const hue = useTransform(scrollYProgress, [0, 1], [0, -32]);
  const tintOpacity = useTransform(scrollYProgress, [0, 0.25, 0.7, 1], [0, 0.35, 0.55, 0.7]);

  return (
    <section
      ref={ref}
      aria-label="Manifesto scroll"
      className="relative h-[260vh] w-full overflow-clip bg-[var(--color-bg-0)]"
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        {/* Section-scoped scroll-driven hue tint — magnitude.be color-shift, scoped here only */}
        <motion.div
          aria-hidden="true"
          style={
            reduce
              ? undefined
              : {
                  opacity: tintOpacity,
                  ["--mfst-hue" as string]: hue,
                }
          }
          className="pointer-events-none absolute inset-0 z-0"
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 80% at 50% 100%, color-mix(in oklab, var(--color-accent) 38%, transparent) 0%, transparent 70%)",
              filter: "hue-rotate(calc(var(--mfst-hue, 0) * 1deg)) blur(8px)",
              mixBlendMode: "screen",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, transparent 0%, color-mix(in oklab, var(--color-accent) 14%, transparent) 60%, color-mix(in oklab, var(--color-accent) 22%, transparent) 100%)",
              mixBlendMode: "overlay",
              filter: "hue-rotate(calc(var(--mfst-hue, 0) * 1deg))",
            }}
          />
        </motion.div>
        {/* Panorama rising from bottom (magnitude.be move) */}
        <motion.div
          style={reduce ? undefined : { y: panoramaY, scale: panoramaScale }}
          className="absolute inset-0 will-change-transform"
        >
          <Panorama />
        </motion.div>

        {/* Giant horizontal word (foe.design move) */}
        <motion.div
          style={reduce ? undefined : { x: wordX, opacity: wordOpacity }}
          className="pointer-events-none absolute inset-x-0 top-[18%] flex w-[280%] items-center will-change-transform"
        >
          <h2 className="font-display whitespace-nowrap text-[clamp(120px,22vw,360px)] font-medium leading-[0.85] tracking-[-0.05em] text-transparent">
            <span
              style={{
                WebkitTextStroke: "1px color-mix(in oklab, var(--color-text-0) 55%, transparent)",
                filter:
                  "drop-shadow(0 0 24px color-mix(in oklab, var(--color-text-0) 35%, transparent)) drop-shadow(0 0 60px color-mix(in oklab, var(--color-text-0) 18%, transparent))",
              }}
            >
              BUILT FOR THE FIELD
            </span>
            <span
              className="ml-12"
              style={{
                color: "color-mix(in oklab, var(--color-accent) 95%, transparent)",
                textShadow: "0 0 60px color-mix(in oklab, var(--color-accent) 60%, transparent)",
              }}
            >
              ·
            </span>
            <span
              className="ml-12"
              style={{
                WebkitTextStroke: "1px color-mix(in oklab, var(--color-text-0) 45%, transparent)",
                filter:
                  "drop-shadow(0 0 18px color-mix(in oklab, var(--color-text-0) 25%, transparent))",
              }}
            >
              TUNED FOR SCALE
            </span>
          </h2>
        </motion.div>

        {/* Bottom HUD index */}
        <div className="pointer-events-none absolute inset-x-0 bottom-8 z-20 flex items-center justify-between px-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-text-2)] sm:px-8">
          <span>
            <span className="text-[var(--color-accent)]">›</span> SECTOR 00 · MANIFEST
          </span>
          <span className="hidden md:inline">RED CHANNEL · NIGHT FEED</span>
          <span>{"// keep scrolling"}</span>
        </div>

        {/* Orbiting object (q-industrial move) */}
        <motion.div
          style={reduce ? undefined : { rotate: orbit }}
          className="pointer-events-none absolute right-6 top-1/2 z-20 h-40 w-40 -translate-y-1/2 will-change-transform sm:right-12 md:h-56 md:w-56"
        >
          <OrbitRing />
        </motion.div>
      </div>
    </section>
  );
}

function Panorama() {
  return (
    <div className="relative h-full w-full">
      {/* Sky tint */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, #02010300 0%, #0a0306 30%, color-mix(in oklab, var(--color-accent) 16%, #050204) 78%, #000 100%)",
        }}
      />

      {/* Wide skyline SVG */}
      <svg
        viewBox="0 0 2400 1000"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="pano-strip" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--color-accent)" stopOpacity="0" />
            <stop offset="0.12" stopColor="var(--color-accent)" stopOpacity="1" />
            <stop offset="0.88" stopColor="var(--color-accent)" stopOpacity="1" />
            <stop offset="1" stopColor="var(--color-accent)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="pano-build" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#070608" />
            <stop offset="1" stopColor="#000" />
          </linearGradient>
          <radialGradient id="pano-haze" cx="50%" cy="80%" r="60%">
            <stop offset="0" stopColor="var(--color-accent)" stopOpacity="0.45" />
            <stop offset="1" stopColor="var(--color-accent)" stopOpacity="0" />
          </radialGradient>
          <filter id="pano-bloom">
            <feGaussianBlur stdDeviation="2.5" />
          </filter>
        </defs>

        <rect x="0" y="0" width="2400" height="1000" fill="url(#pano-haze)" opacity="0.65" />

        {/* Far skyline ribbon */}
        <g fill="#0a050a" opacity="0.55">
          {Array.from({ length: 60 }).map((_, i) => {
            const x = i * 40;
            const w = 28 + ((i * 7) % 12);
            const h = 80 + ((i * 53) % 160);
            return <rect key={i} x={x} y={620 - h} width={w} height={h} />;
          })}
        </g>

        {/* Mid skyline */}
        <g fill="url(#pano-build)" stroke="#1a0810" strokeWidth="1">
          <rect x="0"    y="500" width="180" height="500" />
          <rect x="190"  y="380" width="130" height="620" />
          <rect x="330"  y="540" width="110" height="460" />
          <rect x="450"  y="300" width="160" height="700" />
          <rect x="620"  y="480" width="120" height="520" />
          <rect x="750"  y="400" width="150" height="600" />
          <rect x="910"  y="320" width="140" height="680" />
          <rect x="1060" y="500" width="120" height="500" />
          <rect x="1190" y="240" width="170" height="760" />
          <rect x="1370" y="460" width="190" height="540" />
          <rect x="1570" y="360" width="140" height="640" />
          <rect x="1720" y="440" width="120" height="560" />
          <rect x="1850" y="280" width="170" height="720" />
          <rect x="2030" y="500" width="130" height="500" />
          <rect x="2170" y="380" width="160" height="620" />
        </g>

        {/* Falling neon strips */}
        <g filter="url(#pano-bloom)">
          {[
            { x: 70,   y0: 540, h: 380 },
            { x: 245,  y0: 410, h: 480 },
            { x: 380,  y0: 580, h: 320 },
            { x: 530,  y0: 320, h: 600 },
            { x: 680,  y0: 510, h: 380 },
            { x: 825,  y0: 430, h: 460 },
            { x: 975,  y0: 360, h: 540 },
            { x: 1115, y0: 530, h: 380 },
            { x: 1265, y0: 270, h: 660 },
            { x: 1450, y0: 490, h: 410 },
            { x: 1635, y0: 390, h: 510 },
            { x: 1780, y0: 470, h: 430 },
            { x: 1925, y0: 310, h: 600 },
            { x: 2090, y0: 530, h: 380 },
            { x: 2245, y0: 410, h: 490 },
          ].map((s, i) => (
            <rect key={i} x={s.x} y={s.y0} width="2.4" height={s.h} fill="url(#pano-strip)" />
          ))}
        </g>

        {/* Window dots */}
        <g fill="var(--color-accent)" opacity="0.4">
          {Array.from({ length: 240 }).map((_, i) => {
            const cols = [40, 240, 380, 510, 670, 810, 970, 1110, 1260, 1430, 1620, 1770, 1920, 2080, 2240];
            const cx = cols[i % cols.length] + ((i * 19) % 110);
            const cy = 320 + ((i * 73) % 600);
            return <rect key={i} x={cx} y={cy} width="1.4" height="1.4" />;
          })}
        </g>
      </svg>

      {/* Heavy red horizon bloom */}
      <div
        className="absolute inset-x-0 bottom-0 h-[40%]"
        style={{
          background:
            "radial-gradient(50% 100% at 50% 100%, color-mix(in oklab, var(--color-accent) 28%, transparent), transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Top + bottom vignettes */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, transparent 18%, transparent 75%, rgba(0,0,0,0.92) 100%)",
        }}
      />
      <div
        className="absolute inset-0 mix-blend-overlay opacity-[0.32]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent 0 2px, rgba(255,30,60,0.04) 2px 3px)",
        }}
      />
    </div>
  );
}

function OrbitRing() {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full">
      <defs>
        <radialGradient id="orbit-marker" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="var(--color-accent)" stopOpacity="1" />
          <stop offset="1" stopColor="var(--color-accent)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle
        cx="100"
        cy="100"
        r="90"
        fill="none"
        stroke="color-mix(in oklab, var(--color-accent) 35%, transparent)"
        strokeWidth="0.7"
        strokeDasharray="2 6"
      />
      <circle
        cx="100"
        cy="100"
        r="72"
        fill="none"
        stroke="color-mix(in oklab, var(--color-text-0) 18%, transparent)"
        strokeWidth="0.5"
      />
      <circle
        cx="100"
        cy="100"
        r="54"
        fill="none"
        stroke="color-mix(in oklab, var(--color-accent) 22%, transparent)"
        strokeWidth="0.5"
        strokeDasharray="1 3"
      />
      {/* tick marks */}
      {Array.from({ length: 24 }).map((_, i) => {
        const a = (i * 15 * Math.PI) / 180;
        const x1 = 100 + Math.cos(a) * 90;
        const y1 = 100 + Math.sin(a) * 90;
        const x2 = 100 + Math.cos(a) * (i % 6 === 0 ? 100 : 95);
        const y2 = 100 + Math.sin(a) * (i % 6 === 0 ? 100 : 95);
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="color-mix(in oklab, var(--color-text-0) 30%, transparent)"
            strokeWidth="0.7"
          />
        );
      })}
      {/* drifting marker */}
      <circle cx="190" cy="100" r="6" fill="url(#orbit-marker)" />
      <circle cx="190" cy="100" r="2.4" fill="var(--color-accent)" />
      {/* center crosshair */}
      <line x1="92" y1="100" x2="108" y2="100" stroke="var(--color-accent)" strokeWidth="0.6" />
      <line x1="100" y1="92" x2="100" y2="108" stroke="var(--color-accent)" strokeWidth="0.6" />
      <text
        x="100"
        y="46"
        fill="color-mix(in oklab, var(--color-text-0) 70%, transparent)"
        fontFamily="var(--font-mono)"
        fontSize="6"
        textAnchor="middle"
        letterSpacing="2"
      >
        SECTOR 00
      </text>
      <text
        x="100"
        y="160"
        fill="color-mix(in oklab, var(--color-accent) 80%, transparent)"
        fontFamily="var(--font-mono)"
        fontSize="6"
        textAnchor="middle"
        letterSpacing="2"
      >
        01.42 / N
      </text>
    </svg>
  );
}
