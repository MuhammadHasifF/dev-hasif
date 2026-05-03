"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Command, Menu, X } from "lucide-react";
import { siteConfig } from "@/../site.config";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Magnetic } from "@/components/primitives/magnetic";
import { cn } from "@/lib/utils";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const openPalette = () => {
    window.dispatchEvent(new CustomEvent("cmdk:open"));
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[backdrop-filter,background-color,border-color] duration-300",
        scrolled
          ? "glass border-b border-[var(--color-border)]"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          aria-label="Home"
          className="group inline-flex items-center gap-2 font-mono text-sm tracking-tight"
        >
          <span className="relative flex h-7 w-7 items-center justify-center overflow-hidden rounded-md bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-2)] text-white">
            <span className="font-display text-base leading-none">H</span>
          </span>
          <span className="hidden sm:block text-[var(--color-text-0)]">hasif<span className="text-[var(--color-accent)]">.</span>dev</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {siteConfig.nav.map((item) => {
            const active =
              pathname === item.href ||
              (item.href.length > 1 && pathname.startsWith(item.href));
            return (
              <Magnetic key={item.href} strength={0.18}>
                <Link
                  href={item.href}
                  className={cn(
                    "relative inline-flex rounded-full px-3 py-1.5 text-sm transition",
                    active
                      ? "text-[var(--color-text-0)]"
                      : "text-[var(--color-text-1)] hover:text-[var(--color-text-0)]"
                  )}
                >
                  {active && (
                    <span className="absolute inset-0 -z-10 rounded-full bg-[var(--color-bg-2)]" />
                  )}
                  {item.label}
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
            className="hidden md:inline-flex h-9 items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-1)] px-3 text-xs text-[var(--color-text-1)] hover:border-[var(--color-accent)] hover:text-[var(--color-text-0)]"
          >
            <Command className="h-3.5 w-3.5" />
            <span>Search</span>
            <kbd className="rounded border border-[var(--color-border)] bg-[var(--color-bg-2)] px-1.5 py-0.5 font-mono text-[10px]">⌘K</kbd>
          </button>
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg-1)] text-[var(--color-text-1)] md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-[var(--color-border)] bg-[var(--color-bg-0)] md:hidden">
          <div className="mx-auto max-w-6xl px-4 py-4">
            <ul className="flex flex-col gap-1">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center justify-between rounded-lg px-3 py-3 text-base text-[var(--color-text-0)] hover:bg-[var(--color-bg-2)]"
                  >
                    {item.label}
                    <span className="text-[var(--color-text-2)]">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
