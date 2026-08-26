import { siteConfig } from "@/lib/site-config";

const baseUrl = `${siteConfig.blogUrl}/`;

export const blog = {
  homeUrl: siteConfig.blogUrl,
  latestPostsUrl(limit: number) {
    const url = new URL("api/posts/latest", baseUrl);
    url.searchParams.set("limit", String(limit));
    return url.toString();
  },
  postUrl(slug: string) {
    return new URL(`blog/${slug}`, baseUrl).toString();
  },
};
