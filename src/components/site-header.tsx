import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
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
    <header className="border-b border-border bg-background">
      <a
        href="#main-content"
        className="sr-only fixed left-4 top-4 z-50 rounded-md bg-accent px-4 py-3 font-medium text-accent-foreground focus:not-sr-only focus:outline-none focus:ring-2 focus:ring-ring"
      >
        {labels.skipToContent}
      </a>
      <div className="content-shell flex min-h-18 items-center justify-between gap-4">
        <a
          href={`/${locale}`}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "shrink-0 rounded-none px-0 font-mono text-sm font-bold tracking-[0.2em]",
          )}
        >
          INDRA<span className="text-accent">.</span>DEV
        </a>
        <nav aria-label={labels.primaryNav} className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={item.active ? "page" : undefined}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "rounded-none border-b-2 border-transparent px-3 py-6 text-sm",
                item.active ? "border-accent text-foreground" : "text-muted-foreground",
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
