import { AdminShell } from "@/components/admin/AdminShell";
import { PropertyForm } from "@/components/admin/PropertyForm";
import { createPropertyAction } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/admin/auth";

export default async function NewPropertyPage() {
  const admin = await requireAdmin();

  return (
    <AdminShell admin={admin}>
      <p className="text-xs uppercase tracking-[0.24em] text-gold">Nová nemovitost</p>
      <h1 className="mt-2 font-serif text-4xl">Přidat nemovitost</h1>
      <div className="mt-8">
        <PropertyForm action={createPropertyAction} />
      </div>
    </AdminShell>
  );
}
