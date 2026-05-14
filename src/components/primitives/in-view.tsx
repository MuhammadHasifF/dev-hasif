"use client";

import {
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
  type ReactElement,
} from "react";

type ChildProps = { className?: string; style?: React.CSSProperties };

/**
 * Lightweight viewport-trigger wrapper. Toggles a className on the child
 * when it enters/leaves the viewport, so the child can drive ANY CSS
 * animation via class-based selectors. No motion components per child,
 * no per-frame work, no React state per scroll tick. Cheap enough to
 * use on hundreds of elements at once.
 *
 * Pass `once` for one-shot reveals. Default re-triggers on every entry
 * so the same element animates back when scrolled past.
 */
export function InView({
  children,
  className = "reveal",
  activeClassName = "in-view",
  amount = 0.2,
  once = false,
  rootMargin = "0px",
  style,
}: {
  children: ReactElement<ChildProps>;
  className?: string;
  activeClassName?: string;
  amount?: number;
  once?: boolean;
  rootMargin?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setActive(true);
            if (once) {
              io.disconnect();
              return;
            }
          } else if (!once) {
            setActive(false);
          }
        }
      },
      { threshold: amount, rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [amount, once, rootMargin]);

  if (!isValidElement(children)) return children;
  const existing = children.props.className ?? "";
  const merged = [className, existing, active ? activeClassName : null].filter(Boolean).join(" ");

  // Merge styles + ref onto the child
  return cloneElement(children, {
    ref,
    className: merged,
    style: { ...children.props.style, ...style },
  } as unknown as ChildProps & { ref: React.Ref<HTMLElement> });
}
