# Portfolio Maintainability Architecture

This document defines the permanent ownership and change contracts for INDRA.DEV. It complements
`DESIGN.md`, which remains the authority for product behavior and visual design.

## Route composition

`src/app/[locale]/page.tsx` is the server composition root. It validates the locale before rendering
any Suspense boundary, loads static portfolio content and dictionary copy, then composes the proof
sequence.

The optional blog feed belongs inside the Writing Suspense boundary. A slow or unavailable blog must
not delay Hero, Capabilities, Projects, Testimonials, or Contact. The fallback renders the localized
Writing heading immediately, marks the section busy, reserves its final vertical space, and exposes no
fake article or error state. Once the feed resolves, the fallback is replaced by either the ready or
unavailable state.

## External blog seam

`src/lib/blog.ts` owns every public or machine-facing blog URL:

- blog home
- latest-post feed endpoint
- article URL

`src/lib/latest-posts.ts` owns transport, timeout, revalidation, and feed validation. Callers must not
construct blog paths or know the feed endpoint. The blog is single-language, so recovery links always
use the blog home URL and never append the portfolio locale.

Change recipe for a blog route:

1. Update `src/lib/blog.ts`.
2. Update `src/lib/blog.test.ts`.
3. Verify ready, invalid, timeout, and unavailable feed behavior.

## Portfolio content seam

`src/content/portfolio.ts` separates facts from translations.

Locale-neutral facts are stored once:

- profile name, professional role, structured location, and image source
- company and experience identity
- project ID, official title, technologies, featured state, and canonical ordering
- testimonial identity, role, organization, approved verbatim quote, category, and ordering

Localized copy is keyed by stable experience and project IDs:

- profile headline, value proposition, and image alternative text
- period and responsibilities
- project summary, problem, ownership, delivery, and outcome
- capabilities

`PortfolioFactsSchema`, `PortfolioTranslationsSchema`, and `PortfolioContentSchema` reject missing,
unexpected, duplicated, or invalid records when the module loads. Assembly has no English fallback,
silent omission, or positional join. `getPortfolio` returns the already validated assembled content.

Exactly one project is explicitly featured. Every testimonial has an explicit `collaborator` or
`mentoring` category. Presentation modules must use those fields rather than array position.
Approved testimonial quotes remain verbatim and locale-neutral.

Change recipe for a project:

1. Add or update its locale-neutral facts and canonical ordering.
2. Add matching copy under the same stable ID in every registered locale.
3. Update the schemas only when the public content contract genuinely changes.
4. Verify content assembly and the affected section behavior.

Change recipe for a public identity fact:

1. Update the structured fact once in `portfolioFacts`.
2. Render each surface from that fact. Surfaces may choose punctuation, but may not duplicate values.
3. Verify Hero, metadata or structured data, Open Graph, and Footer as applicable.

## Locale seam

`src/i18n/config.ts` owns the locale registry, default locale, type, predicate, and recovery fallback.
`src/i18n/route-locale.ts` owns the route policy.

Route-bearing surfaces must call `requireLocale`. Invalid locale segments produce a 404. Error and
not-found recovery UI may call `getRecoveryLocale` because those surfaces must remain renderable.
Schemas, static params, dictionary records, sitemap entries, and metadata alternates derive from the
locale registry.

Change recipe for a locale:

1. Add the locale to the registry.
2. Add a dictionary with complete key and placeholder parity.
3. Add complete portfolio translations keyed by all canonical IDs.
4. Verify route, metadata, Open Graph, sitemap, locale switcher, and recovery behavior.

Do not add dynamic loaders or a locale plugin system while catalogs remain small static modules.

## Browser interaction seam

`src/components/site-interactions.tsx` remains the single non-React browser interaction boundary. It
owns theme persistence, scroll-to-top behavior, active navigation, and mobile dialog behavior.

`src/components/site-interaction-contract.ts` owns the `data-site-interaction` marker values used by
both JSX and the raw script. Styling classes are not behavioral hooks. New browser behavior must reuse
this seam unless it requires React state that cannot be expressed safely with native DOM behavior.

Change recipe for an interaction:

1. Add or update a marker value in the interaction contract.
2. Apply the marker in the owning semantic element.
3. Build the script selector from the shared marker.
4. Add a narrow behavioral assertion and preserve keyboard, focus, and reduced-motion behavior.

## CSS ownership

`src/app/globals.css` is only the ordered CSS entrypoint. Ownership modules are:

- `src/styles/foundation.css`: theme mapping, base rules, shared utilities, and global motion
- `src/styles/shell.css`: header, controls, mobile navigation, and footer
- `src/styles/hero.css`: Hero and portrait stage
- `src/styles/proof-case-studies.css`: capabilities, experience context, and case studies
- `src/styles/testimonials.css`: testimonial groups and cards
- `src/styles/writing.css`: Writing ready, loading, and unavailable states
- `src/styles/contact.css`: Contact close

Responsive rules stay with their owner. Import order is part of the cascade contract and must remain
foundation, shell, hero, proof, testimonials, writing, then contact. Design tokens remain in
`src/styles/design-tokens.css`.

A feature should change its owning module. Shared tokens or utilities move to foundation only when at
least two owners use the same semantic rule. Do not introduce CSS Modules, CSS-in-JS, or a styling
dependency without a demonstrated limitation in the current cascade.

## Verification contract

Permanent changes must use the narrowest relevant contract checks, then the canonical
`pnpm run verify` gate. UI changes also require browser verification for both locales, light and dark
themes, mobile and desktop widths, keyboard behavior, reduced motion, and no horizontal overflow.

Writing integration changes must additionally prove that delayed feed work does not prevent critical
portfolio content from rendering and that an unavailable feed leaves the rest of the portfolio usable.
