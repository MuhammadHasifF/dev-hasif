"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { skillGroups } from "@/content/skills";
import { Section } from "@/components/primitives/section";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Node = {
  id: string;
  group: string;
  label: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  color: string;
  el?: HTMLDivElement | null;
};

const HUE_TO_CSS: Record<string, string> = {
  "var(--color-accent)": "var(--color-accent)",
  "var(--color-accent-2)": "var(--color-accent-2)",
  "var(--color-accent-3)": "var(--color-accent-3)",
  "var(--color-text-1)": "var(--color-text-1)",
};

export function SkillsConstellation() {
  const reduce = useReducedMotion();
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const [view, setView] = useState<"constellation" | "grid">(reduce ? "grid" : "constellation");

  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title={<>A toolkit<br/>across the stack.</>}
      intro="Hover a group to highlight it. Drag any skill node — they push each other apart."
    >
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {skillGroups.map((g) => (
            <button
              key={g.id}
              type="button"
              onMouseEnter={() => setActiveGroup(g.id)}
              onMouseLeave={() => setActiveGroup(null)}
              onFocus={() => setActiveGroup(g.id)}
              onBlur={() => setActiveGroup(null)}
              className={cn(
                "inline-flex h-8 items-center rounded-full border px-3 text-xs transition",
                activeGroup === g.id
                  ? "border-transparent text-[var(--color-bg-0)]"
                  : "border-[var(--color-border)] bg-[var(--color-bg-1)] text-[var(--color-text-1)]"
              )}
              style={activeGroup === g.id ? { background: HUE_TO_CSS[g.hue] ?? g.hue } : undefined}
            >
              {g.label}
            </button>
          ))}
        </div>
        <div className="inline-flex rounded-full border border-[var(--color-border)] bg-[var(--color-bg-1)] p-1 text-xs">
          <button
            type="button"
            onClick={() => setView("constellation")}
            className={cn(
              "rounded-full px-3 py-1 transition",
              view === "constellation" ? "bg-[var(--color-bg-3)] text-[var(--color-text-0)]" : "text-[var(--color-text-1)]",
            )}
          >
            Constellation
          </button>
          <button
            type="button"
            onClick={() => setView("grid")}
            className={cn(
              "rounded-full px-3 py-1 transition",
              view === "grid" ? "bg-[var(--color-bg-3)] text-[var(--color-text-0)]" : "text-[var(--color-text-1)]",
            )}
          >
            Grid
          </button>
        </div>
      </div>

      {view === "constellation" && !reduce ? (
        <ConstellationView activeGroup={activeGroup} />
      ) : (
        <GridView activeGroup={activeGroup} />
      )}
    </Section>
  );
}

