import { createHash } from 'node:crypto';
import fs from 'fs';
import path from 'path';
import { createClient } from '@sanity/client';

// Import existing typed content fixtures
import { profile } from '../src/data/profile';
import { experience } from '../src/data/experience';
import { skills } from '../src/data/skills';
import { achievements } from '../src/data/achievements';
import { projects } from '../src/data/projects';

// Simple .env parser to read SANITY_WRITE_TOKEN and project ID without extra dependencies
function loadEnvFile(envPath: string) {
  if (!fs.existsSync(envPath)) return;
  const content = fs.readFileSync(envPath, 'utf-8');
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx !== -1) {
      const key = trimmed.slice(0, eqIdx).trim();
      let val = trimmed.slice(eqIdx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  }
}

loadEnvFile(path.resolve(process.cwd(), '.env'));
loadEnvFile(path.resolve(process.cwd(), '.env.local'));

const projectId =
  process.env.SANITY_PROJECT_ID ||
  process.env.VITE_SANITY_PROJECT_ID ||
  process.env.SANITY_STUDIO_PROJECT_ID;

const dataset =
  process.env.SANITY_DATASET ||
  process.env.VITE_SANITY_DATASET ||
  process.env.SANITY_STUDIO_DATASET ||
  'production';

const token = process.env.SANITY_WRITE_TOKEN;
const dryRun = process.argv.includes('--dry-run');
let missingAssets = 0;
let failedAssets = 0;
const documentIds = new Set<string>();

function printUsageAndExit() {
  console.log(`
========================================================================
[Sanity Seed Script]
------------------------------------------------------------------------
To seed existing portfolio data into Sanity, set the following in .env:

  VITE_SANITY_PROJECT_ID=your-project-id
  VITE_SANITY_DATASET=production
  SANITY_WRITE_TOKEN=your-sanity-write-or-editor-token

Note: SANITY_WRITE_TOKEN must never have the VITE_ prefix so it is never
bundled into browser code.
========================================================================
`);
}

if (!dryRun && (!projectId || !token || projectId === 'your-project-id')) {
  console.error('\n❌ Missing required Sanity credentials in .env:');
  if (!projectId) console.error('   - Missing VITE_SANITY_PROJECT_ID (or SANITY_PROJECT_ID)');
  if (!token) console.error('   - Missing SANITY_WRITE_TOKEN');
  printUsageAndExit();
  process.exit(1);
}

const client = createClient({
  projectId: dryRun ? 'placeholder' : projectId!,
  dataset,
  token: dryRun ? undefined : token,
  apiVersion: '2024-01-01',
  useCdn: false,
});

// Cache uploaded assets by file path to prevent duplicate uploads
const assetCache = new Map<string, any>();

