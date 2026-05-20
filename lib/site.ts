import type { Metadata } from "next";

export const siteConfig = {
  name: "Markéta Oktábcová reality",
  url: "https://marketaoktabcova.cz",
  description:
    "Realitní makléřka pro Most, Chomutov, Litvínov a Ústecký kraj. Prodej nemovitosti, odhad ceny nemovitosti, pronájem a správa.",
  phone: "+420602280203",
  displayPhone: "+420 602 280 203",
  email: "reality@marketaoktabcova.cz",
  address: {
    street: "M. Alše 2247",
    city: "Most",
    country: "Česká republika"
  },
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=M.%20Al%C5%A1e%202247%2C%20Most%2C%20%C4%8Cesk%C3%A1%20republika"
};

type SeoInput = {
  title: string;
  description: string;
  path?: string;
  image?: string;
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

export function createMetadata({ title, description, path = "/", image = "/images/mainlogo.png" }: SeoInput): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: {
      canonical: url
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: "cs_CZ",
      type: "website",
      images: [
        {
          url: absoluteUrl(image),
          width: 1200,
          height: 630,
          alt: siteConfig.name
        }
      ]
    }
  };
}
