import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Github, ExternalLink, ArrowRight } from 'lucide-react';
import { Project } from '../../types';

interface FeaturedCarouselProps {
  projects: Project[];
}

export function FeaturedCarousel({ projects }: FeaturedCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!projects || projects.length === 0) return null;

  const currentProject = projects[Math.min(currentIndex, projects.length - 1)];

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative group w-full rounded-2xl overflow-hidden border border-[#263141] bg-[#101722] shadow-2xl mb-10">
      {/* Visual Container */}
      <div className="relative w-full h-[320px] sm:h-[400px] bg-[#080c12] overflow-hidden flex items-center justify-center">
        {/* Background circuit grid */}
        <div className="absolute inset-0 bg-circuit-grid opacity-25" />

        {/* Cover image or abstract circuit graphic */}
        {currentProject.coverImage ? (
          <img
            src={currentProject.coverImage}
            alt={currentProject.title}
            className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700 ease-out"
            onError={(e) => {
              // Graceful fallback to circuit graphic on error
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
        ) : null}

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080c12] via-[#080c12]/80 to-transparent" />

        {/* Content Overlay */}
        <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-end text-center items-center z-10 max-w-3xl mx-auto">
          {currentProject.status && (
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-[#83b4ff]/10 text-[#83b4ff] border border-[#83b4ff]/30 mb-3">
              {currentProject.status === 'completed' ? 'FEATURED CASE STUDY' : 'ACTIVE DEVELOPMENT'}
            </span>
          )}

          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#eef3fb] hover:text-[#83b4ff] transition-colors mb-3">
            <Link to={`/projects/${currentProject.slug}`}>{currentProject.title}</Link>
          </h3>

          <p className="text-sm sm:text-base text-[#9ba7b8] max-w-xl mb-4 line-clamp-2">
            {currentProject.shortDescription}
          </p>

          {/* Uppercase Tech Tags */}
          <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 mb-5">
            {currentProject.techStack.map((tech) => (
              <span key={tech} className="text-xs font-mono uppercase tracking-wider text-[#83b4ff]/90">
                {tech}
              </span>
            ))}
          </div>

          {/* Links & CTA */}
          <div className="flex items-center gap-4">
            <Link
              to={`/projects/${currentProject.slug}`}
              className="btn-mint-outline px-5 py-2 rounded text-xs font-mono inline-flex items-center gap-1.5"
            >
              <span>View Case Study</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {currentProject.githubUrl && (
              <a
                href={currentProject.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded text-[#eef3fb] hover:text-[#83b4ff] hover:bg-[#263141]/40 transition-colors"
                title="View on GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            )}

            {currentProject.demoUrl && (
              <a
                href={currentProject.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded text-[#eef3fb] hover:text-[#83b4ff] hover:bg-[#263141]/40 transition-colors"
                title="Live Demo"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Carousel Arrow Controls */}
        {projects.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              aria-label="Previous Project"
              className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#080c12]/70 border border-[#263141] text-[#eef3fb] hover:text-[#83b4ff] hover:border-[#83b4ff]/60 transition-all z-20 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next Project"
              className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#080c12]/70 border border-[#263141] text-[#eef3fb] hover:text-[#83b4ff] hover:border-[#83b4ff]/60 transition-all z-20 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Dash-style pagination */}
        {projects.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center space-x-2 z-20">
            {projects.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-1 transition-all rounded cursor-pointer ${
                  idx === currentIndex ? 'w-8 bg-[#83b4ff]' : 'w-4 bg-[#263141] hover:bg-[#9ba7b8]'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FeaturedCarousel;
