# Hasif — Portfolio

A dark-first, scroll-driven, WebGL-accented personal portfolio for
**Muhammad Hasif Bin Mohd Faisal** — applied AI undergraduate and research
developer in Singapore.

## Stack

- **Next.js 15** (App Router) + **React 19**
- **TypeScript** (strict)
- **Tailwind CSS v4** (CSS-first via `@theme`, design tokens in
  `src/styles/globals.css`)
- **Framer Motion** for 2D motion & reveals
- **React Three Fiber + three.js** for the hero WebGL scene
- **Lenis** for smooth scroll (respects `prefers-reduced-motion`)
- **next-themes** for the dark/light toggle
- **cmdk** for the ⌘K command palette
- **react-hook-form + zod** for contact validation
- **Resend** for contact email delivery
- **Vercel Analytics + Speed Insights**

## Project layout

```
src/
├── app/
│   ├── (routes: /, /work, /work/[slug], /resume, /writing)
│   ├── api/contact      # POST: validated + rate-limited Resend send
│   ├── api/og           # edge: dynamic OG image
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── hero/            # hero + R3F canvas
│   ├── layout/          # nav, footer, cursor, cmdk, etc.
│   ├── sections/        # home page sections
│   ├── projects/        # work grid
│   ├── primitives/      # Button, Chip, Section, OrgTag, Magnetic, Reveal
│   ├── seo/             # JSON-LD
│   └── theme/           # next-themes wrapper
├── content/             # typed content data (projects, experience, …)
├── lib/                 # utils, github client, logos, rate-limit
└── styles/globals.css   # design tokens + base styles
site.config.ts           # single source of truth for identity + links
```

## Local development

```bash
npm install --legacy-peer-deps
npm run dev
```

Open <http://localhost:3000>. Hot reload is on.

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Contact form sends. Without it the API falls back to a dev-only stub that logs the payload. |
| `CONTACT_TO_EMAIL` | Inbox that receives form messages. Defaults to `site.config.ts`. |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL used for metadata + sitemap. |
| `GITHUB_TOKEN` | Optional. Used server-side for a higher GitHub API rate limit on the activity section. |

## Editing content

- Identity, socials, nav: [`site.config.ts`](./site.config.ts)
- Projects: [`src/content/projects.ts`](./src/content/projects.ts)
- Experience: [`src/content/experience.ts`](./src/content/experience.ts)
- Education: [`src/content/education.ts`](./src/content/education.ts)
- Skills: [`src/content/skills.ts`](./src/content/skills.ts)
- Certifications: [`src/content/certifications.ts`](./src/content/certifications.ts)
- Awards: [`src/content/awards.ts`](./src/content/awards.ts)

## Adding a case study

1. Add a project entry to `src/content/projects.ts` with a unique `slug`.
2. The route `/work/<slug>` is generated automatically via
   `generateStaticParams`.
3. Add `approach`, `outcomes`, links, and stack details to populate the case study.

## Accessibility

- Semantic HTML landmarks everywhere
- Skip-to-content link
- `prefers-reduced-motion` respected globally; smooth scroll + WebGL
  hero are disabled under reduce preferences
- Custom focus rings (not `outline: none`)
- ARIA labels on every icon-only button
- In-app settings (footer gear icon): reduced motion, high-contrast,
  section-sound toggles

## Keyboard shortcuts

- **⌘K / Ctrl+K** — open command palette
- **Esc** — close the palette / modals
- **↑ ↑ ↓ ↓ ← → ← → B A** — you know what this does

## Deploy — Vercel (recommended)

1. Push the repo to GitHub.
2. Import into Vercel (Next.js preset auto-detected).
3. Set `RESEND_API_KEY`, `NEXT_PUBLIC_SITE_URL`, and optionally
   `GITHUB_TOKEN` in the project's Environment Variables.
4. Deploy. Preview deploys come free on every PR.

## Deploy — Cloudflare Pages (alternative)

1. `npx @cloudflare/next-on-pages@1` to build a Pages-compatible bundle.
2. Push to a repo Cloudflare Pages is connected to.
3. Build command: `npx @cloudflare/next-on-pages`.
   Output dir: `.vercel/output/static`.
4. Set the same env vars as above.

## Scripts

```bash
npm run dev         # dev server
npm run build       # production build
npm run start       # serve production
npm run lint        # next lint
npm run typecheck   # tsc --noEmit
```

## License

MIT — see [LICENSE](./LICENSE).
