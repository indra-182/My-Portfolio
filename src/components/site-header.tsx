import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { MobileNavigation } from "@/components/mobile-navigation";
import { ThemeToggle } from "@/components/theme-toggle";

export type SiteNavItem = { label: string; href: string; active?: boolean };

export type SiteHeaderLabels = {
  skipToContent: string;
  primaryNav: string;
  themeToggle: string;
  switchLanguage: string;
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
    <header className="border-b border-border/80 bg-background/95 supports-[backdrop-filter]:backdrop-blur-sm">
      <a
        href="#main-content"
        className="sr-only fixed left-4 top-4 z-50 rounded-md bg-accent px-4 py-3 font-medium text-accent-foreground focus:not-sr-only focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)]"
      >
        {labels.skipToContent}
      </a>
      <div className="content-shell flex min-h-18 items-center justify-between gap-6">
        <a href={`/${locale}`} className="shrink-0 font-mono text-sm font-bold tracking-[0.2em]">
          INDRA<span className="text-accent">.</span>DEV
        </a>
        <nav aria-label={labels.primaryNav} className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={item.active ? "page" : undefined}
              className={cn(
                "border-b-2 py-6 text-sm transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]",
                item.active
                  ? "border-accent font-semibold"
                  : "border-transparent text-muted-foreground",
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <LocaleSwitcher
            locale={locale}
            targetPath={`/${locale}`}
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
      </div>
    </header>
  );
}
