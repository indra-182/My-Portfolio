import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { LatestFeedResult } from "@/types/latest-post";

function formatDate(value: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "id" ? "id-ID" : "en-US", {
    dateStyle: "medium",
    timeZone: "Asia/Jakarta",
  }).format(new Date(value));
}

export function LatestWritingSection({
  locale,
  result,
  blogUrl,
}: {
  locale: Locale;
  result: LatestFeedResult;
  blogUrl: string;
}) {
  return (
    <section id="writing" className="border-t border-border py-20 sm:py-28" aria-labelledby="writing-title">
      <div className="content-shell">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Latest writing</p>
            <h2 id="writing-title" className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Technical notes for real product work.
            </h2>
          </div>
          {result.status === "ready" ? (
            <Link
              href={`${blogUrl}/${locale}`}
              className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
            >
              Visit blog <ArrowUpRight aria-hidden="true" className="size-4" />
            </Link>
          ) : null}
        </div>

        {result.status === "ready" && result.posts.length > 0 ? (
          <div className="mt-10 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
            {result.posts.slice(0, 3).map((post) => (
              <article key={post.slug} className="group flex min-h-64 flex-col bg-background p-6 transition-colors hover:bg-surface">
                <div className="flex items-center justify-between gap-4 text-xs font-medium text-muted-foreground">
                  <span>{post.topics[0]}</span>
                  <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, locale)}</time>
                </div>
                <h3 className="mt-8 text-xl font-semibold tracking-tight">
                  <Link
                    href={`${blogUrl}/${locale}/${post.slug}`}
                    className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
                  >
                    {post.title}
                  </Link>
                </h3>
                <p className="relative mt-3 text-sm leading-6 text-muted-foreground">{post.description}</p>
                <p className="relative mt-auto pt-6 font-mono text-xs text-muted-foreground">
                  {post.readingTimeMinutes} min read
                </p>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-10 border border-border bg-surface p-7 sm:p-10">
            <p className="max-w-xl text-lg leading-8 text-muted-foreground">
              Latest writing is available on the technical blog.
            </p>
            <Link
              href={`${blogUrl}/${locale}`}
              className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-md bg-accent px-4 font-semibold text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
            >
              Visit blog <ArrowUpRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