function GridView({ activeGroup }: { activeGroup: string | null }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {skillGroups.map((g) => {
        const dim = activeGroup && activeGroup !== g.id;
        return (
          <div
            key={g.id}
            className={cn(
              "relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-1)] p-6 transition-opacity",
              dim && "opacity-40",
            )}
          >
            <div
              aria-hidden="true"
              className="absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-30 blur-3xl"
              style={{ background: g.hue }}
            />
            <div className="mb-4 flex items-center gap-2">
              <span aria-hidden="true" className="h-2 w-2 rounded-full" style={{ background: g.hue }} />
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-text-1)]">
                {g.label}
              </h3>
            </div>
            <ul className="flex flex-wrap gap-1.5">
              {g.items.map((item) => (
                <li
                  key={item}
                  className="rounded-md border border-[var(--color-border)] bg-[var(--color-bg-2)] px-2 py-1 text-xs text-[var(--color-text-0)]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

function ConstellationView({ activeGroup }: { activeGroup: string | null }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const sizeRef = useRef({ w: 0, h: 0 });
  const pointerRef = useRef<{ x: number; y: number; active: boolean }>({ x: -9999, y: -9999, active: false });
  const dragRef = useRef<Node | null>(null);
  const activeGroupRef = useRef<string | null>(null);

  // Build initial node list once
  const nodes = useMemo<Node[]>(() => {
    const all: Node[] = [];
    skillGroups.forEach((g, gi) => {
      g.items.forEach((label, i) => {
        all.push({
          id: `${g.id}-${i}`,
          group: g.id,
          label,
          x: 0,
          y: 0,
          vx: 0,
          vy: 0,
          r: 0,
          color: HUE_TO_CSS[g.hue] ?? g.hue,
        });
        void gi;
      });
    });
    return all;
  }, []);

  useEffect(() => {
    activeGroupRef.current = activeGroup;
  }, [activeGroup]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    nodesRef.current = nodes.map((n) => ({ ...n }));

    const groupCenters = () => {
      const { w, h } = sizeRef.current;
      const cols = skillGroups.length;
      const m: Record<string, { x: number; y: number }> = {};
      skillGroups.forEach((g, i) => {
        const cx = w * ((i + 0.5) / cols);
        const cy = h * 0.5;
        m[g.id] = { x: cx, y: cy };
      });
      return m;
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      sizeRef.current = { w, h };
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Initial scatter near group centers
      const centers = groupCenters();
      nodesRef.current.forEach((n) => {
        if (n.x === 0 && n.y === 0) {
          const c = centers[n.group];
          n.x = c.x + (Math.random() - 0.5) * 80;
          n.y = c.y + (Math.random() - 0.5) * 80;
        }
      });
      // Measure DOM-sized radius for each node label
      nodesRef.current.forEach((n) => {
        if (!n.el) return;
        const r = n.el.getBoundingClientRect();
        n.r = Math.max(r.width, r.height) / 2 + 4;
      });
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      pointerRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
      if (dragRef.current) {
        dragRef.current.x = pointerRef.current.x;
        dragRef.current.y = pointerRef.current.y;
        dragRef.current.vx = 0;
        dragRef.current.vy = 0;
      }
    };
    const onPointerLeave = () => {
      pointerRef.current.active = false;
      pointerRef.current.x = -9999;
      pointerRef.current.y = -9999;
    };
    const onPointerUp = () => {
      dragRef.current = null;
    };
    container.addEventListener("pointermove", onPointerMove, { passive: true });
    container.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("pointerup", onPointerUp);

    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(32, now - last) / 16; // ~1 per frame at 60fps
      last = now;
      const { w, h } = sizeRef.current;
      const centers = groupCenters();
      const nodes = nodesRef.current;
      const pointer = pointerRef.current;
      const active = activeGroupRef.current;

      // Forces
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        if (n === dragRef.current) continue;
        // Attraction to group center
        const c = centers[n.group];
        const dx = c.x - n.x;
        const dy = c.y - n.y;
        n.vx += dx * 0.0018 * dt;
        n.vy += dy * 0.0018 * dt;
        // Mouse repulsion
        if (pointer.active) {
          const px = n.x - pointer.x;
          const py = n.y - pointer.y;
          const dist2 = px * px + py * py;
          const radius = 110;
          if (dist2 < radius * radius && dist2 > 0.01) {
            const dist = Math.sqrt(dist2);
            const force = (1 - dist / radius) * 1.4;
            n.vx += (px / dist) * force * dt;
            n.vy += (py / dist) * force * dt;
          }
        }
      }
      // Pairwise repulsion
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const minD = a.r + b.r;
          const d2 = dx * dx + dy * dy;
          if (d2 < minD * minD && d2 > 0.01) {
            const d = Math.sqrt(d2);
            const overlap = (minD - d) * 0.5;
            const ux = dx / d;
            const uy = dy / d;
            if (a !== dragRef.current) {
              a.x -= ux * overlap;
              a.y -= uy * overlap;
            }
            if (b !== dragRef.current) {
              b.x += ux * overlap;
              b.y += uy * overlap;
            }
          }
        }
      }
      // Integrate + bounds + damping
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        if (n === dragRef.current) continue;
        n.x += n.vx * dt;
        n.y += n.vy * dt;
        n.vx *= 0.86;
        n.vy *= 0.86;
        const m = n.r + 4;
        if (n.x < m) {
          n.x = m;
          n.vx *= -0.5;
        }
        if (n.x > w - m) {
          n.x = w - m;
          n.vx *= -0.5;
        }
        if (n.y < m) {
          n.y = m;
          n.vy *= -0.5;
        }
        if (n.y > h - m) {
          n.y = h - m;
          n.vy *= -0.5;
        }
      }

      // Draw constellation lines between same-group neighbors
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          if (a.group !== b.group) continue;
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const d2 = dx * dx + dy * dy;
          const max = 160;
          if (d2 < max * max) {
            const t = 1 - Math.sqrt(d2) / max;
            const dim = active && active !== a.group ? 0.08 : 0.35;
            ctx.strokeStyle = `color-mix(in oklab, ${a.color} ${Math.round(t * 100)}%, transparent)`;
            ctx.globalAlpha = t * dim;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;

      // Position DOM labels
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        if (n.el) {
          n.el.style.transform = `translate3d(${n.x}px, ${n.y}px, 0) translate(-50%, -50%)`;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [nodes]);

  return (
    <div
      ref={containerRef}
      className="relative h-[640px] w-full overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-1)]"
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
      {nodes.map((n, idx) => {
        const dim = activeGroup && activeGroup !== n.group;
        return (
          <div
            key={n.id}
            ref={(el) => {
              if (nodesRef.current[idx]) nodesRef.current[idx].el = el;
            }}
            onPointerDown={(e) => {
              const rect = containerRef.current!.getBoundingClientRect();
              pointerRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
                active: true,
              };
              dragRef.current = nodesRef.current[idx];
              (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
            }}
            className={cn(
              "absolute left-0 top-0 select-none whitespace-nowrap rounded-full border px-2.5 py-1 text-[11px] font-medium text-[var(--color-text-0)] transition-opacity will-change-transform",
              "cursor-grab active:cursor-grabbing",
              dim ? "opacity-25" : "opacity-100",
            )}
            style={{
              borderColor: `color-mix(in oklab, ${n.color} 50%, var(--color-border))`,
              background: `color-mix(in oklab, ${n.color} 12%, var(--color-bg-2))`,
            }}
          >
            {n.label}
          </div>
        );
      })}
      <div className="pointer-events-none absolute bottom-3 left-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-2)]">
        Drag any node · cursor repels
      </div>
    </div>
  );
}
