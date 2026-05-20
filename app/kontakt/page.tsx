import { Mail, MapPin, Phone } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { createMetadata, siteConfig } from "@/lib/site";

export const metadata = createMetadata({
  title: "Kontakt na realitní makléřku v Mostě",
  description:
    "Kontakt na realitní makléřku Markétu Oktábcovou. Prodej nemovitosti Most, odhad ceny nemovitosti, pronájem a správa v Chomutově, Litvínově a Ústeckém kraji.",
  path: "/kontakt"
});

export default function ContactPage() {
  return (
    <main className="container-wide py-16">
      <SectionHeading
        as="h1"
        eyebrow="Kontakt"
        title="Napište nebo zavolejte"
        text="Ráda si s vámi domluvím osobní konzultaci, odhad, prohlídku nebo správu vaší nemovitosti."
      />

      <section className="mt-12 grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="bg-forest p-8 text-white md:p-12">
          <h2 className="font-serif text-4xl">Markéta Oktábcová reality</h2>
          <div className="mt-8 grid gap-5 text-white/80">
            <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-4">
              <Phone className="text-gold" size={20} /> {siteConfig.displayPhone}
            </a>
            <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-4">
              <Mail className="text-gold" size={20} /> {siteConfig.email}
            </a>
            <a
              href={siteConfig.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4"
            >
              <MapPin className="mt-1 text-gold" size={20} />
              <p>
                M. Alše 2247
                <br />
                Most
                <br />
                Česká republika
              </p>
            </a>
          </div>
          <p className="mt-8 border-t border-white/15 pt-8 text-sm text-white/70">IČO: 71775188</p>
        </div>

        <div className="grid gap-8 bg-white p-8 shadow-soft md:p-12">
          <div>
            <h2 className="font-serif text-4xl text-forest">Provozní doba</h2>
            <div className="mt-8 grid gap-5 text-muted">
              <div className="flex justify-between gap-6 border-b border-forest/10 pb-4">
                <span>Pondělí – Čtvrtek</span>
                <span className="font-medium text-forest">09:00 – 18:00</span>
              </div>
              <div className="flex justify-between gap-6 border-b border-forest/10 pb-4">
                <span>Pátek</span>
                <span className="font-medium text-forest">09:00 – 16:00</span>
              </div>
              <div className="flex justify-between gap-6 border-b border-forest/10 pb-4">
                <span>Sobota – Neděle</span>
                <span className="font-medium text-forest">Dle domluvy</span>
              </div>
            </div>
            <p className="mt-8 text-sm leading-7 text-muted">
              Mimo tyto hodiny mi prosím zanechte vzkaz nebo e-mail. Děkuji.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
