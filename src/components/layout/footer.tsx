import Link from "next/link";
import { Github, Linkedin, Mail, FileText } from "lucide-react";
import { siteConfig } from "@/../site.config";
import { SettingsMenu } from "@/components/layout/settings-menu";

const buildTime = new Date().toISOString();

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-[var(--color-border)]">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="font-display text-4xl leading-none text-[var(--color-text-0)] md:text-6xl">
            Let&rsquo;s build
            <br />
            <span className="gradient-text">something real.</span>
          </div>
          <p className="mt-6 max-w-md text-sm text-[var(--color-text-1)]">
            I&rsquo;m open to research collaborations, engineering roles, and
            interesting problems at the edges of AI, data, and the physical world.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Link
              href="/contact"
              className="inline-flex h-10 items-center gap-2 rounded-full bg-[var(--color-text-0)] px-4 text-sm font-medium text-[var(--color-bg-0)] transition hover:opacity-90"
            >
              <Mail className="h-4 w-4" /> Get in touch
            </Link>
            <Link
              href="/resume"
              className="inline-flex h-10 items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-1)] px-4 text-sm text-[var(--color-text-0)] hover:border-[var(--color-accent)]"
            >
              <FileText className="h-4 w-4" /> Resume
            </Link>
          </div>
        </div>

        <div>
          <div className="mb-4 text-xs uppercase tracking-widest text-[var(--color-text-2)]">Sitemap</div>
          <ul className="space-y-2 text-sm">
            {siteConfig.nav.map((i) => (
              <li key={i.href}>
                <Link
                  href={i.href}
                  className="text-[var(--color-text-1)] transition hover:text-[var(--color-text-0)]"
                >
                  {i.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="mb-4 text-xs uppercase tracking-widest text-[var(--color-text-2)]">Elsewhere</div>
          <ul className="space-y-2 text-sm">
            <li>
              <a href={siteConfig.links.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[var(--color-text-1)] transition hover:text-[var(--color-text-0)]">
                <Github className="h-4 w-4" /> GitHub
              </a>
            </li>
            <li>
              <a href={siteConfig.links.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[var(--color-text-1)] transition hover:text-[var(--color-text-0)]">
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
            </li>
            <li>
              <a href={siteConfig.links.orcid} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[var(--color-text-1)] transition hover:text-[var(--color-text-0)]">
                <FileText className="h-4 w-4" /> ORCID
              </a>
            </li>
            <li>
              <a href={siteConfig.links.email} className="inline-flex items-center gap-2 text-[var(--color-text-1)] transition hover:text-[var(--color-text-0)]">
                <Mail className="h-4 w-4" /> Email
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[var(--color-border)]">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-4 py-6 text-xs text-[var(--color-text-2)] sm:flex-row sm:items-center sm:px-6">
          <div>
            © {new Date().getFullYear()} {siteConfig.fullName}. Built with Next.js &amp; too much caffeine.
          </div>
          <div className="flex items-center gap-4">
            <time
              dateTime={buildTime}
              className="font-mono"
              title="Last deploy"
            >
              deploy · {buildTime.slice(0, 10)}
            </time>
            <SettingsMenu />
          </div>
        </div>
      </div>
    </footer>
  );
}
