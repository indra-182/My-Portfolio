import { LuArrowUpRight } from "react-icons/lu";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/config";
import type { LatestFeedResult } from "@/types/latest-post";
export type LatestWritingCopy = {
  eyebrow: string;
  heading: string;
  visitBlog: string;
  unavailable: string;
  asideEyebrow: string;
  asideHeading: string;
  asideDescription: string;
  readingTime: string;
};

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
  copy,
}: {
  locale: Locale;
  result: LatestFeedResult;
  blogUrl: string;
  copy: LatestWritingCopy;
}) {
  const visiblePosts = result.status === "ready" ? result.posts.slice(0, 3) : [];
  const layout =
    visiblePosts.length === 1 ? "featured" : visiblePosts.length === 2 ? "double" : "grid";

  return (
    <section
      id="writing"
      className="border-b border-border py-16 sm:py-24"
      aria-labelledby="writing-title"
    >
      <div className="content-shell">
        <div className="flex flex-col gap-5 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              04 / {copy.eyebrow}
            </p>
            <h2
              id="writing-title"
              className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              {copy.heading}
            </h2>
          </div>
          {result.status === "ready" ? (
            <a
              href={blogUrl}
              className={cn(buttonVariants({ variant: "ghost" }), "gap-2 px-3 text-sm")}
            >
              {copy.visitBlog} <LuArrowUpRight aria-hidden="true" className="size-4" />
            </a>
          ) : null}
        </div>

        {visiblePosts.length > 0 ? (
          <div
            data-layout={layout}
            className={`mt-8 grid gap-px border border-border bg-border ${
              visiblePosts.length === 1
                ? "md:grid-cols-[minmax(0,1.55fr)_minmax(18rem,0.85fr)]"
                : visiblePosts.length === 2
                  ? "md:grid-cols-2"
                  : "md:grid-cols-3"
            }`}
          >
            {visiblePosts.map((post, index) => (
              <article
                key={post.slug}
                className={`group relative flex min-h-64 flex-col bg-background p-6 transition-colors duration-[var(--motion-fast)] hover:bg-muted ${
                  visiblePosts.length === 1 ? "sm:p-8" : ""
                }`}
              >
                <div className="flex items-center justify-between gap-4 text-xs text-muted-foreground">
                  <Badge variant="outline">{post.topics[0]}</Badge>
                  <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, locale)}</time>
                </div>
                <p className="mt-8 font-mono text-[0.65rem] text-accent">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3
                  className={`mt-2 font-semibold tracking-tight ${
                    visiblePosts.length === 1 ? "text-2xl sm:text-3xl" : "text-xl"
                  }`}
                >
                  <a
                    href={`${blogUrl}/blog/${post.slug}`}
                    className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {post.title}
                  </a>
                </h3>
                <p className="relative mt-3 text-sm leading-6 text-muted-foreground">
                  {post.description}
                </p>
                <div className="relative mt-auto flex items-end justify-between gap-4 pt-6">
                  <p className="font-mono text-xs text-muted-foreground">
                    {copy.readingTime.replace("{minutes}", String(post.readingTimeMinutes))}
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
                className="relative flex min-h-64 flex-col justify-between overflow-hidden bg-surface p-6 sm:p-8"
              >
                <div className="relative z-10">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                    {copy.asideEyebrow}
                  </p>
                  <h3
                    id="writing-aside-title"
                    className="mt-4 max-w-[12ch] text-2xl font-semibold tracking-tight"
                  >
                    {copy.asideHeading}
                  </h3>
                </div>
                <p className="relative z-10 max-w-sm text-sm leading-6 text-muted-foreground">
                  {copy.asideDescription}
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
          <div className="mt-8 border border-border bg-surface p-7 sm:p-10">
            <p className="max-w-xl text-lg leading-8 text-muted-foreground">{copy.unavailable}</p>
            <a href={blogUrl} className={cn(buttonVariants({ size: "lg" }), "mt-6 gap-2")}>
              {copy.visitBlog} <LuArrowUpRight aria-hidden="true" className="size-4" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
