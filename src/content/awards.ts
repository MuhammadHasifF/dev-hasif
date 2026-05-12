export type Award = {
  title: string;
  issuer: string;
  year: string;
};

export const awards: Award[] = [
  { title: "Best Operational Fitness", issuer: "Officer Cadet Course", year: "2024" },
  { title: "Vice Chairperson", issuer: "Officer Cadet Course", year: "2024" },
  { title: "Best Trainee", issuer: "Police Basic Course", year: "2023" },
  { title: "Edusave Good Progress Award", issuer: "Ministry of Education", year: "2023" },
  { title: "MUIS Madrasah Award (Secular Subjects)", issuer: "MUIS", year: "2020" },
  { title: "MUIS Madrasah Award (Secular Subjects)", issuer: "MUIS", year: "2017" },
];

/**
 * Leadership / cross-disciplinary roles that complement the awards above.
 * Kept light because the resume groups these alongside awards.
 */
export const leadership = [
  "Vice Chairperson, Officer Cadet Course (2024)",
  "19-day SPF Leadership Development Course (Outward Bound Singapore)",
  "Squad Person In-Charge, Police Basic Course (2023)",
];
