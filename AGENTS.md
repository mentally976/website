## This is NOT the Next.js you know

This repo uses Next.js 16.4. APIs, conventions and file structure differ from older versions (for example, Middleware is now `proxy.ts`, `priority` on `next/image` is now `preload`, and Cache Components change how request data is read).

Before writing Next.js code, read the relevant guide in `apps/web/node_modules/next/dist/docs/` (the `next` package is installed in the app, not at the repo root). Heed deprecation notices.

`apps/web/AGENTS.md` is written and re-added by `next dev`; leave it in place.
