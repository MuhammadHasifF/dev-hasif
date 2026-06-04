import { siteConfig } from "@/../site.config";

const GH = "https://api.github.com";

export type GitHubRepo = {
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
};

export type GitHubEvent = {
  id: string;
  type: string;
  repo: { name: string; url: string };
  created_at: string;
  payload: {
    commits?: { message: string; sha: string }[];
  };
};

const headers: Record<string, string> = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
};
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

export async function fetchRepos(limit = 6): Promise<GitHubRepo[]> {
  try {
    // Always pull a wider window from GitHub, then slice locally. Avoids
    // missing recent activity when the caller asks for a small N.
    const res = await fetch(
      `${GH}/users/${siteConfig.github.username}/repos?sort=updated&per_page=30`,
      { headers, next: { revalidate: 60 * 30 } },
    );
    if (!res.ok) return [];
    const data = (await res.json()) as GitHubRepo[];
    return data.filter((r) => !r.full_name.endsWith(".github.io")).slice(0, limit);
  } catch {
    return [];
  }
}

export async function fetchEvents(limit = 10): Promise<GitHubEvent[]> {
  try {
    // Pull GitHub's max page (100) so we still surface PushEvents when the
    // tail of the feed is dominated by Watch/Star/PR events.
    const res = await fetch(
      `${GH}/users/${siteConfig.github.username}/events/public?per_page=100`,
      { headers, next: { revalidate: 60 * 30 } },
    );
    if (!res.ok) return [];
    const data = (await res.json()) as GitHubEvent[];
    return data.slice(0, limit);
  } catch {
    return [];
  }
}

export type GitHubCommit = {
  sha: string;
  html_url: string;
  message: string;
  date: string; // ISO
  repo: string; // owner/name
  repoUrl: string;
};

/**
 * Fetch latest commits directly from each of the user's top N public repos.
 * Reliable even when the public events feed has no PushEvents (e.g. when
 * recent work has been on private repos or non-default branches that don't
 * surface in /events).
 *
 * 1) Pulls up to `repoCount` recently-updated public repos.
 * 2) For each, fetches the latest `perRepo` commits authored by the user.
 * 3) Merges, sorts by date desc, returns the top `limit`.
 */
export async function fetchLatestCommits(
  limit = 6,
  repoCount = 6,
  perRepo = 3,
): Promise<GitHubCommit[]> {
  try {
    const repos = await fetchRepos(repoCount);
    if (!repos.length) return [];

    const fetches = repos.map(async (r) => {
      try {
        const res = await fetch(
          `${GH}/repos/${r.full_name}/commits?author=${siteConfig.github.username}&per_page=${perRepo}`,
          { headers, next: { revalidate: 60 * 30 } },
        );
        if (!res.ok) return [] as GitHubCommit[];
        const data = (await res.json()) as Array<{
          sha: string;
          html_url: string;
          commit: { message: string; author: { date: string } };
        }>;
        return data.map((c) => ({
          sha: c.sha,
          html_url: c.html_url,
          message: c.commit.message.split("\n")[0],
          date: c.commit.author.date,
          repo: r.full_name,
          repoUrl: r.html_url,
        }));
      } catch {
        return [] as GitHubCommit[];
      }
    });

    const results = await Promise.all(fetches);
    const all = results.flat();
    all.sort((a, b) => +new Date(b.date) - +new Date(a.date));
    return all.slice(0, limit);
  } catch {
    return [];
  }
}
