import { LuArrowUpRight } from "react-icons/lu";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { blog } from "@/lib/blog";
import { getLatestPosts } from "@/lib/latest-posts";
import type { Locale } from "@/i18n/config";
import type { LatestFeedResult } from "@/types/latest-post";

export type LatestWritingCopy = {
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
  copy,
}: {
  locale: Locale;
  result: LatestFeedResult;
  copy: LatestWritingCopy;
}) {
  const visiblePosts = result.status === "ready" ? result.posts.slice(0, 3) : [];

  return (
    <section id="writing" className="cue-section writing-section" aria-labelledby="writing-title">
      <div className="content-shell">
        <div className="cue-section-heading writing-heading">
          <div>
            <div className="writing-heading-row">
              <h2 id="writing-title">{copy.heading}</h2>
              {result.status === "ready" ? (
                <a
                  href={blog.homeUrl}
                  className={cn(buttonVariants({ variant: "outline" }), "cue-button")}
                >
                  {copy.visitBlog} <LuArrowUpRight aria-hidden="true" className="size-4" />
                </a>
              ) : null}
            </div>
          </div>
        </div>

        {visiblePosts.length > 0 ? (
          <div className="writing-grid" data-count={visiblePosts.length}>
            {visiblePosts.map((post) => (
              <article key={post.slug} className="writing-card">
                <div className="writing-card-meta">
                  <Badge variant="outline">{post.topics[0]}</Badge>
                  <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, locale)}</time>
                </div>
                <h3>
                  <a href={blog.postUrl(post.slug)}>{post.title}</a>
                </h3>
                <p className="writing-card-description">{post.description}</p>
                <div className="writing-card-footer">
                  <span>
                    {copy.readingTime.replace("{minutes}", String(post.readingTimeMinutes))}
                  </span>
                  <LuArrowUpRight aria-hidden="true" className="size-5" />
                </div>
              </article>
            ))}
            {visiblePosts.length === 1 ? (
              <aside className="writing-aside" aria-labelledby="writing-aside-title">
                <p className="cue-kicker">{copy.asideEyebrow}</p>
                <h3 id="writing-aside-title">{copy.asideHeading}</h3>
                <p>{copy.asideDescription}</p>
              </aside>
            ) : null}
          </div>
        ) : (
          <div className="writing-fallback">
            <p>{copy.unavailable}</p>
            <a href={blog.homeUrl} className={cn(buttonVariants({ size: "lg" }), "cue-button")}>
              {copy.visitBlog} <LuArrowUpRight aria-hidden="true" className="size-4" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

export async function LatestWriting({ locale, copy }: { locale: Locale; copy: LatestWritingCopy }) {
  const result = await getLatestPosts();

  return <LatestWritingSection locale={locale} result={result} copy={copy} />;
}

export function LatestWritingLoading({ copy }: { copy: LatestWritingCopy }) {
  return (
    <section
      id="writing"
      className="cue-section writing-section"
      aria-labelledby="writing-title"
      aria-busy="true"
    >
      <div className="content-shell">
        <div className="cue-section-heading writing-heading">
          <div className="writing-heading-row">
            <h2 id="writing-title">{copy.heading}</h2>
          </div>
        </div>
        <div className="writing-loading" aria-hidden="true" />
      </div>
    </section>
  );
}
