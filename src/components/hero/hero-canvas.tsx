"use client";

// Initial static-friendly hero background; the R3F canvas is upgraded in the WebGL commit.
export function HeroCanvas() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <div
        className="absolute left-1/2 top-[30%] h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, var(--color-accent) 0%, transparent 60%), radial-gradient(circle at 70% 70%, var(--color-accent-2) 0%, transparent 55%)",
        }}
      />
      <div
        className="absolute bottom-[-15%] right-[-10%] h-[50vmin] w-[50vmin] rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--color-accent-3) 0%, transparent 65%)",
        }}
      />
    </div>
  );
}
