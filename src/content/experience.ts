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
      "Building an end to end data platform that converts raw maritime alarm data into real time vessel health monitoring and fault diagnosis tooling for the Future Ship & System Design (FSSD) research initiative.",
    highlights: [
      "Architecting the full stack fault diagnosis web application in Python, Flask/Django, Vue.js, and React",
      "Engineering Pandas based ETL pipelines that clean, structure, and stream high volume sensor data into the analytics layer",
      "Designing interactive Apache ECharts dashboards that translate operational alarm streams into stakeholder facing diagnostic insights",
      "Accelerating issue triage for maritime engineers by surfacing fault cascades in near real time",
    ],
    tech: ["Python", "Flask", "Django", "Vue.js", "React", "Pandas", "Apache ECharts"],
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
      "Engineered frontend and backend features for R3CAP, an open source platform for near real time 3D reconstruction, collaborative scene authoring, and digital twin creation.",
    highlights: [
      "Built frontend and backend features in Python and Babylon.js across scene editing, deletion, and real time mesh replacement",
      "Integrated next generation 3D reconstruction and auto-labelling engines, enabling dynamic mesh replacement and real time semantic segmentation in collaborative WebXR environments",
      "Contributed to research outputs supporting CHI '25 and DIS '26 academic submissions through prototype development, experimental evaluation, and technical documentation",
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
      "Drove technology projects within the Contingency Planning Division, including the MBFT personnel tracking system jointly developed with HTX and Security Command, and the VIP Security Key Operations System, supporting high security deployments and ArcGIS based dashboards used to plan, coordinate, and monitor General Election 2025 and National Day Parade 2025.",
    highlights: [
      "Co-developed the MBFT personnel tracking system with HTX and Security Command for high security deployments",
      "Built the VIP Security Key Operations System for tracking and auditing high-sensitivity key custody",
      "Developed UiPath RPA scripts and dynamic Excel/VBA tools that automated crowd recording and ballot box delivery tracking across 1,900+ polling stations deployed for GE2025, eliminating an estimated 30+ analyst hours per polling cycle and processing thousands of operational data points per shift",
      "Enhanced the VoteQ election operations platform with GovTech, integrating ArcGIS spatial analytics, CCTV analytics, and facial recognition workflows into operational planning to strengthen real time crowd monitoring and situational awareness",
      "Designed ArcGIS based operational dashboards used by command leadership during GE2025 and NDP2025",
    ],
    awards: ["Best Operational Fitness (Officer Cadet Course)", "Vice Chairperson, Officer Cadet Course"],
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
      "Handpicked from Police National Service to operate within HTX's Security Operations Centre (HTSOC), supporting digital defence, incident response, and high profile national engagements.",
    highlights: [
      "Conducted continuous security monitoring, threat hunting, and incident triage",
      "Led forensic investigations and coordinated response playbooks for rapid threat mitigation and evidence preservation",
      "Developed Python automation scripts for SOC reporting and dashboard generation, accelerating insight delivery for analysts and improving operational visibility across cyber operations",
      "Delivered cybersecurity briefings and live demonstrations during the HTX TechX Summit and ministerial visits, translating complex technical concepts for non technical stakeholders",
    ],
    awards: ["Best Operational Fitness (Police Basic Course)", "Best Trainee (Police Basic Course)"],
    tech: ["Python", "SIEM", "DFIR", "Pandas"],
  },
  {
    company: "Deloitte Consulting",
    orgKey: "deloitte",
    title: "AI & Data Analytics Consultant · Intern",
    type: "Internship",
    start: "07/2022",
    end: "02/2023",
    location: "Hybrid · Singapore",
    summary:
      "Supported end to end consulting engagements for a regional maritime shipping client, spanning proposal development, data validation, time-series forecasting, and predictive model deployment for client facing deliverables.",
    highlights: [
      "Enhanced ARIMA based forecasting models with feature engineering and benchmarked accuracy lifts using gradient boosting (XGBoost, LightGBM) within scikit-learn workflows, improving forecasting accuracy by approximately 12% over baseline ARIMA on client datasets",
      "Wrote SQL queries and Python ETL scripts to clean, validate, and structure relational datasets, accelerating model iteration and analyst productivity across the consulting team",
      "Translated analytical findings into client recommendations and proposal artefacts presented to stakeholders during consulting sprints",
    ],
    tech: ["Python", "ARIMA", "XGBoost", "LightGBM", "scikit-learn", "SQL"],
  },
  {
    company: "Ministry of Manpower",
    orgKey: "mom",
    title: "Workforce Data Insights Officer",
    type: "Full-Time",
    start: "04/2023",
    end: "07/2023",
    location: "Hybrid · Singapore",
    summary:
      "Captured employment trends and stakeholder perspectives in support of workforce-development initiatives, aligned to government data quality standards.",
    highlights: [
      "Designed and rolled out a structured survey and interview framework for employment trends and stakeholder perspectives",
      "Collected, validated, and synthesised quantitative and qualitative workforce data into reports informing labour market research and public sector employment policy",
    ],
    tech: ["Survey Design", "Qualitative Research", "Data Validation"],
  },
];
