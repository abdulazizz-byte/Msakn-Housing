'use client';

import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { PropertyImage } from '@/types';

interface ImageGalleryProps {
  images: PropertyImage[];
  locale: string;
}

export function ImageGallery({ images, locale }: ImageGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const isAr = locale === 'ar';

  const getAlt = (img: PropertyImage) =>
    isAr && img.caption_ar ? img.caption_ar : img.caption || '';

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % images.length);
    }
  };
  const goPrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
    }
  };

  return (
    <>
      <div className="mb-8">
        {/* Hero image */}
        <div
          className="overflow-hidden rounded-xl cursor-pointer sm:h-80 lg:h-96"
          onClick={() => openLightbox(0)}
        >
          <img
            src={images[0].url}
            alt={getAlt(images[0])}
            className="h-64 w-full object-cover sm:h-80 lg:h-96 hover:scale-105 transition-transform duration-300"
          />
        </div>
        {/* Thumbnail row */}
        {images.length > 1 && (
          <div className="mt-2 grid grid-cols-4 gap-2">
            {images.slice(1, 5).map((img, i) => (
              <div
                key={img.id}
                className="overflow-hidden rounded-lg cursor-pointer"
                onClick={() => openLightbox(i + 1)}
              >
                <img
                  src={img.url}
                  alt={getAlt(img)}
                  className="h-16 w-full object-cover sm:h-20 hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 end-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Prev */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute start-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}

          {/* Image */}
          <img
            src={images[lightboxIndex].url}
            alt={getAlt(images[lightboxIndex])}
            className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute end-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}

          {/* Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1 text-sm text-white">
            {lightboxIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
