import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { getDictionary } from "@/i18n/dictionaries";
import { SITE_INTERACTION } from "./site-interaction-contract";
import { ThemeToggle } from "./theme-toggle";

test("renders an accessible theme control without a React client boundary", () => {
  const dictionary = getDictionary("en");
  render(<ThemeToggle label={dictionary.theme.label} />);
  const toggle = screen.getByRole("button", { name: dictionary.theme.label });

  expect(toggle).toHaveAttribute("title", dictionary.theme.label);
  expect(toggle).toHaveAttribute("data-site-interaction", SITE_INTERACTION.themeToggle);
  expect(toggle).toHaveAttribute("aria-pressed", "false");
  expect(toggle.querySelectorAll('svg[aria-hidden="true"]')).toHaveLength(2);
});
