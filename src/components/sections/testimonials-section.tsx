import type { Testimonial } from "@/content/portfolio-schema";

function TestimonialGroup({ label, testimonials }: { label: string; testimonials: Testimonial[] }) {
  if (testimonials.length === 0) return null;

  return (
    <div className="testimonial-group">
      <p className="cue-kicker">{label}</p>
      <div className="testimonial-grid">
        {testimonials.map((testimonial) => (
          <figure key={testimonial.author} className="testimonial-card">
            <blockquote>“{testimonial.quote}”</blockquote>
            <figcaption>
              <span>{testimonial.author}</span>
              <small>
                {testimonial.role}, {testimonial.organization}
              </small>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

export function TestimonialsSection({
  testimonials,
  heading,
  collaboratorLabel,
  mentoringLabel,
}: {
  testimonials: Testimonial[];
  heading: string;
  collaboratorLabel: string;
  mentoringLabel: string;
}) {
  if (testimonials.length === 0) return null;

  return (
    <section className="cue-section cue-section-muted" aria-labelledby="testimonials-title">
      <div className="content-shell">
        <div className="cue-section-heading">
          <h2 id="testimonials-title">{heading}</h2>
        </div>
        <div className="testimonial-groups">
          <TestimonialGroup label={collaboratorLabel} testimonials={testimonials.slice(0, 2)} />
          <TestimonialGroup label={mentoringLabel} testimonials={testimonials.slice(2)} />
        </div>
      </div>
    </section>
  );
}
