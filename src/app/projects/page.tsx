import { projects } from "@/content/projects";
import { ProjectsGrid } from "@/components/site/projects/projects-grid";

export default function ProjectsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:py-16">
      <div className="space-y-3">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Projects
        </h1>
        <p className="max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
          A mix of school, personal, and product-style builds. The grid is the
          index; the case studies are the story.
        </p>
      </div>

      <ProjectsGrid className="mt-10" projects={[...projects]} />
    </div>
  );
}
