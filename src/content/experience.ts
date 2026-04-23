export type Role = {
  company: string;
  orgKey: string;
  title: string;
  type: "Full-Time" | "Internship" | "Contract" | "National Service";
  start: string;
  end: string | null;
  location?: string;
  summary: string;
  highlights: string[];
  awards?: string[];
  tech?: string[];
};

export const experience: Role[] = [
  {
    company: "Singapore Institute of Technology",
    orgKey: "sit",
    title: "Research Engineer / Developer (Student)",
    type: "Full-Time",
    start: "09/2024",
    end: "12/2025",
    location: "Singapore",
    summary:
      "Agile research-oriented development team enhancing R3CAP, an open-source platform for near real-time 3D reconstruction and collaborative scene authoring.",
    highlights: [
      "Built major front-end and back-end features in Python and Babylon.js",
      "Integrated next-gen real-time 3D reconstruction + segmentation engines",
      "Contributed to prototypes, experiments, and documentation backing CHI '25 and DIS '26 publications",
      "Worked across WebXR, real-time rendering, and cloud service integration",
    ],
    tech: ["Python", "Babylon.js", "WebXR", "GCP"],
  },
  {
    company: "Singapore Police Force",
    orgKey: "spf",
    title: "Section Leader, Operations Department",
    type: "National Service",
    start: "06/2024",
    end: "08/2025",
    location: "Singapore",
    summary:
      "Officer-level role supporting national operations through data-driven planning, geospatial analytics, and workflow automation across SPF, HTX, and GovTech.",
    highlights: [
      "Co-built the Movement Tracker with HTX for geospatial personnel monitoring",
      "Designed ArcGIS operations dashboards for high-security events",
      "Shipped UiPath RPA automation for GE2025 polling operations",
      "Collaborated with GovTech on VoteQ platform enhancements",
      "Served as Vice-Chairperson of Cadet Councils",
      "Completed the 19-day Outward Bound Singapore expedition",
    ],
    awards: ["Best Operational Fitness (Officer Cadet Course)"],
    tech: ["ArcGIS", "UiPath", "Python"],
  },
  {
    company: "HTX (Home Team Science & Technology Agency)",
    orgKey: "htx",
    title: "Cyber Operations Engineer, HTSOC",
    type: "Full-Time",
    start: "01/2024",
    end: "06/2024",
    location: "Singapore",
    summary:
      "Handpicked into HTX's Cyber Operations team inside a national Security Operations Center.",
    highlights: [
      "Scripted SOC reports and dashboards to replace manual exports",
      "Incident response and digital forensics across live cases",
      "Proactive threat hunting including phishing campaigns",
      "Operational support for HTX TechX Summit and ministerial visits",
      "Served as Squad In-Charge (POBC)",
    ],
    awards: ["Best Operational Fitness", "Best Trainee"],
    tech: ["Python", "SIEM", "DFIR"],
  },
  {
    company: "Ministry of Manpower",
    orgKey: "mom",
    title: "Workforce Data Insights Officer",
    type: "Full-Time",
    start: "04/2023",
    end: "07/2023",
    location: "Singapore",
    summary:
      "Designed and executed surveys, interviews, and outreach campaigns to gather actionable labor-market intelligence under government protocols.",
    highlights: [
      "Ran structured interviews and survey design across employer segments",
      "Synthesised findings into briefing materials for internal stakeholders",
    ],
    tech: ["Survey Design", "Qualitative Research", "Reporting"],
  },
  {
    company: "Deloitte",
    orgKey: "deloitte",
    title: "AI & Data Analytics Consultant (Intern)",
    type: "Internship",
    start: "07/2022",
    end: "02/2023",
    location: "Singapore",
    summary:
      "End-to-end data analytics and ML consulting — proposal development, time-series forecasting, predictive modeling, and ETL automation.",
    highlights: [
      "Built time-series forecasting using ARIMA alongside XGBoost/LightGBM",
      "Owned model evaluation, cross-validation, and handoff documentation",
      "Contributed to proposal decks and client-facing technical writing",
    ],
    tech: ["Python", "ARIMA", "XGBoost", "LightGBM", "scikit-learn"],
  },
  {
    company: "Hitachi",
    orgKey: "hitachi",
    title: "Technical Logistics Coordinator",
    type: "Contract",
    start: "07/2021",
    end: "09/2021",
    location: "Singapore",
    summary:
      "Server hardware inspection, inventory management, IT deployment staging, and hardware QA.",
    highlights: [
      "Managed deployment staging for enterprise hardware batches",
      "Led inventory accuracy and hardware QA workflows",
    ],
    tech: ["Hardware QA", "Inventory Management"],
  },
];
