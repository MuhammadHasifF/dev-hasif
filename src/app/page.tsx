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
import { HomeBgRamp } from "@/components/layout/home-bg-ramp";
import { HomeHashWatch } from "@/components/layout/home-hash-watch";

export default function HomePage() {
  return (
    <>
      <PageBackground variant="home" />
      <HomeBgRamp />
      <HomeHashWatch />
      <JsonLd />
      <Hero />
      <ManifestoScroll />
      <Marquee />
      <StatsStrip />
      <AboutTeaser />
      <ExperienceTimeline />
      {/* Work, Featured + All Projects merged under one anchor */}
      <div id="work" className="scroll-mt-20">
        <FeaturedRail />
        <ProjectsBento />
      </div>
      <SkillsConstellation />
      <CertificationsAwards />
      <GitHubActivity />
      <ContactInline />
    </>
  );
}
