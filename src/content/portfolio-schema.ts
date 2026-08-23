import { z } from "zod";

const LocaleSchema = z.enum(["id", "en"]);

const ProjectSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
  problem: z.string().min(1),
  ownership: z.string().min(1),
  delivery: z.string().min(1),
  outcome: z.string().min(1),
  technologies: z.array(z.string().min(1)).min(1),
});

const ExperienceSchema = z.object({
  company: z.string().min(1),
  role: z.string().min(1),
  period: z.string().min(1),
  responsibilities: z.array(z.string().min(1)).min(1),
  projects: z.array(ProjectSchema).min(1),
});

const TestimonialSchema = z.object({
  author: z.string().min(1),
  role: z.string().min(1),
  organization: z.string().min(1),
  quote: z.string().min(1),
  approved: z.literal(true),
});
const CapabilitySchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

export const PortfolioContentSchema = z.object({
  locale: LocaleSchema,
  profile: z.object({
    name: z.string().min(1),
    role: z.string().min(1),
    location: z.string().min(1),
    headline: z.string().min(1),
    valueProposition: z.string().min(1),
    imageSrc: z.string().min(1),
    imageAlt: z.string().min(1),
  }),
  capabilities: z.array(CapabilitySchema).length(3),
  experiences: z.array(ExperienceSchema).min(1),
  testimonials: z.array(TestimonialSchema),
});

export type Project = z.infer<typeof ProjectSchema>;
export type Experience = z.infer<typeof ExperienceSchema>;
export type Testimonial = z.infer<typeof TestimonialSchema>;
export type PortfolioContent = z.infer<typeof PortfolioContentSchema>;
