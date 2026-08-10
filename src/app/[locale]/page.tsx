import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AboutSection } from "@/components/sections/about-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { HeroSection } from "@/components/sections/hero-section";
import { LatestWritingSection } from "@/components/sections/latest-writing-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { getPortfolio } from "@/lib/get-portfolio";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, type Locale } from "@/i18n/config";
import { siteConfig } from "@/lib/site-config";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: value } = await params;
  if (!isLocale(value)) return {};
  const portfolio = getPortfolio(value);

  return {
    title: `${portfolio.profile.role} — ${portfolio.profile.name}`,
    description: portfolio.profile.valueProposition,
  };
}

export default async function PortfolioPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: value } = await params;
  if (!isLocale(value)) notFound();
  const locale: Locale = value;
  const portfolio = getPortfolio(locale);
  const dictionary = await getDictionary(locale);

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: portfolio.profile.name,
    jobTitle: portfolio.profile.role,
    address: { "@type": "PostalAddress", addressLocality: "Jakarta", addressCountry: "ID" },
    url: `${siteConfig.portfolioUrl}/${locale}`,
    sameAs: [siteConfig.linkedinUrl],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <HeroSection
        profile={portfolio.profile}
        downloadLabel={dictionary.navigation.downloadCv}
        cvHref={siteConfig.cvHref}
        writingLabel={dictionary.navigation.writing}
      />
      <AboutSection about={portfolio.about} eyebrow={dictionary.portfolio.aboutEyebrow} />
      <ExperienceSection
        experiences={portfolio.experiences}
        eyebrow={dictionary.portfolio.experienceEyebrow}
        technologiesLabel={dictionary.portfolio.technologies}
        roleLabel={dictionary.portfolio.role}
        periodLabel={dictionary.portfolio.period}
      />
      <TestimonialsSection testimonials={portfolio.testimonials} />
      <LatestWritingSection locale={locale} result={{ status: "unavailable" }} blogUrl={siteConfig.blogUrl} />
    </>
  );
}
