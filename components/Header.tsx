"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState } from "react";

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
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-forest/10 bg-[#fbfaf7]/95 backdrop-blur">
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
        <nav className="hidden items-center gap-8 text-sm text-forest lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-gold">
              {item.label}
            </Link>
          ))}
        </nav>
        <a
          href="tel:+420602280203"
          className="hidden border border-forest px-5 py-3 text-sm font-medium text-forest transition hover:bg-forest hover:text-white md:inline-flex"
        >
          Zavolat
        </a>
        <button
          className="inline-flex h-11 w-11 items-center justify-center border border-forest/20 text-forest lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Zavřít menu" : "Otevřít menu"}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open ? (
        <div className="border-t border-forest/10 bg-[#fbfaf7] lg:hidden">
          <nav className="container-wide grid gap-1 py-5">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-3 text-lg text-forest"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
