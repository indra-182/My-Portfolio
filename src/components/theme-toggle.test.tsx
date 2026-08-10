import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";
import { ThemeToggle } from "./theme-toggle";

const setTheme = vi.fn();

vi.mock("next-themes", () => ({
  useTheme: () => ({ theme: "system", resolvedTheme: "light", setTheme }),
}));

test("switches directly to dark mode when the light-mode toggle is clicked", async () => {
  render(<ThemeToggle />);
  const toggle = screen.getByRole("button", { name: /switch to dark mode/i });
  expect(toggle.querySelector(".lucide-moon")).toBeInTheDocument();
  expect(toggle.className).toContain("hover:bg-muted");
  await userEvent.click(toggle);
  expect(setTheme).toHaveBeenCalledWith("dark");
});
