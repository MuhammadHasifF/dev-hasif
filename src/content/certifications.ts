export type Certification = {
  title: string;
  issuer: string;
  orgKey: string;
  date: string;
};

export const certifications: Certification[] = [
  {
    title: "RPA Developers Training Course, UiPath Studio",
    issuer: "SimplifyNext",
    orgKey: "simplifynext",
    date: "2025",
  },
  {
    title: "Senior Officer Course",
    issuer: "Singapore Police Force",
    orgKey: "spf",
    date: "2024",
  },
  {
    title: "Police Basic Course",
    issuer: "Singapore Police Force",
    orgKey: "spf",
    date: "2023",
  },
  {
    title: "CS50: Introduction to Computer Science",
    issuer: "Harvard University (edX)",
    orgKey: "harvard",
    date: "2023",
  },
  {
    title: "Python for Data Science & Machine Learning Bootcamp",
    issuer: "Udemy",
    orgKey: "udemy",
    date: "2023",
  },
  {
    title: "RPA Developer Foundation",
    issuer: "UiPath",
    orgKey: "uipath",
    date: "2022",
  },
];
