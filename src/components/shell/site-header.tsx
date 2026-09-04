import { LuArrowUp } from "react-icons/lu";
import type { Locale } from "@/i18n/config";
import { Button } from "@/components/ui/button";
import { LocaleSwitcher } from "@/components/shell/locale-switcher";
import { MobileNavigation } from "@/components/shell/mobile-navigation";
import { ThemeToggle } from "@/components/shell/theme-toggle";
import { SITE_INTERACTION } from "@/components/shell/site-interaction-contract";

type SiteNavItem = { label: string; href: string };

type SiteHeaderLabels = {
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
    <header
      className="site-header sticky top-0 z-30"
      data-site-interaction={SITE_INTERACTION.header}
    >
      <a
        href="#main-content"
        className="fixed top-3 left-3 z-60 -translate-y-[200%] bg-[var(--cue-day)] px-4 py-3 font-bold text-[var(--cue-night)] focus-visible:translate-y-0 focus-visible:ring-2 focus-visible:ring-ring"
      >
        {labels.skipToContent}
      </a>
      <div className="content-shell flex min-h-19 items-center justify-between gap-4">
        <a href={`/${locale}`} className="site-wordmark">
          INDRA<span>.</span>DEV
        </a>
        <nav aria-label={labels.primaryNav} className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="site-nav-link inline-flex min-h-11 items-center border-b border-transparent px-[0.7rem] py-[0.8rem] font-mono text-[0.66rem] tracking-[0.09em] text-muted-foreground no-underline uppercase transition-[color,border-color] duration-[var(--motion-fast)] ease-[ease] hover:border-[var(--cue-rose)] hover:text-foreground focus-visible:border-[var(--cue-rose)] focus-visible:text-foreground"
              data-site-interaction={SITE_INTERACTION.activeNavLink}
              suppressHydrationWarning
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-[0.2rem]">
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
          data-site-interaction={SITE_INTERACTION.scrollToTop}
          suppressHydrationWarning
          className="scroll-to-top fixed right-[max(1rem,calc((100vw-var(--content-max))/2))] bottom-4 z-25 transition-[opacity,visibility,transform] duration-[var(--motion-fast)] ease-[ease]"
        >
          <LuArrowUp aria-hidden="true" className="size-4" />
        </Button>
      </div>
    </header>
  );
}
