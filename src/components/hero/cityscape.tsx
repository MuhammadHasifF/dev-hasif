"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";

/**
 * Aerial cyberpunk cityscape.
 * Three parallax SVG layers (back / mid / front) + atmospheric red haze,
 * fog drift, scanlines, and a slow conic glow on the horizon. Pure SVG;
 * no images required.
 */
export function Cityscape({ progress }: { progress?: MotionValue<number> }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress: localProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const sy = progress ?? localProgress;

  const yBack = useTransform(sy, [0, 1], ["0%", "-8%"]);
  const yMid = useTransform(sy, [0, 1], ["0%", "-22%"]);
  const yFront = useTransform(sy, [0, 1], ["0%", "-40%"]);
  const fogX = useTransform(sy, [0, 1], ["0%", "-15%"]);
  const haloOpacity = useTransform(sy, [0, 0.6], [1, 0.35]);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    const hover = window.matchMedia("(hover: hover)").matches;
    if (!hover) return;
    let pending = false;
    let mx = 0;
    let my = 0;
    const apply = () => {
      pending = false;
      el.style.setProperty("--tilt-x", `${mx * 0.5}deg`);
      el.style.setProperty("--tilt-y", `${my * -0.5}deg`);
    };
    const onMove = (e: PointerEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
      if (pending) return;
      pending = true;
      requestAnimationFrame(apply);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      style={
        {
          backgroundColor: "#000",
          ["--tilt-x" as string]: "0deg",
          ["--tilt-y" as string]: "0deg",
          perspective: "1200px",
        } as React.CSSProperties
      }
    >
      {/* Sky gradient — deep red haze fading down to black */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, #050204 0%, #0a0306 30%, #1a0610 55%, color-mix(in oklab, var(--color-accent) 18%, #000) 72%, #050204 95%)",
        }}
      />

      {/* Faraway skyline halo — red bloom on horizon */}
      <motion.div
        style={{ opacity: haloOpacity }}
        className="absolute inset-x-[-10%] bottom-[18%] h-[55vh]"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 80% at 50% 90%, color-mix(in oklab, var(--color-accent) 35%, transparent) 0%, transparent 65%)",
            filter: "blur(40px)",
          }}
        />
      </motion.div>

      {/* Distant skyline (back layer, far) */}
      <motion.svg
        style={{ y: reduce ? "0%" : yBack }}
        viewBox="0 0 1600 400"
        preserveAspectRatio="xMidYEnd slice"
        className="absolute inset-x-0 bottom-[28%] h-[40vh] w-full opacity-50"
      >
        <defs>
          <linearGradient id="far-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0c060a" stopOpacity="0.6" />
            <stop offset="1" stopColor="#000" />
          </linearGradient>
          <linearGradient id="far-glow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--color-accent)" stopOpacity="0.0" />
            <stop offset="0.7" stopColor="var(--color-accent)" stopOpacity="0.6" />
            <stop offset="1" stopColor="var(--color-accent)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g fill="url(#far-fade)">
          <rect x="20" y="220" width="60" height="180" />
          <rect x="100" y="180" width="40" height="220" />
          <rect x="160" y="240" width="80" height="160" />
          <rect x="260" y="160" width="50" height="240" />
          <rect x="330" y="200" width="70" height="200" />
          <rect x="420" y="140" width="60" height="260" />
          <rect x="500" y="220" width="90" height="180" />
          <rect x="610" y="170" width="45" height="230" />
          <rect x="675" y="200" width="65" height="200" />
          <rect x="760" y="130" width="80" height="270" />
          <rect x="860" y="190" width="55" height="210" />
          <rect x="935" y="220" width="70" height="180" />
          <rect x="1025" y="150" width="60" height="250" />
          <rect x="1105" y="200" width="90" height="200" />
          <rect x="1215" y="170" width="50" height="230" />
          <rect x="1285" y="220" width="65" height="180" />
          <rect x="1370" y="180" width="80" height="220" />
          <rect x="1470" y="230" width="55" height="170" />
        </g>
        {/* Faint vertical neon lines on a few far towers */}
        <g>
          {[120, 280, 445, 525, 790, 950, 1130, 1240, 1395].map((x, i) => (
            <rect
              key={i}
              x={x}
              y={130 + (i % 4) * 30}
              width="1.2"
              height={140 + (i % 3) * 30}
              fill="url(#far-glow)"
            />
          ))}
        </g>
      </motion.svg>

      {/* Mid skyline — taller blocky monoliths */}
      <motion.svg
        style={{ y: reduce ? "0%" : yMid }}
        viewBox="0 0 1600 700"
        preserveAspectRatio="xMidYEnd slice"
        className="absolute inset-x-0 bottom-[8%] h-[60vh] w-full"
      >
        <defs>
          <linearGradient id="mid-build" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#08070b" />
            <stop offset="1" stopColor="#000" />
          </linearGradient>
          <linearGradient id="strip-glow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--color-accent)" stopOpacity="0" />
            <stop offset="0.15" stopColor="var(--color-accent)" stopOpacity="0.95" />
            <stop offset="0.85" stopColor="var(--color-accent)" stopOpacity="0.95" />
            <stop offset="1" stopColor="var(--color-accent)" stopOpacity="0" />
          </linearGradient>
          <filter id="strip-bloom" x="-50%" y="-10%" width="200%" height="120%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>
        <g fill="url(#mid-build)" stroke="#1a0a10" strokeWidth="1">
          <rect x="-20" y="220" width="170" height="500" />
          <rect x="170" y="120" width="130" height="600" />
          <rect x="320" y="280" width="110" height="440" />
          <rect x="450" y="60"  width="160" height="660" />
          <rect x="630" y="240" width="120" height="480" />
          <rect x="770" y="160" width="150" height="560" />
          <rect x="940" y="100" width="140" height="620" />
          <rect x="1100" y="220" width="120" height="500" />
          <rect x="1240" y="40"  width="170" height="680" />
          <rect x="1430" y="200" width="190" height="520" />
        </g>
        {/* Falling neon strips, Balaskas-style */}
        <g filter="url(#strip-bloom)">
          {[
            { x: 60,   y0: 240, h: 320 },
            { x: 230,  y0: 140, h: 460 },
            { x: 370,  y0: 300, h: 280 },
            { x: 525,  y0: 80,  h: 540 },
            { x: 690,  y0: 260, h: 380 },
            { x: 845,  y0: 180, h: 440 },
            { x: 1010, y0: 120, h: 500 },
            { x: 1160, y0: 240, h: 360 },
            { x: 1325, y0: 60,  h: 600 },
            { x: 1525, y0: 220, h: 380 },
          ].map((s, i) => (
            <rect
              key={i}
              x={s.x}
              y={s.y0}
              width="2"
              height={s.h}
              fill="url(#strip-glow)"
            />
          ))}
        </g>
        {/* Sparse window dots on monoliths */}
        <g fill="var(--color-accent)" opacity="0.42">
          {Array.from({ length: 80 }).map((_, i) => {
            const cols = [60, 200, 360, 500, 700, 850, 1000, 1160, 1310, 1500];
            const cx = cols[i % cols.length] + ((i * 17) % 100);
            const cy = 200 + ((i * 53) % 460);
            return <rect key={i} x={cx} y={cy} width="1" height="1" />;
          })}
        </g>
      </motion.svg>

      {/* Front foreground silhouette + heavy fog */}
      <motion.svg
        style={{ y: reduce ? "0%" : yFront }}
        viewBox="0 0 1600 300"
        preserveAspectRatio="xMidYEnd slice"
        className="absolute inset-x-0 bottom-0 h-[28vh] w-full"
      >
        <defs>
          <linearGradient id="front-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#000" />
            <stop offset="1" stopColor="#000" />
          </linearGradient>
        </defs>
        <path
          d="M0,300 L0,140 L80,140 L80,90 L210,90 L210,170 L340,170 L340,40 L460,40 L460,170 L600,170 L600,110 L760,110 L760,30 L900,30 L900,150 L1040,150 L1040,80 L1180,80 L1180,170 L1320,170 L1320,50 L1460,50 L1460,180 L1600,180 L1600,300 Z"
          fill="url(#front-fade)"
        />
      </motion.svg>

      {/* Rolling fog band */}
      <motion.div
        style={{ x: reduce ? "0%" : fogX }}
        className="absolute inset-x-[-20%] bottom-[18%] h-[28vh]"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(80% 60% at 50% 50%, rgba(255,30,60,0.06), transparent 70%), radial-gradient(60% 50% at 30% 60%, rgba(255,255,255,0.04), transparent 70%), radial-gradient(60% 50% at 80% 40%, rgba(255,30,60,0.04), transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </motion.div>

      {/* Top vignette + scanlines + grain */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 22%, transparent 70%, rgba(0,0,0,0.85) 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.35] mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent 0 2px, rgba(255,30,60,0.03) 2px 3px)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(140% 90% at 50% 50%, transparent 35%, rgba(0,0,0,0.55) 80%, rgba(0,0,0,0.95) 100%)",
        }}
      />
    </div>
  );
}
