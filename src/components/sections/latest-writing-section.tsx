import Link from "next/link";
import { LuArrowUpRight } from "react-icons/lu";
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
  const visiblePosts = result.status === "ready" ? result.posts.slice(0, 3) : [];
  const layout =
    visiblePosts.length === 1 ? "featured" : visiblePosts.length === 2 ? "double" : "grid";

  return (
    <section
      id="writing"
      className="border-t border-border py-20 sm:py-28"
      aria-labelledby="writing-title"
    >
      <div className="content-shell">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              Latest writing
            </p>
            <h2
              id="writing-title"
              className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              Technical notes for real product work.
            </h2>
          </div>
          {result.status === "ready" ? (
            <Link
              href={blogUrl}
              className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
            >
              Visit blog <LuArrowUpRight aria-hidden="true" className="size-4" />
            </Link>
          ) : null}
        </div>

        {visiblePosts.length > 0 ? (
          <div
            data-layout={layout}
            className={`mt-10 grid gap-4 ${
              visiblePosts.length === 1
                ? "md:grid-cols-[minmax(0,1.55fr)_minmax(18rem,0.85fr)]"
                : visiblePosts.length === 2
                  ? "md:grid-cols-2"
                  : "md:grid-cols-3"
            }`}
          >
            {visiblePosts.map((post) => (
              <article
                key={post.slug}
                className={`group relative flex min-h-64 flex-col border border-border bg-background p-6 transition-colors duration-[var(--motion-fast)] hover:bg-surface ${
                  visiblePosts.length === 1 ? "sm:p-8" : ""
                }`}
              >
                <div className="flex items-center justify-between gap-4 text-xs font-medium text-muted-foreground">
                  <span>{post.topics[0]}</span>
                  <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, locale)}</time>
                </div>
                <h3
                  className={`mt-8 font-semibold tracking-tight ${
                    visiblePosts.length === 1 ? "text-2xl sm:text-3xl" : "text-xl"
                  }`}
                >
                  <Link
                    href={`${blogUrl}/blog/${post.slug}`}
                    className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
                  >
                    {post.title}
                  </Link>
                </h3>
                <p className="relative mt-3 text-sm leading-6 text-muted-foreground">
                  {post.description}
                </p>
                <div className="relative mt-auto flex items-end justify-between gap-4 pt-6">
                  <p className="font-mono text-xs text-muted-foreground">
                    {post.readingTimeMinutes} min read
                  </p>
                  <LuArrowUpRight
                    aria-hidden="true"
                    className="size-5 transition-transform duration-[var(--motion-fast)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </div>
              </article>
            ))}
            {visiblePosts.length === 1 ? (
              <aside
                aria-labelledby="writing-aside-title"
                className="relative flex min-h-64 flex-col justify-between overflow-hidden border border-border bg-surface p-6 sm:p-8"
              >
                <div className="relative z-10">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                    Writing in public
                  </p>
                  <h3
                    id="writing-aside-title"
                    className="mt-4 max-w-[12ch] text-2xl font-semibold tracking-tight"
                  >
                    Notes from the build loop.
                  </h3>
                </div>
                <p className="relative z-10 max-w-sm text-sm leading-6 text-muted-foreground">
                  Short notes on frontend systems, product workflows, and shipping with confidence.
                </p>
                <span
                  aria-hidden="true"
                  className="absolute -right-4 -bottom-12 font-mono text-[10rem] leading-none text-foreground/5"
                >
                  01
                </span>
              </aside>
            ) : null}
          </div>
        ) : (
          <div className="mt-10 border border-border bg-surface p-7 sm:p-10">
            <p className="max-w-xl text-lg leading-8 text-muted-foreground">
              Latest writing is available on the technical blog.
            </p>
            <Link
              href={blogUrl}
              className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-md bg-accent px-4 font-semibold text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
            >
              Visit blog <LuArrowUpRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
