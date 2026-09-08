import { Badge } from "@/components/ui/badge";
import type { PortfolioContent, Project } from "@/content/portfolio-schema";
import type { Dictionary } from "@/i18n/dictionaries";
import { getProjectEvidenceFields } from "./project-evidence";

type ProjectsCopy = Dictionary["portfolio"];

function ProjectDetails({ project, copy }: { project: Project; copy: ProjectsCopy }) {
  const fields = getProjectEvidenceFields(project, copy);

  return (
    <div className="atlas-project-details">
      <dl className="grid gap-6 sm:grid-cols-2">
        {fields.map(({ id, label, value }) => (
          <div key={id} className="border-l border-border pl-4">
            <dt className="atlas-kicker">{label}</dt>
            <dd className="mt-2 max-w-[62ch] leading-[1.7] text-muted-foreground">{value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-8 border-t border-border pt-4">
        <p className="atlas-kicker">{copy.technologies}</p>
        <ul aria-label={copy.technologies} className="mt-3 flex list-none flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <li key={technology}>
              <Badge className="atlas-meta text-foreground">{technology}</Badge>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function ProjectsSection({
  experiences,
  copy,
}: {
  experiences: PortfolioContent["experiences"];
  copy: ProjectsCopy;
}) {
  return (
    <section id="projects" className="atlas-section" aria-labelledby="projects-title">
      <span id="experiences" className="atlas-legacy-anchor" aria-hidden="true" />
      <div className="content-shell">
        <div className="atlas-section-heading">
          <div>
            <h2 id="projects-title">{copy.projectsHeading}</h2>
            <p className="atlas-prose mt-5 text-muted-foreground">{copy.projectsDescription}</p>
          </div>
        </div>

        {experiences.map((experience) => {
          const projects = experience.projects.filter((project) => !project.featured);

          return (
            <div key={experience.id} className="mt-12">
              <div className="atlas-projects-context">
                <div>
                  <p className="atlas-kicker">{experience.company}</p>
                  <h3 className="mt-2 text-[clamp(1.5rem,3vw,2.5rem)] font-bold tracking-[-0.03em]">
                    <span className="sr-only">{copy.role}: </span>
                    {experience.role}
                  </h3>
                </div>
                <p className="atlas-meta whitespace-nowrap">
                  <span className="sr-only">{copy.period}: </span>
                  {experience.period}
                </p>
              </div>
              <ul className="mt-6 mb-10 grid max-w-[72ch] gap-3 border-l-2 border-[var(--atlas-route-blue)] pl-5 leading-[1.7] text-muted-foreground">
                {experience.responsibilities.map((responsibility) => (
                  <li key={responsibility}>{responsibility}</li>
                ))}
              </ul>

              <div>
                <p className="atlas-kicker pb-3">{copy.secondaryLabel}</p>
                {projects.map((project) => (
                  <details key={project.id} className="atlas-project-disclosure">
                    <summary>
                      <span className="grid gap-1">
                        <strong className="text-[1.2rem] tracking-[-0.02em]">
                          {project.title}
                        </strong>
                        <span className="max-w-[62ch] leading-[1.5] text-muted-foreground">
                          {project.summary}
                        </span>
                      </span>
                      <span className="atlas-project-action">
                        <span className="atlas-project-summary-open">{copy.openDetails}</span>
                        <span className="atlas-project-summary-close">{copy.closeDetails}</span>
                      </span>
                    </summary>
                    <ProjectDetails project={project} copy={copy} />
                  </details>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
