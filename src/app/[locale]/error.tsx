"use client";

import { usePathname } from "next/navigation";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/config";
import { siteConfig } from "@/lib/site-config";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const segment = usePathname().split("/")[1];
  const locale = isLocale(segment) ? segment : "id";
  const copy = getDictionary(locale).errors;

  return (
    <section className="content-shell flex min-h-[50vh] flex-col justify-center py-20">
      <p className="font-mono text-sm uppercase tracking-[0.18em] text-destructive">
        {copy.eyebrow}
      </p>
      <h1 className="mt-5 max-w-xl text-4xl font-semibold tracking-tight sm:text-6xl">
        {copy.title}
      </h1>
      <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">{copy.description}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex min-h-11 items-center rounded-md bg-accent px-4 font-semibold text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
        >
          {copy.retry}
        </button>
        <a
          href={`${siteConfig.blogUrl}/${locale}`}
          className="inline-flex min-h-11 items-center rounded-md border border-border px-4 font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
        >
          {copy.blog}
        </a>
      </div>
    </section>
  );
}
