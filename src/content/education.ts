export type Education = {
  school: string;
  orgKey: string;
  credential: string;
  field?: string;
  start?: string;
  end: string;
  note?: string;
};

export const education: Education[] = [
  {
    school: "Singapore Institute of Technology",
    orgKey: "sit",
    credential: "Bachelor of Science with Honours, Applied Artificial Intelligence",
    start: "08/2025",
    end: "Expected 09/2028",
    note: "Current undergraduate studies in applied AI, machine learning, data engineering, software development, and responsible AI practice.",
  },
  {
    school: "Temasek Polytechnic",
    orgKey: "temasek-poly",
    credential: "Diploma in Financial Business Informatics",
    start: "04/2020",
    end: "05/2023",
    note: "Relevant coursework included data mining and business analytics, data visualisation, data structures and algorithms, database development, systems security, FinTech, and risk and governance. Completed an individual M5 forecasting capstone supervised by Deloitte.",
  },
];
