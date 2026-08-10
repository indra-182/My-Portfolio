import Image from "next/image";
import Link from "next/link";
import { ArrowDownToLine, ArrowUpRight, MapPin } from "lucide-react";
import type { PortfolioContent } from "@/content/portfolio-schema";

export function HeroSection({
  profile,
  downloadLabel,
  cvHref,
  writingLabel,
}: {
  profile: PortfolioContent["profile"];
  downloadLabel: string;
  cvHref: string;
  writingLabel: string;
}) {
  return (
    <section className="content-shell grid gap-12 py-20 sm:py-28 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)] lg:items-start lg:gap-20 lg:py-36">
      <div className="animate-editorial-enter">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{profile.role} · Indonesia</p>
        <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-7xl lg:text-[clamp(4.5rem,7vw,7rem)]">
          {profile.headline}
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
          {profile.valueProposition}
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-3">
          <Link
            href={cvHref}
            download
            className="inline-flex min-h-12 items-center gap-2 rounded-md bg-accent px-5 font-semibold text-accent-foreground transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
          >
            <ArrowDownToLine aria-hidden="true" className="size-4" />
            {downloadLabel}
          </Link>
          <Link
            href="#writing"
            className="inline-flex min-h-12 items-center gap-2 rounded-md border border-border px-5 font-semibold transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
          >
            {writingLabel}
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
        <p className="mt-7 inline-flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin aria-hidden="true" className="size-4 text-accent" />
          {profile.location}
        </p>
      </div>
      <div className="relative mx-auto mt-0 w-full max-w-md lg:mx-0 lg:ml-auto lg:mt-10 lg:max-w-[22rem]">
        <div className="absolute -right-3 -top-3 h-full w-full border border-accent/40" aria-hidden="true" />
        <div className="relative aspect-[1116/1409] overflow-hidden bg-surface">
          <Image
            src={profile.imageSrc}
            alt={profile.imageAlt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 22rem"
            className="object-cover object-center grayscale-[15%]"
          />
        </div>
      </div>
    </section>
  );
}
