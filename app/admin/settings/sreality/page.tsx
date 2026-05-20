import { AdminShell } from "@/components/admin/AdminShell";
import { requireAdmin } from "@/lib/admin/auth";
import { getSrealityRuntimeStatus } from "@/services/sreality/session";

export default async function SrealitySettingsPage() {
  const admin = await requireAdmin();
  const status = getSrealityRuntimeStatus();

  return (
    <AdminShell admin={admin}>
      <p className="text-xs uppercase tracking-[0.24em] text-gold">Nastavení</p>
      <h1 className="mt-2 font-serif text-4xl">Sreality import</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {[
          ["Endpoint", status.importUrl],
          ["Client ID", status.clientIdConfigured ? "nastaveno" : "chybí"],
          ["Password MD5", status.passwordConfigured ? "nastaveno" : "chybí"],
          ["Software key", status.softwareKeyConfigured ? "nastaveno" : "chybí"],
          ["Ostrý export", status.exportEnabled ? "zapnutý" : "vypnutý"],
          ["Stav", status.liveReady ? "připraveno pro ostrý export" : "dry-run režim"]
        ].map(([label, value]) => (
          <div key={label} className="border border-forest/10 bg-white p-5 shadow-soft">
            <p className="text-xs uppercase tracking-[0.18em] text-muted">{label}</p>
            <p className="mt-2 font-medium">{value}</p>
          </div>
        ))}
      </div>
      <p className="mt-6 max-w-2xl text-sm leading-7 text-muted">
        Citlivé údaje se načítají pouze ze serverových environment variables. Nezobrazují se ve frontendu a neukládají se do repozitáře.
      </p>
    </AdminShell>
  );
}
