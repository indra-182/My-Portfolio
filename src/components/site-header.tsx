import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { MobileNavigation, type MobileNavigationItem } from "@/components/mobile-navigation";
import { ThemeToggle } from "@/components/theme-toggle";

export type SharedSiteProps = {
  locale: Locale;
  portfolioUrl: string;
  blogUrl: string;
  email?: string;
  linkedinUrl?: string;
};

export type SiteNavItem = { label: string; href: string; active?: boolean };
export type PrimaryAction = { label: string; href: string; download?: boolean };

export function SiteHeader({
  locale,
  navItems,
  primaryAction,
}: SharedSiteProps & { navItems: SiteNavItem[]; primaryAction?: PrimaryAction }) {
  return (
    <header className="border-b border-border/80 bg-background/95 supports-[backdrop-filter]:backdrop-blur-sm">
      <a
        href="#main-content"
        className="sr-only fixed left-4 top-4 z-50 rounded-md bg-accent px-4 py-3 font-medium text-accent-foreground focus:not-sr-only focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)]"
      >
        Skip to main content
      </a>
      <div className="content-shell flex min-h-18 items-center justify-between gap-6">
        <Link href={`/${locale}`} className="shrink-0 font-mono text-sm font-bold tracking-[0.2em]">
          INDRA<span className="text-accent">.</span>DEV
        </Link>
        <nav aria-label="Primary navigation" className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={item.active ? "page" : undefined}
              className={`border-b-2 py-6 text-sm transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] ${item.active ? "border-accent font-semibold" : "border-transparent text-muted-foreground"}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          {primaryAction ? (
            <Link
              href={primaryAction.href}
              download={primaryAction.download}
              className="hidden min-h-11 items-center gap-1 rounded-md bg-accent px-4 text-sm font-semibold text-accent-foreground transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] sm:inline-flex"
            >
              {primaryAction.label}
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </Link>
          ) : null}
          <LocaleSwitcher locale={locale} targetPath={`/${locale}`} />
          <ThemeToggle />
          <MobileNavigation
            items={navItems as MobileNavigationItem[]}
            locale={locale}
            primaryAction={primaryAction}
          />
        </div>
      </div>
    </header>
  );
}
