"use client";

export function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60] bg-noise opacity-[0.035] mix-blend-overlay"
    />
  );
}
