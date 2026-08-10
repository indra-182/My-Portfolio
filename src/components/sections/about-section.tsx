import type { PortfolioContent } from "@/content/portfolio-schema";

export function AboutSection({
  about,
  eyebrow,
}: {
  about: PortfolioContent["about"];
  eyebrow: string;
}) {
  return (
    <section
      id="about"
      className="border-y border-border bg-surface py-20 sm:py-28"
      aria-labelledby="about-title"
    >
      <div className="content-shell grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
        <div>
          <h2
            id="about-title"
            className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight sm:text-5xl"
          >
            {about.heading}
          </h2>
          <div className="mt-8 grid gap-6 text-base leading-7 text-muted-foreground sm:grid-cols-2">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
