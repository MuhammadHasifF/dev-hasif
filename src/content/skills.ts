export type SkillGroup = {
  id: string;
  label: string;
  hue: string;
  items: string[];
};

/** Skills are limited to tools and methods demonstrated in the work on this site. */
export const skillGroups: SkillGroup[] = [
  {
    id: "programming-data",
    label: "Programming & Data",
    hue: "var(--color-text-0)",
    items: [
      "Python", "SQL", "JavaScript", "TypeScript", "R", "Pandas", "NumPy",
      "ETL Pipelines", "Data Cleaning", "Data Validation", "Relational Data Modelling",
      "Exploratory Data Analysis", "Feature Engineering",
    ],
  },
  {
    id: "ml-analytics",
    label: "Machine Learning & Analytics",
    hue: "var(--color-accent)",
    items: [
      "scikit-learn", "imbalanced-learn", "XGBoost", "LightGBM", "ARIMA / SARIMA",
      "Classification", "Time-Series Forecasting", "SMOTE", "Cross-Validation",
      "Temporal Validation", "Threshold Optimisation", "Precision / Recall / F1",
      "ROC-AUC", "RMSE",
    ],
  },
  {
    id: "applied-ai",
    label: "Applied AI & LLM",
    hue: "var(--color-accent-3)",
    items: [
      "Gemini", "Qwen", "Llama", "LangChain", "Function Calling", "AI Agents",
      "Embeddings", "Semantic Search", "Prompt Engineering", "Source-Grounded Outputs",
      "Document Processing",
    ],
  },
  {
    id: "web-backend",
    label: "Backend, Web & Databases",
    hue: "var(--color-accent-2)",
    items: [
      "Django REST Framework", "FastAPI", "React", "TypeScript", "Vite", "REST APIs",
      "PostgreSQL", "pgvector", "SQL Server", "MongoDB", "OAuth", "JWT",
    ],
  },
  {
    id: "visualisation-automation",
    label: "Visualisation & Automation",
    hue: "var(--color-accent-3)",
    items: [
      "Power BI", "Streamlit", "Plotly", "ArcGIS", "Interactive Dashboards",
      "Excel / VBA", "UiPath RPA", "Workflow Automation", "Data Storytelling",
    ],
  },
  {
    id: "engineering-security",
    label: "Engineering & Security",
    hue: "var(--color-text-1)",
    items: [
      "Git", "Docker", "Pytest", "Technical Documentation", "Stakeholder Collaboration",
      "Google Cloud Platform", "Oracle Cloud", "SIEM", "Threat Hunting", "Incident Response", "Digital Forensics",
    ],
  },
];
