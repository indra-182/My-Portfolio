# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Indonesian product and fintech recruiters or hiring managers evaluating a Senior Frontend Engineer for complex or regulated workflows.

## Product Purpose

INDRA.DEV is Mahadi Indra Manurung's localized recruiter portfolio. It proves relevant frontend ownership quickly enough to earn a direct email conversation.

## Positioning

Mahadi simplifies complex financial and operational workflows through explicit UI state, clear data boundaries, end-to-end implementation, and browser-based verification.

## Operating Context

Recruiters scan the portfolio across desktop and mobile, in Indonesian or English, to understand the engineer's role, project ownership, workflow depth, collaboration evidence, technical writing, and contact path.

## Capabilities and Constraints

- Preserve `/id` as the default locale route and `/en` as the English route.
- Preserve the dark-first theme and persisted light-theme choice.
- Preserve semantic landmarks, skip navigation, keyboard access, visible focus, readable content, reduced-motion behavior, and no horizontal overflow.
- Keep server components as the default and retain `src/components/site-interactions.tsx` as the centralized browser-interaction boundary.
- Keep the validated optional writing feed recoverable: feed failure must leave the portfolio usable.
- Do not add unsupported claims, metrics, credentials, client claims, or testimonials.
- Do not add production dependencies.

## Brand Commitments

- Product name and wordmark: INDRA.DEV.
- Public voice: direct, technical, concrete, first-person, and free of hype.
- Preserve the supplied formal portrait, CV, external links, approved testimonials, and project facts.
- Avoid generic developer-template motifs, conservative corporate-profile layouts, disruptive experimentation, and a cosmetic refresh of the incumbent visual system.

## Evidence on Hand

- `src/content/portfolio.ts` contains localized profile, role, location, headline, value proposition, capabilities source material, Indivara Group experience, and these supplied projects: Petron Philippines Corporate Dashboard, Maybank Unit Trust, BCA Fixed Income, Pegadaian Asuransi, and Bank Danamon Mutual Fund. It also contains four approved testimonials.
- `src/lib/latest-posts.ts` provides an optional validated technical-writing feed with an unavailable fallback.
- `public/images/mahadi-indra.webp` provides the formal portrait asset.
- `public/documents/mahadi-indra-cv.pdf` provides the CV download.
- `src/lib/site-config.ts` provides the portfolio, blog, email, LinkedIn, GitHub, and CV configuration boundaries.

## Product Principles

- Make complex workflow ownership legible quickly.
- Prove through supplied work, not unsupported claims.
- Keep the contact path direct after confidence is earned.
- Preserve bilingual, accessible, resilient behavior.
