import Link from "next/link";
import { PropertyCard } from "@/components/PropertyCard";
import { SectionHeading } from "@/components/SectionHeading";
import { createMetadata } from "@/lib/site";
import { activeProperties } from "@/lib/properties";

export const metadata = createMetadata({
  title: "Nemovitosti Most, Chomutov a Litvínov",
  description:
    "Aktuální nabídka nemovitostí k prodeji a pronájmu v Mostě, Chomutově, Litvínově a okolí od realitní makléřky Markéty Oktábcové.",
  path: "/nemovitosti"
});

export default function PropertiesPage() {
  return (
    <main className="container-wide py-16">
      <div className="flex flex-col justify-between gap-8 border-b border-forest/10 pb-12 md:flex-row md:items-end">
        <SectionHeading
          as="h1"
          eyebrow="Nabídka"
          title="Nemovitosti k prodeji a pronájmu"
          text="Aktuální výběr bytů, domů a investičních příležitostí z nabídky Markéty Oktábcové."
        />
        <Link href="/prodano" className="text-sm font-medium text-forest underline decoration-gold underline-offset-8">
          Zobrazit prodané nemovitosti
        </Link>
      </div>
      <div className="grid gap-x-10 gap-y-16 py-14 md:grid-cols-2 lg:grid-cols-3">
        {activeProperties.map((property) => (
          <PropertyCard key={property.slug} property={property} />
        ))}
      </div>
    </main>
  );
}
