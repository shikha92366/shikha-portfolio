import { ContentStatus } from '../layout/ContentStatus';
import { Link } from 'react-router-dom';
import { SectionHeading } from '../layout/SectionHeading';
import { ProjectCard } from '../projects/ProjectCard';
import { useProjects, useProfile } from '../../hooks/useSanityData';
import { ArrowRight } from 'lucide-react';

export function HardwareSection() {
  const { data: profile } = useProfile();
  const content = useProjects();
  const { data: projects } = content;
  const label = profile?.sectionLabels?.hardware || 'avionics & pcb';

  // Hardware projects (Trishul Rocket Avionics, CanSat, etc.)
  const hardwareProjects = projects.filter(
    (p) => p.domain === 'hardware' || p.category === 'embedded' || p.category === 'pcb-design'
  );

  const viewAllAction = (
    <Link
      to="/hardware"
      className="text-xs sm:text-sm font-mono text-[#83b4ff] hover:underline inline-flex items-center gap-1 group"
    >
      <span>View all projects</span>
      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
    </Link>
  );

  return (
    <ContentStatus loading={content.isLoading} error={content.contentError} empty={content.data.length === 0}>
    <section id="hardware" className="py-16 sm:py-24">
      <SectionHeading title={label} action={viewAllAction} />

      {/* Row of image-top cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {hardwareProjects.slice(0, 4).map((proj) => (
          <ProjectCard key={proj.slug} project={proj} variant="image-top" />
        ))}
      </div>
    </section>
    </ContentStatus>
  );
}

export default HardwareSection;
