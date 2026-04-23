"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const current = mounted ? resolvedTheme ?? theme : "dark";
  const isDark = current === "dark";

  return (
    <button
      type="button"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg-1)] text-[var(--color-text-1)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-text-0)]"
    >
      <Sun className={`h-4 w-4 transition-transform ${isDark ? "scale-0 rotate-90" : "scale-100 rotate-0"} absolute`} />
      <Moon className={`h-4 w-4 transition-transform ${isDark ? "scale-100 rotate-0" : "scale-0 -rotate-90"} absolute`} />
    </button>
  );
}
