import { ContentStatus } from '../layout/ContentStatus';
import { Download, FileText, ExternalLink, Printer } from 'lucide-react';
import { SectionHeading } from '../layout/SectionHeading';
import { useResume, useProfile, useExperience } from '../../hooks/useSanityData';

export function ResumeViewer() {
  const content = useResume();
  const { data: resume } = content;
  const { data: profile } = useProfile();
  const { data: experience } = useExperience();

  const resumeUrl = resume.url || '/resume.pdf';
  const resumeFilename = resume.title || 'SHIKHA_RESUME.pdf';

  const handlePrint = () => {
    window.print();
  };

  return (
    <ContentStatus loading={content.isLoading} error={content.contentError}>
    <div className="space-y-8">
      <SectionHeading
        title="resume"
        action={
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="p-2 rounded border border-[#263141] bg-[#101722] text-[#9ba7b8] hover:text-[#83b4ff] hover:border-[#83b4ff] transition-colors hidden sm:flex items-center gap-1.5 text-xs font-mono cursor-pointer"
              title="Print document"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            <a
              href={resumeUrl.startsWith('https://cdn.sanity.io/') ? `${resumeUrl}?dl=${encodeURIComponent(resumeFilename)}` : resumeUrl}
              download={resumeFilename}
              target="_blank"
              rel="noreferrer"
              className="btn-mint-outline px-4 py-2 rounded text-xs font-mono inline-flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>
          </div>
        }
      />

      {/* Embedded PDF Object View & Responsive Resume View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive Document Preview */}
        <div className="lg:col-span-7 rounded-xl border border-[#263141] bg-[#101722] overflow-hidden shadow-2xl">
          <div className="p-3 bg-[#080c12] border-b border-[#263141] flex items-center justify-between text-xs font-mono text-[#9ba7b8]">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#83b4ff]" />
              <span className="text-[#eef3fb] font-semibold">{resumeFilename}</span>
            </div>
            <a
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="text-[#83b4ff] hover:underline flex items-center gap-1"
            >
              <span>Full Screen</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="w-full h-[650px] bg-[#080c12]">
            <object
              data={resumeUrl}
              type="application/pdf"
              className="w-full h-full"
            >
              <div className="p-8 text-center space-y-4">
                <p className="text-sm text-[#9ba7b8]">
                  Your browser does not support inline PDF viewing on this viewport.
                </p>
                <a
                  href={resumeUrl}
                  download={resumeFilename}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-mint-outline px-5 py-2 rounded text-xs font-mono inline-block"
                >
                  Download {resumeFilename}
                </a>
              </div>
            </object>
          </div>
        </div>

        {/* Right: Clean Formatted Resume Summary */}
        <div className="lg:col-span-5 rounded-xl border border-[#263141] bg-[#101722] p-6 space-y-6 text-sm">
          <div>
            <h3 className="text-xl font-bold text-[#eef3fb]">{profile.name}</h3>
            <p className="text-xs font-mono text-[#83b4ff] mt-1">{profile.title}</p>
            <p className="text-xs text-[#9ba7b8] mt-1">{profile.location} • {profile.email}</p>
          </div>

          <div className="border-t border-[#263141] pt-4 space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#eef3fb] font-bold">
              Education
            </h4>
            {profile.education.map((edu, idx) => (
              <div key={idx} className="text-xs">
                <span className="font-semibold text-[#eef3fb]">{edu.degree}</span>
                <p className="text-[#9ba7b8]">{edu.school}</p>
                <div className="flex justify-between text-[#9ba7b8]/70 font-mono mt-0.5">
                  <span>{edu.period}</span>
                  <span className="text-[#83b4ff]">Score: {edu.score}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-[#263141] pt-4 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#eef3fb] font-bold">
              Experience Highlights
            </h4>
            {experience.map((exp) => (
              <div key={exp.id} className="text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="font-semibold text-[#eef3fb]">{exp.role}</span>
                </div>
                <p className="text-[#83b4ff]">{exp.company}</p>
                <p className="font-mono text-[#9ba7b8]/70">{exp.startDate} - {exp.endDate}</p>
                <ul className="space-y-1 text-[#9ba7b8] pl-1 pt-1">
                  {exp.bullets.slice(0, 2).map((b, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-[#83b4ff] text-[10px] mt-0.5">▹</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-[#263141] pt-4 space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#eef3fb] font-bold">
              Core Technologies
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {profile.currentTechnologies.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#080c12] text-[#83b4ff] border border-[#263141]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </ContentStatus>
  );
}

export default ResumeViewer;
