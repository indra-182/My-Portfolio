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

## Experience and Project interface

The proof sequence ends with Writing and then the shared Footer. There is no standalone Contact
section and no `#contact` navigation target. Hero keeps the direct email and CV actions; Footer keeps
Blog, GitHub, LinkedIn, and email links.

`src/components/sections/experiences/experiences-section.tsx` renders the `Experience > Project`
domain interface. An Experience is an employment role, company, period, and responsibility record
containing ordered Projects. Exactly one Project is featured; the remaining Projects use native
`<details>` disclosures.

Navigation uses the localized `Experiences` label and the `#experiences` anchor in both locales.

## External blog seam

`src/lib/blog.ts` owns every public or machine-facing blog URL:

- blog home
- latest-post feed endpoint
- article URL

`src/lib/latest-posts.ts` owns transport, timeout, revalidation, feed validation, and the three-post
adapter limit. Callers must not construct blog paths or know the feed endpoint. The blog is
single-language, so recovery links always use the blog home URL and never append the portfolio locale.

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

`PortfolioFactsSchema`, `PortfolioTranslationsSchema`, and `PortfolioContentSchema` define the
validation contract and reject missing, unexpected, duplicated, or invalid records when explicitly
parsed. The static portfolio module relies on TypeScript's typed assignments and explicit exact-key
checks during assembly; `portfolioByLocale` exposes content after those checks, not a module-load Zod
parse. Assembly has no English fallback, silent omission, or positional join.

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

## Browser interaction seam

`src/components/shell/site-interactions.tsx` remains the single non-React browser interaction
boundary. It owns theme persistence, scroll-to-top behavior, active navigation, and mobile dialog
behavior.

`src/components/shell/site-interaction-contract.ts` owns the `data-site-interaction` marker values
used by both JSX and the raw script. Styling classes are not behavioral hooks. New browser behavior
must reuse this seam unless it requires React state that cannot be expressed safely with native DOM
behavior.

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

Retained owner styles stay beside their feature: `src/components/shell/shell.css`,
`src/components/sections/hero/hero.css`, `src/components/sections/experiences/experiences.css`, and
`src/components/sections/writing/writing.css`. Remove any selector, import, or owner file left
without a retained rule. Global tokens and foundation remain in `src/styles/`.
Among retained files, import order follows the visual sequence after foundation. Do not consolidate
unrelated exceptions into a generic stylesheet, add CSS Modules or CSS-in-JS, or add a styling
dependency.

## Verification contract

Permanent changes must use the narrowest relevant contract checks, then pass the canonical
`pnpm run verify` gate. `DESIGN.md` is the authority for visual, motion, accessibility, and
responsive behavior.

For owner-folder, route, or feed changes, verify the affected TypeScript and contract tests, then
run the canonical gate. For existing-surface styling changes, compare bounded captures at 375, 768,
1024, and 1440px for `/id` and `/en`, in dark and light themes. Review keyboard order, visible focus,
reduced motion, and horizontal overflow.

Writing integration changes must prove that delayed feed work does not prevent critical portfolio
content from rendering and that an unavailable feed leaves the rest of the portfolio usable.
