---
name: INDRA.DEV
description: Decision Atlas visual system for making complex frontend decisions legible.
colors:
  night-water: "#07161D"
  survey-paper: "#EDF1F2"
  deep-ink: "#12242C"
  map-fog: "#B8C6CB"
  route-blue: "#2E5BFF"
  signal-orange: "#FF6A3D"
typography:
  display: "Recursive Variable, clamp(3rem, 8vw, 7.5rem), 760, 0.92"
  section: "Recursive Variable, clamp(2rem, 4.5vw, 4.25rem), 760, 0.98"
  title: "Recursive Variable, clamp(1.4rem, 2.5vw, 2.25rem), 720, 1.04"
  body: "Recursive Variable, 1rem, 450, 1.65"
  prose: "Recursive Variable, clamp(1.05rem, 1.5vw, 1.15rem), 450, 1.75"
  metadata: "Recursive Variable with MONO axis, 0.72rem, 650, 1.4"
motion:
  feedback: "160ms"
  state: "260ms"
  entrance: "520ms"
  path: "900ms"
  easing: "cubic-bezier(0.16, 1, 0.3, 1)"
---

# Decision Atlas design system

## Intent

Decision Atlas treats a recruiter visit as a map of decisions. The portfolio starts with a
high-contrast claim, then traces one supplied project from problem through delivery to outcome.
The featured Petron path is the memorable element. Everything around it stays quiet, factual, and
easy to scan.

The portfolio remains INDRA.DEV. Decision Atlas is the visual and interaction direction, not a new
product name. It is a family with two rhythms: the portfolio is expressive and persuasive, while
the separate blog is calm and reading-first.

## Palette

The six shared values are semantic and available in both scenes:

- Night Water `#07161D` is the dark canvas.
- Survey Paper `#EDF1F2` is the light canvas and the primary light text.
- Deep Ink `#12242C` is the dark surface and the light text value.
- Map Fog `#B8C6CB` is supporting text and quiet structure on the dark scene.
- Route Blue `#2E5BFF` marks the mapped route, primary action, and focus ring.
- Signal Orange `#FF6A3D` marks a cue, active state, or actionable edge.

Dark mode uses Night Water and Survey Paper. Light mode uses Survey Paper and Deep Ink. Section
surfaces are made with a six percent foreground mix instead of introducing extra brand colors.
Orange or blue never carries state meaning by itself. A state also changes text, border, shape, or
native disclosure affordance.

## Type

Recursive Variable is self-hosted for display, interface, and metadata. Its `CASL`, `MONO`, and
`wght` axes create the map instrument signature without changing the size or line breaks of the
content. Metadata uses `MONO` for orientation, not as a decorative all-caps label.

The shared role names are `--font-ui`, `--font-prose`, and `--font-mono`; the portfolio maps all
three to its local Recursive family.

Literata Variable is reserved for Blog prose in the sibling repository. The portfolio only uses
Recursive. Both families are retained locally with their OFL notices when a repo ships them.

All content is left aligned. Reading measures stop at `72ch`; line length is never used as a
decorative full-width texture. The core scale is:

- display: `clamp(3rem, 8vw, 7.5rem)`
- section: `clamp(2rem, 4.5vw, 4.25rem)`
- title: `clamp(1.4rem, 2.5vw, 2.25rem)`
- body: `1rem / 1.65`
- prose: `clamp(1.05rem, 1.5vw, 1.15rem) / 1.75`

## Layout story

```text
Header: INDRA.DEV                 Projects  Capabilities  Testimonials  Writing  ID  theme

Hero:   Decision Atlas             portrait on desktop
        large factual claim
        proposition + Email + CV
        location / compact portrait on mobile

Path:   Petron Philippines Corporate Dashboard
        route rail                 problem
                                  ownership
                                  delivery
                                  outcome

Proof:  Capabilities              Projects
        Testimonials               Writing
```

The sequence is Hero, featured Petron path, Capabilities, other Projects, Testimonials, Writing,
then Footer. The Projects section owns the visible `#projects` anchor. A small non-visual
`#experiences` compatibility target remains at the same section boundary for existing bookmarks.

At 1024px and above the Petron route rail is sticky while the four supplied evidence fields pass
beside it. At smaller widths the same four fields are complete inline in document order. There is
no scroll lock, scroll hijacking, custom cursor, WebGL, or route transition.

On desktop, the rail line, marker, and four nodes follow the featured path shell's scroll progress;
the inline layout remains static. Reduced motion renders the completed route directly.

The formal portrait stays in the desktop hero. On mobile it becomes a compact stage after the
intro and actions and before the featured path. The portrait, CV, external links, project facts,
and approved testimonials are unchanged.

## Geometry and depth

Lines and nodes represent only a relationship, progress, heading, or real state. The Petron rail is
a 2.5D CSS layer with a route line and four numbered nodes because those nodes are a real sequence.
Hero layers react subtly to the pointer while retaining the native cursor. The route has no
semantic content and is hidden from assistive technology.

Surfaces are mostly flat. Depth comes from the route rail, a thin border, and a restrained orange
offset behind the portrait. Rounded pills are reserved for technology badges. The featured project
and sections use rectangular boundaries.

## Motion grammar

The only runtime is the local `motion` package. A single `LazyMotion` and `MotionConfig` boundary
is mounted in the locale layout. Client islands are limited to hero layers/signature, Petron path
nodes, menu behavior, theme feedback, active navigation, and back-to-top behavior. Composition,
data, SEO, and content remain server-first.

- Feedback such as theme and icon acknowledgement: `160ms`.
- Disclosure and layout state: `260ms`.
- Hero entrance: `520ms`.
- Petron route progression: `900ms`, easing `[0.16, 1, 0.3, 1]`.
- Layout morphs use a spring with stiffness `260`, damping `28`, and mass `0.8`.

There is one authored entrance sequence, the hero, and one authored relationship sequence, the
Petron path. Cards and paragraphs do not slide in independently. There are no route transitions.

With `prefers-reduced-motion: reduce`, the final state is rendered directly. Path drawing, pointer
parallax, perspective, smooth scrolling, and non-essential transforms are removed. Opacity,
content order, keyboard flow, and native state feedback remain available.

## Navigation and state

Visible navigation is localized as `Proyek / Projects`, `Kapabilitas / Capabilities`,
`Testimoni / Testimonials`, and `Tulisan / Writing`. All four links use real section anchors.
The site keeps the skip link, native dialog drawer, Escape behavior, focus restoration, visible
focus, 44px targets, local theme persistence, and the optional feed fallback.

Secondary projects use native `<details>`. The browser owns the disclosure state; the action text,
border, and icon are additional state cues. The writing feed remains a bounded, recoverable server
boundary and never hides the rest of the portfolio while it loads.

## Accessibility and responsive review

Review at 375, 768, 1024, and 1440px in both themes and both locales. Check keyboard-only order,
skip-link focus, dialog focus return, reduced motion, feed failure, and no horizontal overflow.
Snapshots wait for fonts and either finish or disable motion deterministically. There must be no
content hidden before hydration and no layout shift caused by font or animation.

## Do and do not

Do use the six semantic values, the Recursive axes, the supplied facts, native HTML states, and
the route relationship. Do keep all labels in both dictionaries.

Do not add metrics, client claims, endorsements, imagery, or testimonials. Do not turn every
section into a card, use accent color as the only state signal, or reintroduce the retired visual
language.
