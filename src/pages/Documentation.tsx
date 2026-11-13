import { Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDocumentation } from '../hooks/useSanityData';

export default function Documentation() {
  const result = useDocumentation();
  const documents = result.data || [];

  return (
    <section className="journal-page documentation-page">
      <header className="journal-header">
        <p className="eyebrow">Technical library</p>
        <h1>Documentation</h1>
        <p>Reports, reference material, and technical files from my engineering work.</p>
      </header>

      {result.isPending && <div className="journal-state" role="status">Loading documentation…</div>}
      {result.isError && (
        <div className="journal-state" role="alert">
          <h2>Documentation is temporarily unavailable.</h2>
          <button className="text-link" onClick={() => void result.refetch()}>Try again</button>
        </div>
      )}
      {!result.isPending && !result.isError && documents.length === 0 && (
        <div className="journal-state">
          <h2>No public documents yet.</h2>
          <p>Published public documents will appear here.</p>
        </div>
      )}

      {!result.isPending && !result.isError && documents.length > 0 && (
        <div className="documentation-grid">
          {documents.map(document => {
            const isImage = document.mimeType.startsWith('image/');
            const isPdf = document.mimeType === 'application/pdf';
            const canPreview = isImage || isPdf;

            return (
              <article className="documentation-card" key={document.id}>
                <div className="journal-meta">
                  <span>{document.category}</span>
                  {document.project?.slug && (
                    <Link to={`/projects/${document.project.slug}`}>{document.project.title}</Link>
                  )}
                </div>
                <h2>{document.title}</h2>
                {document.description && <p>{document.description}</p>}
                {document.hasArticle && document.slug && (
                  <Link className="text-link documentation-read" to={`/documentation/${document.slug}`}>
                    Read article
                  </Link>
                )}
                {document.tags.length > 0 && (
                  <ul className="documentation-tags" aria-label="Document tags">
                    {document.tags.map(tag => <li key={tag}>{tag}</li>)}
                  </ul>
                )}
                {canPreview && document.url && (
                  <details className="documentation-preview">
                    <summary>Preview file</summary>
                    {isImage ? (
                      <img src={document.url} alt={document.title} loading="lazy" />
                    ) : (
                      <iframe src={document.url} title={`Preview: ${document.title}`} loading="lazy" />
                    )}
                  </details>
                )}
                {!canPreview && document.url && <p className="documentation-note">Download to view this file.</p>}
                {document.url && <a className="documentation-download" href={document.url} download={document.filename} target="_blank" rel="noreferrer">
                  <Download size={16} /> Download <span>{document.filename}</span>
                </a>}
                {document.attachments.map(file => (
                  <a className="documentation-download" href={file.url} download={file.filename || undefined} target="_blank" rel="noreferrer" key={file.url}>
                    <Download size={16} /> {file.label} <span>{file.filename}</span>
                  </a>
                ))}
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}