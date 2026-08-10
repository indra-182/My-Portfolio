import { z } from "zod";

const siteConfigSchema = z.object({
  portfolioUrl: z.string().url(),
  blogUrl: z.string().url(),
  email: z.string().email(),
  linkedinUrl: z.string().url(),
  cvHref: z.string().startsWith("/"),
});

export const siteConfig = siteConfigSchema.parse({
  portfolioUrl: process.env.NEXT_PUBLIC_PORTFOLIO_URL ?? "http://localhost:3000",
  blogUrl: process.env.NEXT_PUBLIC_BLOG_URL ?? "http://localhost:3001",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@example.invalid",
  linkedinUrl:
    process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "https://www.linkedin.com/in/mahadiindra182/",
  cvHref: "/documents/mahadi-indra-cv.pdf",
});

export type SiteConfig = typeof siteConfig;
