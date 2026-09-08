import { LuArrowUpRight } from "react-icons/lu";
import { Badge } from "@/components/ui/badge";
import type { PortfolioContent, Project } from "@/content/portfolio-schema";
import type { Dictionary } from "@/i18n/dictionaries";
import { AtlasPathSequence } from "./path-motion";
import { getProjectEvidenceFields } from "./project-evidence";

type ProjectCopy = Dictionary["portfolio"];

export function FeaturedProjectPath({ project, copy }: { project: Project; copy: ProjectCopy }) {
  const fields = getProjectEvidenceFields(project, copy);

  return (
    <section
      id="featured-project"
      className="atlas-section atlas-featured-section"
      aria-labelledby="featured-project-title"
    >
      <div className="content-shell">
        <div className="atlas-featured-intro">
          <div>
            <p className="atlas-kicker">{copy.featuredLabel}</p>
            <h2 id="featured-project-title" className="mt-3 max-w-[18ch]">
              {project.title}
            </h2>
            <p className="atlas-prose mt-5 text-muted-foreground">{project.summary}</p>
          </div>
          <span className="atlas-route-mark" aria-hidden="true">
            <LuArrowUpRight className="size-7" />
          </span>
        </div>

        <AtlasPathSequence fields={fields} />

        <div className="atlas-technologies mt-12 border-t border-border pt-5">
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
    </section>
  );
}

export type FeaturedProject = PortfolioContent["experiences"][number]["projects"][number];
