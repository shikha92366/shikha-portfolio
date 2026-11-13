import { useEffect } from 'react';
import { PortableText, type PortableTextComponents } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';
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
import { portableTextComponents } from '../../lib/sanity/mappers';

for (const [language, grammar] of Object.entries({ bash, c, cpp, css, javascript, json, markup, python, sql, typescript })) {
  SyntaxHighlighter.registerLanguage(language, grammar);
}

const languageAliases: Record<string, string> = {
  c: 'c', cpp: 'cpp', 'c++': 'cpp', bash: 'bash', shell: 'bash', js: 'javascript', ts: 'typescript', py: 'python', html: 'markup',
};

function CodeBlock({ value }: { value: { language?: string; code?: string; caption?: string } }) {
  const language = value.language?.toLowerCase() || 'text';
  const safeLanguage = languageAliases[language] || language;
  return (
    <figure className="journal-code">
      {(value.caption || language !== 'text') && <figcaption>{value.caption || language}</figcaption>}
      <SyntaxHighlighter language={safeLanguage} style={oneDark} PreTag="pre" CodeTag="code" customStyle={{ margin: 0, padding: '20px', background: 'transparent', fontSize: '13px', lineHeight: 1.7 }}>
        {value.code || ''}
      </SyntaxHighlighter>
    </figure>
  );
}

function ContentTable({ value }: { value: { caption?: string; rows?: { _key?: string; header?: boolean; cells?: string[] }[] } }) {
  const rows = value.rows || [];
  return (
    <figure className="article-table">
      <div className="article-table-scroll">
        <table>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={row._key || rowIndex}>
                {(row.cells || []).map((cell, cellIndex) => row.header || rowIndex === 0 ?
                  <th scope="col" key={cellIndex}>{cell}</th> :
                  <td key={cellIndex}>{cell}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {value.caption && <figcaption>{value.caption}</figcaption>}
    </figure>
  );
}

const articleComponents: PortableTextComponents = {
  ...portableTextComponents,
  types: {
    ...portableTextComponents.types,
    codeBlock: ({ value }) => <CodeBlock value={value as { language?: string; code?: string; caption?: string }} />,
    codeSnippet: ({ value }) => <CodeBlock value={value as { language?: string; code?: string }} />,
    contentTable: ({ value }) => <ContentTable value={value as { caption?: string; rows?: { _key?: string; header?: boolean; cells?: string[] }[] }} />,
  },
};

export function ArticleBody({ value }: { value: PortableTextBlock[] }) {
  return <div className="journal-body"><PortableText value={value} components={articleComponents} /></div>;
}

export function ArticleMetadata({ title, seoTitle, description }: { title: string; seoTitle?: string; description?: string }) {
  useEffect(() => {
    const previousTitle = document.title;
    let descriptionTag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const createdDescriptionTag = !descriptionTag && Boolean(description);
    if (!descriptionTag && description) {
      descriptionTag = document.createElement('meta');
      descriptionTag.name = 'description';
      document.head.appendChild(descriptionTag);
    }
    const previousDescription = descriptionTag?.content;
    document.title = seoTitle || title;
    if (description && descriptionTag) descriptionTag.content = description;
    return () => {
      document.title = previousTitle;
      if (descriptionTag && createdDescriptionTag) descriptionTag.remove();
      else if (descriptionTag && previousDescription !== undefined) descriptionTag.content = previousDescription;
    };
  }, [description, seoTitle, title]);
  return null;
}
