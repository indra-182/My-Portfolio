import type { Testimonial } from "@/content/portfolio-schema";
import type { Dictionary } from "@/i18n/dictionaries";

function TestimonialGroup({ label, testimonials }: { label: string; testimonials: Testimonial[] }) {
  if (testimonials.length === 0) return null;

  return (
    <div className="grid gap-4">
      <p className="cue-kicker">{label}</p>
      <div className="grid gap-px bg-border sm:grid-cols-2">
        {testimonials.map((testimonial) => (
          <figure key={testimonial.author} className="bg-surface p-[clamp(1.35rem,3vw,2.5rem)]">
            <blockquote className="max-w-3xl text-[clamp(1.15rem,2vw,1.75rem)] leading-[1.4]">
              “{testimonial.quote}”
            </blockquote>
            <figcaption className="mt-8 grid gap-[0.3rem] font-bold text-foreground">
              <span>{testimonial.author}</span>
              <small className="text-[0.78rem] font-normal text-muted-foreground">
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
  copy,
}: {
  testimonials: Testimonial[];
  copy: Dictionary["testimonials"];
}) {
  if (testimonials.length === 0) return null;

  return (
    <section className="cue-section cue-section-muted" aria-labelledby="testimonials-title">
      <div className="content-shell">
        <div className="cue-section-heading">
          <h2 id="testimonials-title">{copy.heading}</h2>
        </div>
        <div className="mt-8 grid gap-12">
          <TestimonialGroup
            label={copy.collaboratorLabel}
            testimonials={testimonials.filter(
              (testimonial) => testimonial.category === "collaborator",
            )}
          />
          <TestimonialGroup
            label={copy.mentoringLabel}
            testimonials={testimonials.filter(
              (testimonial) => testimonial.category === "mentoring",
            )}
          />
        </div>
      </div>
    </section>
  );
}
