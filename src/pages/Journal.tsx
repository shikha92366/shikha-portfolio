import { Link, useSearchParams } from 'react-router-dom';
import { ArrowUpRight, Search } from 'lucide-react';
import { useJournal } from '../hooks/useJournal';
import { filterJournal, journalDate } from '../lib/sanity/journal';
import { journalCopy as copy } from '../data/journal';
import { JournalState } from '../components/layout/JournalState';
const PAGE_SIZE=12;
export default function Journal() {
  const result=useJournal(); const entries=result.data || [];
  const [params,setParams]=useSearchParams(); const search=params.get('q')||''; const topic=params.get('topic')||'';
  const topics=[...new Set(entries.map(e=>e.topic).filter(Boolean))].sort();
  const filtered=filterJournal(entries,topic,search);
  const totalPages=Math.max(1,Math.ceil(filtered.length/PAGE_SIZE));
  const page=Math.min(totalPages,Math.max(1,Number.parseInt(params.get('page')||'1',10)||1));
  const visible=filtered.slice((page-1)*PAGE_SIZE,page*PAGE_SIZE);
  function update(key:string,value:string) {const next=new URLSearchParams(params);if(value)next.set(key,value);else next.delete(key);if(key!=='page')next.delete('page');setParams(next,{replace:key==='q',preventScrollReset:key==='q'});}
  return <section className="journal-page">
    <header className="journal-header"><p className="eyebrow">Notes & discoveries</p><h1>{copy.title}</h1><p>{copy.intro}</p></header>
    <JournalState loading={result.isPending} error={result.isError} retry={()=>void result.refetch()}/>
    {!result.isPending && !result.isError && <>
      {!entries.length ? <div className="journal-state"><h2>{copy.empty}</h2><p>{copy.emptyDescription}</p></div> : <>
        <div className="journal-controls"><label className="project-search"><Search size={18}/><span className="sr-only">{copy.search}</span><input type="search" placeholder="Search titles, topics & notes…" value={search} onChange={e=>update('q',e.target.value)}/></label><label>Topic<select value={topic} onChange={e=>update('topic',e.target.value)}><option value="">{copy.all}</option>{topic && !topics.includes(topic) && <option value={topic}>{topic}</option>}{topics.map(t=><option key={t} value={t}>{t}</option>)}</select></label></div>
        <p className="journal-count" role="status">{filtered.length} {filtered.length===1?'entry':'entries'}</p>
        {!visible.length ? <div className="journal-state"><p>{copy.noMatches}</p><button className="text-link" onClick={()=>setParams({})}>Clear filters</button></div> : <div className="journal-grid">{visible.map(e=><article className="journal-card" key={e.id || e.slug}><div className="journal-meta"><span>{e.topic || 'Learning note'}</span>{e.date && <time dateTime={e.date}>{journalDate(e.date)}</time>}</div><h2><Link to={`/journal/${e.slug}`}>{e.title}</Link></h2><p>{e.excerpt}</p><Link className="text-link" to={`/journal/${e.slug}`} aria-label={`Read ${e.title}`}>Read note<ArrowUpRight size={17}/></Link></article>)}</div>}
        {totalPages>1 && <nav className="journal-pagination" aria-label="Journal pages"><button disabled={page===1} onClick={()=>update('page',String(page-1))}>Previous</button><span>Page {page} of {totalPages}</span><button disabled={page===totalPages} onClick={()=>update('page',String(page+1))}>Next</button></nav>}
      </>}
    </>}
  </section>;
}
