import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { Button, buttonVariants } from "./button";

describe("Button", () => {
  test("keeps native attributes and disabled state", () => {
    render(
      <Button type="button" disabled aria-label="Save changes">
        Save
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Save changes" });
    expect(button).toHaveAttribute("type", "button");
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("data-slot", "button");
  });

  test("fires native click handlers when enabled", async () => {
    const onClick = vi.fn();
    render(
      <Button type="button" onClick={onClick}>
        Continue
      </Button>,
    );

    await screen.getByRole("button", { name: "Continue" }).click();
    expect(onClick).toHaveBeenCalledOnce();
  });

  test.each([
    ["default", "default", "bg-primary"],
    ["outline", "default", "border-border"],
    ["secondary", "default", "bg-secondary"],
    ["ghost", "default", "hover:bg-muted"],
    ["default", "sm", "min-h-9"],
    ["default", "lg", "min-h-12"],
    ["default", "icon", "size-11"],
  ] as const)("builds the %s %s variant", (variant, size, marker) => {
    expect(buttonVariants({ variant, size })).toContain(marker);
  });
});
