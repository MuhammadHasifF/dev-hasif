import type { Metadata } from "next";
import { Section } from "@/components/primitives/section";
import { ProjectsGrid } from "@/components/projects/projects-grid";
import { PageBackground } from "@/components/layout/page-background";

export const metadata: Metadata = {
  title: "Work",
  description: "Research, government operations, cybersecurity, and data projects.",
};

export default function WorkPage() {
  return (
    <>
    <PageBackground variant="work" />
    <Section
      eyebrow="WORK"
      index={1}
      total={1}
      stamp="// FULL ARCHIVE"
      title={["Every project,", "filtered your way."]}
      intro="Filter by category. Click a card for the full case study."
    >
      <ProjectsGrid />
    </Section>
    </>
  );
}
