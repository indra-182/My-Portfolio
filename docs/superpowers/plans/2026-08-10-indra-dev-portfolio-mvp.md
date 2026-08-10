# INDRA.DEV Portfolio MVP Implementation Plan

**Approved design:** [INDRA.DEV Websites Design](../specs/2026-08-10-indra-dev-websites-design.md)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the localized INDRA.DEV recruiter portfolio with the approved design system, accessible navigation, CV-derived experience, responsive presentation, and testable Latest Writing boundary.

**Architecture:** Use a server-first Next.js App Router application under `src/app/[locale]`. Keep localized portfolio content in typed modules, isolate browser state to theme/navigation controls, and make shared shell components accept site configuration rather than embed domain-specific URLs. The Latest Writing section initially consumes a typed result prop so cross-site fetching can be added independently.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS, shadcn/ui, next-themes, Lucide icons, Zod, Vitest, Testing Library, Playwright.

## Global Constraints

- Execute every command in `/home/mahad/code/Personal/portfolio` unless a step states otherwise.
- Use npm and commit the generated `package-lock.json`.
- Use explicit `/id` and `/en` routes; redirect `/` to `/id`.
- Use Inter Variable for interface/editorial text and Geist Mono for code-like metadata.
- Use Light `#FAFAFA` / `#101114` and Dark `#0B0D10` / `#F5F7FA` semantic foundations with blue accents `#2563EB` and `#60A5FA`.
- Motion uses only opacity and transform, lasts 150–420 milliseconds, and is disabled by `prefers-reduced-motion`.
- Theme choices exposed in the menu are Light and Dark; first visit defaults to the operating-system theme internally.
- Theme controls use Lucide Sun and Moon icons with accessible names and tooltips. The provider retains System as the first-visit default without exposing it as a menu item.
- Footer copyright is `© <current year> Mahadi Indra Manurung`.
- Do not invent testimonials, client metrics, or project claims.
- Do not add analytics, a contact form, GSAP, a CMS, comments, or newsletter code.

---

### Task 1: Scaffold the Portfolio and Test Harness

**Files:**
- Create: `package.json`
- Create: `package-lock.json`
- Create: `next.config.ts`
- Create: `tsconfig.json`
- Create: `eslint.config.mjs`
- Create: `src/app/layout.tsx`
- Create: `src/app/page.tsx`
- Create: `src/app/globals.css`
- Create: `vitest.config.ts`
- Create: `src/test/setup.ts`
- Create: `playwright.config.ts`
- Modify: `.gitignore`

**Interfaces:**
- Produces npm scripts `dev`, `build`, `lint`, `typecheck`, `test`, `test:watch`, and `test:e2e` for all later tasks.
- Produces the `@/*` alias mapped to `src/*`.

- [ ] **Step 1: Generate the application without replacing the existing docs**

