/* eslint-disable @next/next/no-img-element -- The pre-optimized portrait avoids hydrating next/image on this static route. */
import { LuArrowDownToLine, LuArrowUpRight, LuMapPin } from "react-icons/lu";
import { buttonVariants } from "@/components/ui/button";
import type { PortfolioContent } from "@/content/portfolio-schema";

export function HeroSection({
  profile,
  emailLabel,
  email,
  downloadLabel,
  cvHref,
}: {
  profile: PortfolioContent["profile"];
  emailLabel: string;
  email: string;
  downloadLabel: string;
  cvHref: string;
}) {
  return (
    <section
      className="cue-hero relative isolate overflow-hidden pt-[clamp(3.5rem,9vw,8rem)] pb-[clamp(4.5rem,9vw,8rem)] max-sm:min-h-svh max-sm:pb-12"
      aria-labelledby="hero-title"
    >
      <div className="content-shell">
        <div className="cue-hero-grid relative z-[1] grid gap-14">
          <div className="cue-hero-copy animate-cue-rise max-w-[52rem]">
            <h1
              id="hero-title"
              className="mt-0 max-w-[16ch] text-[clamp(2.7rem,5.3vw,4.5rem)] leading-[0.98] font-bold tracking-[-0.028em] text-balance max-sm:max-w-none max-sm:text-[clamp(2.3rem,10vw,3rem)] max-sm:[overflow-wrap:normal] max-sm:[word-break:normal]"
            >
              {profile.headline}
            </h1>
            <p className="mt-6 max-w-2xl text-[clamp(1rem,1.5vw,1.2rem)] leading-[1.6] text-muted-foreground">
              {profile.valueProposition}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`mailto:${email}`}
                className={`${buttonVariants({ size: "lg" })} cue-button group`}
              >
                {emailLabel}
                <LuArrowUpRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-[var(--motion-fast)] ease-[var(--ease-cue)] group-hover:translate-x-1 group-hover:-translate-y-1 group-focus-visible:translate-x-1 group-focus-visible:-translate-y-1 motion-reduce:transform-none"
                />
              </a>
              <a
                href={cvHref}
                download
                className={`${buttonVariants({ variant: "outline", size: "lg" })} cue-button group`}
              >
                <LuArrowDownToLine
                  aria-hidden="true"
                  className="size-4 transition-transform duration-[var(--motion-fast)] ease-[var(--ease-cue)] group-hover:translate-y-1 group-focus-visible:translate-y-1 motion-reduce:transform-none"
                />
                {downloadLabel}
              </a>
            </div>
            <p className="mt-6 inline-flex items-center gap-2 font-mono text-[0.72rem] tracking-[0.08em] text-muted-foreground uppercase">
              <LuMapPin aria-hidden="true" className="size-4 text-[var(--cue-rose)]" />
              {profile.location.locality}, {profile.location.countryName}
            </p>
          </div>
          <div className="cue-hero-stage max-w-96 flex-col items-start justify-end mx-auto">
            <p className="cue-stage-label self-stretch border-b pb-3 text-right font-mono text-[0.62rem] tracking-[0.12em] text-muted-foreground">
              {profile.role.toUpperCase()}
            </p>
            <div className="cue-portrait-frame relative mt-4 ml-auto w-[min(100%,19rem)] bg-surface-strong">
              <div className="cue-portrait-light" aria-hidden="true" />
              <img
                src={profile.imageSrc}
                alt={profile.imageAlt}
                width={380}
                height={480}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="block aspect-[1116/1409] w-full object-cover object-center [filter:grayscale(18%)_contrast(1.05)]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
