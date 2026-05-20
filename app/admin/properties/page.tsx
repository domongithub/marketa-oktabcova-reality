import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { requireAdmin } from "@/lib/admin/auth";
import { offerTypeLabels, propertyTypeLabels, srealityStatusLabels, statusLabels, statusOptions } from "@/lib/crm/labels";
import { getAdminProperties } from "@/lib/crm/properties";

type Props = {
  searchParams: Promise<{ status?: string; offerType?: string; propertyType?: string }>;
};

export default async function AdminPropertiesPage({ searchParams }: Props) {
  const admin = await requireAdmin();
  const filters = await searchParams;
  const properties = await getAdminProperties(filters);

  return (
    <AdminShell admin={admin}>
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-gold">Nemovitosti</p>
          <h1 className="mt-2 font-serif text-4xl">Správa nemovitostí</h1>
        </div>
        <Link href="/admin/properties/new" className="w-fit bg-forest px-5 py-3 text-sm font-semibold text-white hover:bg-[#073b23]">
          Přidat nemovitost
        </Link>
      </div>

      <form className="mt-8 flex flex-wrap gap-3">
        <select name="status" defaultValue={filters.status || ""} className="border border-forest/15 bg-white px-3 py-2">
          <option value="">Všechny stavy</option>
          {statusOptions.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>
        <select name="offerType" defaultValue={filters.offerType || ""} className="border border-forest/15 bg-white px-3 py-2">
          <option value="">Prodej i pronájem</option>
          <option value="sale">Prodej</option>
          <option value="rent">Pronájem</option>
        </select>
        <select name="propertyType" defaultValue={filters.propertyType || ""} className="border border-forest/15 bg-white px-3 py-2">
          <option value="">Všechny typy</option>
          <option value="apartment">Byt</option>
          <option value="house">Dům</option>
          <option value="land">Pozemek</option>
          <option value="commercial">Komerční</option>
          <option value="other">Ostatní</option>
        </select>
        <button className="border border-forest/20 px-4 py-2 text-sm hover:border-gold/60">Filtrovat</button>
      </form>

      <div className="mt-8 overflow-x-auto border border-forest/10 bg-white shadow-soft">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="border-b border-forest/10 text-xs uppercase tracking-[0.18em] text-muted">
            <tr>
              <th className="p-4">Název</th>
              <th className="p-4">Stav</th>
              <th className="p-4">Typ</th>
              <th className="p-4">Web</th>
              <th className="p-4">Sreality</th>
              <th className="p-4">Akce</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => (
              <tr key={property.id} className="border-b border-forest/10 last:border-0">
                <td className="p-4">
                  <p className="font-medium">{property.title}</p>
                  <p className="text-muted">{property.city || property.location}</p>
                </td>
                <td className="p-4">{statusLabels[property.status]}</td>
                <td className="p-4">{offerTypeLabels[property.offer_type]} / {propertyTypeLabels[property.property_type]}</td>
                <td className="p-4">{property.show_on_website ? "Ano" : "Ne"}</td>
                <td className="p-4">{srealityStatusLabels[property.sreality_status]}</td>
                <td className="p-4">
                  <div className="flex gap-3">
                    <Link className="underline decoration-gold underline-offset-4" href={`/admin/properties/${property.id}/edit`}>
                      Upravit
                    </Link>
                    <Link className="underline decoration-gold underline-offset-4" href={`/admin/properties/${property.id}/sreality`}>
                      Sreality
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
