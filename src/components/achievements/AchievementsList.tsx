import { ContentStatus } from '../layout/ContentStatus';
import { useState } from 'react';
import { SectionHeading } from '../layout/SectionHeading';
import { useAchievements } from '../../hooks/useSanityData';
import { Award, ShieldCheck, Trophy, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AchievementsListProps {
  standalone?: boolean;
}

export function AchievementsList({ standalone = false }: AchievementsListProps) {
  const content = useAchievements();
  const { data: achievements } = content;
  const [filter, setFilter] = useState<'all' | 'award' | 'certification' | 'competition'>('all');

  const filteredAchievements = achievements.filter((item) => {
    if (filter === 'all') return true;
    return item.type === filter;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'award':
        return <Trophy className="w-5 h-5 text-[#83b4ff]" />;
      case 'certification':
        return <ShieldCheck className="w-5 h-5 text-[#83b4ff]" />;
      case 'competition':
        return <Award className="w-5 h-5 text-[#83b4ff]" />;
      default:
        return <Award className="w-5 h-5 text-[#83b4ff]" />;
    }
  };

  return (
    <ContentStatus loading={content.isLoading} error={content.contentError} empty={content.data.length === 0}>
    <section id="achievements" className="py-16 sm:py-24">
      <SectionHeading
        title="achievements"
        action={
          !standalone ? (
            <Link
              to="/achievements"
              className="text-xs sm:text-sm font-mono text-[#83b4ff] hover:underline"
            >
              View all ({achievements.length}) →
            </Link>
          ) : undefined
        }
      />

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        {[
          { key: 'all', label: `All (${achievements.length})` },
          { key: 'award', label: 'Awards' },
          { key: 'certification', label: 'Certifications' },
          { key: 'competition', label: 'Competitions' },
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

      {/* Grid of achievement cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredAchievements.map((item) => (
          <div
            key={item.id}
            className="panel-card rounded-xl p-6 border border-[#263141] bg-[#101722] flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="p-2 rounded bg-[#080c12] border border-[#263141] text-[#83b4ff]">
                  {getTypeIcon(item.type)}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-[#9ba7b8]">{item.date}</span>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[#080c12] text-[#83b4ff] border border-[#83b4ff]/30">
                    {item.type}
                  </span>
                </div>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-[#eef3fb] group-hover:text-[#83b4ff] transition-colors">
                {item.title}
              </h3>

              <p className="text-xs font-mono text-[#83b4ff]/90 mt-1">
                Issued by {item.issuer}
              </p>

              {item.description && (
                <p className="text-sm text-[#9ba7b8] mt-3 leading-relaxed">
                  {item.description}
                </p>
              )}
            </div>

            {item.credentialUrl && (
              <div className="mt-4 pt-3 border-t border-[#263141]/60 flex items-center justify-between">
                <a
                  href={item.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-mono text-[#83b4ff] hover:underline flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Verify Credential</span>
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
    </ContentStatus>
  );
}

export default AchievementsList;
