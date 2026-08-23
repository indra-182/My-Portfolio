# DESIGN.md

## Direction

The visual direction is **Authority Editorial**: a quiet editorial grid, strong hierarchy, high contrast, restrained blue accents, and credibility-first content. The portfolio should feel authored and dependable, not like a generic generated template.

Use `src/styles/design-tokens.css` as the source of truth for color, spacing, radius, content width, and motion values. Consume semantic classes and CSS variables rather than theme-specific hex values in components.

## Brand and type

- Wordmark: `INDRA.DEV` in uppercase. The dot is the repeatable blue accent detail.
- Interface and editorial type: the native Arial/Helvetica sans-serif stack to avoid a
  render-blocking font request.
- Technical metadata and labels: the native system monospace stack.
- Body text starts at 16px with approximately 1.6 to 1.75 line height.
- Keep prose near the existing `--prose-max` measure. Create hierarchy with scale, weight, spacing, and alignment rather than decorative effects.

## Color contract

| Token      | Light     | Dark      |
| ---------- | --------- | --------- |
| Background | `#FAFAFA` | `#0B0D10` |
| Foreground | `#101114` | `#F5F7FA` |
| Surface    | `#F1F3F6` | `#15181D` |
| Muted text | `#5D626B` | `#A6ADB8` |
| Border     | `#D8DADD` | `#2C3139` |
| Accent     | `#2563EB` | `#60A5FA` |

Maintain WCAG AA contrast for text and controls. Use the existing destructive and focus-ring tokens for those states.

## Layout and components

- Use the existing `content-shell`, which is capped by `--content-max` and widens its side gutters at desktop sizes.
- Use semantic token roles for surfaces and controls: `card` for bounded content surfaces, `popover` for overlays, `primary` for the blue action, `secondary` for quiet controls, `muted` for low-emphasis surfaces, `input` for control borders, and `ring` for focus indication. These roles map to the existing palette in `src/styles/design-tokens.css`; they do not introduce new hues.
- Use the editable shadcn-compatible `Button` and `Badge` primitives in `src/components/ui` for repeated controls and technology or topic labels. They are native, server-safe elements with `data-slot` attributes, `class-variance-authority` variants, and no `asChild`, render-prop, Base UI, Radix, or client-provider dependency.
- Keep the page mobile-first and test at 375, 768, 1024, and 1440px. Never introduce horizontal overflow.
- Prefer editorial sections separated by borders and intentional whitespace. Existing content cards are mostly rectangular with small control radii, not a wall of floating rounded cards.
- Keep header and footer behavior consistent: wordmark, locale switcher, theme toggle, navigation, skip link, and direct contact or blog actions.
- Use Lucide icons through the existing `react-icons/lu` pattern for UI controls. Brand icons may use the existing `react-icons/fa` pattern.
- Icon-only controls need an accessible name and a tooltip or title. Interactive targets are at least 44px.
- Keep the portfolio content-first. Do not add decorative imagery, gradients, glass effects, animated cursors, scroll-jacking, parallax, or 3D unless a later approved spec requires it.

## Motion and states

- Use the existing `--motion-fast` and `--motion-enter` tokens.
- Primary entrance motion may combine opacity with an 8 to 12px vertical offset. Hover motion should be subtle and never change layout.
- `prefers-reduced-motion: reduce` removes entrance motion and smooth scrolling.
- Design loading, empty, error, and not-found states as part of the feature. Explain what happened and give the next available action.
- Keep testimonials hidden when there are no approved quotations. Feed failures must leave the rest of the portfolio usable.

## Localization and content

- Keep `/id` and `/en` routes stable. The locale switcher should preserve the equivalent page when one exists.
- Translate user-facing strings in the existing dictionaries and keep content structures aligned across locales.
- Keep portfolio content in typed local data validated by `src/content/portfolio-schema.ts`.
- Use supplied or approved facts only. Protect client confidentiality and avoid unsupported metrics or claims.

## Accessibility checklist

- Use semantic landmarks and sequential headings.
- Preserve the skip link and `main` target.
- Provide useful image alternatives and declared media dimensions or aspect ratios.
- Keep focus visible, keyboard paths predictable, and color-independent states understandable.
- Verify light, dark, both locales, reduced motion, mobile navigation, and the affected route before handoff.

Do not use em dash punctuation in copy, comments, or documentation. Use a hyphen, comma, colon, or parentheses instead.
