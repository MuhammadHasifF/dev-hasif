export type ProjectLinkSet = {
  live?: string;
  repo?: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  year: number;
  tags: string[];
  featured?: boolean;
  caseStudySlug?: string;
  links?: ProjectLinkSet;
};

export const projects: Project[] = [
  {
    id: "portfolio-system",
    title: "Portfolio System",
    description:
      "A scroll-driven, dark UI portfolio with projects, MDX case studies, and a time-based timeline.",
    year: 2026,
    tags: ["Next.js", "Tailwind", "Framer Motion", "MDX"],
    featured: true,
    caseStudySlug: "portfolio-system",
    links: {
      live: "https://example.com",
      repo: "https://github.com/",
    },
  },
  {
    id: "study-planner",
    title: "Study Planner Timeline",
    description:
      "A timeline-first planner that turns modules, goals, and deadlines into an interactive story.",
    year: 2025,
    tags: ["UX", "Data Viz", "React"],
    featured: true,
    caseStudySlug: "study-planner-timeline",
  },
  {
    id: "ui-experiments",
    title: "Product UI Experiments",
    description:
      "Micro-interactions, transitions, and component experiments with strict performance budgets.",
    year: 2025,
    tags: ["Motion", "Design", "Performance"],
    featured: true,
  },
  {
    id: "school-project-01",
    title: "School Project — App Prototype",
    description:
      "A structured build focusing on requirements, implementation, and clean UI deliverables.",
    year: 2024,
    tags: ["School", "Frontend", "Documentation"],
  },
] as const;

