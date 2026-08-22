import { LuLanguages } from "react-icons/lu";
import { getOtherLocale, type Locale } from "@/i18n/config";

function normalizePath(path: string) {
  return path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
}

export function LocaleSwitcher({
  locale,
  targetPath = "/",
  labelTemplate,
  languageNames,
}: {
  locale: Locale;
  targetPath?: string;
  labelTemplate: string;
  languageNames: Record<Locale, string>;
}) {
  const targetLocale = getOtherLocale(locale);
  const target = normalizePath(targetPath).replace(/^\/(id|en)(?=\/|$)/, "");
  const label = labelTemplate.replace("{language}", languageNames[targetLocale]);

  return (
    <a
      href={`/${targetLocale}${target}`}
      aria-label={label}
      className="inline-flex min-h-11 items-center gap-2 rounded-md px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
    >
      <LuLanguages aria-hidden="true" className="size-4" />
      <span>{targetLocale.toUpperCase()}</span>
    </a>
  );
}
