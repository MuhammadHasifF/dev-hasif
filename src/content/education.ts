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
    credential: "BSc (Honours), Applied Artificial Intelligence",
    start: "08/2025",
    end: "Expected 09/2028",
    note: "Research engineering on R3CAP and the FSSD maritime project alongside studies. Backed publications at CHI '25 and DIS '26.",
  },
  {
    school: "Temasek Polytechnic",
    orgKey: "temasek-poly",
    credential: "Diploma, Financial Business Informatics",
    start: "04/2020",
    end: "05/2023",
    note: "Major project: Time-Series Forecasting Techniques (Research Project). Carried into the Deloitte engagement.",
  },
  {
    school: "Al-Arabiah Institution",
    orgKey: "al-arabiah",
    credential: "GCE 'O' Levels",
    end: "04/2019",
    note: "Distinction in Mathematics; Triple Pure Science + Additional Mathematics.",
  },
  {
    school: "Eunos Primary School",
    orgKey: "eunos-primary",
    credential: "PSLE",
    end: "12/2015",
    note: "T-Score 235.",
  },
];
