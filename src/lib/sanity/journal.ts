import type { PortableTextBlock } from '@portabletext/types';
import { safeUrl } from './mappers';
export interface JournalEntry {
  id: string; title: string; slug: string; topic: string; date: string; excerpt: string; searchText: string;
  seoTitle: string; metaDescription: string;
  notes: PortableTextBlock[]; attachments: {label:string; url:string}[];
}
// Explicit exclusions are defense in depth; the client also uses published perspective with no token.
const publicFilter = `_type == "journalEntry" && !(_id in path("drafts.**")) && !(_id in path("versions.**")) && defined(slug.current)`;
const summary = `_id, title, "slug": slug.current, topic, date, seoTitle, metaDescription, "excerpt": pt::text(notes)`;
export const JOURNAL_QUERY = `*[${publicFilter}] | order(date desc, _createdAt desc) {${summary}}`;
export const JOURNAL_ENTRY_QUERY = `*[${publicFilter} && slug.current == $slug][0] {${summary}, notes, attachments[]{label, "url": asset->url}}`;
const str = (v: unknown) => typeof v === 'string' ? v.trim() : '';
export function mapJournalEntry(raw: any): JournalEntry {
  return { id:str(raw?._id), title:str(raw?.title) || 'Untitled entry', slug:str(raw?.slug), topic:str(raw?.topic),
    date: validDate(str(raw?.date)) ? str(raw.date) : '', excerpt:str(raw?.excerpt).slice(0,240), searchText:str(raw?.excerpt),
    seoTitle: str(raw?.seoTitle), metaDescription: str(raw?.metaDescription),
    notes:Array.isArray(raw?.notes) ? raw.notes : [],
    attachments: Array.isArray(raw?.attachments) ? raw.attachments.filter(Boolean).map((f:any)=>({label:str(f.label)||'Attachment', url:safeUrl(f.url)})).filter((f:{url:string})=>/^https?:\/\//.test(f.url)) : [],
  };
}
export function mapJournalList(raw: unknown): JournalEntry[] {
  return Array.isArray(raw) ? raw.filter(r=> r && !/^(drafts|versions)\./.test(str(r._id))).map(mapJournalEntry).filter(r=>/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(r.slug)) : [];
}
export function filterJournal(entries: JournalEntry[], topic: string, search: string) {
  const term=search.trim().toLocaleLowerCase();
  return entries.filter(e=>(!topic || e.topic===topic) && `${e.title} ${e.topic} ${e.searchText}`.toLocaleLowerCase().includes(term));
}
function validDate(date: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;
  const d=new Date(`${date}T12:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0,10)===date;
}
export function journalDate(date: string) {
  if (!validDate(date)) return '';
  const d=new Date(`${date}T12:00:00Z`);
  return Number.isNaN(d.getTime()) ? '' : new Intl.DateTimeFormat('en-GB', {day:'numeric',month:'short',year:'numeric',timeZone:'UTC'}).format(d);
}
