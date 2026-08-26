"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Command, Menu, X } from "lucide-react";
import { siteConfig } from "@/../site.config";
import { Magnetic } from "@/components/primitives/magnetic";
import { useLenisScroll } from "@/components/layout/lenis-provider";
import { NavMonster } from "@/components/layout/nav-monster";
import { cn } from "@/lib/utils";

type NavItem = (typeof siteConfig.nav)[number];

function isAnchor(href: string) {
  return href.startsWith("/#");
}
function anchorId(href: string) {
  return href.slice(1); // "/#about" → "#about"
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { scrollTo } = useLenisScroll();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Active section spy. IntersectionObserver was flaky for tall pinned
  // sections (Featured rail = 5x viewport) where multiple sections
  // intersected at once and order flipped. Replaced with a scroll-position
  // scan: find the section whose top crossed an offset line at the bottom
  // of the nav. Single scroll listener, rAF-coalesced, deterministic.
  useEffect(() => {
    if (pathname !== "/") {
      setActiveId(null);
      return;
    }
    const ids = siteConfig.nav.filter((n) => isAnchor(n.href)).map((n) => anchorId(n.href));
    if (!ids.length) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const line = 88; // nav 56 + 32 breathing room
      const els = ids
        .map((id) => ({ id, el: document.querySelector(id) as HTMLElement | null }))
        .filter((x): x is { id: string; el: HTMLElement } => !!x.el);
      if (!els.length) return;

      // Find the section whose top is <= line and whose bottom is > line.
      // If multiple match, pick the one whose top is closest to (but below) the line.
      const candidates = els
        .map(({ id, el }) => {
          const rect = el.getBoundingClientRect();
          return { id, top: rect.top, bottom: rect.bottom };
        })
        .filter((c) => c.top <= line && c.bottom > line);

      if (candidates.length) {
        candidates.sort((a, b) => b.top - a.top); // largest top (closest to line from above)
        setActiveId(candidates[0].id);
        return;
      }

      // Before the first numbered section, clear active.
      if (els[0]) {
        const first = els[0].el.getBoundingClientRect();
        if (first.top > line) {
          setActiveId(null);
          return;
        }
      }
      // After the last section bottom, lock to the last id.
      const last = els[els.length - 1];
      if (last) {
        const r = last.el.getBoundingClientRect();
        if (r.bottom <= line) setActiveId(last.id);
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
    };
  }, [pathname]);

  const openPalette = () => {
    window.dispatchEvent(new CustomEvent("cmdk:open"));
  };

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {
      if (!isAnchor(item.href)) return; // Resume + non-anchor links: native handling
      e.preventDefault();
      const id = anchorId(item.href); // "#about"
      if (pathname === "/") {
        history.replaceState(null, "", item.href);
        scrollTo(id, { duration: 1.6 });
      } else {
        // From any other route → return to home, hash will be picked up by HomeHashWatch
        router.push(`/${id}`);
      }
      setOpen(false);
    },
    [pathname, router, scrollTo],
  );

  const isItemActive = (item: NavItem) => {
    if (isAnchor(item.href)) {
      return pathname === "/" && activeId === anchorId(item.href);
    }
    return pathname === item.href || (item.href.length > 1 && pathname.startsWith(item.href));
  };

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[backdrop-filter,background-color,border-color] duration-300",
        scrolled
          ? "glass border-b border-[var(--color-border)]"
          : "bg-transparent border-b border-transparent",
      )}
    >
      <NavMonster scopeRef={headerRef} />
      <nav className="relative z-[2] mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          aria-label="Home"
          className="group inline-flex items-center gap-2 font-mono text-sm tracking-tight"
          style={{
            opacity: "calc(1 - var(--hero-logo-on, 0))",
            transition: "opacity 220ms steps(2, end)",
          }}
        >
          <span className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full ring-2 ring-[var(--color-accent)]/70 ring-offset-2 ring-offset-[var(--color-bg-0)] shadow-[0_0_18px_-4px_var(--color-accent)]">
            <Image
              src="/me/bamboo-forest.jpg"
              alt="Hasif"
              width={72}
              height={72}
              priority
              className="h-full w-full object-cover"
              style={{ objectPosition: "50% 30%" }}
            />
          </span>
          <span className="hidden sm:block text-base text-[var(--color-text-0)]">
            devhasif<span className="text-[var(--color-accent)]">.</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {siteConfig.nav.map((item) => {
            const active = isItemActive(item);
            return (
              <Magnetic key={item.href} strength={0.18}>
                <Link
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "group/nav relative inline-flex rounded-full px-3 py-1.5 text-sm transition",
                    active
                      ? "text-[var(--color-text-0)]"
                      : "text-[var(--color-text-1)] hover:text-[var(--color-text-0)]",
                  )}
                >
                  {active && (
                    <span className="absolute inset-0 -z-10 rounded-full bg-[var(--color-bg-2)] ring-1 ring-[var(--color-accent)]/35" />
                  )}
                  <span className="relative">
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "pointer-events-none absolute -bottom-1 left-1/2 h-px w-0 -translate-x-1/2 bg-[var(--color-accent)] transition-[width] duration-300 group-hover/nav:w-full",
                        active && "w-full",
                      )}
                      style={{
                        boxShadow:
                          "0 0 6px color-mix(in oklab, var(--color-accent) 80%, transparent)",
                      }}
                    />
                  </span>
                </Link>
              </Magnetic>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openPalette}
            aria-label="Open command palette"
            className="hidden md:inline-flex h-9 items-center gap-2 rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-1)] px-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-1)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
          >
            <Command className="h-3.5 w-3.5" />
            <span>Search</span>
            <kbd className="rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-2)] px-1.5 py-0.5 font-mono text-[10px]">
              ⌘K
            </kbd>
          </button>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-1)] text-[var(--color-text-1)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer, anchor links scroll-and-close */}
      {open && (
        <>
          <div
            className="fixed inset-0 top-16 z-40 bg-black/50 backdrop-blur-sm md:hidden"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="absolute inset-x-0 top-16 z-50 border-t border-[var(--color-border)] bg-[var(--color-bg-0)]/95 backdrop-blur-md md:hidden"
          >
            <div className="mx-auto max-w-6xl px-4 py-4">
              <ul className="flex flex-col gap-1">
                {siteConfig.nav.map((item) => {
                  const active = isItemActive(item);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item)}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex min-h-[44px] items-center justify-between rounded-lg px-3 py-3 text-base hover:bg-[var(--color-bg-2)]",
                          active ? "text-[var(--color-text-0)]" : "text-[var(--color-text-1)]",
                        )}
                      >
                        <span className="inline-flex items-center gap-3">
                          {active && (
                            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)] shadow-[0_0_8px_var(--color-accent)]" />
                          )}
                          {item.label}
                        </span>
                        <span className="text-[var(--color-text-2)]">→</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
