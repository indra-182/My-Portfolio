# INDRA.DEV Cross-Site Integration and Release Implementation Plan

**Approved design:** [INDRA.DEV Websites Design](../specs/2026-08-10-indra-dev-websites-design.md)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Enforce visual parity, connect blog updates to the portfolio safely, verify two-domain navigation, and prepare both applications for user-approved Vercel release.

**Architecture:** Keep the applications independently buildable and use a versioned public JSON feed for one-way blog-to-portfolio data. Enforce shared-source parity through a local hash check over canonical tokens and shell components. Run both applications on separate local ports for end-to-end verification before documenting, but not executing, external release actions.

**Tech Stack:** Next.js fetch revalidation, Zod, Node.js crypto, Vitest, Playwright, npm, Vercel project configuration.

## Global Constraints

- Execute this plan only after Portfolio MVP and Blog MVP plans pass independently.
- Keep portfolio and blog as separate Git repositories and separate Vercel projects.
- The blog is the only publisher of article metadata; the portfolio is a read-only consumer.
- Revalidate Latest Writing no more frequently than once per hour.
- Feed failure must never block the portfolio homepage.
- Shared token, header, footer, theme, locale, and mobile-navigation source must remain identical.
- Do not add a shared npm package, Turborepo, analytics, or third-party runtime service in the MVP.
- Do not push repositories, create Vercel projects, configure domains, or change external state without explicit user approval.

---

### Task 1: Enforce Shared Design and Shell Parity

**Files:**
- Create: `portfolio/scripts/check-design-parity.mjs`
- Create: `portfolio/scripts/check-design-parity.test.mjs`
- Modify: `portfolio/package.json`
- Modify: `blog/README.md`
- Modify: `portfolio/README.md`

**Interfaces:**
- Produces `npm run design:parity` from the portfolio repository.
- Compares canonical sibling files by SHA-256 and exits nonzero on drift.

- [ ] **Step 1: Write the failing parity script test**

Create a Node test using `node:test` that writes two temporary directory trees with one equal file and one unequal file. Import `compareFiles(leftRoot, rightRoot, relativePaths)` and assert the unequal path is reported exactly once.

- [ ] **Step 2: Run the test and confirm the missing module failure**

Run from `/home/mahad/code/Personal/portfolio`:

```bash
node --test scripts/check-design-parity.test.mjs
```

Expected: FAIL because `check-design-parity.mjs` does not exist.

- [ ] **Step 3: Implement deterministic file comparison**

Export this interface:

```js
export async function compareFiles(leftRoot, rightRoot, relativePaths) {
  // Return Array<{path: string; leftHash: string; rightHash: string}>.
}
```

Use `node:crypto` SHA-256 and `node:fs/promises`. The executable branch compares these exact files:

```text
src/styles/design-tokens.css
src/components/theme-provider.tsx
src/components/theme-toggle.tsx
src/components/locale-switcher.tsx
src/components/site-header.tsx
src/components/site-footer.tsx
src/components/mobile-navigation.tsx
src/i18n/config.ts
```

Print each mismatched path without file contents and exit 1 if any mismatch exists.

- [ ] **Step 4: Add and run the parity command**

Run:

```bash
npm pkg set scripts.design:parity="node scripts/check-design-parity.mjs"
node --test scripts/check-design-parity.test.mjs
npm run design:parity
```

Expected: the test and real sibling comparison pass.

- [ ] **Step 5: Document the canonical-edit workflow**

Both READMEs state: edit a canonical shared file in portfolio first, review it, copy the same file into blog, then run `npm run design:parity`. Site-specific composition must stay outside the compared components.

- [ ] **Step 6: Commit parity enforcement**

Run:

```bash
git add scripts package.json package-lock.json README.md
git commit -m "test: enforce shared design parity"
```

Then commit the blog README change inside `/home/mahad/code/Personal/blog`:

```bash
git add README.md
git commit -m "docs: document shared design workflow"
```

### Task 2: Implement the Portfolio Feed Client and Safe Fallback

**Files:**
- Create: `portfolio/src/lib/blog-feed-schema.ts`
- Create: `portfolio/src/lib/blog-feed.ts`
- Create: `portfolio/src/lib/blog-feed.test.ts`
- Modify: `portfolio/src/app/[locale]/page.tsx`
- Modify: `portfolio/.env.example`

**Interfaces:**
- Consumes blog endpoint `GET <BLOG_URL>/api/posts/latest?locale=<locale>&limit=3`.
- Produces `fetchLatestPosts(locale): Promise<LatestPostSummary[]>` and `safeGetLatestPosts(locale): Promise<LatestFeedResult>`.
- Validates feed version 1 before rendering.

