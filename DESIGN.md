---
name: INDRA.DEV
description: Cue Horizon visual system for a recruiter portfolio that makes complex frontend workflow ownership legible.
colors:
  background-dark: "#08090d"
  foreground-dark: "#f4f1e9"
  surface-dark: "#11131a"
  surface-strong-dark: "#191d27"
  muted-dark: "#a9adba"
  border-dark: "#343a4a"
  accent-dark: "#f29ab0"
  accent-foreground-dark: "#130a0e"
  destructive-dark: "#f38b8b"
  focus-dark: "#91b9f3"
  primary-dark: "#f4f1e9"
  primary-foreground-dark: "#08090d"
  cobalt: "#173b72"
  cue-day: "#f4f1e9"
  background-light: "#f4f1e9"
  foreground-light: "#08090d"
  surface-light: "#e9e5de"
  surface-strong-light: "#ddd9d2"
  muted-light: "#5d6069"
  border-light: "#c5c3c0"
  accent-light: "#8f304e"
  accent-foreground-light: "#fff8f7"
  primary-light: "#173b72"
  primary-foreground-light: "#f4f1e9"
  destructive-light: "#b4232d"
  focus-light: "#173b72"
  popover-light: "#fffdf8"
  popover-dark: "#191d27"
typography:
  display:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "clamp(2.75rem, 6.8vw, 5.25rem)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 4.75rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.04em"
  title:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "clamp(1.4rem, 2.5vw, 2.25rem)"
    fontWeight: 750
    lineHeight: 1.05
    letterSpacing: "-0.04em"
  body:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
    fontSize: "0.65rem"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "0.16em"
  scale:
    micro-display: "0.78rem"
    compact-body: "0.85rem"
    action-label: "1.1rem"
    compact-heading: "0.9rem"
    medium-label: "0.72rem"
    context-heading-min: "1.5rem"
    context-body: "0.92rem"
    feature-heading-min: "1.8rem"
    disclosure-heading: "1.2rem"
    testimonial-min: "1.15rem"
    writing-heading-min: "2rem"
    writing-card-heading-min: "1.35rem"
    writing-body: "0.86rem"
    writing-aside-heading-min: "1.55rem"
    fallback-body: "1.05rem"
    contact-heading-min: "2.4rem"
    contact-body: "1.08rem"
    desktop-heading-min: "3rem"
    mobile-heading-min: "2.3rem"
rounded:
  sm: "0.15rem"
  md: "0.3rem"
  pill: "999px"
spacing:
  control-height: "2.75rem"
  button-large-height: "3rem"
  shell-mobile-gutter: "1rem"
  shell-wide-gutter: "1.5rem"
  section-block: "clamp(4.5rem, 9vw, 8rem)"
  content-max: "76rem"
components:
  button-primary:
    backgroundColor: "{colors.primary-dark}"
    textColor: "{colors.primary-foreground-dark}"
    rounded: "{rounded.sm}"
    padding: "0 1.25rem"
    height: "3rem"
  button-outline:
    backgroundColor: "{colors.background-dark}"
    textColor: "{colors.foreground-dark}"
    rounded: "{rounded.sm}"
    padding: "0 1.25rem"
    height: "3rem"
  badge-outline:
    backgroundColor: "transparent"
    textColor: "{colors.foreground-dark}"
    rounded: "{rounded.pill}"
    padding: "0.25rem 0.625rem"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.muted-dark}"
    rounded: "{rounded.sm}"
    padding: "0 0.75rem"
    height: "2.75rem"
  site-navigation:
    backgroundColor: "{colors.background-dark}"
    textColor: "{colors.foreground-dark}"
    height: "4.75rem"
  case-study-featured:
    backgroundColor: "{colors.surface-strong-dark}"
    textColor: "{colors.foreground-dark}"
    padding: "clamp(1.35rem, 3vw, 2.5rem)"
  case-study-disclosure:
    backgroundColor: "transparent"
    textColor: "{colors.foreground-dark}"
    padding: "0.9rem 0"
