import type { PortfolioContent } from "@/content/portfolio-schema";
import { ExperienceRow } from "./experience-row";

export function ExperienceSection({
  experiences,
  eyebrow,
  technologiesLabel,
  roleLabel,
  periodLabel,
}: {
  experiences: PortfolioContent["experiences"];
  eyebrow: string;
  technologiesLabel: string;
  roleLabel: string;
  periodLabel: string;
}) {
  return (
    <section
      id="experience"
      className="content-shell py-20 sm:py-28"
      aria-labelledby="experience-title"
    >
      <div className="flex flex-col gap-5 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
          <h2
            id="experience-title"
            className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl"
          >
            Ownership across complex workflows.
          </h2>
        </div>
        <p className="max-w-xs text-sm leading-6 text-muted-foreground">
          Projects are grouped by engagement so technology stays connected to the work it enabled.
        </p>
      </div>
      <div className="mt-8">
        {experiences.map((experience) => (
          <div key={`${experience.company}-${experience.period}`}>
            <div className="grid gap-4 pb-8 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
              <div>
                <h3 className="text-2xl font-semibold tracking-tight">{experience.company}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">{roleLabel}:</span>{" "}
                  {experience.role}
                </p>
              </div>
              <p className="font-mono text-xs text-muted-foreground">
                <span className="sr-only">{periodLabel}: </span>
                {experience.period}
              </p>
            </div>
            <ul className="mb-2 grid gap-2 border-l-2 border-accent/40 pl-5 text-sm leading-6 text-muted-foreground sm:grid-cols-2 sm:gap-x-8">
              {experience.responsibilities.map((responsibility) => (
                <li key={responsibility}>{responsibility}</li>
              ))}
            </ul>
            {experience.projects.map((project) => (
              <ExperienceRow
                key={project.title}
                project={project}
                technologiesLabel={technologiesLabel}
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
