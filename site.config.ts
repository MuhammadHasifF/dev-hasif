export const siteConfig = {
  name: "Muhammad Hasif",
  fullName: "Muhammad Hasif Bin Mohd Faisal",
  shortName: "Hasif",
  title: "Hasif · Applied AI Undergrad & Full-Stack Engineer",
  description:
    "Applied AI undergrad and full-stack engineer shipping data products, ML pipelines, and analytics platforms, from raw telemetry to production dashboards.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://hasif.dev",
  ogImage: "/og.png",
  tagline:
    "Applied AI undergrad & full-stack engineer shipping data products, ML pipelines, and analytics platforms, from raw telemetry to production dashboards.",
  taglineAlt:
    "Building data and AI systems end-to-end, from ingestion and modeling through APIs, dashboards, and the people who actually use them.",
  location: "Singapore 400412",
  email: "muhammad.hasif.faisal@gmail.com",
  phone: "+65 8896 6503",
  resume: "/resume.pdf",
  links: {
    github: "https://github.com/MuhammadHasifF",
    linkedin:
      "https://www.linkedin.com/in/muhammad-hasif-bin-mohd-faisal-605618237/",
    orcid: "https://orcid.org/0009-0001-0939-6369",
    email: "mailto:muhammad.hasif.faisal@gmail.com",
  },
  nav: [
    { label: "About", href: "/#about" },
    { label: "Experience", href: "/#experience" },
    { label: "Work", href: "/#work" },
    { label: "Skills", href: "/#skills" },
    { label: "Credentials", href: "/#credentials" },
    { label: "Resume", href: "/resume" },
    { label: "Contact", href: "/#contact" },
  ],
  github: {
    username: "MuhammadHasifF",
  },
} as const;

export type SiteConfig = typeof siteConfig;
