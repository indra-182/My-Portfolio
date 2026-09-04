import type { Metadata } from "next";
import { defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import "./globals.css";

const locale = defaultLocale;
const dictionary = getDictionary(locale);

export const metadata: Metadata = {
  title: dictionary.errors.notFoundTitle,
  description: dictionary.errors.notFoundDescription,
};

export default function GlobalNotFound() {
  return (
    <html lang={locale} className="dark">
      <body className="min-h-screen">
        <main
          id="main-content"
          className="content-shell flex min-h-screen flex-col justify-center py-20"
        >
          <p className="font-mono text-sm uppercase tracking-[0.18em] text-accent">404</p>
          <h1 className="mt-5 max-w-xl text-4xl font-semibold tracking-tight sm:text-6xl">
            {dictionary.errors.notFoundTitle}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">
            {dictionary.errors.notFoundDescription}
          </p>
          <a
            href={`/${locale}`}
            className="mt-8 inline-flex min-h-11 w-fit items-center rounded-sm bg-accent px-4 font-semibold text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
          >
            {dictionary.actions.backHome}
          </a>
        </main>
      </body>
    </html>
  );
}
