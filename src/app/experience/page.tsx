import type { Metadata } from "next";
import { Section } from "@/components/primitives/section";
import { ExperienceTimeline } from "@/components/sections/experience-timeline";

export const metadata: Metadata = {
  title: "Experience",
  description: "A full timeline of roles — research engineering, government, cybersecurity, data.",
};

export default function ExperiencePage() {
  return (
    <>
      <Section
        eyebrow="Experience"
        title={<>The full timeline.</>}
        intro="Every role in chronological detail. Expand a card for the highlights and the tech."
      />
      <ExperienceTimeline />
    </>
  );
}
