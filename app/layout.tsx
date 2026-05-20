import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl, siteConfig } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Markéta Oktábcová reality | Realitní makléř Most",
    template: "%s | Markéta Oktábcová reality"
  },
  description: siteConfig.description,
  alternates: {
    canonical: absoluteUrl("/")
  },
  openGraph: {
    title: "Markéta Oktábcová reality | Realitní makléř Most",
    description: siteConfig.description,
    url: absoluteUrl("/"),
    siteName: siteConfig.name,
    locale: "cs_CZ",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="cs">
      <body className="antialiased">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": ["LocalBusiness", "RealEstateAgent"],
            name: siteConfig.name,
            url: siteConfig.url,
            telephone: siteConfig.displayPhone,
            email: siteConfig.email,
            address: {
              "@type": "PostalAddress",
              streetAddress: siteConfig.address.street,
              addressLocality: siteConfig.address.city,
              addressCountry: "CZ"
            },
            areaServed: ["Most", "Chomutov", "Litvínov", "Ústecký kraj"],
            image: absoluteUrl("/images/mainlogo.png")
          }}
        />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: siteConfig.name,
            url: siteConfig.url,
            inLanguage: "cs-CZ"
          }}
        />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
