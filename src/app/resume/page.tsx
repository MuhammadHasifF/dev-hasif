import type { Metadata } from "next";
import { Section } from "@/components/primitives/section";
import { Download, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Resume",
  description: "Download my latest resume as PDF.",
};

export default function ResumePage() {
  return (
    <Section
      eyebrow="Resume"
      title={<>Condensed into<br/>a single page.</>}
      intro="The PDF version. Drop your copy in /public/resume.pdf — it'll render here and be available for download."
    >
      <div className="flex flex-wrap items-center gap-3">
        <a
          href="/resume.pdf"
          download
          className="inline-flex h-11 items-center gap-2 rounded-full bg-[var(--color-text-0)] px-5 text-sm font-medium text-[var(--color-bg-0)] hover:opacity-90"
        >
          <Download className="h-4 w-4" /> Download PDF
        </a>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-11 items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-1)] px-5 text-sm text-[var(--color-text-0)] hover:border-[var(--color-accent)]"
        >
          <FileText className="h-4 w-4" /> Open in new tab
        </a>
      </div>
      <div className="mt-8 overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-1)]">
        <object
          data="/resume.pdf"
          type="application/pdf"
          className="h-[80vh] w-full"
          aria-label="Resume PDF"
        >
          <div className="flex h-80 flex-col items-center justify-center gap-3 p-6 text-center">
            <FileText className="h-8 w-8 text-[var(--color-text-2)]" />
            <p className="text-sm text-[var(--color-text-1)]">
              No PDF preview available. Drop your resume at{" "}
              <code className="font-mono text-[var(--color-text-0)]">/public/resume.pdf</code> and it
              will render here.
            </p>
          </div>
        </object>
      </div>
    </Section>
  );
}
