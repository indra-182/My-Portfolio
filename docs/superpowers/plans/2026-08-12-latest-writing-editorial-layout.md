# Latest Writing Editorial Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the unintended empty desktop grid area in `Latest Writing` with a state-aware featured-article layout and editorial aside while preserving the existing feed and navigation contracts.

**Architecture:** Keep `LatestWritingSection` as a synchronous Server Component. Derive a presentation state from the existing `LatestFeedResult`, render one shared article-card structure, and add a local informational aside only when exactly one post is available. Keep all changes inside the section and its colocated test.

**Tech Stack:** Next.js 16.3 App Router, React 19, TypeScript, Tailwind CSS 4, React Testing Library, Vitest, `react-icons`.

## Global Constraints

- Preserve the existing `LatestFeedResult`, feed fetching, blog routes, locale behavior, date formatting, and unavailable-feed fallback.
- Keep the component as a Server Component; do not add `use client`, browser APIs, or client state.
- Do not add dependencies, images, external fonts, or animation libraries.
- Use existing semantic theme tokens, SVG icons, visible focus rings, and reduced-motion-safe transitions.
- Use mobile-first layout classes and prevent horizontal overflow at 375px, 768px, 1024px, and 1440px.

---

### Task 1: Lock the responsive presentation states in tests

**Files:**

- Modify: `src/components/sections/latest-writing-section.test.tsx`

**Interfaces:**

- Consumes: `LatestWritingSection` with the existing `LatestFeedResult` prop shape.
- Produces: Assertions for the `featured`, `double`, and `grid` presentation states that the component implementation must expose via `data-layout`.

- [x] **Step 1: Add one-post and two-post fixtures derived from the existing posts**

Add these constants below the existing `posts` fixture so all test data stays consistent:

```tsx
const onePost = posts.slice(0, 1);
const twoPosts = posts.slice(0, 2);
```

- [x] **Step 2: Write the failing one-post layout test**

Add a test that renders one ready post and asserts the featured layout, one article, and the semantic editorial aside:

```tsx
test("uses a featured layout and editorial aside for one post", () => {
  const { container } = render(
    <LatestWritingSection
      locale="id"
      blogUrl="https://blog.example"
      result={{ status: "ready", posts: onePost }}
    />,
  );

  expect(container.querySelector('[data-layout="featured"]')).toBeInTheDocument();
  expect(screen.getAllByRole("article")).toHaveLength(1);
  expect(
    screen.getByRole("complementary", { name: /notes from the build loop/i }),
  ).toBeInTheDocument();
});
```

- [x] **Step 3: Write the failing two-post layout test**

Add a test that ensures two posts use a two-column state and do not render the one-post aside:

```tsx
test("uses an even layout for two posts without an editorial aside", () => {
  const { container } = render(
    <LatestWritingSection
      locale="id"
      blogUrl="https://blog.example"
      result={{ status: "ready", posts: twoPosts }}
    />,
  );

  expect(container.querySelector('[data-layout="double"]')).toBeInTheDocument();
  expect(screen.getAllByRole("article")).toHaveLength(2);
  expect(screen.queryByRole("complementary")).not.toBeInTheDocument();
});
```

- [x] **Step 4: Assert the existing three-post state remains a three-card grid**

Extend the existing ready-feed test with:

```tsx
expect(container.querySelector('[data-layout="grid"]')).toBeInTheDocument();
```

Capture `container` from `render` in that test while keeping the current article URL, three-article limit, relative-card, and fourth-post assertions.

- [x] **Step 5: Run the focused test and verify it fails for the missing layout contract**

Run:

```bash
rtk npm test -- src/components/sections/latest-writing-section.test.tsx
```

Expected: the existing tests pass, while the new tests fail because the component does not yet expose `data-layout="featured"`/`"double"` or the editorial aside.

### Task 2: Implement the state-aware editorial layout

**Files:**

- Modify: `src/components/sections/latest-writing-section.tsx`

**Interfaces:**

- Consumes: `LatestFeedResult`, `Locale`, and the existing `blogUrl`/locale route construction.
- Produces: A `data-layout` value of `featured`, `double`, or `grid` for ready feeds with one, two, or at least three posts, respectively; the unchanged fallback for unavailable or empty feeds.

- [x] **Step 1: Derive the visible posts and layout state once**

Inside `LatestWritingSection`, before the return statement, derive only the first three ready posts and a layout value:

```tsx
const visiblePosts = result.status === "ready" ? result.posts.slice(0, 3) : [];
const layout =
  visiblePosts.length === 1 ? "featured" : visiblePosts.length === 2 ? "double" : "grid";
```

Use `visiblePosts.length > 0` for the populated branch. This keeps the unavailable and zero-post fallback branch intact.

