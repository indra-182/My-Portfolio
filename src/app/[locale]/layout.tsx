import type { Metadata } from "next";
import { portfolioByLocale } from "@/content/portfolio";
import { SiteFooter } from "@/components/shell/site-footer";
import { SiteHeader } from "@/components/shell/site-header";
import { SiteInteractions } from "@/components/shell/site-interactions";
import { getDictionary } from "@/i18n/dictionaries";
import { defaultLocale, locales } from "@/i18n/config";
import { requireLocale } from "@/i18n/route-locale";
import { blog } from "@/lib/blog";
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
  const locale = requireLocale(value);
  const dictionary = getDictionary(locale);
  const portfolio = portfolioByLocale[locale];
  const title = `${portfolio.profile.role}: ${portfolio.profile.name}`;
  const description = portfolio.profile.valueProposition;

  return {
    metadataBase: new URL(siteConfig.portfolioUrl),
    title,
    description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ...Object.fromEntries(locales.map((item) => [item, `/${item}`])),
        "x-default": `/${defaultLocale}`,
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
  const locale = requireLocale(value);
  const dictionary = getDictionary(locale);
  const portfolio = portfolioByLocale[locale];
  const navItems = [
    { label: dictionary.navigation.capabilities, href: `/${locale}#capabilities` },
    { label: dictionary.navigation.experiences, href: `/${locale}#experiences` },
    { label: dictionary.navigation.content, href: `/${locale}#writing` },
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
              scrollToTop: dictionary.actions.scrollToTop,
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
            blogUrl={blog.homeUrl}
            githubUrl={siteConfig.githubUrl}
            email={siteConfig.email}
            linkedinUrl={siteConfig.linkedinUrl}
            identity={portfolio.profile}
            copy={dictionary.footer}
          />
        </div>
      </body>
    </html>
  );
}
