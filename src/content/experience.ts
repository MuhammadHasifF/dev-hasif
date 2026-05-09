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
    company: "Singapore Institute of Technology · FSSD Project",
    orgKey: "sit",
    title: "Student Researcher & Web Application Developer",
    type: "Full-Time",
    start: "03/2026",
    end: null,
    location: "Remote · Singapore",
    summary:
      "Maritime data science research on the FSSD (Fleet Safety & System Diagnostics) project. Building a vessel health monitoring + fault diagnosis platform from raw alarm telemetry across a global shipping fleet, with Apache ECharts dashboards for fleet engineers and operations.",
    highlights: [
      "Designed Python ETL pipelines (pandas) ingesting multi-source alarm + sensor telemetry into a unified analytics layer",
      "Engineered fault-diagnosis tooling correlating alarm cascades to mechanical root causes for the engineering team",
      "Built vessel health monitoring dashboards in Vue.js + Apache ECharts so crews can spot drift before failure",
      "Stood up Flask/Django services exposing fleet-wide analytics + per-vessel drilldowns to the React front-end",
      "Worked directly with maritime domain experts to translate operational alarm patterns into model features",
    ],
    tech: ["Python", "Pandas", "Flask", "Django", "Vue.js", "React", "Apache ECharts"],
  },
  {
    company: "Singapore Institute of Technology · Centre of Immersification",
    orgKey: "sit",
    title: "Student Researcher & Software Engineer",
    type: "Full-Time",
    start: "08/2025",
    end: "12/2025",
    location: "Hybrid · Singapore",
    summary:
      "Agile research team enhancing R3CAP (formerly demoConstruct), an open-source platform for near real-time 3D reconstruction and collaborative scene authoring. Progressive 3D reconstruction, WebXR, real-time rendering, and cloud services for accessible digital twin creation.",
    highlights: [
      "Led major frontend + backend features in Python and Babylon.js: scene editing, object deletion, real-time mesh replacement",
      "Integrated next-gen 3D reconstruction + segmentation engines (progressive reconstruction, auto-labeling) for dynamic model updates",
      "Backed publications at CHI '25 and DIS '26 with prototype enhancements, experimental evaluations, and documentation",
      "Worked across WebXR, real-time rendering, and cloud services for collaborative digital twin authoring",
    ],
    tech: ["Python", "Babylon.js", "WebXR", "GCP", "Three.js"],
  },
  {
    company: "Singapore Police Force · Contingency Planning Division",
    orgKey: "spf",
    title: "Section Leader, Operations Department · National Service Inspector",
    type: "National Service",
    start: "11/2024",
    end: "08/2025",
    location: "Hybrid · Singapore",
    summary:
      "Officer-level role driving data-driven planning, geospatial analytics, and workflow automation across SPF, HTX, GovTech, and Security Command. Built dashboards, RPA pipelines, and real-time spatial systems for national operations.",
    highlights: [
      "Co-developed MBFT personnel tracking system with HTX + Security Command, geospatial monitoring for high-security operations",
      "Built the VIP Security Key Operations System for tracking + auditing of high-sensitivity key custody",
      "Shipped UiPath RPA across 1,900+ polling stations for GE2025, saving ~30+ analyst hours per polling cycle",
      "Integrated ArcGIS spatial analytics + CCTV analytics + facial recognition into GovTech's VoteQ for crowd flow + resource allocation",
      "Designed ArcGIS operations dashboards + map layers for situational awareness during national events",
      "Vice-Chairperson, Cadet Councils, led cohort initiatives and represented cadets to command",
      "Completed 19-day Outward Bound Singapore expedition for leadership and resilience training",
    ],
    awards: ["Best Operational Fitness (Officer Cadet Course)"],
    tech: ["ArcGIS", "UiPath", "Python", "Excel VBA", "CCTV Analytics"],
  },
  {
    company: "HTX (Home Team Science & Technology Agency) · HTSOC",
    orgKey: "htx",
    title: "Cyber Security Engineer · National Service",
    type: "National Service",
    start: "01/2024",
    end: "06/2024",
    location: "On-site · Singapore",
    summary:
      "Inside HTX's national SOC, owned automation tooling and data pipelines for incident reporting and threat intel, Python, pandas, scheduled jobs, structured outputs, alongside core SOC analyst duties (DFIR, threat hunting).",
    highlights: [
      "Scripted SOC reports + dashboards to replace manual exports, accelerating insights delivery",
      "Conducted forensic investigations and coordinated incident-response playbooks",
      "Executed proactive threat hunts, including phishing-campaign remediation",
      "Operational support for HTX TechX Summit and ministerial visits",
      "Squad In-Charge (POBC): drills, welfare, administrative coordination",
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
    title: "AI & Data Analytics Consultant · Intern",
    type: "Internship",
    start: "07/2022",
    end: "02/2023",
    location: "Singapore",
    summary:
      "End-to-end AI + data analytics consulting on a maritime shipping client engagement, proposal development through model deployment and stakeholder reporting.",
    highlights: [
      "Translated client requirements into analytical roadmaps and proposal artifacts",
      "Delivered ~12% accuracy lift over a baseline ARIMA forecast through feature engineering + ensembling",
      "Implemented gradient boosting (XGBoost, LightGBM) within scikit-learn pipelines",
      "Automated SQL + Python ETL across relational sources for rapid model iteration",
      "Tuned models with hyperparameter searches + cross-validation, presented results to clients",
    ],
    tech: ["Python", "ARIMA", "XGBoost", "LightGBM", "scikit-learn", "SQL"],
  },
];
