import { orderRankField } from '@sanity/orderable-document-list';
import { defineType, defineField } from 'sanity';
import { FolderGit2 } from 'lucide-react';

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: FolderGit2,
  fields: [
    orderRankField({ type: 'project', description: 'Drag entries in the list to set their display order.' }),
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      description: 'Engineering project title, e.g. "Rocket Avionics System (Trishul)".',
      validation: (rule) => rule.required().error('Project title is required.'),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      description: 'Used in the web address (e.g. /projects/rocket-avionics). Generated from the title.',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required().error('A unique slug is required for navigation.'),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Summary / Card Description',
      type: 'text',
      rows: 2,
      description: 'Shown on the project card. One sentence summarizing the project (maximum 160 characters).',
      validation: (rule) =>
        rule
          .required()
          .max(160)
          .warning('Keep card summaries under 160 characters for clean grid layouts.'),
    }),
    defineField({
      name: 'domain',
      title: 'Engineering Domain',
      type: 'string',
      description: 'Determines whether this project appears in the Software or Hardware showcase.',
      options: {
        list: [
          { title: 'Software / Embedded Firmware', value: 'software' },
          { title: 'Hardware / Avionics & PCB', value: 'hardware' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required().error('Engineering domain is required.'),
    }),
    defineField({
      name: 'category',
      title: 'Technical Category',
      type: 'string',
      description: 'Primary engineering discipline filter on the software & hardware pages.',
      options: {
        list: [
          { title: 'Embedded Systems', value: 'embedded' },
          { title: 'IoT & Telemetry', value: 'iot' },
          { title: 'AI & Machine Learning (Edge AI)', value: 'ai-ml' },
          { title: 'PCB Design & EDA', value: 'pcb-design' },
          { title: 'Software & Firmware', value: 'software' },
        ],
      },
      validation: (rule) => rule.required().error('Technical category is required.'),
    }),
    defineField({
      name: 'techStack',
      title: 'Tech Stack Tags',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Core microcontrollers, protocols, or tools (rendered as uppercase badges).',
      validation: (rule) =>
        rule.required().min(1).error('At least one technology tag is required.'),
    }),
    defineField({
      name: 'role',
      title: 'Your Engineering Role',
      type: 'string',
      description: 'What you did on this project (e.g. "On-Board Computer Engineer" or "Lead PCB Designer").',
      validation: (rule) => rule.required().error('Role is required.'),
    }),
    defineField({
      name: 'timeline',
      title: 'Timeline / Year',
      type: 'string',
      description: 'Duration or year active, e.g. "2024 - 2025" or "2026 - Present".',
      validation: (rule) => rule.required().error('Timeline is required.'),
    }),
    defineField({
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      description: 'Turn ON to display this project in the top hero carousel or featured spotlight.',
      initialValue: false,
    }),
    defineField({
      name: 'status',
      title: 'Development Status',
      type: 'string',
      description: 'Current development state.',
      options: {
        list: [
          { title: 'Completed', value: 'completed' },
          { title: 'In Progress (Active Development)', value: 'in-progress' },
        ],
        layout: 'radio',
      },
      initialValue: 'completed',
      validation: (rule) => rule.required().error('Project status is required.'),
    }),
    defineField({
      name: 'awards',
      title: 'Awards & Honors',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Competitions or prizes won with this project (e.g. "2nd Prize, IN-SPACe Model Rocketry Competition").',
    }),
    defineField({
      name: 'team',
      title: 'Team / Group Name',
      type: 'string',
      description: 'Optional team acknowledgment, e.g. "Team Sudarshan (6 members)".',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image / Banner',
      type: 'image',
      description: 'Hero cover image shown on the card and at top of the case study page.',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'Description of the image for accessibility and SEO.',
          validation: (rule) => rule.required().error('Alt text is required for cover images.'),
        },
      ],
      validation: (rule) => rule.required().error('Cover image is required.'),
    }),
    defineField({
      name: 'overview',
      title: 'Problem & System Overview',
      type: 'portableText',
      description: 'Rich text section describing the challenge, engineering requirements, and overall objective.',
    }),
    defineField({
      name: 'architecture',
      title: 'Architecture & System Block Diagram',
      type: 'image',
      description: 'Diagram or flow chart illustrating hardware, telemetry, or software pipeline.',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'Description of diagram for accessibility.',
        },
      ],
    }),
    defineField({
      name: 'hardwareDetails',
      title: 'Hardware & Circuit Details',
      type: 'hardwareDetails',
      description: 'Specifications for MCU, sensors, communication buses, and PCB specs.',
    }),
    defineField({
      name: 'implementation',
      title: 'Implementation & Firmware Design',
      type: 'portableText',
      description: 'Rich text section detailing how the system was engineered, firmware algorithms, and hardware integration.',
    }),
    defineField({
      name: 'results',
      title: 'Measurable Outcomes & Results',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Outcome bullet points displayed as green verification cards.',
    }),
    defineField({
      name: 'challenges',
      title: 'Engineering Challenges & Mitigations',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Technical roadblocks encountered and how you solved them (displayed with warning badges).',
    }),
    defineField({
      name: 'gallery',
      title: 'Hardware Photo Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
              description: 'Short accessibility description.',
              validation: rule => rule.required().error('Describe this image for screen readers.'),
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
              description: 'Optional caption shown in full-screen lightbox.',
            },
          ],
        },
      ],
      description: 'Photos, PCB top/bottom renders, oscillograms, and test bench photos.',
    }),
    defineField({
      name: 'documents',
      title: 'Design Documents & Artifacts',
      type: 'array',
      of: [{ type: 'projectDocument' }],
      description: 'Downloadable schematics, Bill of Materials (BOM), datasheets, or repository links.',
    }),
    defineField({
      name: 'githubUrl',
      title: 'GitHub Code Repository URL',
      type: 'url',
      description: 'Link to source code, KiCad/EasyEDA files, or firmware repo.',
      validation: (rule) =>
        rule.uri({ scheme: ['http', 'https'] }).error('Must be a valid web URL.'),
    }),
    defineField({
      name: 'demoUrl',
      title: 'Live Interactive Demo URL',
      type: 'url',
      description: 'Link to interactive dashboard, simulation, or hosted web interface.',
      validation: (rule) =>
        rule.uri({ scheme: ['http', 'https'] }).error('Must be a valid web URL.'),
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video / Flight Footage URL',
      type: 'url',
      description: 'Link to flight test video, YouTube showcase, or live demonstration.',
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
      subtitle: 'shortDescription',
      status: 'status',
      domain: 'domain',
      media: 'coverImage',
    },
    prepare({ title, subtitle, status, domain, media }) {
      const statusBadge = status === 'completed' ? '✓ Completed' : '⚡ In Progress';
      const domainBadge = domain ? `[${domain}]` : '';
      return {
        title: title || 'Untitled Project',
        subtitle: `${domainBadge} ${statusBadge} — ${subtitle || ''}`,
        media,
      };
    },
  },
});
