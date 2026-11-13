import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Download } from 'lucide-react';
import { useJournalEntry } from '../hooks/useJournal';
import { journalDate } from '../lib/sanity/journal';
import { journalCopy as copy } from '../data/journal';
import { JournalState } from '../components/layout/JournalState';
import { ArticleBody, ArticleMetadata } from '../components/layout/ArticleContent';
export default function JournalEntry() {
  const {slug=''}=useParams();const result=useJournalEntry(slug);const entry=result.data;
  return <section className="journal-page journal-reader"><Link to="/journal" className="text-link"><ArrowLeft size={16}/>{copy.back}</Link>
    <JournalState loading={result.isPending} error={result.isError} retry={()=>void result.refetch()}/>
    {!result.isPending && !result.isError && (entry ? <article>
      <ArticleMetadata title={entry.title} seoTitle={entry.seoTitle} description={entry.metaDescription || entry.excerpt} />
      <header className="journal-header"><p className="eyebrow">{entry.topic || 'Learning note'}</p><h1>{entry.title}</h1>{entry.date && <time dateTime={entry.date}>{journalDate(entry.date)}</time>}</header>
      <ArticleBody value={entry.notes} />
      {entry.attachments.length>0 && <aside className="journal-attachments"><h2>{copy.files}</h2>{entry.attachments.map((f,i)=><a key={`${f.url}-${i}`} href={f.url} target="_blank" rel="noopener noreferrer"><Download size={17}/>{f.label}<span className="sr-only"> (opens in a new tab)</span></a>)}</aside>}
    </article> : <div className="journal-state"><h1>{copy.notFound}</h1><p>{copy.notFoundDescription}</p></div>)}
  </section>;
}
