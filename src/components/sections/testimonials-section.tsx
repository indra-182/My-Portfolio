import type { Testimonial } from "@/content/portfolio-schema";

export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  if (testimonials.length === 0) return null;

  return (
    <section className="content-shell border-t border-border py-20 sm:py-28" aria-labelledby="testimonials-title">
      <h2 id="testimonials-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">
        What collaborators say
      </h2>
      <div className="mt-10 grid gap-px border border-border bg-border md:grid-cols-2">
        {testimonials.map((testimonial) => (
          <figure key={testimonial.author} className="bg-background p-7 sm:p-10">
            <blockquote className="text-xl leading-8">“{testimonial.quote}”</blockquote>
            <figcaption className="mt-8 text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{testimonial.author}</span> · {testimonial.role}, {testimonial.organization}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
