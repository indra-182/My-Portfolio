# INDRA.DEV Portfolio

Localized recruiter portfolio for Mahadi Indra Manurung, built with Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui, and Vitest.

## Local development

```bash
pnpm install
cp .env.example .env.local
pnpm run dev
```

Open `http://localhost:3000/id` or `http://localhost:3000/en`. The root route redirects to `/id`.

Quality checks:

```bash
pnpm test
pnpm run lint
pnpm run typecheck
pnpm run build
pnpm run test:e2e
```

## Content and assets

- Localized portfolio content: `src/content/portfolio.ts`
- Content schema: `src/content/portfolio-schema.ts`
- Profile image: `public/images/mahadi-indra.webp`
- CV download: `public/documents/mahadi-indra-cv.pdf`
- Theme tokens: `src/styles/design-tokens.css`

The site supports Indonesian and English routes, plus Light and Dark theme choices. The first visit defaults to Dark, and the selected theme persists locally. Testimonials remain omitted until approved quotations are supplied. Public project copy is limited to supplied CV facts.

## Environment

Use `.env.example` as the public configuration contract. It covers `NEXT_PUBLIC_PORTFOLIO_URL`, `NEXT_PUBLIC_BLOG_URL`, `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_LINKEDIN_URL`, and `NEXT_PUBLIC_GITHUB_URL`; each has a safe default in `src/lib/site-config.ts` when unset. Replace the values as needed before production. No credentials belong in this repository.

External GitHub, Vercel, domain, and deployment actions require separate explicit approval.
