import type { Project, Experience, Skill, Achievement } from '../types';
import { useQuery } from '@tanstack/react-query';
import { sanityClient, isSanityConfigured } from '../lib/sanity/client';
import * as q from '../lib/sanity/queries';
import * as m from '../lib/sanity/mappers';
import { loadContent, type ContentResult } from '../lib/sanity/loadContent';
import { projects } from '../data/projects';
import { experience } from '../data/experience';
import { skills } from '../data/skills';
import { achievements } from '../data/achievements';
import { profile } from '../data/profile';

export const contentQueryOptions = {
  staleTime: 120_000, refetchInterval: 120_000, refetchOnWindowFocus: true, retry: false,
};
const hiddenPublicProjectSlugs = new Set(['lora-telemetry-node', 'stm32-smart-power-monitor']);
export function filterPublicProjects(projectList: Project[]) {
  return projectList.filter(project => !hiddenPublicProjectSlugs.has(project.slug));
}
const workshopExperience = experience.find(item => item.id === 'trainer');
export function mapExperienceRecords(raw: any[]) {
  return raw.map(record => {
    const mapped = m.mapSanityExperience(record);
    return mapped.id === 'experience-trainer' && workshopExperience
      ? { ...workshopExperience, id: mapped.id }
      : mapped;
  });
}
export function mapPublicAchievements(raw: any[]) {
  return raw
    .map(m.mapSanityAchievement)
    .filter(achievement => achievement.id !== 'iot-trainer' && achievement.id !== 'achievement-iot-trainer');
}
function useContent<T>(key: string, query: string, mapper: (raw: any) => T, fallback: T, params: Record<string, string> = {}) {
  const result = useQuery({
    queryKey: ['content', key, params],
    queryFn: () => loadContent(isSanityConfigured, () => sanityClient.fetch(
      `{"content": ${query}, "ready": coalesce(*[_id == "siteSettings"][0].contentReady, false)}`,
      params, { timeout: 8000 },
    ), mapper, fallback),
    placeholderData: { value: fallback, source: 'local' } as ContentResult<T>,
    ...contentQueryOptions,
  });
  return {
    ...result, data: result.data ? result.data.value : fallback,
    isLoading: isSanityConfigured && result.isPlaceholderData,
    isFallback: result.data?.source === 'local',
    contentError: result.data?.error,
  };
}
export function useProjects() { return useContent<Project[]>('projects', q.ALL_PROJECTS_QUERY, raw => filterPublicProjects((raw || []).map(m.mapSanityProject)), filterPublicProjects(projects)); }
export function useProject(slug: string | undefined) {
  return useContent('project', q.PROJECT_BY_SLUG_QUERY, raw => raw ? m.mapSanityProject(raw) : null,
    projects.find(p => p.slug === slug) ?? null, { slug: slug ?? '' });
}
export function useExperience() { return useContent<Experience[]>('experience', q.ALL_EXPERIENCE_QUERY, mapExperienceRecords, experience); }
export function useSkills() { return useContent<Skill[]>('skills', q.ALL_SKILLS_QUERY, raw => (raw || []).map(m.mapSanitySkill), skills); }
export function useAchievements() { return useContent<Achievement[]>('achievements', q.ALL_ACHIEVEMENTS_QUERY, mapPublicAchievements, achievements.filter(achievement => achievement.id !== 'iot-trainer')); }
export interface PublicDocument {
  id: string;
  title: string;
  slug: string;
  description: string;
  excerpt: string;
  hasArticle: boolean;
  seoTitle: string;
  metaDescription: string;
  body: any[];
  category: string;
  tags: string[];
  project?: { title: string; slug: string };
  url: string;
  filename: string;
  mimeType: string;
  attachments: { label: string; caption: string; url: string; filename: string }[];
}
export function mapPublicDocument(document: any): PublicDocument {
  const fileUrl = m.safeUrl(document?.file?.url);
  const excerpt = typeof document?.excerpt === 'string' ? document.excerpt.trim() : '';
  const attachments = Array.isArray(document?.attachments) ? document.attachments.flatMap((file: any) => {
    const url = m.safeUrl(file?.url);
    return /^https:\/\/cdn\.sanity\.io\/files\//.test(url)
      ? [{ label: typeof file.label === 'string' ? file.label : 'Download attachment', caption: typeof file.caption === 'string' ? file.caption : '', url, filename: typeof file.filename === 'string' ? file.filename : '' }]
      : [];
  }) : [];
  return {
    id: document?._id || fileUrl || document?.slug || document?.title || 'document',
    title: document?.title || 'Technical document',
    slug: typeof document?.slug === 'string' ? document.slug : '',
    description: document?.description || excerpt.slice(0, 320),
    excerpt,
    hasArticle: Boolean(document?.hasArticle || document?.body?.length),
    seoTitle: document?.seoTitle || '',
    metaDescription: document?.metaDescription || '',
    body: Array.isArray(document?.body) ? document.body : [],
    category: document?.category || 'Technical documentation',
    tags: Array.isArray(document?.tags) ? document.tags.filter((tag: unknown): tag is string => typeof tag === 'string') : [],
    project: document?.project?.slug ? document.project : undefined,
    url: /^https:\/\/cdn\.sanity\.io\/files\//.test(fileUrl) ? fileUrl : '',
    filename: document?.file?.originalFilename || document?.title || 'document',
    mimeType: document?.file?.mimeType || 'application/octet-stream',
    attachments,
  };
}
export function useDocumentation() {
  const publicClient = sanityClient.withConfig({ useCdn: false, perspective: 'published' });
  return useQuery({
    queryKey: ['documentation'],
    queryFn: async (): Promise<PublicDocument[]> => {
      if (!isSanityConfigured) return [];
      const documents = await publicClient.fetch(q.PUBLIC_DOCUMENTATION_QUERY, {}, { timeout: 8000 });
      if (!Array.isArray(documents)) return [];
      return documents.map(mapPublicDocument).filter(document => document.url || document.hasArticle);
    },
    ...contentQueryOptions,
  });
}
export function useDocumentationArticle(slug: string) {
  const publicClient = sanityClient.withConfig({ useCdn: false, perspective: 'published' });
  return useQuery({
    queryKey: ['documentation', slug],
    queryFn: async (): Promise<PublicDocument | null> => {
      if (!isSanityConfigured || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return null;
      const document = await publicClient.fetch(q.PUBLIC_DOCUMENTATION_ARTICLE_QUERY, { slug }, { timeout: 8000 });
      return document ? mapPublicDocument(document) : null;
    },
    ...contentQueryOptions,
  });
}
export function useProfile() { return useContent('profile', q.PROFILE_QUERY, raw => raw ? m.mapSanityProfile(raw) : profile, profile); }
export interface ResumeData { url: string; title: string; lastUpdated?: string }
const defaultResume: ResumeData = { url: '/resume.pdf', title: 'SHIKHA_RESUME.pdf' };
export function useResume() {
  return useContent('resume', q.RESUME_QUERY, raw => raw?.fileUrl ? {
    url: m.safeUrl(raw.fileUrl) || defaultResume.url, title: raw.title || defaultResume.title, lastUpdated: raw.lastUpdated,
  } : defaultResume, defaultResume);
}
export interface SiteSettings { title?: string; description?: string; ogImage?: string; navLabels: Record<string, string> }
export function useSiteSettings() {
  return useContent<SiteSettings>('settings', q.SITE_SETTINGS_QUERY, raw => ({
    title: raw?.title, description: raw?.description, ogImage: m.resolveImageUrl(raw?.ogImage, 1200), navLabels: raw?.navLabels || {},
  }), { navLabels: {} });
}
