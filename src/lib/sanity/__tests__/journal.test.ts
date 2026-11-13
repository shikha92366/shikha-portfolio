import {describe,it,expect} from 'vitest';
import {mapJournalEntry,mapJournalList,filterJournal,journalDate,JOURNAL_QUERY,JOURNAL_ENTRY_QUERY} from '../journal';
describe('Learning journal content safety and navigation',()=>{
 it('never invents learning entries when empty or malformed',()=>{expect(mapJournalList(null)).toEqual([]);expect(mapJournalList({})).toEqual([]);expect(mapJournalList([])).toEqual([]);});
 it('excludes drafts, versions and unusable slugs',()=>{
  expect(mapJournalList([{_id:'drafts.a',slug:'hidden'},{_id:'versions.r.a',slug:'hidden'},{_id:'a',slug:'good-note'},{_id:'b',slug:'../../admin'},null]).map(e=>e.slug)).toEqual(['good-note']);
 });
 it('keeps user-authored rich text intact',()=>{const notes=[{_type:'codeSnippet',_key:'k',code:'<script>alert(1)</script>'}];expect(mapJournalEntry({notes}).notes).toEqual(notes);});
 it('maps SEO title and description without changing article content',()=>{const entry=mapJournalEntry({seoTitle:'Timer notes',metaDescription:'Interrupt and timer basics.',notes:[{_type:'block',_key:'x'}]});expect(entry.seoTitle).toBe('Timer notes');expect(entry.metaDescription).toBe('Interrupt and timer basics.');expect(entry.notes).toHaveLength(1);});
 it('drops unsafe or missing attachment URLs',()=>{expect(mapJournalEntry({attachments:[null,{label:'bad',url:'javascript:alert(1)'},{url:'data:text/html,bad'},{url:'//bad.test'},{label:' PDF ',url:'https://cdn.sanity.io/files/p/d/a.pdf'}]}).attachments).toEqual([{label:'PDF',url:'https://cdn.sanity.io/files/p/d/a.pdf'}]);});
 it('combines topic filtering with case-insensitive title and summary search',()=>{const entries=mapJournalList([{slug:'a',topic:'Embedded',title:'Timers',excerpt:'Interrupt basics'},{slug:'b',topic:'Web',title:'Timers'}]);expect(filterJournal(entries,'Embedded',' INTERRUPT ')).toHaveLength(1);expect(filterJournal(entries,'Web','interrupt')).toHaveLength(0);expect(filterJournal(entries,'','timers')).toHaveLength(2);});
 it('formats date-only values without local timezone shifts and rejects impossible dates',()=>{expect(journalDate('2026-11-11')).toBe('11 Nov 2026');expect(journalDate('2026-02-30')).toBe('');expect(mapJournalEntry({date:'not-a-date'}).date).toBe('');});
 it('searches the full note beyond its card excerpt',()=>{const entry=mapJournalEntry({slug:'long-note',excerpt:'a'.repeat(300)+' resistor'});expect(entry.excerpt.length).toBe(240);expect(filterJournal([entry],'','resistor')).toHaveLength(1);});
 it('uses explicit public filters and a parameterized detail lookup',()=>{for(const q of [JOURNAL_QUERY,JOURNAL_ENTRY_QUERY]){expect(q).toContain('path("drafts.**")');expect(q).toContain('path("versions.**")');expect(q).toContain('seoTitle');expect(q).toContain('metaDescription');}expect(JOURNAL_ENTRY_QUERY).toContain('slug.current == $slug');});
});
