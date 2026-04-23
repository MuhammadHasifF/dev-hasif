import type { Metadata } from "next";
import { Section } from "@/components/primitives/section";
import { Feather } from "lucide-react";

export const metadata: Metadata = {
  title: "Writing",
  description: "Notes, essays, and writeups — coming soon.",
};

export default function WritingPage() {
  return (
    <Section eyebrow="Writing" title={<>Notes in progress.</>}>
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-[var(--color-border)] bg-[var(--color-bg-1)]/50 px-6 py-20 text-center">
        <Feather className="h-8 w-8 text-[var(--color-text-2)]" />
        <h2 className="font-display text-2xl text-[var(--color-text-0)]">Nothing published yet</h2>
        <p className="max-w-lg text-sm text-[var(--color-text-1)]">
          I&rsquo;m collecting research notes, experiment logs, and engineering
          writeups. The first essays land here soon. In the meantime, the{" "}
          <a
            href="https://github.com/MuhammadHasifF"
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
  );
}
