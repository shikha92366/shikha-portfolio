# Open this folder in Antigravity

This is the complete portfolio source folder, including the Sanity admin app, original public assets, seed script, tests and owner guide. It is not yet connected to a live Sanity account. Nothing has been deployed by this delivery.

## Learning journal included

Read LEARNING_JOURNAL_GUIDE.md for your daily writing workflow. Connect and deploy the Studio and frontend once; then write and publish learning notes without AI, code changes or redeployment. The Journal collection starts empty.

If you already connected an earlier version, retain its project ID/dataset, deploy this updated Studio schema and frontend once, and do not rerun the seed over your edited data.

## Preview without installing anything

Download Open_My_Portfolio.html separately and double-click it. It is a self-contained preview of the bundled content, with images and hash-based page navigation. Live CMS updates, admin login and server-side contact email require the deployed app and account configuration.

To regenerate the standalone file after source edits, run npm run build, then node scripts/build-preview.mjs.

## 1. Open and verify

Extract the ZIP. Open the inner **Portfolio** folder in Antigravity (the folder containing package.json). Use Node.js **24 LTS** and npm. Do not use the ZIP itself as the deployment root. Dependencies and build output are intentionally excluded.

Run in the Portfolio terminal:

```sh
npm ci
npm ci --prefix studio
npm run check
npm run typecheck --prefix studio
npm run seed:check
npm run dev
```

Open http://localhost:5173. Before Sanity is configured the original portfolio works using local data. `npm run seed:check` checks assets and document IDs without login, uploads or writes. Expected result: 65 content documents, no missing assets, no duplicate IDs.

## 2. Owner creates the Sanity project

Use https://www.sanity.io/manage to create a project, or use `npx sanity init` in a separate temporary folder. Do not let init overwrite this prepared studio folder. Create a **public** dataset named `production`. Record the actual project ID. A public dataset allows anonymous reads; writes still require authentication.

For a first trial, create a second public dataset named `development`. Seed and inspect it first, then repeat the seed using `production`. Do not put private or sensitive content in either public dataset.

Copy `.env.example` to `.env` in the Portfolio root (in Windows Explorer or your editor). Set:

```dotenv
VITE_SANITY_PROJECT_ID=YOUR_REAL_PROJECT_ID
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-01-01
VITE_STUDIO_URL=
SANITY_WRITE_TOKEN=YOUR_TEMPORARY_WRITE_TOKEN
```

For the trial, change VITE_SANITY_DATASET to `development` and also use `development` in studio/.env. In Sanity > API > Tokens, create a temporary Editor/write-capable API token. Keep it only in root `.env`, never in chat, Git, a VITE_ variable, or Vercel. API token permission is distinct from a project member's role; the Free plan does not include the Editor member role. Use the least-permissive write token available to your account.

Copy `studio/.env.example` to `studio/.env` and set:

```dotenv
SANITY_STUDIO_PROJECT_ID=YOUR_REAL_PROJECT_ID
SANITY_STUDIO_DATASET=production
```

The root `.env` and `studio/.env` are separate and must point to the same project/dataset. Neither is included in this ZIP or committed.

## 3. Add CORS origins and keep write access owner-only

In Sanity > API > CORS origins, add:

- `http://localhost:5173` for the portfolio, credentials OFF.
- Your exact `https://your-project.vercel.app` production origin, credentials OFF.
- Your exact custom domain origin, if used, credentials OFF.
- `http://localhost:3333` for local Studio, credentials ON where requested for Studio login.
- Your hosted Studio origin after deployment, credentials ON where requested for Studio login.

Do not use a wildcard origin. Read-only portfolio requests do not need credentials or a token. In Sanity > Members, retain only your own intended account with write/admin access. Do not invite additional people.

## 4. Seed existing portfolio content

```sh
npm run seed:check
npm run seed
```

The requested `npx tsx scripts/seed-sanity.ts` command also works in a normal local environment. The npm command uses Node's tsx loader to avoid IPC-pipe restrictions in some hosted terminals.

