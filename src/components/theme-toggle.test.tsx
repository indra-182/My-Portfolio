import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { getDictionary } from "@/i18n/dictionaries";
import { ThemeToggle } from "./theme-toggle";

test("renders an accessible theme control without a React client boundary", async () => {
  const dictionary = await getDictionary("en");
  render(<ThemeToggle label={dictionary.theme.label} />);
  const toggle = screen.getByRole("button", { name: dictionary.theme.label });

  expect(toggle).toHaveAttribute("title", dictionary.theme.label);
  expect(toggle).toHaveAttribute("data-theme-toggle");
  expect(toggle.querySelectorAll('svg[aria-hidden="true"]')).toHaveLength(2);
  expect(toggle.className).toContain("site-control");
});
