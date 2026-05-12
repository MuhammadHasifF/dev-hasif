export const siteConfig = {
  name: "Muhammad Hasif",
  fullName: "Muhammad Hasif Bin Mohd Faisal",
  shortName: "Hasif",
  title: "Hasif · Applied AI Undergrad & Full-Stack Engineer",
  description:
    "Applied AI undergraduate (SIT, Hons., expected 2028) building production grade machine learning, LLM, and data systems. Generative AI (Llama 3.3, Groq, LangChain, RAG), time-series forecasting (ARIMA, XGBoost, LightGBM), full stack data platforms (Python, Flask/Django, Vue/React, Pandas, Apache ECharts), and geospatial analytics (ArcGIS) across Deloitte, HTX, Singapore Police Force, MOM, and SIT research labs.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://hasif.dev",
  ogImage: "/og.png",
  tagline:
    "Applied AI undergraduate building production grade machine learning, LLM, and full stack data systems. Shipping across Deloitte, HTX, SPF, MOM, and SIT research labs.",
  taglineAlt:
    "Generative AI (Llama 3.3, Groq, LangChain, RAG), time-series forecasting (ARIMA, XGBoost, LightGBM), full stack data platforms (Python, Flask/Django, Vue/React, Pandas, Apache ECharts), and geospatial analytics (ArcGIS).",
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
