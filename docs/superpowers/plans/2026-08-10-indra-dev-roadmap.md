# INDRA.DEV Websites Implementation Roadmap

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement each linked plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver a recruiter-focused portfolio and an engineer-focused technical blog with one approved Authority Editorial design language, then connect and release them as separate Vercel projects.

**Architecture:** The portfolio and blog remain independent Next.js applications in sibling folders. The portfolio establishes the canonical design tokens and shared shell; the blog copies those exact shared files, while a parity check prevents drift. The blog exposes a versioned latest-post feed that the portfolio consumes with hourly revalidation.

**Tech Stack:** Next.js App Router, TypeScript, React, Tailwind CSS, shadcn/ui, next-themes, MDX, Zod, Vitest, Testing Library, Playwright, Vercel.

## Global Constraints

- Do not implement any application code until the user starts an execution session.
- Work only in `/home/mahad/code/Personal/portfolio` and `/home/mahad/code/Personal/blog`.
- Preserve the approved Authority Editorial direction and subtle 150–420 millisecond motion range.
- Support Light, Dark, and System themes; System is the first-visit default.
- Support explicit `/id` and `/en` locale prefixes; Indonesian is the default locale.
- Use semantic design tokens, Inter Variable, Geist Mono, and one SVG icon family.
- Keep profile and blog content client-safe, evidence-based, and free of invented testimonials or metrics.
- Meet WCAG 2.2 AA and support `prefers-reduced-motion`.
- Do not add analytics, comments, newsletter, live playground, GSAP, or a CMS in the MVP.
- Do not push, deploy, buy domains, or configure external services without separate user approval.

---

## Execution Order

### Phase 1: Portfolio MVP

Execute [Portfolio MVP plan](./2026-08-10-indra-dev-portfolio-mvp.md).

Deliverable: a localized, accessible portfolio with the canonical design system, theme control, shared shell, CV download, CV-derived experience content, responsive behavior, metadata, and a safe Latest Writing fallback.

Checkpoint: review the portfolio in light, dark, mobile, and desktop modes before the blog copies the shared contract.

### Phase 2: Blog MVP

Execute [Blog MVP plan](../../../../blog/docs/superpowers/plans/2026-08-10-indra-dev-blog-mvp.md).

Deliverable: a localized MDX blog with the exact shared shell, validated content, search/filter/load-more, article reading features, feeds, SEO metadata, error states, and automated tests.

Checkpoint: review article readability, code blocks, empty content, locale behavior, and small-screen navigation before enabling cross-site data.

### Phase 3: Cross-Site Integration and Release Readiness

Execute [Cross-site integration and release plan](./2026-08-10-indra-dev-cross-site-release.md).

Deliverable: enforced visual parity, live Latest Writing data, cross-domain navigation, final environment contracts, local two-app verification, and documented Vercel setup steps.

Checkpoint: user approves the complete local build before any GitHub push or Vercel project creation.

### Phase 4: Hermes Publishing Automation

Create a separate implementation spec and plan after the Hermes repository, runner, authentication method, content prompt contract, and Git workflow are available. That future phase must implement the already approved 20:00 Asia/Jakarta schedule and blog validation gate. It is intentionally excluded from the website MVP plans because its files and execution environment are not currently in scope.

## Completion Gate

The website program is ready for release only when:

- All three plans pass their listed tests.
- The shared token and shell parity check passes.
- Both applications build independently.
- Light, dark, system, reduced-motion, Indonesian, and English states are verified.
- The portfolio behaves safely when the blog feed is available, unavailable, or malformed.
- The user has supplied or approved final public contact details, testimonials or their omission, domain names, CV asset, logo, and favicon.

## Design-Spec Coverage

| Approved requirement | Implementation location |
|---|---|
| Authority Editorial tokens, typography, icons, and subtle motion | Portfolio Tasks 2 and 5; Blog Task 2; Integration Task 1 |
| Light, Dark, System, persistence, and reduced motion | Portfolio Tasks 2 and 7; Blog Tasks 2 and 8 |
| Identical accessible header and footer | Portfolio Task 3; Blog Task 2; Integration Task 1 |
| Recruiter hero, About, experience, nested projects, contextual technologies, testimonials rule | Portfolio Tasks 4 and 5 |
| Profile photo, CV, wordmark, monogram favicon | Portfolio Task 6 |
| Indonesian and English routes and missing-translation recovery | Portfolio Task 3; Blog Tasks 2 and 7 |
| MDX schema, series, search, topics, load more | Blog Tasks 3 and 4 |
| TOC, highlighted code, copy code, breadcrumbs, related posts, series navigation, sharing | Blog Task 5 |
| RSS, sitemap, robots, Open Graph, canonical, alternate links, structured data | Portfolio Task 6; Blog Tasks 5 and 6 |
| Latest Writing blog-to-portfolio feed and failure fallback | Blog Task 6; Integration Tasks 2 and 3 |
| Responsive, loading, empty, error, keyboard, accessibility, and performance checks | Portfolio Tasks 6 and 7; Blog Tasks 7 and 8; Integration Task 5 |
| Separate Vercel projects and external-action approval boundary | Integration Task 4 |
| Hermes at 20:00 Asia/Jakarta | Roadmap Phase 4, after Hermes execution context is supplied |

## Primary References

- [Next.js App Router](https://nextjs.org/docs/app)
- [create-next-app CLI](https://nextjs.org/docs/app/api-reference/cli/create-next-app)
- [Next.js internationalization guide](https://nextjs.org/docs/app/guides/internationalization)
- [Next.js MDX guide](https://nextjs.org/docs/app/guides/mdx)
- [Next.js testing guide](https://nextjs.org/docs/app/guides/testing)
- [shadcn/ui Next.js setup](https://ui.shadcn.com/docs/installation/next)
- [next-themes](https://github.com/pacocoursey/next-themes)
- [Vercel monorepo projects](https://vercel.com/docs/monorepos)
