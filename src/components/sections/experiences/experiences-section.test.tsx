import { render, screen, within } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { portfolioByLocale } from "@/content/portfolio";
import { getDictionary } from "@/i18n/dictionaries";
import { ExperiencesSection } from "./experiences-section";

function renderExperiences(locale: "id" | "en") {
  const dictionary = getDictionary(locale);
  const portfolio = portfolioByLocale[locale];

  return render(
    <ExperiencesSection experiences={portfolio.experiences} copy={dictionary.portfolio} />,
  );
}

describe("ExperiencesSection", () => {
  test.each(["id", "en"] as const)(
    "keeps all five supplied projects in the %s experience journey",
    (locale) => {
      const { container } = renderExperiences(locale);
      const portfolio = portfolioByLocale[locale];
      const projects = portfolio.experiences.flatMap((experience) => experience.projects);
      const featuredProject = projects.find((project) => project.featured)!;

      expect(projects).toHaveLength(5);
      expect(screen.getByRole("heading", { name: featuredProject.title })).toBeVisible();
      expect(container.querySelectorAll("details")).toHaveLength(4);
    },
  );

  test("shows the featured evidence and expands a secondary project", () => {
    const { container } = renderExperiences("en");
    const project = portfolioByLocale.en.experiences
      .flatMap((experience) => experience.projects)
      .find((candidate) => candidate.id === "maybank-unit-trust")!;

    expect(screen.getByText(project.summary)).toBeVisible();
    expect(screen.queryByText(project.outcome)).not.toBeVisible();

    const details = container.querySelectorAll("details")[0];
    details.querySelector("summary")!.click();

    expect(within(details).getByText("Problem")).toBeVisible();
    expect(within(details).getByText("Ownership")).toBeVisible();
    expect(within(details).getByText("Delivery")).toBeVisible();
    expect(within(details).getByText("Outcome")).toBeVisible();
    expect(within(details).getByText(project.problem)).toBeVisible();
    expect(within(details).getByText(project.ownership)).toBeVisible();
    expect(within(details).getByText(project.delivery)).toBeVisible();
    expect(within(details).getByText(project.outcome)).toBeVisible();
    for (const technology of project.technologies) {
      expect(within(details).getByText(technology)).toBeVisible();
    }
  });
});
