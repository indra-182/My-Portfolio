import { CapabilitiesSection } from "@/components/sections/capabilities-section";
import { CaseStudiesSection } from "@/components/sections/case-studies-section";
import { ContactSection } from "@/components/sections/contact-section";
import { HeroSection } from "@/components/sections/hero-section";
import { LatestWritingSection } from "@/components/sections/latest-writing-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, type Locale } from "@/i18n/config";
import { getPortfolio } from "@/lib/get-portfolio";
import { getLatestPosts } from "@/lib/latest-posts";
import { siteConfig } from "@/lib/site-config";

export default async function PortfolioPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: value } = await params;
  if (!isLocale(value)) notFound();
  const locale: Locale = value;
  const portfolio = getPortfolio(locale);
  const dictionary = await getDictionary(locale);
  const latestWriting = await getLatestPosts(locale, siteConfig.blogUrl);

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
      <LatestWritingSection
        locale={locale}
        result={latestWriting}
        blogUrl={siteConfig.blogUrl}
        copy={dictionary.writing}
      />
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
