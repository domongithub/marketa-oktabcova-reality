import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { createMetadata } from "@/lib/site";

export const metadata = createMetadata({
  title: "O mně | Realitní makléř Most",
  description:
    "Markéta Oktábcová, realitní makléřka pro Most, Chomutov, Litvínov, Ústecký kraj, Středočeský kraj a Prahu. Osobní vedení prodeje, pronájmu a odhadu nemovitostí.",
  path: "/o-mne"
});

const paragraphs = [
  "Dobrý den, jsem Markéta Oktábcová. Jsem realitní makléřka se vstřícným přístupem ke klientům a s letitými zkušenostmi v oblasti prodeje, pronájmu a správy nemovitostí. Specializuji se na reality v Ústeckém, Středočeském kraji a v Praze. Oblast Ústeckého kraje dobře znám, místní trh i jeho specifika. Taktéž se orientuji v Praze a jeho okolí, kde jsem prodala již nespočet nemovitostí.",
  "Mým cílem je vždy najít pro klienty ideální řešení, ať už hledají vysněné bydlení nebo chtějí svou nemovitost výhodně prodat. Svou práci dělám s nadšením a maximální pečlivostí. Věřím, že úspěšný prodej či nákup nemovitosti stojí na otevřené komunikaci, důvěře, individuálním přístupu a schopnosti naslouchat přáním klientů.",
  "Ve svém portfoliu činností se též věnuji správě nemovitostí – bytových domů, především bytových jednotek spojenou s následnou dlouhodobou spoluprací s investory v realitním trhu. Pro jednotlivé investory vyhledávám investiční byty dle jejich specifikací především v okolí měst Most a Chomutov.",
  "Jelikož z této oblasti pocházím, mám zájem na udržení slušných a žádaných lokalit, na což všichni investoři, se kterými spolupracuji, též cílí. Pro klienty zpracovávám odhady nemovitosti na profesionálním portálu Valuo, které je propojeno s aktuálními daty z katastru nemovitostí.",
  "Ve svém volném čase se věnuji především rodině, cvičení a cestování, které mi pomáhá rozšiřovat obzory a lépe pochopit potřeby lidí při hledání nového domova.",
  "Pokud hledáte makléřku, která se do své práce vloží celým srdcem, která se snaží o hladký průběh celého procesu, která se nezalekne vzniklých problémů, ale vždy je s vervou a společně se svým právním zastoupením řeší do zdárného konce, tak jsem tu právě pro Vás."
];

export default function AboutPage() {
  return (
    <main>
      <section className="container-wide grid gap-12 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <SectionHeading as="h1" eyebrow="O mně" title="Dobrý den, jsem Markéta Oktábcová" />
          <div className="relative mt-10 flex min-h-[560px] items-end justify-center overflow-hidden">
            <div className="absolute bottom-8 left-1/2 h-[78%] w-[78%] max-w-[500px] -translate-x-1/2 border border-gold/15 bg-linen/70" />
            <Image
              src="/images/marketa-about-cutout.png"
              alt="Markéta Oktábcová"
              width={667}
              height={1000}
              className="relative z-10 h-[600px] w-auto object-contain object-bottom drop-shadow-[0_24px_34px_rgba(0,47,27,0.12)]"
            />
          </div>
        </div>
        <div className="bg-white p-8 shadow-soft md:p-12">
          <div className="grid gap-7 text-lg leading-9 text-muted">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <Link href="/kontakt" className="mt-10 inline-flex items-center gap-3 bg-forest px-6 py-4 text-sm font-medium text-white transition hover:bg-[#064226]">
            Kontaktovat Markétu <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
}
