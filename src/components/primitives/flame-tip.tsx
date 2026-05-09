"use client";

import { motion, type MotionValue, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type Orientation = "horizontal" | "vertical";

/**
 * Burning flame tip + trailing sparks. Lives at the leading edge of a
 * progress bar / line. Can run in two orientations:
 *   - horizontal: flame curls upward, sparks drift leftward + fall
 *   - vertical:   flame curls downward, sparks drift rightward + fall
 *
 * Pass either a numeric `progress` (0–1) for static placement, or a
 * MotionValue<number> for smooth scroll-bound positioning. The flame's
 * SVG paths flicker via a stepped CSS animation (~12fps "organic, not
 * mechanical" feel). On `prefers-reduced-motion` the flame is rendered
 * static + sparks are hidden.
 */
export function FlameTip({
  progress,
  orientation = "horizontal",
  size = 18,
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

  // Position: drive `left` (h) or `top` (v) from progress; centered on the leading edge.
  const positionStyle = horizontal
    ? { left: isMV ? undefined : `${(progress as number) * 100}%`, top: "50%" }
    : { top: isMV ? undefined : `${(progress as number) * 100}%`, left: "50%" };

  const sizeProp = size; // viewBox is 24x32; we scale it via width/height attrs.
  const w = horizontal ? sizeProp * 0.6 : sizeProp * 0.6;
  const h = horizontal ? sizeProp : sizeProp;

  const transform = horizontal
    ? "translate(-50%, -65%)"
    : "translate(-50%, -35%) rotate(180deg)";

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute"
      style={{
        ...positionStyle,
        ...(isMV ? (horizontal ? { left: progress as MotionValue<number> } : { top: progress as MotionValue<number> }) : {}),
        transform,
        transition: "left 80ms linear, top 80ms linear",
        willChange: "transform",
      }}
    >
      <FlameSvg width={w} height={h} animated={!reduce} />
      {!reduce && !touch && <SparkTrail orientation={orientation} />}
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
        animation: animated ? "flameFlicker 360ms steps(8, end) infinite" : undefined,
        filter:
          "drop-shadow(0 0 6px color-mix(in oklab, var(--color-accent) 80%, transparent)) drop-shadow(0 0 14px color-mix(in oklab, var(--color-accent) 50%, transparent))",
      }}
    >
      <defs>
        <filter id="flame-bloom" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="0.4" />
        </filter>
      </defs>
      {/* Outer dark-red shell */}
      <path
        d="M12 32 C 4 26, 4 18, 8 12 C 9 14, 10 14, 11 13 C 10 8, 12 4, 14 0 C 14 6, 18 8, 19 14 C 21 18, 20 26, 12 32 Z"
        fill="#8b0a0a"
        filter="url(#flame-bloom)"
      />
      {/* Middle red-orange */}
      <path
        d="M12 31 C 6 25, 6 19, 9 14 C 10 16, 10.5 16, 11 15 C 10 10, 12.5 6, 14 2 C 14 8, 17 10, 18 15 C 19 19, 18 25, 12 31 Z"
        fill="#ff3a2a"
        opacity="0.92"
      />
      {/* White-hot core */}
      <path
        d="M12 29 C 8 24, 8 19, 10.5 16 C 11 17, 11.5 17, 11.7 16 C 11.5 13, 13 9, 14 6 C 14 11, 16 13, 16.5 17 C 17.5 20, 16.5 24, 12 29 Z"
        fill="#fff5e0"
        opacity="0.85"
      />
      {/* Inner pinprick */}
      <ellipse cx="12.5" cy="22" rx="1.4" ry="3" fill="#ffffff" opacity="0.85" />
    </svg>
  );
}

function SparkTrail({ orientation }: { orientation: Orientation }) {
  const horizontal = orientation === "horizontal";
  // 3 sparks, staggered, drifting backwards from the flame and falling slightly.
  const sparks = [0, 1, 2];
  return (
    <>
      {sparks.map((i) => (
        <span
          key={i}
          className="absolute h-[3px] w-[3px] rounded-full"
          style={{
            background: "radial-gradient(circle, #fff5e0 0%, #ff3a2a 60%, transparent 100%)",
            boxShadow: "0 0 6px #ff3a2a",
            top: horizontal ? "30%" : 0,
            left: horizontal ? 0 : "55%",
            transform: horizontal ? "translateX(0)" : "translateY(0)",
            animation: horizontal
              ? `sparkDriftH 1.4s ${i * 0.2}s linear infinite`
              : `sparkDriftV 1.4s ${i * 0.2}s linear infinite`,
            opacity: 0,
          }}
        />
      ))}
    </>
  );
}
