import { afterEach, describe, expect, test, vi } from "vitest";
import { getLatestPosts } from "./latest-posts";

const feed = {
  version: 1,
  locale: "id",
  generatedAt: "2026-08-10T15:04:01.766Z",
  posts: [
    {
      title: "Optimistic UI Tanpa Library Form",
      slug: "optimistic-ui-server-actions",
      description: "Pola useOptimistic dengan Server Actions untuk antarmuka yang terasa instan.",
      locale: "id",
      publishedAt: "2026-08-10T20:00:00+07:00",
      topics: ["React", "Next.js"],
      readingTimeMinutes: 3,
    },
  ],
};

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("getLatestPosts", () => {
  test("returns the blog's latest posts from the validated API response", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => feed });
    vi.stubGlobal("fetch", fetchMock);

    const result = await getLatestPosts("id", "https://blog.example");

    expect(result).toEqual({ status: "ready", posts: feed.posts });
    expect(fetchMock).toHaveBeenCalledWith("https://blog.example/api/posts/latest?locale=id&limit=3", {
      next: { revalidate: 3600 },
    });
  });

  test("returns the unavailable fallback when the blog API fails or returns invalid data", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, json: async () => ({}) }));

    await expect(getLatestPosts("id", "https://blog.example")).resolves.toEqual({ status: "unavailable" });

    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => ({ version: 1 }) }));

    await expect(getLatestPosts("id", "https://blog.example")).resolves.toEqual({ status: "unavailable" });
  });
});