Run:

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias '@/*' --use-npm --disable-git --yes
```

Expected: Next.js files are created while `docs/superpowers` remains intact.

- [ ] **Step 2: Initialize local version control**

Run:

```bash
git init -b main
git add docs package.json package-lock.json next.config.ts tsconfig.json eslint.config.mjs src public .gitignore
git commit -m "chore: scaffold portfolio application"
```

Expected: the first commit contains the approved design docs and generated application baseline.

- [ ] **Step 3: Install UI and test dependencies**

Run:

```bash
npm install next-themes lucide-react zod clsx tailwind-merge class-variance-authority
npm install -D vitest @vitest/coverage-v8 jsdom @vitejs/plugin-react vite-tsconfig-paths @testing-library/react @testing-library/jest-dom @testing-library/user-event @playwright/test @axe-core/playwright
npx shadcn@latest init -d
npx shadcn@latest add button dropdown-menu sheet separator tooltip skeleton
```

Expected: shadcn components live under `src/components/ui` and no component library outside the approved stack is added.

- [ ] **Step 4: Add deterministic test scripts**

Run:

```bash
npm pkg set scripts.typecheck="tsc --noEmit"
npm pkg set scripts.test="vitest run"
npm pkg set scripts.test:watch="vitest"
npm pkg set scripts.test:coverage="vitest run --coverage"
npm pkg set scripts.test:e2e="playwright test"
```

Create `vitest.config.ts`:

```ts
import react from '@vitejs/plugin-react'
import {defineConfig} from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {provider: 'v8', reporter: ['text', 'html']}
  }
})
```

Create `src/test/setup.ts`:

```ts
import '@testing-library/jest-dom/vitest'
```

Create `playwright.config.ts`:

```ts
import {defineConfig, devices} from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  use: {baseURL: 'http://127.0.0.1:3000', trace: 'retain-on-failure'},
  projects: [
    {name: 'chromium', use: {...devices['Desktop Chrome']}},
    {name: 'mobile', use: {...devices['Pixel 5']}}
  ],
  webServer: {command: 'npm run dev', url: 'http://127.0.0.1:3000', reuseExistingServer: !process.env.CI}
})
```

- [ ] **Step 5: Verify the baseline**

Run:

```bash
npm run lint
npm run typecheck
npm run build
```

Expected: all three commands exit successfully.

- [ ] **Step 6: Commit the toolchain**

Run:

```bash
git add package.json package-lock.json components.json src/components/ui vitest.config.ts playwright.config.ts src/test
git commit -m "test: configure portfolio quality harness"
```

### Task 2: Establish Canonical Tokens, Fonts, and Theme Behavior

**Files:**
- Create: `src/styles/design-tokens.css`
- Create: `src/components/theme-provider.tsx`
- Create: `src/components/theme-toggle.tsx`
- Create: `src/components/theme-toggle.test.tsx`
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Produces `ThemeProvider({children}: {children: React.ReactNode})`.
- Produces `ThemeToggle()` with Light and Dark selections while retaining System as the internal first-visit default.
- Produces semantic variables used by every later component.

- [ ] **Step 1: Write the failing theme control test**

Create `src/components/theme-toggle.test.tsx`:

```tsx
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {vi} from 'vitest'
import {ThemeToggle} from './theme-toggle'

const setTheme = vi.fn()

vi.mock('next-themes', () => ({
  useTheme: () => ({theme: 'system', resolvedTheme: 'dark', setTheme})
}))

test('offers only light and dark theme choices', async () => {
  render(<ThemeToggle />)
  await userEvent.click(screen.getByRole('button', {name: /theme/i}))
  expect(screen.getByRole('menuitem', {name: /light/i})).toBeVisible()
  expect(screen.getByRole('menuitem', {name: /dark/i})).toBeVisible()
  expect(screen.queryByRole('menuitem', {name: /system/i})).not.toBeInTheDocument()
})
```

- [ ] **Step 2: Run the test and confirm the missing component failure**

Run:

```bash
npm test -- src/components/theme-toggle.test.tsx
```

Expected: FAIL because `theme-toggle.tsx` does not exist.

- [ ] **Step 3: Define the semantic token contract**

Create `src/styles/design-tokens.css` with these exact public variables:

```css
:root {
  --background: #fafafa;
  --foreground: #101114;
  --surface: #f1f3f6;
  --muted-foreground: #5d626b;
  --border: #d8dadd;
  --accent: #2563eb;
  --accent-foreground: #ffffff;
  --destructive: #dc2626;
  --focus-ring: #2563eb;
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-pill: 999px;
  --motion-fast: 180ms;
  --motion-enter: 360ms;
  --content-max: 75rem;
  --prose-max: 70ch;
}

.dark {
  --background: #0b0d10;
  --foreground: #f5f7fa;
  --surface: #15181d;
  --muted-foreground: #a6adb8;
  --border: #2c3139;
  --accent: #60a5fa;
  --accent-foreground: #07111f;
  --destructive: #f87171;
  --focus-ring: #60a5fa;
}

@media (prefers-reduced-motion: reduce) {
  :root { --motion-fast: 0ms; --motion-enter: 0ms; }
}
```

Import it as the first local import in `src/app/globals.css` and map shadcn variables to these semantic variables.

- [ ] **Step 4: Implement the provider and icon menu**

Create `src/components/theme-provider.tsx`:

```tsx
'use client'

import {ThemeProvider as NextThemesProvider} from 'next-themes'

