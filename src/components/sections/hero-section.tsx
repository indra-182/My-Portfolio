/* eslint-disable @next/next/no-img-element -- The pre-optimized portrait avoids hydrating next/image on this static route. */
import { LuArrowDownToLine, LuArrowUpRight, LuMapPin } from "react-icons/lu";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
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
    <section className="cue-hero" aria-labelledby="hero-title">
      <div className="content-shell">
        <div className="cue-hero-grid">
          <div className="cue-hero-copy animate-cue-rise">
            <h1 id="hero-title">{profile.headline}</h1>
            <p className="cue-hero-proposition">{profile.valueProposition}</p>
            <div className="cue-hero-actions">
              <a
                href={`mailto:${email}`}
                className={cn(buttonVariants({ size: "lg" }), "cue-button")}
              >
                {emailLabel}
                <LuArrowUpRight aria-hidden="true" className="size-4" />
              </a>
              <a
                href={cvHref}
                download
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "cue-button")}
              >
                <LuArrowDownToLine aria-hidden="true" className="size-4" />
                {downloadLabel}
              </a>
            </div>
            <p className="cue-location">
              <LuMapPin aria-hidden="true" className="size-4" />
              {profile.location}
            </p>
          </div>
          <div className="cue-hero-stage">
            <p className="cue-stage-label">{profile.role.toUpperCase()}</p>
            <div className="cue-portrait-frame">
              <div className="cue-portrait-light" aria-hidden="true" />
              <img
                src={profile.imageSrc}
                alt={profile.imageAlt}
                width={380}
                height={480}
                loading="eager"
                decoding="async"
                className="cue-portrait"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
