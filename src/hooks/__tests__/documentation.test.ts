import { describe, expect, it } from 'vitest';
import { mapPublicDocument } from '../useSanityData';
import { PUBLIC_DOCUMENTATION_ARTICLE_QUERY, PUBLIC_DOCUMENTATION_QUERY } from '../../lib/sanity/queries';

describe('Documentation articles', () => {
  it('maps long-form Portable Text and metadata without rewriting content', () => {
    const body = [{ _key: 'table', _type: 'contentTable', rows: [{ cells: ['Parameter', 'Value'] }] }];
    const article = mapPublicDocument({ _id: 'article', title: 'Board bring-up', slug: 'board-bring-up', body, seoTitle: 'Bring-up notes', metaDescription: 'A practical guide.' });
    expect(article.body).toEqual(body);
    expect(article.slug).toBe('board-bring-up');
    expect(article.seoTitle).toBe('Bring-up notes');
    expect(article.metaDescription).toBe('A practical guide.');
  });

  it('drops unsafe file URLs and keeps labeled PDF attachments', () => {
    const article = mapPublicDocument({
      attachments: [
        { label: 'Schematic', url: 'https://cdn.sanity.io/files/p/d/schematic.pdf', filename: 'schematic.pdf' },
        { label: 'Unsafe', url: 'javascript:alert(1)' },
      ],
      file: { url: 'https://example.com/file.pdf' },
    });
    expect(article.attachments).toEqual([{ label: 'Schematic', caption: '', url: 'https://cdn.sanity.io/files/p/d/schematic.pdf', filename: 'schematic.pdf' }]);
    expect(article.url).toBe('');
  });

  it('queries published articles and file records while excluding draft and version IDs', () => {
    expect(PUBLIC_DOCUMENTATION_QUERY).toContain('(defined(file.asset) || defined(body))');
    for (const query of [PUBLIC_DOCUMENTATION_QUERY, PUBLIC_DOCUMENTATION_ARTICLE_QUERY]) {
      expect(query).toContain('path("drafts.**")');
      expect(query).toContain('path("versions.**")');
      expect(query).toContain('seoTitle');
      expect(query).toContain('metaDescription');
    }
  });
});
