const homeUrl = (process.env.NEXT_PUBLIC_BLOG_URL ?? "https://blog-indra.vercel.app/").replace(
  /\/$/,
  "",
);
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
