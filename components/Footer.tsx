import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-forest/10 bg-forest text-white">
      <div className="container-wide grid gap-10 py-14 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <Image
            src="/images/mainlogo.png"
            alt="Markéta Oktábcová reality"
            width={800}
            height={416}
            className="h-16 w-auto brightness-0 invert"
          />
          <p className="mt-6 max-w-md text-sm leading-7 text-white/70">
            Osobní a profesionální realitní služby v Ústeckém, Středočeském kraji a v Praze.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-gold">Kontakt</h3>
          <div className="mt-5 grid gap-2 text-sm text-white/75">
            <a href={`tel:${siteConfig.phone}`}>{siteConfig.displayPhone}</a>
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            <a href={siteConfig.mapsUrl} target="_blank" rel="noopener noreferrer">
              {siteConfig.address.street}, {siteConfig.address.city}
            </a>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-gold">Navigace</h3>
          <div className="mt-5 grid gap-2 text-sm text-white/75">
            <Link href="/nemovitosti">Nemovitosti</Link>
            <Link href="/o-mne">O mně</Link>
            <Link href="/kontakt">Kontakt</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
