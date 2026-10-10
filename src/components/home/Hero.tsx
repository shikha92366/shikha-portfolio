import { Mail, ArrowDown } from 'lucide-react';
import { profile } from '../../data/profile';
import { AsciiPortrait } from './AsciiPortrait';

export function Hero() {
  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-[85vh] flex items-center justify-center py-12 sm:py-20">
      <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Animated ASCII Dot-matrix Portrait */}
        <div className="md:col-span-5 flex justify-center order-2 md:order-1">
          <AsciiPortrait />
        </div>

        {/* Right Column: Conversational Greeting, Intro, and CTA */}
        <div className="md:col-span-7 flex flex-col justify-center order-1 md:order-2 space-y-6">
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#ccd6f6] leading-tight">
              hi, <span className="text-[#64ffda]">{profile.name.toLowerCase()}</span> here.
            </h1>
            <p className="text-lg sm:text-xl font-medium text-[#ccd6f6]/90">
              {profile.title}
            </p>
          </div>

          <p className="text-base sm:text-lg text-[#8892b0] leading-relaxed max-w-xl">
            {profile.intro}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              onClick={scrollToContact}
              className="btn-mint-outline px-7 py-3 rounded text-sm font-mono tracking-wide inline-flex items-center gap-2.5 group cursor-pointer"
            >
              <Mail className="w-4 h-4 text-[#64ffda] group-hover:scale-110 transition-transform" />
              <span>Say hi!</span>
            </a>

            <a
              href="#about"
              className="text-xs font-mono text-[#8892b0] hover:text-[#64ffda] inline-flex items-center gap-1.5 transition-colors cursor-pointer py-2 px-3"
            >
              <span>Explore portfolio</span>
              <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
