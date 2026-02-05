import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button, ButtonLink } from "@/components/ui/button";
import { siteConfig } from "@/site.config";

export default function ContactPage() {
  const formId = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID;
  const formAction = formId ? `https://formspree.io/f/${formId}` : null;

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-14 sm:py-16">
      <div className="space-y-3">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Contact
        </h1>
        <p className="text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
          Tell me what you’re building (or hiring for). I’ll reply with next
          steps, timelines, and a crisp plan.
        </p>
      </div>

      <div className="mt-10 grid gap-4">
        <div className="rounded-3xl border border-border/60 bg-card/30 p-8 shadow-sm backdrop-blur">
          <h2 className="text-lg font-semibold tracking-tight">Message</h2>

          {formAction ? (
            <form className="mt-5 space-y-3" action={formAction} method="POST">
              <input type="hidden" name="_subject" value="Portfolio contact" />

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-2">
                  <label
                    className="text-xs font-medium text-muted-foreground"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    autoComplete="name"
                    required
                    className="h-11 w-full rounded-2xl border border-border/60 bg-background/40 px-3 text-sm text-foreground shadow-sm outline-none backdrop-blur placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring/60"
                    placeholder="Your name"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    className="text-xs font-medium text-muted-foreground"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    required
                    className="h-11 w-full rounded-2xl border border-border/60 bg-background/40 px-3 text-sm text-foreground shadow-sm outline-none backdrop-blur placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring/60"
                    placeholder="you@email.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  className="text-xs font-medium text-muted-foreground"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  className="w-full resize-none rounded-2xl border border-border/60 bg-background/40 px-3 py-3 text-sm text-foreground shadow-sm outline-none backdrop-blur placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring/60"
                  placeholder="What are you building? What outcome do you want? What's the timeline?"
                />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Button type="submit" size="lg">
                  Send message <ArrowRight className="h-4 w-4" />
                </Button>
                <p className="text-xs text-muted-foreground">
                  Powered by Formspree (free tier).
                </p>
              </div>
            </form>
          ) : (
            <div className="mt-5 rounded-3xl border border-border/60 bg-card/40 p-6 text-sm text-muted-foreground shadow-sm backdrop-blur">
              <p className="text-foreground">Form not configured yet.</p>
              <p className="mt-2">
                Set <code>NEXT_PUBLIC_FORMSPREE_FORM_ID</code> to enable the free
                contact form. For now, use the quick links below.
              </p>
            </div>
          )}
        </div>

        <div className="rounded-3xl border border-border/60 bg-card/30 p-8 shadow-sm backdrop-blur">
          <h2 className="text-lg font-semibold tracking-tight">Quick links</h2>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <ButtonLink
              href={siteConfig.links.email}
              variant="secondary"
              size="lg"
            >
              Email <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink
              href={siteConfig.links.linkedin}
              variant="outline"
              size="lg"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            Meanwhile, browse{" "}
            <Link
              href="/projects"
              className="text-foreground underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground/60"
            >
              projects
            </Link>{" "}
            and{" "}
            <Link
              href="/case-studies"
              className="text-foreground underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground/60"
            >
              case studies
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
