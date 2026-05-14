"use client";

import { motion, type MotionValue, useReducedMotion } from "framer-motion";

type Orientation = "horizontal" | "vertical";

/**
 * Cyber tip indicator. The animated flame was unreliable across browsers,
 * so the tip is now a small geometric mark — a glowing red diamond with
 * a chevron crosshair through it. Rotates slowly + pulses. Sits on the
 * leading edge of a progress bar and tracks it cleanly because it lives
 * in the SAME parent that drives the bar's position (via --p).
 *
 * Reduced motion: static diamond, no rotation, no pulse.
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
  const isMV = typeof progress !== "number";
  const horizontal = orientation === "horizontal";

  const positionStyle = horizontal
    ? { left: isMV ? undefined : `${(progress as number) * 100}%`, top: "50%" }
    : { top: isMV ? undefined : `${(progress as number) * 100}%`, left: "50%" };

  const transform = horizontal
    ? "translate(-50%, -50%)"
    : "translate(-50%, -50%)";

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
        width: size,
        height: size,
        willChange: "left, top",
      }}
    >
      <TipMark size={size} animated={!reduce} />
    </motion.div>
  );
}

function TipMark({ size, animated }: { size: number; animated: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      style={{
        overflow: "visible",
        animation: animated ? "tipSpin 2.8s linear infinite" : undefined,
        filter:
          "drop-shadow(0 0 6px var(--color-accent)) drop-shadow(0 0 14px color-mix(in oklab, var(--color-accent) 60%, transparent))",
      }}
    >
      {/* Outer glow halo */}
      <circle
        cx="12"
        cy="12"
        r="9"
        fill="color-mix(in oklab, var(--color-accent) 20%, transparent)"
        style={
          animated ? { animation: "tipHaloPulse 0.9s ease-in-out infinite alternate" } : undefined
        }
      />
      {/* Diamond core */}
      <path
        d="M12 2 L22 12 L12 22 L2 12 Z"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="1.4"
      />
      <path
        d="M12 5 L19 12 L12 19 L5 12 Z"
        fill="color-mix(in oklab, var(--color-accent) 80%, transparent)"
      />
      {/* Inner crosshair */}
      <line x1="12" y1="0" x2="12" y2="6" stroke="var(--color-accent)" strokeWidth="1" />
      <line x1="12" y1="18" x2="12" y2="24" stroke="var(--color-accent)" strokeWidth="1" />
      <line x1="0" y1="12" x2="6" y2="12" stroke="var(--color-accent)" strokeWidth="1" />
      <line x1="18" y1="12" x2="24" y2="12" stroke="var(--color-accent)" strokeWidth="1" />
      {/* White-hot center */}
      <circle cx="12" cy="12" r="2" fill="#fff5e0" />
    </svg>
  );
}
