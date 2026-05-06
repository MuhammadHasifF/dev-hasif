import type { Metadata } from "next";
import { Section } from "@/components/primitives/section";
import { OrgLogo } from "@/components/primitives/org-tag";
import { education } from "@/content/education";
import { leadership } from "@/content/awards";
import { Shield, GraduationCap, Share2 } from "lucide-react";
import { PageBackground } from "@/components/layout/page-background";
import { PullQuote } from "@/components/sections/pull-quote";

export const metadata: Metadata = {
  title: "About",
  description:
    "Long-form bio for Muhammad Hasif. Research engineering, government operations, cybersecurity, and applied AI.",
};

const values = [
  {
    icon: Shield,
    title: "Security-first",
    body: "Systems that touch sensitive data earn trust through boring discipline. Ship careful; document always.",
  },
  {
    icon: GraduationCap,
    title: "Ship then polish",
    body: "A working end-to-end build beats a beautiful half. Land the skeleton, wire the data, then make it sing.",
  },
  {
    icon: Share2,
    title: "Teach what you learn",
    body: "Notes become articles. Articles become better teammates. Public learning is how the next role comes to you.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageBackground variant="about" />
      <Section
        eyebrow="ABOUT"
        index={1}
        total={5}
        stamp="// LONG VERSION"
        title={["A long answer", "to a short question."]}
        intro="Who I am, what I care about, and where I've been."
      >
        <div className="grid gap-12 md:grid-cols-3">
          <div className="prose prose-invert max-w-none md:col-span-2 text-[var(--color-text-0)]">
            <p>
              Analytically driven and technically versatile, with hands-on
              experience across data analysis, cybersecurity, automation, and
              operational technology. Proven track record supporting
              national-level initiatives through real-time data systems,
              geospatial dashboards, RPA solutions, and predictive modeling.
            </p>
            <p>
              Adept at Python, SQL, ArcGIS, and BI tools, with a deep
              understanding of stakeholder needs, cross-agency collaboration,
              and applied machine learning.
            </p>
            <PullQuote>
              Known for leading teams under pressure, adapting quickly in
              dynamic environments, and communicating complex ideas with
              clarity.
            </PullQuote>
            <p>
              Committed to delivering secure, scalable, and data-informed
              solutions across sectors. Currently a research engineer on open
              real-time 3D reconstruction work at SIT, an undergraduate in
              Applied AI, and an operator-shaped engineer from my time in
              Singapore&rsquo;s Home Team.
            </p>
          </div>

          <aside className="space-y-4">
            <div className="hud-panel p-5">
              <div className="mb-3 font-mono text-[11px] uppercase tracking-widest text-[var(--color-text-2)]">
                Currently
              </div>
              <ul className="space-y-2 text-sm text-[var(--color-text-0)]">
                <li>Research engineer · R3CAP · SIT</li>
                <li>Undergraduate · Applied AI · SIT</li>
                <li>Writing more, shipping more, sleeping less</li>
              </ul>
            </div>
            <div className="hud-panel p-5">
              <div className="mb-3 font-mono text-[11px] uppercase tracking-widest text-[var(--color-text-2)]">
                Signals
              </div>
              <ul className="space-y-2 text-sm text-[var(--color-text-0)]">
                <li>CHI &rsquo;25 + DIS &rsquo;26 contributions</li>
                <li>GE2025 polling automation lead</li>
                <li>Best Operational Fitness (SPF × OCC)</li>
                <li>Best Trainee (POBC)</li>
              </ul>
            </div>
          </aside>
        </div>
      </Section>

      <Section eyebrow="VALUES" index={2} total={4} stamp="// PRINCIPLES" title={["How I work."]}>
        <div className="grid gap-4 md:grid-cols-3">
          {values.map((v) => (
            <div
              key={v.title}
              className="hud-panel hud-panel-hover group relative overflow-hidden p-6 transition-colors"
            >
              <div
                aria-hidden="true"
                className="absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-30 blur-3xl transition-opacity group-hover:opacity-60"
                style={{ background: "var(--color-accent)" }}
              />
              <v.icon className="h-5 w-5 text-[var(--color-accent)]" />
              <h3 className="mt-4 font-display text-xl text-[var(--color-text-0)]">{v.title}</h3>
              <p className="mt-2 text-sm text-[var(--color-text-1)]">{v.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="EDUCATION" index={3} total={4} stamp="// SCHOOLS" title={["Schools."]}>
        <ol className="hud-panel divide-y divide-[var(--color-border)] overflow-hidden">
          {education.map((e) => (
            <li key={e.school + e.credential} className="flex items-start gap-4 px-5 py-5">
              <OrgLogo orgKey={e.orgKey} size="lg" />
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium text-[var(--color-text-0)]">{e.credential}</div>
                <div className="text-sm text-[var(--color-text-1)]">{e.school}</div>
                {e.note && <div className="mt-1 text-xs text-[var(--color-text-2)]">{e.note}</div>}
              </div>
              <div className="shrink-0 font-mono text-[11px] text-[var(--color-text-2)]">{e.end}</div>
            </li>
          ))}
        </ol>
      </Section>

      <Section eyebrow="LEADERSHIP" index={4} total={4} stamp="// ROLES" title={["Along the way."]}>
        <ul className="grid gap-2 md:grid-cols-2">
          {leadership.map((l) => (
            <li
              key={l}
              className="hud-panel flex items-center gap-3 px-4 py-3 text-sm text-[var(--color-text-0)]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
              {l}
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
