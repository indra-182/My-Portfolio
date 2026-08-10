import Link from "next/link";
import { getDictionary } from "@/i18n/dictionaries";
import { defaultLocale, isLocale } from "@/i18n/config";

export default async function NotFound({ params }: { params?: Promise<{ locale?: string }> }) {
  const value = (await params)?.locale;
  const locale = value !== undefined && isLocale(value) ? value : defaultLocale;
  const dictionary = await getDictionary(locale);

  return (
    <section className="content-shell flex min-h-[50vh] flex-col justify-center py-20">
      <p className="font-mono text-sm uppercase tracking-[0.18em] text-accent">404</p>
      <h1 className="mt-5 max-w-xl text-4xl font-semibold tracking-tight sm:text-6xl">
        {dictionary.errors.notFoundTitle}
      </h1>
      <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">
        {dictionary.errors.notFoundDescription}
      </p>
      <Link
        href={`/${locale}`}
        className="mt-8 inline-flex min-h-11 w-fit items-center rounded-md bg-accent px-4 font-semibold text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
      >
        {dictionary.actions.backHome}
      </Link>
    </section>
  );
}
