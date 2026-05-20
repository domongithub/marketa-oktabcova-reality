import "server-only";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/server";
import { properties as staticProperties, type Property } from "@/lib/properties";
import type { OfferType, PropertyRecord, PropertyStatus, PropertyType } from "@/lib/crm/types";

type PropertyInput = Partial<PropertyRecord> & {
  title: string;
  slug: string;
  status: PropertyStatus;
  offer_type: OfferType;
  property_type: PropertyType;
};

const completedStatuses = new Set<PropertyStatus>(["sold", "rented"]);
const currentStatuses = new Set<PropertyStatus>(["active", "reserved"]);

export function formatPrice(price: number | null, currency = "CZK", offerType: OfferType = "sale") {
  if (!price) return offerType === "rent" ? "Cena na dotaz/měsíc" : "Cena na dotaz";
  const formatted = new Intl.NumberFormat("cs-CZ").format(price);
  return offerType === "rent" ? `${formatted} ${currency}/měsíc` : `${formatted} ${currency}`;
}

export function mapDbPropertyToPublic(property: PropertyRecord): Property {
  const images = [...(property.property_images || [])].sort((a, b) => a.sort_order - b.sort_order);
  const mainImage = images.find((image) => image.is_main) || images[0];
  const status =
    property.status === "reserved"
      ? "Rezervováno"
      : property.status === "sold"
        ? "Prodáno"
        : property.status === "rented"
          ? "Pronajato"
          : "Aktivní";
  const badge =
    property.status === "reserved"
      ? "Rezervováno"
      : property.status === "sold"
        ? "Prodáno"
        : property.status === "rented"
          ? "Pronajato"
          : property.offer_type === "rent"
            ? "K pronájmu"
            : "Na prodej";

  return {
    slug: property.slug,
    title: property.title,
    location: property.location || [property.street, property.city_part, property.city].filter(Boolean).join(", "),
    price: formatPrice(property.price, property.currency, property.offer_type),
    status,
    badge,
    type:
      property.property_type === "apartment"
        ? "Byt"
        : property.property_type === "house"
          ? "Dům"
          : property.property_type === "land"
            ? "Pozemek"
            : property.property_type === "commercial"
              ? "Komerce"
              : "Nemovitost",
    size: property.usable_area ? `${property.usable_area} m²` : property.land_area ? `${property.land_area} m²` : "Neuvedeno",
    disposition: property.layout || "Neuvedeno",
    image: mainImage?.url || "/images/mainlogo.png",
    gallery: images.length ? images.map((image) => image.url) : mainImage?.url ? [mainImage.url] : [],
    excerpt: property.description_short || "Detail nemovitosti připravujeme.",
    description: property.description_long || property.description_short || "Detailní popis nemovitosti připravujeme.",
    highlights: [
      property.layout,
      property.usable_area ? `${property.usable_area} m²` : null,
      property.city,
      status
    ].filter(Boolean) as string[],
    sourceUrl: property.sreality_advert_url || undefined
  };
}

export async function getPublicPropertyRecords() {
  if (!isSupabaseConfigured()) return null;

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("properties")
    .select("*, property_images(*)")
    .eq("show_on_website", true)
    .in("status", ["active", "reserved", "sold", "rented"])
    .order("created_at", { ascending: false });

  if (error) {
    console.warn("Public properties fallback:", error.message);
    return null;
  }

  return (data || []) as PropertyRecord[];
}

export async function getPublicProperties() {
  const records = await getPublicPropertyRecords();
  const items = records?.length ? records.map(mapDbPropertyToPublic) : staticProperties;

  return {
    properties: items,
    activeProperties: items.filter((property) => property.status === "Aktivní" || property.status === "Rezervováno"),
    soldProperties: items.filter((property) => property.status === "Prodáno" || property.status === "Pronajato")
  };
}

export async function getPublicPropertyBySlug(slug: string) {
  const { properties } = await getPublicProperties();
  return properties.find((property) => property.slug === slug) || null;
}

export async function getAdminProperties(filters?: {
  status?: string;
  offerType?: string;
  propertyType?: string;
}) {
  const supabase = getSupabaseAdmin();
  let query = supabase.from("properties").select("*, property_images(*)").order("updated_at", { ascending: false });

  if (filters?.status) query = query.eq("status", filters.status);
  if (filters?.offerType) query = query.eq("offer_type", filters.offerType);
  if (filters?.propertyType) query = query.eq("property_type", filters.propertyType);

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return (data || []) as PropertyRecord[];
}

export async function getAdminProperty(id: string) {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.from("properties").select("*, property_images(*)").eq("id", id).single();
  if (error) throw new Error(error.message);
  return data as PropertyRecord;
}

export async function getAdminPropertyBySlug(slug: string) {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.from("properties").select("*, property_images(*)").eq("slug", slug).single();
  if (error) return null;
  return data as PropertyRecord;
}

export async function upsertProperty(input: PropertyInput, id?: string) {
  const supabase = getSupabaseAdmin();
  const payload = {
    ...input,
    updated_at: new Date().toISOString(),
    published_at: input.show_on_website && currentStatuses.has(input.status) ? new Date().toISOString() : input.published_at,
    sold_at: input.status === "sold" ? new Date().toISOString() : input.sold_at,
    rented_at: input.status === "rented" ? new Date().toISOString() : input.rented_at,
    archived_at: input.status === "archived" ? new Date().toISOString() : input.archived_at
  };

  const query = id
    ? supabase.from("properties").update(payload).eq("id", id).select("id").single()
    : supabase.from("properties").insert(payload).select("id").single();

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data as { id: string };
}

export async function addPropertyImage(propertyId: string, image: { url: string; alt?: string; isMain?: boolean; sortOrder?: number }) {
  const supabase = getSupabaseAdmin();
  if (image.isMain) {
    await supabase.from("property_images").update({ is_main: false }).eq("property_id", propertyId);
  }
  const { error } = await supabase.from("property_images").insert({
    property_id: propertyId,
    url: image.url,
    alt: image.alt || null,
    is_main: Boolean(image.isMain),
    sort_order: image.sortOrder || 0
  });
  if (error) throw new Error(error.message);
}

export async function deletePropertyImage(imageId: string) {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("property_images").delete().eq("id", imageId);
  if (error) throw new Error(error.message);
}

export async function setMainPropertyImage(propertyId: string, imageId: string) {
  const supabase = getSupabaseAdmin();
  await supabase.from("property_images").update({ is_main: false }).eq("property_id", propertyId);
  const { error } = await supabase.from("property_images").update({ is_main: true }).eq("id", imageId);
  if (error) throw new Error(error.message);
}

export async function getPublicCompletedStatuses() {
  return completedStatuses;
}
