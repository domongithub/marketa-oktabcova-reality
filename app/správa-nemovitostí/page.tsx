import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { createMetadata } from "@/lib/site";

export const metadata = createMetadata({
  title: "Správa nemovitostí Most a Chomutov",
  description:
    "Spolehlivá správa nemovitostí, komunikace s nájemníky a dlouhodobá péče o byty a domy v Mostě, Chomutově, Litvínově a Ústeckém kraji.",
  path: "/správa-nemovitostí"
});

export default function PropertyManagementPage() {
  return (
    <main>
      <section className="container-wide grid gap-12 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <SectionHeading
          as="h1"
          eyebrow="Služby"
          title="Správa nemovitostí"
          text="Spolehlivá péče o nemovitost, nájemní vztahy a každodenní provoz."
        />
        <div className="bg-white p-8 shadow-soft md:p-12">
          <p className="text-lg leading-9 text-muted">
            Pokud potřebujete spolehlivou správu své nemovitosti, neváhejte se na mě obrátit. Stačí mi napsat nebo zavolat a ráda vám pomůžu s veškerými potřebami v oblasti správy – od běžné údržby přes výběr nájemného až po komunikaci s nájemníky. Díky mým zkušenostem vám zajistím profesionální přístup, který ušetří váš čas a zajistí, že vaše nemovitost bude v těch nejlepších rukou.
          </p>
          <Link href="/kontakt" className="mt-8 inline-flex items-center gap-3 bg-forest px-6 py-4 text-sm font-medium text-white transition hover:bg-[#064226]">
            Domluvit správu <ArrowRight size={17} />
          </Link>
        </div>
      </section>
      <section className="container-wide grid gap-8 border-y border-forest/10 py-16 md:grid-cols-3">
        {["Komunikace s nájemníky", "Výběr nájemného", "Dlouhodobá péče"].map((item) => (
          <div key={item} className="border-l border-gold/70 pl-6">
            <h2 className="font-serif text-3xl text-forest">{item}</h2>
          </div>
        ))}
      </section>
    </main>
  );
}
