import { useEffect } from 'react';
import { useSiteSettings } from '../../hooks/useSanityData';
export function SiteMetadata() {
  const { data } = useSiteSettings();
  useEffect(() => {
    if (data.title) document.title = data.title;
    for (const [attribute, name, value] of [
      ['name', 'description', data.description], ['property', 'og:title', data.title],
      ['property', 'og:description', data.description], ['property', 'og:image', data.ogImage],
    ]) {
      if (!value) continue;
      let tag = document.querySelector<HTMLMetaElement>(`meta[${attribute}="${name}"]`);
      if (!tag) { tag = document.createElement('meta'); tag.setAttribute(attribute!, name!); document.head.appendChild(tag); }
      tag.content = value;
    }
  }, [data]);
  return null;
}
