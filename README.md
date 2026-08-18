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

The site supports Indonesian and English routes, plus Light and Dark theme choices. On first visit, the theme follows the operating-system preference internally. Testimonials remain omitted until approved quotations are supplied. Public project copy is limited to supplied CV facts.

## Environment

Use `.env.example` as the public configuration contract. Replace the local origins and placeholder email before production. No credentials belong in this repository.

External GitHub, Vercel, domain, and deployment actions require separate explicit approval.
