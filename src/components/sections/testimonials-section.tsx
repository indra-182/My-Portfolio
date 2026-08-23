import type { Testimonial } from "@/content/portfolio-schema";

export function TestimonialsSection({
  testimonials,
  heading,
}: {
  testimonials: Testimonial[];
  heading: string;
}) {
  if (testimonials.length === 0) return null;

  return (
    <section
      className="border-y border-border bg-surface py-16 sm:py-24"
      aria-labelledby="testimonials-title"
    >
      <div className="content-shell">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">03</p>
        <h2
          id="testimonials-title"
          className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          {heading}
        </h2>
        <div className="mt-8 grid gap-px border border-border bg-border md:grid-cols-2">
          {testimonials.map((testimonial) => (
            <figure key={testimonial.author} className="bg-surface p-7 sm:p-10">
              <blockquote className="text-xl leading-8">“{testimonial.quote}”</blockquote>
              <figcaption className="mt-8 text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{testimonial.author}</span> ·{" "}
                {testimonial.role}, {testimonial.organization}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
