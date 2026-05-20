import { PropertyCard } from "@/components/PropertyCard";
import { SectionHeading } from "@/components/SectionHeading";
import { createMetadata } from "@/lib/site";
import { getPublicProperties } from "@/lib/crm/properties";

export const metadata = createMetadata({
  title: "Prodané nemovitosti Most a okolí",
  description:
    "Ukázka prodaných nemovitostí v Mostě, Chomutově, Litvínově, Praze a okolí. Výsledky realitní makléřky Markéty Oktábcové.",
  path: "/prodano"
});

export const revalidate = 60;

export default async function SoldPropertiesPage() {
  const { soldProperties } = await getPublicProperties();

  return (
    <main className="container-wide py-16">
      <SectionHeading
        as="h1"
        eyebrow="Archiv"
        title="Prodané nemovitosti"
        text="Archiv prodaných bytů, domů, rekreačních objektů a komerčních nemovitostí, které už našly nové majitele."
      />
      <div className="grid gap-x-10 gap-y-16 py-14 md:grid-cols-2 lg:grid-cols-3">
        {soldProperties.map((property) => (
          <PropertyCard key={property.slug} property={property} />
        ))}
      </div>
    </main>
  );
}
