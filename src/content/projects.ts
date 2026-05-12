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
      "Real time vessel health monitoring and fault diagnosis platform, full stack app with ETL pipelines and interactive stakeholder dashboards.",
    description:
      "End to end data platform for the SIT Future Ship & System Design (FSSD) research initiative. Python, Flask/Django, Vue/React, Pandas, and Apache ECharts. Raw maritime alarm data is cleaned and streamed via ETL into an analytics layer, then surfaced through interactive dashboards that translate operational alarm streams into stakeholder facing diagnostic insights.",
    year: "2026 to Present",
    org: "Singapore Institute of Technology",
    orgKey: "sit",
    category: "Data",
    tags: ["Maritime", "Time-Series", "Dashboards"],
    stack: ["Python", "Flask", "Django", "Vue.js", "React", "Pandas", "Apache ECharts"],
    impact: [
      "Unified ETL across multi-source alarm + sensor feeds",
      "Fault cascade tooling for engineering root-cause work",
      "Per-vessel + fleet-wide dashboards for operations and crew",
    ],
    featured: true,
    hue: "from-[var(--color-accent)] to-[var(--color-accent-2)]",
  },
  {
    slug: "r3cap",
    title: "R3CAP Digital Twin Platform",
    tagline:
      "Open source near real time 3D reconstruction and collaborative scene authoring tool, with dynamic mesh replacement and semantic segmentation.",
    description:
      "Engineered frontend + backend features for R3CAP at SIT's Centre of Immersification. Python and Babylon.js across scene editing, deletion, and real time mesh replacement. Integrated next generation 3D reconstruction and auto-labelling engines for dynamic mesh updates and semantic segmentation in collaborative WebXR environments. Supported CHI '25 and DIS '26 academic submissions.",
    year: "2025",
    org: "Singapore Institute of Technology",
    orgKey: "sit",
    category: "Research",
    tags: ["3D", "WebXR", "Research"],
    stack: ["Python", "Babylon.js", "WebXR", "GCP", "Auto-Labelling"],
    outcomes: [
      "Backed publications at CHI '25 and DIS '26",
      "Shipped frontend + backend feature set for open-source release",
      "Integrated next-gen 3D reconstruction + auto-labelling engines",
    ],
    links: [
      { label: "GitHub: singaporetech/r3cap", href: "https://github.com/singaporetech/r3cap" },
    ],
    featured: true,
    hue: "from-[var(--color-accent-2)] to-[var(--color-accent-3)]",
  },
  {
    slug: "msig-travel-assistant",
    title: "MSIG Travel Assistant · SingHacks 2025",
    tagline:
      "Ultra low latency conversational AI for travel insurance, RAG over policy data, eligibility aware quoting, itinerary document extraction.",
    description:
      "Conversational AI prototype for MSIG built during SingHacks 2025. Python, Llama 3.3 70B served through Groq for ultra low latency inference, and LangChain driven RAG over policy + destination knowledge bases. Side by side policy comparison across TravelEasy, Pre-Ex, and Scootsurance, plus eligibility aware quoting and itinerary document extraction.",
    year: "2025",
    org: "MSIG · SingHacks",
    orgKey: "msig",
    category: "AI",
    tags: ["GenAI", "RAG", "Hackathon"],
    stack: ["Python", "Llama 3.3 70B", "Groq", "LangChain", "RAG"],
    outcomes: [
      "Shipped end-to-end during SingHacks 2025",
      "Side by side comparison across TravelEasy, Pre-Ex, Scootsurance",
      "Eligibility aware quoting + itinerary document extraction",
    ],
    links: [
      { label: "GitHub: SingHacks2025", href: "https://github.com/MuhammadHasifF/SingHacks2025" },
    ],
    featured: true,
    hue: "from-[var(--color-accent-3)] to-[var(--color-accent)]",
  },
  {
    slug: "ge2025-rpa",
    title: "GE2025 Polling Operations Automation",
    tagline:
      "UiPath RPA + Excel/VBA across 1,900+ polling stations for GE2025, ~30+ analyst hours saved per cycle.",
    description:
      "Designed and deployed UiPath automation and dynamic Excel/VBA tools for backend polling logistics during GE2025 across 1,900+ polling stations. Automated crowd recording and ballot box delivery tracking, eliminating an estimated 30+ analyst hours per polling cycle and processing thousands of operational data points per shift.",
    year: "2025",
    org: "Singapore Police Force",
    orgKey: "spf",
    category: "Government",
    tags: ["RPA", "Automation", "Elections"],
    stack: ["UiPath", "Python", "Excel VBA"],
    impact: [
      "Saved ~30+ analyst hours per polling cycle",
      "Processed thousands of operational data points per shift",
      "Coverage across 1,900+ polling stations",
    ],
    featured: true,
    hue: "from-[var(--color-accent)] to-[var(--color-accent-3)]",
  },
  {
    slug: "m5-forecasting",
    title: "M5 Forecasting Challenge",
    tagline:
      "End to end forecasting pipeline for the Kaggle M5 hierarchical retail sales challenge, ARIMA baseline lifted with XGBoost + LightGBM.",
    description:
      "Major project at Deloitte. Owned end to end forecasting pipeline for the Kaggle M5 hierarchical retail sales challenge, including client proposal, company segmentation research, exploratory data analysis, and benchmarking of statistical and ML approaches to deliver a competitive accuracy forecasting script.",
    year: "2023",
    org: "Deloitte (Major Project)",
    orgKey: "deloitte",
    category: "Data",
    tags: ["Forecasting", "ML", "Kaggle"],
    stack: ["Python", "Jupyter", "ARIMA", "XGBoost", "LightGBM", "Pandas"],
    outcomes: [
      "Hierarchical retail forecasting across product + store splits",
      "Statistical baseline (ARIMA) lifted with gradient boosted trees",
    ],
    links: [
      { label: "GitHub: Major-Project-M5-Accuracy", href: "https://github.com/MuhammadHasifF/Major-Project-M5-Accuracy" },
    ],
    featured: true,
    hue: "from-[var(--color-accent-3)] to-[var(--color-accent-2)]",
  },
  {
    slug: "movement-tracker",
    title: "MBFT Personnel Tracking · HTX × Security Command",
    tagline:
      "Real time geospatial data system, ArcGIS + Python + REST APIs, live ingest, spatial analytics, ops dashboards.",
    description:
      "Co-developed a personnel movement monitoring system with HTX and Security Command using geospatial data. Improved real time visibility and coordination for command staff during high security operations.",
    year: "2024 to 2025",
    org: "HTX × SPF",
    orgKey: "spf",
    category: "Government",
    tags: ["Geospatial", "Real-time"],
    stack: ["ArcGIS", "Python", "REST APIs"],
    impact: [
      "Operational visibility during national-level events",
      "Reduced radio load by surfacing location data on the map",
    ],
    hue: "from-[var(--color-accent-2)] to-[var(--color-accent)]",
  },
  {
    slug: "voteq-platform",
    title: "VoteQ × ArcGIS × CCTV Analytics",
    tagline:
      "Multi-source spatial + computer vision analytics platform, VoteQ + ArcGIS + CCTV feeds + facial recognition.",
    description:
      "Enhanced the VoteQ election operations platform with GovTech by integrating ArcGIS spatial analytics, CCTV analytics, and facial recognition workflows into operational planning. Sharpened real time crowd monitoring and situational awareness ahead of GE2025.",
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
      "ArcGIS based operational dashboards used by command leadership during GE2025 and NDP2025.",
    description:
      "Designed and deployed interactive ArcGIS dashboards merging live operations data with spatial context, used by command leadership to plan, coordinate, and monitor General Election 2025 and National Day Parade 2025.",
    year: "2024 to 2025",
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
      "Python automation that replaced manual SOC reporting, pandas aggregation, scheduled jobs, structured outputs.",
    description:
      "Scripted SOC report and dashboard generation for HTX's Security Operations Centre. Improved operational visibility and accelerated insights delivery during incident response and threat hunting.",
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
    slug: "time-series-forecasting",
    title: "Time-Series Forecasting (Deloitte)",
    tagline:
      "Production forecasting pipeline, ARIMA + gradient-boosted trees, ~12% accuracy lift over baseline ARIMA on client datasets.",
    description:
      "Maritime shipping client engagement at Deloitte. ARIMA enhanced with feature engineering, alongside XGBoost and LightGBM in scikit-learn workflows. Approximately 12% accuracy lift over baseline ARIMA. SQL + Python ETL automation supported model iteration and stakeholder reporting.",
    year: "2022 to 2023",
    org: "Deloitte",
    orgKey: "deloitte",
    category: "Data",
    tags: ["Forecasting", "ML"],
    stack: ["Python", "ARIMA", "XGBoost", "LightGBM", "scikit-learn"],
    outcomes: [
      "~12% accuracy lift over baseline ARIMA on client datasets",
      "Automated ETL + modelling pipeline handed over to client team",
    ],
    hue: "from-[var(--color-accent-3)] to-[var(--color-accent-2)]",
  },
  {
    slug: "papers-by-hasif",
    title: "Papers_By_Hasif · Research Archive",
    tagline: "Public archive of research reading lists, notes, and writeups.",
    description:
      "Public GitHub repository collecting research notes across AI, HCI, and systems. Reading lists, paper summaries, and writeups.",
    year: "Ongoing",
    org: "GitHub",
    orgKey: "github",
    category: "Open Source",
    tags: ["Research", "Writing"],
    stack: ["Markdown", "Git"],
    links: [
      { label: "View on GitHub", href: "https://github.com/MuhammadHasifF" },
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
