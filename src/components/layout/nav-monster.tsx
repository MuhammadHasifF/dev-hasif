"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Tiny red "monster" that follows the pointer when it's over the nav.
 * Two glowing red orbs (eyes) and a soft red haze, with a bit of inertia
 * so it lags slightly behind the cursor and bobs idle when no input.
 *
 * Hidden on touch devices (no hover) and on prefers-reduced-motion.
 */
export function NavMonster({ scopeRef }: { scopeRef: React.RefObject<HTMLElement | null> }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    setEnabled(hover && !reduce);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const scope = scopeRef.current;
    const el = wrapRef.current;
    if (!scope || !el) return;

    let raf = 0;
    let active = false;
    let tx = 24,
      ty = 24; // target (cursor relative to scope)
    let cx = 24,
      cy = 24; // current (eased toward target)
    let lastX = tx;
    let idle = 0;
    const start = performance.now();

    const tick = () => {
      // Idle bobbing when the user isn't moving
      const t = (performance.now() - start) / 1000;
      const idleX = Math.sin(t * 1.6) * 14;
      const idleY = Math.cos(t * 2.1) * 4;

      const aimX = active ? tx : scope.clientWidth / 2 + idleX;
      const aimY = active ? ty : 24 + idleY;

      // Ease toward aim
      cx += (aimX - cx) * 0.18;
      cy += (aimY - cy) * 0.18;

      // Eye direction (tilt toward cursor target)
      const dx = aimX - cx;
      const dy = aimY - cy;
      const len = Math.max(0.001, Math.hypot(dx, dy));
      const ex = (dx / len) * 1.6;
      const ey = (dy / len) * 1.6;

      el.style.setProperty("--mx", `${cx}px`);
      el.style.setProperty("--my", `${cy}px`);
      el.style.setProperty("--ex", `${ex}px`);
      el.style.setProperty("--ey", `${ey}px`);
      el.style.opacity = active ? "1" : "0.55";

      // Velocity-based stretch (squashes when the cursor zips)
      const vx = aimX - lastX;
      lastX = aimX;
      idle = active ? Math.min(1, Math.abs(vx) / 18) : Math.max(0, idle - 0.08);
      el.style.setProperty("--squash", `${1 + idle * 0.18}`);
      el.style.setProperty("--stretch", `${1 - idle * 0.12}`);

      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      const r = scope.getBoundingClientRect();
      tx = e.clientX - r.left;
      ty = e.clientY - r.top;
      active = true;
    };
    const onLeave = () => {
      active = false;
    };
    const onEnter = () => {
      active = true;
    };

    scope.addEventListener("pointermove", onMove, { passive: true });
    scope.addEventListener("pointerenter", onEnter);
    scope.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      scope.removeEventListener("pointermove", onMove);
      scope.removeEventListener("pointerenter", onEnter);
      scope.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, scopeRef]);

  if (!enabled) return null;

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="pointer-events-none absolute z-[1] hidden md:block"
      style={
        {
          left: 0,
          top: 0,
          width: 0,
          height: 0,
          opacity: 0,
          transition: "opacity 220ms ease",
          ["--mx" as string]: "24px",
          ["--my" as string]: "24px",
          ["--ex" as string]: "0px",
          ["--ey" as string]: "0px",
          ["--squash" as string]: "1",
          ["--stretch" as string]: "1",
        } as React.CSSProperties
      }
    >
      {/* Soft red haze */}
      <div
        className="absolute"
        style={{
          left: "var(--mx)",
          top: "var(--my)",
          transform: "translate(-50%, -50%)",
          width: 64,
          height: 32,
          background:
            "radial-gradient(50% 60% at 50% 50%, color-mix(in oklab, var(--color-accent) 38%, transparent) 0%, transparent 70%)",
          filter: "blur(6px)",
        }}
      />
      {/* Body — small dark blob with a faint red rim */}
      <div
        className="absolute"
        style={{
          left: "var(--mx)",
          top: "var(--my)",
          transform:
            "translate(-50%, -50%) scale(var(--squash), var(--stretch))",
          width: 28,
          height: 14,
          borderRadius: 999,
          background:
            "radial-gradient(60% 100% at 50% 30%, #1a0608 0%, #0a0306 70%, #000 100%)",
          boxShadow:
            "0 0 8px color-mix(in oklab, var(--color-accent) 70%, transparent), inset 0 0 0 1px color-mix(in oklab, var(--color-accent) 60%, transparent)",
        }}
      />
      {/* Left eye */}
      <Eye offsetX={-6} />
      {/* Right eye */}
      <Eye offsetX={6} />
    </div>
  );
}

function Eye({ offsetX }: { offsetX: number }) {
  return (
    <div
      className="absolute"
      style={{
        left: "var(--mx)",
        top: "var(--my)",
        transform: `translate(calc(-50% + ${offsetX}px), -50%)`,
        width: 6,
        height: 6,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 999,
          background: "#0a0306",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 4,
          height: 4,
          borderRadius: 999,
          background:
            "radial-gradient(circle, #ffd6c2 0%, var(--color-accent-3) 40%, var(--color-accent) 80%, transparent 100%)",
          boxShadow:
            "0 0 6px var(--color-accent), 0 0 12px color-mix(in oklab, var(--color-accent) 70%, transparent)",
          transform: "translate(calc(-50% + var(--ex)), calc(-50% + var(--ey)))",
        }}
      />
    </div>
  );
}
