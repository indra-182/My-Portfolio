import { z } from "zod";
import { locales, type Locale } from "@/i18n/config";
import type { LatestFeedResult } from "@/types/latest-post";

const latestPostSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  publishedAt: z.string().datetime({ offset: true }),
  topics: z.array(z.string().min(1)).min(1),
  readingTimeMinutes: z.number().int().positive(),
});

const latestPostFeedSchema = z.object({
  version: z.literal(1),
  generatedAt: z.string().datetime({ offset: true }),
  posts: z.array(latestPostSchema),
});

const latestPostsLimit = 3;
const latestPostsRevalidateSeconds = 3600;

export async function getLatestPosts(locale: Locale, blogUrl: string): Promise<LatestFeedResult> {
  const endpoint = new URL("/api/posts/latest", `${blogUrl}/`);
  endpoint.searchParams.set("limit", String(latestPostsLimit));

  try {
    const response = await fetch(endpoint.toString(), {
      next: { revalidate: latestPostsRevalidateSeconds },
    });
    if (!response.ok) return { status: "unavailable" };

    const feed = latestPostFeedSchema.parse(await response.json());

    return {
      status: "ready",
      posts: feed.posts,
    };
  } catch {
    return { status: "unavailable" };
  }
}
