import { AdminShell } from "@/components/admin/AdminShell";
import { PropertyForm } from "@/components/admin/PropertyForm";
import { updatePropertyAction, setPropertyStatusAction } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/admin/auth";
import { statusLabels } from "@/lib/crm/labels";
import { getAdminProperty } from "@/lib/crm/properties";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditPropertyPage({ params }: Props) {
  const admin = await requireAdmin();
  const { id } = await params;
  const property = await getAdminProperty(id);

  return (
    <AdminShell admin={admin}>
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-gold">Editace</p>
          <h1 className="mt-2 font-serif text-4xl">{property.title}</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            ["reserved", "Rezervováno"],
            ["sold", "Prodáno"],
            ["rented", "Pronajato"],
            ["hidden", "Skrýt"],
            ["archived", "Archivovat"]
          ].map(([status, label]) => (
            <form key={status} action={setPropertyStatusAction.bind(null, property.id, status as "reserved" | "sold" | "rented" | "hidden" | "archived")}>
              <button className="border border-forest/15 bg-white px-3 py-2 text-sm hover:border-gold/60">{label}</button>
            </form>
          ))}
        </div>
      </div>
      <div className="mt-8">
        <p className="mb-4 text-sm text-muted">Aktuální stav: <strong className="text-forest">{statusLabels[property.status]}</strong></p>
        <PropertyForm property={property} action={updatePropertyAction.bind(null, property.id)} />
      </div>
    </AdminShell>
  );
}
