import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Property } from "@/lib/properties";

export function PropertyCard({ property }: { property: Property }) {
  const badge = property.badge ?? (property.status === "Prodáno" ? "Prodáno" : "Na prodej");
  const isClosed = badge === "Prodáno" || badge === "Pronajato";

  return (
    <article className="group flex h-full flex-col border-t border-transparent pt-0 transition duration-300 hover:border-gold/45">
      <Link href={`/nemovitosti/${property.slug}`} className="flex h-full flex-col">
        <div className="relative aspect-[4/3] overflow-hidden bg-linen">
          <span
            className={`absolute left-4 top-4 z-10 px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] shadow-[0_10px_24px_rgba(0,47,27,0.08)] ${
              isClosed ? "border border-gold/30 bg-forest/90 text-white" : "bg-white/90 text-forest"
            }`}
          >
            {badge}
          </span>
          <Image
            src={property.image}
            alt={property.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover brightness-[1.08] contrast-[0.98] saturate-[0.96] transition duration-700 group-hover:scale-[1.045] group-hover:brightness-[1.12]"
          />
        </div>
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
