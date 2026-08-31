import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { Badge } from "./badge";

test("renders the fixed outline badge", () => {
  render(<Badge className="font-mono">React</Badge>);

  const badge = screen.getByText("React");
  expect(badge.tagName).toBe("SPAN");
  expect(badge).toHaveClass("border-border", "font-mono");
});
