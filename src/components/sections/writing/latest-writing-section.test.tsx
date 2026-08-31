import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { getDictionary } from "@/i18n/dictionaries";
import { LatestWritingLoading, LatestWritingSection } from "./latest-writing-section";

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
  test("renders every post from an already-bounded feed", () => {
    const dictionary = getDictionary("id");
    const { container } = render(
      <LatestWritingSection
        locale="id"
        result={{ status: "ready", posts: posts.slice(0, 3) }}
        copy={dictionary.writing}
      />,
    );
    expect(container.querySelector("#writing")).toBeInTheDocument();

    expect(container.querySelector('[data-count="3"]')).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /designing resilient client state/i })).toHaveAttribute(
      "href",
      "https://blog-indra.vercel.app/blog/resilient-client-state",
    );
    expect(screen.getByRole("link", { name: dictionary.writing.visitBlog })).toHaveAttribute(
      "href",
      "https://blog-indra.vercel.app",
    );
    expect(screen.getByText("6 menit baca")).toBeInTheDocument();
    expect(screen.getAllByRole("article")).toHaveLength(3);
    expect(screen.getByText("Shipping with confidence")).toBeInTheDocument();
  });

  test("uses a featured layout and editorial aside for one post", () => {
    const dictionary = getDictionary("id");
    const { container } = render(
      <LatestWritingSection
        locale="id"
        result={{ status: "ready", posts: onePost }}
        copy={dictionary.writing}
      />,
    );

    expect(container.querySelector('[data-count="1"]')).toBeInTheDocument();
    expect(screen.getAllByRole("article")).toHaveLength(1);
    expect(
      screen.getByRole("complementary", { name: dictionary.writing.asideHeading }),
    ).toBeInTheDocument();
  });

  test("uses an even layout for two posts without an editorial aside", () => {
    const dictionary = getDictionary("id");
    const { container } = render(
      <LatestWritingSection
        locale="id"
        result={{ status: "ready", posts: twoPosts }}
        copy={dictionary.writing}
      />,
    );

    expect(container.querySelector('[data-count="2"]')).toBeInTheDocument();
    expect(screen.getAllByRole("article")).toHaveLength(2);
    expect(screen.queryByRole("complementary")).not.toBeInTheDocument();
  });

  test("renders a direct blog link instead of an empty grid when unavailable", () => {
    const dictionary = getDictionary("en");
    const { container } = render(
      <LatestWritingSection
        locale="en"
        result={{ status: "unavailable" }}
        copy={dictionary.writing}
      />,
    );
    expect(container.querySelector("#writing")).toBeInTheDocument();

    expect(screen.getByRole("link", { name: /visit blog/i })).toHaveAttribute(
      "href",
      "https://blog-indra.vercel.app",
    );
    expect(screen.getByText(dictionary.writing.unavailable)).toBeInTheDocument();
    expect(screen.queryAllByRole("article")).toHaveLength(0);
  });

  test("renders a stable non-interactive shell while the feed streams", () => {
    const dictionary = getDictionary("en");
    const { container } = render(<LatestWritingLoading copy={dictionary.writing} />);

    expect(screen.getByRole("heading", { name: dictionary.writing.heading })).toBeVisible();
    expect(container.querySelector("#writing")).toHaveAttribute("aria-busy", "true");
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(screen.queryByRole("article")).not.toBeInTheDocument();
  });
});
