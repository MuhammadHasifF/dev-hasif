import type { Metadata } from "next";
import { Section } from "@/components/primitives/section";
import { ProjectsGrid } from "@/components/projects/projects-grid";
import { PageBackground } from "@/components/layout/page-background";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected applied AI, machine learning, data analytics, and full-stack projects by Muhammad Hasif.",
  alternates: { canonical: "/work" },
  openGraph: { url: "/work" },
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
      headingAs="h1"
      intro="Explore six independent projects by category, then open a case study for implementation details and measured outcomes."
    >
      <ProjectsGrid />
    </Section>
    </>
  );
}
