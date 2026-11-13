import { ContentStatus } from '../layout/ContentStatus';
import { Link } from 'react-router-dom';
import { SectionHeading } from '../layout/SectionHeading';
import { FeaturedCarousel } from '../projects/FeaturedCarousel';
import { ProjectCard } from '../projects/ProjectCard';
import { useProjects, useProfile } from '../../hooks/useSanityData';
import { ArrowRight } from 'lucide-react';

export function SoftwareSection() {
  const { data: profile } = useProfile();
  const content = useProjects();
  const { data: projects } = content;
  const label = profile?.sectionLabels?.software || 'embedded & ai';

  // Filter software/AI-ML/embedded projects
  const softwareProjects = projects.filter(
    (p) => p.domain === 'software' || p.category === 'ai-ml' || p.category === 'embedded'
  );

  // Featured items for carousel (e.g. MotorMind AI)
  const carouselProjects = softwareProjects.filter((p) => p.featured);
  // Row of cards
  const cardProjects = softwareProjects.slice(0, 3);

  const viewAllAction = (
    <Link
      to="/software"
      className="text-xs sm:text-sm font-mono text-[#83b4ff] hover:underline inline-flex items-center gap-1 group"
    >
      <span>View all projects</span>
      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
    </Link>
  );

  return (
    <ContentStatus loading={content.isLoading} error={content.contentError} empty={content.data.length === 0}>
    <section id="software" className="py-16 sm:py-24">
      <SectionHeading title={label} action={viewAllAction} />

      {/* Featured Project Slide */}
      {carouselProjects.length > 0 && <FeaturedCarousel projects={carouselProjects} />}

      {/* 3 Project Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cardProjects.map((proj) => (
          <ProjectCard key={proj.slug} project={proj} variant="folder" />
        ))}
      </div>
    </section>
    </ContentStatus>
  );
}

export default SoftwareSection;
