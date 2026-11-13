import type { StructureResolver } from 'sanity/structure';
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list';
import {
  User,
  Settings,
  FileText,
  FolderGit2,
  Briefcase,
  Wrench,
  Award,
  Files,
  Tags,
} from 'lucide-react';

export const deskStructure: StructureResolver = (S, context) =>
  S.list()
    .title('Portfolio Content')
    .items([
      // 1. Singletons at the top (direct document editor, no "create new")
      S.listItem()
        .title('Profile')
        .id('profile')
        .icon(User)
        .child(
          S.document()
            .schemaType('profile')
            .documentId('profile')
            .title('Profile & Bio')
        ),

      S.listItem()
        .title('Site Settings & SEO')
        .id('siteSettings')
        .icon(Settings)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Site Settings & SEO')
        ),

      S.listItem()
        .title('Resume PDF')
        .id('resume')
        .icon(FileText)
        .child(
          S.document()
            .schemaType('resume')
            .documentId('resume')
            .title('Resume Document')
        ),

      S.divider(),

      S.documentTypeListItem('journalEntry').title('Learning Journal').icon(FileText),
      S.documentTypeListItem('technicalDocument').title('Documentation Library').icon(Files),
      S.documentTypeListItem('documentCategory').title('Documentation Categories').icon(Tags),

      // 2. Drag-and-drop Orderable Collections
      orderableDocumentListDeskItem({
        type: 'project',
        title: 'Projects (Drag & Drop Reorder)',
        icon: FolderGit2,
        S,
        context,
      }),

      orderableDocumentListDeskItem({
        type: 'experience',
        title: 'Experience (Drag & Drop Reorder)',
        icon: Briefcase,
        S,
        context,
      }),

      orderableDocumentListDeskItem({
        type: 'skill',
        title: 'Skills (Drag & Drop Reorder)',
        icon: Wrench,
        S,
        context,
      }),

      orderableDocumentListDeskItem({
        type: 'achievement',
        title: 'Achievements (Drag & Drop Reorder)',
        icon: Award,
        S,
        context,
      }),

      // 3. Fallback for any other document types (excluding singletons and explicit list items)
      ...S.documentTypeListItems().filter((item) => {
        const id = item.getId();
        return (
          id &&
          ![
            'profile',
            'siteSettings',
            'resume',
            'project',
            'experience',
            'skill',
            'achievement',
            'media.tag',
            'journalEntry',
            'technicalDocument',
            'documentCategory',
          ].includes(id)
        );
      }),
    ]);
