import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container-wide flex min-h-[70vh] items-center py-20">
      <div className="max-w-2xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-gold">404</p>
        <h1 className="font-serif text-5xl leading-tight text-forest md:text-7xl">Stránka nebyla nalezena</h1>
        <p className="mt-6 text-lg leading-8 text-muted">
          Omlouvám se, požadovaná stránka neexistuje nebo byla přesunuta. Můžete se vrátit na nabídku nemovitostí nebo mě kontaktovat.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/nemovitosti"
            className="inline-flex justify-center bg-forest px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#073b23]"
          >
            Zobrazit nabídku
          </Link>
          <Link
            href="/kontakt"
            className="inline-flex justify-center border border-forest/20 px-7 py-4 text-sm font-semibold text-forest transition hover:border-gold/60 hover:bg-white"
          >
            Kontakt
          </Link>
        </div>
      </div>
    </main>
  );
}
