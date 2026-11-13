import { defineType, defineField, defineArrayMember } from 'sanity';
import { portableText } from './objects/portableText';

export const journalBody = defineType({
  name: 'journalBody', title: 'Notes', type: 'array',
  of: [...(portableText.of || []), defineArrayMember({
    name: 'codeSnippet', title: 'Code snippet', type: 'object',
    fields: [
      defineField({ name: 'language', title: 'Language (optional)', type: 'string' }),
      defineField({ name: 'code', title: 'Code', type: 'text', rows: 12, validation: r => r.required() }),
    ],
    preview: { select: { title: 'language', subtitle: 'code' }, prepare: ({title, subtitle}) => ({title: title || 'Code snippet', subtitle}) },
  })],
});
export const journalEntry = defineType({
  name: 'journalEntry', title: 'Learning Journal', type: 'document',
  description: 'Write in your own words. Drafts are private to authorized Studio users. Publish when ready; content changes do not require deployment.',
  groups: [
    { name: 'article', title: 'Article', default: true },
    { name: 'files', title: 'Files' },
    { name: 'seo', title: 'SEO' },
  ],
  initialValue: () => ({ date: new Date().toISOString().slice(0,10) }),
  fields: [
    defineField({ name: 'title', title: 'Article title', type: 'string', group: 'article', validation: r => r.required().max(160) }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', group: 'article', options: { source: 'title', maxLength: 96 }, description: 'Generate once. Changing a published slug changes its public address.', validation: r => r.required().custom(value => !value?.current || /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value.current) ? true : 'Use lowercase letters, numbers and hyphens.') }),
    defineField({ name: 'topic', title: 'Topic (optional)', type: 'string', group: 'article', description: 'Reuse the same topic spelling to group related entries.', validation: r => r.max(80) }),
    defineField({ name: 'date', title: 'Entry date', type: 'date', group: 'article', description: 'Display date only; this does not schedule publication.', validation: r => r.required() }),
    defineField({ name: 'notes', title: 'Article body', type: 'journalBody', group: 'article', description: 'Use headings, lists, links, screenshots, tables, code blocks, and inline code for a complete technical article.', validation: r => r.required().min(1) }),
    defineField({ name: 'attachments', title: 'PDF attachments', type: 'array', group: 'files', description: 'Add downloadable supporting PDFs.', of: [defineArrayMember({ type: 'file', title: 'PDF attachment', options: { accept: 'application/pdf,.pdf' }, fields: [defineField({ name: 'label', title: 'File label', type: 'string', validation: r => r.required() })] })] }),
    defineField({ name: 'seoTitle', title: 'SEO Title', type: 'string', group: 'seo', validation: r => r.max(70) }),
    defineField({ name: 'metaDescription', title: 'Meta Description', type: 'text', group: 'seo', rows: 3, validation: r => r.max(160) }),
  ],
  orderings: [{ title: 'Newest first', name: 'dateDesc', by: [{field:'date', direction:'desc'}] }],
  preview: { select: {title:'title', subtitle:'topic'} },
});
