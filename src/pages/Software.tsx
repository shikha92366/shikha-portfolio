import { useState } from 'react';
import { SectionHeading } from '../components/layout/SectionHeading';
import { ProjectCard } from '../components/projects/ProjectCard';
import { projects } from '../data/projects';
import { Search } from 'lucide-react';

export function Software() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'ai-ml' | 'embedded' | 'iot' | 'software'>('all');

  const softwareProjects = projects.filter(
    (p) => p.domain === 'software' || p.category === 'ai-ml' || p.category === 'embedded'
  );

  const filtered = softwareProjects.filter((p) => {
    const matchesFilter = filter === 'all' || p.category === filter;
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(search.toLowerCase()) ||
      p.techStack.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      <div>
        <SectionHeading title="embedded & ai projects" />
        <p className="text-[#8892b0] max-w-2xl text-base -mt-6">
          Edge AI inference models, embedded C/C++ firmware, sensor fusion pipelines, and real-time microcontroller solutions.
        </p>
      </div>

      {/* Controls: Search and Filter Tabs */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between pb-4 border-b border-[#233554]">
        {/* Search Input */}
        <div className="relative max-w-md w-full">
          <Search className="w-4 h-4 text-[#8892b0] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search projects by name, chip, sensor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded bg-[#112240] border border-[#233554] text-xs font-mono text-[#ccd6f6] placeholder-[#8892b0]/50 focus:outline-none focus:border-[#64ffda]"
          />
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap gap-2">
          {[
            { key: 'all', label: 'All Software' },
            { key: 'ai-ml', label: 'Edge AI / ML' },
            { key: 'embedded', label: 'Embedded C' },
            { key: 'iot', label: 'IoT & Telemetry' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key as any)}
              className={`px-3 py-1.5 rounded text-xs font-mono transition-all cursor-pointer ${
                filter === tab.key
                  ? 'bg-[#112240] text-[#64ffda] border border-[#64ffda]'
                  : 'text-[#8892b0] hover:text-[#ccd6f6] border border-[#233554] bg-[#0a192f]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      {filtered.length === 0 ? (
        <div className="p-12 text-center border border-[#233554] rounded-xl bg-[#112240]">
          <p className="text-sm font-mono text-[#8892b0]">
            No projects matched your criteria.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((proj) => (
            <ProjectCard key={proj.slug} project={proj} variant="folder" />
          ))}
        </div>
      )}
    </div>
  );
}

export default Software;
