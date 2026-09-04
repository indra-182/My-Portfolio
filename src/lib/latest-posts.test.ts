import { afterEach, describe, expect, test, vi } from "vitest";
import { getLatestPosts } from "./latest-posts";

const feed = {
  version: 1,
  generatedAt: "2026-08-10T15:04:01.766Z",
  posts: [
    {
      title: "Optimistic UI Tanpa Library Form",
      slug: "optimistic-ui-server-actions",
      description: "Pola useOptimistic dengan Server Actions untuk antarmuka yang terasa instan.",
      publishedAt: "2026-08-10T20:00:00+07:00",
      topics: ["React", "Next.js"],
      readingTimeMinutes: 3,
    },
    {
      title: "Type-safe boundaries",
      slug: "type-safe-boundaries",
      description: "How to keep data contracts explicit.",
      publishedAt: "2026-07-20T10:00:00+07:00",
      topics: ["TypeScript"],
      readingTimeMinutes: 4,
    },
    {
      title: "Shipping with confidence",
      slug: "shipping-with-confidence",
      description: "A small testing loop for frontend teams.",
      publishedAt: "2026-07-10T10:00:00+07:00",
      topics: ["Testing"],
      readingTimeMinutes: 5,
    },
    {
      title: "Fourth post",
      slug: "fourth-post",
      description: "This post is beyond the adapter limit.",
      publishedAt: "2026-07-01T10:00:00+07:00",
      topics: ["React"],
      readingTimeMinutes: 3,
    },
  ],
};

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("getLatestPosts", () => {
  test("returns the blog's latest posts from the validated API response", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => feed });
    vi.stubGlobal("fetch", fetchMock);

    const result = await getLatestPosts();

    expect(result).toEqual({ status: "ready", posts: feed.posts.slice(0, 3) });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://blog-indra.vercel.app/api/posts/latest?limit=3",
      {
        next: { revalidate: 3600 },
        signal: expect.any(AbortSignal),
      },
    );
  });

  test("returns the unavailable fallback when the blog API fails or returns invalid data", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, json: async () => ({}) }));

    await expect(getLatestPosts()).resolves.toEqual({
      status: "unavailable",
    });

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, json: async () => ({ version: 1 }) }),
    );

    await expect(getLatestPosts()).resolves.toEqual({
      status: "unavailable",
    });
  });

  test("returns the unavailable fallback for duplicate or unsafe post slugs", async () => {
    const duplicateSlugFeed = structuredClone(feed);
    duplicateSlugFeed.posts[1].slug = duplicateSlugFeed.posts[0].slug;
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, json: async () => duplicateSlugFeed }),
    );

    await expect(getLatestPosts()).resolves.toEqual({ status: "unavailable" });

    const unsafeSlugFeed = structuredClone(feed);
    unsafeSlugFeed.posts[0].slug = "../admin";
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, json: async () => unsafeSlugFeed }),
    );

    await expect(getLatestPosts()).resolves.toEqual({ status: "unavailable" });
  });

  test("returns the unavailable fallback when the blog API exceeds its deadline", async () => {
    const controller = new AbortController();
    const timeoutSpy = vi.spyOn(AbortSignal, "timeout").mockReturnValue(controller.signal);
    vi.stubGlobal(
      "fetch",
      vi.fn().mockImplementation((_url: string, init: RequestInit) => {
        return new Promise((_resolve, reject) => {
          init.signal?.addEventListener("abort", () => reject(init.signal?.reason), { once: true });
        });
      }),
    );

    const result = getLatestPosts();
    controller.abort();

    await expect(result).resolves.toEqual({ status: "unavailable" });
    expect(timeoutSpy).toHaveBeenCalledWith(2000);
  });
});
