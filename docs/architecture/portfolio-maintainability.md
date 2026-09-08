# Portfolio maintainability architecture

This document defines the permanent ownership and change contracts for INDRA.DEV. `DESIGN.md`
is the authority for the Decision Atlas visual, motion, accessibility, and responsive contract.

## Route composition

`src/app/[locale]/page.tsx` is the server composition root. It validates the locale before loading
the typed dictionary and static portfolio content, then composes Hero, the featured Petron path,
Capabilities, Projects, Testimonials, and Writing.

The optional blog feed belongs inside the Writing Suspense boundary. A slow or unavailable blog
must not delay the critical portfolio content or Footer. The fallback reserves its final space,
marks the section busy, and exposes no fake article.

## Experience, project, and path interface

An Experience is an employment role, company, period, and responsibility record containing ordered
Project evidence. Exactly one Project is featured by the portfolio schema.

`FeaturedProjectPath` owns the featured Petron presentation. Its four path nodes are the supplied
Problem, Ownership, Delivery, and Outcome fields, built by the shared `project-evidence` helper so
the featured and disclosure surfaces cannot drift. At 1024px and above the route rail is sticky and
the rail, marker, and nodes follow the path shell's scroll progress; below that breakpoint the same
nodes are inline in document order. The path has no new claims.

`ProjectsSection` owns the remaining Projects and renders each as a closed native `<details>`
disclosure. The visible section anchor is `#projects`. A non-visual `#experiences` target remains
at the same boundary for bookmarks and integrations that used the former anchor.

Navigation uses localized `Projects`, `Capabilities`, `Testimonials`, and `Writing` labels. The
legacy anchor is compatibility only and is not a visible navigation item.

## External blog seam

`src/lib/blog.ts` owns every public or machine-facing blog URL: home, latest-post feed, and article.
`src/lib/latest-posts.ts` owns transport, timeout, revalidation, feed validation, and the three-post
adapter limit. Callers must not construct blog paths or know the feed endpoint. Feed failure returns
the `unavailable` result and never throws through the page.

## Portfolio content seam

`src/content/portfolio.ts` separates facts from translations. Locale-neutral facts are stored once:

- profile name, role, structured location, and image source
- company and Experience identity
- Project ID, official title, technologies, featured state, and canonical ordering
- testimonial identity, role, organization, approved verbatim quote, category, and ordering

Localized copy is keyed by stable Experience and Project IDs. `PortfolioFactsSchema`,
`PortfolioTranslationsSchema`, and `PortfolioContentSchema` reject missing, unexpected,
duplicated, or invalid records at the boundary. Exactly one Project is featured and every
testimonial is explicitly categorized and approved.

## Locale seam

`src/i18n/config.ts` owns the locale registry, default locale, type, predicate, and recovery
fallback. `src/i18n/route-locale.ts` owns route policy. Route-bearing surfaces call `requireLocale`.
Schemas, static params, dictionary records, sitemap entries, metadata alternates, and locale
switching derive from the registry.

## Browser and Motion seams

`src/components/shell/site-interactions.tsx` remains the single raw browser interaction boundary
for theme persistence, system-theme bootstrap, active navigation, back-to-top, and native dialog
behavior. Its marker values live in `site-interaction-contract.ts`; styling classes are not hooks.

`src/components/motion/motion-provider.tsx` is the single `LazyMotion` and `MotionConfig` boundary.
The `motion` package is used only by focused client islands: hero layers/signature and the Petron
path sequence. Page composition, data, metadata, and writing content remain server-first. The
provider uses `reducedMotion="user"`; CSS and the path island render the completed route without
path drawing or non-essential transforms under the reduced-motion media query.

## Design-system ownership

`src/styles/design-tokens.css` owns the six Decision Atlas values, semantic light/dark roles,
canonical `--font-ui`, `--font-prose`, and `--font-mono` roles, type scale, and canonical motion
tokens. `src/styles/foundation.css` owns Tailwind theme mapping, base browser rules, content
measures, section primitives, and reduced-motion invariants. Feature CSS stays beside its component
for gradients, pseudo-elements, dialog backdrops, native marker selectors, responsive path rules,
and state selectors.

Font binaries are served from `public/fonts` and license notices live in `public/fonts/licenses`.
No remote font request is required for first render.

## Verification contract

Permanent changes use the narrowest relevant unit or component checks first, then the repository
quality gate. UI changes are reviewed at 375, 768, 1024, and 1440px for both locales and themes,
with keyboard focus, reduced motion, no horizontal overflow, stable fonts, and the affected
Playwright flow. Writing changes prove that delayed or invalid feed work leaves the portfolio usable.
