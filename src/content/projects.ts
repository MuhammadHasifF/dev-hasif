export type ProjectCategory =
  | "Research"
  | "Government"
  | "Cybersecurity"
  | "Data"
  | "AI"
  | "Open Source";

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  year: string;
  org: string;
  orgKey: string;
  category: ProjectCategory;
  tags: string[];
  stack: string[];
  impact?: string[];
  outcomes?: string[];
  links?: { label: string; href: string }[];
  featured?: boolean;
  hue?: string;
};

export const projects: Project[] = [
  {
    slug: "fssd-maritime",
    title: "FSSD Maritime Data Platform",
    tagline:
      "End-to-end data platform — Python ETL of raw alarm telemetry, fault-diagnosis ML, and an Apache ECharts dashboard layer.",
    description:
      "Maritime analytics platform turning raw alarm + sensor telemetry into actionable fleet-engineering insight. Python ETL pipelines feed Apache ECharts dashboards in Vue.js, with Flask/Django services exposing fleet-wide and per-vessel views to a React front-end. Built end-to-end on the SIT FSSD project.",
    year: "2026 → present",
    org: "Singapore Institute of Technology",
    orgKey: "sit",
    category: "Data",
    tags: ["Maritime", "Time-Series", "Dashboards"],
    stack: ["Python", "Pandas", "Flask", "Django", "Vue.js", "React", "Apache ECharts"],
    impact: [
      "Unified ETL across multi-source alarm + sensor feeds",
      "Fault-cascade correlation tooling for engineering root-cause work",
      "Per-vessel + fleet-wide dashboards for operations and crew",
    ],
    featured: true,
    hue: "from-[var(--color-accent)] to-[var(--color-accent-2)]",
  },
  {
    slug: "r3cap",
    title: "R3CAP · Real-time 3D Reconstruction",
    tagline:
      "Full-stack 3D web platform — Babylon.js front-end, Python back-end, GCP services. Progressive reconstruction + real-time mesh updates.",
    description:
      "Agile work extending R3CAP (formerly demoConstruct) at SIT's Centre of Immersification. Progressive 3D reconstruction, WebXR rendering, real-time mesh replacement, cloud sync, and integration of next-gen reconstruction + segmentation engines (auto-labeling).",
    year: "2025",
    org: "Singapore Institute of Technology",
    orgKey: "sit",
    category: "Research",
    tags: ["3D", "WebXR", "Research"],
    stack: ["Python", "Babylon.js", "WebXR", "GCP"],
    outcomes: [
      "Backed publications at CHI '25 and DIS '26",
      "Shipped frontend + backend feature set for open-source release",
      "Integrated next-gen 3D reconstruction + segmentation engines",
    ],
    featured: true,
    hue: "from-[var(--color-accent-2)] to-[var(--color-accent-3)]",
  },
  {
    slug: "msig-travel-assistant",
    title: "MSIG Travel Assistant · SingHacks 2025",
    tagline:
      "Production-grade LLM application — RAG pipeline, agentic workflow, Llama 3.3 + Groq + LangChain, end-to-end in 48 hours.",
    description:
      "GenAI assistant for MSIG combining a Llama 3.3 + Groq inference stack with LangChain-driven RAG over policy + destination knowledge bases. Conversational interface to plan trips, surface insurance fit, and answer policy questions in real time. Shipped end-to-end during SingHacks 2025.",
    year: "2025",
    org: "MSIG · SingHacks",
    orgKey: "github",
    category: "AI",
    tags: ["GenAI", "RAG", "Hackathon"],
    stack: ["Llama 3.3", "Groq", "LangChain", "Python", "Next.js", "Supabase"],
    outcomes: [
      "Shipped end-to-end during SingHacks 2025",
      "RAG retrieval over policy + destination knowledge bases",
    ],
    featured: true,
    hue: "from-[var(--color-accent-3)] to-[var(--color-accent)]",
  },
  {
    slug: "ge2025-rpa",
    title: "GE2025 Polling Operations Automation",
    tagline:
      "Data automation pipeline — Python + UiPath + Excel VBA across 1,900+ sites; saved ~30+ analyst hours per cycle.",
    description:
      "Designed and deployed UiPath automation for backend polling logistics during GE2025 across 1,900+ polling stations. Replaced repetitive manual workflows and standardized reporting for SPF operations.",
    year: "2025",
    org: "Singapore Police Force",
    orgKey: "spf",
    category: "Government",
    tags: ["RPA", "Automation", "Elections"],
    stack: ["UiPath", "Python", "Excel VBA"],
    impact: [
      "Saved ~30+ analyst hours per polling cycle",
      "Standardised reporting into a single dashboard",
      "Coverage across 1,900+ polling stations",
    ],
    featured: true,
    hue: "from-[var(--color-accent)] to-[var(--color-accent-3)]",
  },
  {
    slug: "movement-tracker",
    title: "MBFT Personnel Tracking · HTX × Security Command",
    tagline:
      "Real-time geospatial data system — ArcGIS + Python + REST APIs; live ingest, spatial analytics, ops dashboards.",
    description:
      "Co-developed a personnel movement monitoring system with HTX and Security Command using geospatial data. Improved real-time visibility and coordination for command staff during high-security operations.",
    year: "2024 → 2025",
    org: "HTX × SPF",
    orgKey: "spf",
    category: "Government",
    tags: ["Geospatial", "Real-time"],
    stack: ["ArcGIS", "Python", "REST APIs"],
    impact: [
      "Operational visibility during national-level events",
      "Reduced radio load by surfacing location data on the map",
    ],
    featured: true,
    hue: "from-[var(--color-accent-2)] to-[var(--color-accent)]",
  },
  {
    slug: "voteq-platform",
    title: "VoteQ × ArcGIS × CCTV Analytics",
    tagline:
      "Multi-source spatial + computer-vision analytics platform — VoteQ, ArcGIS, CCTV feeds, facial recognition, all integrated.",
    description:
      "Worked alongside GovTech to integrate ArcGIS-based spatial analytics, CCTV analytics, and facial recognition into the VoteQ platform. Sharpened crowd monitoring and resource allocation ahead of GE2025.",
    year: "2025",
    org: "GovTech × SPF",
    orgKey: "spf",
    category: "Government",
    tags: ["Gov", "Geospatial", "Vision"],
    stack: ["ArcGIS", "CCTV Analytics", "Facial Recognition"],
    hue: "from-[var(--color-accent)] to-[var(--color-text-1)]",
  },
  {
    slug: "geospatial-dashboards",
    title: "Geospatial Operations Dashboards",
    tagline:
      "Geospatial BI dashboards — ArcGIS + Power BI; layered map views surfacing deployment data to command leadership.",
    description:
      "Designed and deployed interactive ArcGIS dashboards merging live operations data with spatial context. Used by leadership to enhance situational awareness during national events.",
    year: "2024 → 2025",
    org: "Singapore Police Force",
    orgKey: "spf",
    category: "Government",
    tags: ["Geospatial", "BI"],
    stack: ["ArcGIS", "Power BI"],
    hue: "from-[var(--color-accent)] to-[var(--color-accent-3)]",
  },
  {
    slug: "soc-automation",
    title: "SOC Automation & Reporting",
    tagline:
      "Internal data tooling — Python automation replacing manual SOC reporting; pandas aggregation, scheduled jobs, structured outputs.",
    description:
      "Scripted SOC report and dashboard generation for HTX's Security Operations Center. Improved operational visibility and accelerated insights delivery during incident response and threat hunting.",
    year: "2024",
    org: "HTX",
    orgKey: "htx",
    category: "Cybersecurity",
    tags: ["SOC", "Automation"],
    stack: ["Python", "SIEM", "Pandas"],
    impact: [
      "Automated SOC reporting pipeline",
      "Supported incident response, DFIR, and proactive threat hunting",
    ],
    hue: "from-[var(--color-accent-2)] to-[var(--color-accent-3)]",
  },
  {
    slug: "m5-forecasting",
    title: "M5 Forecasting Challenge",
    tagline:
      "Hierarchical demand forecasting on the M5 dataset — Python, ARIMA, XGBoost, LightGBM. Classic ML pipeline, end-to-end.",
    description:
      "Personal modelling project on the M5 retail forecasting dataset. ARIMA baseline lifted with gradient-boosted trees (XGBoost, LightGBM) and tuned with cross-validation across hierarchical product + store splits.",
    year: "2023",
    org: "Personal",
    orgKey: "github",
    category: "Data",
    tags: ["Forecasting", "ML"],
    stack: ["Python", "ARIMA", "XGBoost", "LightGBM", "scikit-learn"],
    hue: "from-[var(--color-accent-3)] to-[var(--color-accent-2)]",
  },
  {
    slug: "time-series-forecasting",
    title: "Time-Series Forecasting (ARIMA + Boosting)",
    tagline:
      "Production forecasting pipeline — ARIMA + gradient-boosted trees; ~12% lift over baseline; deployed for client decision support.",
    description:
      "Built during my Deloitte engagement on a maritime shipping client and grounded in my Temasek Polytechnic capstone. ARIMA enhanced with feature engineering, alongside XGBoost/LightGBM in scikit-learn workflows. ETL automation, hyperparameter search, and cross-validation backed end-to-end model handover. Achieved ~12% accuracy lift over the baseline ARIMA.",
    year: "2022 → 2023",
    org: "Deloitte",
    orgKey: "deloitte",
    category: "Data",
    tags: ["Forecasting", "ML"],
    stack: ["Python", "ARIMA", "XGBoost", "LightGBM", "scikit-learn"],
    outcomes: [
      "~12% accuracy lift over baseline ARIMA",
      "Automated ETL + modelling pipeline handed over to client team",
    ],
    hue: "from-[var(--color-accent-3)] to-[var(--color-accent-2)]",
  },
  {
    slug: "papers-by-hasif",
    title: "Papers_By_Hasif · Research Archive",
    tagline: "Public archive of research reading lists, notes, and writeups.",
    description:
      "A public GitHub repository where I collect research I care about: reading lists, notes, and writeups across AI, HCI, and systems.",
    year: "Ongoing",
    org: "GitHub",
    orgKey: "github",
    category: "Open Source",
    tags: ["Research", "Writing"],
    stack: ["Markdown", "Git"],
    links: [
      {
        label: "View on GitHub",
        href: "https://github.com/MuhammadHasifF",
      },
    ],
    hue: "from-[var(--color-text-1)] to-[var(--color-accent)]",
  },
];

export const projectCategories: (ProjectCategory | "All")[] = [
  "All",
  "Research",
  "AI",
  "Government",
  "Cybersecurity",
  "Data",
  "Open Source",
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
