import { LuLanguages } from "react-icons/lu";
import { getOtherLocale, type Locale } from "@/i18n/config";

function normalizePath(path: string) {
  return path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
}

export function LocaleSwitcher({
  locale,
  targetPath = "/",
}: {
  locale: Locale;
  targetPath?: string;
}) {
  const targetLocale = getOtherLocale(locale);
  const target = normalizePath(targetPath).replace(/^\/(id|en)(?=\/|$)/, "");
  const label = targetLocale === "id" ? "Bahasa Indonesia" : "English";

  return (
    <a
      href={`/${targetLocale}${target}`}
      aria-label={`Switch language to ${label}`}
      className="inline-flex min-h-11 items-center gap-2 rounded-md px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
    >
      <LuLanguages aria-hidden="true" className="size-4" />
      <span>{targetLocale.toUpperCase()}</span>
    </a>
  );
}
