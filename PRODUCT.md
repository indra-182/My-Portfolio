# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Indonesian product and fintech recruiters or hiring managers evaluating a Senior Frontend
Engineer for complex or regulated workflows.

## Product purpose

INDRA.DEV is Mahadi Indra Manurung's localized recruiter portfolio. It proves relevant frontend
ownership quickly enough to earn a direct email conversation.

## Positioning

Mahadi simplifies complex financial and operational workflows through explicit UI state, clear
data boundaries, end-to-end implementation, and browser-based verification.

## Operating context

Recruiters scan the portfolio across desktop and mobile, in Indonesian or English, to understand
the engineer's role, project ownership, workflow depth, collaboration evidence, technical writing,
and contact path.

## Capabilities and constraints

- Preserve `/id` as the default locale route and `/en` as the English route.
- The initial theme follows `prefers-color-scheme`; an explicit light or dark choice persists in
  local storage.
- Preserve semantic landmarks, skip navigation, keyboard access, visible focus, readable content,
  reduced-motion behavior, and no horizontal overflow.
- Keep server components as the default. Use one local `LazyMotion` runtime and focused client
  islands for the hero/path, menu, and feedback interactions.
- Keep the validated optional writing feed recoverable. Feed failure must leave the portfolio usable.
- Do not add unsupported claims, metrics, credentials, client claims, or testimonials.
- Keep all public routes, query-free portfolio anchors, feed URLs, external links, CV path, and
  image path compatible with the existing site.

## Brand commitments

- Product name and wordmark: INDRA.DEV.
- Visual direction: Decision Atlas.
- Core palette: Night Water, Survey Paper, Deep Ink, Map Fog, Route Blue, and Signal Orange.
- Public voice: direct, technical, concrete, first-person, and free of hype.
- Preserve the supplied formal portrait, CV, external links, approved testimonials, and project facts.
- Avoid generic developer-template motifs, conservative corporate-profile layouts, disruptive
  experimentation, and cosmetic decoration that does not explain a relationship or state.

## Evidence on hand

- `src/content/portfolio.ts` contains localized profile, role, location, headline, value proposition,
  capability source material, Indivara Group experience, and the supplied five projects: Petron
  Philippines Corporate Dashboard, Maybank Unit Trust, BCA Fixed Income, Pegadaian Asuransi, and
  Bank Danamon Mutual Fund. It also contains four approved testimonials.
- `src/lib/latest-posts.ts` provides an optional validated technical-writing feed with an unavailable
  fallback.
- `public/images/mahadi-indra.webp` provides the formal portrait asset.
- `public/documents/mahadi-indra-cv.pdf` provides the CV download.
- `src/lib/blog.ts` provides normalized blog URLs; `src/lib/site-config.ts` provides portfolio,
  contact, profile, and CV configuration boundaries.

## Product principles

- Make complex workflow ownership legible quickly.
- Prove through supplied work, not unsupported claims.
- Map one featured project from problem to outcome, then let the remaining evidence support it.
- Keep the contact path direct after confidence is earned.
- Preserve bilingual, accessible, resilient behavior.
