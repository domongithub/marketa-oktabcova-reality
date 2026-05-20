import Image from "next/image";
import Link from "next/link";

const navItems = [
  { href: "/", label: "Úvodní stránka" },
  { href: "/nemovitosti", label: "Nemovitosti" },
  { href: "/správa-nemovitostí", label: "Správa" },
  { href: "/odhad", label: "Odhad" },
  { href: "/reference", label: "Reference" },
  { href: "/o-mne", label: "O mně" },
  { href: "/kontakt", label: "Kontakt" }
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gold/20 bg-[#002f1b] shadow-[0_10px_30px_rgba(0,47,27,0.08)]">
      <div className="container-wide flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-3" aria-label="Markéta Oktábcová reality">
          <Image
            src="/images/mainlogo.png"
            alt="Markéta Oktábcová reality"
            width={800}
            height={416}
            priority
            className="h-[4.2rem] w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-linen/90 lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-gold">
              {item.label}
            </Link>
          ))}
        </nav>

        <a
          href="tel:+420602280203"
          className="hidden border border-gold/70 px-5 py-3 text-sm font-medium text-linen transition hover:bg-gold hover:text-forest md:inline-flex"
        >
          Zavolat
        </a>

        <details className="group relative lg:hidden">
          <summary
            className="flex h-11 w-11 cursor-pointer list-none items-center justify-center border border-gold/40 text-linen transition hover:border-gold hover:text-gold [&::-webkit-details-marker]:hidden"
            aria-label="Otevřít menu"
          >
            <span className="grid gap-1.5">
              <span className="block h-px w-5 bg-current transition group-open:translate-y-[7px] group-open:rotate-45" />
              <span className="block h-px w-5 bg-current transition group-open:opacity-0" />
              <span className="block h-px w-5 bg-current transition group-open:-translate-y-[7px] group-open:-rotate-45" />
            </span>
          </summary>
          <nav className="absolute right-0 top-[calc(100%+1.125rem)] grid w-[min(82vw,340px)] gap-1 border border-gold/15 bg-forest p-5 shadow-[0_24px_70px_rgba(0,47,27,0.22)]">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="py-3 text-lg text-linen transition hover:text-gold">
                {item.label}
              </Link>
            ))}
            <a href="tel:+420602280203" className="mt-2 border border-gold/60 px-4 py-3 text-center text-linen transition hover:bg-gold hover:text-forest">
              Zavolat
            </a>
          </nav>
        </details>
      </div>
    </header>
  );
}
