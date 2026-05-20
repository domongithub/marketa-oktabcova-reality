"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { useRouter } from "next/navigation";

type PropertyCardImagesProps = {
  slug: string;
  title: string;
  images: string[];
  badge: string;
  isClosed: boolean;
};

export function PropertyCardImages({ slug, title, images, badge, isClosed }: PropertyCardImagesProps) {
  const router = useRouter();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const gallery = images.length ? images : [];
  const hasMultiple = gallery.length > 1;

  function scroll(direction: "previous" | "next") {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    scroller.scrollBy({
      left: direction === "next" ? scroller.clientWidth : -scroller.clientWidth,
      behavior: "smooth"
    });
  }

  return (
    <div className="relative aspect-[4/3] overflow-hidden bg-linen">
      <span
        className={`absolute left-4 top-4 z-20 px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] shadow-[0_10px_24px_rgba(0,47,27,0.08)] ${
          isClosed ? "border border-gold/30 bg-forest/90 text-white" : "bg-white/90 text-forest"
        }`}
      >
        {badge}
      </span>

      <div
        ref={scrollerRef}
        role="button"
        tabIndex={0}
        aria-label={`${title} - otevřít detail`}
        onClick={() => router.push(`/nemovitosti/${slug}`)}
        onKeyDown={(event) => {
          if (event.key === "Enter") router.push(`/nemovitosti/${slug}`);
        }}
        className="flex h-full snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {gallery.map((image, index) => (
          <div key={`${image}-${index}`} className="relative h-full min-w-full snap-center">
            <Image
              src={image}
              alt={`${title} - fotografie ${index + 1}`}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover brightness-[1.08] contrast-[0.98] saturate-[0.96] transition duration-700 hover:scale-[1.025] hover:brightness-[1.12]"
            />
          </div>
        ))}
      </div>

      {hasMultiple ? (
        <>
          <button
            type="button"
            aria-label="Předchozí fotografie"
            onClick={(event) => {
              event.stopPropagation();
              scroll("previous");
            }}
            className="absolute left-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center border border-white/70 bg-white/85 text-forest opacity-0 shadow-[0_12px_28px_rgba(0,47,27,0.10)] transition duration-300 hover:bg-forest hover:text-white group-hover:opacity-100"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            aria-label="Další fotografie"
            onClick={(event) => {
              event.stopPropagation();
              scroll("next");
            }}
            className="absolute right-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center border border-white/70 bg-white/85 text-forest opacity-0 shadow-[0_12px_28px_rgba(0,47,27,0.10)] transition duration-300 hover:bg-forest hover:text-white group-hover:opacity-100"
          >
            <ChevronRight size={18} />
          </button>
          <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
            {gallery.slice(0, 8).map((image, index) => (
              <span key={`${image}-dot-${index}`} className="h-1 w-5 bg-white/80 shadow-[0_4px_14px_rgba(0,47,27,0.12)]" />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
