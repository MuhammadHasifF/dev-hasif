export type Education = {
  school: string;
  orgKey: string;
  credential: string;
  field?: string;
  end: string;
  note?: string;
};

export const education: Education[] = [
  {
    school: "Singapore Institute of Technology",
    orgKey: "sit",
    credential: "BSc (Honours), Applied Artificial Intelligence",
    end: "Expected 02/2028",
    note: "Research engineering alongside studies.",
  },
  {
    school: "Temasek Polytechnic",
    orgKey: "temasek-poly",
    credential: "Diploma, Financial Business Informatics",
    end: "04/2023",
    note: "Major Project: Time-Series Forecasting Techniques (Research Project).",
  },
  {
    school: "Al-Arabiah Institution",
    orgKey: "al-arabiah",
    credential: "GCE 'O' Levels",
    end: "04/2019",
    note: "Distinction in Mathematics; Triple Pure Science + A Math.",
  },
  {
    school: "Eunos Primary School",
    orgKey: "eunos-primary",
    credential: "PSLE",
    end: "12/2015",
    note: "T-Score 235.",
  },
];