---

# Design System: INDRA.DEV

## Overview

**Creative North Star: "Cue Horizon"**

Cue Horizon treats a portfolio visit like a controlled stage cue. The recruiter enters a near-black cyclorama, finds a cobalt horizon and a rose transition, then follows tabular labels through the supplied work. The physical scene is stagecraft dawn: a matte stage floor, a tightly controlled luminance range, thin structural lines, and deliberate breathing room between the hero and the proof sequence.

The page is an Experience surface. The work leads, while the direct email action remains visible in the first viewport and returns at the close. On desktop, the first viewport visibly contains the headline, proposition, email action, CV action, and formal portrait. On mobile and tablet, the hero is compact and ends after the location cue, without the portrait stage. The hero begins with the headline itself and ends with deliberate lower padding before Capabilities. There is no eyebrow above the heading. Cue Horizon is not a generic developer template, a fintech dashboard, or a cosmetic continuation of the previous Authority Editorial world. It is a code-led system committed in the layout contract with seed `6dea048c`.

The emitted direction contract records this thesis: "Cue Horizon stages complex workflow ownership as visible cues, refusing generic developer-template chrome and cosmetic editorial polish." Its own-world line is "Near-black cyclorama, cobalt horizon, rose transition, white-day focus, cue tape, matte stage floor, tabular cue labels, and controlled luminance." Its story moves from the workflow-specialist claim to the featured Petron project, through the remaining evidence, and finally to email. The desktop first viewport is "Night field into a cobalt horizon; headline and email action left; formal portrait under side-light right; clear breathing room into the proof sequence." The mobile and tablet first viewport is "Headline and email action over the cobalt horizon, ending at the location cue without the portrait stage." The form is "Stagecraft cyclorama dawn, assigned direction, seed 6dea048c, code-led." The finish line is unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

**Key Characteristics:**

- Dark-first stage scene with a persistent white-day light counterpart.
- Bold system sans headlines balanced by tabular monospace cues.
- Cobalt horizon and rose transition used as directional signals, not decoration.
- Thin borders, rectangular surfaces, and restrained state motion.
- A featured Petron project, native disclosures, and a direct contact close.

## Colors

The palette is a two-theme role system. The root values are the dark scene, and `.light` remaps the same semantic roles for a white-day scene. The frontmatter records the literal values from `src/styles/design-tokens.css`.

### Primary

- **White-day action** (`--primary` in dark mode): The light action face and strongest dark-theme text. It carries the main email action and high-priority type.
- **Cobalt day action** (`--primary` in light mode): The dark action face against the light scene. It keeps the primary control legible without introducing a new hue.

### Secondary

- **Cobalt horizon** (`--cue-cobalt`): The fixed directional field behind the hero gradient, writing aside, contact wash, and featured-project cue line. It remains cobalt in both themes.
- **Focus blue** (`--focus-ring`): A high-visibility keyboard focus role.

### Tertiary

- **Rose transition** (`--cue-rose`): The compact signal for kickers, borders, arrows, active states, and the lower hero wash.
- **Destructive signal** (`--destructive`): Reserved for destructive or error messaging.

### Neutral

- **Night field** (`--background` and `--cue-night`): The dark canvas. In light mode the same semantic role becomes the white-day field.
- **White-day cue value** (`--cue-day`): `#f4f1e9` is the stage value used by featured proof, writing aside, and other white-day signal surfaces.
- **Stage surface** (`--surface`): The muted section field for capabilities, testimonials, and the footer.
- **Strong stage surface** (`--surface-strong`): The featured case, feed fallback, and bounded overlay surface.
- **Muted cue text** (`--muted-foreground`): Supporting copy, metadata, dates, and quiet controls.
- **Structural line** (`--border`): Thin section rules, disclosure rules, field rails, and control outlines.
- **Popover day** (`--popover` in light mode): The light overlay surface used by the mobile dialog. Dark mode uses the strong stage surface.

