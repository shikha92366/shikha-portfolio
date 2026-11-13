import { PortableText, PortableTextComponents } from '@portabletext/react';
import { urlFor } from './client';
import {
  Profile,
  Experience,
  Project,
  Skill,
  Achievement,
  ProjectDocument,
} from '../../types';

/**
 * Safely resolves an image asset into an optimized CDN URL.
 * Handles Sanity image objects, asset references, and string URLs.
 */
export function safeUrl(value: unknown): string {
  return typeof value === 'string' && /^(https?:\/\/|mailto:|\/(?!\/))/.test(value.trim()) ? value.trim() : '';
}
export function resolveImageUrl(source: any, width?: number): string {
  if (!source) return '';
  if (typeof source === 'string') return safeUrl(source);

  try {
    if (source.asset || source._type === 'image') {
      let builder = urlFor(source).auto('format');
      if (width) {
        builder = builder.width(width);
      }
      return builder.url();
    }
  } catch (err) {
    console.warn('[Sanity Mapper] Error resolving image URL:', err);
  }
  return '';
}

/**
 * Custom styling components for Portable Text rendering to match
 * the gazijarin dark navy (#080c12) and mint green (#83b4ff) aesthetics.
 */
export const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="leading-relaxed mb-4 text-[#9ba7b8]">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="text-xl sm:text-2xl font-bold text-[#eef3fb] mt-6 mb-3 flex items-center gap-2">
        <span className="text-[#83b4ff] font-mono">/</span>
        <span>{children}</span>
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-lg font-semibold text-[#eef3fb] mt-5 mb-2">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-base font-semibold text-[#eef3fb] mt-4 mb-2">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-[#83b4ff] pl-4 italic my-4 text-[#eef3fb]/90 bg-[#101722]/40 py-2 rounded-r">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="space-y-1.5 mb-4 pl-4 list-disc text-[#9ba7b8] marker:text-[#83b4ff]">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="space-y-1.5 mb-4 pl-4 list-decimal text-[#9ba7b8] marker:text-[#83b4ff]">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-[#eef3fb]">{children}</strong>
    ),
    em: ({ children }) => <em className="italic text-[#eef3fb]/90">{children}</em>,
    underline: ({ children }) => <span className="underline underline-offset-4">{children}</span>,
    'strike-through': ({ children }) => <del>{children}</del>,
    code: ({ children }) => (
      <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-[#101722] text-[#83b4ff] border border-[#263141]">
        {children}
      </code>
    ),
    link: ({ value, children }) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
      return (
        <a
          href={safeUrl(value?.href) || undefined}
          target={target}
          rel={target ? 'noreferrer noopener' : undefined}
          className="text-[#83b4ff] hover:underline underline-offset-4 transition-colors"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      const imgUrl = resolveImageUrl(value, 900);
      if (!imgUrl) return null;
      return (
        <div className="my-6 rounded-xl overflow-hidden border border-[#263141] bg-[#101722] p-3 shadow-lg">
          <img
            src={imgUrl}
            alt={value?.alt || 'Engineering diagram or illustration'}
            className="w-full h-auto rounded max-h-[500px] object-contain mx-auto"
            loading="lazy"
            style={{ aspectRatio: "16 / 9" }}
          />
          {value?.caption && (
            <p className="text-xs font-mono text-center text-[#9ba7b8] mt-3">
              {value.caption}
            </p>
          )}
        </div>
      );
    },
  },
};

/**
 * Universal content renderer that safely supports both rich Portable Text arrays
 * and legacy markdown strings without dangerouslySetInnerHTML.
 */
export function RichContentRenderer({ content }: { content: string | any[] | undefined }) {
  if (!content) return null;

  if (Array.isArray(content)) {
    return <PortableText value={content} components={portableTextComponents} />;
  }

  // Plain string content fallback (formatted paragraphs)
  const paragraphs = String(content).split(/\n\n+/).filter(Boolean);
  return (
    <div className="space-y-4 text-base text-[#9ba7b8] leading-relaxed">
      {paragraphs.map((p, idx) => (
        <p key={idx}>{p}</p>
      ))}
    </div>
  );
}

