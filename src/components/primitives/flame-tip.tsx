"use client";

import { motion, type MotionValue, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type Orientation = "horizontal" | "vertical";

/**
 * Animated burning flame at the leading edge of a progress bar.
 *
 * The flame body is a single SVG with three layered paths that morph
 * between four keyframes via SMIL animate (real motion, not transform
 * tricks that can stutter when chained with other transitions). A halo
 * pulses behind it. Six spark particles fly off the back in randomized
 * directions, each on its own loop.
 *
 * Driven by a single position prop (number 0..1 OR a MotionValue) so
 * everything lives in one element, with no overlapping bars to desync.
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

  const w = size * 0.65;
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
        willChange: "transform",
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
  // 4 keyframe paths for each flame layer — outer, middle, core.
  // SMIL animateMotion is not used; we morph `d` directly.
  const outer = [
    "M12 32 C 4 26, 4 18, 8 12 C 9 14, 10 14, 11 13 C 10 8, 12 4, 14 0 C 14 6, 18 8, 19 14 C 21 18, 20 26, 12 32 Z",
    "M12 32 C 3 27, 5 17, 7 11 C 8 14, 11 13, 11 14 C 9 9, 13 3, 15 1 C 14 7, 19 7, 20 13 C 22 19, 19 27, 12 32 Z",
    "M12 32 C 5 25, 3 19, 9 13 C 10 15, 10 13, 11 12 C 11 7, 11 5, 13 1 C 15 7, 17 9, 18 15 C 20 17, 21 27, 12 32 Z",
    "M12 32 C 4 27, 5 18, 8 13 C 9 13, 11 14, 11 13 C 10 8, 12 5, 14 0 C 14 7, 18 7, 19 14 C 21 18, 20 26, 12 32 Z",
  ];
  const mid = [
    "M12 31 C 6 25, 6 19, 9 14 C 10 16, 10.5 16, 11 15 C 10 10, 12.5 6, 14 2 C 14 8, 17 10, 18 15 C 19 19, 18 25, 12 31 Z",
    "M12 31 C 5 26, 7 18, 8 13 C 9 16, 11 15, 11 16 C 10 11, 13 5, 15 3 C 14 9, 18 9, 19 14 C 20 20, 18 26, 12 31 Z",
    "M12 31 C 7 25, 5 20, 10 15 C 10 17, 10 15, 11 14 C 11 9, 11 7, 13 3 C 15 9, 16 11, 17 16 C 18 18, 19 26, 12 31 Z",
    "M12 31 C 6 26, 7 19, 9 14 C 10 15, 11 16, 11 15 C 10 10, 13 7, 14 2 C 14 9, 17 9, 18 15 C 19 19, 18 25, 12 31 Z",
  ];
  const core = [
    "M12 29 C 8 24, 8 19, 10.5 16 C 11 17, 11.5 17, 11.7 16 C 11.5 13, 13 9, 14 6 C 14 11, 16 13, 16.5 17 C 17.5 20, 16.5 24, 12 29 Z",
    "M12 29 C 7 25, 9 18, 10 16 C 11 17, 12 16, 12 17 C 11 14, 13 10, 15 7 C 14 12, 17 12, 17 17 C 18 21, 16 24, 12 29 Z",
    "M12 29 C 9 23, 7 19, 11 17 C 11 17, 11 17, 11 16 C 11 13, 12 11, 13 7 C 15 12, 16 14, 16 17 C 17 19, 17 24, 12 29 Z",
    "M12 29 C 8 24, 8 19, 10.5 16 C 11 16, 12 17, 11.7 16 C 11.5 13, 13 9, 14 6 C 14 11, 16 13, 16.5 17 C 17.5 20, 16.5 24, 12 29 Z",
  ];

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 32"
      style={{ overflow: "visible" }}
    >
      <defs>
        <filter id="flame-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.2" />
        </filter>
        <radialGradient id="flame-halo" cx="50%" cy="65%" r="50%">
          <stop offset="0" stopColor="#ff5560" stopOpacity="0.7" />
          <stop offset="1" stopColor="#ff5560" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Halo */}
      <ellipse
        cx="12"
        cy="22"
        rx="11"
        ry="14"
        fill="url(#flame-halo)"
        opacity="0.85"
      >
        {animated && (
          <animate
            attributeName="opacity"
            values="0.6;0.95;0.55;0.85;0.6"
            dur="0.42s"
            repeatCount="indefinite"
          />
        )}
        {animated && (
          <animate
            attributeName="rx"
            values="11;13;10;12;11"
            dur="0.42s"
            repeatCount="indefinite"
          />
        )}
      </ellipse>
      {/* Outer dark-red shell */}
      <path d={outer[0]} fill="#8b0a0a" filter="url(#flame-glow)">
        {animated && (
          <animate
            attributeName="d"
            values={`${outer[0]};${outer[1]};${outer[2]};${outer[3]};${outer[0]}`}
            dur="0.36s"
            repeatCount="indefinite"
          />
        )}
      </path>
      {/* Middle red-orange */}
      <path d={mid[0]} fill="#ff3a2a" opacity="0.95">
        {animated && (
          <animate
            attributeName="d"
            values={`${mid[0]};${mid[1]};${mid[2]};${mid[3]};${mid[0]}`}
            dur="0.32s"
            repeatCount="indefinite"
          />
        )}
      </path>
      {/* White-hot core */}
      <path d={core[0]} fill="#fff5e0" opacity="0.9">
        {animated && (
          <animate
            attributeName="d"
            values={`${core[0]};${core[1]};${core[2]};${core[3]};${core[0]}`}
            dur="0.28s"
            repeatCount="indefinite"
          />
        )}
      </path>
      {/* Inner pinprick */}
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
  // Six independent sparks with different durations + delays + targets.
  const sparks = [
    { d: 1.1, t: 0.0, x: -22, y: 6 },
    { d: 1.4, t: 0.18, x: -28, y: -4 },
    { d: 0.9, t: 0.4, x: -16, y: 10 },
    { d: 1.6, t: 0.6, x: -32, y: 3 },
    { d: 1.0, t: 0.85, x: -18, y: -8 },
    { d: 1.3, t: 1.1, x: -24, y: 8 },
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
              top: horizontal ? "30%" : "70%",
              left: horizontal ? 0 : "55%",
              background:
                "radial-gradient(circle, #fff5e0 0%, #ff5560 50%, transparent 100%)",
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
