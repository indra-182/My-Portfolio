import { portfolioByLocale } from "@/content/portfolio";
import { CapabilitiesSection } from "@/components/sections/capabilities-section";
import { ExperiencesSection } from "@/components/sections/experiences/experiences-section";
import { HeroSection } from "@/components/sections/hero/hero-section";
import {
  LatestWriting,
  LatestWritingLoading,
} from "@/components/sections/writing/latest-writing-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { Suspense } from "react";
import { getDictionary } from "@/i18n/dictionaries";
import { requireLocale } from "@/i18n/route-locale";
import { siteConfig } from "@/lib/site-config";
import { getLatestPosts } from "@/lib/latest-posts";

export default async function PortfolioPage({ params }: { params: Promise<{ locale: string }> }) {
  const latestPosts = getLatestPosts();
  const { locale: value } = await params;
  const locale = requireLocale(value);
  const portfolio = portfolioByLocale[locale];
  const dictionary = getDictionary(locale);

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: portfolio.profile.name,
    jobTitle: portfolio.profile.role,
    address: {
      "@type": "PostalAddress",
      addressLocality: portfolio.profile.location.locality,
      addressCountry: portfolio.profile.location.countryCode,
    },
    url: `${siteConfig.portfolioUrl}/${locale}`,
    sameAs: [siteConfig.linkedinUrl],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <HeroSection
        profile={portfolio.profile}
        emailLabel={dictionary.navigation.email}
        email={siteConfig.email}
        downloadLabel={dictionary.navigation.downloadCv}
        cvHref={siteConfig.cvHref}
      />
      <CapabilitiesSection
        capabilities={portfolio.capabilities}
        heading={dictionary.portfolio.capabilitiesHeading}
      />
      <ExperiencesSection experiences={portfolio.experiences} copy={dictionary.portfolio} />
      <TestimonialsSection testimonials={portfolio.testimonials} copy={dictionary.testimonials} />
      <Suspense fallback={<LatestWritingLoading copy={dictionary.writing} />}>
        <LatestWriting locale={locale} copy={dictionary.writing} result={latestPosts} />
      </Suspense>
    </>
  );
}
