"use client";

import { motion, type MotionValue, useReducedMotion } from "framer-motion";

type Orientation = "horizontal" | "vertical";

/**
 * Sharp layered red flame at the leading edge of a progress bar.
 *
 * Three flame paths (outer dark-red shell, middle red-orange, inner
 * whitish-red core) each animate via CSS keyframes with PROPER
 * transformOrigin: bottom-center. Previous version used the SVG attr
 * `transform-origin` which JSX treated as an HTML attribute → scales
 * anchored to (0,0) → flame skated diagonally instead of flickering.
 *
 * Positioning: the wrapper sits at the SAME percentage as the bar's
 * fill (via parent's --p variable). For the top scroll-progress bar
 * the flame anchors WITH the bar (translateY 0) so the body falls
 * below it and stays inside the viewport. For the vertical experience
 * spine it rotates 180° so the flame hangs from the leading edge.
 *
 * Reduced motion: static flame, no flicker.
 */
export function FlameTip({
  progress,
  orientation = "horizontal",
  size = 26,
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

  // Horizontal: flame sits BELOW the bar (so it stays in the viewport at
  // the very top of the page). Vertical: rotated 180° to flow downward.
  const transform = horizontal
    ? "translate(-50%, 12%)"
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
      <RedFlame size={size} animated={!reduce} />
    </motion.div>
  );
}

function RedFlame({ size, animated }: { size: number; animated: boolean }) {
  const w = size * 0.62;
  const h = size;
  const origin: React.CSSProperties = { transformOrigin: "50% 100%" };
  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 24 32"
      style={{
        overflow: "visible",
        filter:
          "drop-shadow(0 0 5px #ff5560) drop-shadow(0 0 12px color-mix(in oklab, var(--color-accent) 85%, transparent)) drop-shadow(0 0 24px color-mix(in oklab, var(--color-accent) 50%, transparent))",
      }}
    >
      <defs>
        <radialGradient id="ft-halo" cx="50%" cy="68%" r="55%">
          <stop offset="0" stopColor="#ff6675" stopOpacity="0.85" />
          <stop offset="0.6" stopColor="#ff1e3c" stopOpacity="0.35" />
          <stop offset="1" stopColor="#ff1e3c" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ft-outer" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0" stopColor="#ff1e3c" />
          <stop offset="0.7" stopColor="#a3071f" />
          <stop offset="1" stopColor="#5c0312" />
        </linearGradient>
        <linearGradient id="ft-mid" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0" stopColor="#ffaf85" />
          <stop offset="0.5" stopColor="#ff5a3a" />
          <stop offset="1" stopColor="#cc1818" />
        </linearGradient>
        <linearGradient id="ft-core" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0" stopColor="#fffae8" />
          <stop offset="0.55" stopColor="#ffdcbf" />
          <stop offset="1" stopColor="#ff7d5a" />
        </linearGradient>
      </defs>

      {/* Glow halo */}
      <ellipse
        cx="12"
        cy="23"
        rx="11"
        ry="13"
        fill="url(#ft-halo)"
        style={
          animated
            ? { ...origin, animation: "redFlameHalo 0.95s ease-in-out infinite alternate" }
            : origin
        }
      />

      {/* Outer shell — smooth teardrop, no jagged base */}
      <path
        d="M12 31.6 C 4.5 28, 4.2 19, 8 12.5 C 9 14.5, 10.4 14.5, 11 13 C 10 7.5, 12.5 3.2, 13.4 0.4 C 14.8 6.2, 17.6 8.4, 18.8 14 C 20.6 18, 19.6 26.5, 12 31.6 Z"
        fill="url(#ft-outer)"
        style={
          animated
            ? { ...origin, animation: "redFlameOuter 0.9s ease-in-out infinite alternate" }
            : origin
        }
      />

      {/* Mid red-orange */}
      <path
        d="M12 30.6 C 6.5 27, 6 19.5, 8.8 14 C 10 16, 10.6 16, 11 15 C 10 10, 12.6 6, 13.8 2.4 C 14.6 7.8, 17 10, 17.8 15 C 19 19, 17.8 25.5, 12 30.6 Z"
        fill="url(#ft-mid)"
        style={
          animated
            ? { ...origin, animation: "redFlameMid 0.75s ease-in-out infinite alternate" }
            : origin
        }
      />

      {/* Inner whitish glow */}
      <path
        d="M12 27.6 C 8.4 24, 8.4 19, 10.4 16 C 11 17, 11.5 17, 11.7 16 C 11.5 13, 12.8 9.5, 13.6 6.4 C 14 11, 15.6 13, 16.2 17 C 17.2 20, 16.2 24, 12 27.6 Z"
        fill="url(#ft-core)"
        style={
          animated
            ? { ...origin, animation: "redFlameCore 0.7s ease-in-out infinite alternate" }
            : origin
        }
      />

      {/* White-hot heart */}
      <ellipse
        cx="12.4"
        cy="22"
        rx="1.5"
        ry="3.4"
        fill="#fffae8"
        style={
          animated
            ? { ...origin, animation: "redFlameHeart 0.55s ease-in-out infinite alternate" }
            : origin
        }
      />
    </svg>
  );
}
