import type { Metadata } from "next";
import { Section } from "@/components/primitives/section";
import { Download, FileText } from "lucide-react";
import { PageBackground } from "@/components/layout/page-background";

export const metadata: Metadata = {
  title: "Resume",
  description: "Download my latest resume as PDF.",
};

export default function ResumePage() {
  return (
    <>
    <PageBackground variant="resume" />
    <Section
      eyebrow="RESUME"
      index={1}
      total={1}
      stamp="// PDF"
      title={["Condensed into", "a single page."]}
      intro="The PDF version. Drop your copy in /public/resume.pdf and it'll render here, ready for download."
    >
      <div className="flex flex-wrap items-center gap-3">
        <a
          href="/resume.pdf"
          download
          className="inline-flex h-11 items-center gap-2 rounded-sm border border-[var(--color-accent)] bg-[var(--color-accent)] px-5 font-mono text-[11px] uppercase tracking-[0.18em] text-black transition-[box-shadow,transform] hover:shadow-[0_0_24px_-4px_var(--color-accent)] active:scale-[0.98]"
        >
          <Download className="h-4 w-4" /> Download PDF
        </a>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-11 items-center gap-2 rounded-sm border border-[var(--color-accent)]/50 bg-[color:color-mix(in_oklab,var(--color-accent)_6%,var(--color-bg-1))] px-5 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-text-0)] transition-[border-color,background-color,box-shadow] hover:border-[var(--color-accent)] hover:bg-[color:color-mix(in_oklab,var(--color-accent)_14%,var(--color-bg-1))] hover:shadow-[0_0_24px_-4px_color-mix(in_oklab,var(--color-accent)_60%,transparent)]"
        >
          <FileText className="h-4 w-4" /> Open in new tab
        </a>
      </div>
      <div className="mt-8 hud-panel overflow-hidden p-0">
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
    </>
  );
}
