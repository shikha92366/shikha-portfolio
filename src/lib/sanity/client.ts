import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

export const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || '';
export const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';
export const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || '2024-01-01';

export const isSanityConfigured = Boolean(
  /^[a-z0-9]+$/.test(projectId) && projectId !== 'placeholder'
);

export const sanityClient = createClient({
  projectId: isSanityConfigured ? projectId : 'placeholder',
  dataset: dataset || 'production',
  apiVersion,
  useCdn: true,
  perspective: 'published',
});

// Configure Sanity Image URL builder with width and auto-format optimizations
const imageBuilder = createImageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return imageBuilder.image(source);
}
