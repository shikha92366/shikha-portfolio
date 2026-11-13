import { ContentStatus } from '../components/layout/ContentStatus';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';
import { PortableText } from '@portabletext/react';
import { portableTextComponents } from '../lib/sanity/mappers';
import { useProjects, useProject, useDocumentation } from '../hooks/useSanityData';
import {
  ArrowLeft,
  Github,
  ExternalLink,
  Cpu,
  Radio,
  Layers,
  Award,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  Clock,
  User,
} from 'lucide-react';
import { ProjectDocs } from '../components/projects/ProjectDocs';
import { ProjectGallery } from '../components/projects/ProjectGallery';

export function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const { data: allProjects } = useProjects();
  const { data: project, isLoading, contentError } = useProject(slug);
  const { data: documentation = [] } = useDocumentation();
  const linkedDocuments = documentation.filter(document => document.project?.slug === slug);

  const currentIndex = allProjects.findIndex((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8 animate-pulse">
        <div className="h-4 w-16 bg-[#101722] rounded" />
        <div className="space-y-4">
          <div className="h-10 w-3/4 bg-[#101722] rounded" />
          <div className="h-5 w-full bg-[#101722] rounded" />
          <div className="flex gap-2">
            <div className="h-6 w-20 bg-[#101722] rounded" />
            <div className="h-6 w-24 bg-[#101722] rounded" />
            <div className="h-6 w-16 bg-[#101722] rounded" />
          </div>
        </div>
        <div className="aspect-video w-full bg-[#101722] rounded-xl border border-[#263141]" />
        <div className="space-y-3">
          <div className="h-6 w-48 bg-[#101722] rounded" />
          <div className="h-20 w-full bg-[#101722] rounded" />
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-6">
        <h1 className="text-3xl font-bold text-[#eef3fb]">Project Not Found</h1>
        <p className="text-[#9ba7b8]">
          The project specification you are looking for does not exist or has been relocated.
        </p>
        <Link
          to="/"
          className="btn-mint-outline px-6 py-2.5 rounded text-sm font-mono inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Homepage</span>
        </Link>
      </div>
    );
  }

  // Previous and next projects
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject =
    currentIndex >= 0 && currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Back button */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="text-xs font-mono text-[#9ba7b8] hover:text-[#83b4ff] inline-flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>
      </div>

      {/* 1. Header: Title, one-line description, tech tags, role, timeline, GitHub/Demo buttons */}
      <div className="space-y-4">
        {project.awards && project.awards.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.awards.map((award, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-[#83b4ff]/10 text-[#83b4ff] border border-[#83b4ff]/40"
              >
                <Award className="w-3.5 h-3.5" />
                <span>{award}</span>
              </span>
            ))}
          </div>
        )}

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#eef3fb] tracking-tight">
          {project.title}
        </h1>

        <p className="text-lg text-[#9ba7b8] leading-relaxed">
          {project.shortDescription}
        </p>

        {/* Uppercase tech tags */}
        <div className="flex flex-wrap gap-2 pt-1">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded text-xs font-mono uppercase tracking-wider bg-[#101722] text-[#83b4ff] border border-[#263141]"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Metadata bar & action links */}
        <div className="pt-4 border-t border-[#263141] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#9ba7b8]">
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#83b4ff]" />
              <span>Role: <strong className="text-[#eef3fb]">{project.role}</strong></span>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#83b4ff]" />
              <span>Timeline: <strong className="text-[#eef3fb]">{project.timeline}</strong></span>
            </span>
            {project.team && (
              <span className="text-[#eef3fb]/80 bg-[#101722] px-2 py-0.5 rounded border border-[#263141]">
                {project.team}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-mint-outline px-4 py-1.5 rounded text-xs font-mono inline-flex items-center gap-1.5"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Code Repository</span>
              </a>
            )}
            {project.videoUrl && (
              <a href={project.videoUrl} target="_blank" rel="noreferrer" className="p-1.5 rounded border border-[#263141] hover:text-[#83b4ff] hover:border-[#83b4ff] transition-colors inline-flex items-center gap-1 text-xs font-mono">
                <ExternalLink className="w-3.5 h-3.5" /><span>Video</span>
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded border border-[#263141] hover:text-[#83b4ff] hover:border-[#83b4ff] transition-colors inline-flex items-center gap-1 text-xs font-mono"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </div>
      </div>

      <ContentStatus error={contentError} />
      {/* 2. Cover image or video */}
      {project.coverImage && (
        <div className="relative aspect-video rounded-xl overflow-hidden border border-[#263141] bg-[#080c12] shadow-2xl">
          <img
            src={project.coverImage}
            alt={project.coverImageAlt || project.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-circuit-grid opacity-20 pointer-events-none" />
        </div>
      )}

      {/* 3. Overview (problem and goal) */}
      {project.overview && (
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#eef3fb] flex items-center gap-2">
            <span className="text-[#83b4ff] font-mono">/</span>
            <span>Problem &amp; System Overview</span>
          </h2>
          <div className="text-base text-[#9ba7b8] leading-relaxed prose prose-invert max-w-none">
            {Array.isArray(project.overview) ? (
              <PortableText value={project.overview} components={portableTextComponents} />
            ) : (
              <ReactMarkdown rehypePlugins={[rehypeSanitize]}>
                {project.overview}
              </ReactMarkdown>
            )}
          </div>
        </div>
      )}

      {/* 4. Architecture / block diagram */}
      {project.architecture && (
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#eef3fb] flex items-center gap-2">
            <span className="text-[#83b4ff] font-mono">/</span>
            <span>System Architecture &amp; Telemetry Pipeline</span>
          </h2>
          <div className="p-4 rounded-xl border border-[#263141] bg-[#101722] overflow-hidden">
            <img
              src={project.architecture}
              alt={project.architectureAlt || `${project.title} block diagram`}
              loading="lazy" width={1200} height={675}
              className="w-full h-auto rounded max-h-[500px] object-contain mx-auto"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <p className="text-xs font-mono text-center text-[#9ba7b8] mt-3">
              Telemetry and Hardware Block Diagram
            </p>
          </div>
        </div>
      )}

      {/* 5. Hardware details table for hardware projects */}
      {project.hardwareDetails && (
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#eef3fb] flex items-center gap-2">
            <span className="text-[#83b4ff] font-mono">/</span>
            <span>Hardware Specifications &amp; Circuit Specs</span>
          </h2>

          <div className="border border-[#263141] rounded-xl overflow-hidden bg-[#101722]">
            <div className="divide-y divide-[#263141]">
              {project.hardwareDetails.mcu && (
                <div className="grid grid-cols-1 sm:grid-cols-4 p-4 gap-2">
                  <div className="text-xs font-mono text-[#83b4ff] flex items-center gap-2">
                    <Cpu className="w-4 h-4" />
                    <span>MCU / Controller:</span>
                  </div>
                  <div className="sm:col-span-3 text-sm text-[#eef3fb]">
                    {project.hardwareDetails.mcu}
                  </div>
                </div>
              )}

              {project.hardwareDetails.sensors && project.hardwareDetails.sensors.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-4 p-4 gap-2">
                  <div className="text-xs font-mono text-[#83b4ff] flex items-center gap-2">
                    <Layers className="w-4 h-4" />
                    <span>Sensors:</span>
                  </div>
                  <div className="sm:col-span-3 text-sm text-[#eef3fb] flex flex-wrap gap-2">
                    {project.hardwareDetails.sensors.map((s, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded text-xs font-mono bg-[#080c12] text-[#eef3fb] border border-[#263141]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {project.hardwareDetails.communication &&
                project.hardwareDetails.communication.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-4 p-4 gap-2">
                    <div className="text-xs font-mono text-[#83b4ff] flex items-center gap-2">
                      <Radio className="w-4 h-4" />
                      <span>Telemetry / Comms:</span>
                    </div>
                    <div className="sm:col-span-3 text-sm text-[#eef3fb] flex flex-wrap gap-2">
                      {project.hardwareDetails.communication.map((c, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded text-xs font-mono bg-[#080c12] text-[#83b4ff] border border-[#263141]"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              {project.hardwareDetails.pcbSpecs && (
                <div className="grid grid-cols-1 sm:grid-cols-4 p-4 gap-2">
                  <div className="text-xs font-mono text-[#83b4ff] flex items-center gap-2">
                    <Layers className="w-4 h-4" />
                    <span>PCB Layout Specs:</span>
                  </div>
                  <div className="sm:col-span-3 text-sm text-[#eef3fb]">
                    {project.hardwareDetails.pcbSpecs}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 6. Implementation */}
      {project.implementation && (
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#eef3fb] flex items-center gap-2">
            <span className="text-[#83b4ff] font-mono">/</span>
            <span>Implementation &amp; Firmware Design</span>
          </h2>
          <div className="text-base text-[#9ba7b8] leading-relaxed prose prose-invert max-w-none">
            {Array.isArray(project.implementation) ? (
              <PortableText value={project.implementation} components={portableTextComponents} />
            ) : (
              <ReactMarkdown rehypePlugins={[rehypeSanitize]}>
                {project.implementation}
              </ReactMarkdown>
            )}
          </div>
        </div>
      )}

      {/* 7. Results (metrics as highlighted stat cards) */}
      {project.results && project.results.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#eef3fb] flex items-center gap-2">
            <span className="text-[#83b4ff] font-mono">/</span>
            <span>Measurable Outcomes &amp; Validations</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {project.results.map((res, i) => (
              <div
                key={i}
                className="p-5 rounded-xl border border-[#263141] bg-[#101722] flex items-start gap-3.5"
              >
                <div className="p-1 rounded bg-[#080c12] text-[#83b4ff] mt-0.5 shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <p className="text-sm text-[#eef3fb] leading-relaxed">{res}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 8. Challenges and solutions */}
      {project.challenges && project.challenges.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#eef3fb] flex items-center gap-2">
            <span className="text-[#83b4ff] font-mono">/</span>
            <span>Engineering Challenges &amp; Mitigations</span>
          </h2>
          <div className="space-y-3">
            {project.challenges.map((chal, i) => (
              <div
                key={i}
                className="p-4 rounded-xl border border-[#263141] bg-[#101722] flex items-start gap-3.5"
              >
                <div className="p-1 rounded bg-[#080c12] text-amber-400 mt-0.5 shrink-0">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <p className="text-sm text-[#9ba7b8] leading-relaxed">{chal}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 9. Gallery with lightbox */}
      {project.gallery && project.gallery.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#eef3fb] flex items-center gap-2">
            <span className="text-[#83b4ff] font-mono">/</span>
            <span>Hardware Gallery &amp; PCB Layouts</span>
          </h2>
          <ProjectGallery images={project.gallery} projectTitle={project.title} metadata={project.galleryMetadata} />
        </div>
      )}

      {/* 10. Documents list */}
      {project.documents && project.documents.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#eef3fb] flex items-center gap-2">
            <span className="text-[#83b4ff] font-mono">/</span>
            <span>Documentation &amp; Design Artifacts</span>
          </h2>
          <ProjectDocs documents={project.documents} />
        </div>
      )}

      {linkedDocuments.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#eef3fb] flex items-center gap-2">
            <span className="text-[#83b4ff] font-mono">/</span>
            <span>Public Technical Documents</span>
          </h2>
          <div className="documentation-grid">
            {linkedDocuments.map(document => (
              <article className="documentation-card" key={document.id}>
                <div className="journal-meta"><span>{document.category}</span></div>
                <h3>{document.title}</h3>
                {document.description && <p>{document.description}</p>}
                <a className="documentation-download" href={document.url} download={document.filename} target="_blank" rel="noreferrer">
                  Download <span>{document.filename}</span>
                </a>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* 11. Previous / Next Project Navigation */}
      <div className="pt-10 border-t border-[#263141] flex items-center justify-between gap-4">
        {prevProject ? (
          <Link
            to={`/projects/${prevProject.slug}`}
            className="group flex flex-col items-start text-xs font-mono text-[#9ba7b8] hover:text-[#83b4ff] transition-colors"
          >
            <span className="flex items-center gap-1 text-[11px] uppercase">
              <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              Previous Project
            </span>
            <span className="text-sm font-bold text-[#eef3fb] group-hover:text-[#83b4ff] mt-1">
              {prevProject.title}
            </span>
          </Link>
        ) : (
          <div />
        )}

        {nextProject ? (
          <Link
            to={`/projects/${nextProject.slug}`}
            className="group flex flex-col items-end text-xs font-mono text-[#9ba7b8] hover:text-[#83b4ff] transition-colors text-right"
          >
            <span className="flex items-center gap-1 text-[11px] uppercase">
              Next Project
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
            <span className="text-sm font-bold text-[#eef3fb] group-hover:text-[#83b4ff] mt-1">
              {nextProject.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}

export default ProjectPage;
