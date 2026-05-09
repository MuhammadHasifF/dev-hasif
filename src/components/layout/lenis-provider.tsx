"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import Lenis from "lenis";

type ScrollTarget = string | HTMLElement | number;
type ScrollOptions = { offset?: number; immediate?: boolean; duration?: number };
type LenisCtx = { scrollTo: (target: ScrollTarget, opts?: ScrollOptions) => void };

const Ctx = createContext<LenisCtx | null>(null);

const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

export function LenisProvider({ children }: { children: ReactNode }) {
  const ref = useRef<Lenis | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    // Skip Lenis on touch + reduced motion — let native scroll behave naturally.
    if (reduce || touch) return;

    const lenis = new Lenis({
      duration: 1.0,
      easing: easeOutExpo,
      smoothWheel: true,
      lerp: 0.1,
      wheelMultiplier: 1,
      touchMultiplier: 1,
    });
    ref.current = lenis;

    let raf = 0;
    const tick = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      ref.current = null;
    };
  }, []);

  const scrollTo = useCallback((target: ScrollTarget, opts: ScrollOptions = {}) => {
    const duration = opts.duration ?? 1.6;
    const offset = opts.offset ?? -72; // clear sticky nav
    const lenis = ref.current;
    if (lenis) {
      lenis.scrollTo(target, { duration, easing: easeOutExpo, offset, immediate: opts.immediate });
      return;
    }
    // Fallback (touch / reduced motion / SSR-mounted before Lenis ready)
    let el: HTMLElement | null = null;
    if (typeof target === "string") {
      el = document.querySelector(target);
    } else if (target instanceof HTMLElement) {
      el = target;
    }
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top, behavior: opts.immediate ? "auto" : "smooth" });
    } else if (typeof target === "number") {
      window.scrollTo({ top: target + offset, behavior: opts.immediate ? "auto" : "smooth" });
    }
  }, []);

  return <Ctx.Provider value={{ scrollTo }}>{children}</Ctx.Provider>;
}

export function useLenisScroll(): LenisCtx {
  const v = useContext(Ctx);
  if (v) return v;
  // Headless fallback if a consumer renders outside the provider (e.g., during tests)
  return {
    scrollTo: (target, opts = {}) => {
      const offset = opts.offset ?? -72;
      let el: HTMLElement | null = null;
      if (typeof target === "string") el = document.querySelector(target);
      else if (target instanceof HTMLElement) el = target;
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY + offset;
        window.scrollTo({ top, behavior: "smooth" });
      } else if (typeof target === "number") {
        window.scrollTo({ top: target + offset, behavior: "smooth" });
      }
    },
  };
}
