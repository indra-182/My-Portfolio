import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { isLocale } from "@/i18n/config";
import { SiteFooter } from "./site-footer";

describe("site shell", () => {
  test("renders identity, cross-site links, and current copyright", () => {
    render(
      <SiteFooter
        locale="id"
        portfolioUrl="https://portfolio.example"
        blogUrl="https://blog.example"
      />,
    );

    expect(screen.getByText("INDRA.DEV")).toBeVisible();
    expect(screen.getByRole("link", { name: /portfolio/i })).toHaveAttribute(
      "href",
      "https://portfolio.example/id",
    );
    expect(screen.getByRole("link", { name: /blog/i })).toHaveAttribute(
      "href",
      "https://blog.example/id",
    );
    expect(
      screen.getByText(`© ${new Date().getFullYear()} Mahadi Indra Manurung`),
    ).toBeVisible();
  });

  test("accepts only the supported locales", () => {
    expect(isLocale("id")).toBe(true);
    expect(isLocale("en")).toBe(true);
    expect(isLocale("fr")).toBe(false);
  });
});
