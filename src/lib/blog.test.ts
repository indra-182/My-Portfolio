import { describe, expect, test } from "vitest";
import { blog } from "./blog";

describe("blog URL contract", () => {
  test("owns home, feed, and article routes", () => {
    expect(blog.homeUrl).toBe("https://blog-indra.vercel.app");
    expect(blog.latestPostsUrl(3)).toBe("https://blog-indra.vercel.app/api/posts/latest?limit=3");
    expect(blog.postUrl("resilient-client-state")).toBe(
      "https://blog-indra.vercel.app/blog/resilient-client-state",
    );
  });
});
