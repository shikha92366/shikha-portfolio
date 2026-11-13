import { defineType, defineField } from 'sanity';
import { Settings } from 'lucide-react';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: Settings,
  fields: [
    defineField({ name: 'contentReady', title: 'Content migration complete', type: 'boolean', hidden: true, description: 'Set by the seed script only after all documents are saved.' }),
    defineField({
      name: 'title',
      title: 'SEO Title Template',
      type: 'string',
      description: 'Default browser tab title (e.g. "Shikha — ECE Engineer Portfolio").',
      validation: (rule) => rule.required().error('SEO title is required.'),
    }),
    defineField({
      name: 'description',
      title: 'SEO Meta Description',
      type: 'text',
      rows: 3,
      description: 'Search engine description summary for Google and social previews.',
      validation: (rule) =>
        rule
          .required()
          .max(200)
          .warning('Descriptions under 160 characters fit best in search results.'),
    }),
    defineField({
      name: 'ogImage',
      title: 'Social Share Image (OpenGraph)',
      type: 'image',
      description: 'Image displayed when links to your portfolio are shared on LinkedIn, Twitter, or Discord.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'navLabels',
      title: 'Navigation Labels',
      type: 'object',
      description: 'Optional overrides for main navbar labels.',
      fields: [

        defineField({ name: 'work', title: 'Work Label', type: 'string' }),
        defineField({ name: 'skills', title: 'Skills Label', type: 'string' }),
        defineField({ name: 'journal', title: 'Journal Label', type: 'string' }),
        defineField({ name: 'home', title: 'Home Label', type: 'string', description: 'Text for the Home navigation link.', initialValue: 'Home' }),
        defineField({ name: 'about', title: 'About Label', type: 'string', description: 'Text for the About navigation link.', initialValue: 'About' }),
        defineField({ name: 'experience', title: 'Experience Label', type: 'string', description: 'Text for the Experience navigation link.', initialValue: 'Experience' }),
        defineField({ name: 'software', title: 'Software Label', type: 'string', description: 'Text for the Software navigation link.', initialValue: 'Software' }),
        defineField({ name: 'hardware', title: 'Hardware Label', type: 'string', description: 'Text for the Hardware navigation link.', initialValue: 'Hardware' }),
        defineField({ name: 'achievements', title: 'Achievements Label', type: 'string', description: 'Text for the Achievements navigation link.', initialValue: 'Achievements' }),
        defineField({ name: 'resume', title: 'Resume Label', type: 'string', description: 'Text for the Resume navigation link.', initialValue: 'Resume' }),
        defineField({ name: 'contact', title: 'Contact Label', type: 'string', description: 'Text for the Contact navigation link.', initialValue: 'Contact' }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
});
