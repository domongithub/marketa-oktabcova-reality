import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PropertyCard } from "@/components/PropertyCard";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { createMetadata } from "@/lib/site";
import { getPublicProperties } from "@/lib/crm/properties";

const services = [
  {
    title: "Prodej nemovitosti",
    text: "Připravím prodejní strategii, prezentaci i celý postup tak, aby prodej proběhl bezpečně a s dobrým výsledkem.",
    featured: true
  },
  {
    title: "Odhad tržní ceny",
    text: "Stanovím realistickou cenu podle lokality, stavu nemovitosti a aktuální poptávky."
  },
  {
    title: "Profesionální prezentace",
    text: "Zajistím atraktivní text, fotky a inzerci, která pomůže nemovitost odlišit od ostatních."
  },
  {
    title: "Pronájem nemovitosti",
    text: "Pomohu najít vhodného nájemníka, nastavit podmínky a připravit potřebné podklady."
  },
  {
    title: "Smluvní a právní servis",
    text: "Zajistím bezpečný průběh obchodu ve spolupráci s ověřenými právními odborníky."
  },
  {
    title: "Výkup nemovitosti",
    text: "Pokud potřebujete řešit prodej rychle, pomohu najít vhodné a férové řešení."
  }
];

const heroProof = ["Osobní přístup", "Kvalitní prezentace", "Ústecký kraj, Praha a okolí"];

export const metadata = createMetadata({
  title: "Realitní makléř Most | Markéta Oktábcová reality",
  description:
    "Reality Most, Chomutov, Litvínov a Ústecký kraj. Markéta Oktábcová pomáhá s prodejem nemovitosti, odhadem ceny nemovitosti, pronájmem a správou.",
  path: "/"
});

export const revalidate = 60;

