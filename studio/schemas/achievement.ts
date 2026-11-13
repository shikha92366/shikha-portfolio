import { orderRankField } from '@sanity/orderable-document-list';
import { defineType, defineField } from 'sanity';
import { Award } from 'lucide-react';

export const achievement = defineType({
  name: 'achievement',
  title: 'Achievement',
  type: 'document',
  icon: Award,
  fields: [
    orderRankField({ type: 'achievement', description: 'Drag entries in the list to set their display order.' }),
    defineField({
      name: 'title',
      title: 'Achievement Title',
      type: 'string',
      description: 'Title of the award, certification, publication, or competition.',
      validation: (rule) => rule.required().error('Achievement title is required.'),
    }),
    defineField({
      name: 'issuer',
      title: 'Issuing Organization',
      type: 'string',
      description: 'Awarding entity, institute, or organization (e.g. "IN-SPACe" or "MathWorks").',
      validation: (rule) => rule.required().error('Issuing organization is required.'),
    }),
    defineField({
      name: 'date',
      title: 'Date / Year',
      type: 'string',
      description: 'When it was received or period, e.g. "2024-25" or "Aug 2026".',
      validation: (rule) => rule.required().error('Date or period is required.'),
    }),
    defineField({
      name: 'type',
      title: 'Classification Type',
      type: 'string',
      description: 'Select the category of accomplishment.',
      options: {
        list: [
          { title: 'Award / Honor', value: 'award' },
          { title: 'Certification', value: 'certification' },
          { title: 'Competition / Hackathon', value: 'competition' },
          { title: 'Publication / Paper', value: 'publication' },
        ],
      },
      validation: (rule) => rule.required().error('Type classification is required.'),
    }),
    defineField({
      name: 'description',
      title: 'Summary Description',
      type: 'text',
      rows: 3,
      description: 'Brief overview of why it was awarded or key highlights.',
    }),
    defineField({
      name: 'credentialUrl',
      title: 'Credential / Verification Link',
      type: 'url',
      description: 'Optional link to verify the certificate or view press coverage.',
      validation: (rule) =>
        rule.uri({ scheme: ['http', 'https'] }).error('Must be a valid web URL.'),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      description: 'Original seed position. Drag items in the list to change their live order.',
      type: 'number',
      hidden: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'issuer',
      date: 'date',
      type: 'type',
    },
    prepare({ title, subtitle, date, type }) {
      return {
        title: title || 'Achievement',
        subtitle: `${subtitle || ''} • ${date || ''} [${type || ''}]`,
      };
    },
  },
});
