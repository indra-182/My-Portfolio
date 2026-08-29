export const blogUrl = (
  process.env.NEXT_PUBLIC_BLOG_URL ?? "https://blog-indra.vercel.app/"
).replace(/\/$/, "");
