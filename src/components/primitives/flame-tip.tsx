"use client";

import { motion, type MotionValue, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type Orientation = "horizontal" | "vertical";

/**
 * Animated flame that sits at the leading edge of a progress bar.
 *
 * Critical: the flame uses the SAME positioning source as the bar fill
 * (a single percent value), so there's no second tween to drift. Built
 * as a single absolutely-positioned wrapper that translates via CSS
 * left/top; no transition lag. SVG paths animate via lightweight CSS
 * scale + a couple of SMIL morphs at the very tip.
 *
 * 4 spark particles only (was 12). Smoke wisp removed. The flame body
 * pulses via CSS keyframe (scale x/y on opposing axes) which is GPU-only
 * — no React state, no per-frame work.
 *
 * Reduced motion: static flame, no sparks.
 */
export function FlameTip({
  progress,
  orientation = "horizontal",
  size = 22,
}: {
  progress: number | MotionValue<number>;
  orientation?: Orientation;
  size?: number;
}) {
  const reduce = useReducedMotion();
  const [touch, setTouch] = useState(false);

  useEffect(() => {
    setTouch(window.matchMedia("(hover: none) and (pointer: coarse)").matches);
  }, []);

  const isMV = typeof progress !== "number";
  const horizontal = orientation === "horizontal";

  const positionStyle = horizontal
    ? { left: isMV ? undefined : `${(progress as number) * 100}%`, top: "50%" }
    : { top: isMV ? undefined : `${(progress as number) * 100}%`, left: "50%" };

  const w = size * 0.6;
  const h = size;
  const transform = horizontal
    ? "translate(-50%, -68%)"
    : "translate(-50%, -32%) rotate(180deg)";

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute"
      style={{
        ...positionStyle,
        ...(isMV
          ? horizontal
            ? { left: progress as MotionValue<number> }
            : { top: progress as MotionValue<number> }
          : {}),
        transform,
        willChange: "left, top",
      }}
    >
      <FlameSvg width={w} height={h} animated={!reduce} />
      {!reduce && !touch && <Sparks orientation={orientation} />}
    </motion.div>
  );
}

function FlameSvg({
  width,
  height,
  animated,
}: {
  width: number;
  height: number;
  animated: boolean;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 32"
      style={{
        overflow: "visible",
        animation: animated ? "flameBodyPulse 0.32s ease-in-out infinite alternate" : undefined,
        filter:
          "drop-shadow(0 0 6px color-mix(in oklab, var(--color-accent) 80%, transparent)) drop-shadow(0 0 14px color-mix(in oklab, var(--color-accent) 50%, transparent))",
        transformOrigin: "50% 100%",
      }}
    >
      <defs>
        <radialGradient id="flame-halo" cx="50%" cy="65%" r="50%">
          <stop offset="0" stopColor="#ff5560" stopOpacity="0.75" />
          <stop offset="1" stopColor="#ff5560" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse
        cx="12"
        cy="22"
        rx="11"
        ry="14"
        fill="url(#flame-halo)"
        style={animated ? { animation: "flameHaloPulse 0.42s ease-in-out infinite alternate" } : undefined}
      />
      <path
        d="M12 32 C 4 26, 4 18, 8 12 C 9 14, 10 14, 11 13 C 10 8, 12 4, 14 0 C 14 6, 18 8, 19 14 C 21 18, 20 26, 12 32 Z"
        fill="#8b0a0a"
      />
      <path
        d="M12 31 C 6 25, 6 19, 9 14 C 10 16, 10.5 16, 11 15 C 10 10, 12.5 6, 14 2 C 14 8, 17 10, 18 15 C 19 19, 18 25, 12 31 Z"
        fill="#ff3a2a"
        opacity="0.95"
        style={animated ? { animation: "flameMidWiggle 0.24s steps(4, end) infinite" } : undefined}
        transform-origin="50% 100%"
      />
      <path
        d="M12 29 C 8 24, 8 19, 10.5 16 C 11 17, 11.5 17, 11.7 16 C 11.5 13, 13 9, 14 6 C 14 11, 16 13, 16.5 17 C 17.5 20, 16.5 24, 12 29 Z"
        fill="#fff5e0"
        opacity="0.9"
        style={animated ? { animation: "flameCoreWiggle 0.18s steps(3, end) infinite" } : undefined}
      />
      <ellipse cx="12.5" cy="22" rx="1.3" ry="3" fill="#ffffff" opacity="0.9">
        {animated && (
          <animate
            attributeName="ry"
            values="3;4.2;2.4;3.5;3"
            dur="0.24s"
            repeatCount="indefinite"
          />
        )}
      </ellipse>
    </svg>
  );
}

function Sparks({ orientation }: { orientation: Orientation }) {
  const horizontal = orientation === "horizontal";
  const sparks = [
    { d: 1.1, t: 0.0, x: -22, y: 6 },
    { d: 1.4, t: 0.35, x: -28, y: -4 },
    { d: 0.95, t: 0.7, x: -18, y: 10 },
    { d: 1.25, t: 1.05, x: -24, y: -7 },
  ];
  return (
    <>
      {sparks.map((s, i) => {
        const dx = horizontal ? s.x : Math.abs(s.y);
        const dy = horizontal ? s.y : Math.abs(s.x);
        return (
          <span
            key={i}
            className="absolute h-[3px] w-[3px] rounded-full"
            style={{
              top: horizontal ? "32%" : "68%",
              left: horizontal ? 0 : "55%",
              background:
                "radial-gradient(circle, #fff5e0 0%, #ff5560 55%, transparent 100%)",
              boxShadow:
                "0 0 6px #ff5560, 0 0 10px color-mix(in oklab, var(--color-accent) 70%, transparent)",
              opacity: 0,
              animation: `${horizontal ? "sparkFly" : "sparkFlyV"} ${s.d}s ${s.t}s linear infinite`,
              ["--dx" as string]: `${dx}px`,
              ["--dy" as string]: `${dy}px`,
            } as React.CSSProperties}
          />
        );
      })}
    </>
  );
}
