const defaultBlogUrl = "https://blog-indra.vercel.app";

export function normalizeBlogUrl(value: string): string | null {
  try {
    const url = new URL(value);
    if (
      !["https:", "http:"].includes(url.protocol) ||
      url.username ||
      url.password ||
      url.pathname !== "/" ||
      url.search ||
      url.hash
    ) {
      return null;
    }

    return url.origin;
  } catch {
    return null;
  }
}

const homeUrl =
  normalizeBlogUrl(process.env.NEXT_PUBLIC_BLOG_URL ?? defaultBlogUrl) ?? defaultBlogUrl;
const baseUrl = `${homeUrl}/`;

export const blog = {
  homeUrl,
  latestPostsUrl(limit: number) {
    const url = new URL("api/posts/latest", baseUrl);
    url.searchParams.set("limit", String(limit));
    return url.toString();
  },
  postUrl(slug: string) {
    return new URL(`blog/${slug}`, baseUrl).toString();
  },
};
