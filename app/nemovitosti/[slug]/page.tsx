import Link from "next/link";
import { ArrowLeft, Mail, Phone } from "lucide-react";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { PropertyGallery } from "@/components/PropertyGallery";
import { getPublicProperties, getPublicPropertyBySlug } from "@/lib/crm/properties";
import { absoluteUrl, createMetadata } from "@/lib/site";

type PropertyDetailProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 60;

export async function generateStaticParams() {
  const { properties } = await getPublicProperties();
  return properties.map((property) => ({ slug: property.slug }));
}

export async function generateMetadata({ params }: PropertyDetailProps) {
  const { slug } = await params;
  const property = await getPublicPropertyBySlug(slug);

  if (!property) {
    return createMetadata({
      title: "Nemovitost nenalezena",
      description: "Požadovaná nemovitost nebyla nalezena.",
      path: "/nemovitosti"
    });
  }

  return createMetadata({
    title: `${property.title} | ${property.location}`,
    description: `${property.title} v lokalitě ${property.location}. ${property.excerpt}`,
    path: `/nemovitosti/${property.slug}`,
    image: property.image
  });
}

export default async function PropertyDetailPage({ params }: PropertyDetailProps) {
  const { slug } = await params;
  const property = await getPublicPropertyBySlug(slug);

  if (!property) {
    notFound();
  }
  const isClosed = property.status === "Prodáno" || property.status === "Pronajato";

  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Domů",
              item: absoluteUrl("/")
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Nemovitosti",
              item: absoluteUrl("/nemovitosti")
            },
            {
              "@type": "ListItem",
              position: 3,
              name: property.title,
              item: absoluteUrl(`/nemovitosti/${property.slug}`)
            }
          ]
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: property.title,
          description: property.description,
          url: absoluteUrl(`/nemovitosti/${property.slug}`),
          image: property.gallery.length ? property.gallery : [property.image],
          about: {
            "@type": "Residence",
            name: property.title,
            address: property.location
          }
        }}
      />
      <section className="container-wide py-10">
        <Link href="/nemovitosti" className="inline-flex items-center gap-2 text-sm text-forest">
          <ArrowLeft size={16} /> Zpět na nemovitosti
        </Link>
        <div className="mt-10 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">{property.location}</p>
            <h1 className="mt-4 font-serif text-5xl leading-tight text-forest md:text-7xl">{property.title}</h1>
            <p className="mt-6 text-lg leading-8 text-muted">{property.excerpt}</p>
          </div>
          <div className="grid gap-4 bg-white p-6 shadow-soft sm:grid-cols-2">
            {[
              ["Cena", property.price],
              ["Dispozice", property.disposition],
              ["Plocha", property.size],
              ["Stav", property.status]
            ].map(([label, value]) => (
              <div key={label} className="border-l border-gold/60 pl-4">
                <p className="text-xs uppercase tracking-[0.22em] text-muted">{label}</p>
                <p className="mt-2 font-serif text-2xl text-forest">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-wide">
        <PropertyGallery images={property.gallery.length ? property.gallery : [property.image]} title={property.title} />
      </section>

      <section className={`container-wide grid gap-14 py-20 ${isClosed ? "" : "lg:grid-cols-[1fr_360px]"}`}>
        <div>
          <h2 className="font-serif text-4xl text-forest">Popis nemovitosti</h2>
          <p className="mt-6 text-lg leading-8 text-muted">{property.description}</p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {property.highlights.map((highlight) => (
              <div key={highlight} className="border border-forest/10 bg-white p-5 text-forest">
                {highlight}
              </div>
            ))}
          </div>
        </div>
        {!isClosed ? (
          <aside className="h-fit bg-forest p-8 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">Zaujala vás nabídka?</p>
            <h2 className="mt-5 font-serif text-4xl">Ozvěte se mi</h2>
            <p className="mt-4 text-sm leading-7 text-white/75">
              Ráda vám pošlu další informace, domluvím prohlídku nebo připravím srovnání podobných nemovitostí.
            </p>
            <div className="mt-8 grid gap-3">
              <a href="tel:+420602280203" className="inline-flex items-center justify-center gap-3 border border-white/25 px-5 py-4 text-sm font-medium transition hover:bg-white hover:text-forest">
                <Phone size={17} /> +420 602 280 203
              </a>
              <a href="mailto:reality@marketaoktabcova.cz" className="inline-flex items-center justify-center gap-3 bg-gold px-5 py-4 text-sm font-medium text-forest transition hover:bg-white">
                <Mail size={17} /> Napsat e-mail
              </a>
              {property.sourceUrl ? (
                <a
                  href={property.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center border border-white/25 px-5 py-4 text-sm font-medium transition hover:bg-white hover:text-forest"
                >
                  Zobrazit na Sreality
                </a>
              ) : null}
            </div>
          </aside>
        ) : null}
      </section>
    </main>
  );
}
