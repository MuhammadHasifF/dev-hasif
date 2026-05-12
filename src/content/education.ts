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
    note: "Building research and engineering work on R3CAP and the FSSD maritime platform alongside studies. Contributions support CHI '25 and DIS '26 academic submissions.",
  },
  {
    school: "Temasek Polytechnic",
    orgKey: "temasek-poly",
    credential: "Diploma in Financial Business Informatics",
    start: "04/2020",
    end: "05/2023",
    note: "Capstone: Time-Series Forecasting Techniques Research Project. Edusave Good Progress Award (top 10%). Relevant coursework: Data Mining & Business Analytics, Data Visualisation & Analytics, Data Storytelling, Data Structures & Algorithms, Database Application Development, Computational Thinking, IT Systems Security Essentials, FinTech Innovations, Open Banking App Development, Risk & Governance, Mobile App Development.",
  },
];
