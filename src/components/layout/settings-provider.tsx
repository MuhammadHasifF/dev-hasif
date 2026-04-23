"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

type Settings = {
  reducedMotion: boolean;
  highContrast: boolean;
  sound: boolean;
};

type Ctx = Settings & {
  set: (key: keyof Settings, value: boolean) => void;
  reset: () => void;
};

const defaults: Settings = { reducedMotion: false, highContrast: false, sound: false };
const Context = createContext<Ctx | null>(null);

export function useSettings() {
  const ctx = useContext(Context);
  if (!ctx) throw new Error("useSettings must be used within <SettingsProvider>");
  return ctx;
}

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [s, setS] = useState<Settings>(defaults);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("hasif:settings");
      if (raw) setS({ ...defaults, ...JSON.parse(raw) });
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("hasif:settings", JSON.stringify(s));
    } catch {}
    document.documentElement.classList.toggle("high-contrast", s.highContrast);
    document.documentElement.dataset.reducedMotion = s.reducedMotion ? "true" : "false";
  }, [s]);

  const set = useCallback((key: keyof Settings, value: boolean) => {
    setS((prev) => ({ ...prev, [key]: value }));
  }, []);

  const reset = useCallback(() => setS(defaults), []);

  return <Context.Provider value={{ ...s, set, reset }}>{children}</Context.Provider>;
}
