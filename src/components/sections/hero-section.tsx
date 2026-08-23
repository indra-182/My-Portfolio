/* eslint-disable @next/next/no-img-element -- The pre-optimized 8 KiB portrait avoids hydrating next/image on this static route. */
import { LuArrowDownToLine, LuArrowUpRight, LuMapPin } from "react-icons/lu";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import type { PortfolioContent } from "@/content/portfolio-schema";
export function HeroSection({
  profile,
  eyebrow,
  downloadLabel,
  cvHref,
  writingLabel,
}: {
  profile: PortfolioContent["profile"];
  eyebrow: string;
  downloadLabel: string;
  cvHref: string;
  writingLabel: string;
}) {
  return (
    <section className="content-shell grid gap-12 border-b border-border py-16 sm:py-24 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.65fr)] lg:items-start lg:gap-16 lg:py-28">
      <div className="animate-editorial-enter">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
        <h1 className="mt-5 max-w-5xl text-[clamp(3.4rem,8vw,7.5rem)] font-semibold leading-[0.9] tracking-[-0.07em]">
          {profile.headline}
        </h1>
        <p className="prose-measure mt-8 text-lg leading-8 text-muted-foreground sm:text-xl">
          {profile.valueProposition}
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <a href={cvHref} download className={cn(buttonVariants({ size: "lg" }), "gap-2")}>
            <LuArrowDownToLine aria-hidden="true" className="size-4" />
            {downloadLabel}
          </a>
          <a
            href="#writing"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "gap-2")}
          >
            {writingLabel}
            <LuArrowUpRight aria-hidden="true" className="size-4" />
          </a>
        </div>
        <p className="mt-7 inline-flex items-center gap-2 text-sm text-muted-foreground">
          <LuMapPin aria-hidden="true" className="size-4 text-accent" />
          {profile.location}
        </p>
      </div>
      <div className="relative mx-auto mt-4 w-full max-w-[19rem] border-l border-border pl-5 sm:pl-8 lg:mx-0 lg:ml-auto lg:mt-9">
        <div
          className="absolute -right-3 -top-3 h-full w-full border border-accent/50"
          aria-hidden="true"
        />
        <div className="relative aspect-[1116/1409] overflow-hidden bg-surface">
          <img
            src={profile.imageSrc}
            alt={profile.imageAlt}
            width={380}
            height={480}
            loading="eager"
            decoding="async"
            className="h-full w-full object-cover object-center grayscale-[15%]"
          />
        </div>
      </div>
    </section>
  );
}
