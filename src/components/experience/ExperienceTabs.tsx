import { useState } from 'react';
import { SectionHeading } from '../layout/SectionHeading';
import { experience } from '../../data/experience';

export function ExperienceTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const currentExp = experience[activeTab] || experience[0];

  return (
    <section id="experience" className="py-16 sm:py-24">
      <SectionHeading title="experience" />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Column: Vertical tab list (horizontal on mobile) */}
        <div className="md:col-span-4 flex md:flex-col overflow-x-auto md:overflow-visible border-b md:border-b-0 md:border-l border-[#233554] pb-2 md:pb-0 scrollbar-none">
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
                    ? 'text-[#64ffda] bg-[#112240] md:border-l-2 md:-ml-[2px] md:border-[#64ffda] border-b-2 md:border-b-0 border-[#64ffda]'
                    : 'text-[#8892b0] hover:text-[#ccd6f6] hover:bg-[#112240]/40'
                }`}
              >
                <span>{shortName}</span>
              </button>
            );
          })}
        </div>

        {/* Right Column: Detail Panel */}
        <div className="md:col-span-8 bg-[#112240] p-6 sm:p-8 rounded-lg border border-[#233554] min-h-[300px]">
          <h3 className="text-lg sm:text-xl font-bold text-[#ccd6f6]">
            {currentExp.role}{' '}
            <span className="text-[#64ffda]">@ {currentExp.company}</span>
          </h3>

          <p className="font-mono text-xs uppercase tracking-wider text-[#8892b0] mt-1 mb-6">
            {currentExp.startDate} — {currentExp.endDate}
          </p>

          <ul className="space-y-3.5 text-sm sm:text-base text-[#8892b0]">
            {currentExp.bullets.map((bullet, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-[#64ffda] text-xs mt-1 shrink-0">▹</span>
                <span className="leading-relaxed">{bullet}</span>
              </li>
            ))}
          </ul>

          {currentExp.techStack && currentExp.techStack.length > 0 && (
            <div className="mt-8 pt-4 border-t border-[#233554]/70 flex flex-wrap gap-2 items-center">
              <span className="text-[11px] font-mono text-[#8892b0] uppercase tracking-wider mr-1">
                Domain Stack:
              </span>
              {currentExp.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded text-xs font-mono bg-[#0a192f] text-[#64ffda] border border-[#233554]"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ExperienceTabs;
