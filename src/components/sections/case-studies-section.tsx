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
    <div className="case-study-details">
      <div className="case-study-field-grid">
        {fields.map(([label, value]) => (
          <div key={label} className="case-study-field">
            <p className="cue-kicker">{label}</p>
            <p>{value}</p>
          </div>
        ))}
      </div>
      <div className="case-study-technologies">
        <p className="cue-kicker">{technologiesLabel}</p>
        <ul aria-label={technologiesLabel}>
          {project.technologies.map((technology) => (
            <li key={technology}>
              <Badge variant="outline">{technology}</Badge>
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
    <article className="case-study-featured">
      <p className="cue-kicker">{featuredLabel}</p>
      <h3>{project.title}</h3>
      <p className="case-study-summary">{project.summary}</p>
      <div className="workflow-cue-line" aria-hidden="true">
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
        <div className="cue-section-heading cue-section-heading-wide">
          <div>
            <h2 id="case-studies-title">{heading}</h2>
            <p>{description}</p>
          </div>
        </div>

        {experiences.map((experience) => {
          const [featuredProject, ...secondaryProjects] = experience.projects;

          return (
            <div key={`${experience.company}-${experience.period}`} className="experience-group">
              <div className="experience-context">
                <div>
                  <p className="cue-kicker">{experience.company}</p>
                  <h3>
                    <span className="sr-only">{roleLabel}: </span>
                    {experience.role}
                  </h3>
                </div>
                <p className="experience-period">
                  <span className="sr-only">{periodLabel}: </span>
                  {experience.period}
                </p>
              </div>
              <ul className="responsibility-list">
                {experience.responsibilities.map((responsibility) => (
                  <li key={responsibility}>{responsibility}</li>
                ))}
              </ul>

              <div className="case-study-stack">
                <FeaturedProject
                  project={featuredProject}
                  labels={labels}
                  technologiesLabel={technologiesLabel}
                  featuredLabel={featuredLabel}
                />
                <div className="secondary-case-studies">
                  <p className="cue-kicker">{secondaryLabel}</p>
                  {secondaryProjects.map((project) => (
                    <details key={project.title} className="case-study-disclosure">
                      <summary>
                        <span className="case-study-summary-copy">
                          <strong>{project.title}</strong>
                          <span>{project.summary}</span>
                        </span>
                        <span className="case-study-summary-action">
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
