import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProfile } from '../../hooks/useSanityData';
import { interfaceCopy as copy } from '../../data/interface';
export function Footer() {
  const {data:profile}=useProfile();
  return <footer className="site-footer"><div className="site-width"><div className="footer-top"><div><p className="eyebrow">{copy.footer}</p><a href={`mailto:${profile.email}`} className="footer-invitation">{copy.footerLink}<ArrowUpRight/></a></div><div className="footer-links"><Link to="/journal">Learning journal<ArrowUpRight size={14}/></Link><Link to="/resume">Resume<ArrowUpRight size={15}/></Link>{profile.socials.filter(s=>s.icon!=='mail').map(s=><a key={s.url} href={s.url} target="_blank" rel="noreferrer">{s.label}<ArrowUpRight size={15}/></a>)}</div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} {profile.name}</span><span>{profile.location}</span><button onClick={()=>window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})}>Back to top<ArrowUp size={14}/></button></div></div></footer>;
}
export default Footer;