export function ThemeProvider({children}: {children: React.ReactNode}) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
    </NextThemesProvider>
  )
}
```

Create `ThemeToggle` with shadcn `DropdownMenu`, Lucide `Sun` and `Moon`, a trigger `aria-label="Choose theme"`, and two menu items that call `setTheme('light')` and `setTheme('dark')`. Keep the provider's `defaultTheme="system"` behavior for first visits, but render only the resolved Sun or Moon icon and never expose a System menu item. Keep the trigger at least `size-11`.

- [ ] **Step 5: Configure fonts and root provider**

In `src/app/layout.tsx`, load `Inter` and `Geist_Mono` from `next/font/google`, apply their CSS variables to `<body>`, wrap children with `ThemeProvider`, and set `suppressHydrationWarning` on `<html>`.

- [ ] **Step 6: Run focused and global checks**

Run:

```bash
npm test -- src/components/theme-toggle.test.tsx
npm run lint
npm run typecheck
```

Expected: all commands pass.

- [ ] **Step 7: Commit the canonical visual foundation**

Run:

```bash
git add src/styles src/app/globals.css src/app/layout.tsx src/components/theme-provider.tsx src/components/theme-toggle.tsx src/components/theme-toggle.test.tsx
git commit -m "feat: establish portfolio design foundation"
```

### Task 3: Add Locale Routing and the Shared Site Shell

**Files:**
- Create: `src/i18n/config.ts`
- Create: `src/i18n/dictionaries.ts`
- Create: `src/i18n/messages/id.json`
- Create: `src/i18n/messages/en.json`
- Create: `src/components/locale-switcher.tsx`
- Create: `src/components/site-header.tsx`
- Create: `src/components/site-footer.tsx`
- Create: `src/components/mobile-navigation.tsx`
- Create: `src/components/site-shell.test.tsx`
- Create: `src/app/[locale]/layout.tsx`
- Create: `src/app/[locale]/not-found.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Produces `locales`, `defaultLocale`, `Locale`, and `isLocale(value)` from `src/i18n/config.ts`.
- Produces `getDictionary(locale: Locale): Promise<Dictionary>`.
- Produces shared `SiteHeader`, `SiteFooter`, and `LocaleSwitcher` components later copied byte-for-byte to the blog.

- [ ] **Step 1: Write locale and shell tests**

Create `src/components/site-shell.test.tsx` covering these assertions:

```tsx
import {render, screen} from '@testing-library/react'
import {SiteFooter} from './site-footer'

test('renders identity, cross-site links, and current copyright', () => {
  render(<SiteFooter locale="id" portfolioUrl="https://portfolio.example" blogUrl="https://blog.example" />)
  expect(screen.getByText('INDRA.DEV')).toBeVisible()
  expect(screen.getByRole('link', {name: /portfolio/i})).toHaveAttribute('href', 'https://portfolio.example/id')
  expect(screen.getByRole('link', {name: /blog/i})).toHaveAttribute('href', 'https://blog.example/id')
  expect(screen.getByText(`© ${new Date().getFullYear()} Mahadi Indra Manurung`)).toBeVisible()
})
```

Add unit assertions that `isLocale('id')` and `isLocale('en')` are true while `isLocale('fr')` is false.

- [ ] **Step 2: Verify the tests fail**

Run:

```bash
npm test -- src/components/site-shell.test.tsx
```

Expected: FAIL because the locale and shell modules do not exist.

- [ ] **Step 3: Define locale types and dictionaries**

Create `src/i18n/config.ts`:

```ts
export const locales = ['id', 'en'] as const
export const defaultLocale = 'id' as const
export type Locale = (typeof locales)[number]

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale)
}
```

Create `dictionaries.ts` using server-only dynamic imports for `messages/id.json` and `messages/en.json`. Both JSON files must expose the same keys under `navigation`, `theme`, `portfolio`, `footer`, `errors`, and `actions`.

- [ ] **Step 4: Implement locale routing**

Make `src/app/page.tsx` call `redirect('/id')`. In `src/app/[locale]/layout.tsx`, validate `params.locale` with `isLocale`, call `notFound()` for unsupported values, return `generateStaticParams()` for both locales, and render the shared header, `<main id="main-content">`, and footer.

- [ ] **Step 5: Implement the shared shell**

Use these exact component contracts:

