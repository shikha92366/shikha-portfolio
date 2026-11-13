import { journalCopy as copy } from '../../data/journal';
export function JournalState({loading,error,retry}:{loading?:boolean;error?:boolean;retry:()=>void}) {
  if (loading) return <p className="journal-state" role="status">Loading learning notes…</p>;
  if (error) return <div className="journal-state" role="alert"><p>{copy.error}</p><button className="primary-link" onClick={retry}>Try again</button></div>;
  return null;
}
