# Your learning journal

## What is ready

The portfolio has a Journal link, a learning section on the homepage, a searchable journal index, topic filters, 12 entries per page and individual entry pages. The Sanity admin has a Learning Journal collection. You write all entries yourself. No AI service is required or connected, and there are no generated sample entries.

This source package is implemented and checked. It is not connected to your Sanity account or deployed. Complete START_HERE_ANTIGRAVITY.md once. After that, ordinary content edits do not require redeployment.

## Daily use — no code or terminal

1. Open your hosted Sanity admin link and sign in with your authorized account.
2. Select Learning Journal, then create a new document.
3. Enter a title. Click Generate beside Page address once.
4. Optionally enter a Topic. Reuse the same spelling for related notes.
5. Leave Entry date as today or change it to the date you learned it. This is a display date, not a publication schedule.
6. Write in Article body. Use headings, bullet and numbered lists, bold, italic, underline, strikethrough, links and inline code. Longer technical articles are supported.
7. Use Insert for images, tables and language-labeled code blocks. Images need descriptive Alternative Text and can have captions. Code blocks are syntax-highlighted in the published reader; the legacy Code snippet block remains supported.
8. Add downloadable PDFs under Files and set a readable label. Add an SEO Title and Meta Description under SEO when they should differ from the article title and text.
9. Wait for the editor to finish saving. Use **Preview draft** in the document actions to review the saved draft in a Studio modal. Keep it as a draft while working. Click Publish when it is ready.
10. Open the portfolio Journal. Refresh to fetch a new result immediately; an already-open tab normally checks again every 60 seconds while active. Background tabs can be throttled by the browser.

The admin stores content in Sanity, not in your downloaded folder or browser storage. The public site requests the published perspective without a write token and explicitly excludes draft and release-version IDs.

## Edit or remove an entry

Open the same document in Learning Journal. Changes remain a draft until you Publish again. Use **Preview draft** before publishing; the prior published version remains public in the meantime. Use Unpublish to remove an entry from the public journal while retaining a draft. Its old public address then displays Entry not available after the next fetch. Keep a published page address unchanged if you want existing links to continue working.

## Finding notes

Visitors can search titles, topics and the normal text of notes, combine search with a topic, and move between pages. Search does not inspect the contents of PDFs/images or custom code blocks. Newest entry dates appear first. Summaries are taken from your notes automatically; you do not have to write a second description.

## A small writing routine

Write as much or as little as useful. Optional prompts: What did I learn? What did I try? What worked or failed? What will I try next? These prompts are guidance only; the app does not generate text for you.

## One-time live acceptance checklist

After connecting and deploying the existing Studio and frontend:
- Create one test note as a draft. Confirm it is absent from the public index and direct address.
- Add a heading, link, screenshot with alternative text, code snippet, and labeled PDF. Publish.
- Confirm the index, search, topic, entry text, image, code and PDF link work.
- Edit the note and Publish. Confirm the live text changes without a frontend build/deployment.
- Unpublish. Confirm both index removal and unavailable direct address after refresh.
- Publish your real note when ready. Remove the temporary test document through Studio if no longer needed.
- Confirm owner login and permissions, exact production CORS origins, and the portfolio /admin redirect.

## Offline preview

Open_My_Portfolio.html is a self-contained snapshot for viewing the design without Node/npm. It shows an empty journal until real entries are connected in the hosted site. It cannot log in to Studio, publish content, or receive future journal entries. Use your hosted portfolio and admin for daily documentation.

## Existing versus new deployments

For a new account, follow the full setup guide. For an already-connected account, deploy the updated Studio schema and frontend once with the same project/dataset. Do not rerun the original seed over edited portfolio documents; it is migration/reset tooling. Journal entries are not part of that seed.

## Verification limits

Automated tests, local GROQ evaluation, frontend/Studio builds, and browser checks of homepage/journal navigation and the empty/unavailable states have been completed. Real authenticated publishing, attachment uploads, mobile browser review, production CORS and production deployment require the owner environment and remain pending. The original portfolio biography and project claims are retained; technical checks do not independently verify those claims.