### Named Rules

**The Controlled Luminance Rule.** Rose marks a cue or state, cobalt establishes a horizon, and neutral values carry the reading load. Do not turn every surface into an accent field.

**The Two-Scene Rule.** Dark and light are the same Cue Horizon world. Light mode is a white-day stage, not a separate brand palette.

## Typography

**Display Font:** The system sans stack from `--font-heading`, with `ui-sans-serif`, `system-ui`, `-apple-system`, `BlinkMacSystemFont`, and `Segoe UI` fallbacks.
**Body Font:** The system sans stack from `--font-sans`.
**Label/Mono Font:** The system monospace stack from `--font-mono`, with `ui-monospace`, `SFMono-Regular`, Menlo, Monaco, Consolas, and `monospace` fallbacks.

**Character:** The sans stack is immediate, dense, and dependable without a render-blocking font request. Monospace labels behave like production cue readouts: compact, tabular, uppercase where the interface needs a clear signal, and never allowed to compete with the headline.

### Hierarchy

- **Display** (`800`, `clamp(2.75rem, 6.8vw, 5.25rem)`, `0.92` line-height, `-0.04em` tracking): The hero headline. At `min-width: 900px` it uses the final desktop scale `clamp(3rem, 4.3vw, 4.25rem)`; at `max-width: 639px` the final mobile correction uses `clamp(2.3rem, 10vw, 3rem)` with normal word wrapping via `overflow-wrap: normal` and `word-break: normal`.
- **Headline** (`800`, `clamp(2.25rem, 5vw, 4.75rem)`, `0.95` line-height, `-0.04em` tracking): Section headings. The contact close uses `clamp(2.4rem, 6vw, 6rem)` and the writing heading uses `clamp(2rem, 4.5vw, 4rem)`.
- **Title** (`750`, `clamp(1.4rem, 2.5vw, 2.25rem)`, `1.05` line-height, `-0.04em` tracking): Capability titles and supporting evidence subheads.
- **Body** (`400`, `1rem`, `1.65` line-height): Propositions, descriptions, field evidence, responsibilities, testimonials, and fallback copy. Component-specific measures stay between roughly 38rem and 42rem rather than stretching across the stage.
- **Label** (`700`, `0.65rem`, `1.4` line-height, `0.16em` tracking): Kickers, metadata, role and period labels, and control labels. Labels use uppercase when the interface needs a clear signal.

### Named Rules

**The Headline-Then-Cue Rule.** Let the sans headline state the claim first. Use monospace only to orient, label, or timestamp the work.

## Layout

The page is a full-width stage with a centered `.content-shell`. At the base width it uses `width: min(calc(100% - 2rem), var(--content-max))`, giving 1rem gutters. At `min-width: 640px` it uses `width: min(calc(100% - 3rem), var(--content-max))`, giving 1.5rem gutters. The maximum content width is `--content-max: 76rem`. Sections use `padding-block: clamp(4.5rem, 9vw, 8rem)` and thin structural top rules.

The header is sticky with a compact wordmark and controls. The hero is copy-only below 900px, ending after the location cue, then becomes a left-copy and right-portrait grid at `min-width: 900px`. The portrait stage gets a 2rem top offset and a right alignment on wide screens. The hero ends with deliberate lower padding before Capabilities.

At `min-width: 640px`, the shell uses wider gutters, case evidence fields and testimonials use two columns, and disclosure actions sit beside their copy. At `max-width: 639px`, disclosure summaries stack the localized action below the project copy and writing becomes one column. At `min-width: 768px`, full site navigation and horizontal footer links replace the mobile navigation trigger layout.

