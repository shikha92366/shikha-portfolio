import { defineType, defineField } from 'sanity';
import { User } from 'lucide-react';

export const profile = defineType({
  name: 'profile',
  title: 'Profile',
  type: 'document',
  icon: User,
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      description: 'Your display name shown in the navbar, hero, and footer (e.g. "Shikha").',
      validation: (rule) => rule.required().error('Name is required.'),
    }),
    defineField({
      name: 'greeting',
      title: 'Hero Greeting',
      type: 'string',
      description: 'Casual hero greeting phrase, e.g. "hi, shikha here.".',
      validation: (rule) => rule.required().error('Greeting is required.'),
    }),
    defineField({
      name: 'title',
      title: 'Professional Headline',
      type: 'string',
      description: 'Shown beneath your name, e.g. "ECE Engineer | Embedded Systems, Avionics, IoT, PCB Design".',
      validation: (rule) => rule.required().error('Professional headline is required.'),
    }),
    defineField({
      name: 'intro',
      title: 'Introduction Bio',
      type: 'text',
      rows: 4,
      description: '2 to 3 conversational sentences summarizing your focus and engineering interests.',
      validation: (rule) => rule.required().error('Intro biography is required.'),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'Your current location or city (e.g. "Kanpur, India").',
      validation: (rule) => rule.required().error('Location is required.'),
    }),
    defineField({
      name: 'email',
      title: 'Contact Email',
      type: 'string',
      description: 'Public contact email address for email links and direct inquiries.',
      validation: (rule) =>
        rule
          .required()
          .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { name: 'email' })
          .error('A valid email address is required.'),
    }),
    defineField({
      name: 'photo',
      title: 'Profile Portrait / Visual',
      type: 'image',
      description: 'Optional profile photo or avatar image.',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'Accessibility description for screen readers.',
        },
      ],
    }),
    defineField({
      name: 'currentTechnologies',
      title: 'Technologies You Work With',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of chips displayed in the "technologies I\'ve been working with" section on the home page.',
      validation: (rule) => rule.required().min(1).error('At least one technology is required.'),
    }),
    defineField({
      name: 'socials',
      title: 'Social & Profile Links',
      type: 'array',
      of: [{ type: 'socialLink' }],
      description: 'Links to your GitHub, LinkedIn, email, and other profiles.',
    }),
    defineField({
      name: 'education',
      title: 'Education History',
      type: 'array',
      of: [{ type: 'educationItem' }],
      description: 'Schools, colleges, degrees, and scores shown on your resume & about page.',
    }),
    defineField({
      name: 'sectionLabels',
      title: 'Homepage Gallery Section Labels',
      type: 'object',
      description: 'Custom headings for the two portfolio showcase sections.',
      fields: [
        defineField({
          name: 'software',
          title: 'Software Section Heading',
          type: 'string',
          description: 'Label for software/embedded section (e.g. "embedded & ai").',
          validation: (rule) => rule.required().error('Software section label is required.'),
        }),
        defineField({
          name: 'hardware',
          title: 'Hardware Section Heading',
          type: 'string',
          description: 'Label for hardware/avionics section (e.g. "avionics & pcb").',
          validation: (rule) => rule.required().error('Hardware section label is required.'),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'title',
      media: 'photo',
    },
  },
});
