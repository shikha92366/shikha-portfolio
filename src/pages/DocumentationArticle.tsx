import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Download } from 'lucide-react';
import { useDocumentationArticle } from '../hooks/useSanityData';
import { ArticleBody, ArticleMetadata } from '../components/layout/ArticleContent';
import { ContentStatus } from '../components/layout/ContentStatus';

export default function DocumentationArticle() {
  const { slug = '' } = useParams();
  const result = useDocumentationArticle(slug);
  const article = result.data;

  return (
    <section className="journal-page journal-reader documentation-article">
      <Link to="/documentation" className="text-link"><ArrowLeft size={16} />Technical library</Link>
      <ContentStatus loading={result.isPending} error={result.isError ? 'Documentation is temporarily unavailable.' : undefined} />
      {!result.isPending && !result.isError && (article?.body.length ? <article>
        <ArticleMetadata title={article.title} seoTitle={article.seoTitle} description={article.metaDescription || article.description} />
        <header className="journal-header">
          <p className="eyebrow">{article.category}</p>
          <h1>{article.title}</h1>
          {article.description && <p>{article.description}</p>}
          {article.project?.slug && <Link className="text-link" to={`/projects/${article.project.slug}`}>Project: {article.project.title}</Link>}
        </header>
        {article.tags.length > 0 && <ul className="documentation-tags" aria-label="Article tags">{article.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>}
        <ArticleBody value={article.body} />
        {article.attachments.length > 0 && <aside className="journal-attachments"><h2>Downloads</h2>{article.attachments.map(file => (
          <a key={file.url} href={file.url} download={file.filename || undefined} target="_blank" rel="noopener noreferrer"><Download size={17} />{file.label}{file.caption && <span>{file.caption}</span>}</a>
        ))}</aside>}
      </article> : <div className="journal-state"><h1>Article not found.</h1><p>This article may be unpublished or its address may have changed.</p></div>)}
    </section>
  );
}
