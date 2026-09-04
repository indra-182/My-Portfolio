import { z } from "zod";
import { blog } from "@/lib/blog";

const latestPostSchema = z.object({
  title: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description: z.string().min(1),
  publishedAt: z.string().datetime({ offset: true }),
  topics: z.array(z.string().min(1)).min(1),
  readingTimeMinutes: z.number().int().positive(),
});
type LatestPostSummary = z.infer<typeof latestPostSchema>;

export type LatestFeedResult =
  { status: "ready"; posts: LatestPostSummary[] } | { status: "unavailable" };

const latestPostFeedSchema = z
  .object({
    version: z.literal(1),
    generatedAt: z.string().datetime({ offset: true }),
    posts: z.array(latestPostSchema),
  })
  .superRefine((feed, context) => {
    const slugs = new Set<string>();

    feed.posts.forEach((post, index) => {
      if (slugs.has(post.slug)) {
        context.addIssue({
          code: "custom",
          path: ["posts", index, "slug"],
          message: "Post slugs must be unique.",
        });
      }
      slugs.add(post.slug);
    });
  });

const latestPostsLimit = 3;
const latestPostsRevalidateSeconds = 3600;
const latestPostsTimeoutMs = 2000;

export async function getLatestPosts(): Promise<LatestFeedResult> {
  const endpoint = blog.latestPostsUrl(latestPostsLimit);

  try {
    const response = await fetch(endpoint, {
      next: { revalidate: latestPostsRevalidateSeconds },
      signal: AbortSignal.timeout(latestPostsTimeoutMs),
    });
    if (!response.ok) return { status: "unavailable" };

    const feed = latestPostFeedSchema.parse(await response.json());

    return {
      status: "ready",
      posts: feed.posts.slice(0, latestPostsLimit),
    };
  } catch {
    return { status: "unavailable" };
  }
}
