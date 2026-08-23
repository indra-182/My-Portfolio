import { LuLanguages } from "react-icons/lu";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
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
      className={cn(
        buttonVariants({ variant: "ghost" }),
        "gap-2 rounded-none px-3 font-mono text-xs font-medium tracking-[0.1em] text-muted-foreground uppercase",
      )}
    >
      <LuLanguages aria-hidden="true" className="size-4" />
      <span>{targetLocale.toUpperCase()}</span>
    </a>
  );
}