```ts
type SharedSiteProps = {
  locale: Locale
  portfolioUrl: string
  blogUrl: string
}

type SiteNavItem = {label: string; href: string; active?: boolean}
type PrimaryAction = {label: string; href: string; download?: boolean}

export function SiteHeader(props: SharedSiteProps & {
  navItems: SiteNavItem[]
  primaryAction?: PrimaryAction
}): React.ReactElement
export function SiteFooter(props: SharedSiteProps): React.ReactElement
export function LocaleSwitcher(props: {locale: Locale; targetPath?: string}): React.ReactElement
```

The header includes a skip link, wordmark, the supplied nav items, optional primary action, locale control, theme control, and a shadcn Sheet mobile menu. The portfolio layout supplies About, Experience, and Writing nav items plus Download CV as the primary action. The blog layout later supplies blog-specific nav items through the same component contract. The footer includes the wordmark, Portfolio, Blog, LinkedIn, email, language control, and current-year copyright. Read public URLs from configuration passed by the locale layout, not from component constants.

- [ ] **Step 6: Verify shell behavior**

Run:

```bash
npm test -- src/components/site-shell.test.tsx
npm run lint
npm run typecheck
```

Expected: PASS.

- [ ] **Step 7: Commit the locale shell**

Run:

```bash
git add src/i18n src/components/locale-switcher.tsx src/components/site-header.tsx src/components/site-footer.tsx src/components/mobile-navigation.tsx src/components/site-shell.test.tsx src/app/page.tsx 'src/app/[locale]'
git commit -m "feat: add localized portfolio shell"
```

### Task 4: Model and Validate CV-Derived Portfolio Content

**Files:**
- Create: `src/content/portfolio-schema.ts`
- Create: `src/content/portfolio.ts`
- Create: `src/content/portfolio.test.ts`
- Create: `src/lib/get-portfolio.ts`

**Interfaces:**
- Produces `PortfolioContent`, `Experience`, `Project`, and `Testimonial` types.
- Produces `getPortfolio(locale: Locale): PortfolioContent`.
- Every project includes `problem`, `ownership`, `delivery`, `outcome`, and `technologies` fields; unsupported metrics remain absent.

- [ ] **Step 1: Write failing schema tests**

Create `src/content/portfolio.test.ts` with these cases:

```ts
import {describe, expect, test} from 'vitest'
import {portfolioByLocale} from './portfolio'
import {PortfolioContentSchema} from './portfolio-schema'

describe('portfolio content', () => {
  test.each(['id', 'en'] as const)('%s content satisfies the public schema', (locale) => {
    expect(() => PortfolioContentSchema.parse(portfolioByLocale[locale])).not.toThrow()
  })

  test('does not publish unapproved testimonials', () => {
    for (const content of Object.values(portfolioByLocale)) {
      expect(content.testimonials.every((item) => item.approved)).toBe(true)
    }
  })

  test('puts technologies inside projects', () => {
    for (const experience of portfolioByLocale.id.experiences) {
      expect(experience.projects.every((project) => project.technologies.length > 0)).toBe(true)
    }
  })
})
```

- [ ] **Step 2: Confirm the schema test fails**

Run:

```bash
npm test -- src/content/portfolio.test.ts
```

Expected: FAIL because the schema and content modules do not exist.

- [ ] **Step 3: Define the Zod schema**

Model localized content with Zod. Require nonempty hero, about, experience role/company/period, at least one project per published experience, and at least one technology per project. Define outcome as optional text so unsupported metrics are never fabricated. Testimonials require `approved: true` at the schema boundary.

- [ ] **Step 4: Enter evidence-based content**

Populate Indonesian and English data using only the supplied CV facts:

- Indivara Group, August 2021 to present.
- Petron Philippines corporate dashboard, lead frontend role, registration, PIN setup, authentication, inter-company transfers, and bulk CSV/Excel transaction upload.
- Maybank Unit Trust workflows and Playwright regression coverage.
- BCA fixed-income workflows.
- Pegadaian Asuransi claim submission and tracking.
- Bank Danamon mutual-fund subscription, redemption, and switching.
- Relevant additional engagements from the CV when their public wording is client-safe.
- Technologies contextualized from React, Next.js, TypeScript, state/data tools, Tailwind CSS, shadcn/ui, and Playwright.

Keep `testimonials: []` until approved quotations are supplied.

- [ ] **Step 5: Implement the locale getter**

Create `getPortfolio(locale)` that returns the parsed locale entry and fails during build if content violates the schema.

- [ ] **Step 6: Verify content integrity**

Run:

```bash
npm test -- src/content/portfolio.test.ts
npm run typecheck
```

Expected: PASS.

- [ ] **Step 7: Commit the content model**

Run:

```bash
git add src/content src/lib/get-portfolio.ts
git commit -m "feat: model localized portfolio content"
```

### Task 5: Build the Recruiter-Focused Homepage

**Files:**
- Create: `src/components/sections/hero-section.tsx`
- Create: `src/components/sections/about-section.tsx`
- Create: `src/components/sections/experience-section.tsx`
- Create: `src/components/sections/experience-row.tsx`
- Create: `src/components/sections/testimonials-section.tsx`
- Create: `src/components/sections/latest-writing-section.tsx`
- Create: `src/components/sections/latest-writing-section.test.tsx`
- Create: `src/types/latest-post.ts`
- Modify: `src/app/[locale]/page.tsx`

**Interfaces:**
- Produces `LatestPostSummary` and `LatestFeedResult` for the cross-site plan.
- Consumes only validated `PortfolioContent` from Task 4.
- `LatestWritingSection({locale, result, blogUrl})` renders posts or the direct-link fallback.

- [ ] **Step 1: Define and test the Latest Writing boundary**

Create `src/types/latest-post.ts`:

```ts
import type {Locale} from '@/i18n/config'

export type LatestPostSummary = {
  title: string
  slug: string
  description: string
  locale: Locale
  publishedAt: string
  topics: string[]
  readingTimeMinutes: number
}

export type LatestFeedResult =
  | {status: 'ready'; posts: LatestPostSummary[]}
  | {status: 'unavailable'}
```

Test that `ready` renders up to three article links and `unavailable` renders one direct Blog link without an empty grid.

- [ ] **Step 2: Run the focused test and confirm failure**

Run:

```bash
npm test -- src/components/sections/latest-writing-section.test.tsx
```

Expected: FAIL because the section does not exist.

- [ ] **Step 3: Implement focused page sections**

Build each section as a Server Component except controls that require browser state. The hero must expose the role, location, value proposition, Download CV, Writing link, and supplied portrait. Experience rows must keep project, ownership, outcome, and technology context together. TestimonialsSection returns `null` when its input array is empty.

- [ ] **Step 4: Apply the approved motion contract**

Add one hero entrance class and hover styles on experience rows using only opacity and translate. Use CSS variable durations from `design-tokens.css`. Do not hide meaningful content before JavaScript executes.

- [ ] **Step 5: Compose the localized page**

In `src/app/[locale]/page.tsx`, call `getPortfolio(locale)`, render Hero, About, Experience, conditional Testimonials, and Latest Writing in that order. Pass `{status: 'unavailable'}` to Latest Writing until the cross-site plan replaces it.

- [ ] **Step 6: Verify section behavior and type integrity**

Run:

```bash
npm test -- src/components/sections/latest-writing-section.test.tsx
npm run lint
npm run typecheck
```

Expected: PASS.

- [ ] **Step 7: Commit the homepage**

Run:

```bash
git add src/components/sections src/types/latest-post.ts 'src/app/[locale]/page.tsx' src/app/globals.css
git commit -m "feat: build recruiter-focused portfolio homepage"
```

### Task 6: Add Public Assets, Metadata, SEO, and Error States

**Files:**
- Create: `public/images/mahadi-indra.png`
- Create: `public/documents/mahadi-indra-cv.pdf`
- Create: `src/app/icon.svg`
- Create: `src/app/[locale]/opengraph-image.tsx`
- Create: `src/app/robots.ts`
- Create: `src/app/sitemap.ts`
- Create: `src/app/[locale]/error.tsx`
- Create: `src/app/[locale]/loading.tsx`
- Create: `src/lib/site-config.ts`
- Create: `.env.example`
- Modify: `src/app/[locale]/layout.tsx`

**Interfaces:**
- Produces `siteConfig` containing `portfolioUrl`, `blogUrl`, `email`, `linkedinUrl`, and `cvHref`.
- Produces locale-aware canonical, alternate, Open Graph, robots, and sitemap metadata.

- [ ] **Step 1: Write site configuration validation**

Define a Zod-backed server configuration that reads:

```text
NEXT_PUBLIC_PORTFOLIO_URL
NEXT_PUBLIC_BLOG_URL
NEXT_PUBLIC_CONTACT_EMAIL
NEXT_PUBLIC_LINKEDIN_URL
```