- [ ] **Step 1: Write failing feed client tests**

Test these cases with a mocked global fetch:

- A valid version-1 response returns its posts.
- The request contains locale, limit 3, and `next.revalidate` equal to 3600.
- HTTP 500 returns `{status: 'unavailable'}` through the safe wrapper.
- Invalid JSON shape returns `{status: 'unavailable'}`.
- Unsupported feed version returns `{status: 'unavailable'}`.
- No response body is logged.

- [ ] **Step 2: Confirm focused failures**

Run:

```bash
npm test -- src/lib/blog-feed.test.ts
```

Expected: FAIL because feed client modules do not exist.

- [ ] **Step 3: Implement the feed schema**

Mirror the blog's `LatestPostFeedV1` with a Zod literal `version: 1`, supported locale, ISO dates, nonempty topics, and positive integer reading time. Transform validated post entries to the existing portfolio `LatestPostSummary` type.

- [ ] **Step 4: Implement cached and safe client functions**

Use these signatures:

```ts
export async function fetchLatestPosts(locale: Locale): Promise<LatestPostSummary[]>
export async function safeGetLatestPosts(locale: Locale): Promise<LatestFeedResult>
```

`fetchLatestPosts` builds the URL from `siteConfig.blogUrl`, requests limit 3 with `next: {revalidate: 3600, tags: ['latest-blog-posts']}`, throws on non-2xx responses, validates JSON, and returns posts. `safeGetLatestPosts` catches and returns `{status: 'unavailable'}` without exposing response data. Successful empty feeds return `{status: 'ready', posts: []}` so the section can show the direct Blog link intentionally.

- [ ] **Step 5: Connect the portfolio page**

Call `safeGetLatestPosts(locale)` alongside `getPortfolio(locale)` and pass the result to LatestWritingSection. The page must continue rendering Hero, About, and Experience if the feed is unavailable.

- [ ] **Step 6: Verify feed integration**

Run:

```bash
npm test -- src/lib/blog-feed.test.ts src/components/sections/latest-writing-section.test.tsx
npm run lint
npm run typecheck
npm run build
```

Expected: PASS with the localhost blog URL from `.env.example` supplied during build.

- [ ] **Step 7: Commit the portfolio consumer**

Run:

```bash
git add src/lib/blog-feed* 'src/app/[locale]/page.tsx' .env.example
git commit -m "feat: connect latest blog writing"
```

### Task 3: Verify Two-Site Navigation and Live Content Locally

**Files:**
- Create: `portfolio/e2e/cross-site.spec.ts`
- Modify: `portfolio/playwright.config.ts`
- Modify: `blog/playwright.config.ts`

**Interfaces:**
- Produces a Playwright two-server acceptance test using portfolio port 3000 and blog port 3001.
- Uses fixture-backed blog content only during the cross-site test process.

- [ ] **Step 1: Configure both local web servers**

Update portfolio Playwright `webServer` to an array:

```ts
webServer: [
  {
    command: 'NEXT_PUBLIC_BLOG_URL=http://127.0.0.1:3001 npm run dev -- --port 3000',
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: !process.env.CI
  },
  {
    command: 'npm --prefix ../blog run dev -- --port 3001',
    url: 'http://127.0.0.1:3001',
    reuseExistingServer: !process.env.CI,
    env: {CONTENT_ROOT: 'src/test/fixtures/posts'}
  }
]
```

Keep the portfolio test base URL at port 3000.

- [ ] **Step 2: Write the cross-site test**

Test this sequence:

1. Open portfolio `/id`.
2. Assert Latest Writing shows the Indonesian fixture post.
3. Open the article and assert the hostname/port changes to the blog.
4. Use the blog Portfolio link and assert locale remains `id`.
5. Repeat cross-site navigation for `/en`.
6. Stop or intercept the latest-feed request with HTTP 500 and assert portfolio core content plus direct Blog fallback remain visible.

- [ ] **Step 3: Run the focused cross-site test**

Run:

```bash
npx playwright test e2e/cross-site.spec.ts --project=chromium
```

Expected: PASS for ready and unavailable feed states.

- [ ] **Step 4: Verify metadata links across local domains**

In the same test, assert portfolio canonical and alternate URLs use the portfolio origin, blog article canonical and alternates use the blog origin, and cross-site navigation never rewrites one origin into the other.

- [ ] **Step 5: Commit local integration coverage**

Run:

```bash
git add e2e/cross-site.spec.ts playwright.config.ts
git commit -m "test: verify cross-site portfolio and blog flow"
```