- [x] **Step 2: Replace the fixed three-column wrapper with state-aware classes**

Use a mobile-first wrapper that exposes the state and selects the desktop columns without leaving an empty track:

```tsx
<div
  data-layout={layout}
  className={`mt-10 grid gap-4 ${
    visiblePosts.length === 1
      ? "md:grid-cols-[minmax(0,1.55fr)_minmax(18rem,0.85fr)]"
      : visiblePosts.length === 2
        ? "md:grid-cols-2"
        : "md:grid-cols-3"
  }`}
>
```

Each rendered article should use its own `border border-border bg-background` surface rather than relying on a background color behind unoccupied grid tracks.

- [x] **Step 3: Render the shared article cards from `visiblePosts`**

Keep the current `Link` href, title, description, topic, date, and reading-time values. Preserve the full-card overlay link and add only state-aware sizing and a small arrow motion:

```tsx
{
  visiblePosts.map((post) => (
    <article
      key={post.slug}
      className={`group relative flex min-h-64 flex-col border border-border bg-background p-6 transition-colors duration-200 hover:bg-surface ${
        visiblePosts.length === 1 ? "sm:p-8" : ""
      }`}
    >
      {/* existing metadata, title link, and description */}
      <div className="relative mt-auto flex items-end justify-between gap-4 pt-6">
        <p className="font-mono text-xs text-muted-foreground">
          {post.readingTimeMinutes} min read
        </p>
        <LuArrowUpRight
          aria-hidden="true"
          className="size-5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </div>
    </article>
  ));
}
```

For the one-post state, apply a larger heading class such as `text-2xl sm:text-3xl`; retain the existing text scale for two- and three-post states.

- [x] **Step 4: Add the one-post editorial aside**

Render this immediately after the mapped article cards only when `visiblePosts.length === 1`:

```tsx
{
  visiblePosts.length === 1 ? (
    <aside
      aria-labelledby="writing-aside-title"
      className="relative flex min-h-64 flex-col justify-between overflow-hidden border border-border bg-surface p-6 sm:p-8"
    >
      <div className="relative z-10">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          Writing in public
        </p>
        <h3
          id="writing-aside-title"
          className="mt-4 max-w-[12ch] text-2xl font-semibold tracking-tight"
        >
          Notes from the build loop.
        </h3>
      </div>
      <p className="relative z-10 max-w-sm text-sm leading-6 text-muted-foreground">
        Short notes on frontend systems, product workflows, and shipping with confidence.
      </p>
      <span
        aria-hidden="true"
        className="absolute -right-4 -bottom-12 font-mono text-[10rem] leading-none text-foreground/5"
      >
        01
      </span>
    </aside>
  ) : null;
}
```

The aside must remain informational and must not add a competing archive CTA. Its decorative number is hidden from assistive technology.

- [x] **Step 5: Run the focused test and verify the implementation passes**

Run:

```bash
rtk npm test -- src/components/sections/latest-writing-section.test.tsx
```

Expected: all focused section tests pass, including the existing unavailable-feed fallback and article URL assertions.

### Task 3: Run project verification and review the final diff

**Files:**

- Verify: `src/components/sections/latest-writing-section.tsx`
- Verify: `src/components/sections/latest-writing-section.test.tsx`
- Verify: `docs/superpowers/specs/2026-08-12-latest-writing-editorial-layout-design.md`

**Interfaces:**

- Consumes: The implementation and focused tests from Tasks 1–2.
- Produces: A verified, minimal diff with no unrelated file changes.

- [x] **Step 1: Run typecheck and lint**

Run:

```bash
rtk npm run typecheck
rtk npm run lint
```

Expected: both commands exit successfully without modifying source files.

- [x] **Step 2: Run the production build**

Run:

```bash
rtk npm run build
```

Expected: the Next.js production build completes successfully with the section remaining a server-rendered component.

The default Turbopack build was blocked by the environment's font-fetch and
port-binding restrictions; `npm run build -- --webpack` completed successfully.

- [x] **Step 3: Inspect the diff and verify the scope**

Run:

```bash
rtk git diff --check
rtk git status --short
git diff -- src/components/sections/latest-writing-section.tsx src/components/sections/latest-writing-section.test.tsx
```

Expected: only the section, its focused test, and the already committed plan/spec are relevant; no lockfile or unrelated formatting changes are introduced.

- [x] **Step 4: Commit the implementation**

Run:

```bash
git add src/components/sections/latest-writing-section.tsx src/components/sections/latest-writing-section.test.tsx docs/superpowers/plans/2026-08-12-latest-writing-editorial-layout.md
git commit -m "feat: redesign latest writing layout"
```
