# Implementation Plan: ECE Engineer Portfolio (Inspired by gazijarin.com)

A fast, polished, multi-section personal portfolio for **Shikha**, an Electronics & Communication Engineering (ECE) professional specializing in Embedded Systems, Avionics, IoT, and PCB Design. Built with React 19 + Vite + TypeScript, styled with Tailwind CSS v4 and the gazijarin.com dark navy (#0a192f) and mint green (#64ffda) visual aesthetic.

---

## Phase 1: Foundation (Day 1)
- [x] Vite + React 19 + TypeScript initialization
- [x] Core dependencies installed: `tailwindcss`, `@tailwindcss/vite`, `framer-motion`, `lucide-react`, `zod`, `react-router-dom`, `react-markdown`, `rehype-sanitize`, `@upstash/ratelimit`, `@upstash/redis`, `resend`, `canvas-confetti`
- [x] Configure Tailwind v4 & gazijarin design tokens in `src/index.css` (Background `#0a192f`, Panel `#112240`, Border `#233554`, Heading `#ccd6f6`, Body `#8892b0`, Accent `#64ffda`)
- [x] Update `src/types/index.ts` with the exact specified data model (`Profile`, `Experience`, `Project`, `ProjectDocument`, `Skill`, `Achievement`, `ContactFormInput`)
- [x] Implement verbatim owner content in `src/data/`: `profile.ts`, `experience.ts`, `projects.ts`, `skills.ts`, `achievements.ts`
- [x] Configure client routes in React Router (`/`, `/software`, `/hardware`, `/projects/:slug`, `/achievements`, `/resume`, `/contact`, `*`)
- [x] Set up `vercel.json` SPA rewrites and security headers
- [x] Verify `/api/contact.ts` serverless function with Zod validation, honeypot check, and rate limiting

---

## Phase 2: Core Features
- [x] **Navbar & Layout Shell**:
  - Full-width sticky bar with name at left, navigation links, and icons (mail, GitHub, LinkedIn, Resume) at right
  - Outlined "GAME MODE" pill button under navbar (toggles interactive circuit/matrix canvas mode)
  - Mobile responsive drawer menu
  - Section headings with `/ ` in accent color and extending horizontal rules
- [x] **Home Page Modules**:
  - **Conversational Hero**: Two-column layout with animated mint ASCII/dot-matrix canvas portrait on the left and `"hi, shikha here."` headline + personal intro + outlined "Say hi!" button on the right
  - **/ about me**: Two-column layout with highlighted organization names (`PSIT Kanpur`, `PSIT Vyomnauts`, `Raman Research & Innovation`), two-column technologies list with `▹` mint bullets, and rounded owner card/visual
  - **/ experience**: Vertical company tabs on left, active tab in accent mint, detail panel on right (Role @ Company, date range in caps, impact bullets). Horizontal scrollable tab row on mobile
  - **/ embedded & ai** (Software): "View all projects →" link, featured project carousel slide with dark gradient overlay, and card grid with folder & GitHub icons
  - **/ avionics & pcb** (Hardware): Image-top card grid linking to full project documentation pages
  - **/ skills**: Grouped technical skills matrix (Embedded, IoT, TinyML, PCB Design, Software, Tools) with mint markers
  - **/ achievements**: Highlights preview with credential links
  - **/ contact**: Clean contact form with Zod validation and honeypot
- [x] **Dedicated Sub-Pages**:
  - `/software`: Full Embedded & AI / Software gallery with category filters and search
  - `/hardware`: Full Avionics, IoT & PCB gallery with filters and documentation links
  - `/projects/:slug`: Complete engineering case study layout (Title, one-line summary, tech tags, role, timeline, buttons; Cover preview; Overview; System Architecture block diagram; Hardware details table with MCU, sensors, comms, PCB specs; Implementation; Results stat cards; Challenges & solutions; Image gallery with modal Lightbox; Documents list with downloadable schematics and BOM; Prev/Next project pagination)
  - `/achievements`: Full list of awards, certifications, publications, and competitions
  - `/resume`: Embedded PDF document viewer with direct download button for `SHIKHA_RESUME.pdf`
  - `/contact`: Dedicated contact page with direct email, social links, and interactive message form
  - `*`: 404 Not Found page with retro terminal styling and return button
- [x] **Asset Library & Documentation**:
  - Real high-resolution PCB layouts (`pcb-front.png`, `pcb-back.png`, `photo-1.webp`) downloaded directly from the GitHub repository
  - High-resolution architecture SVGs for Trishul Rocket Avionics, CanSat, and MotorMind AI in `/public/projects/`
  - Generated clean downloadable `resume.pdf` with Shikha's actual credentials in `/public/`
  - Added Trishul Flight Avionics Bill of Materials (`bom.csv`) in `/public/projects/rocket-avionics/`

---

## Phase 3: Polish and Verification
- [x] `npm run typecheck` (`tsc --noEmit`) passes with zero errors
- [x] `npm run build` generates production bundle cleanly (Initial bundle 111.91 kB gzipped, route-level code splitting active)
- [x] Respect `prefers-reduced-motion` for animations and ASCII portrait
- [x] SEO, OpenGraph metadata, and clean browser titles for every route
- [x] Local `/api/contact` dev proxy verified with Zod sanitization, successful dispatch, and honeypot bot trap
- [x] Tested dev server running at `http://localhost:5173/` with `200 OK` on all endpoints and static assets

---

## Phase 4: No-Code Admin Panel (Sanity CMS Integration)

### Architecture & Approach
- Hosted Sanity Studio (`/studio`) configured as a standalone Vite/React Sanity Studio application deploying to `<project>.sanity.studio`.
- Public dataset read via `@sanity/client` + `@sanity/image-url` in frontend, authenticated write via write token in migration script only.
- Local typed data files in `/src/data/*.ts` retained as offline fallbacks and seed baseline.
- TanStack Query (`@tanstack/react-query`) data layer with custom hooks (`useProjects`, `useProject(slug)`, `useExperience`, `useSkills`, `useAchievements`, `useProfile`, `useResume`).
- Portable Text rendered safely via `@portabletext/react` without `dangerouslySetInnerHTML`.

### Field-for-Field Schema Mapping Table

| App TypeScript Type / Field | Sanity Document / Field | Sanity Schema Type | Notes & Validation |
|---|---|---|---|
| **Profile** (`src/types/index.ts:Profile`) | `profile` (singleton) | document | Single document in desk structure |
| `name: string` | `name` | `string` | Required |
| `greeting: string` | `greeting` | `string` | Required, e.g. "hi, shikha here." |
| `title: string` | `title` | `string` | Required, professional headline |
| `intro: string` | `intro` | `text` | Required, 2-3 conversational sentences |
| `location: string` | `location` | `string` | Required, e.g. "Kanpur, India" |
| `currentTechnologies: string[]` | `currentTechnologies` | `array` of `string` | Tag list for hero & about |
| `socials: { label, url, icon }[]` | `socials` | `array` of `object` | label (required), url (url validation), icon (select/string) |
| `email: string` | `email` | `string` | Required, email validation |
| `education: { school, degree, period, score }[]` | `education` | `array` of `object` | school, degree, period, score (all required strings) |
| `sectionLabels: { software, hardware }` | `sectionLabels` | `object` | software (required), hardware (required) |
| *(Visual asset)* | `photo` | `image` | Hotspot enabled, alt text |
| **SiteSettings** | `siteSettings` (singleton) | document | SEO & Navigation metadata |
| Meta Title | `title` | `string` | Site meta title |
| Meta Description | `description` | `text` | SEO description |
| OG Image | `ogImage` | `image` | Hotspot enabled |
| Nav labels | `navLabels` | `object` | Optional navigation title overrides |
| **Resume** | `resume` (singleton) | document | PDF upload & metadata |
| PDF File | `resumeFile` | `file` | Accepted type `.pdf`, required |
| Last Updated | `lastUpdated` | `date` | Optional date picker |
| **Experience** (`src/types/index.ts:Experience`) | `experience` (list) | document | Drag-and-drop ordered |
| `role: string` | `role` | `string` | Required |
| `company: string` | `company` | `string` | Required |
| `startDate: string` | `startDate` | `string` | Required, e.g. "Mar 2025" |
| `endDate: string` | `endDate` | `string` | Required, e.g. "Jun 2025" or "Present" |
| `bullets: string[]` | `bullets` | `array` of `string` | Required, measurable achievements |
| `techStack?: string[]` | `techStack` | `array` of `string` | Optional tech tags |
| *(Order)* | `order` | `number` | Managed by `@sanity/orderable-document-list` |
| **Skill** (`src/types/index.ts:Skill`) | `skill` (list) | document | Drag-and-drop ordered |
| `name: string` | `name` | `string` | Required |
| `category: 'embedded' \| 'iot' \| 'ai-ml' \| 'pcb-design' \| 'software' \| 'tools'` | `category` | `string` | Select list, required |
| `proficiency?: 'familiar' \| 'proficient' \| 'expert'` | `proficiency` | `string` | Select list |
| *(Order)* | `order` | `number` | Managed by `@sanity/orderable-document-list` |
| **Achievement** (`src/types/index.ts:Achievement`) | `achievement` (list) | document | Drag-and-drop ordered |
| `title: string` | `title` | `string` | Required |
| `issuer: string` | `issuer` | `string` | Required |
| `date: string` | `date` | `string` | Required, e.g. "2024-25" |
| `type: 'certification' \| 'award' \| 'publication' \| 'competition'` | `type` | `string` | Select list, required |
| `description?: string` | `description` | `text` | Optional plain text summary |
| `credentialUrl?: string` | `credentialUrl` | `url` | Optional external link |
| *(Order)* | `order` | `number` | Managed by `@sanity/orderable-document-list` |
| **Project** (`src/types/index.ts:Project`) | `project` (list) | document | Drag-and-drop ordered |
| `title: string` | `title` | `string` | Required |
| `slug: string` | `slug` | `slug` | Auto-generated from title, unique, required |
| `shortDescription: string` | `shortDescription` | `text` | Max 160 chars, required |
| `domain: 'software' \| 'hardware'` | `domain` | `string` | Select: software/hardware, required |
| `category: 'embedded' \| 'iot' \| 'ai-ml' \| 'pcb-design' \| 'software'` | `category` | `string` | Select, required |
| `techStack: string[]` | `techStack` | `array` of `string` | Required, rendered as uppercase tags |
| `role: string` | `role` | `string` | Required |
| `timeline: string` | `timeline` | `string` | Required, e.g. "2024 - 2025" |
| `featured: boolean` | `featured` | `boolean` | Initial value false |
| `status: 'completed' \| 'in-progress'` | `status` | `string` | Select: completed/in-progress |
| `awards?: string[]` | `awards` | `array` of `string` | Honors & recognitions |
| `team?: string` | `team` | `string` | e.g. "Team Sudarshan (6 members)" |
| `coverImage: string` | `coverImage` | `image` | Hotspot enabled, alt text required |
| `overview: string \| PortableText` | `overview` | `array` of `block` | Portable Text with headings, lists, links, inline images |
| `architecture?: string` | `architecture` | `image` | Diagram image with alt text |
| `hardwareDetails.mcu` | `hardwareDetails.mcu` | `string` | Microcontroller / core |
| `hardwareDetails.sensors` | `hardwareDetails.sensors` | `array` of `string` | Sensor modules |
| `hardwareDetails.communication` | `hardwareDetails.communication` | `array` of `string` | Bus and RF telemetry protocols |
| `hardwareDetails.pcbSpecs` | `hardwareDetails.pcbSpecs` | `text` | Layers, EDA tool, dimensions |
| `implementation: string \| PortableText` | `implementation` | `array` of `block` | Portable Text with headings, lists, links, inline images |
| `results: string[]` | `results` | `array` of `string` | Measurable outcomes |
| `challenges?: string[]` | `challenges` | `array` of `string` | Mitigations & learnings |
| `gallery: string[]` | `gallery` | `array` of `image` | Images with alt & caption |
| `documents: ProjectDocument[]` | `documents` | `array` of `object` | label (required), type (pdf/image/link/csv), file (`file`), url (`url`/`string`) |
| `githubUrl?: string` | `githubUrl` | `url` | Code repository |
| `demoUrl?: string` | `demoUrl` | `url` | Interactive demo |
| `videoUrl?: string` | `videoUrl` | `url` | Flight / demo recording |
| *(Order)* | `order` | `number` | Managed by `@sanity/orderable-document-list` |

### Step-by-Step Implementation Roadmap
1. [ ] **Sanity Studio Setup (`/studio`)**:
   - Initialize `/studio` with TypeScript and latest stable Sanity Studio v3 (`sanity`, `@sanity/orderable-document-list`, etc.).
   - Define custom desk structure (`deskStructure.ts`): Singletons pinned at top (Profile, Site Settings, Resume) without "Create New"; orderable lists for Projects, Experience, Skills, Achievements.
   - Implement document schemas with plain English descriptions and strict validation.
   - Add custom list previews with badges and thumbnails.
2. [ ] **Content Migration / Seed Script (`/scripts/seed-sanity.ts`)**:
   - Reads existing `/src/data/*.ts` fixtures.
   - Deterministic `_id` creation using `createOrReplace`.
   - Asset upload pipeline for local `/public` files and images linked in project documents.
   - Plain text to Portable Text converter for `overview` and `implementation`.
   - Reads `SANITY_WRITE_TOKEN` safely from local `.env`.
3. [ ] **Frontend Sanity Data Layer (`/src/lib/sanity/` & `/src/hooks/`)**:
   - Install `@sanity/client`, `@sanity/image-url`, `@portabletext/react`, `@tanstack/react-query`.
   - Configure read client with `VITE_SANITY_PROJECT_ID`, `VITE_SANITY_DATASET`, `VITE_SANITY_API_VERSION`, `useCdn: true`.
   - Implement GROQ queries for projects, experience, skills, achievements, profile, resume, site settings.
   - Implement mappers transforming Sanity documents into app types, resolving CDN URLs and Portable Text safely.
   - Implement TanStack Query hooks with automatic offline fallbacks to `/src/data/*.ts`.
4. [ ] **Component Integration & Fallback Handling**:
   - Provide `QueryClientProvider` in `App.tsx`.
   - Update `ProjectPage`, `Software`, `Hardware`, `ExperienceTabs`, `SkillsSection`, `AchievementsList`, `ResumeViewer`, `Hero`, `AboutSection`, `Navbar`, and `Footer`.
   - Add loading skeletons and error notices that degrade gracefully to local data.
   - Add `/admin` redirect route to `VITE_STUDIO_URL`.
5. [ ] **Security, Content Security Policy & Testing**:
   - Update `vercel.json` CSP to permit `cdn.sanity.io`, `*.apicdn.sanity.io`, `*.api.sanity.io`.
   - Update `.env.example` with documented environment variables.
   - Configure Vitest unit tests covering schema mappers, optional fields, and fallback logic.
   - Confirm zero write tokens or secrets leak into production client bundle.
6. [ ] **Owner Documentation (`ADMIN_GUIDE.md`)**:
   - Non-developer walkthrough explaining login, adding/editing projects, reordering, managing resume PDF, rollback history, and cache propagation.


## Completion audit — 10 November 2026
The uploaded archive already contains an unfinished CMS implementation. Complete it in place, preserving the public layout and local content.

1. Repair immediate fetching, periodic refresh and failure reporting. Preserve intentional empty/unpublished CMS content after seeding with a settings marker; an unseeded dataset still uses local fallback.
2. Connect the maintained ordering plugin's `orderRank` field to GROQ (numeric `order` remains the seed position). Lock singleton creation/duplication.
3. Connect Site Settings and profile photo; preserve the existing component prop shapes with optional asset metadata.
4. Repair seed collisions (C/C++), asset types, deterministic keys and failed-run reporting; add a dry-run asset audit.
5. Tighten CSP and provide a project-specific CSP setup command. Complete schema validation, guide and Antigravity handoff.
6. Run frontend/Studio typechecks, lint, mapper/fallback tests and builds. Clearly separate local results from account-dependent live acceptance checks.

Schema mapping above remains applicable. Additions: `profile.photo` maps to optional Profile.photo; image alt/captions map to optional Project image metadata without changing existing string URL fields; `siteSettings.contentReady` distinguishes deliberate empty published collections from an unseeded dataset; `orderRank` is the plugin-maintained sortable key, with numeric `order` retained.

## Completion status

The original Phase 4 checklist above describes the starting implementation and is superseded by this completion audit:

- [x] Studio upgraded, schemas/validation described, singletons protected, plugin ordering connected.
- [x] Seed repaired; dry run checks 65 document IDs and all referenced local assets.
- [x] Client, published queries, typed mapping, immediate fetching and two-minute refresh integrated.
- [x] Site settings/nav, profile photo/greeting, resume and gallery metadata connected; loading/fallback/empty handling added.
- [x] CSP tightened, project-specific configuration command included, write-token sentinel check passed.
- [x] Owner guide, Antigravity handoff and verification report written.
- [x] App/seed/Studio typechecks, lint, 30 tests and both builds passed.
- [ ] Owner-authenticated development seed and production setup.
- [ ] Live publishing/reordering/assets/resume acceptance on actual Sanity/Vercel account.
- [ ] Browser console CSP checks, visual parity and Lighthouse 90+ verification (environment prevented Chromium launch).

See VERIFICATION_REPORT.md for precise limits. No live deployment or credentials were assumed.

## Requested visual refresh — 10 November 2026
User explicitly requested removal of Game Mode and UI/UX inspiration from techarcanist.com. This authorizes visual/component changes beyond the prior no-redesign constraint.

- Remove the entire game/status strip, game state, overlay import and unused game components.
- Use the reference's broad principles only: near-black canvas, large typographic introduction, quiet metadata, numbered sections, restrained blue accents, generous spacing and work-led navigation. No reference copy, images, source code or invented achievements.
- Keep all existing project content and Sanity integration. Add a filterable selected-work section fed by useProjects, with featured/all selection and case-study links.
- Refresh hero, navigation, project cards, section headings and footer; align existing route colors with the new palette.
- Deliver an updated deployment source ZIP and a single HTML preview that opens without Node/VS Code. Verify typechecks, lint, tests and build; inspect the browser preview where available.

### Visual refresh completion
- Removed game overlay and telemetry strip.
- Added editorial hero, project spotlight, project search and filters, numbered sections and responsive navigation.
- Preserved original content, routes and Sanity data hooks; added optional Work/Skills nav labels to Studio.
- Rebuilt standalone HTML with 13 embedded assets.
- Frontend and Studio checks passed; browser visual review blocked by local-file URL policy.

## Learning Journal — final requested addition
- Add a Sanity-owned journal collection with manual rich text, code snippets, screenshots and file attachments; no AI content or fabricated entries.
- Add published-only public journal index, topic/search filtering, pagination and entry routes. Fetch at runtime from the live API; drafts never included and no redeployment for content edits.
- Add homepage/nav discovery and explicit empty/error states; retain owner-authenticated Studio.
- Test data mapping, draft exclusion/query invariants and reader rendering; run frontend/Studio checks and regenerate the offline preview and handoff ZIP.
- Account login, CMS project IDs/CORS, initial deployment and authenticated live acceptance remain owner-dependent; never claim these completed without evidence.

### Journal implementation outcome
- Added manual Studio collection and public journal index/detail pages with search, topics and pagination.
- Added 14 focused data/render tests; evaluated actual GROQ with draft/version fixtures.
- Verified desktop empty/unavailable navigation in managed browser preview.
- Added LEARNING_JOURNAL_GUIDE.md with daily workflow and live acceptance steps.
- No account credentials available; live configuration and deployment not performed.

## Documentation management — Phase 1 (13 November 2026)
- [x] Add standalone technical-document and category schemas to the existing Studio; preserve all existing project artifact fields and records.
- [x] Add Documentation Library and Documentation Categories to the Studio desk structure. Private records remain unpublished and have no Sanity CDN upload field until private R2 storage is implemented.
- [x] Add a published/public-only frontend query and `/documentation` route with supported PDF/image previews, download links, project association, tags, and responsive states.
- [x] Show public library documents associated with a project on its existing project detail route; legacy project artifact rendering remains unchanged.
- [x] Verify frontend typecheck/lint/tests/build, Studio typecheck/build, and local desktop/mobile empty states. No dataset writes, seed, push, or deployment performed.
- [ ] Phase 2: configure private Cloudflare R2 storage and owner-authenticated server endpoints; do not enable private-file access until credentials and bucket policy are owner-configured.

## Documentation and Journal authoring — local phases (13 November 2026)

- [x] Extend the existing Portable Text schema with rich formatting, headings, inline images/captions, accessible tables, and language-labeled code blocks; preserve existing fields and legacy Journal code snippets.
- [x] Add article slugs, SEO title/meta description, PDF attachments, grouped Studio fields, list previews, and a local Studio draft-preview action for both Documentation and Learning Journal.
- [x] Add public published-only Documentation article queries, list excerpts, detail routes/readers, highlighted code, tables, image captions, downloadable attachments, and per-article metadata.
- [x] Keep Documentation's existing file-library behavior and Sanity asset picker; no private storage or new CMS was added.
- [x] Document editing, draft preview, publish/unpublish, SEO, PDF and reusable asset workflows.
- [x] Add article mapping/query/reader regression coverage; full local checks and both production builds pass.
- [ ] Private R2 storage and authenticated upload endpoints remain intentionally unimplemented: they require external account/bucket configuration and are excluded by the current request. No Sanity dataset, production data, GitHub remote, or Vercel deployment was accessed.
