import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SiteInteractions } from "@/components/site-interactions";
import { getDictionary } from "@/i18n/dictionaries";
import { defaultLocale, isLocale, locales, type Locale } from "@/i18n/config";
import { getPortfolio } from "@/lib/get-portfolio";
import { siteConfig } from "@/lib/site-config";
import "../globals.css";

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
  const portfolio = getPortfolio(locale);
  const title = `${portfolio.profile.role}: ${portfolio.profile.name}`;
  const description = portfolio.profile.valueProposition;

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
    <html lang={locale} className="dark" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <SiteInteractions />
      </head>
      <body className="min-h-screen">
        <div className="flex min-h-screen flex-col">
          <SiteHeader
            locale={locale}
            navItems={navItems}
            labels={{
              skipToContent: dictionary.actions.skipToContent,
              primaryNav: dictionary.navigation.primaryLabel,
              themeToggle: dictionary.theme.label,
              switchLanguage: dictionary.actions.switchLanguage,
              languageNames: dictionary.actions.languageNames,
              mobileNavDescription: dictionary.mobileNavigation.description,
              mobileNavLabel: dictionary.mobileNavigation.navLabel,
              openMenu: dictionary.mobileNavigation.open,
              closeMenu: dictionary.mobileNavigation.close,
            }}
          />
          <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
            {children}
          </main>
          <SiteFooter
            locale={locale}
            blogUrl={siteConfig.blogUrl}
            githubUrl={siteConfig.githubUrl}
            email={siteConfig.email}
            linkedinUrl={siteConfig.linkedinUrl}
            labels={{
              navigationLabel: dictionary.footer.navigationLabel,
              description: dictionary.footer.description,
              blog: dictionary.footer.blog,
              github: dictionary.footer.github,
              linkedin: dictionary.footer.linkedin,
              email: dictionary.footer.email,
              location: dictionary.footer.location,
              rights: dictionary.footer.rights,
            }}
          />
        </div>
      </body>
    </html>
  );
}
