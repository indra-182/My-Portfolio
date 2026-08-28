import { Badge } from "@/components/ui/badge";
import type { PortfolioContent, Project } from "@/content/portfolio-schema";

export type CaseStudyFieldLabels = {
  problem: string;
  ownership: string;
  delivery: string;
  outcome: string;
};

type ProjectDetailsProps = {
  project: Project;
  labels: CaseStudyFieldLabels;
  technologiesLabel: string;
};

function ProjectDetails({ project, labels, technologiesLabel }: ProjectDetailsProps) {
  const fields = [
    [labels.problem, project.problem],
    [labels.ownership, project.ownership],
    [labels.delivery, project.delivery],
    [labels.outcome, project.outcome],
  ] as const;

  return (
    <div className="case-study-details mt-8 border-t border-border pt-6">
      <div className="grid gap-6 sm:grid-cols-2">
        {fields.map(([label, value]) => (
          <div key={label} className="border-l border-border pl-4">
            <p className="cue-kicker">{label}</p>
            <p className="mt-[0.65rem] text-[0.92rem] leading-[1.65] text-muted-foreground">
              {value}
            </p>
          </div>
        ))}
      </div>
      <div className="case-study-technologies mt-8 border-t border-border pt-4">
        <p className="cue-kicker">{technologiesLabel}</p>
        <ul aria-label={technologiesLabel} className="mt-3 flex list-none flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <li key={technology}>
              <Badge
                variant="outline"
                className="font-mono text-[0.65rem] tracking-[0.04em] text-foreground"
              >
                {technology}
              </Badge>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function FeaturedProject({
  project,
  labels,
  technologiesLabel,
  featuredLabel,
}: ProjectDetailsProps & { featuredLabel: string }) {
  return (
    <article className="case-study-featured border border-border bg-surface-strong p-[clamp(1.35rem,3vw,2.5rem)]">
      <p className="cue-kicker">{featuredLabel}</p>
      <h3 className="mt-[0.7rem] max-w-[20ch] text-[clamp(1.8rem,3.2vw,3rem)] leading-none font-bold tracking-[-0.028em]">
        {project.title}
      </h3>
      <p className="mt-[0.9rem] max-w-2xl leading-[1.6] text-muted-foreground">{project.summary}</p>
      <div
        className="workflow-cue-line mt-8 grid grid-cols-[1.4fr_1fr_0.7fr_0.35fr] gap-[0.3rem]"
        aria-hidden="true"
      >
        <span />
        <span />
        <span />
        <span />
      </div>
      <ProjectDetails project={project} labels={labels} technologiesLabel={technologiesLabel} />
    </article>
  );
}

export function CaseStudiesSection({
  experiences,
  heading,
  description,
  labels,
  technologiesLabel,
  roleLabel,
  periodLabel,
  featuredLabel,
  secondaryLabel,
  openDetails,
  closeDetails,
}: {
  experiences: PortfolioContent["experiences"];
  heading: string;
  description: string;
  labels: CaseStudyFieldLabels;
  technologiesLabel: string;
  roleLabel: string;
  periodLabel: string;
  featuredLabel: string;
  secondaryLabel: string;
  openDetails: string;
  closeDetails: string;
}) {
  return (
    <section id="case-studies" className="cue-section" aria-labelledby="case-studies-title">
      <div className="content-shell">
        <div className="cue-section-heading !gap-6">
          <div>
            <h2 id="case-studies-title">{heading}</h2>
            <p className="mt-5 max-w-2xl text-base leading-[1.7] text-muted-foreground">
              {description}
            </p>
          </div>
        </div>

        {experiences.map((experience) => {
          const featuredProject = experience.projects.find((project) => project.featured)!;
          const secondaryProjects = experience.projects.filter((project) => !project.featured);

          return (
            <div key={experience.id} className="mt-12">
              <div className="flex items-end justify-between gap-4 border-b border-border pb-4 max-sm:grid max-sm:gap-3">
                <div>
                  <p className="cue-kicker">{experience.company}</p>
                  <h3 className="mt-[0.35rem] text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.08] font-bold tracking-[-0.028em]">
                    <span className="sr-only">{roleLabel}: </span>
                    {experience.role}
                  </h3>
                </div>
                <p className="font-mono text-[0.72rem] text-[var(--cue-rose)] tabular-nums whitespace-nowrap max-sm:justify-self-start">
                  <span className="sr-only">{periodLabel}: </span>
                  {experience.period}
                </p>
              </div>
              <ul className="mt-6 mb-9 grid gap-3 border-l border-[var(--cue-rose)] pl-5 text-[0.92rem] leading-[1.6] text-muted-foreground">
                {experience.responsibilities.map((responsibility) => (
                  <li key={responsibility}>{responsibility}</li>
                ))}
              </ul>

              <div className="grid gap-12">
                <FeaturedProject
                  project={featuredProject}
                  labels={labels}
                  technologiesLabel={technologiesLabel}
                  featuredLabel={featuredLabel}
                />
                <div>
                  <p className="cue-kicker pb-[0.85rem]">{secondaryLabel}</p>
                  {secondaryProjects.map((project) => (
                    <details
                      key={project.id}
                      className="case-study-disclosure border-t border-border transition-[border-color] duration-[var(--motion-fast)] ease-[ease] last:border-b"
                    >
                      <summary className="grid min-h-21 cursor-pointer list-none grid-cols-1 items-center gap-4 py-[0.9rem] sm:grid-cols-[minmax(0,1fr)_auto]">
                        <span className="grid gap-[0.35rem]">
                          <strong className="text-[1.2rem] tracking-[-0.025em]">
                            {project.title}
                          </strong>
                          <span className="text-[0.85rem] leading-[1.45] text-muted-foreground">
                            {project.summary}
                          </span>
                        </span>
                        <span className="case-study-summary-action text-left font-mono text-[0.62rem] tracking-[0.08em] text-[var(--cue-rose)] uppercase transition-colors duration-[var(--motion-fast)] ease-[ease] sm:text-right">
                          <span className="case-study-summary-open">{openDetails}</span>
                          <span className="case-study-summary-close">{closeDetails}</span>
                        </span>
                      </summary>
                      <ProjectDetails
                        project={project}
                        labels={labels}
                        technologiesLabel={technologiesLabel}
                      />
                    </details>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
