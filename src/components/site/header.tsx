"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { Menu, X } from "lucide-react";

import { cn } from "@/lib/cn";
import { siteConfig } from "@/site.config";
import { ThemeToggle } from "@/components/theme/theme-toggle";

const navItems = [
  { href: "/projects", label: "Projects" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/timeline", label: "Timeline" },
  { href: "/contact", label: "Contact" },
] as const;

export function Header() {
  const pathname = usePathname();
  const [mobileMenu, setMobileMenu] = useState<{
    open: boolean;
    pathname: string;
  }>({ open: false, pathname });
  const mobileOpen = mobileMenu.open && mobileMenu.pathname === pathname;

  const items = useMemo(
    () =>
      navItems.map((item) => ({
        ...item,
        active: pathname === item.href || pathname.startsWith(`${item.href}/`),
      })),
    [pathname],
  );

  function toggleMobileMenu() {
    setMobileMenu((prev) => {
      const isOpen = prev.open && prev.pathname === pathname;
      return { open: !isOpen, pathname };
    });
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/55">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 font-semibold tracking-tight"
        >
          <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_0_6px_hsl(var(--primary)/0.12)] transition group-hover:shadow-[0_0_0_10px_hsl(var(--primary)/0.16)]" />
          <span>{siteConfig.name}</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={item.active ? "page" : undefined}
              className={cn(
                "group text-sm transition",
                item.active
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {item.label}
              <span
                className={cn(
                  "mt-1 block h-px w-full bg-foreground/0 transition",
                  item.active ? "bg-foreground/70" : "group-hover:bg-foreground/30",
                )}
              />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle className="hidden sm:inline-flex" />

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-card/40 text-muted-foreground backdrop-blur transition hover:bg-card/60 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:outline-none md:hidden"
            onClick={toggleMobileMenu}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <span className="sr-only">Toggle menu</span>
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={cn(
          "md:hidden",
          mobileOpen ? "border-t border-border/60" : "hidden",
        )}
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4">
          <ThemeToggle className="w-fit sm:hidden" />
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={item.active ? "page" : undefined}
              className={cn(
                "rounded-xl px-4 py-3 text-sm transition",
                item.active
                  ? "bg-card/60 text-foreground"
                  : "text-muted-foreground hover:bg-card/50 hover:text-foreground",
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
