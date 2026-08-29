"use client";

import enJson from "@/i18n/messages/en.json";
import idJson from "@/i18n/messages/id.json";
import { usePathname } from "next/navigation";
import { blogUrl } from "@/lib/blog-url";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const copy = usePathname().split("/")[1] === "en" ? enJson.errors : idJson.errors;

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
          className="inline-flex min-h-11 items-center rounded-md border border-border px-4 font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
          href={blogUrl}
        >
          {copy.blog}
        </a>
      </div>
    </section>
  );
}
