import { ScrollTimeIndicator } from "@/components/motion/scroll-time-indicator";
import { TimelineScroller } from "@/components/site/timeline/timeline-scroller";
import { timeline } from "@/content/timeline";

export default function TimelinePage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:py-16">
      <ScrollTimeIndicator />
      <div className="space-y-3">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Timeline
        </h1>
        <p className="max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
          A time-based view of study, projects, and milestones—with a scroll
          indicator that maps your progress to “time”.
        </p>
      </div>

      <TimelineScroller className="mt-10" items={[...timeline]} />
    </div>
  );
}