export default async function Home() {
  const { activeProperties, soldProperties } = await getPublicProperties();

  return (
    <main>
      <section className="container-wide grid min-h-[calc(100svh-80px)] gap-6 py-8 md:min-h-[82vh] lg:grid-cols-[0.86fr_1.14fr] lg:items-center lg:gap-2 lg:py-8">
        <div className="relative z-10 flex h-full -translate-y-3 flex-col justify-center lg:max-w-[545px]">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.32em] text-gold">Reality s osobním přístupem</p>
          <h1 className="max-w-3xl font-serif text-5xl leading-[0.98] text-forest sm:text-6xl md:text-7xl">
            Markéta Oktábcová
          </h1>
          <p className="mt-6 max-w-[520px] text-lg leading-8 text-muted md:text-[1.28rem] md:leading-9">
            Bezpečný prodej nemovitostí v Ústeckém kraji, Praze a okolí — s osobním vedením, kvalitní prezentací a jasným postupem.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/odhad" className="inline-flex items-center justify-center gap-3 bg-forest px-7 py-4 text-[0.92rem] font-semibold tracking-[0.01em] text-white transition duration-300 hover:-translate-y-px hover:bg-[#073b23] hover:shadow-[0_14px_34px_rgba(0,47,27,0.14)]">
              Nezávazně ocenit nemovitost <ArrowRight size={17} />
            </Link>
            <Link href="/nemovitosti" className="inline-flex items-center justify-center border border-forest/15 px-7 py-4 text-[0.92rem] font-medium tracking-[0.01em] text-forest transition duration-300 hover:-translate-y-px hover:border-gold/60 hover:bg-white/70">
              Zobrazit nabídku
            </Link>
          </div>
          <div className="mt-7 flex max-w-[560px] flex-wrap items-center gap-x-3 gap-y-2 text-[0.82rem] font-medium tracking-[0.08em] text-muted">
            {heroProof.map((item, index) => (
              <span key={item} className="inline-flex items-center gap-3">
                {item}
                {index < heroProof.length - 1 ? <span className="text-gold/80">·</span> : null}
              </span>
            ))}
          </div>
        </div>
        <div className="relative -mr-3 flex min-h-[430px] items-end justify-center overflow-hidden sm:min-h-[540px] lg:-mr-10 lg:min-h-[660px] lg:justify-end">
          <div className="absolute bottom-10 right-6 h-[75%] w-[72%] max-w-[545px] border border-gold/15 bg-[#f1eadf]/55" />
          <Image
            src="/images/marketa-cutout-hq.png"
            alt="Markéta Oktábcová"
            width={1334}
            height={2000}
            priority
            className="relative z-10 h-[505px] w-auto translate-x-5 -translate-y-3 object-contain object-bottom drop-shadow-[0_24px_34px_rgba(0,47,27,0.13)] sm:h-[650px] lg:h-[min(760px,calc(100svh-130px))] lg:translate-x-10 lg:-translate-y-2"
          />
        </div>
      </section>

      <section className="border-y border-forest/10 bg-white py-20 md:py-24">
        <Reveal className="container-wide">
          <div className="max-w-4xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-gold">Služby</p>
            <h2 className="font-serif text-4xl leading-tight text-forest md:text-6xl">
              Prodej nemovitosti bez zbytečného stresu
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
              Postarám se o celý proces od prvního odhadu přes prezentaci až po bezpečné předání. Vy máte přehled, jistotu a jasný postup.
            </p>
          </div>
          <div className="mt-12 grid gap-x-8 gap-y-6 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service, index) => (
              <article
                key={service.title}
                className={`group border-t p-6 transition duration-300 ${
                  service.featured
                    ? "border-gold/60 bg-linen/55 shadow-[0_18px_45px_rgba(0,47,27,0.06)]"
                    : "border-forest/10 hover:bg-linen/35"
                }`}
              >
                <div className={`mb-6 text-sm font-semibold tracking-[0.22em] ${service.featured ? "text-gold" : "text-forest/45"}`}>
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h3 className="font-serif text-2xl leading-tight text-forest">{service.title}</h3>
                <p className="mt-4 max-w-sm text-sm leading-7 text-muted">{service.text}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="container-wide py-24">
        <Reveal className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Nemovitosti"
            title="Aktuální nabídka"
            text="Vybrané nemovitosti z aktuální nabídky. Prohlédněte si byty, domy a investiční příležitosti, které jsou právě k dispozici."
          />
          <Link href="/nemovitosti" className="inline-flex items-center gap-2 text-sm font-medium text-forest transition duration-300 hover:translate-x-1 hover:text-gold">
            Celá nabídka <ArrowRight size={16} />
          </Link>
        </Reveal>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {activeProperties.length ? activeProperties.map((property) => (
            <Reveal key={property.slug} delay={0.06}>
              <PropertyCard property={property} />
            </Reveal>
          )) : (
            <p className="text-lg text-muted md:col-span-2 lg:col-span-4">Aktuálně připravujeme nové nabídky.</p>
          )}
        </div>
      </section>

      <section className="bg-linen py-24">
        <Reveal className="container-wide grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div className="relative flex min-h-[520px] items-end justify-center overflow-hidden">
            <div className="absolute bottom-8 left-1/2 h-[78%] w-[78%] max-w-[500px] -translate-x-1/2 border border-gold/15 bg-[#fbfaf7]/70" />
            <Image
              src="/images/marketa-about-cutout.png"
              alt="Markéta Oktábcová"
              width={667}
              height={1000}
              className="relative z-10 h-[560px] w-auto object-contain object-bottom drop-shadow-[0_24px_34px_rgba(0,47,27,0.12)]"
            />
          </div>
          <div>
            <SectionHeading eyebrow="O mně" title="Realitní služba stojí na důvěře, komunikaci a pečlivosti." />
            <p className="mt-7 text-lg leading-8 text-muted">
              Jsem realitní makléřka se vstřícným přístupem ke klientům a s letitými zkušenostmi v oblasti prodeje, pronájmu a správy nemovitostí. Specializuji se na Ústecký a Středočeský kraj a Prahu.
            </p>
            <Link href="/o-mne" className="mt-8 inline-flex items-center gap-3 border border-forest px-6 py-4 text-sm font-medium text-forest transition hover:bg-forest hover:text-white">
              Více o Markétě <ArrowRight size={17} />
            </Link>
          </div>
        </Reveal>
      </section>

      <section className="container-wide py-24">
        <Reveal>
          <SectionHeading
            eyebrow="Prodáno"
            title="Nemovitosti, které už našly nové majitele"
            text="Ukázka nemovitostí, u kterých se podařilo najít nové majitele díky správné ceně, prezentaci a vedení celého procesu."
            align="center"
          />
        </Reveal>
        <div className="mx-auto mt-14 grid auto-rows-fr max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
          {soldProperties.slice(0, 5).map((property) => (
            <Reveal key={property.slug} delay={0.06} className="h-full">
            <article className="group flex h-full flex-col border border-transparent bg-white p-4 shadow-soft transition duration-300 hover:border-gold/35">
              <Link href={`/nemovitosti/${property.slug}`} className="flex h-full flex-col">
                <div className="relative aspect-[4/3] overflow-hidden bg-linen">
                  <span className="absolute left-4 top-4 z-10 border border-gold/30 bg-forest/90 px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white shadow-[0_10px_24px_rgba(0,47,27,0.08)]">
                    Prodáno
                  </span>
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="aspect-[4/3] w-full object-cover brightness-[1.08] contrast-[0.96] saturate-[0.92] transition duration-700 group-hover:scale-[1.03] group-hover:brightness-[1.12]"
                  />
                </div>
                <div className="flex grow flex-col px-2 pb-2 pt-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">{property.location}</p>
                  <h3 className="mt-3 font-serif text-3xl leading-tight text-forest">{property.title}</h3>
                  <p className="line-clamp-3 mt-4 min-h-[6rem] text-base leading-8 text-muted">{property.excerpt}</p>
                  <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 border-t border-forest/10 pt-4 text-sm text-forest/75">
                    <span>{property.disposition}</span>
                    <span>{property.size}</span>
                    <span>{property.type}</span>
                  </div>
                </div>
              </Link>
            </article>
            </Reveal>
          ))}
          <Reveal delay={0.06} className="h-full">
            <Link
              href="/prodano"
              className="group flex h-full flex-col justify-between border border-gold/25 bg-linen/55 p-8 transition duration-300 hover:-translate-y-px hover:border-forest/25 hover:bg-white hover:shadow-soft"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">Archiv</p>
                <h3 className="mt-5 font-serif text-4xl leading-tight text-forest">Další prodané nemovitosti</h3>
                <p className="mt-5 text-base leading-8 text-muted">
                  Prohlédněte si celý archiv prodaných a pronajatých nemovitostí.
                </p>
              </div>
              <span className="mt-10 inline-flex w-fit border border-forest/20 px-5 py-3 text-sm font-semibold text-forest transition group-hover:border-gold/60">
                Zobrazit archiv
              </span>
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
