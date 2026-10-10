# AGENT.md

## Project: Shikha Portfolio (ECE Engineer)

### Commands
- `npm run dev` — start dev server (port 5173)
- `npm run build` — production build
- `npm run typecheck` — `tsc --noEmit` (run before every commit)
- `npm run lint` — eslint
- `npm run preview` — preview production build

### Architecture
- React 19 + Vite SPA with React Router
- All content in `/src/data/*.ts`; components only render data
- One backend function: `/api/contact.ts`
- Zod schema shared by client form and API

### Critical Rules
1. NEVER commit `.env` or hardcode secrets
2. ALWAYS validate contact input with Zod on client AND server
3. ALWAYS handle loading, error, and empty states
4. New content = new data entries, never inline JSX content
5. Do not copy text, images, or code from any reference site; all content is original
6. Create/update `IMPLEMENTATION_PLAN.md` before each new feature
7. Run typecheck after every feature
8. Every image needs explicit dimensions or aspect-ratio (avoid layout shift)
9. Lazy-load gallery images; code-split the project page route
10. Respect prefers-reduced-motion; keep animations subtle
11. Do not edit `components/ui` except via `shadcn add` or direct design token alignment
