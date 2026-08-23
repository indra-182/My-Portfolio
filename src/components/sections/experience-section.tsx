import type { PortfolioContent } from "@/content/portfolio-schema";
import { ExperienceRow, type ProjectFieldLabels } from "./experience-row";

export function ExperienceSection({
  experiences,
  eyebrow,
  heading,
  description,
  projectLabels,
  technologiesLabel,
  roleLabel,
  periodLabel,
}: {
  experiences: PortfolioContent["experiences"];
  eyebrow: string;
  heading: string;
  description: string;
  projectLabels: ProjectFieldLabels;
  technologiesLabel: string;
  roleLabel: string;
  periodLabel: string;
}) {
  return (
    <section
      id="experience"
      className="content-shell py-16 sm:py-24"
      aria-labelledby="experience-title"
    >
      <div className="grid gap-6 border-b border-border pb-8 lg:grid-cols-[0.55fr_1.45fr] lg:gap-16">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
        <div>
          <h2 id="experience-title" className="text-3xl font-semibold tracking-tight sm:text-5xl">
            {heading}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="mt-8">
        {experiences.map((experience) => (
          <div key={`${experience.company}-${experience.period}`}>
            <div className="grid gap-3 border-b border-border py-7 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-baseline">
              <div>
                <h3 className="text-2xl font-semibold tracking-tight">{experience.company}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">{roleLabel}:</span>{" "}
                  {experience.role}
                </p>
              </div>
              <p className="font-mono text-xs text-accent">
                <span className="sr-only">{periodLabel}: </span>
                {experience.period}
              </p>
            </div>
            <ul className="grid gap-2 border-l-2 border-accent/50 py-7 pl-5 text-sm leading-6 text-muted-foreground sm:grid-cols-2 sm:gap-x-8">
              {experience.responsibilities.map((responsibility) => (
                <li key={responsibility}>{responsibility}</li>
              ))}
            </ul>
            {experience.projects.map((project) => (
              <ExperienceRow
                key={project.title}
                project={project}
                labels={projectLabels}
                technologiesLabel={technologiesLabel}
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
