import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { requireAdmin } from "@/lib/admin/auth";
import { getAdminProperties } from "@/lib/crm/properties";
import { isSupabaseConfigured } from "@/lib/supabase/server";

export default async function AdminDashboard() {
  const admin = await requireAdmin();

  if (!isSupabaseConfigured()) {
    return (
      <AdminShell admin={admin}>
        <h1 className="font-serif text-4xl">CRM není připojené k databázi</h1>
        <p className="mt-4 max-w-2xl text-muted">Doplňte `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` a `ADMIN_SESSION_SECRET` do environment variables.</p>
      </AdminShell>
    );
  }

  const properties = await getAdminProperties();
  const active = properties.filter((property) => ["active", "reserved"].includes(property.status)).length;
  const done = properties.filter((property) => ["sold", "rented"].includes(property.status)).length;

  return (
    <AdminShell admin={admin}>
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-gold">Přehled</p>
          <h1 className="mt-2 font-serif text-4xl">Admin CRM</h1>
        </div>
        <Link href="/admin/properties/new" className="w-fit bg-forest px-5 py-3 text-sm font-semibold text-white hover:bg-[#073b23]">
          Přidat nemovitost
        </Link>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          ["Celkem nemovitostí", properties.length],
          ["Aktuální nabídka", active],
          ["Realizované", done]
        ].map(([label, value]) => (
          <div key={label} className="border border-forest/10 bg-white p-6 shadow-soft">
            <p className="text-sm text-muted">{label}</p>
            <p className="mt-3 font-serif text-4xl">{value}</p>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
