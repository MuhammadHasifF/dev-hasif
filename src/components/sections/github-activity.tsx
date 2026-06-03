import { GitCommit, Github, Linkedin, Mail, Star } from "lucide-react";
import { Section } from "@/components/primitives/section";
import { fetchEvents, fetchRepos } from "@/lib/github";
import { siteConfig } from "@/../site.config";
import { PlatformReveal } from "@/components/sections/platform-reveal";

function relativeTime(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const d = Math.floor(diff / 86400000);
  if (d > 0) return `${d}d ago`;
  const h = Math.floor(diff / 3600000);
  if (h > 0) return `${h}h ago`;
  const m = Math.floor(diff / 60000);
  return `${Math.max(1, m)}m ago`;
}

/**
 * Multi-platform live hub. Top row = 4 platform banners (GitHub, LinkedIn,
 * ORCID, Email), each with its own brand-tinted gradient and reveal
 * animation. Bottom row = live GitHub commits + repo cards.
 *
 * GitHub data is fetched server-side with hourly revalidation. LinkedIn /
 * ORCID don't expose free profile APIs without auth, so those banners
 * are static identity cards (avatar + role + deep link).
 */
export async function GitHubActivity() {
  // Pull deeper feeds so PushEvents survive even when stars/PRs/watches
  // dominate the recent window.
  const [repos, events] = await Promise.all([fetchRepos(6), fetchEvents(60)]);
  const commits = events
    .filter((e) => e.type === "PushEvent" && e.payload?.commits?.length)
    .slice(0, 6);

  return (
    <Section
      id="github"
      eyebrow="LIVE FEED"
      index={6}
      total={7}
      stamp="// SIGNAL"
      title={["Shipping", "in the open."]}
      intro={`Live activity from @${siteConfig.github.username}, plus the rest of the public stack. Pushes + repos refresh hourly.`}
    >
      {/* Top platform banner row */}
      <div className="mb-8 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <PlatformReveal index={0}>
          <PlatformCard
            kind="github"
            href={siteConfig.links.github}
            handle={`@${siteConfig.github.username}`}
            tagline={`${repos.length} active repos`}
          />
        </PlatformReveal>
        <PlatformReveal index={1}>
          <PlatformCard
            kind="linkedin"
            href={siteConfig.links.linkedin}
            handle="Muhammad Hasif"
            tagline="Applied AI & Engineering"
          />
        </PlatformReveal>
        <PlatformReveal index={2}>
          <PlatformCard
            kind="orcid"
            href={siteConfig.links.orcid}
            handle="0009-0001-0939-6369"
            tagline="CHI '25 · DIS '26"
          />
        </PlatformReveal>
        <PlatformReveal index={3}>
          <PlatformCard
            kind="email"
            href={siteConfig.links.email}
            handle="muhammad.hasif.faisal"
            tagline="Open channel"
          />
        </PlatformReveal>
      </div>

      {/* Bottom row: live GitHub commits + repos */}
      <div className="grid gap-6 md:grid-cols-5">
        <div className="md:col-span-3">
          <div className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--color-text-2)]">
            <GitCommit className="h-3 w-3" /> Recent commits
          </div>
          <ol className="hud-panel divide-y divide-[var(--color-border)] overflow-hidden">
            {commits.length === 0 && (
              <li className="flex items-center gap-3 px-4 py-6 text-sm text-[var(--color-text-1)]">
                <span className="status-dot" />
                Listening for the next push.
              </li>
            )}
            {commits.map((e) => (
              <li key={e.id} className="flex items-start gap-3 px-4 py-3 text-sm">
                <GitCommit className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent)]" />
                <div className="min-w-0 flex-1">
                  <a
                    href={`https://github.com/${e.repo.name}`}
                    target="_blank"
                    rel="noreferrer"
                    className="truncate font-mono text-xs text-[var(--color-text-0)] hover:text-[var(--color-accent)]"
                  >
                    {e.repo.name}
                  </a>
                  <div className="truncate text-[var(--color-text-1)]">
                    {e.payload.commits?.[0]?.message?.split("\n")[0]}
                  </div>
                </div>
                <div className="shrink-0 font-mono text-[10px] text-[var(--color-text-2)]">
                  {relativeTime(e.created_at)}
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="md:col-span-2">
          <div className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--color-text-2)]">
            <Github className="h-3 w-3" /> Recent repos
          </div>
          <ol className="space-y-2">
            {repos.length === 0 && (
              <li className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-1)] px-4 py-6 text-sm text-[var(--color-text-1)]">
                Repo fetch returned empty. Set <code className="font-mono">GITHUB_TOKEN</code> in env for higher rate limits.
              </li>
            )}
            {repos.map((r) => (
              <li key={r.full_name}>
                <a
                  href={r.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-start justify-between gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-1)] px-4 py-3 transition-colors hover:border-[var(--color-accent)]/60"
                >
                  <div className="min-w-0">
                    <div className="truncate text-sm text-[var(--color-text-0)] group-hover:text-[var(--color-accent)]">
                      {r.name}
                    </div>
                    {r.description && (
                      <div className="mt-1 line-clamp-2 text-xs text-[var(--color-text-1)]">
                        {r.description}
                      </div>
                    )}
                    <div className="mt-2 flex items-center gap-2 font-mono text-[10px] text-[var(--color-text-2)]">
                      {r.language && <span>{r.language}</span>}
                      <span className="inline-flex items-center gap-1">
                        <Star className="h-3 w-3" /> {r.stargazers_count}
                      </span>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}

type PlatformKind = "github" | "linkedin" | "orcid" | "email";

type IconCmp = React.ComponentType<{ className?: string }>;

const PLATFORM_THEMES: Record<
  PlatformKind,
  { label: string; accent: string; bg: string; icon: IconCmp; subtitle: string }
> = {
  github: {
    label: "GitHub",
    accent: "#f0f6fc",
    bg: "radial-gradient(120% 90% at 20% 20%, #1a1a1d, #0a0a0d 60%)",
    icon: Github,
    subtitle: "Code + commits",
  },
  linkedin: {
    label: "LinkedIn",
    accent: "#4fb1f2",
    bg: "radial-gradient(120% 90% at 80% 20%, #0a3a6e, #051a30 65%)",
    icon: Linkedin,
    subtitle: "Profile + work history",
  },
  orcid: {
    label: "ORCID",
    accent: "#a6ce39",
    bg: "radial-gradient(120% 90% at 80% 80%, #1f2a0c, #0a0d05 60%)",
    icon: OrcidGlyph,
    subtitle: "Research identity",
  },
  email: {
    label: "Email",
    accent: "var(--color-accent)",
    bg: "radial-gradient(120% 90% at 20% 80%, #240409, #08020a 60%)",
    icon: Mail,
    subtitle: "Direct line",
  },
};

function PlatformCard({
  kind,
  href,
  handle,
  tagline,
}: {
  kind: PlatformKind;
  href: string;
  handle: string;
  tagline: string;
}) {
  const theme = PLATFORM_THEMES[kind];
  const Icon = theme.icon;
  return (
    <a
      href={href}
      target={href.startsWith("mailto:") ? undefined : "_blank"}
      rel="noreferrer"
      className="group relative block overflow-hidden rounded-xl border border-[var(--color-border)] p-5 transition-[border-color,box-shadow] hover:shadow-[0_0_28px_-6px_color-mix(in_oklab,var(--color-accent)_55%,transparent)]"
      style={{ background: theme.bg }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(60% 80% at 50% 0%, color-mix(in oklab, ${theme.accent} 22%, transparent), transparent 70%)`,
        }}
      />
      <div className="relative flex items-center gap-3">
        <div
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-black/30 transition-transform duration-500 group-hover:scale-110"
          style={{ color: theme.accent }}
          aria-hidden="true"
        >
          <Icon className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/55">
            {theme.label}
          </div>
          <div className="truncate text-sm font-medium text-white">{handle}</div>
        </div>
        <span className="font-mono text-[10px] tracking-[0.22em] text-white/50 transition-colors group-hover:text-white">
          →
        </span>
      </div>
      <div className="relative mt-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em]">
        <span className="text-white/55">{tagline}</span>
        <span style={{ color: theme.accent }}>● live</span>
      </div>
      {/* Scanlines for unity with the rest of the site */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-20 mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent 0 2px, rgba(255,255,255,0.05) 2px 3px)",
        }}
      />
    </a>
  );
}

function OrcidGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zM7.4 17.7H5.7V7.7h1.7v10zM6.6 6.4c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.5 1-1 1zm12.3 11.3h-3.4c-2.7 0-4.5-1.9-4.5-4.6 0-2.6 1.9-4.6 4.5-4.6h3.4v9.2zm-1.7-7.6h-1.6c-1.8 0-3 1.2-3 3s1.2 3 3 3h1.6v-6z" />
    </svg>
  );
}
