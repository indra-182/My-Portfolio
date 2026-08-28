import { render, screen, within } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { SiteFooter } from "./site-footer";
import { SITE_INTERACTION } from "./site-interaction-contract";
import { SiteHeader } from "./site-header";

describe("site shell", () => {
  test("renders identity, blog link, and current copyright", () => {
    const dictionary = getDictionary("id");

    render(
      <SiteFooter
        locale="id"
        blogUrl="https://blog.example"
        githubUrl="https://github.example"
        email="hello@example.com"
        linkedinUrl="https://linkedin.example"
        identity={{
          name: "Mahadi Indra Manurung",
          location: { locality: "Bogor", countryName: "Indonesia", countryCode: "ID" },
        }}
        labels={{
          navigationLabel: dictionary.footer.navigationLabel,
          description: dictionary.footer.description,
          blog: dictionary.footer.blog,
          github: dictionary.footer.github,
          linkedin: dictionary.footer.linkedin,
          email: dictionary.footer.email,
          rights: dictionary.footer.rights,
        }}
      />,
    );

    expect(screen.getByRole("link", { name: "INDRA.DEV" })).toBeVisible();
    expect(screen.getByRole("link", { name: "INDRA.DEV" })).toHaveAttribute("href", "/id");
    expect(screen.getByRole("link", { name: /blog/i })).toHaveAttribute(
      "href",
      "https://blog.example",
    );
    expect(screen.getByRole("link", { name: /github/i })).toHaveAttribute(
      "href",
      "https://github.example",
    );
    expect(screen.queryByRole("link", { name: /portfolio/i })).not.toBeInTheDocument();
    expect(
      screen.getByText(
        `© ${new Date().getFullYear()} Mahadi Indra Manurung. Hak cipta dilindungi.`,
      ),
    ).toBeVisible();
    expect(screen.queryByRole("link", { name: /switch language/i })).not.toBeInTheDocument();
    expect(screen.getByText("Bogor/Indonesia")).toBeVisible();
  });

  test("does not render the CV action in the navbar", () => {
    const dictionary = getDictionary("id");
    render(
      <SiteHeader
        locale="id"
        navItems={[{ label: "Capabilities", href: "/id#capabilities" }]}
        labels={{
          skipToContent: dictionary.actions.skipToContent,
          primaryNav: dictionary.navigation.primaryLabel,
          themeToggle: dictionary.theme.label,
          scrollToTop: dictionary.actions.scrollToTop,
          switchLanguage: dictionary.actions.switchLanguage,
          languageNames: dictionary.actions.languageNames,
          mobileNavDescription: dictionary.mobileNavigation.description,
          mobileNavLabel: dictionary.mobileNavigation.navLabel,
          openMenu: dictionary.mobileNavigation.open,
          closeMenu: dictionary.mobileNavigation.close,
        }}
      />,
    );

    expect(screen.queryByRole("link", { name: /unduh cv/i })).not.toBeInTheDocument();
  });

  test.each(["id", "en"] as const)("labels the primary navigation in %s", (locale) => {
    const dictionary = getDictionary(locale);

    render(
      <SiteHeader
        locale={locale}
        navItems={[
          { label: dictionary.navigation.capabilities, href: `/${locale}#capabilities` },
          { label: dictionary.navigation.caseStudies, href: `/${locale}#case-studies` },
          { label: dictionary.navigation.content, href: `/${locale}#writing` },
        ]}
        labels={{
          skipToContent: dictionary.actions.skipToContent,
          primaryNav: dictionary.navigation.primaryLabel,
          themeToggle: dictionary.theme.label,
          scrollToTop: dictionary.actions.scrollToTop,
          switchLanguage: dictionary.actions.switchLanguage,
          languageNames: dictionary.actions.languageNames,
          mobileNavDescription: dictionary.mobileNavigation.description,
          mobileNavLabel: dictionary.mobileNavigation.navLabel,
          openMenu: dictionary.mobileNavigation.open,
          closeMenu: dictionary.mobileNavigation.close,
        }}
      />,
    );

    const primaryNavigation = screen.getByRole("navigation", {
      name: dictionary.navigation.primaryLabel,
    });
    expect(screen.getByRole("banner")).toHaveAttribute(
      "data-site-interaction",
      SITE_INTERACTION.header,
    );
    expect(
      within(primaryNavigation).getByRole("link", { name: dictionary.navigation.capabilities }),
    ).toHaveAttribute("data-site-interaction", SITE_INTERACTION.activeNavLink);
    expect(
      within(primaryNavigation).getByRole("link", { name: dictionary.navigation.capabilities }),
    ).toHaveAttribute("href", `/${locale}#capabilities`);
    expect(
      within(primaryNavigation).getByRole("link", { name: dictionary.navigation.caseStudies }),
    ).toHaveAttribute("href", `/${locale}#case-studies`);
    expect(
      within(primaryNavigation).getByRole("link", { name: dictionary.navigation.content }),
    ).toHaveAttribute("href", `/${locale}#writing`);
    expect(screen.getByRole("button", { name: dictionary.actions.scrollToTop })).toHaveAttribute(
      "data-site-interaction",
      SITE_INTERACTION.scrollToTop,
    );
    expect(screen.getByRole("button", { name: dictionary.mobileNavigation.open })).toHaveAttribute(
      "data-site-interaction",
      SITE_INTERACTION.mobileNavigationOpen,
    );
    expect(
      screen.getByRole("button", { name: dictionary.mobileNavigation.close, hidden: true }),
    ).toHaveAttribute("data-site-interaction", SITE_INTERACTION.mobileNavigationClose);
    expect(screen.getByRole("dialog", { hidden: true }).parentElement).toHaveAttribute(
      "data-site-interaction",
      SITE_INTERACTION.mobileNavigation,
    );
    expect(primaryNavigation).toBeVisible();
  });

  test("accepts only the supported locales", () => {
    expect(isLocale("id")).toBe(true);
    expect(isLocale("en")).toBe(true);
    expect(isLocale("fr")).toBe(false);
  });
});
