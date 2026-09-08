import { render, screen, within } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { portfolioByLocale } from "@/content/portfolio";
import { getDictionary } from "@/i18n/dictionaries";
import { ProjectsSection } from "@/components/sections/projects/projects-section";

function renderProjects(locale: "id" | "en") {
  const dictionary = getDictionary(locale);
  const portfolio = portfolioByLocale[locale];

  return render(
    <ProjectsSection experiences={portfolio.experiences} copy={dictionary.portfolio} />,
  );
}

describe("ProjectsSection", () => {
  test.each(["id", "en"] as const)("keeps all four secondary projects in %s", (locale) => {
    const { container } = renderProjects(locale);
    const projects = portfolioByLocale[locale].experiences.flatMap((experience) =>
      experience.projects.filter((project) => !project.featured),
    );

    expect(projects).toHaveLength(4);
    expect(container.querySelectorAll("details")).toHaveLength(4);
    expect(
      screen.getByRole("heading", {
        name: new RegExp(portfolioByLocale[locale].experiences[0].role),
      }),
    ).toBeVisible();
    for (const project of projects) {
      expect(screen.getByText(project.title)).toBeVisible();
    }
  });

  test("shows a secondary project's evidence when its native disclosure opens", () => {
    const { container } = renderProjects("en");
    const project = portfolioByLocale.en.experiences[0].projects.find(
      (candidate) => candidate.id === "maybank-unit-trust",
    )!;
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

  test("keeps an experience without the portfolio featured project usable", () => {
    const [primaryExperience] = portfolioByLocale.en.experiences;
    const secondaryExperience = {
      ...primaryExperience,
      id: "secondary-experience",
      company: "Secondary Company",
      role: "Secondary role",
      projects: primaryExperience.projects.map((project) => ({ ...project, featured: false })),
    };

    const { container } = render(
      <ProjectsSection
        experiences={[primaryExperience, secondaryExperience]}
        copy={getDictionary("en").portfolio}
      />,
    );

    expect(screen.getByRole("heading", { name: /Secondary role/ })).toBeVisible();
    expect(container.querySelectorAll("details")).toHaveLength(9);
  });
});