The review matrix covers 375, 768, 1024, and 1440px. The final native captures include desktop and mobile light and dark scenes, tablet, laptop, both locale variants, and reduced motion. All layouts remain usable in Indonesian and English without horizontal overflow.

The proof sequence remains Hero -> Capabilities -> Projects -> Testimonials -> Writing -> Contact. Capabilities retain semantic ordered-list structure without visible numbers. The featured Petron project keeps its non-numeric cue line, the other four projects remain native disclosures, and all proof aligns directly to the content shell.

## Elevation & Depth

Cue Horizon uses tonal layering more than elevation. Depth comes from the hero gradients, the fixed cobalt horizon, the rose lower wash, thin structural borders, and surface changes between the background, stage surface, and strong stage surface. Shadows are reserved for the portrait frame and featured case study so the stage remains flat elsewhere.

Motion uses `--motion-fast: 180ms` for control and link state transitions and `--motion-enter: 480ms` for the single hero-copy rise. The entrance uses opacity with a `0.75rem` upward offset and a decelerating `cubic-bezier(0.22, 1, 0.36, 1)`. Under `prefers-reduced-motion: reduce`, both motion tokens become `0ms`, smooth scrolling becomes automatic, and `.animate-cue-rise` has no animation so content is immediately present.

### Shadow Vocabulary

- **Portrait side-light:** `0.6rem 0.6rem 1.5rem color-mix(in srgb, var(--cue-rose) 38%, transparent)`, used to make the formal portrait read as a lit object on the stage.
- **Featured case horizon:** `0.65rem 0.65rem 2rem color-mix(in srgb, var(--cue-cobalt) 34%, transparent)`, used to distinguish the primary evidence surface from the disclosure list.

### Named Rules

**The Flat Stage Rule.** Surfaces are flat at rest. A colored offset shadow is a signature cue for the portrait and featured proof, not a default card treatment.

## Shapes

The form language is rectangular and precise. Small controls and bounded cue surfaces use `--radius-sm: 0.15rem`; the shared primitive also exposes `--radius-md: 0.3rem`. Badges are the only recurring pill silhouette at `999px`. Thin borders define stage edges, section divisions, field rails, disclosure rows, and overlay boundaries. The featured case, writing cards, contact field, and footer remain rectangular rather than becoming floating rounded cards.

The shell wordmark, locale switcher, theme toggle, mobile trigger, site links, and skip link preserve exact 44px (`2.75rem`) interaction targets. The shared icon button is `2.75rem` square. Writing title links and blog action links use `min-height: 2.75rem` targets. The mobile navigation links use a `3.5rem` minimum row. Icons sit inside those targets and never carry interaction meaning without an accessible label.

## Components

### Localized Content Contract

The final localized copy is factual and shared across both themes. The hero leads with these exact strings:

- **Indonesian headline:** `Saya merancang frontend untuk workflow finansial yang tidak boleh membingungkan pengguna.`
- **Indonesian proposition:** `Dari registrasi korporat sampai transaksi investasi, saya mengubah state, validasi, dan keputusan yang rumit menjadi alur yang jelas, tangguh, dan dapat diuji.`
- **English headline:** `I design frontend systems for financial workflows that cannot afford to confuse users.`
- **English proposition:** `From corporate onboarding to investment transactions, I turn complex states, validation, and decisions into clear, resilient, testable flows.`

The three capability records remain localized and factual:

- **Indonesian:** `Menjernihkan alur yang rumit` with `Saya memecah workflow multi-langkah menjadi state, keputusan, dan feedback yang dapat dipahami pengguna.`
- **Indonesian:** `Menjaga batas data tetap eksplisit` with `Saya menyusun komponen dan data flow agar validasi, perubahan state, dan tanggung jawab setiap bagian tetap dapat diprediksi.`
- **Indonesian:** `Memvalidasi perjalanan end-to-end` with `Saya menghubungkan implementasi dengan pengujian browser dan feedback lintas fungsi sebelum perubahan dirilis.`
- **English:** `Clarify complex flows` with `I break multi-step workflows into states, decisions, and feedback that users can understand.`
- **English:** `Keep data boundaries explicit` with `I structure components and data flow so validation, state changes, and ownership remain predictable.`
- **English:** `Verify the journey end to end` with `I connect implementation with browser testing and cross-functional feedback before changes ship.`

