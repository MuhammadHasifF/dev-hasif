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
    const res = await fetch(
      `${GH}/users/${siteConfig.github.username}/repos?sort=updated&per_page=${limit}`,
      { headers, next: { revalidate: 60 * 60 } }
    );
    if (!res.ok) return [];
    const data = (await res.json()) as GitHubRepo[];
    return data.filter((r) => !r.full_name.endsWith(".github.io"));
  } catch {
    return [];
  }
}

export async function fetchEvents(limit = 10): Promise<GitHubEvent[]> {
  try {
    const res = await fetch(
      `${GH}/users/${siteConfig.github.username}/events/public?per_page=${limit}`,
      { headers, next: { revalidate: 60 * 60 } }
    );
    if (!res.ok) return [];
    return (await res.json()) as GitHubEvent[];
  } catch {
    return [];
  }
}
