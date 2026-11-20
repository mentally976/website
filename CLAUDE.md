@AGENTS.md

# Mentally

A mental-health counselling site whose main job is publishing **video lessons** that people watch at their own pace.
Audience: Mongolia. All user-facing copy is Mongolian (Cyrillic, incl. Ө ө Ү ү); code, identifiers and comments are English.

## Monorepo (pnpm workspaces + Turborepo)

| Path                         | What                                                                                          |
| ---------------------------- | --------------------------------------------------------------------------------------------- |
| `apps/web`                   | Next.js 16 App Router site (`@mentally/web`), deployed to Vercel                              |
| `packages/db`                | `@mentally/db`: domain types, Supabase `Database` types, mock catalogue (`@mentally/db/mock`) |
| `packages/eslint-config`     | Shared flat ESLint configs (`/next`, `/library`, `/base`)                                     |
| `packages/typescript-config` | Shared `tsconfig` bases                                                                       |
| `supabase/migrations`        | SQL schema, RLS policies, storage buckets                                                     |

Vercel project: Root Directory `apps/web`, Framework Preset Next.js (a repo-root build fails with "No Output Directory named public"). Every env var the app reads must also be listed in `turbo.json` → `tasks.build.env`, or Turborepo hides it from the build.

## Commands (run from the repo root)