The contact close remains direct and localized:

- **Indonesian heading:** `Butuh frontend engineer untuk workflow yang kompleks?`
- **Indonesian description:** `Ceritakan role, produk, atau tantangan frontend yang sedang Anda bangun.`
- **Indonesian primary action:** `Kirim email`
- **English heading:** `Need a frontend engineer for a complex workflow?`
- **English description:** `Tell me about the role, product, or frontend challenge you are building.`
- **English primary action:** `Email me`

Navigation labels, disclosure state, testimonial hierarchy, and writing fallback labels remain dictionary-backed in `/id` and `/en`. The supplied company, role, period, project records, technologies, testimonials, portrait, CV, and external links remain unchanged.

### Buttons

- **Character:** Tactile, high-contrast stage controls with restrained color transitions.
- **Primary:** The semantic `primary` and `primary-foreground` roles, `3rem` large-action token, horizontal padding `1.25rem`, and tight `0.15rem` stage radius. Hero and contact email links use this variant and keep the email action primary.
- **Outline:** A background-matched control with a structural border. Hover shifts toward `--muted` and restores foreground contrast. The CV and LinkedIn actions use this variant where the surrounding context permits.
- **Ghost:** A quiet control for language switching, theme switching, and the contact CV action. It uses a `2.75rem` minimum height.
- **Hover / Focus:** Button transitions use `--motion-fast`. Locale and theme controls keep a transparent bottom border, muted resting color, foreground hover color, and rose hover/focus-visible border without a filled hover surface. Focus-visible uses the ring token and a visible ring. Hover changes color or border and does not change layout.

### Badges

- **Style:** Technology and writing-topic badges use the outline variant with `0.25rem 0.625rem` padding, `1px` border, monospace labels, and the `999px` pill radius.
- **State:** Badges identify a technology or topic. They are not filters and do not become interactive controls.

### Cards / Containers

- **Featured case:** The first project is a strong stage surface with `clamp(1.35rem, 3vw, 2.5rem)` internal padding, a thin border, a four-part non-numeric cue line, all four evidence fields, and technologies. Its visible heading is Petron Philippines Corporate Dashboard.
- **Disclosure rows:** The remaining four projects are native `<details>` elements. Summaries expose title, one-line summary, and localized open or close text. Details are closed initially and reveal Problem, Ownership, Delivery, Outcome, and Technologies when opened.
- **Testimonials:** Collaborator and mentoring quotes sit in a one-pixel separated grid on the muted stage surface. The first two supplied testimonials are delivery proof; the remaining two are mentoring proof. An empty approved testimonial array renders no section.
- **Writing:** A ready feed renders up to three localized posts. One post adds a cobalt aside. Writing title links and blog action links use `min-height: 2.75rem` targets. An unavailable or invalid feed renders a bordered strong-surface fallback with an actionable technical blog link and leaves the rest of the portfolio usable.

### Navigation

- **Desktop header:** A sticky `4.75rem` header uses the wordmark on the left, section links in the center, and locale and theme controls on the right. Navigation targets `#capabilities`, `#case-studies`, and `#contact`.
- **Mobile navigation:** Below `768px`, a menu trigger opens a native modal `<dialog>` as a right-side drawer. The drawer uses `background: var(--popover)`, has its own wordmark, description, close control, and stacked links. Links close the dialog, Escape follows native dialog behavior, and the close event returns focus to the trigger.
- **Footer:** The footer repeats the wordmark and description, then exposes blog, GitHub, LinkedIn, and email links with existing brand or Lucide icons. Its metadata row contains the supplied rights and location copy.

