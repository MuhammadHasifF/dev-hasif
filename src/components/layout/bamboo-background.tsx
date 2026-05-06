"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Image-based bamboo backdrop — uses /textures/bamboo.jpg directly
 * (no procedural SVG) so the actual photo is what you see.
 *
 * Combined motion:
 *   a) scroll parallax (translateY proportional to scrollY, per layer)
 *   b) gentle sway loop (CSS keyframe applied to wrapper)
 *   c) cursor-tracked horizontal parallax (translateX, per layer)
 *   d) warm dark gradient overlay on top + warm gold mist + vignette
 *
 * Two image layers (far blurred / near sharp) for parallax depth.
 * Single rAF loop, transform-only mutations, will-change on layers only.
 */
export function BambooBackground() {
  const farRef = useRef<HTMLDivElement>(null);
  const nearRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    let raf = 0;
    let mxTarget = 0;
    let mx = 0;
    let scrollY = 0;

    const onMove = (e: PointerEvent) => {
      mxTarget = (e.clientX / window.innerWidth) * 2 - 1;
    };
    const onScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    const tick = () => {
      mx += (mxTarget - mx) * 0.06;
      const far = farRef.current;
      const near = nearRef.current;
      if (far) {
        far.style.transform = `translate3d(${mx * 14}px, ${scrollY * -0.06}px, 0) scale(1.18)`;
      }
      if (near) {
        near.style.transform = `translate3d(${mx * 38}px, ${scrollY * -0.18}px, 0) scale(1.08)`;
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
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-20 overflow-hidden"
      style={{ backgroundColor: "#0a0806" }}
    >
      {/* FAR layer — blurred, darker, large scale */}
      <div
        className="absolute inset-0 will-change-transform motion-reduce:!transform-none"
        style={{
          animation: reduce ? undefined : "bambooSwayA 17s ease-in-out infinite",
          transformOrigin: "50% 0",
        }}
      >
        <div
          ref={farRef}
          className="absolute inset-[-12%] will-change-transform"
          style={{
            backgroundImage: "url('/textures/bamboo.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            filter: "blur(3px) brightness(0.5) contrast(1.1) saturate(0.85)",
            opacity: 0.85,
          }}
        />
      </div>

      {/* NEAR layer — sharper, brighter cursor-tracked parallax */}
      <div
        className="absolute inset-0 will-change-transform motion-reduce:!transform-none"
        style={{
          animation: reduce ? undefined : "bambooSwayC 23s ease-in-out infinite",
          transformOrigin: "50% 100%",
        }}
      >
        <div
          ref={nearRef}
          className="absolute inset-[-8%] will-change-transform"
          style={{
            backgroundImage: "url('/textures/bamboo.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            filter: "blur(0.4px) brightness(0.7) contrast(1.15) saturate(0.95)",
            opacity: 0.55,
            mixBlendMode: "screen",
          }}
        />
      </div>

      {/* warm gold mist near top */}
      <div
        className="absolute inset-x-0 top-0 h-[44vh]"
        style={{
          background:
            "radial-gradient(80% 100% at 50% 0%, color-mix(in oklab, #c9a857 24%, transparent), transparent 70%)",
          mixBlendMode: "screen",
          opacity: 0.55,
        }}
      />

      {/* dark warm gradient overlay for legibility */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, color-mix(in oklab, #0c0a08 50%, transparent) 0%, color-mix(in oklab, #0c0a08 25%, transparent) 30%, color-mix(in oklab, #0c0a08 60%, transparent) 75%, #0c0a08 100%)",
        }}
      />

      {/* warm vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 50%, transparent 45%, color-mix(in oklab, #0c0a08 90%, transparent))",
        }}
      />
    </div>
  );
}
