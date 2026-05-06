"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Command, Menu, X } from "lucide-react";
import { siteConfig } from "@/../site.config";
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
            className="hidden md:inline-flex h-9 items-center gap-2 rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-1)] px-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-1)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
          >
            <Command className="h-3.5 w-3.5" />
            <span>Search</span>
            <kbd className="rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-2)] px-1.5 py-0.5 font-mono text-[10px]">⌘K</kbd>
          </button>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-1)] text-[var(--color-text-1)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] md:hidden"
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
