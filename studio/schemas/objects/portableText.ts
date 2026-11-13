import { defineType, defineArrayMember } from 'sanity';

export const portableText = defineType({
  name: 'portableText',
  title: 'Rich Text',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'Heading 2', value: 'h2' },
        { title: 'Heading 3', value: 'h3' },
        { title: 'Heading 4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Bullet List', value: 'bullet' },
        { title: 'Numbered List', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Bold', value: 'strong' },
          { title: 'Italic', value: 'em' },
          { title: 'Code', value: 'code' },
          { title: 'Underline', value: 'underline' },
          { title: 'Strikethrough', value: 'strike-through' },
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Hyperlink',
            fields: [
              {
                name: 'href',
                type: 'url',
                title: 'URL',
                description: 'Paste a full https:// link or mailto: email link.',
                validation: (rule) =>
                  rule
                    .uri({ scheme: ['http', 'https', 'mailto'] })
                    .error('Must be a valid URL.'),
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Required description for screen readers and accessibility.',
          validation: (rule) => rule.required().error('Describe this image for screen readers.'),
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
          description: 'Optional caption displayed underneath the image.',
        },
      ],
    }),
    defineArrayMember({
      name: 'codeBlock',
      title: 'Code block',
      type: 'object',
      fields: [
        {
          name: 'language',
          title: 'Language',
          type: 'string',
          options: {
            list: ['bash', 'c', 'cpp', 'css', 'html', 'javascript', 'json', 'python', 'rust', 'sql', 'typescript', 'text'],
          },
          initialValue: 'text',
        },
        {
          name: 'code',
          title: 'Code',
          type: 'text',
          rows: 14,
          validation: (rule: any) => rule.required(),
        },
        { name: 'caption', title: 'Caption', type: 'string' },
      ],
    }),
    defineArrayMember({
      name: 'contentTable',
      title: 'Table',
      type: 'object',
      fields: [
        { name: 'caption', title: 'Caption', type: 'string' },
        {
          name: 'rows',
          title: 'Rows',
          type: 'array',
          of: [
            defineArrayMember({
              name: 'tableRow',
              title: 'Row',
              type: 'object',
              fields: [
                { name: 'header', title: 'Header row', type: 'boolean', initialValue: false },
                { name: 'cells', title: 'Cells', type: 'array', of: [{ type: 'string' }] },
              ],
            }),
          ],
          validation: (rule: any) => rule.min(1),
        },
      ],
    }),
  ],
});
