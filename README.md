# Hasif — Portfolio

A sleek, dark, scroll-driven portfolio built like a product: projects + case studies + a time-based timeline.

## Tech

- Next.js (App Router) + TypeScript
- Tailwind CSS v4 (CSS-first) + design tokens
- Framer Motion (reveals + scroll-driven scenes)
- MDX case studies (`content/case-studies/*.mdx`)

## Edit your content

- Site identity + links: `src/site.config.ts`
- Projects data: `src/content/projects.ts`
- Timeline chapters: `src/content/timeline.ts`
- Case studies (MDX): `content/case-studies/*.mdx`

## Getting started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build & lint

```bash
npm run lint
npm run build
```

## Deploy for free (Vercel)

1. Push this folder to a GitHub repo.
2. Go to Vercel → “Add New Project” → import the repo.
3. Keep defaults (Next.js). Vercel will auto-build and host a free `*.vercel.app` domain.

## Optional: free contact form (Formspree)

If you want a real form instead of email links:

1. Create a Formspree form (free tier).
2. Set `NEXT_PUBLIC_FORMSPREE_FORM_ID` in Vercel project env vars.
3. The contact page will post to `https://formspree.io/f/<id>`.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
