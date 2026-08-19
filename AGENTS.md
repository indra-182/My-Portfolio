# AGENTS.md

## Project brief

- INDRA.DEV is a recruiter-focused portfolio for Mahadi Indra Manurung.
- Stack: Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, shadcn/ui, Zod, Vitest, and Playwright.
- Locales are explicit URL segments: `/id` is the default and `/en` is the English version.
- Use `DESIGN.md` for visual and interaction decisions. Use relevant files under `docs/superpowers/` for approved plans and specs.

## Working rules

- Inspect the relevant route, component, schema, content, and tests before editing.
- Plan non-trivial work first. Keep plans concise and list unresolved questions.
- Keep server components as the default. Add client components only for browser state or interaction.
- Keep content in typed sources such as `src/content/portfolio.ts` and `src/i18n/messages/`. Maintain Indonesian and English parity.
- Preserve the content boundary: do not invent testimonials, client results, credentials, or public claims beyond supplied or approved facts.
- Use semantic tokens from `src/styles/design-tokens.css`; do not introduce hardcoded theme colors in components.
- Reuse existing shadcn/ui and `react-icons` patterns before adding primitives or dependencies.
- Do not add a production dependency without explicit approval and a recorded reason.
- Do not use em dash punctuation. Use a hyphen, comma, colon, or parentheses instead.
- Avoid generic AI-generated UI patterns such as purple gradients, glass panels, decorative 3D, random glow, excessive rounded cards, emoji icons, or motion without a user benefit.
- For Next.js behavior that is not obvious from the code, read the matching guide in `node_modules/next/dist/docs/` before implementing.
- Do not commit, push, deploy, or change external services unless explicitly asked.

## Frontend quality bar

- Preserve semantic landmarks, heading order, descriptive image alternatives, skip navigation, keyboard access, visible focus, and at least 44px interactive targets.
- Support light and dark themes, both locales, mobile layouts, loading, empty, error, and not-found states where relevant.
- Respect `prefers-reduced-motion`; primary motion uses opacity and transform only.
- Keep public pages free of horizontal overflow and verify changes at 375, 768, 1024, and 1440px when layout changes.

## Validation

Run the narrowest relevant checks, then the full set for shared or route-level changes:

```text
pnpm run verify
```

Review the diff and run `git diff --check` before handoff. For UI changes, verify keyboard behavior, both themes, both locales, reduced motion, and the affected Playwright flow.

## Code review rules

- Flag hardcoded theme values, invented content, missing locale coverage, accessibility regressions, unnecessary client boundaries, and missing validation.
- Prefer the smallest change that satisfies the approved behavior and keeps existing route, content, and feed contracts intact.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes: APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev`: verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
