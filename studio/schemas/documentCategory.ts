import { defineField, defineType } from 'sanity';

export const documentCategory = defineType({
  name: 'documentCategory',
  title: 'Documentation Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Category Name',
      type: 'string',
      validation: rule => rule.required().max(80),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: { select: { title: 'title', subtitle: 'description' } },
});