import { SectionHeading } from '../layout/SectionHeading';
import { profile } from '../../data/profile';
import { Cpu, Award, Zap } from 'lucide-react';

export function AboutSection() {
  return (
    <section id="about" className="py-16 sm:py-24">
      <SectionHeading title="about me" />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Bio copy and Tech List */}
        <div className="md:col-span-7 space-y-5 text-base sm:text-lg leading-relaxed text-[#8892b0]">
          <p>
            I'm an Electronics &amp; Communication Engineering student at{' '}
            <span className="text-[#64ffda] font-medium">PSIT Kanpur</span> working on embedded
            systems, avionics and PCB design.
          </p>

          <p>
            I'm part of{' '}
            <span className="text-[#64ffda] font-medium">PSIT Vyomnauts</span>, where I build flight
            computers, telemetry and sensor systems for national-level aerospace competitions, and I
            interned in electrical testing &amp; validation at{' '}
            <span className="text-[#64ffda] font-medium">
              Raman Research &amp; Innovation
            </span>
            .
          </p>

          <div className="pt-2">
            <p className="text-[#ccd6f6] font-medium text-base mb-3">
              Here are some technologies I have been working with:
            </p>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm font-mono">
              {profile.currentTechnologies.map((tech) => (
                <li key={tech} className="flex items-center space-x-2 text-[#ccd6f6]">
                  <span className="text-[#64ffda] text-xs">▹</span>
                  <span>{tech}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="pt-2 text-sm sm:text-base text-[#8892b0]">
            Outside of building hardware, I teach IoT and robotics workshops to students.
          </p>
        </div>

        {/* Right Column: Stylized Portrait & Hardware Engineering Badge */}
        <div className="md:col-span-5 flex flex-col items-center">
          <div className="relative group w-full max-w-[320px]">
            {/* Ambient accent border effect */}
            <div className="absolute -inset-1 rounded-2xl bg-[#64ffda]/20 blur-sm opacity-60 group-hover:opacity-100 transition-opacity" />

            <div className="relative rounded-xl border border-[#233554] bg-[#112240] p-4 text-center overflow-hidden">
              {/* Graphic container with circuit / schematic backdrop */}
              <div className="w-full aspect-square rounded-lg bg-[#0a192f] border border-[#233554] flex flex-col items-center justify-center p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-circuit-grid opacity-30 pointer-events-none" />
                <div className="w-24 h-24 rounded-full border-2 border-[#64ffda] bg-[#112240] flex items-center justify-center text-[#64ffda] mb-4 shadow-[0_0_20px_rgba(100,255,218,0.2)]">
                  <Cpu className="w-12 h-12" />
                </div>
                <h3 className="text-lg font-bold text-[#ccd6f6]">{profile.name}</h3>
                <p className="text-xs font-mono text-[#64ffda] mt-1">Avionics &amp; Embedded Dev</p>
                <div className="mt-4 flex items-center gap-2 text-[11px] font-mono text-[#8892b0] bg-[#112240] px-3 py-1.5 rounded-full border border-[#233554]">
                  <Award className="w-3.5 h-3.5 text-[#64ffda]" />
                  <span>2nd Prize IN-SPACe Rocketry</span>
                </div>
              </div>

              {/* Education details */}
              <div className="mt-4 text-left border-t border-[#233554]/70 pt-3 text-xs space-y-1.5">
                <div className="flex items-center gap-1.5 text-[#ccd6f6] font-semibold">
                  <Zap className="w-3.5 h-3.5 text-[#64ffda]" />
                  <span>B.Tech in ECE (2023 - Present)</span>
                </div>
                <p className="text-[#8892b0] pl-5">PSIT Kanpur • Score: 78.6%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
