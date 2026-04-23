export type SkillGroup = {
  id: string;
  label: string;
  hue: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "data",
    label: "Data & Analytics",
    hue: "var(--color-accent)",
    items: [
      "Python (pandas, NumPy)",
      "SQL (PostgreSQL, BigQuery)",
      "Data Cleaning",
      "EDA",
      "ETL Pipelines",
      "Time-Series Forecasting",
      "Feature Engineering",
      "Predictive Modeling",
      "Model Evaluation",
      "Cross-Validation",
      "scikit-learn",
      "XGBoost",
      "LightGBM",
    ],
  },
  {
    id: "engineering",
    label: "Data Engineering & Systems",
    hue: "var(--color-accent-2)",
    items: [
      "RESTful APIs",
      "Backend Services",
      "Real-Time Processing",
      "Data Pipelines",
      "UiPath Automation",
      "Google Cloud Platform",
      "System Integration",
      "Data Validation",
      "Security & Governance",
    ],
  },
  {
    id: "viz",
    label: "Visualization & Decision Support",
    hue: "var(--color-accent-3)",
    items: [
      "Power BI",
      "Tableau",
      "ArcGIS",
      "Geospatial Analytics",
      "Interactive Dashboards",
      "Stakeholder Reporting",
    ],
  },
  {
    id: "tools",
    label: "Software & Tools",
    hue: "var(--color-accent)",
    items: [
      "Git",
      "Python",
      "Excel (VBA)",
      "KNIME",
      "WebXR",
      "Babylon.js",
      "Linux / Unix",
    ],
  },
  {
    id: "professional",
    label: "Professional",
    hue: "var(--color-text-1)",
    items: [
      "Agile / Sprint-Based Dev",
      "Cross-Functional Collaboration",
      "Technical Documentation",
      "Requirements Translation",
      "Structured Problem-Solving",
      "Clear Technical Communication",
      "High-Pressure Adaptability",
    ],
  },
];
