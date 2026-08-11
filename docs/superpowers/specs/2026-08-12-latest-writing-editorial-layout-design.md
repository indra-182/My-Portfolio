# Latest Writing Editorial Layout Design

**Date:** 2026-08-12  
**Status:** Approved design; implementation not started  
**Application:** `/home/mahad/code/Personal/portfolio`

## 1. Objective

Redesign the portfolio's `Latest Writing` section so a feed containing only one
article does not leave an unintended empty desktop grid column. The section
should make the available content feel intentional while preserving the
existing editorial portfolio direction, blog links, locale routing, and feed
contract.

## 2. Success Criteria

- A single article produces a complete, balanced desktop composition with no
  empty grid track.
- Two articles use the available width without an empty third column.
- Three or more articles retain a compact three-card editorial grid.
- The layout stacks cleanly on mobile without horizontal overflow.
- Existing article URLs, blog archive URL, date formatting, locale behavior,
  and unavailable-feed fallback remain unchanged.
- Interactive cards preserve keyboard focus, visible focus rings, and reduced
  motion behavior.
- The component remains a server component and requires no new dependency.

## 3. Scope

### In scope

- Update `src/components/sections/latest-writing-section.tsx`.
- Update the focused component test to cover the one-, two-, and three-post
  layout states where class-level layout behavior is part of the contract.
- Add a small static editorial aside for the one-post state to turn unused
  space into purposeful context.

### Out of scope

- Changes to `LatestFeedResult`, feed fetching, blog routes, or content data.
- New images, external fonts, animations libraries, or UI dependencies.
- Changes to the section's localization model or unrelated portfolio sections.

## 4. Approved Visual Direction

The section follows an editorial, content-first treatment using the existing
Inter and Geist Mono typography, dark/light semantic tokens, restrained borders,
and the existing blue accent. The UI should remain structured and quiet rather
than adding decorative gradients, emoji, glass effects, or arbitrary imagery.

### Header

Keep the existing eyebrow, heading, and `Visit blog` action. The archive action
remains the section's primary CTA and keeps its current accessible focus state.

### One-post state

Render a responsive split layout:

- The article is the featured panel and occupies the larger column.
- A right editorial aside occupies the companion column and contains a short
  static message about writing in public and frontend/product systems.
- The aside is informational rather than a second competing CTA; the header's
  `Visit blog` link remains the archive action.
- The featured article can use a slightly larger title and a stronger surface
  hierarchy, while retaining topic, date, description, and reading time.

### Two-post state

Render two equal-width article cards. Do not render a third placeholder or
empty track.

### Three-or-more-post state

Render the first three articles in the existing three-column card grid. Keep
the current feed limit and article link destinations.

### Responsive behavior

- Use a mobile-first single-column layout by default.
- Introduce the split or multi-column layouts at the existing `md` breakpoint.
- Keep comfortable card spacing and prevent horizontal scrolling.
- Keep tap targets at least 44 pixels high and preserve readable body text.

## 5. Interaction and Accessibility

- Make each article card a full-surface link through the existing overlay-link
  pattern, with a visible focus ring.
- Use the existing SVG arrow icon family; do not introduce emoji or text glyph
  icons.
- Use opacity, color, and arrow translation for hover/pressed feedback without
  changing layout bounds.
- Keep transition timing within the existing motion token range and allow the
  reduced-motion media query to disable nonessential motion.
- Mark the decorative/editorial aside with a semantic heading and keep any
  decorative number or shape hidden from assistive technology.
- Preserve sequential heading hierarchy and meaningful link names.

## 6. Component and Data Boundaries

`LatestWritingSection` remains the only component boundary for this change. It
will derive the presentation state from `result.status` and the number of
posts, without changing `LatestFeedResult` or fetching behavior:

1. Ready with at least three posts: three-card grid.
2. Ready with two posts: two-card grid.
3. Ready with one post: featured card plus editorial aside.
4. Ready with zero posts or unavailable: existing blog fallback card.

The existing `formatDate` helper and locale-aware article/blog URLs remain the
source of truth for metadata and navigation.

## 7. Verification Plan

- Update and run the focused `latest-writing-section` test.
- Run typecheck and lint after the component change.
- Run the relevant production build if the focused checks pass.
- Visually verify the section at approximately 375px, 768px, 1024px, and
  1440px in both theme modes, including the one-post state shown in the report.
- Confirm the unavailable/empty fallback still contains a direct blog link and
  no article cards.

## 8. Risks and Mitigations

- **Risk:** The new aside feels like invented portfolio content.  
  **Mitigation:** Keep it short, generic, and clearly editorial; do not claim
  metrics, topics, or article counts that are not in the feed.
- **Risk:** Responsive class changes accidentally alter existing article URLs
  or link semantics.  
  **Mitigation:** Keep the current link construction and overlay-link pattern,
  and retain explicit tests for article and archive URLs.
- **Risk:** Layout changes create a visual shift during theme or motion changes.
  **Mitigation:** Use existing semantic tokens and transform/opacity-only
  interaction effects.
