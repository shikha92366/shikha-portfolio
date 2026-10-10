import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Mail, Github, Linkedin, FileText, Menu, X, Gamepad2 } from 'lucide-react';
import { profile } from '../../data/profile';

interface NavbarProps {
  onToggleGameMode?: () => void;
  gameModeActive?: boolean;
}

export function Navbar({ onToggleGameMode, gameModeActive }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string, pageRoute?: string) => {
    setMobileMenuOpen(false);
    if (pageRoute && location.pathname !== '/' && !pageRoute.startsWith('#')) {
      navigate(pageRoute);
      return;
    }

    if (location.pathname !== '/') {
      navigate(`/#${sectionId}`);
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navLinks = [
    { label: 'Home', sectionId: 'hero', path: '/' },
    { label: 'About', sectionId: 'about', path: '/#about' },
    { label: 'Experience', sectionId: 'experience', path: '/#experience' },
    { label: 'Software', sectionId: 'software', path: '/software' },
    { label: 'Hardware', sectionId: 'hardware', path: '/hardware' },
    { label: 'Achievements', sectionId: 'achievements', path: '/achievements' },
    { label: 'Resume', sectionId: 'resume', path: '/resume' },
    { label: 'Contact', sectionId: 'contact', path: '/contact' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-200 border-b ${
          isScrolled
            ? 'bg-[#0a192f]/95 backdrop-blur-md border-[#233554] shadow-md shadow-[#020c1b]/50'
            : 'bg-[#0a192f] border-[#233554]/50'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Left: Name and Logo */}
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="text-[#ccd6f6] font-semibold text-lg hover:text-[#64ffda] transition-colors flex items-center gap-2"
            >
              <span>{profile.name}</span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-5 text-sm font-medium">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.sectionId, link.path)}
                  className="text-[#ccd6f6] hover:text-[#64ffda] transition-colors cursor-pointer py-1"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Right: Icons + Mobile Toggle */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-3 text-[#ccd6f6]">
              <a
                href={`mailto:${profile.email}`}
                aria-label="Send direct email"
                className="p-1.5 rounded hover:text-[#64ffda] hover:bg-[#112240] transition-colors"
                title="Email Shikha"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href={profile.socials.find((s) => s.label === 'GitHub')?.url || 'https://github.com/shikha92366'}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Profile"
                className="p-1.5 rounded hover:text-[#64ffda] hover:bg-[#112240] transition-colors"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={profile.socials.find((s) => s.label === 'LinkedIn')?.url || 'https://linkedin.com/in/shikha-shikha-30b9aa325'}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn Profile"
                className="p-1.5 rounded hover:text-[#64ffda] hover:bg-[#112240] transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <Link
                to="/resume"
                aria-label="View Resume"
                className="p-1.5 rounded hover:text-[#64ffda] hover:bg-[#112240] transition-colors"
                title="Resume PDF"
              >
                <FileText className="w-4 h-4" />
              </Link>
            </div>

            {/* Mobile Drawer Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded text-[#ccd6f6] hover:text-[#64ffda] hover:bg-[#112240] transition-colors"
              aria-label="Toggle mobile navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0a192f] border-b border-[#233554] px-4 pt-3 pb-6 shadow-2xl">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.sectionId, link.path)}
                  className="text-left text-base font-medium text-[#ccd6f6] hover:text-[#64ffda] hover:bg-[#112240] px-3 py-2 rounded transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </nav>
            <div className="mt-4 pt-4 border-t border-[#233554] flex items-center justify-around text-[#ccd6f6]">
              <a
                href={`mailto:${profile.email}`}
                className="p-2 rounded hover:text-[#64ffda] hover:bg-[#112240]"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href={profile.socials.find((s) => s.label === 'GitHub')?.url || 'https://github.com/shikha92366'}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded hover:text-[#64ffda] hover:bg-[#112240]"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={profile.socials.find((s) => s.label === 'LinkedIn')?.url || 'https://linkedin.com/in/shikha-shikha-30b9aa325'}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded hover:text-[#64ffda] hover:bg-[#112240]"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <Link
                to="/resume"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded hover:text-[#64ffda] hover:bg-[#112240]"
                aria-label="Resume"
              >
                <FileText className="w-5 h-5" />
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* "Game Mode" Pill below navbar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 flex items-center justify-between">
        <button
          onClick={onToggleGameMode}
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider border transition-all cursor-pointer ${
            gameModeActive
              ? 'border-[#64ffda] text-[#64ffda] bg-[#64ffda]/10 shadow-[0_0_12px_rgba(100,255,218,0.3)]'
              : 'border-[#233554] text-[#8892b0] hover:text-[#64ffda] hover:border-[#64ffda]/60 bg-[#112240]/40'
          }`}
          title="Toggle Interactive Circuit & Game Mode"
        >
          <span
            className={`w-2 h-2 rounded-full ${
              gameModeActive ? 'bg-[#64ffda] animate-ping' : 'bg-[#64ffda]/50'
            }`}
          />
          <Gamepad2 className="w-3 h-3 text-[#64ffda]" />
          <span>GAME MODE {gameModeActive ? '[ON]' : '[OFF]'}</span>
        </button>

        <div className="text-[11px] font-mono text-[#8892b0]/70 hidden sm:block">
          STATUS: <span className="text-[#64ffda]">TELEMETRY ACTIVE</span> • IN-SPACE 2024-25
        </div>
      </div>
    </>
  );
}

export default Navbar;
