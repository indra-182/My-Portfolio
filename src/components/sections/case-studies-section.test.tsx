import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";
import { getDictionary } from "@/i18n/dictionaries";
import { getPortfolio } from "@/lib/get-portfolio";
import { CaseStudiesSection } from "./case-studies-section";

function renderCaseStudies(locale: "id" | "en") {
  const dictionary = getDictionary(locale);
  const portfolio = getPortfolio(locale);
  const labels = {
    problem: dictionary.portfolio.problemLabel,
    ownership: dictionary.portfolio.ownershipLabel,
    delivery: dictionary.portfolio.deliveryLabel,
    outcome: dictionary.portfolio.outcomeLabel,
  };

  return render(
    <CaseStudiesSection
      experiences={portfolio.experiences}
      heading={dictionary.portfolio.caseStudiesHeading}
      description={dictionary.portfolio.caseStudiesDescription}
      labels={labels}
      technologiesLabel={dictionary.portfolio.technologies}
      roleLabel={dictionary.portfolio.role}
      periodLabel={dictionary.portfolio.period}
      featuredLabel={dictionary.portfolio.featuredLabel}
      secondaryLabel={dictionary.portfolio.secondaryLabel}
      openDetails={dictionary.portfolio.openDetails}
      closeDetails={dictionary.portfolio.closeDetails}
    />,
  );
}

describe("CaseStudiesSection", () => {
  test.each(["id", "en"] as const)(
    "keeps all five supplied projects in the %s case study journey",
    (locale) => {
      const { container } = renderCaseStudies(locale);
      const portfolio = getPortfolio(locale);
      const projects = portfolio.experiences.flatMap((experience) => experience.projects);
      const featuredProject = projects.find((project) => project.featured)!;

      expect(projects).toHaveLength(5);
      expect(screen.getByRole("heading", { name: featuredProject.title })).toBeVisible();
      expect(container.querySelectorAll("details")).toHaveLength(4);
    },
  );

  test("shows the featured evidence and expands a secondary project", async () => {
    const user = userEvent.setup();
    const { container } = renderCaseStudies("en");
    const project = getPortfolio("en")
      .experiences.flatMap((experience) => experience.projects)
      .find((candidate) => candidate.id === "maybank-unit-trust")!;

    expect(screen.getByText(project.summary)).toBeVisible();
    expect(screen.queryByText(project.outcome)).not.toBeVisible();

    const details = container.querySelectorAll("details")[0];
    await user.click(within(details).getByText(project.title));

    expect(within(details).getByText("Problem")).toBeVisible();
    expect(within(details).getByText("Ownership")).toBeVisible();
    expect(within(details).getByText("Delivery")).toBeVisible();
    expect(within(details).getByText("Outcome")).toBeVisible();
    expect(within(details).getByText(project.problem)).toBeVisible();
    expect(within(details).getByText(project.ownership)).toBeVisible();
    expect(within(details).getByText(project.delivery)).toBeVisible();
    expect(within(details).getByText(project.outcome)).toBeVisible();
    expect(within(details).getByText(project.technologies[0])).toBeVisible();
  });
});
