import { Badge } from "@/components/ui/badge";
import type { PortfolioContent, Project } from "@/content/portfolio-schema";
import type { Dictionary } from "@/i18n/dictionaries";

type ProjectDetailsProps = {
  project: Project;
  copy: Dictionary["portfolio"];
};

function ProjectDetails({ project, copy }: ProjectDetailsProps) {
  const fields = [
    [copy.problemLabel, project.problem],
    [copy.ownershipLabel, project.ownership],
    [copy.deliveryLabel, project.delivery],
    [copy.outcomeLabel, project.outcome],
  ] as const;

  return (
    <div className="project-details mt-8 border-t border-border pt-6">
      <dl className="grid gap-6 sm:grid-cols-2">
        {fields.map(([label, value]) => (
          <div key={label} className="border-l border-border pl-4">
            <dt className="cue-kicker">{label}</dt>
            <dd className="mt-[0.65rem] text-[0.92rem] leading-[1.65] text-muted-foreground">
              {value}
            </dd>
          </div>
        ))}
      </dl>
      <div className="project-technologies mt-8 border-t border-border pt-4">
        <p className="cue-kicker">{copy.technologies}</p>
        <ul aria-label={copy.technologies} className="mt-3 flex list-none flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <li key={technology}>
              <Badge className="border-[color-mix(in_srgb,var(--cue-day)_35%,transparent)] font-mono text-[0.65rem] tracking-[0.04em] text-foreground">
                {technology}
              </Badge>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function ExperiencesSection({
  experiences,
  copy,
}: {
  experiences: PortfolioContent["experiences"];
  copy: Dictionary["portfolio"];
}) {
  return (
    <section id="experiences" className="cue-section" aria-labelledby="experiences-title">
      <div className="content-shell">
        <div className="cue-section-heading">
          <div>
            <h2 id="experiences-title">{copy.experiencesHeading}</h2>
            <p className="mt-5 max-w-2xl text-base leading-[1.7] text-muted-foreground">
              {copy.experiencesDescription}
            </p>
          </div>
        </div>

        {experiences.map((experience) => {
          const featuredProject = experience.projects.find((project) => project.featured);
          const secondaryProjects = experience.projects.filter((project) => !project.featured);

          return (
            <div key={experience.id} className="mt-12">
              <div className="flex items-end justify-between gap-4 border-b border-border pb-4 max-sm:grid max-sm:gap-3">
                <div>
                  <p className="cue-kicker">{experience.company}</p>
                  <h3 className="mt-[0.35rem] text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.08] font-bold tracking-[-0.028em]">
                    <span className="sr-only">{copy.role}: </span>
                    {experience.role}
                  </h3>
                </div>
                <p className="font-mono text-[0.72rem] text-[var(--cue-rose)] tabular-nums whitespace-nowrap max-sm:justify-self-start">
                  <span className="sr-only">{copy.period}: </span>
                  {experience.period}
                </p>
              </div>
              <ul className="mt-6 mb-9 grid gap-3 border-l border-[var(--cue-rose)] pl-5 text-[0.92rem] leading-[1.6] text-muted-foreground">
                {experience.responsibilities.map((responsibility) => (
                  <li key={responsibility}>{responsibility}</li>
                ))}
              </ul>

              <div className="grid gap-12">
                {featuredProject ? (
                  <article className="project-featured border border-border bg-surface-strong p-[clamp(1.35rem,3vw,2.5rem)]">
                    <p className="cue-kicker">{copy.featuredLabel}</p>
                    <h3 className="mt-[0.7rem] max-w-[20ch] text-[clamp(1.8rem,3.2vw,3rem)] leading-none font-bold tracking-[-0.028em]">
                      {featuredProject.title}
                    </h3>
                    <p className="mt-[0.9rem] max-w-2xl leading-[1.6] text-muted-foreground">
                      {featuredProject.summary}
                    </p>
                    <div
                      className="workflow-cue-line mt-8 grid grid-cols-[1.4fr_1fr_0.7fr_0.35fr] gap-[0.3rem]"
                      aria-hidden="true"
                    >
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>
                    <ProjectDetails project={featuredProject} copy={copy} />
                  </article>
                ) : null}
                <div>
                  <p className="cue-kicker pb-[0.85rem]">{copy.secondaryLabel}</p>
                  {secondaryProjects.map((project) => (
                    <details
                      key={project.id}
                      className="project-disclosure border-t border-border transition-[border-color] duration-[var(--motion-fast)] ease-[ease] last:border-b"
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
                        <span className="project-summary-action text-left font-mono text-[0.62rem] tracking-[0.08em] text-[var(--cue-rose)] uppercase sm:text-right">
                          <span className="project-summary-open">{copy.openDetails}</span>
                          <span className="project-summary-close">{copy.closeDetails}</span>
                        </span>
                      </summary>
                      <ProjectDetails project={project} copy={copy} />
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
