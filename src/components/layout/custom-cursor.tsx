"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  const [touch, setTouch] = useState(false);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    setTouch(mq.matches);
    setReduce(rm.matches);
    const onTouch = () => setTouch(mq.matches);
    const onReduce = () => setReduce(rm.matches);
    mq.addEventListener("change", onTouch);
    rm.addEventListener("change", onReduce);
    return () => {
      mq.removeEventListener("change", onTouch);
      rm.removeEventListener("change", onReduce);
    };
  }, []);

  useEffect(() => {
    if (touch || reduce) return;
    let raf = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (dot.current) dot.current.style.transform = `translate3d(${x - 3}px, ${y - 3}px, 0)`;
    };
    const loop = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      if (ring.current) ring.current.style.transform = `translate3d(${rx - 16}px, ${ry - 16}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const interactive = t.closest(
        "a, button, [role='button'], input, textarea, select, label, [data-cursor='hover']"
      );
      setHover(!!interactive);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    raf = requestAnimationFrame(loop);
    document.documentElement.style.cursor = "none";
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
      document.documentElement.style.cursor = "";
    };
  }, [touch, reduce]);

  if (touch || reduce) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[80]">
      <div
        ref={dot}
        className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-[var(--color-text-0)]"
      />
      <div
        ref={ring}
        className="absolute left-0 top-0 h-8 w-8 rounded-full border border-[var(--color-text-0)] transition-[width,height,border-color,opacity] duration-300 ease-[var(--ease-apple)] mix-blend-difference"
        style={{
          opacity: hover ? 1 : 0.6,
          borderColor: hover ? "var(--color-accent)" : "var(--color-text-0)",
          transform: "translate3d(-100px,-100px,0)",
          scale: hover ? "1.6" : "1",
        }}
      />
    </div>
  );
}
