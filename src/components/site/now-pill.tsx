"use client";

import { useEffect, useMemo, useState } from "react";
import { Clock } from "lucide-react";

import { cn } from "@/lib/cn";

function formatNow(now: Date) {
  const time = new Intl.DateTimeFormat(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(now);

  const tz = new Intl.DateTimeFormat(undefined, {
    timeZoneName: "short",
  })
    .formatToParts(now)
    .find((p) => p.type === "timeZoneName")?.value;

  return { time, tz: tz ?? "" };
}

export function NowPill({ className }: { className?: string }) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const formatted = useMemo(() => formatNow(now), [now]);

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-4 py-2 text-xs text-muted-foreground shadow-sm backdrop-blur",
        className,
      )}
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/50" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
      </span>
      <Clock className="h-3.5 w-3.5" />
      <span className="font-mono">{formatted.time}</span>
      {formatted.tz ? (
        <span className="hidden font-mono sm:inline">{formatted.tz}</span>
      ) : null}
      <span className="sr-only">Current time</span>
    </div>
  );
}

