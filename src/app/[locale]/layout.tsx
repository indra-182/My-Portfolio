import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n/dictionaries";
import { defaultLocale, isLocale, locales, type Locale } from "@/i18n/config";
import { siteConfig } from "@/lib/site-config";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

type LocaleParams = { locale: string };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<LocaleParams>;
}): Promise<Metadata> {
  const { locale: value } = await params;
  const locale: Locale = isLocale(value) ? value : defaultLocale;
  const dictionary = await getDictionary(locale);
  const title = `INDRA.DEV — Mahadi Indra Manurung`;
  const description =
    locale === "id"
      ? "Portfolio Mahadi Indra Manurung, Senior Frontend Engineer dari Indonesia."
      : "The portfolio of Mahadi Indra Manurung, a Senior Frontend Engineer from Indonesia.";

  return {
    metadataBase: new URL(siteConfig.portfolioUrl),
    title,
    description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        id: "/id",
        en: "/en",
        "x-default": "/id",
      },
    },
    openGraph: {
      type: "website",
      title,
      description,
      url: `/${locale}`,
      siteName: "INDRA.DEV",
      locale: locale === "id" ? "id_ID" : "en_US",
    },
    other: { "content-language": locale, "x-site-label": dictionary.navigation.portfolio },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<LocaleParams> }>) {
  const { locale: value } = await params;
  if (!isLocale(value)) notFound();
  const locale = value;
  const dictionary = await getDictionary(locale);
  const navItems = [
    { label: dictionary.navigation.about, href: `/${locale}#about` },
    { label: dictionary.navigation.experience, href: `/${locale}#experience` },
    { label: dictionary.navigation.writing, href: `/${locale}#writing` },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader
        locale={locale}
        portfolioUrl={siteConfig.portfolioUrl}
        blogUrl={siteConfig.blogUrl}
        email={siteConfig.email}
        linkedinUrl={siteConfig.linkedinUrl}
        navItems={navItems}
      />
      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
        {children}
      </main>
      <SiteFooter
        locale={locale}
        portfolioUrl={siteConfig.portfolioUrl}
        blogUrl={siteConfig.blogUrl}
        email={siteConfig.email}
        linkedinUrl={siteConfig.linkedinUrl}
      />
    </div>
  );
}
