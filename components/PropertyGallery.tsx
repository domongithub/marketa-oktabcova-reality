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
    <div className="mx-auto grid max-w-6xl gap-4">
      {hasMultiple ? (
        <div className="flex flex-wrap justify-center gap-2">
          {images.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setCurrent(index)}
              className={`group relative h-20 w-28 overflow-hidden border bg-[#f3eee5] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(0,47,27,0.08)] sm:h-24 sm:w-36 ${
                current === index ? "border-gold" : "border-forest/10"
              }`}
              aria-label={`Zobrazit fotografii ${index + 1}`}
            >
              <Image
                src={image}
                alt={`${title} - náhled ${index + 1}`}
                fill
                sizes="144px"
                className="object-cover brightness-[1.04] transition duration-500 group-hover:scale-[1.035]"
              />
              <span className={`absolute inset-x-0 bottom-0 h-1 transition ${current === index ? "bg-gold" : "bg-transparent"}`} />
            </button>
          ))}
        </div>
      ) : null}

      <div className="relative h-[62vh] min-h-[360px] overflow-hidden bg-[#f3eee5] shadow-[0_18px_48px_rgba(0,47,27,0.06)]">
        <Image
          key={images[current]}
          src={images[current]}
          alt={`${title} - fotografie ${current + 1}`}
          fill
          priority={current === 0}
          sizes="100vw"
          className="object-contain p-2 brightness-[1.04] transition duration-500 ease-out md:p-4"
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

    </div>
  );
}