Commit any blog Playwright configuration change inside the blog repository with:

```bash
git add playwright.config.ts
git commit -m "test: support cross-site fixture server"
```

### Task 4: Prepare Release Configuration Without Deploying

**Files:**
- Create: `portfolio/docs/deployment.md`
- Create: `blog/docs/deployment.md`
- Create: `portfolio/docs/release-checklist.md`
- Create: `blog/docs/release-checklist.md`
- Modify: `portfolio/.env.example`
- Modify: `blog/.env.example`
- Modify: `portfolio/README.md`
- Modify: `blog/README.md`

**Interfaces:**
- Produces explicit environment and Vercel project setup instructions.
- Does not create projects, domains, remotes, or deployments.

- [ ] **Step 1: Lock the environment contract**

Both `.env.example` files document these public values:

```text
NEXT_PUBLIC_PORTFOLIO_URL=http://localhost:3000
NEXT_PUBLIC_BLOG_URL=http://localhost:3001
NEXT_PUBLIC_CONTACT_EMAIL=replace-before-production@example.invalid
NEXT_PUBLIC_LINKEDIN_URL=https://www.linkedin.com/in/mahadiindra182/
```

Production release must replace the invalid email and localhost origins. Do not store Vercel tokens, GitHub tokens, or other credentials in either repository.

- [ ] **Step 2: Document two Vercel projects**

Each deployment guide defines one Vercel project per repository, framework preset Next.js, production environment names, build command `npm run build`, install command `npm ci`, and separate final domains. It also explains that Vercel Hobby deployment is a user-authorized external action performed after local approval.

- [ ] **Step 3: Define release checks**

Each checklist requires:

- User-approved public email, LinkedIn, CV, wordmark, monogram favicon, and domains.
- Testimonials either approved and entered or explicitly omitted.
- Client claims reviewed for confidentiality.
- npm test, lint, typecheck, build, Playwright, parity, locale, theme, reduced motion, and responsive checks passing.
- Sitemap, robots, canonical, alternate, Open Graph, structured data, RSS, and latest-feed URLs manually opened in a preview deployment.
- No analytics or unintended third-party scripts.

- [ ] **Step 4: Document approval boundaries**

Both READMEs state that creating GitHub remotes, pushing commits, importing Vercel projects, setting environment variables, and attaching domains require a new explicit user instruction.

- [ ] **Step 5: Commit release documentation in each repository**

Portfolio:

```bash
git add docs/deployment.md docs/release-checklist.md .env.example README.md
git commit -m "docs: prepare portfolio release workflow"
```

Blog:

```bash
git add docs/deployment.md docs/release-checklist.md .env.example README.md
git commit -m "docs: prepare blog release workflow"
```

### Task 5: Run the Full Local Release Gate

**Files:**
- Create: `portfolio/docs/verification/initial-local-release.md`
- Create: `blog/docs/verification/initial-local-release.md`

**Interfaces:**
- Produces evidence logs listing commands, exit codes, browser scenarios, viewport/theme/locale combinations, and remaining production inputs.

- [ ] **Step 1: Run all portfolio checks**

Run from portfolio:

```bash
npm run design:parity
npm test
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```

Expected: every command exits 0.

- [ ] **Step 2: Run all blog checks**

Run from blog:

```bash
npm run content:validate
npm test
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```

Expected: every command exits 0.

- [ ] **Step 3: Perform the visual and interaction matrix**

Manually inspect both sites at 375, 768, 1024, and 1440 pixels in Light, Dark, and System modes. Repeat representative navigation with reduced motion enabled and keyboard only. Check loading, no-post, no-filter-result, malformed-feed, unavailable-feed, not-found, and missing-translation states.

- [ ] **Step 4: Record evidence without secrets**

Write the verification documents with exact commands, dates, exit status, checked routes, viewport/theme/locale matrix, accessibility findings, Lighthouse category scores, and unresolved public inputs. Do not paste environment values or personal contact details beyond already public links.

- [ ] **Step 5: Run clean-tree checks**

Run in each repository:

```bash
git status --short
git log --oneline -8
```

Expected: only the two new verification documents are uncommitted.

- [ ] **Step 6: Commit verification evidence**

Portfolio:

```bash
git add docs/verification/initial-local-release.md
git commit -m "docs: record portfolio release verification"
```

Blog:

```bash
git add docs/verification/initial-local-release.md
git commit -m "docs: record blog release verification"
```

- [ ] **Step 7: Stop before external release**

Report the local verification outcome, final commit IDs, production inputs still required, and the exact external actions awaiting approval. Do not push or deploy in this task.
