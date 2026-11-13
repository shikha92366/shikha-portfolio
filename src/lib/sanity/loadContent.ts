export interface ContentResult<T> { value: T; source: 'cms' | 'local'; error?: string }
export async function loadContent<T>(
  configured: boolean, fetcher: () => Promise<{ content: unknown; ready: boolean }>,
  mapper: (raw: any) => T, fallback: T,
): Promise<ContentResult<T>> {
  if (!configured) return { value: fallback, source: 'local' };
  try {
    const { content, ready } = await fetcher();
    const empty = content == null || (Array.isArray(content) && content.length === 0);
    if (empty && !ready) return { value: fallback, source: 'local' };
    return { value: mapper(content), source: 'cms' };
  } catch {
    return { value: fallback, source: 'local', error: 'Live content is temporarily unavailable. Showing saved content.' };
  }
}
