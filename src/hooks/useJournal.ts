import { useQuery } from '@tanstack/react-query';
import { sanityClient, isSanityConfigured } from '../lib/sanity/client';
import { JOURNAL_QUERY, JOURNAL_ENTRY_QUERY, mapJournalEntry, mapJournalList } from '../lib/sanity/journal';
const journalClient = sanityClient.withConfig({useCdn:false, perspective:'published'});
const options = { staleTime: 30_000, refetchInterval: 60_000, refetchOnWindowFocus:true, retry:1 };
export function useJournal() {
  return useQuery({queryKey:['journal'], queryFn:async()=> isSanityConfigured ? mapJournalList(await journalClient.fetch(JOURNAL_QUERY, {}, {timeout:8000})) : [], ...options});
}
export function useJournalEntry(slug: string) {
  return useQuery({queryKey:['journal',slug], queryFn:async()=>{
    if (!isSanityConfigured || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return null;
    const raw=await journalClient.fetch(JOURNAL_ENTRY_QUERY,{slug},{timeout:8000});
    return raw ? mapJournalEntry(raw) : null;
  }, ...options});
}