### Proof Sequence and Alignment

The hero ends with deliberate lower padding before the proof sequence. The sequence remains Hero -> Capabilities -> Projects -> Testimonials -> Writing -> Contact. Section headings, capability content, disclosure rows, and Contact align directly to the content shell without decorative sequencing columns. Capabilities keep semantic `<ol>` order without visible numbers. The featured Petron project retains its non-numeric cue line.

### Contact Close

The Contact section uses a large heading, a restrained cobalt radial field, and three direct actions: email, LinkedIn, and CV. It makes no availability or response-time promise.

### Accessibility, State, and Fallback

- The header exposes a skip link to `#main-content`; the main element is focusable for skip-link behavior. Sections use labeled semantic landmarks, capabilities use semantic ordered lists, and testimonials use figures, blockquotes, and captions.
- The portrait is eager, dimensioned at `380x480`, meaningfully visible, and carries the supplied alternative text. Decorative icons and cue lines are hidden from assistive technology.
- Shell controls keep 44px targets, focus-visible rings remain visible, and the mobile menu is a native dialog controlled by the single `SiteInteractions` boundary.
- Theme starts dark. The interaction script reads the `theme` local-storage key, applies light only when its value is `light`, and writes the next choice when the toggle is used. Missing or invalid storage falls back to dark.
- Secondary case studies use native `<details>` and start closed. The browser owns disclosure state, and opening a row reveals all four evidence fields and technologies.
- The writing feed is optional. A ready response renders up to three localized posts. A timeout, invalid payload, or non-OK response renders the localized actionable blog fallback without blocking cases, testimonials, or contact.
- All user-facing labels live in the `/id` and `/en` dictionaries, including navigation, disclosure state, testimonial hierarchy, contact actions, and fallback copy. The two locale surfaces preserve the same proof order.
- Reduced motion removes the hero entrance animation and smooth scrolling while leaving all content available immediately.

## Do's and Don'ts

### Do:

- **Do** keep Cue Horizon legible through the near-black or white-day scene, cobalt horizon, rose cues, and structural lines.
- **Do** use the semantic tokens from `src/styles/design-tokens.css` instead of theme-specific values in application components.
- **Do** keep the portrait eager, dimensioned, and visible in the first viewport, with its supplied alternative text.
- **Do** keep the hero proposition and both email and CV actions visible with the headline in the first viewport. Do not add an eyebrow above the heading.
- **Do** preserve the proof sequence: hero, capabilities, case studies, testimonials, supporting writing, and contact.
- **Do** use native disclosure behavior for secondary case studies. Let the browser own open and close state.
- **Do** keep email as the primary conversion action and retain the CV, LinkedIn, blog, GitHub, locale, and theme paths that are already supplied.
- **Do** keep all user-facing labels localized in the `/id` and `/en` dictionaries, including navigation, disclosure state, testimonial hierarchy, contact actions, and fallback copy.
- **Do** preserve the skip link, visible focus, semantic landmarks, keyboard order, 44px targets, and reduced-motion behavior.

### Don't:

- **Don't** restore the Authority Editorial treatment, cream-serif broadsheet styling, scattered blue accents, glass panels, generic fintech dashboard motifs, or a generic developer-template shell.
- **Don't** add gradients, shadows, rounded cards, decorative imagery, animated cursors, parallax, scroll-jacking, or 3D outside the defined Cue Horizon roles.
- **Don't** use rose or cobalt as a substitute for readable body text or as the only way to communicate state.
- **Don't** replace native `<details>` with a client-side accordion or add a provider, global state, or a second browser-interaction boundary.
- **Don't** add unsupported metrics, client outcomes, endorsements, availability claims, or product facts to make the visual story sound stronger.
- **Don't** introduce a new production dependency or an external font request.
- **Don't** use em dash punctuation in copy, comments, or documentation.
