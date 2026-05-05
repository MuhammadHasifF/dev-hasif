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
    start: "06/2024",
    end: "08/2025",
    location: "Singapore",
    summary:
      "Agile research-oriented team enhancing R3CAP, an open-source platform for near real-time 3D reconstruction and collaborative scene authoring (formerly demoConstruct) — progressive 3D reconstruction, WebXR, real-time rendering, and cloud services for accessible digital twin creation.",
    highlights: [
      "Led major front-end and back-end features in Python and Babylon.js — scene editing, object deletion, real-time mesh replacement",
      "Integrated next-gen 3D reconstruction and segmentation engines (progressive reconstruction, auto-labeling) for dynamic model updates",
      "Backed publications at CHI '25 and DIS '26 with prototype enhancements, experimental evaluations, and documentation",
      "Worked across WebXR, real-time rendering, and cloud services for collaborative digital twin authoring",
    ],
    tech: ["Python", "Babylon.js", "WebXR", "GCP", "Three.js"],
  },
  {
    company: "Singapore Police Force",
    orgKey: "spf",
    title: "Section Leader, Operations Department",
    type: "National Service",
    start: "09/2024",
    end: "12/2025",
    location: "Singapore",
    summary:
      "Officer-level role supporting national operations through data-driven planning, geospatial analytics, and workflow automation across SPF, HTX, and GovTech for high-security and large-scale public events.",
    highlights: [
      "Co-developed Movement Tracker with HTX — geospatial personnel monitoring for high-security operations",
      "Designed ArcGIS operations dashboards and map layers for situational awareness during national events",
      "Shipped UiPath RPA for GE2025 polling logistics — cut manual effort across operations",
      "Integrated ArcGIS spatial analytics into GovTech's VoteQ for crowd monitoring + resource allocation",
      "Vice-Chairperson, Cadet Councils — led cohort initiatives and represented cadets to command",
      "Completed 19-day Outward Bound Singapore expedition — leadership and resilience training",
      "Provided live systems + data support for NDP and nationwide readiness drills",
    ],
    awards: ["Best Operational Fitness (Officer Cadet Course)"],
    tech: ["ArcGIS", "UiPath", "Python", "Excel VBA"],
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
      "Handpicked into HTX's Cyber Operations team inside a national Security Operations Center — digital defense, incident response, and high-profile national engagements.",
    highlights: [
      "Scripted SOC reports + dashboards to replace manual exports — accelerated insights delivery",
      "Conducted forensic investigations and coordinated incident-response playbooks",
      "Executed proactive threat hunts, including phishing-campaign remediation",
      "Operational support for HTX TechX Summit and ministerial visits",
      "Squad In-Charge (POBC) — drills, welfare, administrative coordination",
      "Selected for Officer Cadet Course on technical + leadership merit",
    ],
    awards: ["Best Operational Fitness (POBC)", "Best Trainee (POBC)"],
    tech: ["Python", "SIEM", "DFIR", "Pandas"],
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
      "Supported workforce-development initiatives by designing and executing surveys, structured interviews, and outreach campaigns to gather actionable labor-market intelligence under government protocols.",
    highlights: [
      "Built a structured survey + interview protocol for employment trends and stakeholder perspectives",
      "Conducted outbound outreach via phone and email to gather + clarify input",
      "Validated and entered quantitative + qualitative data, holding to government standards",
      "Synthesized findings into briefing reports and presentations for labor-market research",
      "Streamlined data-collection workflows with cross-functional MOM teams",
    ],
    tech: ["Survey Design", "Qualitative Research", "Data Validation"],
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
      "End-to-end data analytics + machine learning consulting — proposal development through model deployment and stakeholder reporting.",
    highlights: [
      "Translated client requirements into analytical roadmaps and proposal artifacts",
      "Optimized ARIMA forecasting with feature engineering + rigorous evaluation",
      "Implemented gradient boosting (XGBoost, LightGBM) within scikit-learn pipelines",
      "Automated SQL + Python ETL across relational sources for rapid model iteration",
      "Tuned models with hyperparameter searches + cross-validation, presented results to clients",
    ],
    tech: ["Python", "ARIMA", "XGBoost", "LightGBM", "scikit-learn", "SQL"],
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
      "Inspected enterprise server hardware, managed inventory records, and coordinated equipment staging for IT deployments.",
    highlights: [
      "Redesigned the server staging workflow with IT + engineering — reduced setup bottlenecks",
      "Inspected + assembled high-performance servers under stringent QA standards",
      "Maintained accurate ERP + supply-chain inventory; ran root-cause analyses on shipment issues",
    ],
    tech: ["Hardware QA", "ERP", "Inventory Management"],
  },
];
