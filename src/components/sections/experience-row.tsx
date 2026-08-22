import type { Project } from "@/content/portfolio-schema";

export type ProjectFieldLabels = {
  problem: string;
  ownership: string;
  delivery: string;
  outcome: string;
};

const fields = [
  { key: "problem", labelKey: "problem" },
  { key: "ownership", labelKey: "ownership" },
  { key: "delivery", labelKey: "delivery" },
  { key: "outcome", labelKey: "outcome" },
] as const;

export function ExperienceRow({
  project,
  labels,
  technologiesLabel,
}: {
  project: Project;
  labels: ProjectFieldLabels;
  technologiesLabel: string;
}) {
  return (
    <article
      className="group border-t border-border py-8 transition-colors hover:bg-surface sm:py-10"
      aria-labelledby={`${project.title}-title`}
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(12rem,0.7fr)_minmax(0,1.3fr)] lg:gap-14">
        <div>
          <h3
            id={`${project.title}-title`}
            className="text-2xl font-semibold tracking-tight transition-transform duration-[var(--motion-fast)] group-hover:translate-x-1"
          >
            {project.title}
          </h3>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{project.summary}</p>
        </div>
        <div className="grid gap-7 sm:grid-cols-2">
          {fields.map(({ key, labelKey }) => (
            <div key={key}>
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-accent">
                {labels[labelKey]}
              </p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{project[key]}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-7 flex flex-wrap items-center gap-2 border-t border-border/70 pt-5">
        <span className="mr-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">
          {technologiesLabel}
        </span>
        {project.technologies.map((technology) => (
          <span
            key={technology}
            className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
          >
            {technology}
          </span>
        ))}
      </div>
    </article>
  );
}
