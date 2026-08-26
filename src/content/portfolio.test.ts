import { describe, expect, test } from "vitest";
import { portfolioByLocale, portfolioFacts } from "./portfolio";
import { PortfolioContentSchema } from "./portfolio-schema";

describe("portfolio content", () => {
  test.each(["id", "en"] as const)("%s content satisfies the public schema", (locale) => {
    expect(() => PortfolioContentSchema.parse(portfolioByLocale[locale])).not.toThrow();
  });

  test("keeps stable project IDs and canonical ordering across locales", () => {
    const ids = (locale: "id" | "en") =>
      portfolioByLocale[locale].experiences.flatMap((experience) =>
        experience.projects.map((project) => project.id),
      );

    expect(ids("id")).toEqual(ids("en"));
    expect(ids("id")).toEqual(
      portfolioFacts.experiences.flatMap((experience) => experience.projectIds),
    );
  });

  test("has exactly one explicitly featured project", () => {
    for (const content of Object.values(portfolioByLocale)) {
      expect(
        content.experiences
          .flatMap((experience) => experience.projects)
          .filter((project) => project.featured),
      ).toHaveLength(1);
    }
  });

  test("publishes only approved testimonials with explicit categories", () => {
    for (const content of Object.values(portfolioByLocale)) {
      expect(content.testimonials.every((item) => item.approved)).toBe(true);
      expect(content.testimonials.map((item) => item.category)).toEqual([
        "collaborator",
        "collaborator",
        "mentoring",
        "mentoring",
      ]);
    }
  });

  test("keeps three capabilities in both localized catalogs", () => {
    expect(portfolioByLocale.id.capabilities).toHaveLength(3);
    expect(portfolioByLocale.en.capabilities).toHaveLength(3);
  });

  test("rejects an unapproved testimonial at the schema boundary", () => {
    const content = structuredClone(portfolioByLocale.en);
    content.testimonials[0].approved = false as never;

    expect(() => PortfolioContentSchema.parse(content)).toThrow();
  });

  test("rejects an invalid testimonial category at the schema boundary", () => {
    const content = structuredClone(portfolioByLocale.en);
    content.testimonials[0].category = "other" as never;

    expect(() => PortfolioContentSchema.parse(content)).toThrow();
  });

  test("rejects content without exactly one featured project", () => {
    const content = structuredClone(portfolioByLocale.en);
    content.experiences[0].projects[0].featured = false;

    expect(() => PortfolioContentSchema.parse(content)).toThrow();
  });

  test("includes the four approved testimonials in canonical order", () => {
    expect(portfolioByLocale.en.testimonials.map((item) => item.author)).toEqual([
      "Frisko Mayufid",
      "Wahyu Aziz",
      "Rehan Zibran",
      "Muhammad Abdurrafi",
    ]);
  });

  test("uses structured location and the optimized profile image asset", () => {
    expect(portfolioByLocale.id.profile.location).toEqual({
      locality: "Bogor",
      countryName: "Indonesia",
      countryCode: "ID",
    });
    expect(portfolioByLocale.id.profile.imageSrc).toBe("/images/mahadi-indra.webp");
    expect(portfolioByLocale.en.profile.imageSrc).toBe("/images/mahadi-indra.webp");
  });
});
