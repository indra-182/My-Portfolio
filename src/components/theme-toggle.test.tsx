import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";
import { ThemeToggle } from "./theme-toggle";

const setTheme = vi.fn();

vi.mock("next-themes", () => ({
  useTheme: () => ({ theme: "system", resolvedTheme: "light", setTheme }),
}));

test("renders an accessible icon and switches directly to dark mode", async () => {
  render(<ThemeToggle />);
  const toggle = screen.getByRole("button", { name: /switch to dark mode/i });
  expect(toggle.querySelector('svg[aria-hidden="true"]')).toBeInTheDocument();
  expect(toggle).toHaveAttribute("title", "Switch to dark mode");
  expect(toggle.className).toContain("hover:bg-muted");
  await userEvent.click(toggle);
  expect(setTheme).toHaveBeenCalledWith("dark");
});
