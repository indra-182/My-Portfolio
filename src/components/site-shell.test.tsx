import type { ComponentProps } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { isLocale } from "@/i18n/config";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

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
    expect(screen.getByText(`© ${new Date().getFullYear()} Mahadi Indra Manurung`)).toBeVisible();
    expect(screen.queryByRole("link", { name: /switch language/i })).not.toBeInTheDocument();
    expect(screen.getByText("Asia/Jakarta")).toBeVisible();
  });

  test("does not render the CV action in the navbar", () => {
    const props = {
      locale: "id" as const,
      portfolioUrl: "https://portfolio.example",
      blogUrl: "https://blog.example",
      navItems: [{ label: "About", href: "/id#about" }],
      primaryAction: { label: "Unduh CV", href: "/cv.pdf", download: true },
    };

    render(<SiteHeader {...(props as ComponentProps<typeof SiteHeader>)} />);

    expect(screen.queryByRole("link", { name: /unduh cv/i })).not.toBeInTheDocument();
  });

  test("accepts only the supported locales", () => {
    expect(isLocale("id")).toBe(true);
    expect(isLocale("en")).toBe(true);
    expect(isLocale("fr")).toBe(false);
  });
});
