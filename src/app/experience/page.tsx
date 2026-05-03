import type { Metadata } from "next";
import { Section } from "@/components/primitives/section";
import { ExperienceTimeline } from "@/components/sections/experience-timeline";
import { PageBackground } from "@/components/layout/page-background";

export const metadata: Metadata = {
  title: "Experience",
  description: "A full timeline of roles — research engineering, government, cybersecurity, data.",
};

export default function ExperiencePage() {
  return (
    <>
      <PageBackground variant="experience" />
      <Section
        eyebrow="Experience"
        title={<>The full timeline.</>}
        intro="Every role in chronological detail. Expand a card for the highlights and the tech."
      />
      <ExperienceTimeline />
    </>
  );
}
