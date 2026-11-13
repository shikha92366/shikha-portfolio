# Portfolio Admin

Standalone Sanity Studio (Sanity 6.22.0, ordering plugin 2.0.28; registry latest tags checked 10 November 2026).

Use Node 24 LTS. Run `npm ci` here. Copy `.env.example` to `.env`, set the real project ID and dataset, then `npm run dev` (http://localhost:3333).

`npm run typecheck` and `npm run build` verify this separate app. `npx sanity login` and `npm run deploy` connect and deploy it. See ../START_HERE_ANTIGRAVITY.md for the account, CORS, seed and Vercel setup.

Singletons use fixed IDs and cannot be created from the global create menu, duplicated, deleted or unpublished. Ordering uses the maintained plugin's required orderRank field (LexoRank), with numeric order retained as original migration position. Frontend queries sort by orderRank, then order. All queries use published content. No write token belongs in Studio environment variables.
