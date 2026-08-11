import type { Locale } from "@/i18n/config";

export type LatestPostSummary = {
  title: string;
  slug: string;
  description: string;
  publishedAt: string;
  topics: string[];
  readingTimeMinutes: number;
};

export type LatestFeedResult =
  { status: "ready"; posts: LatestPostSummary[] } | { status: "unavailable" };
