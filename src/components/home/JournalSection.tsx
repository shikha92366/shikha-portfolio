import { Link } from 'react-router-dom';
import { ArrowUpRight, BookOpen } from 'lucide-react';
import { journalCopy as copy } from '../../data/journal';
export function JournalSection() {
  return <section className="journal-home" aria-labelledby="journal-home-title"><div><p className="eyebrow"><BookOpen size={14}/>{copy.homeLabel}</p><h2 id="journal-home-title">{copy.title}</h2><p>{copy.intro}</p></div><Link className="primary-link" to="/journal">{copy.homeLink}<ArrowUpRight size={18}/></Link></section>;
}