export function mapSanityProject(raw: any): Project {
  raw = raw || {};
  const documents: ProjectDocument[] = Array.isArray(raw.documents)
    ? raw.documents.filter(Boolean).map((doc: any) => ({
        label: doc.label || 'Document',
        type: (doc.type as ProjectDocument['type']) || 'link',
        url: safeUrl(doc.fileUrl) || safeUrl(doc.url),
      }))
    : [];

  const gallery: string[] = Array.isArray(raw.gallery)
    ? raw.gallery
        .map((item: any) => resolveImageUrl(item, 1200))
        .filter((url: string) => Boolean(url))
    : [];

  const coverImage = resolveImageUrl(raw.coverImage, 1200) || '';
  const architecture = raw.architecture ? resolveImageUrl(raw.architecture, 1200) : undefined;

  const slug =
    typeof raw.slug === 'string'
      ? raw.slug
      : typeof raw.slug === 'object' && raw.slug?.current
      ? raw.slug.current
      : '';

  return {
    slug,
    title: raw.title || 'Untitled Project',
    shortDescription: raw.shortDescription || '',
    domain: raw.domain === 'hardware' ? 'hardware' : 'software',
    category: ['embedded', 'iot', 'ai-ml', 'pcb-design', 'software'].includes(raw.category) ? raw.category : 'embedded',
    techStack: Array.isArray(raw.techStack) ? raw.techStack : [],
    role: raw.role || 'Engineer',
    timeline: raw.timeline || '',
    featured: Boolean(raw.featured),
    status: raw.status === 'in-progress' ? 'in-progress' : 'completed',
    awards: Array.isArray(raw.awards) ? raw.awards : [],
    team: raw.team || undefined,
    coverImage,
    coverImageAlt: raw.coverImage?.alt,
    architectureAlt: raw.architecture?.alt,
    galleryMetadata: (raw.gallery || []).filter(Boolean).map((item: any) => ({ url: resolveImageUrl(item, 1200), alt: item.alt || raw.title || '', caption: item.caption })),
    overview: raw.overview || '',
    architecture,
    hardwareDetails: raw.hardwareDetails
      ? {
          mcu: raw.hardwareDetails.mcu,
          sensors: Array.isArray(raw.hardwareDetails.sensors) ? raw.hardwareDetails.sensors : [],
          communication: Array.isArray(raw.hardwareDetails.communication)
            ? raw.hardwareDetails.communication
            : [],
          pcbSpecs: raw.hardwareDetails.pcbSpecs,
        }
      : undefined,
    implementation: raw.implementation || '',
    results: Array.isArray(raw.results) ? raw.results : [],
    challenges: Array.isArray(raw.challenges) ? raw.challenges : [],
    gallery,
    documents,
    githubUrl: safeUrl(raw.githubUrl) || undefined,
    demoUrl: safeUrl(raw.demoUrl) || undefined,
    videoUrl: safeUrl(raw.videoUrl) || undefined,
  };
}

export function mapSanityExperience(raw: any): Experience {
  raw = raw || {};
  return {
    id: raw._id || raw.id || [raw.title, raw.company, raw.role, raw.date].filter(Boolean).join('-'),
    role: raw.role || 'Engineer',
    company: raw.company || 'Organization',
    startDate: raw.startDate || '',
    endDate: raw.endDate || 'Present',
    bullets: Array.isArray(raw.bullets) ? raw.bullets : [],
    techStack: Array.isArray(raw.techStack) ? raw.techStack : undefined,
  };
}

export function mapSanitySkill(raw: any): Skill {
  raw = raw || {};
  return {
    name: raw.name || '',
    category: ['embedded', 'iot', 'ai-ml', 'pcb-design', 'software', 'tools'].includes(raw.category) ? raw.category : 'tools',
    proficiency: ['familiar', 'proficient', 'expert'].includes(raw.proficiency) ? raw.proficiency : undefined,
  };
}

export function mapSanityAchievement(raw: any): Achievement {
  raw = raw || {};
  return {
    id: raw._id || raw.id || [raw.title, raw.company, raw.role, raw.date].filter(Boolean).join('-'),
    title: raw.title || 'Achievement',
    issuer: raw.issuer || '',
    date: raw.date || '',
    type: ['certification', 'award', 'publication', 'competition'].includes(raw.type) ? raw.type : 'award',
    description: raw.description || undefined,
    credentialUrl: safeUrl(raw.credentialUrl) || undefined,
  };
}

export function mapSanityProfile(raw: any): Profile {
  raw = raw || {};
  return {
    photo: resolveImageUrl(raw.photo, 640) || undefined,
    photoAlt: raw.photo?.alt,
    name: raw.name || '',
    greeting: raw.greeting || 'hi, here.',
    title: raw.title || '',
    intro: raw.intro || '',
    location: raw.location || '',
    email: raw.email || '',
    currentTechnologies: Array.isArray(raw.currentTechnologies) ? raw.currentTechnologies : [],
    socials: Array.isArray(raw.socials)
      ? raw.socials.map((s: any) => ({
          label: s.label || '',
          url: safeUrl(s.url),
          icon: s.icon || 'globe',
        }))
      : [],
    education: Array.isArray(raw.education)
      ? raw.education.map((e: any) => ({
          school: e.school || '',
          degree: e.degree || '',
          period: e.period || '',
          score: e.score || '',
        }))
      : [],
    sectionLabels: {
      software: raw.sectionLabels?.software || 'embedded & ai',
      hardware: raw.sectionLabels?.hardware || 'avionics & pcb',
    },
  };
}
