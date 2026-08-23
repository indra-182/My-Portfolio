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
        <ol className="capability-list">
          {capabilities.map((capability) => (
            <li key={capability.title} className="capability-item">
              <div>
                <h3>{capability.title}</h3>
                <p>{capability.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
