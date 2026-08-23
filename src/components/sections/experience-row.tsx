import { Badge } from "@/components/ui/badge";
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
      className="group border-t border-border py-8 transition-colors hover:bg-muted sm:py-10"
      aria-labelledby={`${project.title}-title`}
    >
      <div className="grid gap-7 lg:grid-cols-[minmax(11rem,0.65fr)_minmax(0,1.35fr)] lg:gap-14">
        <div>
          <h3
            id={`${project.title}-title`}
            className="text-2xl font-semibold tracking-tight transition-transform duration-[var(--motion-fast)] group-hover:translate-x-1"
          >
            {project.title}
          </h3>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{project.summary}</p>
        </div>
        <dl className="grid gap-6 border-l border-border pl-5 sm:grid-cols-2 sm:gap-x-8">
          {fields.map(({ key, labelKey }) => (
            <div key={key}>
              <dt className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-accent">
                {labels[labelKey]}
              </dt>
              <dd className="mt-2 text-sm leading-6 text-muted-foreground">{project[key]}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="mt-7 flex flex-wrap items-center gap-2 border-t border-border pt-5">
        <span className="mr-2 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
          {technologiesLabel}
        </span>
        {project.technologies.map((technology) => (
          <Badge key={technology} variant="outline">
            {technology}
          </Badge>
        ))}
      </div>
    </article>
  );
}
