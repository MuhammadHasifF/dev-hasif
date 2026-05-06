import { Hero } from "@/components/hero/hero";
import { JsonLd } from "@/components/seo/json-ld";
import { Marquee } from "@/components/sections/marquee";
import { StatsStrip } from "@/components/sections/stats-strip";
import { ManifestoScroll } from "@/components/sections/manifesto-scroll";
import { AboutTeaser } from "@/components/sections/about-teaser";
import { ProjectsBento } from "@/components/sections/projects-bento";
import { FeaturedRail } from "@/components/sections/featured-rail";
import { ExperienceTimeline } from "@/components/sections/experience-timeline";
import { SkillsConstellation } from "@/components/sections/skills-constellation";
import { CertificationsAwards } from "@/components/sections/certifications";
import { GitHubActivity } from "@/components/sections/github-activity";
import { ContactInline } from "@/components/sections/contact-inline";
import { PageBackground } from "@/components/layout/page-background";

export default function HomePage() {
  return (
    <>
      <PageBackground variant="home" />
      <JsonLd />
      <Hero />
      <ManifestoScroll />
      <Marquee />
      <StatsStrip />
      <AboutTeaser />
      <FeaturedRail />
      <ProjectsBento />
      <ExperienceTimeline />
      <SkillsConstellation />
      <CertificationsAwards />
      <GitHubActivity />
      <ContactInline />
    </>
  );
}
