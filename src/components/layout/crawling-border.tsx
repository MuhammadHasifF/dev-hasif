"use client";

import { useEffect, useRef } from "react";

/**
 * Red perimeter "loading bar" that crawls counter-clockwise around the
 * viewport edges as the user scrolls through the "Shipping in the open"
 * section (#github). When the loop completes, the page background snaps
 * INSTANTLY to red via documentElement[data-fully-bordered="true"].
 *
 * Two fixed-positioned divs:
 *   - .crawl-border-one: anchored bottom-left. Grows width (0 → 25%)
 *     then height (25% → 50%) so it draws the bottom + right edges.
 *   - .crawl-border-two: anchored top-right. Grows width (50% → 75%)
 *     then height (75% → 100%) so it draws the top + left edges.
 *
 * Progress p (0..1) is derived from the section's position in viewport:
 *   - p = 0 when the section's top is at the bottom of the viewport
 *   - p = 1 when the section's bottom is at the top of the viewport
 *
 * Both sub-progresses are quantized to 200 steps; DOM is only written
 * when the bucket changes, so scrolling is cheap.
 */
export function CrawlingBorder() {
  const oneRef = useRef<HTMLDivElement>(null);
  const twoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    let lastStep = -1;
    let lastFlooded: boolean | null = null;

    const update = () => {
      raf = 0;
      const target = document.getElementById("github");
      if (!target) return;

      const rect = target.getBoundingClientRect();
      const vh = window.innerHeight;
      const sectionH = rect.height;
      const total = vh + sectionH;
      const distance = vh - rect.top;
      const p = Math.max(0, Math.min(1, distance / total));

      const step = Math.round(p * 200);
      if (step !== lastStep) {
        lastStep = step;
        const pv = step / 200;
        const p1 = Math.max(0, Math.min(1, pv * 4));
        const p2 = Math.max(0, Math.min(1, (pv - 0.25) * 4));
        const p3 = Math.max(0, Math.min(1, (pv - 0.5) * 4));
        const p4 = Math.max(0, Math.min(1, (pv - 0.75) * 4));
        const one = oneRef.current;
        const two = twoRef.current;
        if (one) {
          one.style.setProperty("--cw", p1.toFixed(3));
          one.style.setProperty("--ch", p2.toFixed(3));
        }
        if (two) {
          two.style.setProperty("--cw", p3.toFixed(3));
          two.style.setProperty("--ch", p4.toFixed(3));
        }
      }

      const flooded = p >= 1;
      if (flooded !== lastFlooded) {
        lastFlooded = flooded;
        if (flooded) {
          document.documentElement.dataset.fullyBordered = "true";
        } else {
          delete document.documentElement.dataset.fullyBordered;
        }
      }
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      if (raf) cancelAnimationFrame(raf);
      delete document.documentElement.dataset.fullyBordered;
    };
  }, []);

  return (
    <>
      <div
        ref={oneRef}
        aria-hidden="true"
        className="crawl-border crawl-border-one"
        style={
          { ["--cw" as string]: "0", ["--ch" as string]: "0" } as React.CSSProperties
        }
      />
      <div
        ref={twoRef}
        aria-hidden="true"
        className="crawl-border crawl-border-two"
        style={
          { ["--cw" as string]: "0", ["--ch" as string]: "0" } as React.CSSProperties
        }
      />
      <div aria-hidden="true" className="red-flood" />
    </>
  );
}
