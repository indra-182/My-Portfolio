import { describe, expect, test } from "vitest";
import { blog, normalizeBlogUrl } from "./blog";

describe("blog URL contract", () => {
  test("owns home, feed, and article routes", () => {
    expect(blog.homeUrl).toBe("https://blog-indra.vercel.app");
    expect(blog.latestPostsUrl(3)).toBe("https://blog-indra.vercel.app/api/posts/latest?limit=3");
    expect(blog.postUrl("resilient-client-state")).toBe(
      "https://blog-indra.vercel.app/blog/resilient-client-state",
    );
  });
});

describe("blog origin configuration", () => {
  test.each([
    ["https://example.com/", "https://example.com"],
    ["http://localhost:3001", "http://localhost:3001"],
    ["not-a-url", null],
    ["javascript:alert(1)", null],
    ["https://example.com/path", null],
    ["https://example.com/?redirect=elsewhere", null],
    ["https://user:password@example.com", null],
  ])("normalizes %s safely", (value, expected) => {
    expect(normalizeBlogUrl(value)).toBe(expected);
  });
});
