import { orderRankField } from '@sanity/orderable-document-list';
import { defineType, defineField } from 'sanity';
import { Wrench } from 'lucide-react';

export const skill = defineType({
  name: 'skill',
  title: 'Skill',
  type: 'document',
  icon: Wrench,
  fields: [
    orderRankField({ type: 'skill', description: 'Drag entries in the list to set their display order.' }),
    defineField({
      name: 'name',
      title: 'Skill Name',
      type: 'string',
      description: 'Name of the technology, language, protocol, or tool (e.g. "STM32" or "Embedded C").',
      validation: (rule) => rule.required().error('Skill name is required.'),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Which domain group this skill belongs to in the skills matrix.',
      options: {
        list: [
          { title: 'Embedded Systems & Firmware', value: 'embedded' },
          { title: 'IoT & Telemetry', value: 'iot' },
          { title: 'AI / Machine Learning / Edge AI', value: 'ai-ml' },
          { title: 'PCB Design & EDA', value: 'pcb-design' },
          { title: 'Programming & Software', value: 'software' },
          { title: 'Engineering Tools & Instrumentation', value: 'tools' },
        ],
      },
      validation: (rule) => rule.required().error('Category selection is required.'),
    }),
    defineField({
      name: 'proficiency',
      title: 'Proficiency Level',
      type: 'string',
      description: 'Optional skill depth indicator.',
      options: {
        list: [
          { title: 'Familiar', value: 'familiar' },
          { title: 'Proficient', value: 'proficient' },
          { title: 'Expert', value: 'expert' },
        ],
      },
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
      title: 'name',
      subtitle: 'category',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Skill',
        subtitle: subtitle ? `Category: ${subtitle}` : undefined,
      };
    },
  },
});
