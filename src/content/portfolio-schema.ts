import { z } from "zod";
import { locales } from "@/i18n/config";

const LocaleSchema = z.enum(locales);

const LocationSchema = z
  .object({
    locality: z.string().min(1),
    countryName: z.string().min(1),
    countryCode: z.string().length(2),
  })
  .strict();

const ProjectCopySchema = z
  .object({
    summary: z.string().min(1),
    problem: z.string().min(1),
    ownership: z.string().min(1),
    delivery: z.string().min(1),
    outcome: z.string().min(1),
  })
  .strict();

const ProfileCopySchema = z
  .object({
    headline: z.string().min(1),
    valueProposition: z.string().min(1),
    imageAlt: z.string().min(1),
  })
  .strict();

const CapabilitySchema = z
  .object({
    title: z.string().min(1),
    description: z.string().min(1),
  })
  .strict();

const ExperienceCopySchema = z
  .object({
    period: z.string().min(1),
    responsibilities: z.array(z.string().min(1)).min(1),
    projects: z.record(z.string(), ProjectCopySchema),
  })
  .strict();

const LocaleCopySchema = z
  .object({
    profile: ProfileCopySchema,
    capabilities: z.array(CapabilitySchema).length(3),
    experiences: z.record(z.string(), ExperienceCopySchema),
  })
  .strict();

export const PortfolioTranslationsSchema = z.record(LocaleSchema, LocaleCopySchema);

const ProfileFactsSchema = z
  .object({
    name: z.string().min(1),
    role: z.string().min(1),
    location: LocationSchema,
    imageSrc: z.string().min(1),
  })
  .strict();

const ProjectFactsSchema = z
  .object({
    id: z.string().min(1),
    title: z.string().min(1),
    technologies: z.array(z.string().min(1)).min(1),
    featured: z.boolean(),
  })
  .strict();

const ExperienceFactsSchema = z
  .object({
    id: z.string().min(1),
    company: z.string().min(1),
    role: z.string().min(1),
    projectIds: z.array(z.string().min(1)).min(1),
  })
  .strict();

const TestimonialSchema = z
  .object({
    author: z.string().min(1),
    role: z.string().min(1),
    organization: z.string().min(1),
    quote: z.string().min(1),
    approved: z.literal(true),
    category: z.enum(["collaborator", "mentoring"]),
  })
  .strict();

export const PortfolioFactsSchema = z
  .object({
    profile: ProfileFactsSchema,
    projects: z.array(ProjectFactsSchema).min(1),
    experiences: z.array(ExperienceFactsSchema).min(1),
    testimonials: z.array(TestimonialSchema),
  })
  .strict()
  .superRefine((facts, context) => {
    const projectIds = facts.projects.map((project) => project.id);
    const projectIdSet = new Set(projectIds);
    const referencedProjectIds = facts.experiences.flatMap((experience) => experience.projectIds);
    const referencedProjectIdSet = new Set(referencedProjectIds);

    if (projectIdSet.size !== projectIds.length) {
      context.addIssue({
        code: "custom",
        path: ["projects"],
        message: "Project IDs must be unique.",
      });
    }

    if (facts.projects.filter((project) => project.featured).length !== 1) {
      context.addIssue({
        code: "custom",
        path: ["projects"],
        message: "Exactly one project must be featured.",
      });
    }

    if (referencedProjectIdSet.size !== referencedProjectIds.length) {
      context.addIssue({
        code: "custom",
        path: ["experiences"],
        message: "Project ordering cannot contain duplicate IDs.",
      });
    }

    if (
      referencedProjectIdSet.size !== projectIdSet.size ||
      referencedProjectIds.some((projectId) => !projectIdSet.has(projectId))
    ) {
      context.addIssue({
        code: "custom",
        path: ["experiences"],
        message: "Every project must be referenced exactly once.",
      });
    }
  });

const ProjectSchema = ProjectFactsSchema.extend(ProjectCopySchema.shape);

const ExperienceSchema = ExperienceFactsSchema.omit({ projectIds: true }).extend({
  ...ExperienceCopySchema.omit({ projects: true }).shape,
  projects: z.array(ProjectSchema).min(1),
});

export const PortfolioContentSchema = z
  .object({
    locale: LocaleSchema,
    profile: ProfileFactsSchema.extend(ProfileCopySchema.shape),
    capabilities: z.array(CapabilitySchema).length(3),
    experiences: z.array(ExperienceSchema).min(1),
    testimonials: z.array(TestimonialSchema),
  })
  .strict()
  .superRefine((content, context) => {
    const projects = content.experiences.flatMap((experience) => experience.projects);
    if (projects.filter((project) => project.featured).length !== 1) {
      context.addIssue({
        code: "custom",
        path: ["experiences"],
        message: "Exactly one project must be featured.",
      });
    }

    const projectIds = projects.map((project) => project.id);
    if (new Set(projectIds).size !== projectIds.length) {
      context.addIssue({
        code: "custom",
        path: ["experiences"],
        message: "Project IDs must be unique.",
      });
    }
  });

export type Project = z.infer<typeof ProjectSchema>;

export type Testimonial = z.infer<typeof TestimonialSchema>;
export type PortfolioContent = z.infer<typeof PortfolioContentSchema>;
export type PortfolioFacts = z.infer<typeof PortfolioFactsSchema>;
export type PortfolioTranslations = z.infer<typeof PortfolioTranslationsSchema>;
