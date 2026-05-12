import type { MetadataRoute } from "next";
import { siteConfig } from "@/../site.config";
import { projects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const routes = ["", "/work", "/resume", "/writing"].map(
    (r) => ({
      url: `${base}${r}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: r === "" ? 1 : 0.7,
    })
  );
  const caseStudies = projects.map((p) => ({
    url: `${base}/work/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));
  return [...routes, ...caseStudies];
}
