import { useState } from 'react';
import { ImageLightbox } from './ImageLightbox';
import { ZoomIn } from 'lucide-react';

interface ProjectGalleryProps {
  images: string[];
  metadata?: { url: string; alt: string; caption?: string }[];
  projectTitle: string;
}

export function ProjectGallery({ images, projectTitle, metadata }: ProjectGalleryProps) {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  if (!images || images.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img, idx) => (
          <div
            key={idx}
            onClick={() => setActiveImage(img)}
            className="group relative aspect-video rounded-xl overflow-hidden border border-[#263141] bg-[#080c12] cursor-pointer hover:border-[#83b4ff]/60 transition-all shadow-md"
          >
            <img
              src={img}
              alt={metadata?.find(item => item.url === img)?.alt || `${projectTitle} render ${idx + 1}`}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                // Handle fallback gracefully
                (e.target as HTMLElement).style.display = 'none';
              }}
            />

            <div className="absolute inset-0 bg-[#080c12]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-xs font-mono text-[#83b4ff]">
              <ZoomIn className="w-5 h-5" />
              <span>Expand Preview</span>
            </div>
          </div>
        ))}
      </div>

      {activeImage && (
        <ImageLightbox
          src={activeImage}
          alt={metadata?.find(item => item.url === activeImage)?.alt || `${projectTitle} inspection preview`}
          caption={metadata?.find(item => item.url === activeImage)?.caption}
          onClose={() => setActiveImage(null)}
        />
      )}
    </>
  );
}

export default ProjectGallery;
