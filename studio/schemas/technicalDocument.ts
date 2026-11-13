import { defineField, defineType } from 'sanity';

const acceptedFiles = [
  'application/pdf', '.pdf',
  'application/msword', '.doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', '.docx',
  'application/vnd.ms-powerpoint', '.ppt',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation', '.pptx',
  'image/png', '.png',
  'image/jpeg', '.jpg', '.jpeg',
].join(',');

export const technicalDocument = defineType({
  name: 'technicalDocument',
  title: 'Technical Document',
  type: 'document',
  description: 'Create a technical article, attach public files, or both. Drafts remain private until published.',
  groups: [
    { name: 'article', title: 'Article', default: true },
    { name: 'library', title: 'Library & Files' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Document Title',
      type: 'string',
      group: 'article',
      validation: rule => rule.required().max(160),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'article',
      options: { source: 'title', maxLength: 96 },
      description: 'Generate once. Changing a published slug changes its public address.',
      validation: rule => rule.custom((value, context) => {
        const document = context.document as { body?: unknown[] } | undefined;
        return document?.body?.length && !value?.current
          ? 'Generate a slug for an article.'
          : true;
      }),
    }),
    defineField({
      name: 'body',
      title: 'Article',
      type: 'portableText',
      group: 'article',
      description: 'Build a long-form article with headings, lists, links, images, tables, and code blocks.',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      group: 'library',
      rows: 3,
      validation: rule => rule.max(500),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      group: 'library',
      to: [{ type: 'documentCategory' }],
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      group: 'library',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'project',
      title: 'Associated Project',
      type: 'reference',
      group: 'library',
      to: [{ type: 'project' }],
    }),
    defineField({
      name: 'visibility',
      title: 'Visibility',
      type: 'string',
      group: 'library',
      options: {
        list: [
          { title: 'Public', value: 'public' },
          { title: 'Private (draft only until R2 is configured)', value: 'private' },
        ],
        layout: 'radio',
      },
      description: 'Private records must remain drafts. Unpublish an existing public version before switching it to Private.',
      initialValue: 'public',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'file',
      title: 'Public File',
      type: 'file',
      group: 'library',
      description: 'Supported: PDF, DOC, DOCX, PPT, PPTX, PNG, JPG and JPEG. Re-upload here to replace a public file.',
      options: { accept: acceptedFiles },
      hidden: ({ parent }) => parent?.visibility === 'private',
      validation: rule => rule.custom((file, context) => {
        const document = context.document as { visibility?: string; body?: unknown[] } | undefined;
        return document?.visibility === 'private' || file || document?.body?.length
          ? true
          : 'Add an article body or upload a public file.';
      }),
    }),
    defineField({
      name: 'attachments',
      title: 'Article Attachments',
      type: 'array',
      group: 'library',
      description: 'Attach downloadable files such as supplemental PDFs.',
      of: [{
        type: 'file',
        title: 'Attachment',
        options: { accept: 'application/pdf,.pdf' },
        fields: [
          defineField({ name: 'label', title: 'Link text', type: 'string', validation: rule => rule.required() }),
          defineField({ name: 'caption', title: 'Caption', type: 'string' }),
        ],
      }],
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      group: 'seo',
      validation: rule => rule.max(70),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      group: 'seo',
      rows: 3,
      validation: rule => rule.max(160),
    }),
    defineField({
      name: 'createdAt',
      title: 'Date Added',
      type: 'datetime',
      group: 'library',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  orderings: [
    { title: 'Newest first', name: 'newest', by: [{ field: 'createdAt', direction: 'desc' }] },
    { title: 'Title A–Z', name: 'titleAsc', by: [{ field: 'title', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'title', category: 'category.title', visibility: 'visibility', slug: 'slug.current', hasBody: 'body' },
    prepare: ({ title, category, visibility, slug, hasBody }) => ({
      title: title || 'Untitled document',
      subtitle: [hasBody ? 'Article' : 'File', category || 'Uncategorized', slug ? `/${slug}` : '', visibility || 'public'].filter(Boolean).join(' · '),
    }),
  },
});