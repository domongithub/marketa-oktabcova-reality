import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { createMetadata } from "@/lib/site";

export const metadata = createMetadata({
  title: "Odhad ceny nemovitosti Most, Chomutov a Litvínov",
  description:
    "Nezávazný odhad ceny nemovitosti v Mostě, Chomutově, Litvínově a Ústeckém kraji. Zjistěte reálnou hodnotu bytu, domu nebo investiční nemovitosti.",
  path: "/odhad"
});

const valuationUses = [
  {
    title: "Pro prodej",
    text: "Zjistíte, za jakou cenu má smysl nemovitost nabídnout, aby prodej nebyl zbytečně dlouhý ani pod cenou."
  },
  {
    title: "Pro pronájem",
    text: "Pomohu nastavit nájemné podle lokality, dispozice, stavu a aktuální poptávky."
  },
  {
    title: "Pro refinancování",
    text: "Získáte orientační hodnotu nemovitosti jako podklad pro další jednání."
  }
];

export default function ValuationPage() {
  return (
    <main>
      <section className="container-wide grid gap-12 py-16 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div className="bg-white p-8 shadow-soft md:p-12">
          <div className="grid gap-5 text-lg leading-9 text-muted">
            <p>Potřebujete znát reálnou hodnotu své nemovitosti?</p>
            <p>
              Připravím pro vás odhad podle lokality, stavu nemovitosti, aktuální poptávky a podobných prodejů v okolí. Ať už zvažujete prodej, pronájem nebo refinancování, získáte jasný podklad pro další rozhodnutí.
            </p>
          </div>
          <Link
            href="/kontakt"
            className="mt-9 inline-flex items-center gap-3 bg-forest px-7 py-4 text-sm font-semibold tracking-[0.01em] text-white transition duration-300 hover:-translate-y-px hover:bg-[#073b23] hover:shadow-[0_14px_34px_rgba(0,47,27,0.14)]"
          >
            Nezávazně ocenit nemovitost <ArrowRight size={17} />
          </Link>
        </div>
        <SectionHeading
          as="h1"
          eyebrow="Odhad"
          title="Zjistěte hodnotu své nemovitosti bez zbytečného tlaku"
          text="Ocenění připravené s ohledem na lokalitu, stav nemovitosti, aktuální poptávku a reálný způsob dalšího využití."
        />
      </section>
      <section className="bg-linen py-16">
        <div className="container-wide grid gap-6 md:grid-cols-3">
          {valuationUses.map((item) => (
            <article key={item.title} className="border-t border-gold/40 bg-[#fbfaf7] p-8 transition duration-300 hover:border-forest/20">
              <h2 className="font-serif text-3xl text-forest">{item.title}</h2>
              <p className="mt-5 text-sm leading-7 text-muted">{item.text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
