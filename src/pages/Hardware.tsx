import { ContentStatus } from '../components/layout/ContentStatus';
import { useState } from 'react';
import { SectionHeading } from '../components/layout/SectionHeading';
import { ProjectCard } from '../components/projects/ProjectCard';
import { useProjects } from '../hooks/useSanityData';
import { Search } from 'lucide-react';

export function Hardware() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'embedded' | 'iot' | 'pcb-design'>('all');

  const content = useProjects();
  const { data: projects, isLoading } = content;

  const hardwareProjects = projects.filter(
    (p) => p.domain === 'hardware' || p.category === 'embedded' || p.category === 'pcb-design'
  );

  const filtered = hardwareProjects.filter((p) => {
    const matchesFilter = filter === 'all' || p.category === filter;
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(search.toLowerCase()) ||
      p.techStack.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <ContentStatus loading={content.isLoading} error={content.contentError} empty={content.data.length === 0}>
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      <div>
        <SectionHeading title="avionics & pcb hardware" />
        <p className="text-[#9ba7b8] max-w-2xl text-base -mt-6">
          Flight avionics, dual-controller rocketry computers, custom EasyEDA PCBs, RF telemetry nodes, and sensor integration systems.
        </p>
      </div>

      {/* Controls: Search and Filter Tabs */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between pb-4 border-b border-[#263141]">
        {/* Search Input */}
        <div className="relative max-w-md w-full">
          <Search className="w-4 h-4 text-[#9ba7b8] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search avionics, PCB, sensors, GPS..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded bg-[#101722] border border-[#263141] text-xs font-mono text-[#eef3fb] placeholder-[#9ba7b8]/50 focus:outline-none focus:border-[#83b4ff]"
          />
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap gap-2">
          {[
            { key: 'all', label: 'All Hardware' },
            { key: 'embedded', label: 'Avionics & Flight' },
            { key: 'iot', label: 'CanSat & IoT' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key as any)}
              className={`px-3 py-1.5 rounded text-xs font-mono transition-all cursor-pointer ${
                filter === tab.key
                  ? 'bg-[#101722] text-[#83b4ff] border border-[#83b4ff]'
                  : 'text-[#9ba7b8] hover:text-[#eef3fb] border border-[#263141] bg-[#080c12]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      {isLoading && projects.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
          {[1, 2].map((n) => (
            <div key={n} className="rounded-xl bg-[#101722] border border-[#263141] overflow-hidden space-y-4">
              <div className="aspect-video w-full bg-[#263141]" />
              <div className="p-6 space-y-3">
                <div className="h-6 w-3/4 bg-[#263141] rounded" />
                <div className="h-14 w-full bg-[#263141]/60 rounded" />
                <div className="flex gap-2 pt-2">
                  <div className="h-4 w-16 bg-[#263141] rounded" />
                  <div className="h-4 w-20 bg-[#263141] rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="p-12 text-center border border-[#263141] rounded-xl bg-[#101722]">
          <p className="text-sm font-mono text-[#9ba7b8]">
            No hardware systems matched your search.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((proj) => (
            <ProjectCard key={proj.slug} project={proj} variant="image-top" />
          ))}
        </div>
      )}
    </div>
    </ContentStatus>
  );
}

export default Hardware;
