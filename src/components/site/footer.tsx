import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

import { siteConfig } from "@/site.config";

export function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.name}
          </p>
          <p className="text-xs text-muted-foreground">
            Built with Next.js. Hosted free on Vercel.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={siteConfig.links.github}
            className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-4 py-2 text-sm text-muted-foreground backdrop-blur transition hover:bg-card/60 hover:text-foreground"
            target="_blank"
            rel="noreferrer"
          >
            <Github className="h-4 w-4" />
            GitHub
          </Link>
          <Link
            href={siteConfig.links.linkedin}
            className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-4 py-2 text-sm text-muted-foreground backdrop-blur transition hover:bg-card/60 hover:text-foreground"
            target="_blank"
            rel="noreferrer"
          >
            <Linkedin className="h-4 w-4" />
            LinkedIn
          </Link>
          <Link
            href={siteConfig.links.email}
            className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-4 py-2 text-sm text-muted-foreground backdrop-blur transition hover:bg-card/60 hover:text-foreground"
          >
            <Mail className="h-4 w-4" />
            Email
          </Link>
        </div>
      </div>
    </footer>
  );
}

