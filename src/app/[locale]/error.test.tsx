import { render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { getDictionary } from "@/i18n/dictionaries";
import { blog } from "@/lib/blog";
import ErrorBoundary from "./error";

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
}));

const mockedUsePathname = vi.mocked(usePathname);

describe("localized error boundary", () => {
  beforeEach(() => {
    mockedUsePathname.mockReset();
  });

  test.each([
    ["/id", "id"],
    ["/en", "en"],
    ["/fr", "id"],
  ] as const)("uses recovery copy for %s", (pathname, locale) => {
    mockedUsePathname.mockReturnValue(pathname);
    const reset = vi.fn();
    const copy = getDictionary(locale).errors;

    render(<ErrorBoundary error={new Error("test")} reset={reset} />);

    expect(screen.getByRole("heading", { name: copy.title })).toBeVisible();
    expect(screen.getByRole("link", { name: copy.blog })).toHaveAttribute("href", blog.homeUrl);
    screen.getByRole("button", { name: copy.retry }).click();
    expect(reset).toHaveBeenCalledOnce();
  });
});
