import { defineType, defineField } from 'sanity';

export const projectDocument = defineType({
  name: 'projectDocument',
  title: 'Project Document / Artifact',
  type: 'object',
  validation: rule => rule.custom(value => value?.file || value?.url ? true : 'Upload a file or enter a URL.'),
  fields: [
    defineField({
      name: 'label',
      title: 'Document Label',
      type: 'string',
      description: 'Human-readable name, e.g. "Schematic Diagram (High-Res)" or "Bill of Materials (BOM)".',
      validation: (rule) => rule.required().error('Document label is required.'),
    }),
    defineField({
      name: 'type',
      title: 'Document Type',
      type: 'string',
      description: 'File type format: PDF report, image schematic, external web link, or CSV table.',
      options: {
        list: [
          { title: 'PDF Document (.pdf)', value: 'pdf' },
          { title: 'Image (.png, .jpg, .webp)', value: 'image' },
          { title: 'External Web Link', value: 'link' },
          { title: 'CSV Table (.csv)', value: 'csv' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required().error('Document format type is required.'),
    }),
    defineField({
      name: 'file',
      title: 'Uploaded File (PDF, Image, or CSV)',
      type: 'file',
      description: 'Direct file upload to Sanity CDN. Use this when you have a local PDF, schematic, or BOM file.',
    }),
    defineField({
      name: 'url',
      validation: rule => rule.custom(value => !value || /^(https?:\/\/|\/(?!\/))/.test(value) ? true : 'Use https:// or a site-relative /path.'),
      title: 'External or Fallback URL',
      type: 'string',
      description: 'Use for external links (e.g. GitHub repo folder) or direct links if not uploading a file.',
    }),
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'type',
    },
  },
});
