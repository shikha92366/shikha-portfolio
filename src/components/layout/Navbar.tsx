import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useProfile, useSiteSettings } from '../../hooks/useSanityData';
import { interfaceCopy as copy } from '../../data/interface';

export function Navbar() {
  const { data: profile } = useProfile();
  const { data: settings } = useSiteSettings();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => { setOpen(false); }, [location]);
  useEffect(() => {
    const close = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', close); return () => window.removeEventListener('keydown', close);
  }, []);
  const links = [
    { to: '/#work', label: settings.navLabels.work || 'Work' },
    { to: '/#about', label: settings.navLabels.about || 'About' },
    { to: '/#experience', label: settings.navLabels.experience || 'Experience' },
    { to: '/#skills', label: settings.navLabels.skills || 'Skills' },
    { to: '/journal', label: settings.navLabels.journal || 'Journal' },
    { to: '/documentation', label: 'Documentation' },
    { to: '/resume', label: settings.navLabels.resume || 'Resume' },
  ];
  function closeAndScroll(to: string) {
    setOpen(false);
    if (location.pathname === '/' && to.includes('#')) document.getElementById(to.split('#')[1])?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }
  return <header className="site-header">
    <a className="skip-link" href="#main-content" onClick={e => { e.preventDefault(); document.getElementById('main-content')?.focus(); }}>Skip to content</a>
    <div className="site-width nav-inner">
      <Link to="/" className="wordmark" aria-label={`${profile.name} home`}><span className="brand-symbol">{profile.name.charAt(0).toLowerCase()}.</span><span>{profile.name}<small>{copy.brand}</small></span></Link>
      <nav aria-label="Main navigation" className="desktop-nav">{links.map(link => <Link key={link.to} to={link.to} onClick={() => closeAndScroll(link.to)}>{link.label}</Link>)}</nav>
      <Link to="/contact" className="nav-contact">{settings.navLabels.contact || copy.contact}<ArrowUpRight size={16}/></Link>
      <button className="menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X size={22}/> : <Menu size={22}/>}</button>
    </div>
    {open && <nav id="mobile-navigation" aria-label="Mobile navigation" className="mobile-nav site-width">{links.map(link => <Link key={link.to} to={link.to} onClick={() => closeAndScroll(link.to)}>{link.label}<ArrowUpRight size={16}/></Link>)}<Link to="/contact" onClick={() => setOpen(false)}>{copy.contact}<ArrowUpRight size={16}/></Link></nav>}
  </header>;
}
export default Navbar;
