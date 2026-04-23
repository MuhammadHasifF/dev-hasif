import { Hero } from "@/components/hero/hero";
import { Marquee } from "@/components/sections/marquee";
import { AboutTeaser } from "@/components/sections/about-teaser";
import { ProjectsBento } from "@/components/sections/projects-bento";
import { ExperienceTimeline } from "@/components/sections/experience-timeline";
import { SkillsConstellation } from "@/components/sections/skills-constellation";
import { CertificationsAwards } from "@/components/sections/certifications";
import { GitHubActivity } from "@/components/sections/github-activity";
import { ContactInline } from "@/components/sections/contact-inline";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <AboutTeaser />
      <ProjectsBento />
      <ExperienceTimeline />
      <SkillsConstellation />
      <CertificationsAwards />
      <GitHubActivity />
      <ContactInline />
    </>
  );
}
