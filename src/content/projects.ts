export type ProjectCategory =
  | "Research"
  | "Government"
  | "Cybersecurity"
  | "Data"
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
  hue?: string; // tailwind gradient hint
};

export const projects: Project[] = [
  {
    slug: "r3cap",
    title: "R3CAP — Real-time 3D Reconstruction",
    tagline:
      "Open-source platform for near real-time 3D reconstruction and collaborative scene authoring.",
    description:
      "Agile research-oriented work extending R3CAP (formerly demoConstruct): progressive 3D reconstruction, WebXR rendering, real-time cloud sync, and next-gen reconstruction + segmentation engines.",
    year: "2024 – 2025",
    org: "Singapore Institute of Technology",
    orgKey: "sit",
    category: "Research",
    tags: ["3D", "WebXR", "Research"],
    stack: ["Python", "Babylon.js", "WebXR", "GCP"],
    outcomes: [
      "Contributed to publications at CHI '25 and DIS '26",
      "Shipped frontend + backend feature set for open-source release",
      "Integrated next-gen 3D reconstruction + segmentation engines",
    ],
    featured: true,
    hue: "from-[var(--color-accent)] to-[var(--color-accent-2)]",
  },
  {
    slug: "ge2025-rpa",
    title: "GE2025 Polling Operations Automation",
    tagline:
      "RPA pipeline that cut manual effort across Singapore's 2025 polling operations.",
    description:
      "Designed and deployed UiPath automation for polling workflows across SPF operations, replacing repetitive manual processes during GE2025.",
    year: "2025",
    org: "Singapore Police Force",
    orgKey: "spf",
    category: "Government",
    tags: ["RPA", "Automation", "Elections"],
    stack: ["UiPath", "Python", "Excel VBA"],
    impact: [
      "Reduced manual operational overhead across polling stations",
      "Standardised reporting into a single dashboard",
    ],
    featured: true,
    hue: "from-[var(--color-accent-3)] to-[var(--color-accent)]",
  },
  {
    slug: "movement-tracker",
    title: "Movement Tracker — HTX Collaboration",
    tagline:
      "Real-time geospatial personnel monitoring for high-security operations.",
    description:
      "Co-built a live geospatial tracker with HTX for high-security deployments, integrating real-time feeds with ArcGIS dashboards used by command staff.",
    year: "2024 – 2025",
    org: "HTX × SPF",
    orgKey: "htx",
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
    slug: "geospatial-dashboards",
    title: "Geospatial Operations Dashboards",
    tagline:
      "ArcGIS dashboards surfacing operational state for decision makers.",
    description:
      "Designed ArcGIS dashboards that merged live operations data with spatial context, used by leadership during national events.",
    year: "2024 – 2025",
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
      "Python tooling that freed SOC analysts from repetitive reporting.",
    description:
      "Scripted daily/weekly SOC reports and live dashboards for HTX's Security Operations Center, replacing manual spreadsheet exports.",
    year: "2024",
    org: "HTX",
    orgKey: "htx",
    category: "Cybersecurity",
    tags: ["SOC", "Automation"],
    stack: ["Python", "SIEM", "Pandas"],
    impact: [
      "Automated SOC reporting pipeline",
      "Supported incident response, DFIR, and threat hunting",
    ],
    featured: true,
    hue: "from-[var(--color-accent-2)] to-[var(--color-accent-3)]",
  },
  {
    slug: "papers-by-hasif",
    title: "Papers_By_Hasif — Research Archive",
    tagline: "Public archive of research reading lists, notes, and writeups.",
    description:
      "A public GitHub repository where I collect research I care about — reading lists, notes, and writeups across AI, HCI, and systems.",
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
  {
    slug: "time-series-forecasting",
    title: "Time-Series Forecasting (ARIMA + Boosting)",
    tagline:
      "End-to-end forecasting pipeline blending ARIMA with gradient boosted trees.",
    description:
      "Built during my Deloitte internship — a forecasting workflow mixing classical ARIMA with XGBoost/LightGBM, backed by ETL automation and model evaluation pipelines.",
    year: "2022 – 2023",
    org: "Deloitte",
    orgKey: "deloitte",
    category: "Data",
    tags: ["Forecasting", "ML"],
    stack: ["Python", "ARIMA", "XGBoost", "LightGBM", "scikit-learn"],
    outcomes: [
      "Proposal-to-deploy consulting engagement",
      "Automated ETL + modelling pipeline handed over to client team",
    ],
    hue: "from-[var(--color-accent-3)] to-[var(--color-accent-2)]",
  },
  {
    slug: "voteq-platform",
    title: "VoteQ Platform Enhancement",
    tagline:
      "Collaborated with GovTech to harden the VoteQ operations platform.",
    description:
      "Worked alongside GovTech engineers to refine the VoteQ platform, contributing usability and reliability improvements ahead of GE2025.",
    year: "2025",
    org: "GovTech × SPF",
    orgKey: "govtech",
    category: "Government",
    tags: ["Gov", "Product"],
    stack: ["Web", "REST APIs"],
    hue: "from-[var(--color-accent)] to-[var(--color-text-1)]",
  },
];

export const projectCategories: (ProjectCategory | "All")[] = [
  "All",
  "Research",
  "Government",
  "Cybersecurity",
  "Data",
  "Open Source",
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
