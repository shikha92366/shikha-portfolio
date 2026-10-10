import React from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'cyan' | 'emerald' | 'amber' | 'purple' | 'outline';
  size?: 'sm' | 'md';
}

export function Badge({
  className,
  variant = 'default',
  size = 'md',
  children,
  ...props
}: BadgeProps) {
  const baseStyles = 'inline-flex items-center font-medium rounded-md transition-colors';

  const variants = {
    default: 'bg-slate-800/90 text-slate-300 border border-slate-700/80',
    cyan: 'bg-cyan-950/60 text-cyan-300 border border-cyan-500/30',
    emerald: 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30',
    amber: 'bg-amber-950/60 text-amber-300 border border-amber-500/30',
    purple: 'bg-purple-950/60 text-purple-300 border border-purple-500/30',
    outline: 'bg-transparent text-slate-300 border border-slate-700',
  };

  const sizes = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
  };

  return (
    <span className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {children}
    </span>
  );
}
