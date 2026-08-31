import { LuLanguages } from "react-icons/lu";
import { buttonVariants } from "@/components/ui/button";
import type { Locale } from "@/i18n/config";

export function LocaleSwitcher({
  locale,
  labelTemplate,
  languageNames,
}: {
  locale: Locale;
  labelTemplate: string;
  languageNames: Record<Locale, string>;
}) {
  const targetLocale = locale === "id" ? "en" : "id";
  const label = labelTemplate.replace("{language}", languageNames[targetLocale]);

  return (
    <a
      href={`/${targetLocale}`}
      aria-label={label}
      className={`${buttonVariants({ variant: "ghost" })} site-control gap-2`}
    >
      <LuLanguages aria-hidden="true" className="size-4" />
      <span>{targetLocale.toUpperCase()}</span>
    </a>
  );
}
