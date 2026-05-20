import { AdminShell } from "@/components/admin/AdminShell";
import { dryRunSrealityAction, exportSrealityAction, removeSrealityAction, validateSrealityAction } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/admin/auth";
import { getAdminProperty } from "@/lib/crm/properties";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { srealityStatusLabels } from "@/lib/crm/labels";
import { getSrealityRuntimeStatus } from "@/services/sreality/session";
import { validateForSreality } from "@/services/sreality/validator";
import type { SrealityExportLog } from "@/lib/crm/types";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PropertySrealityPage({ params }: Props) {
  const admin = await requireAdmin();
  const { id } = await params;
  const property = await getAdminProperty(id);
  const validation = validateForSreality(property);
  const runtime = getSrealityRuntimeStatus();
  const { data } = await getSupabaseAdmin()
    .from("sreality_export_logs")
    .select("*")
    .eq("property_id", id)
    .order("created_at", { ascending: false })
    .limit(20);
  const logs = (data || []) as SrealityExportLog[];

  return (
    <AdminShell admin={admin}>
      <p className="text-xs uppercase tracking-[0.24em] text-gold">Sreality</p>
      <h1 className="mt-2 font-serif text-4xl">{property.title}</h1>

      <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="border border-forest/10 bg-white p-6 shadow-soft">
          <h2 className="font-serif text-2xl">Připravenost exportu</h2>
          <div className="mt-5 grid gap-3 text-sm">
            <p>Stav Sreality: <strong>{srealityStatusLabels[property.sreality_status]}</strong></p>
            <p>Live export: <strong>{runtime.liveReady ? "připraven" : "dry-run režim"}</strong></p>
            {!runtime.softwareKeyConfigured ? <p className="text-gold">Chybí Sreality software key. Export je zatím pouze v testovacím režimu.</p> : null}
            {!runtime.exportEnabled ? <p className="text-gold">Sreality export je vypnutý. Proběhne pouze dry-run.</p> : null}
          </div>
          <div className="mt-6 grid gap-2">
            {validation.errors.map((error) => (
              <p key={error} className="border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">{error}</p>
            ))}
            {validation.warnings.map((warning) => (
              <p key={warning} className="border border-gold/30 bg-linen px-3 py-2 text-sm text-forest">{warning}</p>
            ))}
            {validation.valid ? <p className="border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-800">Nemovitost je připravená pro Sreality.</p> : null}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <form action={validateSrealityAction.bind(null, id)}><button className="border border-forest/15 px-4 py-3 text-sm hover:border-gold/60">Zkontrolovat Sreality</button></form>
            <form action={dryRunSrealityAction.bind(null, id)}><button className="border border-forest/15 px-4 py-3 text-sm hover:border-gold/60">Dry-run export</button></form>
            <form action={exportSrealityAction.bind(null, id)}><button className="bg-forest px-4 py-3 text-sm font-semibold text-white hover:bg-[#073b23]">Ostrý export</button></form>
            <form action={removeSrealityAction.bind(null, id)}><button className="border border-red-200 px-4 py-3 text-sm text-red-700 hover:bg-red-50">Stáhnout ze Srealit</button></form>
          </div>
        </section>

        <section className="border border-forest/10 bg-white p-6 shadow-soft">
          <h2 className="font-serif text-2xl">Payload preview</h2>
          <pre className="mt-5 max-h-[520px] overflow-auto bg-[#f7f4ee] p-4 text-xs leading-6">
            {JSON.stringify(property.sreality_payload_preview || { message: "Spusťte dry-run export." }, null, 2)}
          </pre>
        </section>
      </div>

      <section className="mt-8 border border-forest/10 bg-white p-6 shadow-soft">
        <h2 className="font-serif text-2xl">Historie exportů</h2>
        <div className="mt-5 grid gap-3">
          {logs.map((log) => (
            <div key={log.id} className="border border-forest/10 p-4 text-sm">
              <p><strong>{log.action}</strong> · {log.status} · {new Date(log.created_at).toLocaleString("cs-CZ")}</p>
              {log.error_message ? <p className="mt-2 text-red-700">{log.error_message}</p> : null}
            </div>
          ))}
          {!logs.length ? <p className="text-sm text-muted">Zatím bez exportních logů.</p> : null}
        </div>
      </section>
    </AdminShell>
  );
}
