# Portfolio Maintainability Architecture

This document defines the permanent ownership and change contracts for INDRA.DEV. It complements
`DESIGN.md`, which remains the authority for product behavior and visual design.

## Route composition

`src/app/[locale]/page.tsx` is the server composition root. It validates the locale before rendering
any Suspense boundary, loads static portfolio content and dictionary copy, then composes the proof
sequence.

The optional blog feed belongs inside the Writing Suspense boundary. A slow or unavailable blog must
not delay Hero, Capabilities, Projects, Testimonials, or the Footer. The fallback renders the
localized Writing heading immediately, marks the section busy, reserves its final vertical space, and
exposes no fake article or error state. Once the feed resolves, the fallback is replaced by either the
ready or unavailable state.

## Existing-surface refinement contract

The proof sequence ends with Writing and then the shared Footer. There is no standalone Contact
section and no `#contact` navigation target. Hero keeps the direct email and CV actions; Footer keeps
Blog, GitHub, LinkedIn, and email links. Shared values continue to come from `siteConfig`.

The project navigation label is visibly `Experiences` in both locales. This copy change does not
rename `navigation.caseStudies`, `CaseStudiesSection`, `#case-studies`, or its anchors. Stable
implementation identifiers do not follow presentation copy unless a broken reference requires it.

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
silent omission, or positional join. `portfolioByLocale` exposes the already validated assembled content.

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

## Tailwind CSS ownership

`src/app/globals.css` remains the ordered Tailwind CSS v4 entrypoint.
`src/styles/design-tokens.css` remains the semantic token and two-theme variable contract.
`src/styles/foundation.css` owns `@theme`, base and global browser rules, global motion, and shared
semantic invariants that prevent repeated class strings. Existing invariants such as `content-shell`,
`cue-kicker`, `cue-button`, and `cue-section` may remain CSS utilities while they have multiple
callers and one stable meaning.

Feature-specific layout, spacing, typography, responsive behavior, color, border, and ordinary state
styling use Tailwind utilities in the owning JSX when the result is direct and readable. Do not create
React wrappers or helpers solely to replace a CSS class.

An owner stylesheet may remain only for rules that would become less legible as JSX utilities:

- complex gradients and `color-mix`
- pseudo-elements, dialog backdrops, and native marker selectors
- keyframes, view timelines, animation ranges, and feature detection
- relational or runtime state selectors such as `[open]`, `data-*`, `aria-current`, `.is-active`,
  and `.is-visible`
- the 900px Hero breakpoint where it expresses the portrait-stage contract
- reduced-motion overrides and global browser behavior

Retained owner styles stay beside their feature as `shell.css`, `hero.css`,
`proof-case-studies.css`, `testimonials.css`, or `writing.css`. Remove any selector, import, and owner
file left without a retained rule. `contact.css` has no owner after the Contact section is removed.
Among retained files, import order follows the visual sequence after foundation. Do not consolidate
unrelated exceptions into a generic stylesheet, add CSS Modules or CSS-in-JS, or add a styling
dependency.

## Verification contract

Permanent changes must use the narrowest relevant contract checks, then pass the canonical
`pnpm run verify` gate.

For existing-surface styling changes, capture the current worktree before editing and compare a
bounded after-state at 375, 768, 1024, and 1440px for `/id` and `/en`, in dark and light themes.
Review keyboard order, visible focus, reduced motion, and horizontal overflow. Perceptual parity is
strict: identity, hierarchy, geometry, color, typography, and state feedback remain unchanged.
Subpixel rasterization differences are acceptable. For this refinement, the only intended visual
deltas are removal of the Contact section, the Footer moving directly after Writing, and the visible
label changing from `Case Studies` to `Experiences`.

Automated browser checks must assert both locale routes, both themes, all four viewport widths,
keyboard and focus behavior, reduced-motion behavior, no `#contact` section or navigation, no
user-visible exact `Case Studies` text, a working Footer email link, and no horizontal overflow.

Writing integration changes must additionally prove that delayed feed work does not prevent critical
portfolio content from rendering and that an unavailable feed leaves the rest of the portfolio usable.
