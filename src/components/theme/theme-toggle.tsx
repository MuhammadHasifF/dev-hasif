"use client";

import { useMemo } from "react";
import { useTheme } from "next-themes";
import { Moon, Paintbrush } from "lucide-react";

import { cn } from "@/lib/cn";

const THEMES = ["obsidian", "graphite"] as const;
type Theme = (typeof THEMES)[number];

function nextTheme(current: string | undefined): Theme {
  const index = THEMES.indexOf((current ?? "obsidian") as Theme);
  return THEMES[(index + 1) % THEMES.length];
}

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const label = useMemo(() => {
    if (theme === "graphite") return "Graphite";
    return "Obsidian";
  }, [theme]);

  return (
    <button
      type="button"
      onClick={() => setTheme(nextTheme(theme))}
      className={cn(
        "inline-flex h-10 items-center gap-2 rounded-full border border-border/60 bg-card/40 px-4 text-sm text-muted-foreground backdrop-blur transition",
        "hover:bg-card/60 hover:text-foreground",
        "focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:outline-none",
        className,
      )}
    >
      <span className="sr-only">Toggle theme</span>
      <Moon className="h-4 w-4" />
      <span className="hidden sm:inline">{label}</span>
      <Paintbrush className="h-4 w-4 opacity-70" />
    </button>
  );
}

