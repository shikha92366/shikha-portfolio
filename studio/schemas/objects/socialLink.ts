import { defineType, defineField } from 'sanity';

export const socialLink = defineType({
  name: 'socialLink',
  title: 'Social Link',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Platform Label',
      type: 'string',
      description: 'Name of the network or platform, e.g. "GitHub" or "LinkedIn".',
      validation: (rule) => rule.required().error('Platform label is required.'),
    }),
    defineField({
      name: 'url',
      title: 'Profile URL',
      type: 'url',
      description: 'Direct link to your profile (must begin with https:// or mailto:).',
      validation: (rule) =>
        rule
          .required()
          .uri({ scheme: ['http', 'https', 'mailto'] })
          .error('A valid web or mailto URL is required.'),
    }),
    defineField({
      name: 'icon',
      title: 'Icon Name',
      type: 'string',
      description: 'Lucide icon identifier, such as "github", "linkedin", or "mail".',
      options: {
        list: [
          { title: 'GitHub', value: 'github' },
          { title: 'LinkedIn', value: 'linkedin' },
          { title: 'Email / Mail', value: 'mail' },
          { title: 'Twitter / X', value: 'twitter' },
          { title: 'Globe / Web', value: 'globe' },
        ],
      },
      validation: (rule) => rule.required().error('Please select or specify an icon.'),
    }),
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'url',
    },
  },
});
