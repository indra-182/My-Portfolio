import { z } from "zod";

const noTrailingSlash = (url: string) => url.replace(/\/$/, "");

const siteConfigSchema = z.object({
  portfolioUrl: z.string().url().transform(noTrailingSlash),
  blogUrl: z.string().url().transform(noTrailingSlash),
  email: z.string().email(),
  linkedinUrl: z.string().url().transform(noTrailingSlash),
  githubUrl: z.string().url().transform(noTrailingSlash),
  cvHref: z.string().startsWith("/"),
});

export const siteConfig = siteConfigSchema.parse({
  portfolioUrl: process.env.NEXT_PUBLIC_PORTFOLIO_URL ?? "https://portfolio-indradev.vercel.app/",
  blogUrl: process.env.NEXT_PUBLIC_BLOG_URL ?? "https://blog-indra.vercel.app/",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "mahadiindra2@gmail.com",
  linkedinUrl:
    process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "https://www.linkedin.com/in/mahadiindra182/",
  githubUrl: process.env.NEXT_PUBLIC_GITHUB_URL ?? "https://github.com/indra-182",
  cvHref: "/documents/mahadi-indra-cv.pdf",
});

export type SiteConfig = typeof siteConfig;
