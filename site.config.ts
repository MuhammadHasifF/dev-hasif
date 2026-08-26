export const siteConfig = {
  name: "Muhammad Hasif",
  fullName: "Muhammad Hasif Bin Mohd Faisal",
  shortName: "Hasif",
  title: "Muhammad Hasif · Applied AI & Data Portfolio",
  description:
    "Applied AI undergraduate and research developer building data pipelines, evaluated ML models, LLM applications, and full-stack systems in Singapore.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://devhasif.vercel.app",
  ogImage: "/api/og",
  tagline:
    "Applied AI undergraduate and research developer turning complex data into reliable pipelines, evaluated models, and useful AI-enabled products.",
  taglineAlt:
    "Hands-on experience across maritime analytics, machine learning, LLM applications, full-stack engineering, 3D research systems, automation, and cybersecurity operations.",
  location: "Singapore",
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
