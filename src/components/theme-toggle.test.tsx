import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { ThemeToggle } from "./theme-toggle";

test("renders an accessible theme control without a React client boundary", () => {
  render(<ThemeToggle />);
  const toggle = screen.getByRole("button", { name: /toggle color theme/i });

  expect(toggle).toHaveAttribute("title", "Toggle color theme");
  expect(toggle).toHaveAttribute("data-theme-toggle");
  expect(toggle.querySelectorAll('svg[aria-hidden="true"]')).toHaveLength(2);
  expect(toggle.className).toContain("hover:bg-muted");
});
