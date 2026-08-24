export const locales = ["id", "en"] as const;
export const defaultLocale = "id" as const;
export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
