import React from 'react';

interface SectionHeadingProps {
  id?: string;
  title: string;
  action?: React.ReactNode;
  className?: string;
}

export function SectionHeading({ id, title, action, className = '' }: SectionHeadingProps) {
  return (
    <div id={id} className={`flex items-center justify-between gap-4 mb-8 sm:mb-12 ${className}`}>
      <div className="flex items-center gap-3 sm:gap-4 flex-grow min-w-0">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#ccd6f6] flex items-center gap-1.5 shrink-0">
          <span className="text-[#64ffda] font-mono">/</span>
          <span>{title}</span>
        </h2>
        <div className="h-[1px] bg-[#233554] flex-grow max-w-xl hidden sm:block" />
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export default SectionHeading;
