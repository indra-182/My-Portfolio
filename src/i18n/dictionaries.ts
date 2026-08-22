import type { Locale } from "./config";
import enJson from "./messages/en.json";
import idJson from "./messages/id.json";

type Widen<T> = T extends string ? string : { [K in keyof T]: Widen<T[K]> };

/**
 * Derived from the English messages. The `dictionaries` assignment below
 * typechecks Indonesian key parity against this shape at compile time.
 */
export type Dictionary = Widen<typeof enJson>;

const dictionaries: Record<Locale, Dictionary> = { id: idJson, en: enJson };

/** Synchronous access; both catalogs are small static JSON modules. */
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
