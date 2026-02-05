"use client";

import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes";

export function ThemeProvider(props: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="obsidian"
      disableTransitionOnChange
      enableSystem={false}
      themes={["obsidian", "graphite", "light"]}
      {...props}
    />
  );
}
