import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { Badge } from "./badge";

test("renders semantic span content with its data slot", () => {
  render(<Badge variant="outline">React</Badge>);

  const badge = screen.getByText("React");
  expect(badge.tagName).toBe("SPAN");
  expect(badge).toHaveAttribute("data-slot", "badge");
});
