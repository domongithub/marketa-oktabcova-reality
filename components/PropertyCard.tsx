import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PropertyCardImages } from "@/components/PropertyCardImages";
import type { Property } from "@/lib/properties";

export function PropertyCard({ property }: { property: Property }) {
  const badge = property.badge ?? (property.status === "Prodáno" || property.status === "Pronajato" ? property.status : "Na prodej");
  const isClosed = badge === "Prodáno" || badge === "Pronajato";
  const cardImages = [property.image, ...property.gallery.filter((image) => image !== property.image)];

  return (
    <article className="group flex h-full flex-col border-t border-transparent pt-0 transition duration-300 hover:border-gold/45">
      <PropertyCardImages
        slug={property.slug}
        title={property.title}
        images={cardImages}
        badge={badge}
        isClosed={isClosed}
      />
      <Link href={`/nemovitosti/${property.slug}`} className="flex grow flex-col">
        <div className="mt-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-gold">{property.location}</p>
            <h3 className="mt-2 font-serif text-2xl text-forest">{property.title}</h3>
            <p className="line-clamp-3 mt-3 min-h-[4.5rem] text-sm leading-6 text-muted">{property.excerpt}</p>
          </div>
          <span className="mt-2 inline-flex h-10 w-10 shrink-0 items-center justify-center border border-gold/50 text-forest transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:bg-forest group-hover:text-white">
            <ArrowUpRight size={18} />
          </span>
        </div>
        <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-forest/10 pt-4 text-sm text-ink">
          <span>{property.disposition}</span>
          <span className="text-gold">·</span>
          <span>{property.size}</span>
          <span className="text-gold">·</span>
          <span>{property.price}</span>
        </div>
      </Link>
    </article>
  );
}
