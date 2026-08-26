import type { Metadata } from "next";
import { Section } from "@/components/primitives/section";
import { Feather } from "lucide-react";
import { PageBackground } from "@/components/layout/page-background";

export const metadata: Metadata = {
  title: "Writing",
  description: "Research notes, reading summaries, and technical writeups by Muhammad Hasif.",
  alternates: { canonical: "/writing" },
  openGraph: { url: "/writing" },
};

export default function WritingPage() {
  return (
    <>
    <PageBackground variant="writing" />
    <Section
      eyebrow="WRITING"
      index={1}
      total={1}
      stamp="// DRAFTS"
      title={["Notes in progress."]}
      headingAs="h1"
    >
      <div className="hud-panel flex flex-col items-center gap-4 px-6 py-20 text-center">
        <Feather className="h-8 w-8 text-[var(--color-text-2)]" />
        <h2 className="font-display text-2xl text-[var(--color-text-0)]">Public notes on GitHub</h2>
        <p className="max-w-lg text-sm text-[var(--color-text-1)]">
          Longer essays are still being edited. In the meantime, research notes,
          reading summaries, and working writeups live in the{" "}
          <a
            href="https://github.com/MuhammadHasifF/Papers_By_Hasif"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4 hover:text-[var(--color-accent)]"
          >
            Papers_By_Hasif
          </a>{" "}
          archive is the closest thing.
        </p>
      </div>
    </Section>
    </>
  );
}
