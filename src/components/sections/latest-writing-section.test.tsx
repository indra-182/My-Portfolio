import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { LatestWritingSection } from "./latest-writing-section";

const posts = [
  {
    title: "Designing resilient client state",
    slug: "resilient-client-state",
    description: "A practical guide to predictable UI state.",
    publishedAt: "2026-08-01T10:00:00.000Z",
    topics: ["React"],
    readingTimeMinutes: 6,
  },
  {
    title: "Type-safe boundaries",
    slug: "type-safe-boundaries",
    description: "How to keep data contracts explicit.",
    publishedAt: "2026-07-20T10:00:00.000Z",
    topics: ["TypeScript"],
    readingTimeMinutes: 4,
  },
  {
    title: "Shipping with confidence",
    slug: "shipping-with-confidence",
    description: "A small testing loop for frontend teams.",
    publishedAt: "2026-07-10T10:00:00.000Z",
    topics: ["Testing"],
    readingTimeMinutes: 5,
  },
  {
    title: "Fourth post",
    slug: "fourth-post",
    description: "This should not be rendered.",
    publishedAt: "2026-07-01T10:00:00.000Z",
    topics: ["React"],
    readingTimeMinutes: 3,
  },
];

const onePost = posts.slice(0, 1);
const twoPosts = posts.slice(0, 2);

describe("LatestWritingSection", () => {
  test("renders at most three article links when the feed is ready", () => {
    const { container } = render(
      <LatestWritingSection
        locale="id"
        blogUrl="https://blog.example"
        result={{ status: "ready", posts }}
      />,
    );

    expect(container.querySelector('[data-layout="grid"]')).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /designing resilient client state/i })).toHaveAttribute(
      "href",
      "https://blog.example/blog/resilient-client-state",
    );
    expect(screen.getByRole("link", { name: /visit blog/i })).toHaveAttribute(
      "href",
      "https://blog.example",
    );
    expect(screen.getAllByRole("article")).toHaveLength(3);
    expect(screen.getAllByRole("article")[0]).toHaveClass("relative");
    expect(screen.queryByText("Fourth post")).not.toBeInTheDocument();
  });

  test("uses a featured layout and editorial aside for one post", () => {
    const { container } = render(
      <LatestWritingSection
        locale="id"
        blogUrl="https://blog.example"
        result={{ status: "ready", posts: onePost }}
      />,
    );

    expect(container.querySelector('[data-layout="featured"]')).toBeInTheDocument();
    expect(screen.getAllByRole("article")).toHaveLength(1);
    expect(
      screen.getByRole("complementary", { name: /notes from the build loop/i }),
    ).toBeInTheDocument();
  });

  test("uses an even layout for two posts without an editorial aside", () => {
    const { container } = render(
      <LatestWritingSection
        locale="id"
        blogUrl="https://blog.example"
        result={{ status: "ready", posts: twoPosts }}
      />,
    );

    expect(container.querySelector('[data-layout="double"]')).toBeInTheDocument();
    expect(screen.getAllByRole("article")).toHaveLength(2);
    expect(screen.queryByRole("complementary")).not.toBeInTheDocument();
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
      "https://blog.example",
    );
    expect(screen.queryAllByRole("article")).toHaveLength(0);
  });
});
