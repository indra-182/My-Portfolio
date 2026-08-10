import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { LatestWritingSection } from "./latest-writing-section";

const posts = [
  {
    title: "Designing resilient client state",
    slug: "resilient-client-state",
    description: "A practical guide to predictable UI state.",
    locale: "id" as const,
    publishedAt: "2026-08-01T10:00:00.000Z",
    topics: ["React"],
    readingTimeMinutes: 6,
  },
  {
    title: "Type-safe boundaries",
    slug: "type-safe-boundaries",
    description: "How to keep data contracts explicit.",
    locale: "id" as const,
    publishedAt: "2026-07-20T10:00:00.000Z",
    topics: ["TypeScript"],
    readingTimeMinutes: 4,
  },
  {
    title: "Shipping with confidence",
    slug: "shipping-with-confidence",
    description: "A small testing loop for frontend teams.",
    locale: "id" as const,
    publishedAt: "2026-07-10T10:00:00.000Z",
    topics: ["Testing"],
    readingTimeMinutes: 5,
  },
  {
    title: "Fourth post",
    slug: "fourth-post",
    description: "This should not be rendered.",
    locale: "id" as const,
    publishedAt: "2026-07-01T10:00:00.000Z",
    topics: ["React"],
    readingTimeMinutes: 3,
  },
];

describe("LatestWritingSection", () => {
  test("renders at most three article links when the feed is ready", () => {
    render(
      <LatestWritingSection
        locale="id"
        blogUrl="https://blog.example"
        result={{ status: "ready", posts }}
      />,
    );

    expect(screen.getByRole("link", { name: /designing resilient client state/i })).toHaveAttribute(
      "href",
      "https://blog.example/id/resilient-client-state",
    );
    expect(screen.getAllByRole("article")).toHaveLength(3);
    expect(screen.queryByText("Fourth post")).not.toBeInTheDocument();
  });

  test("renders a direct blog link instead of an empty grid when unavailable", () => {
    render(
      <LatestWritingSection
        locale="en"
        blogUrl="https://blog.example"
        result={{ status: "unavailable" }}
      />,
    );

    expect(screen.getByRole("link", { name: /visit blog/i })).toHaveAttribute(
      "href",
      "https://blog.example/en",
    );
    expect(screen.queryAllByRole("article")).toHaveLength(0);
  });
});
