export const siteConfig = {
  name: "Muhammad Hasif",
  fullName: "Muhammad Hasif Bin Mohd Faisal",
  shortName: "Hasif",
  title: "Hasif — Research Engineer & AI Undergrad",
  description:
    "Research engineer & AI undergrad building systems that move between people, data, and the physical world. Secure, scalable, data-informed solutions.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://hasif.dev",
  ogImage: "/og.png",
  tagline:
    "Research engineer & AI undergrad building systems that move between people, data, and the physical world.",
  taglineAlt:
    "Analytically driven, technically versatile — shipping secure, scalable, data-informed systems.",
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
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Experience", href: "/experience" },
    { label: "Resume", href: "/resume" },
    { label: "Contact", href: "/contact" },
  ],
  github: {
    username: "MuhammadHasifF",
  },
} as const;

export type SiteConfig = typeof siteConfig;
