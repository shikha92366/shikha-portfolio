import { useEffect } from 'react';
import { X } from 'lucide-react';

interface ImageLightboxProps {
  src: string;
  alt: string;
  caption?: string;
  onClose: () => void;
}

export function ImageLightbox({ src, alt, caption, onClose }: ImageLightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 bg-[#080c12]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl max-h-[90vh] bg-[#101722] border border-[#263141] rounded-xl overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-3 border-b border-[#263141] bg-[#080c12]">
          <span className="text-xs font-mono text-[#9ba7b8] truncate max-w-md">{caption || alt}</span>
          <button
            onClick={onClose}
            aria-label="Close Lightbox"
            className="p-1 rounded text-[#9ba7b8] hover:text-[#83b4ff] hover:bg-[#101722] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-2 sm:p-4 overflow-auto flex items-center justify-center bg-[#080c12]">
          <img
            src={src}
            width={1200} height={675}
            alt={alt}
            className="max-h-[80vh] max-w-full object-contain rounded"
          />
        </div>
      </div>
    </div>
  );
}

export default ImageLightbox;
