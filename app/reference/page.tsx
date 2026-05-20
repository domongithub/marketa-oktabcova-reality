import { SectionHeading } from "@/components/SectionHeading";
import { createMetadata } from "@/lib/site";

export const metadata = createMetadata({
  title: "Reference klientů | Realitní makléř Most",
  description:
    "Reference klientů Markéty Oktábcové pro prodej nemovitostí, pronájem, odhad ceny nemovitosti a správu v Mostě, Chomutově, Litvínově a Ústeckém kraji.",
  path: "/reference"
});

type Review = {
  name: string;
  date: string;
  text: string;
};

const reviews: Review[] = [
  {
    name: "Milan Hrubý",
    date: "11. února 2025",
    text: "Hodně šikovná realitní makléřka, ochotná, vstřícná, slušná a moc šikovná a hlavně velice sympatická. Moc děkuji."
  },
  {
    name: "Miloš Minařík",
    date: "7. srpna 2024",
    text: "Velmi proklientská, profesionální makléřka s velkou trpělivostí. Oceňuji i to, že se o parametry nemovitosti opravdu zajímá, aby neprodávala zajíce v pytli, na rozdíl od velké části jiných makléřů. Jednoznačně spokojenost."
  },
  {
    name: "Ondra Novák",
    date: "11. září 2024",
    text: "Velmi děkujeme paní Oktábcové za profesionální přístup při nákupu nemovitosti a následném zabezpečení pronájmu. S takovou péčí o zákazníka, plnění jeho potřeb, výbornou komunikací, hledáním vhodného řešení a poskytnutím cenných rad jsme se ještě nesetkali. Velice si toho vážíme."
  },
  {
    name: "Lenka Janoušková",
    date: "11. září 2024",
    text: "Moc děkuji za pomoc při prodeji mého bytu a hlavně velmi profesionální jednání a lidský a milý přístup. Přeji mnoho dalších úspěchů a super klientů."
  },
  {
    name: "Re 21",
    date: "18. srpna 2024",
    text: "Paní Oktábcové uděluji 5 hvězdiček. Často se nesetkávám s tak kvalitními službami a profesionalitou u realitních makléřů, jako u paní Oktábcové. Celkově jsme společně realizovaly 3 zakázky a jedním slovem perfektní, plná spokojenost. Na čem jsme se domluvily, platilo."
  },
  {
    name: "Jaroslav Fencl",
    date: "23. srpna 2024",
    text: "Paní Markéta je profík každým coulem. Spolupráce s ní nemělo chybu. Držím jí palce v jejím podnikání."
  },
  {
    name: "Markéta Jabůrková",
    date: "20. srpna 2024",
    text: "Paní Oktábcová je opravdu znalkyně svého oboru. Je velmi přátelská, empatická, spolehlivá a komunikace s ní byla vždy na jedničku. Velice ráda poradí a vše potřebné rychle zařídí. Mohu jen doporučit."
  },
  {
    name: "Žaneta Hrubá",
    date: "8. srpna 2024",
    text: "Moc bych chtěla poděkovat paní Oktábcové za skvělý a profesionální přístup. Dokáže vše rychle vyřešit a zajistit. Je to člověk na svém místě. Je velmi vstřícná a obětavá. Mohu jen doporučit."
  },
  {
    name: "Petra Zlatohlavá",
    date: "8. srpna 2024",
    text: "Oceňujeme profesionální a zároveň velmi lidský přístup. Paní Oktábcová se snaží klientům maximálně vyhovět, ale zároveň nic nezastírá. Spolupráce s ní byla příjemná."
  },
  {
    name: "Minarikovajin",
    date: "7. srpna 2024",
    text: "Vše řešeno rychle a profesionálně."
  },
  {
    name: "Radek Klíma",
    date: "7. srpna 2024",
    text: "Chtěl bych paní Oktábcové velmi poděkovat za její zcela profesionální přístup ohledně všech postupů při řešení nákupu i prodeje realit. Velmi vstřícný přístup při řešení jakéhokoliv problému a velkou obětavost. Mohu s klidným svědomím vřele doporučit."
  },
  {
    name: "Marsales s.r.o.",
    date: "7. srpna 2024",
    text: "S paní Oktábcovou spolupracuji už léta a jsem s ní i jejími službami víc než spokojený. Vyhovuje mi profesionální jednání, ochota zařídit nemožné, aby vše fungovalo, a lidský přístup. Spolupráci určitě doporučuji všemi 10ti."
  }
];

export default function ReferencesPage() {
  return (
    <main className="container-wide py-16">
      <SectionHeading
        as="h1"
        eyebrow="Reference"
        title="Zkušenosti klientů"
        text="Skutečná hodnocení klientů, kteří se na Markétu Oktábcovou obrátili při prodeji, nákupu, pronájmu nebo správě nemovitosti."
      />
      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {reviews.map((review) => (
          <article key={`${review.name}-${review.date}`} className="bg-white p-7 shadow-soft">
            <div className="flex items-start justify-between gap-4">
              <h2 className="font-serif text-2xl leading-tight text-forest">{review.name}</h2>
              <p className="shrink-0 text-right text-xs leading-5 text-muted">{review.date}</p>
            </div>
            <p className="mt-5 text-sm tracking-[0.18em] text-gold" aria-label="5 z 5 hvězdiček">
              ★★★★★
            </p>
            <p className="mt-5 text-base leading-8 text-muted">{review.text}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
