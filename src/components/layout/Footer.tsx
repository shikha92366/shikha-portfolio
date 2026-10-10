import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { profile } from '../../data/profile';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full border-t border-[#233554] bg-[#0a192f] py-12 mt-20 text-[#8892b0] text-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center space-y-5 text-center">
        {/* Social Icons row */}
        <div className="flex items-center space-x-6 text-[#ccd6f6]">
          <a
            href={profile.socials.find((s) => s.label === 'GitHub')?.url || 'https://github.com/shikha92366'}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub Profile"
            className="hover:text-[#64ffda] hover:-translate-y-1 transition-all"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href={profile.socials.find((s) => s.label === 'LinkedIn')?.url || 'https://linkedin.com/in/shikha-shikha-30b9aa325'}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn Profile"
            className="hover:text-[#64ffda] hover:-translate-y-1 transition-all"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Direct Email"
            className="hover:text-[#64ffda] hover:-translate-y-1 transition-all"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>

        {/* Attribution & Copyright */}
        <div className="space-y-1 font-mono text-xs">
          <p className="hover:text-[#64ffda] transition-colors">
            Designed &amp; Built by {profile.name}
          </p>
          <p className="text-[#8892b0]/60">
            ECE Undergraduate • Embedded Systems, Avionics &amp; PCB Design
          </p>
          <p className="text-[#8892b0]/40 text-[11px] pt-1">
            Inspired by gazijarin.com • React 19, TypeScript &amp; Tailwind CSS
          </p>
        </div>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-1.5 text-xs text-[#8892b0] hover:text-[#64ffda] pt-2 transition-colors cursor-pointer"
        >
          <span>Back to top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
}

export default Footer;
