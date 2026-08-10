"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const locale = usePathname().split("/")[1] === "en" ? "en" : "id";
  const copy =
    locale === "en"
      ? {
          title: "Something went wrong",
          description: "The portfolio could not be loaded. You can retry or continue to the technical blog.",
          retry: "Try again",
          blog: "Open blog",
        }
      : {
          title: "Terjadi kesalahan",
          description: "Portfolio tidak dapat dimuat. Anda dapat mencoba lagi atau melanjutkan ke blog teknis.",
          retry: "Coba lagi",
          blog: "Buka blog",
        };

  return (
    <section className="content-shell flex min-h-[50vh] flex-col justify-center py-20">
      <p className="font-mono text-sm uppercase tracking-[0.18em] text-destructive">Error</p>
      <h1 className="mt-5 max-w-xl text-4xl font-semibold tracking-tight sm:text-6xl">{copy.title}</h1>
      <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">{copy.description}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex min-h-11 items-center rounded-md bg-accent px-4 font-semibold text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
        >
          {copy.retry}
        </button>
        <Link
          href={`${process.env.NEXT_PUBLIC_BLOG_URL ?? "http://localhost:3001"}/${locale}`}
          className="inline-flex min-h-11 items-center rounded-md border border-border px-4 font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
        >
          {copy.blog}
        </Link>
      </div>
    </section>
  );
}
