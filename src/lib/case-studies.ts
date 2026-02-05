import fs from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

import { mdxComponents } from "@/components/mdx/mdx-components";

export type CaseStudyFrontmatter = {
  title: string;
  summary: string;
  date: string;
  year?: string;
  tags?: string[];
  role?: string;
  stack?: string[];
  links?: {
    live?: string;
    repo?: string;
  };
};

export type CaseStudyMeta = CaseStudyFrontmatter & {
  slug: string;
};

const CASE_STUDIES_DIR = path.join(process.cwd(), "content", "case-studies");

export const getCaseStudySlugs = cache(async () => {
  const entries = await fs.readdir(CASE_STUDIES_DIR, { withFileTypes: true });
  return entries
    .filter((e) => e.isFile() && e.name.endsWith(".mdx"))
    .map((e) => e.name.replace(/\.mdx$/, ""));
});

export const getAllCaseStudies = cache(async (): Promise<CaseStudyMeta[]> => {
  const slugs = await getCaseStudySlugs();
  const all = await Promise.all(slugs.map((slug) => getCaseStudyMeta(slug)));

  return all
    .filter((v): v is CaseStudyMeta => Boolean(v))
    .sort((a, b) => b.date.localeCompare(a.date));
});

export const getCaseStudyMeta = cache(
  async (slug: string): Promise<CaseStudyMeta | null> => {
    try {
      const filePath = path.join(CASE_STUDIES_DIR, `${slug}.mdx`);
      const source = await fs.readFile(filePath, "utf8");
      const { data } = matter(source);
      const fm = normalizeFrontmatter(data);
      return { slug, ...fm };
    } catch {
      return null;
    }
  },
);

export async function getCaseStudyBySlug(slug: string) {
  const filePath = path.join(CASE_STUDIES_DIR, `${slug}.mdx`);
  const source = await fs.readFile(filePath, "utf8");
  const { content, data } = matter(source);
  const frontmatter = normalizeFrontmatter(data);

  const compiled = await compileMDX({
    source: content,
    components: mdxComponents,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  });

  return { slug, frontmatter, content: compiled.content };
}

function normalizeFrontmatter(input: unknown): CaseStudyFrontmatter {
  const data = (input ?? {}) as Partial<CaseStudyFrontmatter>;

  const title = typeof data.title === "string" ? data.title : "Untitled";
  const summary =
    typeof data.summary === "string" ? data.summary : "No summary provided.";
  const date = typeof data.date === "string" ? data.date : "1970-01-01";

  const year = typeof data.year === "string" ? data.year : undefined;
  const role = typeof data.role === "string" ? data.role : undefined;

  const tags = Array.isArray(data.tags)
    ? data.tags.filter((t): t is string => typeof t === "string")
    : [];

  const stack = Array.isArray(data.stack)
    ? data.stack.filter((t): t is string => typeof t === "string")
    : [];

  const links = isRecord(data.links)
    ? {
        live: typeof data.links.live === "string" ? data.links.live : undefined,
        repo: typeof data.links.repo === "string" ? data.links.repo : undefined,
      }
    : undefined;

  return { title, summary, date, year, tags, role, stack, links };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
