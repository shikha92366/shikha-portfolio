import { Link } from 'react-router-dom';
import { Folder, Github, ExternalLink, ArrowRight } from 'lucide-react';
import { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
  variant?: 'folder' | 'image-top';
}

export function ProjectCard({ project, variant = 'folder' }: ProjectCardProps) {
  if (variant === 'image-top') {
    return (
      <div className="panel-card rounded-xl overflow-hidden flex flex-col group h-full">
        {/* Top Image / PCB Render */}
        <Link
          to={`/projects/${project.slug}`}
          className="relative aspect-video w-full bg-[#0a192f] overflow-hidden border-b border-[#233554] block"
        >
          <div className="absolute inset-0 bg-circuit-grid opacity-30" />
          {project.coverImage ? (
            <img
              src={project.coverImage}
              alt={project.title}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
              onError={(e) => {
                // If local image fails, show schematic graphic placeholder
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          ) : null}

          {/* Status badge overlay */}
          <div className="absolute top-3 left-3">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-[#0a192f]/80 text-[#64ffda] border border-[#64ffda]/30 backdrop-blur-sm">
              {project.category}
            </span>
          </div>
        </Link>

        {/* Card Body */}
        <div className="p-6 flex flex-col flex-grow justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <h3 className="text-lg font-bold text-[#ccd6f6] group-hover:text-[#64ffda] transition-colors">
                <Link to={`/projects/${project.slug}`}>{project.title}</Link>
              </h3>
              <div className="flex items-center gap-2">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#8892b0] hover:text-[#64ffda] transition-colors"
                    title="Source Repository"
                    aria-label={`GitHub repository for ${project.title}`}
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            <p className="text-sm text-[#8892b0] mb-4 leading-relaxed line-clamp-3">
              {project.shortDescription}
            </p>
          </div>

          <div>
            <div className="flex flex-wrap gap-x-2.5 gap-y-1 mb-4 pt-2 border-t border-[#233554]/50">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-[11px] font-mono uppercase tracking-wider text-[#8892b0]"
                >
                  {tech}
                </span>
              ))}
            </div>

            <Link
              to={`/projects/${project.slug}`}
              className="text-xs font-mono text-[#64ffda] inline-flex items-center gap-1 group-hover:gap-2 transition-all"
            >
              <span>Documentation &amp; Specs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Gazijarin style "folder" card:
  return (
    <div className="panel-card rounded-xl p-6 flex flex-col justify-between group h-full">
      <div>
        {/* Top Header: Folder icon on left, links on right */}
        <div className="flex items-center justify-between mb-6">
          <Link
            to={`/projects/${project.slug}`}
            className="text-[#64ffda] group-hover:scale-110 transition-transform"
            aria-label={`View ${project.title}`}
          >
            <Folder className="w-9 h-9 stroke-[1.5]" />
          </Link>

          <div className="flex items-center space-x-3 text-[#8892b0]">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#64ffda] transition-colors"
                title="GitHub Repo"
                aria-label={`GitHub repo for ${project.title}`}
              >
                <Github className="w-5 h-5" />
              </a>
            )}
            {project.demoUrl ? (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#64ffda] transition-colors"
                title="External Link"
                aria-label={`Demo link for ${project.title}`}
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            ) : (
              <Link
                to={`/projects/${project.slug}`}
                className="hover:text-[#64ffda] transition-colors"
                title="View Documentation"
                aria-label={`Documentation for ${project.title}`}
              >
                <ExternalLink className="w-5 h-5" />
              </Link>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-[#ccd6f6] group-hover:text-[#64ffda] transition-colors mb-3">
          <Link to={`/projects/${project.slug}`}>{project.title}</Link>
        </h3>

        {/* Short Description */}
        <p className="text-sm text-[#8892b0] leading-relaxed mb-6">
          {project.shortDescription}
        </p>
      </div>

      {/* Tech Stack tags at bottom */}
      <div className="flex flex-wrap gap-x-3 gap-y-1 pt-4 border-t border-[#233554]/50">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="text-[11px] font-mono uppercase tracking-wider text-[#8892b0]"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

export default ProjectCard;
