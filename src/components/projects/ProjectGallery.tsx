import { useState } from 'react';
import { ImageLightbox } from './ImageLightbox';
import { ZoomIn } from 'lucide-react';

interface ProjectGalleryProps {
  images: string[];
  projectTitle: string;
}

export function ProjectGallery({ images, projectTitle }: ProjectGalleryProps) {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  if (!images || images.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img, idx) => (
          <div
            key={idx}
            onClick={() => setActiveImage(img)}
            className="group relative aspect-video rounded-xl overflow-hidden border border-[#233554] bg-[#0a192f] cursor-pointer hover:border-[#64ffda]/60 transition-all shadow-md"
          >
            <img
              src={img}
              alt={`${projectTitle} render ${idx + 1}`}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                // Handle fallback gracefully
                (e.target as HTMLElement).style.display = 'none';
              }}
            />

            <div className="absolute inset-0 bg-[#0a192f]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-xs font-mono text-[#64ffda]">
              <ZoomIn className="w-5 h-5" />
              <span>Expand Preview</span>
            </div>
          </div>
        ))}
      </div>

      {activeImage && (
        <ImageLightbox
          src={activeImage}
          alt={`${projectTitle} inspection preview`}
          onClose={() => setActiveImage(null)}
        />
      )}
    </>
  );
}

export default ProjectGallery;