async function uploadLocalAsset(
  relativePathOrUrl: string | undefined,
  assetType: 'image' | 'file'
): Promise<any | null> {
  if (!relativePathOrUrl) return null;
  if (relativePathOrUrl.startsWith('http://') || relativePathOrUrl.startsWith('https://')) {
    return null;
  }

  const cacheKey = `${assetType}:${relativePathOrUrl}`;
  if (assetCache.has(cacheKey)) {
    return assetCache.get(cacheKey);
  }

  const cleanPath = relativePathOrUrl.replace(/^\//, '');
  const absPath = path.resolve(process.cwd(), 'public', cleanPath);

  if (!absPath.startsWith(path.resolve(process.cwd(), 'public') + path.sep)) throw new Error('Asset path must stay inside public.');
  if (!fs.existsSync(absPath)) {
    missingAssets++;
    console.warn(`  ⚠️  [Missing Asset] Local file not found at: ${absPath} (skipping upload)`);
    return null;
  }

  if (dryRun) return { _id: `dry-${assetType}-${createHash('sha256').update(cacheKey).digest('hex').slice(0,16)}` };
  try {
    const filename = path.basename(absPath);
    const stream = fs.createReadStream(absPath);
    console.log(`  ⬆️  Uploading ${assetType}: ${filename}...`);
    const asset = await client.assets.upload(assetType, stream, { filename });
    assetCache.set(cacheKey, asset);
    return asset;
  } catch (err: any) {
    failedAssets++;
    console.warn(`  ⚠️  Failed to upload asset ${cleanPath}: ${err.message}`);
    return null;
  }
}

function stringToPortableText(text: import('../src/types').Project['overview'] | undefined): any[] {
  if (Array.isArray(text)) return text;
  if (!text) return [];
  const paragraphs = text
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return paragraphs.map((para, i) => ({
    _key: `block_${i}`,
    _type: 'block',
    style: 'normal',
    markDefs: [],
    children: [
      {
        _key: `span_${i}`,
        _type: 'span',
        marks: [],
        text: para,
      },
    ],
  }));
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function seed() {
  console.log(`\n🚀 Starting Sanity Seed into Project: "${projectId}", Dataset: "${dataset}"...\n`);

  let createdCount = 0;
  let updatedCount = 0;
  let skippedCount = 0;

  async function saveDoc(doc: any) {
    if (documentIds.has(doc._id)) throw new Error(`Duplicate document ID: ${doc._id}`);
    documentIds.add(doc._id);
    if (typeof doc.order === 'number') doc.orderRank = `0|${(100000 + doc.order * 1000).toString(36).padStart(6, '0')}:`;
    if (dryRun) { createdCount++; return; }
    try {
      const existing = await client.getDocument(doc._id);
      await client.createOrReplace(doc);
      if (existing) {
        updatedCount++;
        console.log(`  ✓ Updated document [${doc._type}]: ${doc._id}`);
      } else {
        createdCount++;
        console.log(`  + Created document [${doc._type}]: ${doc._id}`);
      }
    } catch (err: any) {
      console.error(`  ❌ Failed to save [${doc._type}] ${doc._id}: ${err.message}`);
      skippedCount++;
    }
  }

  // 1. Profile (singleton: 'profile')
  console.log('📌 Seeding Profile...');
  const profileDoc = {
    _id: 'profile',
    _type: 'profile',
    name: profile.name,
    greeting: profile.greeting,
    title: profile.title,
    intro: profile.intro,
    location: profile.location,
    email: profile.email,
    currentTechnologies: profile.currentTechnologies,
    socials: profile.socials.map((s, idx) => ({
      _key: `social_${idx}`,
      _type: 'socialLink',
      label: s.label,
      url: s.url,
      icon: s.icon,
    })),
    education: profile.education.map((e, idx) => ({
      _key: `edu_${idx}`,
      _type: 'educationItem',
      school: e.school,
      degree: e.degree,
      period: e.period,
      score: e.score,
    })),
    sectionLabels: {
      software: profile.sectionLabels.software,
      hardware: profile.sectionLabels.hardware,
    },
  };
  await saveDoc(profileDoc);

  // 2. Site Settings (singleton: 'siteSettings')
  console.log('📌 Seeding Site Settings...');
  const siteSettingsDoc = {
    _id: 'siteSettings',
    _type: 'siteSettings',
    title: fs.readFileSync('index.html', 'utf8').match(/<title>(.*?)<\/title>/)?.[1] || profile.title,
    description: fs.readFileSync('index.html', 'utf8').match(/name="description" content="([^"]*)"/)?.[1] || profile.intro,
    navLabels: {
      home: 'Home',
      about: 'About',
      experience: 'Experience',
      software: 'Software',
      hardware: 'Hardware',
      achievements: 'Achievements',
      resume: 'Resume',
      contact: 'Contact',
    },
  };
  // Publish readiness only after the complete migration succeeds.

  // 3. Resume (singleton: 'resume')
  console.log('📌 Seeding Resume PDF...');
  const resumeAsset = await uploadLocalAsset('/resume.pdf', 'file');
  const resumeDoc: any = {
    _id: 'resume',
    _type: 'resume',
    title: 'SHIKHA_RESUME.pdf',
  };
  if (resumeAsset) {
    resumeDoc.resumeFile = {
      _type: 'file',
      asset: {
        _type: 'reference',
        _ref: resumeAsset._id,
      },
    };
  }
  if (resumeAsset) await saveDoc(resumeDoc); else skippedCount++;

  // 4. Experience (list)
  console.log('📌 Seeding Experience entries...');
  for (let i = 0; i < experience.length; i++) {
    const exp = experience[i];
    const expDoc = {
      _id: `experience-${exp.id}`,
      _type: 'experience',
      role: exp.role,
      company: exp.company,
      startDate: exp.startDate,
      endDate: exp.endDate,
      bullets: exp.bullets,
      techStack: exp.techStack || [],
      order: i,
    };
    await saveDoc(expDoc);
  }

  // 5. Skills (list)
  console.log('📌 Seeding Skills entries...');
  for (let i = 0; i < skills.length; i++) {
    const sk = skills[i];
    const skDoc = {
      _id: `skill-${sk.category}-${slugify(sk.name)}-${createHash('sha256').update(sk.name).digest('hex').slice(0,8)}`,
      _type: 'skill',
      name: sk.name,
      category: sk.category,
      proficiency: sk.proficiency,
      order: i,
    };
    await saveDoc(skDoc);
  }

  // 6. Achievements (list)
  console.log('📌 Seeding Achievements entries...');
  for (let i = 0; i < achievements.length; i++) {
    const ach = achievements[i];
    const achDoc = {
      _id: `achievement-${ach.id}`,
      _type: 'achievement',
      title: ach.title,
      issuer: ach.issuer,
      date: ach.date,
      type: ach.type,
      description: ach.description || '',
      credentialUrl: ach.credentialUrl,
      order: i,
    };
    await saveDoc(achDoc);
  }

  // 7. Projects (list)
  console.log('📌 Seeding Projects entries & assets...');
  for (let i = 0; i < projects.length; i++) {
    const proj = projects[i];
    console.log(`  -> Processing project "${proj.title}"...`);

    // Upload Cover Image
    const coverAsset = await uploadLocalAsset(proj.coverImage, 'image');
    // Upload Architecture Diagram
    const archAsset = await uploadLocalAsset(proj.architecture, 'image');

    // Upload Gallery Images
    const galleryItems = [];
    if (proj.gallery && proj.gallery.length > 0) {
      for (let gIdx = 0; gIdx < proj.gallery.length; gIdx++) {
        const gImgPath = proj.gallery[gIdx];
        const gAsset = await uploadLocalAsset(gImgPath, 'image');
        if (gAsset) {
          galleryItems.push({
            _key: `gallery_${gIdx}`,
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: gAsset._id,
            },
            alt: `${proj.title} gallery image ${gIdx + 1}`,
          });
        }
      }
    }

    // Upload Documents
    const documentItems = [];
    if (proj.documents && proj.documents.length > 0) {
      for (let dIdx = 0; dIdx < proj.documents.length; dIdx++) {
        const docItem = proj.documents[dIdx];
        const isLocalFile = docItem.url.startsWith('/') && !docItem.url.startsWith('//');
        let uploadedDocAsset = null;

        if (isLocalFile) {
          const docType = 'file';
          uploadedDocAsset = await uploadLocalAsset(docItem.url, docType);
        }

        const docEntry: any = {
          _key: `doc_${dIdx}`,
          _type: 'projectDocument',
          label: docItem.label,
          type: docItem.type,
          url: docItem.url,
        };

        if (uploadedDocAsset) {
          docEntry.file = {
            _type: 'file',
            asset: {
              _type: 'reference',
              _ref: uploadedDocAsset._id,
            },
          };
        }

        documentItems.push(docEntry);
      }
    }

    const projectDoc: any = {
      _id: `project-${proj.slug}`,
      _type: 'project',
      title: proj.title,
      slug: {
        _type: 'slug',
        current: proj.slug,
      },
      shortDescription: proj.shortDescription,
      domain: proj.domain,
      category: proj.category,
      techStack: proj.techStack,
      role: proj.role,
      timeline: proj.timeline,
      featured: proj.featured,
      status: proj.status,
      awards: proj.awards || [],
      team: proj.team || '',
      overview: stringToPortableText(proj.overview),
      implementation: stringToPortableText(proj.implementation),
      hardwareDetails: proj.hardwareDetails
        ? {
            mcu: proj.hardwareDetails.mcu || '',
            sensors: proj.hardwareDetails.sensors || [],
            communication: proj.hardwareDetails.communication || [],
            pcbSpecs: proj.hardwareDetails.pcbSpecs || '',
          }
        : undefined,
      results: proj.results || [],
      challenges: proj.challenges || [],
      documents: documentItems,
      githubUrl: proj.githubUrl,
      demoUrl: proj.demoUrl,
      videoUrl: proj.videoUrl,
      order: i,
    };

    if (coverAsset) {
      projectDoc.coverImage = {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: coverAsset._id,
        },
        alt: `${proj.title} cover preview`,
      };
    }

    if (archAsset) {
      projectDoc.architecture = {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: archAsset._id,
        },
        alt: `${proj.title} architecture diagram`,
      };
    }

    if (galleryItems.length > 0) {
      projectDoc.gallery = galleryItems;
    }

    await saveDoc(projectDoc);
  }

  if (!skippedCount && !failedAssets) await saveDoc({ ...siteSettingsDoc, contentReady: true });
  else console.warn('Migration incomplete: contentReady was not enabled. Fix failures and rerun.');
  if (skippedCount || failedAssets) process.exitCode = 1;
  console.log(`Assets missing (skipped): ${missingAssets}; upload failures: ${failedAssets}`);
  console.log(`Mode: ${dryRun ? 'DRY RUN — no uploads or writes' : 'LIVE — createOrReplace overwrites existing seeded documents'}`);
  console.log(`
========================================================================
🎉 Sanity Seed Completed!
------------------------------------------------------------------------
  - Documents Created : ${createdCount}
  - Documents Updated : ${updatedCount}
  - Skipped / Errors  : ${skippedCount}
========================================================================
`);
}

seed().catch((err) => {
  console.error('\n❌ Uncaught error during Sanity migration:', err);
  process.exit(1);
});
