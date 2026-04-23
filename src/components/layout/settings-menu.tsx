"use client";

import { useState } from "react";
import { Settings, X } from "lucide-react";
import { useSettings } from "@/components/layout/settings-provider";

export function SettingsMenu() {
  const [open, setOpen] = useState(false);
  const s = useSettings();

  const Row = ({
    label,
    value,
    onChange,
  }: {
    label: string;
    value: boolean;
    onChange: (v: boolean) => void;
  }) => (
    <label className="flex cursor-pointer items-center justify-between gap-6 rounded-md px-2 py-2 hover:bg-[var(--color-bg-2)]">
      <span className="text-sm text-[var(--color-text-0)]">{label}</span>
      <span
        role="switch"
        aria-checked={value}
        tabIndex={0}
        onClick={() => onChange(!value)}
        onKeyDown={(e) => {
          if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            onChange(!value);
          }
        }}
        className={`relative h-5 w-9 rounded-full transition ${value ? "bg-[var(--color-accent)]" : "bg-[var(--color-bg-3)]"}`}
      >
        <span
          className="absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform"
          style={{ transform: `translateX(${value ? 18 : 2}px)` }}
        />
      </span>
    </label>
  );

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="Open settings"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text-1)] hover:text-[var(--color-text-0)]"
      >
        <Settings className="h-3.5 w-3.5" />
      </button>
      {open && (
        <div
          role="dialog"
          aria-label="Settings"
          className="absolute bottom-full right-0 z-50 mb-3 w-64 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-1)] p-2 shadow-xl"
        >
          <div className="mb-1 flex items-center justify-between px-2 pt-1">
            <span className="text-xs uppercase tracking-widest text-[var(--color-text-2)]">
              Settings
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close settings"
              className="text-[var(--color-text-2)] hover:text-[var(--color-text-0)]"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
          <Row label="Reduced motion" value={s.reducedMotion} onChange={(v) => s.set("reducedMotion", v)} />
          <Row label="High contrast" value={s.highContrast} onChange={(v) => s.set("highContrast", v)} />
          <Row label="Section sounds" value={s.sound} onChange={(v) => s.set("sound", v)} />
          <button
            type="button"
            onClick={s.reset}
            className="mt-1 w-full rounded-md px-3 py-2 text-left text-xs text-[var(--color-text-1)] hover:bg-[var(--color-bg-2)] hover:text-[var(--color-text-0)]"
          >
            Reset to defaults
          </button>
        </div>
      )}
    </div>
  );
}
