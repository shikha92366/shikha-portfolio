import { orderRankField } from '@sanity/orderable-document-list';
import { defineType, defineField } from 'sanity';
import { Briefcase } from 'lucide-react';

export const experience = defineType({
  name: 'experience',
  title: 'Experience',
  type: 'document',
  icon: Briefcase,
  fields: [
    orderRankField({ type: 'experience', description: 'Drag entries in the list to set their display order.' }),
    defineField({
      name: 'role',
      title: 'Job / Role Title',
      type: 'string',
      description: 'Your position title, e.g. "Avionics & On-Board Computer Engineer".',
      validation: (rule) => rule.required().error('Role title is required.'),
    }),
    defineField({
      name: 'company',
      title: 'Company / Organization',
      type: 'string',
      description: 'Name of the firm, team, or lab (e.g. "PSIT Vyomnauts (Team Sudarshan)").',
      validation: (rule) => rule.required().error('Company name is required.'),
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'string',
      description: 'When you began this role, e.g. "Mar 2025" or "2024".',
      validation: (rule) => rule.required().error('Start date is required.'),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'string',
      description: 'When you completed this role, or "Present" if active.',
      initialValue: 'Present',
      validation: (rule) => rule.required().error('End date or "Present" is required.'),
    }),
    defineField({
      name: 'bullets',
      title: 'Key Achievements & Responsibilities',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Impact-focused bullet points describing your measurable contributions.',
      validation: (rule) =>
        rule.required().min(1).error('At least one bullet point is required.'),
    }),
    defineField({
      name: 'techStack',
      title: 'Technologies & Tools Used',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of hardware, software, or tools used in this role.',
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
      title: 'role',
      subtitle: 'company',
      startDate: 'startDate',
      endDate: 'endDate',
    },
    prepare({ title, subtitle, startDate, endDate }) {
      return {
        title: title || 'Role',
        subtitle: `${subtitle || 'Company'} (${startDate || ''} - ${endDate || ''})`,
      };
    },
  },
});
