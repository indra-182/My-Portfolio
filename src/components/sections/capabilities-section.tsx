import type { PortfolioContent } from "@/content/portfolio-schema";

export function CapabilitiesSection({
  capabilities,
  heading,
}: {
  capabilities: PortfolioContent["capabilities"];
  heading: string;
}) {
  return (
    <section
      id="capabilities"
      className="cue-section cue-section-muted"
      aria-labelledby="capabilities-title"
    >
      <div className="content-shell">
        <div className="cue-section-heading">
          <h2 id="capabilities-title">{heading}</h2>
        </div>
        <ol className="mt-8 grid list-none">
          {capabilities.map((capability) => (
            <li
              key={capability.title}
              className="grid grid-cols-[minmax(0,1fr)] gap-4 border-b border-border py-6"
            >
              <div>
                <h3 className="max-w-[24ch] text-[clamp(1.4rem,2.5vw,2.25rem)] leading-[1.08] font-bold tracking-[-0.028em]">
                  {capability.title}
                </h3>
                <p className="mt-3 max-w-2xl text-base leading-[1.65] text-muted-foreground">
                  {capability.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
