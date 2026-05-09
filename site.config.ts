export const siteConfig = {
  name: "Muhammad Hasif",
  fullName: "Muhammad Hasif Bin Mohd Faisal",
  shortName: "Hasif",
  title: "Hasif · Research Engineer & AI Undergrad",
  description:
    "Analytically driven, technically versatile. Research engineer and Applied AI undergrad shipping data-informed systems across data, cybersecurity, automation, and operational technology.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://hasif.dev",
  ogImage: "/og.png",
  tagline:
    "Research engineer & Applied AI undergrad. Building systems that move between people, data, and the physical world.",
  taglineAlt:
    "Hands-on across data analysis, cybersecurity, automation, and operational technology. Supporting national-level initiatives through real-time data systems, geospatial dashboards, RPA, and predictive modeling.",
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
