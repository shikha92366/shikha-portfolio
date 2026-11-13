import { ArrowDown, ArrowUpRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProfile, useProjects, useAchievements } from '../../hooks/useSanityData';
import { ContentStatus } from '../layout/ContentStatus';
import { interfaceCopy as copy } from '../../data/interface';

export function Hero() {
  const content = useProfile(); const { data: profile } = content;
  const { data: projects } = useProjects(); const { data: achievements } = useAchievements();
  const spotlight = projects.find(p => p.featured) || projects[0];
  return <section id="hero" className="editorial-hero">
    <ContentStatus loading={content.isLoading} error={content.contentError}>
      <div className="hero-topline"><span className="eyebrow"><span className="tiny-square"/>{copy.heroLabel}</span><span className="location"><MapPin size={13}/>{profile.location}</span></div>
      <div className="hero-grid">
        <div className="hero-copy"><p className="hero-greeting">{profile.greeting}</p><h1>{profile.name}<span>.</span></h1><h2>{profile.title}</h2><p className="hero-intro">{profile.intro}</p>
          <div className="hero-actions"><Link to="/#work" className="primary-link">{copy.viewWork}<ArrowDown size={17}/></Link><Link to="/resume" className="text-link">{copy.resume}<ArrowUpRight size={17}/></Link></div>
        </div>
        {profile.photo ? <figure className="hero-visual"><img src={profile.photo} alt={profile.photoAlt || profile.name} width={600} height={620}/><figcaption><span>{profile.name}</span><span>{profile.location}</span></figcaption></figure> : spotlight && <Link to={`/projects/${spotlight.slug}`} className="hero-visual" aria-label={`View ${spotlight.title}`}><div className="visual-label"><span>{copy.projectLabel}</span><span>01 / {String(projects.length).padStart(2,'0')}</span></div><img src={spotlight.coverImage} alt={spotlight.coverImageAlt || spotlight.title} width={600} height={620}/><div className="visual-caption"><span>{spotlight.title}</span><span className="circle-arrow"><ArrowUpRight size={23}/></span></div></Link>}
      </div>
      <div className="hero-bottom"><div><strong>{String(projects.length).padStart(2,'0')}</strong><span>Projects documented</span></div><div><strong>{String(achievements.filter(a=>a.type==='award').length).padStart(2,'0')}</strong><span>Awards & recognition</span></div><div className="hero-disciplines">{profile.currentTechnologies.slice(0,4).map(t=><span key={t}>{t}</span>)}</div></div>
    </ContentStatus>
  </section>;
}
export default Hero;