- `pnpm dev` – dev server (http://localhost:3000)
- `pnpm check` – lint + typecheck every package. Run it, and `pnpm build`, before calling work done.
- `pnpm build` – production build
- `pnpm format` – Prettier (print width 160)
- `pnpm db:types` – regenerate `packages/db/src/database.types.ts` from the live project (needs `supabase login`)

## Hard rules

- **Max 160 lines per file** (`max-lines` in `packages/eslint-config/base.js`, enforced by `pnpm lint`). Split the file; never raise the limit or disable the rule.
- Next.js 16 differs from your training data: read `apps/web/node_modules/next/dist/docs/` before using an API. Middleware is `src/proxy.ts`.
- `cacheComponents` and `partialPrefetching` are on. Anything that reads `cookies()`, `headers()`, `searchParams` or the session must sit inside `<Suspense>`; static data uses `'use cache'` + `cacheLife`/`cacheTag`. See `docs/01-app/02-guides/authentication-with-cache-components.md`.
- Keep `page.tsx` / `layout.tsx` as Server Components; put interactivity in small `'use client'` components.
- Animate `transform` and `opacity` only, and respect `prefers-reduced-motion` (already handled globally in `globals.css`).
- Use `next/image` (`preload` instead of the deprecated `priority`). Remote hosts must be listed in `next.config.ts`.

## Auth (Supabase, `@supabase/ssr`)

- Clients: `lib/supabase/client.ts` (browser), `server.ts` (RSC / actions / route handlers, one per request), `public.ts` (cookie-less, for cached public reads), `proxy.ts` (session refresh in `src/proxy.ts`).
- Session reads go through `lib/auth.ts` (`getUser`, `requireUser`). It uses `getClaims()`, which verifies the JWT. Never trust `getSession()` on the server.
- `proxy.ts` only does optimistic redirects (`/dashboard` → `/login`). Re-check auth next to the data (pages, actions, route handlers).
- Email links land on `/auth/callback` (PKCE `code` or `token_hash`). Supabase dashboard → Auth → URL Configuration must allow `<site>/auth/callback` (`http://localhost:3000/**` is already allowed).
- Google sign-in: `signInWithGoogle` in `app/(auth)/actions.ts` → Google → Supabase → `/auth/callback?next=…`. Google Cloud project `mentally-515305`, OAuth client "Mentally Web (Supabase)", redirect URI `https://gwpulzdfszjxlnyclawa.supabase.co/auth/v1/callback`. The consent screen is in **Testing**: only listed test users can sign in until it is published (Google Auth Platform → Audience).
- Never use `user_metadata` for authorization; it is user-editable. Never put the service-role / secret key in a `NEXT_PUBLIC_` variable.
- Shells: guests see only the `(site)` landing page (plus `/therapists`, login, signup) with header + footer. Every course and lesson lives in `(app)` under `/dashboard/courses` (`COURSES_PATH` in `content/site.ts`), so guests must sign in to open one; old `/courses*` links are redirected there by `proxy.ts`. Signed-in students are sent from `/` and `/therapists` to `/dashboard`.
- Admin: `/admin` (`(admin)` group) is only for the emails in the server-only `ADMIN_EMAILS` env var (`.env.local` and Vercel; unset = nobody). The repo is public: never commit the admin address. `proxy.ts` routes optimistically; `requireAdmin()` in `lib/admin.ts` re-checks against the Auth server. Users are listed with the Auth admin API via `lib/supabase/admin.ts` (`SUPABASE_SECRET_KEY`, server-only).

## Data: mock today, Supabase tomorrow

`apps/web/src/lib/data.ts` is the only place pages get catalogue data. It returns mock data from `@mentally/db/mock` now.
To go live: apply the migrations, seed the tables, then replace each function body with a `createPublicClient()` query mapped to the types in `@mentally/db`. Components don't change.

- No free previews and no public catalogue: every course page is behind sign-in, and `components/courses/gated-player.tsx` still re-checks the session before sending a video URL. `isFreePreview` / `is_free_preview` and the public `lesson-previews` bucket in the migrations are unused; drop them before going live. When videos move to Supabase Storage, keep full lessons in the private `lesson-videos` bucket and hand out short-lived signed URLs from the server.
- Mentally has **one** psychologist who prepares every course: read it with `getTherapist()` and write copy in the singular (сэтгэл зүйч, not сэтгэл зүйчид). The profile (`packages/db/src/mock/therapists.ts`) is Даваабаатарын Энхтөгөлдөр; only the name is confirmed. Never invent a photo, experience or specialties for a real person: leave them empty (the UI shows initials and hides the rest) until the owner supplies them.
- Watch history is in `localStorage` (`lib/progress.ts`) until it is written to `lesson_progress`.
- Media: Unsplash photos (Unsplash License) and Mixkit videos (Mixkit free licence), listed in `packages/db/src/mock/media.ts` and `fact-media.ts`.
- Research facts ("Судалгааны баримт", `/dashboard/facts`): type `Fact` in `packages/db/src/fact.ts`, content in `packages/db/src/mock/facts-*.ts`, read through `lib/facts.ts`, UI in `components/facts/` (card grid + native `<dialog>` reader). Every fact must cite a real, peer-reviewed source (or WHO) with a working DOI/URL, and describe the finding without overstating it. The live table is `articles` (`supabase/migrations/*_articles.sql`), readable by signed-in users only.

## Design system

Tokens live in `@theme` in `apps/web/src/app/globals.css`: `canvas` #f1f1ec, `surface` #fff, `ink` #1c1d1f, `muted`, `line`, one accent `sky` #3b6a9a (focus and progress only). Type: Onest for all text, Unbounded only for the wordmark and numerals; both loaded with `cyrillic-ext` for Mongolian letters. Sizes: `text-display`, `text-title`, `text-statement`. Radii: `rounded-card`, `rounded-panel`. Buttons: `components/ui/button.tsx`.
Copy: sentence case, plain verbs, no all-caps labels, no `·`-joined meta strings. Crisis line 103 must stay visible in the footer, mobile menu and lesson pages.

## Supabase MCP

`.mcp.json` registers the hosted Supabase MCP server scoped to this project. On first use, approve it and sign in through the browser (OAuth). Use it to apply `supabase/migrations`, run advisors and generate types. Ask before any write to the database.

## Project skills (`.claude/skills`, pinned in `skills-lock.json`)

| Task                                 | Skills                                                       |
| ------------------------------------ | ------------------------------------------------------------ |
| Supabase, auth, RLS, SQL, migrations | `supabase`, `supabase-postgres-best-practices`               |
| React / Next.js code and performance | `vercel-react-best-practices`, `vercel-composition-patterns` |
| Deploying                            | `deploy-to-vercel`                                           |
| Visual design, layout, fonts         | `frontend-design`, `web-typography`, `web-design-guidelines` |
| Motion and polish                    | `emil-design-eng`, `animate`, `review-animations`            |

Update skills with `npx skills@1.7.0 update -p`, then read every changed `SKILL.md` before keeping it.
