import { useState } from 'react';
import { Search, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProjects } from '../../hooks/useSanityData';
import { ContentStatus } from '../layout/ContentStatus';
import { ProjectCard } from '../projects/ProjectCard';
import { interfaceCopy as copy } from '../../data/interface';

export function SelectedWork() {
  const content = useProjects(); const [filter, setFilter] = useState('All projects'); const [search, setSearch] = useState('');
  const items = content.data.filter(p => (filter === 'All projects' || (filter === 'Featured' ? p.featured : p.domain === filter.toLowerCase())) && `${p.title} ${p.shortDescription} ${p.techStack.join(' ')}`.toLowerCase().includes(search.toLowerCase()));
  return <section id="work" className="work-section">
    <div className="section-heading"><div><p className="eyebrow"><span>01</span> Portfolio</p><h2>{copy.work}</h2><p className="section-description">{copy.workIntro}</p></div><Link to="/hardware" className="text-link">Hardware gallery<ArrowUpRight size={17}/></Link></div>
    <div className="work-toolbar"><div className="work-filters" aria-label="Filter projects">{copy.filters.map(f=><button key={f} onClick={()=>setFilter(f)} aria-pressed={filter===f} className={filter===f?'active':''}>{f}{f==='All projects' && <span>{content.data.length}</span>}</button>)}</div><label className="project-search"><Search size={16}/><span className="sr-only">{copy.search}</span><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Find a project…" /></label></div>
    <ContentStatus loading={content.isLoading} error={content.contentError}><div className="work-grid">{items.map((p,i)=><ProjectCard key={p.slug} project={p} variant={i===0 && filter==='All projects' && !search?'feature':'image-top'} />)}</div>{!items.length && <div className="work-empty"><p>{copy.noProjects}</p><button className="text-link" onClick={()=>{setFilter('All projects');setSearch('');}}>Clear filters</button></div>}</ContentStatus>
    <div className="work-end"><span>{items.length} of {content.data.length} projects</span><Link to="/software" className="text-link">Software gallery<ArrowUpRight size={15}/></Link></div>
  </section>;
}
