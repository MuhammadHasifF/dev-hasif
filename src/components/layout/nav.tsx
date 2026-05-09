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

  // Active section spy on the home page only — uses IntersectionObserver on each section id.
  useEffect(() => {
    if (pathname !== "/") {
      setActiveId(null);
      return;
    }
    const ids = siteConfig.nav.filter((n) => isAnchor(n.href)).map((n) => anchorId(n.href));
    const els = ids
      .map((id) => document.querySelector(id) as HTMLElement | null)
      .filter((el): el is HTMLElement => !!el);
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActiveId(`#${visible[0].target.id}`);
        }
      },
      { threshold: [0.25, 0.5, 0.75], rootMargin: "-72px 0px -40% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
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
      <nav className="relative z-[2] mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          aria-label="Home"
          className="group inline-flex items-center gap-2 font-mono text-sm tracking-tight"
        >
          <span className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full ring-1 ring-[var(--color-accent)]/50 ring-offset-1 ring-offset-[var(--color-bg-0)] shadow-[0_0_12px_-4px_var(--color-accent)]">
            <Image
              src="/me/bamboo-forest.jpg"
              alt="Hasif"
              width={48}
              height={48}
              priority
              className="h-full w-full object-cover"
              style={{ objectPosition: "50% 30%" }}
            />
          </span>
          <span className="hidden sm:block text-[var(--color-text-0)]">
            hasif<span className="text-[var(--color-accent)]">.</span>dev
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

      {/* Mobile drawer — anchor links scroll-and-close */}
      {open && (
        <>
          <div
            className="fixed inset-0 top-14 z-40 bg-black/50 backdrop-blur-sm md:hidden"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute inset-x-0 top-14 z-50 border-t border-[var(--color-border)] bg-[var(--color-bg-0)]/95 backdrop-blur-md md:hidden">
            <div className="mx-auto max-w-6xl px-4 py-4">
              <ul className="flex flex-col gap-1">
                {siteConfig.nav.map((item) => {
                  const active = isItemActive(item);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item)}
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
