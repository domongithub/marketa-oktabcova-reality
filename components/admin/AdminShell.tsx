import Link from "next/link";
import type { ReactNode } from "react";
import type { AdminUser } from "@/lib/crm/types";

export function AdminShell({ admin, children }: { admin: AdminUser; children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="border-b border-forest/10 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-gold">CRM</p>
            <p className="font-serif text-2xl text-forest">Markéta Oktábcová reality</p>
          </div>
          <nav className="flex flex-wrap items-center gap-4 text-sm">
            <Link className="hover:text-gold focus:outline-none focus:ring-2 focus:ring-gold/60" href="/admin">
              Přehled
            </Link>
            <Link className="hover:text-gold focus:outline-none focus:ring-2 focus:ring-gold/60" href="/admin/properties">
              Nemovitosti
            </Link>
            <Link className="hover:text-gold focus:outline-none focus:ring-2 focus:ring-gold/60" href="/admin/settings/sreality">
              Sreality
            </Link>
            <span className="text-muted">{admin.email}</span>
            <form action="/api/admin/logout" method="post">
              <button className="border border-forest/15 px-4 py-2 text-sm hover:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/60">
                Odhlásit
              </button>
            </form>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-5 py-8">{children}</main>
    </div>
  );
}
