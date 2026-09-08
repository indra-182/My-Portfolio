/* eslint-disable @next/next/no-img-element -- The pre-optimized portrait avoids hydrating next/image on this static route. */
import { LuArrowDownToLine, LuArrowUpRight, LuMapPin } from "react-icons/lu";
import { buttonVariants } from "@/components/ui/button";
import type { PortfolioContent } from "@/content/portfolio-schema";
import { AtlasHeroMotion, AtlasSignature } from "./hero-motion";

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
      className="atlas-hero relative isolate overflow-hidden pt-[clamp(3.5rem,9vw,8rem)] pb-[clamp(4.5rem,9vw,8rem)] max-sm:pb-12"
      aria-labelledby="hero-title"
      data-brand="decision-atlas"
    >
      <AtlasHeroMotion />
      <div className="content-shell">
        <div className="atlas-hero-grid relative z-[1] grid gap-14">
          <div className="atlas-hero-copy atlas-entrance max-w-[52rem]">
            <h1
              id="hero-title"
              className="mt-4 max-w-[16ch] text-[clamp(3rem,8vw,7.5rem)] leading-[0.92] font-bold tracking-[-0.045em] text-balance max-sm:max-w-none max-sm:text-[clamp(3rem,12vw,4.5rem)] max-sm:[overflow-wrap:normal] max-sm:[word-break:normal]"
            >
              <AtlasSignature text={profile.headline} />
            </h1>
            <p className="atlas-prose mt-7 text-muted-foreground">{profile.valueProposition}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`mailto:${email}`}
                className={`${buttonVariants({ size: "lg" })} atlas-button group`}
              >
                {emailLabel}
                <LuArrowUpRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-[var(--motion-feedback)] ease-[var(--motion-ease)] group-hover:translate-x-1 group-hover:-translate-y-1 group-focus-visible:translate-x-1 group-focus-visible:-translate-y-1 motion-reduce:transform-none"
                />
              </a>
              <a
                href={cvHref}
                download
                className={`${buttonVariants({ variant: "outline", size: "lg" })} atlas-button group`}
              >
                <LuArrowDownToLine
                  aria-hidden="true"
                  className="size-4 transition-transform duration-[var(--motion-feedback)] ease-[var(--motion-ease)] group-hover:translate-y-1 group-focus-visible:translate-y-1 motion-reduce:transform-none"
                />
                {downloadLabel}
              </a>
            </div>
            <p className="atlas-meta mt-6 inline-flex items-center gap-2 text-muted-foreground">
              <LuMapPin aria-hidden="true" className="size-4 text-[var(--atlas-signal-orange)]" />
              {profile.location.locality}, {profile.location.countryName}
            </p>
          </div>
          <div className="atlas-hero-stage max-w-96 flex-col items-start justify-end mx-auto">
            <p className="atlas-stage-label self-stretch border-b pb-3 atlas-meta text-muted-foreground">
              {profile.role}
            </p>
            <div className="atlas-portrait-frame relative mt-4 ml-auto w-[min(100%,19rem)] bg-surface-strong">
              <div className="atlas-portrait-light" aria-hidden="true" />
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
