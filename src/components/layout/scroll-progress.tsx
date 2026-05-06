"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Black-and-white igniting flame / spark trail that spreads as you scroll.
 *
 *  - bone-white core line scaled by scroll progress
 *  - bright flame head at the leading edge with warm ember tint
 *  - 5 trailing sparks fading back, jittered each frame
 */
export function ScrollProgress() {
  const [p, setP] = useState(0);
  const flameRef = useRef<HTMLDivElement>(null);
  const sparksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    let velocity = 0;
    let last = 0;
    let lastTs = performance.now();

    const update = () => {
      const h = document.documentElement;
      const scroll = h.scrollTop;
      const max = h.scrollHeight - h.clientHeight;
      const now = performance.now();
      const dt = Math.max(1, now - lastTs);
      const next = max > 0 ? scroll / max : 0;
      velocity = (next - last) / dt; // 0..~0.001
      last = next;
      lastTs = now;
      setP(next);

      const flame = flameRef.current;
      if (flame) {
        const intensity = Math.min(1, Math.abs(velocity) * 8000 + 0.2);
        flame.style.setProperty("--flame-intensity", String(intensity));
      }
      const sparks = sparksRef.current;
      if (sparks) {
        const dots = sparks.children;
        for (let i = 0; i < dots.length; i++) {
          const d = dots[i] as HTMLElement;
          const lag = (i + 1) * 6;
          const jitter = (Math.random() - 0.5) * 6;
          d.style.transform = `translate(${-lag}px, ${jitter}px)`;
          d.style.opacity = String(Math.max(0, 0.9 - i * 0.18) * Math.min(1, Math.abs(velocity) * 6000 + 0.25));
        }
      }
    };
    update();
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        update();
        raf = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[3px] motion-reduce:h-0.5"
    >
      {/* core line — scaled */}
      <div
        className="absolute inset-y-0 left-0 origin-left"
        style={{
          width: "100%",
          transform: `scaleX(${p})`,
          background:
            "linear-gradient(90deg, transparent 0%, color-mix(in oklab, #ede5d3 60%, transparent) 30%, #ede5d3 70%, #ffffff 100%)",
          transition: "transform 80ms linear",
        }}
      />

      {/* trailing sparks — positioned at progress edge */}
      <div
        ref={sparksRef}
        className="absolute inset-y-0 motion-reduce:hidden"
        style={{
          left: `${p * 100}%`,
          transition: "left 80ms linear",
        }}
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className="absolute top-1/2 h-[2px] w-[3px] -translate-y-1/2 rounded-full"
            style={{
              background: i < 2 ? "#fff" : "#ede5d3",
              boxShadow: "0 0 6px #fff8e1",
            }}
          />
        ))}
      </div>

      {/* flame head — bright bloom at leading edge */}
      <div
        ref={flameRef}
        className="absolute top-1/2 -translate-y-1/2 motion-reduce:hidden"
        style={{
          left: `${p * 100}%`,
          width: 28,
          height: 14,
          marginLeft: -14,
          background:
            "radial-gradient(60% 100% at 50% 50%, #ffffff 0%, color-mix(in oklab, #ffeaa0 calc(var(--flame-intensity, 0.4) * 100%), transparent) 35%, color-mix(in oklab, #ff9a3c calc(var(--flame-intensity, 0.4) * 80%), transparent) 60%, transparent 80%)",
          filter: "blur(0.6px)",
          opacity: "calc(0.5 + var(--flame-intensity, 0.4) * 0.5)",
          transition: "left 80ms linear, opacity 120ms linear",
        }}
      />

      {/* underline glow */}
      <div
        className="absolute inset-x-0 top-full h-2 motion-reduce:hidden"
        style={{
          background:
            "linear-gradient(to bottom, color-mix(in oklab, #ffeaa0 18%, transparent), transparent)",
          maskImage: `linear-gradient(to right, transparent, black ${p * 100}%, transparent ${Math.min(100, p * 100 + 4)}%)`,
          WebkitMaskImage: `linear-gradient(to right, transparent, black ${p * 100}%, transparent ${Math.min(100, p * 100 + 4)}%)`,
        }}
      />
    </div>
  );
}
