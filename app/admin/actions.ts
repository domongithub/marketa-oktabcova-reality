"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin/auth";
import { propertyPayloadFromForm, text } from "@/lib/crm/form";
import { addPropertyImage, deletePropertyImage, getAdminProperty, setMainPropertyImage, upsertProperty } from "@/lib/crm/properties";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { dryRunPropertyExport, exportPropertyToSreality, removePropertyFromSreality, validatePropertyForSreality } from "@/services/sreality";

function refreshAdmin(id?: string) {
  revalidatePath("/admin");
  revalidatePath("/admin/properties");
  revalidatePath("/nemovitosti");
  revalidatePath("/prodano");
  if (id) {
    revalidatePath(`/admin/properties/${id}/edit`);
    revalidatePath(`/admin/properties/${id}/sreality`);
  }
}

export async function createPropertyAction(formData: FormData) {
  await requireAdmin();
  const result = await upsertProperty(propertyPayloadFromForm(formData));
  refreshAdmin(result.id);
  redirect(`/admin/properties/${result.id}/edit`);
}

export async function updatePropertyAction(id: string, formData: FormData) {
  await requireAdmin();
  await upsertProperty(propertyPayloadFromForm(formData), id);
  const imageUrl = text(formData, "image_url");
  if (imageUrl) {
    await addPropertyImage(id, {
      url: imageUrl,
      alt: text(formData, "image_alt") || undefined,
      isMain: formData.get("image_main") === "on",
      sortOrder: Number(formData.get("image_sort") || 0)
    });
  }
  const files = formData.getAll("image_files").filter((item): item is File => item instanceof File && item.size > 0);
  if (files.length) {
    const supabase = getSupabaseAdmin();
    for (const [index, file] of files.entries()) {
      const extension = file.name.split(".").pop() || "jpg";
      const path = `${id}/${Date.now()}-${index}.${extension}`;
      const { error } = await supabase.storage.from("property-images").upload(path, file, {
        contentType: file.type || "image/jpeg",
        upsert: false
      });
      if (error) throw new Error(error.message);
      const { data } = supabase.storage.from("property-images").getPublicUrl(path);
      await addPropertyImage(id, {
        url: data.publicUrl,
        alt: text(formData, "image_alt") || undefined,
        isMain: (formData.get("image_main") === "on" && index === 0) || false,
        sortOrder: Number(formData.get("image_sort") || 0) + index
      });
    }
  }
  refreshAdmin(id);
}

export async function deleteImageAction(propertyId: string, imageId: string) {
  await requireAdmin();
  await deletePropertyImage(imageId);
  refreshAdmin(propertyId);
}

export async function setMainImageAction(propertyId: string, imageId: string) {
  await requireAdmin();
  await setMainPropertyImage(propertyId, imageId);
  refreshAdmin(propertyId);
}

export async function setPropertyStatusAction(id: string, status: "active" | "reserved" | "sold" | "rented" | "hidden" | "archived") {
  await requireAdmin();
  const updates: Record<string, unknown> = { status, updated_at: new Date().toISOString() };
  if (status === "sold") updates.sold_at = new Date().toISOString();
  if (status === "rented") updates.rented_at = new Date().toISOString();
  if (status === "archived") updates.archived_at = new Date().toISOString();
  await getSupabaseAdmin().from("properties").update(updates).eq("id", id);
  refreshAdmin(id);
}

export async function validateSrealityAction(id: string) {
  const admin = await requireAdmin();
  const property = await getAdminProperty(id);
  await validatePropertyForSreality(property, admin.id);
  refreshAdmin(id);
}

export async function dryRunSrealityAction(id: string) {
  const admin = await requireAdmin();
  const property = await getAdminProperty(id);
  await dryRunPropertyExport(property, admin.id);
  refreshAdmin(id);
}

export async function exportSrealityAction(id: string) {
  const admin = await requireAdmin();
  const property = await getAdminProperty(id);
  await exportPropertyToSreality(property, admin.id);
  refreshAdmin(id);
}

export async function removeSrealityAction(id: string) {
  const admin = await requireAdmin();
  const property = await getAdminProperty(id);
  await removePropertyFromSreality(property, admin.id);
  refreshAdmin(id);
}
