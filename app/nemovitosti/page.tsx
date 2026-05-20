import { PropertyCard } from "@/components/PropertyCard";
import { SectionHeading } from "@/components/SectionHeading";
import { createMetadata } from "@/lib/site";
import { getPublicProperties } from "@/lib/crm/properties";

export const metadata = createMetadata({
  title: "Nemovitosti Most, Chomutov a Litvínov",
  description:
    "Aktuální nabídka nemovitostí k prodeji a pronájmu v Mostě, Chomutově, Litvínově a okolí od realitní makléřky Markéty Oktábcové.",
  path: "/nemovitosti"
});

export const revalidate = 60;

export default async function PropertiesPage() {
  const { activeProperties, soldProperties } = await getPublicProperties();

  return (
    <main className="container-wide py-16">
      <div className="border-b border-forest/10 pb-12">
        <SectionHeading
          as="h1"
          eyebrow="Nabídka"
          title="Nemovitosti"
          text="Aktuální nabídky i archiv realizovaných prodejů a pronájmů na jednom místě. Nejdříve najdete dostupné nemovitosti, pod nimi již uzavřené zakázky."
        />
      </div>

      <section className="py-14">
        <div className="mb-9">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-gold">Aktuálně</p>
          <h2 className="font-serif text-4xl text-forest">Aktuální nabídka</h2>
        </div>
        <div className="grid gap-x-10 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
        {activeProperties.length ? activeProperties.map((property) => (
          <PropertyCard key={property.slug} property={property} />
        )) : (
          <p className="text-lg text-muted">Aktuálně připravujeme nové nabídky.</p>
        )}
        </div>
      </section>

      <section className="border-t border-forest/10 py-14">
        <div className="mb-9">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-gold">Archiv</p>
          <h2 className="font-serif text-4xl text-forest">Realizované nemovitosti</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
            Prodané a pronajaté nemovitosti, které už našly nové majitele nebo nájemníky.
          </p>
        </div>
        <div className="grid gap-x-10 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {soldProperties.map((property) => (
            <PropertyCard key={property.slug} property={property} />
          ))}
        </div>
      </section>
    </main>
  );
}
