import { useState } from 'react';
import { PortableText, type PortableTextComponents } from '@portabletext/react';
import { createImageUrlBuilder } from '@sanity/image-url';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';
import c from 'react-syntax-highlighter/dist/esm/languages/prism/c';
import cpp from 'react-syntax-highlighter/dist/esm/languages/prism/cpp';
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css';
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json';
import markup from 'react-syntax-highlighter/dist/esm/languages/prism/markup';
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python';
import sql from 'react-syntax-highlighter/dist/esm/languages/prism/sql';
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import { defineConfig, type DocumentActionComponent } from 'sanity';
import { Eye } from 'lucide-react';

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'your-project-id';
const dataset = process.env.SANITY_STUDIO_DATASET || 'production';
const imageBuilder = createImageUrlBuilder(defineConfig({ projectId, dataset }));
for (const [language, grammar] of Object.entries({ bash, c, cpp, css, javascript, json, markup, python, sql, typescript })) {
  SyntaxHighlighter.registerLanguage(language, grammar);
}
const imageUrl = (value: unknown) => {
  try { return imageBuilder.image(value as never).width(960).auto('format').url(); }
  catch { return ''; }
};

function DraftPreview({ document }: { document: Record<string, any> }) {
  const blocks = Array.isArray(document.body) ? document.body : Array.isArray(document.notes) ? document.notes : [];
  const components: PortableTextComponents = {
    block: {
      normal: ({ children }) => <p style={{ lineHeight: 1.8, margin: '0 0 1em' }}>{children}</p>,
      h2: ({ children }) => <h2 style={{ marginTop: '2em' }}>{children}</h2>,
      h3: ({ children }) => <h3 style={{ marginTop: '1.6em' }}>{children}</h3>,
      h4: ({ children }) => <h4 style={{ marginTop: '1.4em' }}>{children}</h4>,
      blockquote: ({ children }) => <blockquote style={{ borderLeft: '3px solid #83b4ff', margin: '1.5em 0', paddingLeft: '1em' }}>{children}</blockquote>,
    },
    types: {
      image: ({ value }) => {
        const src = imageUrl(value);
        return src ? <figure><img src={src} alt={value.alt || ''} style={{ maxWidth: '100%', height: 'auto' }} />{value.caption && <figcaption>{value.caption}</figcaption>}</figure> : null;
      },
      codeBlock: ({ value }) => <figure><figcaption>{value.caption || value.language}</figcaption><SyntaxHighlighter language={value.language || 'text'} style={oneDark}>{value.code || ''}</SyntaxHighlighter></figure>,
      codeSnippet: ({ value }) => <SyntaxHighlighter language={value.language || 'text'} style={oneDark}>{value.code || ''}</SyntaxHighlighter>,
      contentTable: ({ value }) => <div style={{ overflowX: 'auto' }}><table style={{ borderCollapse: 'collapse', width: '100%' }}><tbody>{(value.rows || []).map((row: any, rowIndex: number) => <tr key={row._key || rowIndex}>{(row.cells || []).map((cell: string, cellIndex: number) => row.header || rowIndex === 0 ? <th key={cellIndex} style={{ border: '1px solid #555', padding: 8, textAlign: 'left' }}>{cell}</th> : <td key={cellIndex} style={{ border: '1px solid #555', padding: 8 }}>{cell}</td>)}</tr>)}</tbody></table>{value.caption && <p>{value.caption}</p>}</div>,
    },
  };
  return (
    <div style={{ maxHeight: '70vh', overflow: 'auto', padding: '24px 32px', color: '#d8dee8' }}>
      <p style={{ color: '#83b4ff', fontSize: 12, textTransform: 'uppercase' }}>Unpublished preview</p>
      <h1 style={{ fontSize: 36, lineHeight: 1.2 }}>{document.title || 'Untitled article'}</h1>
      {document.description && <p style={{ fontSize: 18, lineHeight: 1.6 }}>{document.description}</p>}
      {blocks.length ? <PortableText value={blocks} components={components} /> : <p>No article body has been added.</p>}
    </div>
  );
}

export const articleDraftPreviewAction: DocumentActionComponent = props => {
  const [isOpen, setIsOpen] = useState(false);
  const document = (props.draft || props.published) as Record<string, any> | undefined;
  if (!document) return null;
  const hasBody = Array.isArray(document.body) || Array.isArray(document.notes);
  return {
    label: props.draft ? 'Preview draft' : 'Preview published',
    icon: Eye,
    disabled: !hasBody,
    onHandle: () => setIsOpen(true),
    dialog: isOpen ? {
      type: 'dialog',
      header: 'Article preview',
      content: <DraftPreview document={document} />,
      onClose: () => setIsOpen(false),
      showCloseButton: true,
    } : undefined,
  };
};
