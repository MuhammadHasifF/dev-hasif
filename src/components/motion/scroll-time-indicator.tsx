"use client";

import { useMotionValueEvent, useScroll } from "framer-motion";
import { useMemo, useState } from "react";
import { Clock } from "lucide-react";

import { cn } from "@/lib/cn";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function formatTime(totalMinutes: number) {
  const minutes = clamp(totalMinutes, 0, 24 * 60 - 1);
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export function ScrollTimeIndicator({ className }: { className?: string }) {
  const { scrollYProgress } = useScroll();
  const [time, setTime] = useState("00:00");
  const [pct, setPct] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const progress = clamp(latest, 0, 1);
    setPct(progress);
    setTime(formatTime(Math.floor(progress * 24 * 60)));
  });

  const label = useMemo(() => `${Math.round(pct * 100)}%`, [pct]);

  return (
    <div
      className={cn(
        "pointer-events-none fixed bottom-6 right-6 z-40 hidden sm:block",
        className,
      )}
      aria-hidden
    >
      <div className="pointer-events-auto flex items-center gap-3 rounded-2xl border border-border/60 bg-card/40 px-4 py-3 text-xs text-muted-foreground shadow-sm backdrop-blur">
        <div className="flex items-center gap-2">
          <Clock className="h-3.5 w-3.5" />
          <span className="font-mono text-foreground">{time}</span>
        </div>

        <span className="h-4 w-px bg-border/70" />

        <div className="flex items-center gap-2">
          <span className="font-mono">{label}</span>
          <span className="relative h-1.5 w-20 overflow-hidden rounded-full bg-muted/60">
            <span
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary to-accent"
              style={{ width: `${pct * 100}%` }}
            />
          </span>
        </div>
      </div>
    </div>
  );
}

