export type Award = {
  title: string;
  issuer: string;
  year: string;
};

export const awards: Award[] = [
  { title: "Best Operational Fitness Award", issuer: "Officer Cadet Course", year: "2024" },
  { title: "Best Trainee Award", issuer: "Police Officer Basic Course", year: "2023" },
  { title: "Best Operational Fitness Award", issuer: "Police Officer Basic Course", year: "2023" },
  { title: "Edusave Good Progress Award", issuer: "Ministry of Education", year: "2023" },
  { title: "MUIS Madrasah Award (Secular Subjects)", issuer: "MUIS", year: "2020" },
  { title: "MUIS Madrasah Award (Secular Subjects)", issuer: "MUIS", year: "2017" },
  { title: "Edusave Certificate of Academic Achievement", issuer: "Ministry of Education", year: "2015" },
];

export const leadership = [
  "Vice Chairperson (Officer Cadet Course)",
  "Squad Person In-Charge (POBC)",
  "Class Treasurer (Polytechnic)",
  "IITSC Subcommittee (Polytechnic)",
  "Executive Student Leader (Secondary)",
  "STEM & Badminton Club (Secondary)",
  "Class Monitor (Primary)",
  "Art Club (Primary)",
];
