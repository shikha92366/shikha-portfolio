# Your Portfolio Admin Guide

## First-time connection

Your portfolio code is ready for setup. The live admin will work after your Sanity project is connected. Follow START_HERE_ANTIGRAVITY.md once; after that, ordinary content updates require no code changes or website redeployment.

## Open and log in

1. Open your portfolio's `/admin` address, or bookmark your hosted `https://YOUR-HOSTNAME.sanity.studio` address.
2. Log in through Sanity using the account that owns the project. Use your existing Sanity sign-in method (such as Google or GitHub when offered).
3. You should see **Portfolio Admin**, with **Profile**, **Site Settings & SEO**, **Resume PDF**, then the four lists.
4. Editing saves a draft automatically. Click **Publish** to make the changes public. A saved draft alone does not change the website.

## Add a project

Open **Projects (Drag & Drop Reorder)** and use the new-document button. Fill the fields below. Fields marked required in the editor must be completed before publishing.

| Studio field | What to enter |
| --- | --- |
| Project Title | The actual name of your project. |
| URL Slug | Click Generate after entering the title. Keep a published slug unchanged to preserve shared links. It must be unique. |
| Short Summary / Card Description | One sentence, at most 160 characters, shown on the project card. |
| Engineering Domain | Software or Hardware. |
| Technical Category | Embedded, IoT, AI / Machine Learning, PCB Design, or Software. The existing galleries also include related categories. |
| Tech Stack Tags | One chip, framework, language, or tool per item. |
| Your Engineering Role | Your contribution to the project. |
| Timeline / Year | The project dates. |
| Featured Project | Switch on to include it in the existing featured carousel where that gallery uses one. |
| Development Status | Completed or In Progress. This is a label, not a privacy setting. |
| Awards & Honors | Optional prizes, one per item. |
| Team / Group Name | Optional team credit. |
| Cover Image / Banner | Upload the main image and fill Alt Text. |
| Problem & System Overview | Explain the problem and purpose using the rich-text toolbar. Headings, lists, links and images are supported. |
| Architecture & System Block Diagram | Optional uploaded diagram and descriptive alt text. |
| Hardware & Circuit Details | Optional Microcontroller / SoC, Sensors, Communication & Telemetry Buses, and PCB Specifications. |
| Implementation & Firmware Design | Explain how you built it. Use the same rich-text toolbar. |
| Measurable Outcomes & Results | One result per item. |
| Engineering Challenges & Mitigations | One challenge and its solution per item. |
| Hardware Photo Gallery | Add images, fill Alt Text, and optionally Caption. Captions appear in the lightbox header. |
| Design Documents & Artifacts | Add reports, schematics, BOMs, images or external links; see below. |
| GitHub Code Repository URL | Optional full repository link. |
| Live Interactive Demo URL | Optional full demo link. |
| Video / Flight Footage URL | Optional full video link. |

Click Publish, then open `/projects/YOUR-SLUG` on the portfolio. A new page is created automatically from the project record.

## Upload or replace images

In the image field, use Upload (or Select to reuse an existing asset). To replace an image, use its field menu and choose the replacement/upload option. Write a short literal description in Alt Text. For a gallery, Add item creates another image. Drag gallery items within the field to change their order. Publish afterward. The site uses optimized Sanity CDN image URLs and fixed image areas.

## Attach PDF reports, schematics and BOMs

1. In a project, open **Design Documents & Artifacts** and Add item.
2. Set **Document Label**, such as “Final report”.
3. Choose **Document Type**: PDF, Image, External Web Link, or CSV.
4. Use **Uploaded File (PDF, Image, or CSV)** for a local file. For a web page, fill **External or Fallback URL** with a full `https://` address.
5. Use one source where possible. An uploaded file takes priority if both fields are filled.
6. Publish the project. The document appears in its documentation section.

## Reorder content

Open any list whose name ends **(Drag & Drop Reorder)**. Drag the row by its handle to the desired position. The ordering plugin saves the order. If the editor also shows unpublished content changes, publish those. Wait up to a few minutes and refresh the portfolio. Projects, experience, skills and achievements all respect this order within their existing groups/filters. A featured carousel only includes featured projects, and homepage card counts remain unchanged.

## Feature, hide, delete

- Feature: switch **Featured Project** on and Publish.
- Stop featuring: switch it off and Publish. The project remains in the gallery.
- Hide without losing your draft: use the document's Publish/action menu and **Unpublish**. It disappears from the live gallery and its old page becomes not found after refresh.
- Delete permanently: use the document action menu's Delete option and read Sanity's confirmation carefully.

After a successful first seed, intentional empty lists stay empty. During a CMS outage the site can show the bundled original portfolio instead. Therefore unpublishing is not a way to remove confidential information: the original files remain in the downloadable website. This portfolio is for public material only.

Profile, Site Settings and Resume are single records. Their duplicate/delete/unpublish actions are disabled to avoid breaking the site.

## Replace the resume PDF

Open **Resume PDF**. Replace **Resume PDF File**, adjust **Display Filename** if desired, and optionally set **Last Updated Date**. Publish. Both the `/resume` embedded viewer and its Download PDF button use the same uploaded file. When there is no usable CMS file, they use the included `/resume.pdf`.

