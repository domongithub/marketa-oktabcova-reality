import "server-only";
import type { PropertyRecord } from "@/lib/crm/types";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { SrealityClient } from "@/services/sreality/client";
import { translateSrealityStatus } from "@/services/sreality/errors";
import { mapPropertyToSrealityAdvert } from "@/services/sreality/mapper";
import { mapPropertyImagesToSrealityPhotos } from "@/services/sreality/photos";
import { canUseLiveSrealityExport, getSrealityRuntimeStatus } from "@/services/sreality/session";
import { validateForSreality } from "@/services/sreality/validator";

type ExportAction = "validate" | "dry_run" | "export_advert" | "update_advert" | "remove_advert" | "sync_photos" | "list_adverts";

async function writeLog(property: PropertyRecord, action: ExportAction, status: string, payload: Record<string, unknown>, performedBy?: string, error?: string) {
  const supabase = getSupabaseAdmin();
  await supabase.from("sreality_export_logs").insert({
    property_id: property.id,
    action,
    status,
    request_payload: payload,
    response_payload: error ? { error } : null,
    status_message: error || null,
    error_message: error || null,
    performed_by: performedBy || null
  });
}

export async function validatePropertyForSreality(property: PropertyRecord, performedBy?: string) {
  const validation = validateForSreality(property);
  const payload = { validation };
  await writeLog(property, "validate", validation.valid ? "ok" : "error", payload, performedBy);
  return validation;
}

export async function dryRunPropertyExport(property: PropertyRecord, performedBy?: string) {
  const validation = validateForSreality(property);
  const advert = mapPropertyToSrealityAdvert(property);
  const photos = mapPropertyImagesToSrealityPhotos(property);
  const runtime = getSrealityRuntimeStatus();
  const message = !runtime.softwareKeyConfigured
    ? "Chybí Sreality software key. Export je zatím pouze v testovacím režimu."
    : !runtime.exportEnabled
      ? "Sreality export je vypnutý. Proběhl pouze dry-run."
      : "Dry-run hotový. Inzerát je připravený pro Sreality, ale nebyl odeslán.";
  const preview = { advert, photos, validation, runtime: { ...runtime, passwordConfigured: runtime.passwordConfigured } };

  const supabase = getSupabaseAdmin();
  await supabase
    .from("properties")
    .update({
      sreality_status: validation.valid ? "dry_run_ready" : "error",
      sreality_payload_preview: preview,
      sreality_error: validation.valid ? null : validation.errors.join("\n"),
      updated_at: new Date().toISOString()
    })
    .eq("id", property.id);

  await writeLog(property, "dry_run", validation.valid ? "ok" : "error", preview, performedBy, validation.valid ? undefined : validation.errors.join("\n"));
  return { valid: validation.valid, message, preview };
}

export async function exportPropertyToSreality(property: PropertyRecord, performedBy?: string) {
  if (!canUseLiveSrealityExport()) {
    return dryRunPropertyExport(property, performedBy);
  }

  const validation = validateForSreality(property);
  if (!validation.valid) {
    await dryRunPropertyExport(property, performedBy);
    return { valid: false, message: "Export nebyl odeslán, nemovitost neprošla validací.", preview: { validation } };
  }

  if (["draft", "hidden", "archived"].includes(property.status)) {
    return { valid: false, message: "Ostrý export není povolen pro draft, skrytou nebo archivovanou nemovitost.", preview: { validation } };
  }

  const client = new SrealityClient();
  const advert = mapPropertyToSrealityAdvert(property);
  try {
    await client.login();
    const response = await client.addAdvert(advert);
    await client.logout();
    const supabase = getSupabaseAdmin();
    await supabase
      .from("properties")
      .update({
        sreality_status: "exported",
        sreality_last_export_at: new Date().toISOString(),
        sreality_response_log: response,
        sreality_error: null
      })
      .eq("id", property.id);
    await writeLog(property, property.sreality_advert_id ? "update_advert" : "export_advert", "ok", { advert }, performedBy);
    return { valid: true, message: "Inzerát byl odeslán na Sreality.", preview: response };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Neznámá chyba exportu.";
    await getSupabaseAdmin()
      .from("properties")
      .update({ sreality_status: "error", sreality_error: message })
      .eq("id", property.id);
    await writeLog(property, "export_advert", "error", { advert }, performedBy, message);
    return { valid: false, message, preview: { error: message } };
  }
}

export async function removePropertyFromSreality(property: PropertyRecord, performedBy?: string) {
  if (!canUseLiveSrealityExport()) {
    const message = "Sreality export je vypnutý nebo chybí software key. Stažení proběhlo pouze jako dry-run.";
    await writeLog(property, "remove_advert", "dry_run", { advertId: property.sreality_advert_id, advertRkid: property.sreality_advert_rkid }, performedBy);
    return { valid: true, message };
  }

  if (!property.sreality_advert_id && !property.sreality_advert_rkid) {
    return { valid: false, message: "Nemovitost nemá uložené Sreality advert_id ani advert_rkid." };
  }

  const client = new SrealityClient();
  try {
    await client.login();
    await client.delAdvert(property.sreality_advert_id || "", property.sreality_advert_rkid);
    await client.logout();
    await getSupabaseAdmin().from("properties").update({ sreality_status: "removed" }).eq("id", property.id);
    await writeLog(property, "remove_advert", "ok", { advertId: property.sreality_advert_id, advertRkid: property.sreality_advert_rkid }, performedBy);
    return { valid: true, message: "Inzerát byl stažen ze Srealit." };
  } catch (error) {
    const message = error instanceof Error ? error.message : translateSrealityStatus(500);
    await writeLog(property, "remove_advert", "error", {}, performedBy, message);
    return { valid: false, message };
  }
}
