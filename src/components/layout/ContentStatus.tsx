import type { ReactNode } from 'react';
export function ContentStatus({ loading, error, empty = false, children }: { loading?: boolean; error?: string; empty?: boolean; children?: ReactNode }) {
  if (loading) return <div role="status" aria-label="Loading content" className="py-8 space-y-3"><div className="h-5 w-2/3 rounded bg-[#101722] motion-safe:animate-pulse" /><div className="h-24 rounded bg-[#101722] motion-safe:animate-pulse" /><span className="sr-only">Loading content…</span></div>;
  return <>{error && <p role="status" className="text-xs text-[#9ba7b8] py-3">{error}</p>}{empty ? <p className="text-sm text-[#9ba7b8] py-6">No published items yet.</p> : children}</>;
}
