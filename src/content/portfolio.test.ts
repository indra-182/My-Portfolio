import { describe, expect, test } from "vitest";
import { portfolioByLocale } from "./portfolio";
import { PortfolioContentSchema } from "./portfolio-schema";

describe("portfolio content", () => {
  test.each(["id", "en"] as const)("%s content satisfies the public schema", (locale) => {
    expect(() => PortfolioContentSchema.parse(portfolioByLocale[locale])).not.toThrow();
  });

  test("does not publish unapproved testimonials", () => {
    for (const content of Object.values(portfolioByLocale)) {
      expect(content.testimonials.every((item) => item.approved)).toBe(true);
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

  test("includes the four approved collaborator testimonials", () => {
    expect(portfolioByLocale.en.testimonials.map((item) => item.author)).toEqual([
      "Frisko Mayufid",
      "Wahyu Aziz",
      "Rehan Zibran",
      "Muhammad Abdurrafi",
    ]);
  });

  test("puts technologies inside projects", () => {
    for (const experience of portfolioByLocale.id.experiences) {
      expect(experience.projects.every((project) => project.technologies.length > 0)).toBe(true);
    }
  });

  test("uses the optimized profile image asset", () => {
    expect(portfolioByLocale.id.profile.imageSrc).toBe("/images/mahadi-indra.webp");
    expect(portfolioByLocale.en.profile.imageSrc).toBe("/images/mahadi-indra.webp");
  });
});
