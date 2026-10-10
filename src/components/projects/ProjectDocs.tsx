import { FileText, Image as ImageIcon, Link as LinkIcon, FileSpreadsheet, ExternalLink, Download } from 'lucide-react';
import { ProjectDocument } from '../../types';

interface ProjectDocsProps {
  documents: ProjectDocument[];
}

export function ProjectDocs({ documents }: ProjectDocsProps) {
  if (!documents || documents.length === 0) return null;

  const getDocIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-5 h-5 text-[#64ffda]" />;
      case 'image':
        return <ImageIcon className="w-5 h-5 text-[#64ffda]" />;
      case 'csv':
        return <FileSpreadsheet className="w-5 h-5 text-[#64ffda]" />;
      case 'link':
      default:
        return <LinkIcon className="w-5 h-5 text-[#64ffda]" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {documents.map((doc, idx) => {
          const isDownloadable = doc.type === 'pdf' || doc.type === 'csv';

          return (
            <div
              key={idx}
              className="p-4 rounded-xl border border-[#233554] bg-[#112240] hover:border-[#64ffda]/50 transition-all flex items-center justify-between gap-3 group"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="p-2.5 rounded-lg bg-[#0a192f] border border-[#233554] text-[#64ffda] shrink-0">
                  {getDocIcon(doc.type)}
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-semibold text-[#ccd6f6] group-hover:text-[#64ffda] transition-colors truncate">
                    {doc.label}
                  </h4>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#8892b0]">
                    {doc.type} document
                  </span>
                </div>
              </div>

              <div className="shrink-0">
                {isDownloadable ? (
                  <a
                    href={doc.url}
                    download
                    className="p-2 rounded border border-[#233554] bg-[#0a192f] text-[#8892b0] hover:text-[#64ffda] hover:border-[#64ffda] transition-all inline-flex items-center gap-1.5 text-xs font-mono"
                    title="Download File"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Get</span>
                  </a>
                ) : (
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded border border-[#233554] bg-[#0a192f] text-[#8892b0] hover:text-[#64ffda] hover:border-[#64ffda] transition-all inline-flex items-center gap-1.5 text-xs font-mono"
                    title="Open Link"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Open</span>
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProjectDocs;
