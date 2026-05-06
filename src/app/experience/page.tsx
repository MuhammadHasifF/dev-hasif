import type { Metadata } from "next";
import { Section } from "@/components/primitives/section";
import { ExperienceTimeline } from "@/components/sections/experience-timeline";
import { PageBackground } from "@/components/layout/page-background";

export const metadata: Metadata = {
  title: "Experience",
  description: "A full timeline of roles across research engineering, government, cybersecurity, and data.",
};

export default function ExperiencePage() {
  return (
    <>
      <PageBackground variant="experience" />
      <Section
        eyebrow="EXPERIENCE"
        index={1}
        total={1}
        stamp="// TIMELINE"
        title={["The full timeline."]}
        intro="Every role in chronological detail. Expand a card for the highlights and the tech."
      />
      <ExperienceTimeline />
    </>
  );
}
