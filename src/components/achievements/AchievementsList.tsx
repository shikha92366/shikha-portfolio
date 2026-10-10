import { useState } from 'react';
import { SectionHeading } from '../layout/SectionHeading';
import { achievements } from '../../data/achievements';
import { Award, ShieldCheck, Trophy, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AchievementsListProps {
  standalone?: boolean;
}

export function AchievementsList({ standalone = false }: AchievementsListProps) {
  const [filter, setFilter] = useState<'all' | 'award' | 'certification' | 'competition'>('all');

  const filteredAchievements = achievements.filter((item) => {
    if (filter === 'all') return true;
    return item.type === filter;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'award':
        return <Trophy className="w-5 h-5 text-[#64ffda]" />;
      case 'certification':
        return <ShieldCheck className="w-5 h-5 text-[#64ffda]" />;
      case 'competition':
        return <Award className="w-5 h-5 text-[#64ffda]" />;
      default:
        return <Award className="w-5 h-5 text-[#64ffda]" />;
    }
  };

  return (
    <section id="achievements" className="py-16 sm:py-24">
      <SectionHeading
        title="achievements"
        action={
          !standalone ? (
            <Link
              to="/achievements"
              className="text-xs sm:text-sm font-mono text-[#64ffda] hover:underline"
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
                ? 'bg-[#112240] text-[#64ffda] border border-[#64ffda]'
                : 'text-[#8892b0] hover:text-[#ccd6f6] border border-[#233554] bg-[#0a192f]'
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
            className="panel-card rounded-xl p-6 border border-[#233554] bg-[#112240] flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="p-2 rounded bg-[#0a192f] border border-[#233554] text-[#64ffda]">
                  {getTypeIcon(item.type)}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-[#8892b0]">{item.date}</span>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[#0a192f] text-[#64ffda] border border-[#64ffda]/30">
                    {item.type}
                  </span>
                </div>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-[#ccd6f6] group-hover:text-[#64ffda] transition-colors">
                {item.title}
              </h3>

              <p className="text-xs font-mono text-[#64ffda]/90 mt-1">
                Issued by {item.issuer}
              </p>

              {item.description && (
                <p className="text-sm text-[#8892b0] mt-3 leading-relaxed">
                  {item.description}
                </p>
              )}
            </div>

            {item.credentialUrl && (
              <div className="mt-4 pt-3 border-t border-[#233554]/60 flex items-center justify-between">
                <a
                  href={item.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-mono text-[#64ffda] hover:underline flex items-center gap-1"
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
  );
}

export default AchievementsList;