## Edit your profile, skills and achievements

**Profile** controls Full Name, Hero Greeting, Professional Headline, Introduction Bio, Location, Contact Email, Profile Portrait / Visual, Technologies You Work With, Social & Profile Links, Education History, and Homepage Gallery Section Labels. Publish after editing. The uploaded photo replaces the existing hero visual; without a photo the original visual remains. The original decorative layout and historical About copy are retained; an edited Introduction Bio also replaces the first About paragraph.

For **Skills (Drag & Drop Reorder)**, create/edit Skill Name, Category and optional Proficiency Level. Existing grouping stays in place; AI / Machine Learning skills get a group when present. Publish and drag to reorder within their groups.

For **Achievements (Drag & Drop Reorder)**, enter the title, issuer, date, type, optional description and credential URL. Publish. Use the same list workflow for Experience: role, company, dates, bullets and optional tech stack.

**Site Settings & SEO** controls SEO Title Template, SEO Meta Description, Social Share Image and Navigation Labels. These update the browser metadata. The app is a client-rendered SPA: social crawlers that do not execute JavaScript may still use the original metadata in index.html. Server rendering or prerendering would be a separate enhancement.

## When changes appear

The portfolio fetches published content on first visit and checks again every two minutes while the page is visible. Returning to a stale browser tab also refreshes it. Allow a few minutes for CDN caching. Draft changes never appear publicly until Publish is clicked. You do not need to redeploy for normal content edits.

If content looks old: check Publish, reload, wait a few minutes, and confirm the Studio and portfolio use the same project and `production` dataset. A “Live content is temporarily unavailable” message means the saved local version is being shown; ask your setup helper to check the project ID, public dataset, CORS origins and CSP. Do not rerun the seed script to fix a cache problem: it overwrites edited content.

## Undo a mistake

Open the document and use Sanity's History / Review changes controls (the wording can vary with Studio releases). Select an available earlier revision, review it, restore the needed content and Publish. For an unpublished draft, use Discard changes only when you intend to discard the entire draft. If the desired revision is no longer available, restore the content manually from your own copy.

The Free plan is not an unlimited backup service. At verification on 10 November 2026, Sanity's pricing table lists three days for Review Changes: Drafts and does not include complete history. Keep copies of important text, reports and the resume. Source: https://www.sanity.io/pricing

## Free-plan fit

Checked 10 November 2026: Sanity Free lists 2 public datasets, 10,000 documents, 1 million API CDN requests/month, 250,000 API requests/month, 100 GB assets, 100 GB monthly bandwidth, and free Studio hosting. This seed contains 65 content documents plus uploaded assets, well below the document limit; traffic still needs monitoring. Check the current dashboard/pricing before relying on quotas. The Free member roles are Administrator and Viewer, not the paid Editor member role. API token permissions are a separate setup step.

## Actions only the owner can finish

Create/select your Sanity project and public dataset; authorize login; add your local and real website origins; create a temporary write token locally; run the seed against a development dataset first; deploy the Studio and choose its hostname; configure Vercel environment variables and redeploy once; verify that only your own account has write membership. Exact commands and the final live acceptance checklist are in START_HERE_ANTIGRAVITY.md. No account, token, live seed or deployment was created on your behalf in this delivery.

## Learning journal

Select Learning Journal in Studio to create or reopen an article. The Article, Files and SEO tabs keep long-form writing, PDF attachments and search metadata organized. The Portable Text editor supports headings, bold, italic, underline, strikethrough, links, lists, images with required alt text and captions, tables, and language-labeled code blocks. Existing code snippets remain editable. See LEARNING_JOURNAL_GUIDE.md for the daily workflow. Entry date controls display order, not scheduling.

## Documentation articles and files

Open **Documentation Library**. Select an existing row to edit it, or create a new item for a file record, a long-form article, or both. The list preview labels articles and files and shows their category, slug and visibility. Article, Library & Files, and SEO tabs keep the editor focused. Add a body and generate a slug to publish a page at `/documentation/YOUR-SLUG`; file-only records continue to appear in the library without needing an article route.

Use the Portable Text toolbar for paragraphs, headings, quotes, lists, emphasis, links and inline code. Use Insert for images, code blocks and tables. Images require descriptive alt text and can include a caption. Code blocks have a language selector and optional caption; the public reader syntax-highlights them. Article Attachments accept downloadable PDFs with link text and an optional caption. The existing Public File field remains available for standalone reports, images, presentations and other supported files.

Use **Preview draft** in the document actions to review the saved draft in a Studio modal before publishing. Studio saves drafts automatically; the previously published page remains public while edits are in draft. Click **Publish** when ready. Use **Unpublish** to remove the published version while retaining the draft; the public route and library entry then disappear. Reopen any row at any time to continue editing. SEO Title and Meta Description are optional; the article title and description are used when they are blank. Generate and preserve the slug after publishing to keep links stable.

Image and file fields include Sanity's asset picker: choose **Select** to reuse an uploaded asset or **Upload** to add one. This keeps the existing Media Library workflow close to the fields being edited; no separate storage account or private-file service is configured. Only public Sanity assets are linked on the website.
