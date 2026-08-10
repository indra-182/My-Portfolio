import type { Project } from "@/content/portfolio-schema";

export function ExperienceRow({
  project,
  technologiesLabel,
}: {
  project: Project;
  technologiesLabel: string;
}) {
  return (
    <article className="group border-t border-border py-8 transition-colors hover:bg-surface sm:py-10" aria-labelledby={`${project.title}-title`}>
      <div className="grid gap-6 lg:grid-cols-[minmax(12rem,0.7fr)_minmax(0,1.3fr)] lg:gap-14">
        <div>
          <h3 id={`${project.title}-title`} className="text-2xl font-semibold tracking-tight transition-transform duration-[var(--motion-fast)] group-hover:translate-x-1">
            {project.title}
          </h3>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{project.summary}</p>
        </div>
        <div className="grid gap-7 sm:grid-cols-2">
          <div>
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-accent">Problem</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{project.problem}</p>
          </div>
          <div>
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-accent">Ownership</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{project.ownership}</p>
          </div>
          <div>
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-accent">Delivery</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{project.delivery}</p>
          </div>
          <div>
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-accent">Outcome</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{project.outcome}</p>
          </div>
        </div>
      </div>
      <div className="mt-7 flex flex-wrap items-center gap-2 border-t border-border/70 pt-5">
        <span className="mr-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">{technologiesLabel}</span>
        {project.technologies.map((technology) => (
          <span key={technology} className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
            {technology}
          </span>
        ))}
      </div>
    </article>
  );
}
