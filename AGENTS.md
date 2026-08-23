# Repository Guidelines

## Project Overview

- INDRA.DEV is Mahadi Indra Manurung's recruiter-focused, localized Next.js 16 App Router portfolio.
- Locale routes are explicit URL segments: `/id` is the default route and `/en` is the English route.
- Preserve the credibility boundary. Public copy, metrics, credentials, client claims, and testimonials must come only from supplied or approved facts. Testimonials are approved typed content in `src/content/portfolio.ts`; its four current entries set `approved: true`, and `PortfolioContentSchema` enforces approval.

## Architecture & Data Flow

- `src/app/[locale]/page.tsx` is the server composition root. It validates the route segment with `isLocale`, loads the typed dictionary and Zod-validated portfolio content, fetches optional latest posts, and passes narrow data and copy props to section components.
- `getPortfolio` validates `portfolioByLocale` with `PortfolioContentSchema`.
- `getDictionary` loads statically imported JSON catalogs whose locale structures and keys are parity-checked.
- `getLatestPosts` validates the remote feed and returns the `LatestFeedResult` discriminated union, either `ready` or `unavailable`, so a feed failure leaves the portfolio usable.
- Server components are the default. `src/components/site-interactions.tsx` is the deliberate centralized browser-interaction boundary, using `data-*` hooks and native DOM APIs. Add a client component only when an interaction cannot fit that existing pattern. Do not introduce React providers, global state, or dependency-injection abstractions unless a requested feature creates a demonstrated need.

## Key Directories

- `src/app/[locale]/`: locale routes and route states
- `src/components/` and `src/components/sections/`: shell and presentational sections
- `src/content/`: portfolio data and schemas
- `src/i18n/`: locale configuration and catalogs
- `src/lib/`: validated boundaries and utilities
- `src/styles/`: design tokens
- `src/**/*.test.*`: colocated Vitest tests
- `e2e/`: Playwright journeys

## Important Files

### Application

- `src/app/[locale]/page.tsx`: server composition root
- `src/app/[locale]/layout.tsx`: locale shell and metadata

### Data and boundaries

- `src/content/portfolio-schema.ts`: portfolio validation and inferred types
- `src/lib/latest-posts.ts`: validated optional feed boundary

### Design and tooling

- `DESIGN.md`: visual, interaction, localization, motion, and accessibility authority
- `package.json`: scripts, dependencies, and package-manager declaration
- `vitest.config.mts`: unit-test discovery and coverage configuration
- `playwright.config.ts`: browser projects and dev-server setup

## Development Commands

Run these from the repository root:

```bash
pnpm install
cp .env.example .env.local
pnpm run dev
pnpm run build
pnpm test
pnpm run test:watch
pnpm run test:coverage
pnpm run test:e2e
pnpm run verify
```

`pnpm run verify` is the canonical full gate. Its order is format check, lint, typecheck, unit tests, production build, then E2E.

## Runtime/Tooling Preferences

- Use the manifest-declared `pnpm@10.15.0`. The repository does not pin an exact Node version: there is no `engines` field or Node version file. Next.js 16 requires Node 20.9 or newer, and package compatibility governs the actual runtime.
- The stack is Next.js 16.3, React 19, strict TypeScript, Tailwind CSS v4 with PostCSS, Zod, shadcn/ui, Vitest, and Playwright.
- Use `.env.example` and `src/lib/site-config.ts` for environment configuration. All existing variables are public `NEXT_PUBLIC_*` values. Keep credentials out of the repository.
- For non-obvious Next.js behavior, read the matching installed guide in `node_modules/next/dist/docs/` before implementing it.

## Code Conventions & Common Patterns

- Use strict TypeScript, `@/*` imports for `src`, double quotes, semicolons, trailing commas, and the 100-column Prettier limit. Name React components and types in PascalCase, and functions and variables in camelCase, following current source.
- Keep domain data and user-facing copy separate: portfolio facts belong in `src/content/portfolio.ts`, schemas and types in `src/content/portfolio-schema.ts`, and UI strings in both `src/i18n/messages/en.json` and `src/i18n/messages/id.json`. Every content or message change must preserve Indonesian and English structure and key parity.
- Validate data once at ingress with Zod. Reuse narrow schema-derived types such as `PortfolioContent["profile"]`. Model recoverable async failures as discriminated result states, following `LatestFeedResult`, rather than leaking unvalidated data or throwing optional-feed failures through the page.
- Pass dependencies and data explicitly through server composition and props. No DI container or global client state is used. Keep async work at route and server boundaries; components remain pure and server-compatible unless browser state is required.
- Use semantic design tokens and classes from `src/styles/design-tokens.css`, existing shadcn/ui primitives, `react-icons/lu` or `react-icons/fa` patterns, and the `content-shell` layout utility. See `DESIGN.md` for the complete Cue Horizon, responsive, motion, state, localization, and accessibility contract.
- Preserve semantic landmarks, heading order, skip navigation, visible focus, useful alternative text, keyboard access, 44px targets, reduced-motion behavior, light and dark themes, and no horizontal overflow. Do not use em dash punctuation.
- GitHub Issues are canonical for issues and specs. `docs/agents/issue-tracker.md` contains exact `gh` operations, and `docs/agents/triage-labels.md` defines `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, and `wontfix`.

## Testing & QA

- Vitest/jsdom unit and component tests live as colocated `*.test.ts` or `*.test.tsx` files under `src/`. Use `src/test/setup.ts`, semantic Testing Library queries, table-driven `id` and `en` coverage, and isolated `fetch` stubs restored after each test.
- Playwright specs live under `e2e/*.spec.ts` and run against the real dev server. The configured projects are Desktop Chrome and Pixel 5, with traces retained on failure. Use axe checks for both locales and cover recruiter-critical flows such as locale switching, dark-first theme persistence, mobile navigation, links, and feed fallback.
- Coverage uses V8 text and HTML reports, has no configured thresholds, and is not part of `pnpm run verify`. Run `pnpm run test:coverage` only when coverage output is needed.
- Run the narrowest relevant checks first and `pnpm run verify` for shared or route-level changes. For UI or layout changes, verify at 375, 768, 1024, and 1440px in both locales and themes, with keyboard behavior, reduced motion, and the affected Playwright flow. No CI workflow is configured in this repository.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
