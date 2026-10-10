import { useEffect } from 'react';
import { X } from 'lucide-react';

interface ImageLightboxProps {
  src: string;
  alt: string;
  onClose: () => void;
}

export function ImageLightbox({ src, alt, onClose }: ImageLightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 bg-[#0a192f]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl max-h-[90vh] bg-[#112240] border border-[#233554] rounded-xl overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-3 border-b border-[#233554] bg-[#0a192f]">
          <span className="text-xs font-mono text-[#8892b0] truncate max-w-md">{alt}</span>
          <button
            onClick={onClose}
            aria-label="Close Lightbox"
            className="p-1 rounded text-[#8892b0] hover:text-[#64ffda] hover:bg-[#112240] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-2 sm:p-4 overflow-auto flex items-center justify-center bg-[#0a192f]">
          <img
            src={src}
            alt={alt}
            className="max-h-[80vh] max-w-full object-contain rounded"
          />
        </div>
      </div>
    </div>
  );
}

export default ImageLightbox;
