import { defineType, defineField } from 'sanity';
import { FileText } from 'lucide-react';

export const resume = defineType({
  name: 'resume',
  title: 'Resume Document',
  type: 'document',
  icon: FileText,
  fields: [
    defineField({
      name: 'resumeFile',
      title: 'Resume PDF File',
      type: 'file',
      description: 'Upload your latest resume as a PDF file. This directly updates the /resume viewer and Download button.',
      options: {
        accept: 'application/pdf',
      },
      validation: (rule) => rule.required().error('Please upload a PDF file for your resume.'),
    }),
    defineField({
      name: 'title',
      title: 'Display Filename',
      type: 'string',
      description: 'Filename shown in the resume header bar, e.g. "SHIKHA_RESUME.pdf".',
      initialValue: 'SHIKHA_RESUME.pdf',
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated Date',
      type: 'date',
      description: 'Optional date note showing when you last updated the document.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'lastUpdated',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Resume PDF',
        subtitle: subtitle ? `Updated: ${subtitle}` : 'Current resume file',
      };
    },
  },
});
