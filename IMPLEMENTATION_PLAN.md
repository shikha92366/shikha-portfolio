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
