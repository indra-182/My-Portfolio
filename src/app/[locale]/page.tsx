import { CapabilitiesSection } from "@/components/sections/capabilities-section";
import { CaseStudiesSection } from "@/components/sections/case-studies-section";
import { ContactSection } from "@/components/sections/contact-section";
import { HeroSection } from "@/components/sections/hero-section";
import { LatestWriting, LatestWritingLoading } from "@/components/sections/latest-writing-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { Suspense } from "react";
import { getDictionary } from "@/i18n/dictionaries";
import { requireLocale } from "@/i18n/route-locale";
import { getPortfolio } from "@/lib/get-portfolio";
import { siteConfig } from "@/lib/site-config";

export default async function PortfolioPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: value } = await params;
  const locale = requireLocale(value);
  const portfolio = getPortfolio(locale);
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
      <CaseStudiesSection
        experiences={portfolio.experiences}
        heading={dictionary.portfolio.caseStudiesHeading}
        description={dictionary.portfolio.caseStudiesDescription}
        labels={{
          problem: dictionary.portfolio.problemLabel,
          ownership: dictionary.portfolio.ownershipLabel,
          delivery: dictionary.portfolio.deliveryLabel,
          outcome: dictionary.portfolio.outcomeLabel,
        }}
        technologiesLabel={dictionary.portfolio.technologies}
        roleLabel={dictionary.portfolio.role}
        periodLabel={dictionary.portfolio.period}
        featuredLabel={dictionary.portfolio.featuredLabel}
        secondaryLabel={dictionary.portfolio.secondaryLabel}
        openDetails={dictionary.portfolio.openDetails}
        closeDetails={dictionary.portfolio.closeDetails}
      />
      <TestimonialsSection
        testimonials={portfolio.testimonials}
        heading={dictionary.testimonials.heading}
        collaboratorLabel={dictionary.testimonials.collaboratorLabel}
        mentoringLabel={dictionary.testimonials.mentoringLabel}
      />
      <Suspense fallback={<LatestWritingLoading copy={dictionary.writing} />}>
        <LatestWriting locale={locale} copy={dictionary.writing} />
      </Suspense>
      <ContactSection
        heading={dictionary.contact.heading}
        description={dictionary.contact.description}
        emailLabel={dictionary.contact.email}
        email={siteConfig.email}
        linkedinLabel={dictionary.contact.linkedin}
        linkedinUrl={siteConfig.linkedinUrl}
        cvLabel={dictionary.contact.cv}
        cvHref={siteConfig.cvHref}
      />
    </>
  );
}
