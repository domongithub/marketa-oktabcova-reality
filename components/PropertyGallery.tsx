"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

type PropertyGalleryProps = {
  images: string[];
  title: string;
};

export function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [current, setCurrent] = useState(0);
  const hasMultiple = images.length > 1;

  const goToPrevious = () => {
    setCurrent((value) => (value === 0 ? images.length - 1 : value - 1));
  };

  const goToNext = () => {
    setCurrent((value) => (value === images.length - 1 ? 0 : value + 1));
  };

  return (
    <div className="relative h-[72vh] min-h-[420px] overflow-hidden bg-linen">
      <Image
        src={images[current]}
        alt={`${title} - fotografie ${current + 1}`}
        fill
        priority={current === 0}
        sizes="100vw"
        className="object-cover brightness-[1.04]"
      />
      {hasMultiple ? (
        <>
          <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3 bg-white/90 px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-forest shadow-[0_12px_32px_rgba(0,47,27,0.10)]">
            {current + 1} / {images.length}
          </div>
          <button
            type="button"
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/70 bg-white/85 text-forest shadow-[0_12px_32px_rgba(0,47,27,0.10)] transition duration-300 hover:bg-forest hover:text-white md:left-6"
            aria-label="Předchozí fotografie"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            type="button"
            onClick={goToNext}
            className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/70 bg-white/85 text-forest shadow-[0_12px_32px_rgba(0,47,27,0.10)] transition duration-300 hover:bg-forest hover:text-white md:right-6"
            aria-label="Další fotografie"
          >
            <ChevronRight size={22} />
          </button>
        </>
      ) : null}
    </div>
  );
}
