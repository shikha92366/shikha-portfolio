import { profile as localProfile } from '../data/profile';
import { ContentStatus } from '../components/layout/ContentStatus';
import { SectionHeading } from '../components/layout/SectionHeading';
import { useProfile } from '../hooks/useSanityData';
import { GraduationCap, Cpu, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export function About() {
  const content = useProfile();
  const { data: profile } = content;
  return (
    <ContentStatus loading={content.isLoading} error={content.contentError}>
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      <SectionHeading title="about me" />

      {/* Main Narrative */}
      <div className="p-6 sm:p-8 rounded-xl bg-[#101722] border border-[#263141] space-y-6 text-[#9ba7b8] text-base sm:text-lg leading-relaxed">
        {profile.intro !== localProfile.intro ? <p>{profile.intro}</p> : (<p>
          I'm an Electronics &amp; Communication Engineering student at{' '}
          <span className="text-[#83b4ff] font-medium">PSIT Kanpur</span> working on embedded
          systems, avionics and PCB design.
        </p>)}

        <p>
          I'm part of{' '}
          <span className="text-[#83b4ff] font-medium">PSIT Vyomnauts</span>, where I build flight
          computers, telemetry and sensor systems for national-level aerospace competitions, and I
          interned in electrical testing &amp; validation at{' '}
          <span className="text-[#83b4ff] font-medium">
            Raman Research &amp; Innovation
          </span>
          .
        </p>

        <p>
          Outside of building hardware, I teach IoT and robotics workshops to students.
        </p>
      </div>

      {/* Technologies */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-[#eef3fb] flex items-center gap-2">
          <Cpu className="w-5 h-5 text-[#83b4ff]" />
          <span>Core Engineering Toolchain</span>
        </h3>
        <div className="p-6 rounded-xl bg-[#101722] border border-[#263141]">
          <ul className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm font-mono text-[#eef3fb]">
            {profile.currentTechnologies.map((tech) => (
              <li key={tech} className="flex items-center gap-2">
                <span className="text-[#83b4ff] text-xs">▹</span>
                <span>{tech}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Education Timeline */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-[#eef3fb] flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-[#83b4ff]" />
          <span>Academic Background</span>
        </h3>

        <div className="space-y-3">
          {profile.education.map((edu, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-[#101722] border border-[#263141] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div>
                <h4 className="text-base font-bold text-[#eef3fb]">{edu.school}</h4>
                <p className="text-sm text-[#83b4ff] mt-0.5">{edu.degree}</p>
              </div>

              <div className="flex sm:flex-col sm:items-end text-xs font-mono text-[#9ba7b8] gap-4 sm:gap-1">
                <span>{edu.period}</span>
                <span className="px-2 py-0.5 rounded bg-[#080c12] text-[#83b4ff] border border-[#263141]">
                  Score: {edu.score}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Engineering Philosophy & Community */}
      <div className="p-6 rounded-xl bg-[#101722] border border-[#263141] space-y-4">
        <h3 className="text-lg font-bold text-[#eef3fb] flex items-center gap-2">
          <Heart className="w-4 h-4 text-[#83b4ff]" />
          <span>Mentorship &amp; Community Teaching</span>
        </h3>
        <p className="text-sm text-[#9ba7b8] leading-relaxed">
          I believe hands-on tinkering is the fastest way to master electronics. Over the past year, I've conducted hands-on workshops instructing over 40+ engineering students in microcontroller programming, sensor interfacing, and building their very first IoT cloud telemetry circuits.
        </p>
        <div className="pt-2">
          <Link
            to="/contact"
            className="btn-mint-outline px-5 py-2 rounded text-xs font-mono inline-block"
          >
            Get in touch →
          </Link>
        </div>
      </div>
    </div>
    </ContentStatus>
  );
}

export default About;
