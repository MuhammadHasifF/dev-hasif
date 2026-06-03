"use client";

import { motion, type MotionValue, useReducedMotion } from "framer-motion";

type Orientation = "horizontal" | "vertical";

/**
 * Small red flame at the leading edge of a progress bar.
 *
 * Three layered flame shapes (outer dark-red shell, middle red-orange,
 * inner white-hot core) animated by separate CSS keyframes so the
 * paths visibly waver rather than just pulsing in place. Slightly
 * slower than before (700–900ms periods instead of 280–360ms) so it
 * reads as a real flame, not a strobe. Inner whitish-red glow + outer
 * red halo bloom.
 *
 * Lives in the SAME parent as the progress fill (the parent sets a CSS
 * variable that positions both), so there is no transition lag between
 * fill edge and flame.
 *
 * Reduced motion: static flame, no flicker.
 */
export function FlameTip({
  progress,
  orientation = "horizontal",
  size = 20,
}: {
  progress: number | MotionValue<number>;
  orientation?: Orientation;
  size?: number;
}) {
  const reduce = useReducedMotion();
  const isMV = typeof progress !== "number";
  const horizontal = orientation === "horizontal";

  const positionStyle = horizontal
    ? { left: isMV ? undefined : `${(progress as number) * 100}%`, top: "50%" }
    : { top: isMV ? undefined : `${(progress as number) * 100}%`, left: "50%" };

  // Flame body sits ABOVE the bar (horizontal) or BELOW the bar (vertical).
  const transform = horizontal
    ? "translate(-50%, -78%)"
    : "translate(-50%, -22%) rotate(180deg)";

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
      <RedFlame size={size} animated={!reduce} />
    </motion.div>
  );
}

function RedFlame({ size, animated }: { size: number; animated: boolean }) {
  const w = size * 0.62;
  const h = size;
  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 24 32"
      style={{
        overflow: "visible",
        filter:
          "drop-shadow(0 0 4px #ff5560) drop-shadow(0 0 10px color-mix(in oklab, var(--color-accent) 80%, transparent)) drop-shadow(0 0 22px color-mix(in oklab, var(--color-accent) 45%, transparent))",
      }}
    >
      {/* Glow halo */}
      <ellipse
        cx="12"
        cy="22"
        rx="11"
        ry="14"
        fill="color-mix(in oklab, #ff5560 50%, transparent)"
        style={animated ? { animation: "redFlameHalo 0.85s ease-in-out infinite alternate" } : undefined}
      />
      {/* Outer dark-red shell */}
      <path
        d="M12 32 C 4 26, 5 18, 8 12 C 9 14, 10 14, 11 13 C 10 8, 12 4, 14 0 C 14 6, 18 8, 19 14 C 21 18, 20 26, 12 32 Z"
        fill="#8b0a0a"
        style={animated ? { animation: "redFlameOuter 0.9s ease-in-out infinite alternate" } : undefined}
        transform-origin="50% 100%"
      />
      {/* Middle red-orange */}
      <path
        d="M12 31 C 6 25, 6 19, 9 14 C 10 16, 10.5 16, 11 15 C 10 10, 12.5 6, 14 2 C 14 8, 17 10, 18 15 C 19 19, 18 25, 12 31 Z"
        fill="#ff3a2a"
        opacity="0.95"
        style={animated ? { animation: "redFlameMid 0.75s ease-in-out infinite alternate" } : undefined}
        transform-origin="50% 100%"
      />
      {/* Inner whitish-red glow */}
      <path
        d="M12 28 C 8 24, 8 19, 10.5 16 C 11 17, 11.5 17, 11.7 16 C 11.5 13, 13 9, 14 6 C 14 11, 16 13, 16.5 17 C 17.5 20, 16.5 24, 12 28 Z"
        fill="#ffd6c2"
        opacity="0.9"
        style={animated ? { animation: "redFlameCore 0.7s ease-in-out infinite alternate" } : undefined}
        transform-origin="50% 100%"
      />
      {/* White-hot pinprick at the heart of the flame */}
      <ellipse
        cx="12.5"
        cy="22"
        rx="1.6"
        ry="3.6"
        fill="#fff7ec"
        style={animated ? { animation: "redFlameHeart 0.5s ease-in-out infinite alternate" } : undefined}
      />
    </svg>
  );
}