Use `http://localhost:3000`, `http://localhost:3001`, a non-published local email value, and the CV LinkedIn URL only in `.env.example`; production values are supplied before release.

- [ ] **Step 2: Copy approved source assets**

Run:

```bash
mkdir -p public/images public/documents
cp '/mnt/c/Users/mahad/Downloads/CEO PT OGO.png' public/images/mahadi-indra.png
cp '/mnt/d/Persiapan Interview/Mahadi Indra CV Latest.pdf' public/documents/mahadi-indra-cv.pdf
```

Expected: the profile image and one-page PDF exist in public paths. Do not alter the source files.

- [ ] **Step 3: Create vector identity assets**

Create `src/app/icon.svg` with this initial vector draft:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="INDRA.DEV ID monogram">
  <rect width="64" height="64" rx="12" fill="#2563EB"/>
  <path d="M17 16h8v32h-8zM31 16h10c10 0 16 6 16 16s-6 16-16 16H31V16zm8 8v16h2c5 0 8-3 8-8s-3-8-8-8h-2z" fill="#FFFFFF"/>
</svg>
```

Verify legibility at 16, 24, and 32 pixels and obtain user approval before production release. Use the text wordmark `INDRA.DEV` in the UI so it remains crisp and theme-aware.

- [ ] **Step 4: Implement locale metadata**

Generate localized title, description, canonical URL, `/id` and `/en` alternates, Person JSON-LD, and dynamic Open Graph image. Create sitemap entries for both locale homepages and robots rules that allow production crawling while using environment-driven origins.

- [ ] **Step 5: Implement explicit loading and error UI**

Loading reserves hero and Latest Writing dimensions with shadcn Skeleton. Error UI states what failed and offers Retry plus a direct Blog or Home link. Neither state uses animation when reduced motion is active.

- [ ] **Step 6: Run build-time verification**

Run:

```bash
npm run lint
npm run typecheck
npm run build
```

Expected: localized routes, sitemap, robots, and Open Graph routes build without missing environment errors.

- [ ] **Step 7: Commit assets and metadata**

Run:

```bash
git add public src/app src/lib/site-config.ts .env.example
git commit -m "feat: add portfolio assets and metadata"
```

### Task 7: Verify Recruiter, Theme, Locale, and Responsive Flows

**Files:**
- Create: `e2e/portfolio.spec.ts`
- Create: `e2e/accessibility.spec.ts`
- Modify: `README.md`

**Interfaces:**
- Produces the portfolio MVP acceptance suite.

- [ ] **Step 1: Write the failing recruiter flow**

Create `e2e/portfolio.spec.ts` with tests that:

- Open `/id` and assert the Senior Frontend Engineer heading is visible.
- Click Download CV and assert the response has a PDF URL.
- Open the theme menu, choose Dark, reload, and assert the dark class persists.
- On a fresh context, emulate a dark system color scheme and verify the default theme follows it without a System menu item.
- Switch from `/id` to `/en` and retain the homepage route.
- Open and close mobile navigation with keyboard and Escape.
- Verify Latest Writing unavailable state exposes the Blog link.

- [ ] **Step 2: Write the accessibility smoke test**

Use `@axe-core/playwright` on `/id` and `/en`, assert no serious or critical violations, tab to the skip link, and verify the main landmark receives focus after activation.

- [ ] **Step 3: Run tests and inspect initial failures**

Run:

```bash
npx playwright install chromium
npm run test:e2e
```

Expected: any failures point to concrete selector, accessibility, or responsive issues rather than missing browser binaries.

- [ ] **Step 4: Fix only the observed acceptance failures**

Adjust semantic markup, accessible names, focus handling, or responsive classes in the owning components. Do not broaden visual scope.

- [ ] **Step 5: Run the complete portfolio gate**

Run:

```bash
npm test
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```

Expected: every command passes.

- [ ] **Step 6: Document local use and content editing**

README must include npm commands, required environment names, portfolio content file location, asset source locations, supported locales/themes, and a statement that external deployment requires separate approval.

- [ ] **Step 7: Commit the verified MVP**

Run:

```bash
git add e2e README.md src
git commit -m "test: verify portfolio mvp flows"
```
