import { Github, GitCommit, Star } from "lucide-react";
import { Section } from "@/components/primitives/section";
import { fetchEvents, fetchRepos } from "@/lib/github";
import { siteConfig } from "@/../site.config";

function relativeTime(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const d = Math.floor(diff / 86400000);
  if (d > 0) return `${d}d ago`;
  const h = Math.floor(diff / 3600000);
  if (h > 0) return `${h}h ago`;
  const m = Math.floor(diff / 60000);
  return `${Math.max(1, m)}m ago`;
}

export async function GitHubActivity() {
  const [repos, events] = await Promise.all([fetchRepos(5), fetchEvents(10)]);
  const commits = events
    .filter((e) => e.type === "PushEvent" && e.payload?.commits?.length)
    .slice(0, 5);

  return (
    <Section
      id="github"
      eyebrow="Live feed"
      title={<>Shipping<br/>in the open.</>}
      intro={`Public activity from @${siteConfig.github.username}, revalidated hourly. What I've been pushing, starring, and breaking lately.`}
    >
      <div className="grid gap-6 md:grid-cols-5">
        <div className="md:col-span-3">
          <div className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--color-text-2)]">
            <GitCommit className="h-3 w-3" /> Recent commits
          </div>
          <ol className="tech-panel divide-y divide-[var(--color-border)] overflow-hidden">
            {commits.length === 0 && (
              <li className="px-4 py-6 text-sm text-[var(--color-text-1)]">
                No public push events in the last window.
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
                Fetch didn&rsquo;t return repos; set <code className="font-mono">GITHUB_TOKEN</code> for higher limits.
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
          <a
            href={`https://github.com/${siteConfig.github.username}`}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm text-[var(--color-text-1)] hover:text-[var(--color-text-0)]"
          >
            <Github className="h-4 w-4" /> Follow on GitHub
          </a>
        </div>
      </div>
    </Section>
  );
}
