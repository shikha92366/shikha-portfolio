import { defineType, defineField } from 'sanity';

export const educationItem = defineType({
  name: 'educationItem',
  title: 'Education Entry',
  type: 'object',
  fields: [
    defineField({
      name: 'school',
      title: 'School / Institution',
      type: 'string',
      description: 'Full name of university, college, or school.',
      validation: (rule) => rule.required().error('Institution name is required.'),
    }),
    defineField({
      name: 'degree',
      title: 'Degree / Certificate',
      type: 'string',
      description: 'Program name or degree obtained (e.g. "B.Tech, Electronics & Communication Engineering").',
      validation: (rule) => rule.required().error('Degree name is required.'),
    }),
    defineField({
      name: 'period',
      title: 'Time Period',
      type: 'string',
      description: 'Date range attended, e.g. "2023 - Present" or "2022 - 2023".',
      validation: (rule) => rule.required().error('Time period is required.'),
    }),
    defineField({
      name: 'score',
      title: 'Score / GPA / Percentage',
      type: 'string',
      description: 'Academic score, percentage, or CGPA (e.g. "78.6%").',
      validation: (rule) => rule.required().error('Score/percentage is required.'),
    }),
  ],
  preview: {
    select: {
      title: 'degree',
      subtitle: 'school',
    },
  },
});
