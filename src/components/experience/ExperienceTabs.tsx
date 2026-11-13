import { ContentStatus } from '../layout/ContentStatus';
import { useState } from 'react';
import { SectionHeading } from '../layout/SectionHeading';
import { useExperience } from '../../hooks/useSanityData';
import { ImageLightbox } from '../projects/ImageLightbox';

export function ExperienceTabs() {
  const content = useExperience();
  const { data: experience } = content;
  const [activeTab, setActiveTab] = useState(0);
  const [activeImage, setActiveImage] = useState<{ src: string; alt: string; caption?: string } | null>(null);
  const currentExp = experience[activeTab] || experience[0];

  if (!currentExp) return <section id="experience" className="py-16 sm:py-24"><SectionHeading title="experience" /><ContentStatus loading={content.isLoading} error={content.contentError} empty /></section>;

  return (
    <ContentStatus loading={content.isLoading} error={content.contentError}>
    <section id="experience" className="py-16 sm:py-24">
      <SectionHeading title="experience" />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Column: Vertical tab list (horizontal on mobile) */}
        <div className="md:col-span-4 flex md:flex-col overflow-x-auto md:overflow-visible border-b md:border-b-0 md:border-l border-[#263141] pb-2 md:pb-0 scrollbar-none">
          {experience.map((exp, idx) => {
            const isActive = idx === activeTab;
            // Shortened company name for tab display if too long
            const shortName = exp.company.split('(')[0].replace('Pvt. Ltd.', '').trim();

            return (
              <button
                key={exp.id}
                onClick={() => setActiveTab(idx)}
                className={`text-left px-4 py-3 text-xs sm:text-sm font-mono transition-all whitespace-nowrap cursor-pointer relative ${
                  isActive
                    ? 'text-[#83b4ff] bg-[#101722] md:border-l-2 md:-ml-[2px] md:border-[#83b4ff] border-b-2 md:border-b-0 border-[#83b4ff]'
                    : 'text-[#9ba7b8] hover:text-[#eef3fb] hover:bg-[#101722]/40'
                }`}
              >
                <span>{shortName}</span>
              </button>
            );
          })}
        </div>

        {/* Right Column: Detail Panel */}
        <div className="md:col-span-8 bg-[#101722] p-6 sm:p-8 rounded-lg border border-[#263141] min-h-[300px]">
          <h3 className="text-lg sm:text-xl font-bold text-[#eef3fb] break-words">
            {currentExp.role}{' '}
            <span className="text-[#83b4ff]">@ {currentExp.company}</span>
          </h3>

          {(currentExp.duration || currentExp.startDate || currentExp.endDate) && <p className="font-mono text-xs uppercase tracking-wider text-[#9ba7b8] mt-1 mb-5">
            {currentExp.duration || [currentExp.startDate, currentExp.endDate].filter(Boolean).join(' — ')}
          </p>}

          <div className={currentExp.images?.length ? 'grid grid-cols-1 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-5 md:gap-6 items-start' : ''}>
            <ul className="space-y-3 text-sm text-[#9ba7b8]">
              {currentExp.bullets.map((bullet, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-[#83b4ff] text-xs mt-1 shrink-0">▹</span>
                  <span className="leading-relaxed">{bullet}</span>
                </li>
              ))}
            </ul>

            {currentExp.images && currentExp.images.length > 0 && <div>
              <h4 className="text-[11px] font-mono uppercase tracking-wider text-[#9ba7b8] mb-2">Workshop photographs</h4>
              <div className="grid grid-cols-2 gap-2.5">
                {currentExp.images.map((image) => (
                  <button
                    key={image.src}
                    type="button"
                    onClick={() => setActiveImage(image)}
                    aria-label={`Expand image: ${image.caption || image.alt}`}
                    className="group relative aspect-[4/3] overflow-hidden rounded-md border border-[#263141] bg-[#080c12] text-left hover:border-[#83b4ff]/60 transition-colors"
                  >
                    <img src={image.src} alt={image.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    <span className="absolute inset-x-0 bottom-0 bg-[#080c12]/75 px-2 py-1.5 text-[10px] leading-snug text-[#eef3fb]">{image.caption}</span>
                  </button>
                ))}
              </div>
            </div>}
          </div>

          {currentExp.techStack && currentExp.techStack.length > 0 && (
            <div className="mt-8 pt-4 border-t border-[#263141]/70 flex flex-wrap gap-2 items-center">
              <span className="text-[11px] font-mono text-[#9ba7b8] uppercase tracking-wider mr-1">
                Domain Stack:
              </span>
              {currentExp.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded text-xs font-mono bg-[#080c12] text-[#83b4ff] border border-[#263141]"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      {activeImage && <ImageLightbox src={activeImage.src} alt={activeImage.alt} caption={activeImage.caption} onClose={() => setActiveImage(null)} />}
    </section>
    </ContentStatus>
  );
}

export default ExperienceTabs;
