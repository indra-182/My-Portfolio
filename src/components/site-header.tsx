import { LuArrowUp } from "react-icons/lu";
import type { Locale } from "@/i18n/config";
import { Button } from "@/components/ui/button";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { MobileNavigation } from "@/components/mobile-navigation";
import { ThemeToggle } from "@/components/theme-toggle";

export type SiteNavItem = { label: string; href: string };

export type SiteHeaderLabels = {
  skipToContent: string;
  primaryNav: string;
  themeToggle: string;
  switchLanguage: string;
  scrollToTop: string;
  languageNames: Record<Locale, string>;
  mobileNavDescription: string;
  mobileNavLabel: string;
  openMenu: string;
  closeMenu: string;
};

export function SiteHeader({
  locale,
  navItems,
  labels,
}: {
  locale: Locale;
  navItems: SiteNavItem[];
  labels: SiteHeaderLabels;
}) {
  return (
    <header className="site-header">
      <a href="#main-content" className="skip-link">
        {labels.skipToContent}
      </a>
      <div className="content-shell site-header-inner">
        <a href={`/${locale}`} className="site-wordmark">
          INDRA<span>.</span>DEV
        </a>
        <nav aria-label={labels.primaryNav} className="site-nav">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="site-nav-link">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="site-controls">
          <LocaleSwitcher
            locale={locale}
            labelTemplate={labels.switchLanguage}
            languageNames={labels.languageNames}
          />
          <ThemeToggle label={labels.themeToggle} />
          <MobileNavigation
            items={navItems}
            id={`mobile-navigation-${locale}`}
            description={labels.mobileNavDescription}
            navLabel={labels.mobileNavLabel}
            openLabel={labels.openMenu}
            closeLabel={labels.closeMenu}
          />
        </div>
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label={labels.scrollToTop}
          title={labels.scrollToTop}
          data-scroll-to-top
          className="scroll-to-top"
          suppressHydrationWarning
        >
          <LuArrowUp aria-hidden="true" className="size-4" />
        </Button>
      </div>
    </header>
  );
}
