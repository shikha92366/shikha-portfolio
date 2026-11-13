import { describe, it, expect, vi } from 'vitest';
import { QueryClient, QueryObserver } from '@tanstack/react-query';
import { loadContent } from '../../lib/sanity/loadContent';
import { contentQueryOptions } from '../useSanityData';
const local = ['local'];
const mapper = (value: unknown) => value as string[];
describe('Content fallback and publishing semantics', () => {
  it('does not request an unconfigured CMS', async () => {
    const fetcher = vi.fn();
    expect((await loadContent(false, fetcher, mapper, local)).value).toEqual(local);
    expect(fetcher).not.toHaveBeenCalled();
  });
  it('returns live content immediately', async () => {
    expect(await loadContent(true, async () => ({ content: ['live'], ready: true }), mapper, local)).toEqual({ value: ['live'], source: 'cms' });
  });
  it('falls back for failed requests and exposes an error state', async () => {
    const result = await loadContent(true, async () => { throw new Error('offline'); }, mapper, local);
    expect(result.value).toEqual(local); expect(result.error).toBeTruthy();
  });
  it('falls back when a new, unseeded dataset returns no content', async () => {
    expect((await loadContent(true, async () => ({ content: [], ready: false }), mapper, local)).value).toEqual(local);
  });
  it('preserves deliberate empty lists after seeding', async () => {
    expect((await loadContent(true, async () => ({ content: [], ready: true }), mapper, local)).value).toEqual([]);
  });
  it('does not resurrect an unpublished project at its old slug', async () => {
    expect((await loadContent(true, async () => ({ content: null, ready: true }), value => value, 'old-project')).value).toBeNull();
  });
  it('falls back if a malformed document makes the mapper throw', async () => {
    expect((await loadContent(true, async () => ({ content: {}, ready: true }), () => { throw new Error('malformed'); }, local)).error).toBeTruthy();
  });
  it('placeholder local data does not suppress the first network request', async () => {
    const client = new QueryClient();
    const fetcher = vi.fn(async () => ({ value: ['live'], source: 'cms' as const }));
    const observer = new QueryObserver(client, { queryKey: ['test'], queryFn: fetcher, placeholderData: { value: local, source: 'local' as const }, ...contentQueryOptions });
    const unsubscribe = observer.subscribe(() => {});
    await vi.waitFor(() => expect(observer.getCurrentResult().data?.value).toEqual(['live']));
    expect(fetcher).toHaveBeenCalledTimes(1);
    unsubscribe(); client.clear();
  });
});
