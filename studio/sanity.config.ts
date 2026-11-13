import { defineConfig, type DocumentActionComponent } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemas';
import { deskStructure } from './deskStructure';
import { articleDraftPreviewAction } from './ArticleDraftPreview';

export default defineConfig({
  name: 'default',
  title: 'Portfolio Admin',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'your-project-id',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [
    structureTool({
      structure: deskStructure,
    }),

  ],

  document: {
    actions: (actions, context) => {
      if (['profile', 'siteSettings', 'resume'].includes(context.schemaType)) {
        return actions.filter(a => !['duplicate', 'delete', 'unpublish'].includes(a.action || ''));
      }
      if (!['technicalDocument', 'journalEntry'].includes(context.schemaType)) return actions;

      const actionsWithPreview = [...actions, articleDraftPreviewAction];
      if (context.schemaType !== 'technicalDocument') return actionsWithPreview;

      const publishAction = actionsWithPreview.find(action => action.action === 'publish');
      if (!publishAction) return actionsWithPreview;

      const guardedPublishAction: DocumentActionComponent = props => {
        const document = (props.draft || props.published) as { visibility?: string } | undefined;
        if (document?.visibility === 'private') return null;
        return publishAction(props);
      };

      return actionsWithPreview.map(action => action.action === 'publish' ? guardedPublishAction : action);
    },
  },
  schema: {
    types: schemaTypes,
    templates: templates => templates.filter(t => !['profile', 'siteSettings', 'resume'].includes(t.schemaType)),
  },
});
