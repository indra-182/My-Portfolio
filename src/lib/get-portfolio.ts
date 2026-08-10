import { PortfolioContentSchema, type PortfolioContent } from "@/content/portfolio-schema";
import { portfolioByLocale } from "@/content/portfolio";
import type { Locale } from "@/i18n/config";

export function getPortfolio(locale: Locale): PortfolioContent {
  return PortfolioContentSchema.parse(portfolioByLocale[locale]);
}