The live script uploads assets and uses deterministic document IDs with createOrReplace. Rerunning does not create duplicate content, but **does overwrite edits to the seeded documents and resets their order**. Run it for initial migration only, or after an intentional backup/reset decision. It does not delete unrelated CMS documents. Missing local files are warned about and skipped; API failures return a nonzero exit status. `contentReady` is published only after a successful content migration so intentionally empty lists and unpublished projects remain absent.

After the trial is checked, switch both env files to production and repeat the seed. Delete or rotate the temporary API token after the final seed. Remove its value from root `.env`.

## 5. Deploy the standalone Studio

```sh
cd studio
npx sanity login
npm run typecheck
npm run build
npx sanity deploy
```

Choose an available hostname when prompted. Record the actual `https://YOUR-HOSTNAME.sanity.studio` URL. Finish the Studio CORS origin setup. Open the deployed Studio and verify that your owner login works.

Return to the Portfolio folder. Set VITE_STUDIO_URL to that exact URL in root `.env`. The portfolio `/admin` route redirects there; it is not a custom login page.

## 6. Configure CSP and deploy the portfolio to Vercel

In the Portfolio root:

```sh
npm run configure:csp -- YOUR_REAL_PROJECT_ID
npm run check
```

This writes the exact project-specific Sanity API/CDN origins into vercel.json. The delivered generic policy allows only Sanity's API subdomains until this step; it does not allow arbitrary HTTPS connections or unsafe script evaluation. Commit the updated vercel.json with your source.

In Vercel, select the root Portfolio app, **not studio**. Use framework Vite, build command `npm run build`, output directory `dist`, Node.js 24, and the included vercel.json.

Add these production environment variables in Vercel:

| Variable | Value |
| --- | --- |
| VITE_SANITY_PROJECT_ID | Your actual project ID |
| VITE_SANITY_DATASET | production |
| VITE_SANITY_API_VERSION | 2024-01-01 |
| VITE_STUDIO_URL | Your hosted Studio URL |

Do not add SANITY_WRITE_TOKEN to Vercel. Preserve your existing server-side Resend/contact and Upstash variables for the contact API. The CMS setup does not configure those services or send email.

Redeploy the portfolio once after adding the variables. Build-time VITE_ settings require a redeploy; future Sanity content edits do not. Studio schema/code changes require Studio redeployment, but changing a project's title, image or PDF does not.

## 7. Final acceptance on your connected account

These checks require your actual account and production domains and have not been claimed as passed:

- Edit a project title, Publish, and confirm the live page changes within a few minutes without redeploying.
- Create a project with a cover, rich-text overview (headings/list/link/image), gallery with alt/caption and PDF. Publish and visit its new `/projects/slug` page.
- Drag projects into a different order and verify the gallery order.
- Replace the resume PDF and verify the viewer plus Download PDF button.
- Unpublish a seeded project and verify it is absent from both lists and its direct route. Also test an intentionally empty list.
- Block Sanity requests in browser developer tools and reload; verify the saved local content and failure notice appear. New CMS-only projects are unavailable during an outage because they are not in the original local files.
- Inspect every route's browser console for CSP violations, including CMS images and the resume PDF. Test desktop and mobile.
- Run Lighthouse on the production home page; target Performance 90+ and inspect layout shift. No Lighthouse score is asserted by this delivery.
- Confirm only your owner account has write membership; test unauthenticated read and denied unauthenticated write.

Read **ADMIN_GUIDE.md** for daily use and **VERIFICATION_REPORT.md** for completed local checks.

## Prompt to paste into Antigravity

> Use this prepared Portfolio folder. Read AGENT.md, IMPLEMENTATION_PLAN.md, START_HERE_ANTIGRAVITY.md and VERIFICATION_REPORT.md first. Preserve the current design. Install from both lockfiles and verify the app and Studio. Help me connect my own Sanity project and production dataset, run a development seed first, deploy the Studio, configure the exact CSP origins and Vercel variables, then perform the live acceptance checklist. Ask me to perform account login and enter tokens locally; never request tokens in chat or put write credentials in frontend variables. Do not recreate the project or overwrite the Studio with sanity init. Do not rerun a production seed after I have edited CMS content without explaining that it will overwrite those edits.
