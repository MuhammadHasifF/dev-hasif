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
    "Long-form bio for Muhammad Hasif. Applied AI undergrad and full-stack engineer shipping data products, ML pipelines, and analytics platforms.",
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
              Applied AI undergraduate (SIT, Honours, expected 2028) building
              production grade machine learning, LLM, and data systems. Hands
              on experience with Generative AI (Llama 3.3, Groq, LangChain,
              RAG), time-series forecasting (ARIMA, XGBoost, LightGBM), full
              stack data platforms (Python, Flask/Django, Vue/React, Pandas,
              Apache ECharts), and geospatial analytics (ArcGIS) across
              Deloitte, HTX, Singapore Police Force, MOM, and SIT research
              labs.
            </p>
            <p>
              Currently architecting an end to end data platform for the SIT
              Future Ship & System Design (FSSD) project. Raw maritime alarm
              data flows through Pandas based ETL into a Flask/Django + Vue/
              React fault diagnosis app, with Apache ECharts dashboards that
              translate operational alarm streams into stakeholder facing
              diagnostic insights.
            </p>
            <PullQuote>
              Strong record of shipping mission critical, stakeholder facing
              solutions under pressure.
            </PullQuote>
            <p>
              Earlier work spans an MSIG travel insurance LLM prototype at
              SingHacks 2025 (Llama 3.3 70B, Groq, LangChain, RAG), R3CAP open
              source 3D reconstruction at SIT's Centre of Immersification
              (Python, Babylon.js, WebXR, contributions backing CHI '25 and
              DIS '26 submissions), HTX SOC automation in Python, and Deloitte
              forecasting work that lifted accuracy by ~12% over baseline
              ARIMA on client datasets. I move between research, engineering,
              and stakeholders fluently, and I write code that ships.
            </p>
          </div>

          <aside className="space-y-4">
            <div className="hud-panel p-5">
              <div className="mb-3 font-mono text-[11px] uppercase tracking-widest text-[var(--color-text-2)]">
                Currently
              </div>
              <ul className="space-y-2 text-sm text-[var(--color-text-0)]">
                <li>Web app developer · FSSD · SIT</li>
                <li>Undergraduate · Applied AI · SIT</li>
                <li>Shipping more, writing more, sleeping less</li>
              </ul>
            </div>
            <div className="hud-panel p-5">
              <div className="mb-3 font-mono text-[11px] uppercase tracking-widest text-[var(--color-text-2)]">
                Signals
              </div>
              <ul className="space-y-2 text-sm text-[var(--color-text-0)]">
                <li>CHI &rsquo;25 + DIS &rsquo;26 contributions</li>
                <li>GE2025 polling automation lead (1,900+ stations)</li>
                <li>~12% lift over baseline ARIMA at Deloitte</li>
                <li>Best Trainee (POBC) · Best Op-Fit (OCC)</li>
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
