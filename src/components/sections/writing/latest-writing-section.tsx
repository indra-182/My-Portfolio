import { LuArrowUpRight } from "react-icons/lu";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { blog } from "@/lib/blog";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { LatestFeedResult } from "@/lib/latest-posts";

type LatestWritingCopy = Dictionary["writing"];

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
  const visiblePosts = result.status === "ready" ? result.posts : [];

  return (
    <section id="writing" className="cue-section" aria-labelledby="writing-title">
      <div className="content-shell">
        <div className="cue-section-heading">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2
              id="writing-title"
              className="max-w-[18ch] !text-[clamp(2rem,4vw,3.75rem)] leading-[1.02] font-bold tracking-[-0.028em]"
            >
              {copy.heading}
            </h2>
            {result.status === "ready" ? (
              <a
                href={blog.homeUrl}
                className={`${buttonVariants({ variant: "outline" })} cue-button group`}
              >
                {copy.visitBlog}{" "}
                <LuArrowUpRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-[var(--motion-fast)] ease-[var(--ease-cue)] group-hover:translate-x-1 group-hover:-translate-y-1 group-focus-visible:translate-x-1 group-focus-visible:-translate-y-1 motion-reduce:transform-none"
                />
              </a>
            ) : null}
          </div>
        </div>

        {visiblePosts.length > 0 ? (
          <div className="writing-grid mt-8 grid gap-px bg-border" data-count={visiblePosts.length}>
            {visiblePosts.map((post) => (
              <article
                key={post.slug}
                className="writing-card group flex min-h-68 flex-col bg-background p-[clamp(1.25rem,3vw,2rem)] transition-colors duration-[var(--motion-fast)] ease-[ease]"
              >
                <div className="flex min-w-0 items-center justify-between gap-4 font-mono text-[0.63rem] text-muted-foreground">
                  <Badge className="min-w-0 truncate border-border font-mono text-[0.63rem]">
                    {post.topics[0]}
                  </Badge>
                  <time className="shrink-0" dateTime={post.publishedAt}>
                    {formatDate(post.publishedAt, locale)}
                  </time>
                </div>
                <h3 className="mt-[0.65rem] max-w-[23ch] text-[clamp(1.35rem,2vw,1.8rem)] leading-[1.05] font-[750] tracking-[-0.035em]">
                  <a
                    href={blog.postUrl(post.slug)}
                    className="flex min-h-11 items-center no-underline transition-colors duration-[var(--motion-fast)] ease-[ease] [overflow-wrap:anywhere] hover:text-[var(--cue-rose)] focus-visible:text-[var(--cue-rose)]"
                  >
                    {post.title}
                  </a>
                </h3>
                <p className="mt-[0.85rem] text-[0.86rem] leading-[1.6] text-muted-foreground">
                  {post.description}
                </p>
                <div className="mt-auto flex items-end justify-between gap-4 pt-6 font-mono text-[0.63rem] text-muted-foreground">
                  <span>
                    {copy.readingTime.replace("{minutes}", String(post.readingTimeMinutes))}
                  </span>
                  <LuArrowUpRight
                    aria-hidden="true"
                    className="size-5 text-[var(--cue-rose)] transition-transform duration-[var(--motion-fast)] ease-[ease] group-hover:translate-x-1 group-hover:-translate-y-1 group-focus-within:translate-x-1 group-focus-within:-translate-y-1 motion-reduce:transform-none"
                  />
                </div>
              </article>
            ))}
            {visiblePosts.length === 1 ? (
              <aside
                className="writing-aside flex min-h-68 flex-col justify-between bg-[var(--cue-cobalt)] p-[clamp(1.25rem,3vw,2rem)] text-[var(--cue-day)]"
                aria-labelledby="writing-aside-title"
              >
                <p className="cue-kicker">{copy.asideEyebrow}</p>
                <h3
                  id="writing-aside-title"
                  className="mt-4 max-w-[12ch] text-[clamp(1.55rem,3vw,2.5rem)] leading-[0.98] font-extrabold tracking-[-0.04em]"
                >
                  {copy.asideHeading}
                </h3>
                <p className="mt-[0.85rem] text-[0.86rem] leading-[1.6]">{copy.asideDescription}</p>
              </aside>
            ) : null}
          </div>
        ) : (
          <div className="mt-8 flex flex-wrap items-center justify-between gap-6 border border-border bg-surface-strong p-[clamp(1.25rem,3vw,2.5rem)]">
            <p className="max-w-2xl text-[1.05rem] leading-[1.6] text-muted-foreground">
              {copy.unavailable}
            </p>
            <a href={blog.homeUrl} className={`${buttonVariants({ size: "lg" })} cue-button group`}>
              {copy.visitBlog}{" "}
              <LuArrowUpRight
                aria-hidden="true"
                className="size-4 transition-transform duration-[var(--motion-fast)] ease-[var(--ease-cue)] group-hover:translate-x-1 group-hover:-translate-y-1 group-focus-visible:translate-x-1 group-focus-visible:-translate-y-1 motion-reduce:transform-none"
              />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

export async function LatestWriting({
  locale,
  copy,
  result,
}: {
  locale: Locale;
  copy: LatestWritingCopy;
  result: Promise<LatestFeedResult>;
}) {
  return <LatestWritingSection locale={locale} result={await result} copy={copy} />;
}

export function LatestWritingLoading({ copy }: { copy: LatestWritingCopy }) {
  return (
    <section id="writing" className="cue-section" aria-labelledby="writing-title" aria-busy="true">
      <div className="content-shell">
        <div className="cue-section-heading">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2
              id="writing-title"
              className="max-w-[18ch] !text-[clamp(2rem,4vw,3.75rem)] leading-[1.02] font-bold tracking-[-0.028em]"
            >
              {copy.heading}
            </h2>
          </div>
        </div>
        <div className="mt-8 min-h-68" aria-hidden="true" />
      </div>
    </section>
  );
}
