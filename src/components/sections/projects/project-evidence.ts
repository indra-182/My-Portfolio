import type { Project } from "@/content/portfolio-schema";
import type { Dictionary } from "@/i18n/dictionaries";

type ProjectCopy = Dictionary["portfolio"];

export type ProjectEvidenceFieldId = "problem" | "ownership" | "delivery" | "outcome";

export type ProjectEvidenceField = {
  id: ProjectEvidenceFieldId;
  label: string;
  value: string;
};

/**
 * Keep the four project-evidence fields in one order on every project surface.
 * The labels are localized while the values stay sourced from the validated project record.
 */
export function getProjectEvidenceFields(
  project: Project,
  copy: ProjectCopy,
): ReadonlyArray<ProjectEvidenceField> {
  return [
    { id: "problem", label: copy.problemLabel, value: project.problem },
    { id: "ownership", label: copy.ownershipLabel, value: project.ownership },
    { id: "delivery", label: copy.deliveryLabel, value: project.delivery },
    { id: "outcome", label: copy.outcomeLabel, value: project.outcome },
  ];
}
