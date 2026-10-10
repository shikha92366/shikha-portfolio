import React from 'react';
import { cn } from '../../lib/utils';

export interface SectionContainerProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  id: string;
  badge?: string;
  title: React.ReactNode;
  subtitle?: string;
  centered?: boolean;
}

export function SectionContainer({
  id,
  badge,
  title,
  subtitle,
  centered = false,
  className,
  children,
  ...props
}: SectionContainerProps) {
  return (
    <section
      id={id}
      className={cn('py-20 sm:py-28 relative scroll-mt-20', className)}
      {...props}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={cn('mb-12 sm:mb-16', centered ? 'text-center' : 'max-w-3xl')}>
          {badge && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 font-mono text-xs mb-4 tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              <span>{badge}</span>
            </div>
          )}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
              {subtitle}
            </p>
          )}
          <div
            className={cn(
              'h-1 w-20 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full mt-6',
              centered && 'mx-auto'
            )}
          />
        </div>

        {/* Section Content */}
        {children}
      </div>
    </section>
  );
}
