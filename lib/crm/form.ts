import type { OfferType, PropertyStatus, PropertyType } from "@/lib/crm/types";

export function slugify(input: string) {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}

export function text(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

export function numberValue(formData: FormData, key: string) {
  const value = text(formData, key);
  if (!value) return null;
  const parsed = Number(value.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

export function bool(formData: FormData, key: string) {
  return formData.get(key) === "on" || formData.get(key) === "true";
}

export function propertyPayloadFromForm(formData: FormData) {
  const title = text(formData, "title") || "Nová nemovitost";
  const slug = text(formData, "slug") || slugify(title);
  const status = (text(formData, "status") || "draft") as PropertyStatus;
  const offerType = (text(formData, "offer_type") || "sale") as OfferType;
  const propertyType = (text(formData, "property_type") || "apartment") as PropertyType;

  return {
    title,
    slug,
    internal_code: text(formData, "internal_code"),
    status,
    show_on_website: bool(formData, "show_on_website"),
    offer_type: offerType,
    property_type: propertyType,
    ownership_type: text(formData, "ownership_type"),
    layout: text(formData, "layout"),
    location: text(formData, "location"),
    address: text(formData, "address"),
    city: text(formData, "city"),
    city_part: text(formData, "city_part"),
    district: text(formData, "district"),
    region: text(formData, "region"),
    postal_code: text(formData, "postal_code"),
    street: text(formData, "street"),
    house_number: text(formData, "house_number"),
    orientation_number: text(formData, "orientation_number"),
    gps_lat: numberValue(formData, "gps_lat"),
    gps_lng: numberValue(formData, "gps_lng"),
    price: numberValue(formData, "price"),
    price_note: text(formData, "price_note"),
    currency: text(formData, "currency") || "CZK",
    price_unit: text(formData, "price_unit"),
    price_negotiation: bool(formData, "price_negotiation"),
    usable_area: numberValue(formData, "usable_area"),
    floor_area: numberValue(formData, "floor_area"),
    land_area: numberValue(formData, "land_area"),
    built_area: numberValue(formData, "built_area"),
    floor: numberValue(formData, "floor"),
    floors_total: numberValue(formData, "floors_total"),
    condition: text(formData, "condition"),
    building_type: text(formData, "building_type"),
    energy_class: text(formData, "energy_class"),
    object_type: text(formData, "object_type"),
    object_kind: text(formData, "object_kind"),
    object_location: text(formData, "object_location"),
    advert_subtype: text(formData, "advert_subtype"),
    advert_room_count: text(formData, "advert_room_count"),
    sale_date: text(formData, "sale_date"),
    first_tour_date: text(formData, "first_tour_date"),
    first_tour_date_to: text(formData, "first_tour_date_to"),
    exclusivity: bool(formData, "exclusivity"),
    elevator: text(formData, "elevator"),
    furnished: text(formData, "furnished"),
    balcony: bool(formData, "balcony"),
    balcony_area: numberValue(formData, "balcony_area"),
    loggia: bool(formData, "loggia"),
    loggia_area: numberValue(formData, "loggia_area"),
    terrace: bool(formData, "terrace"),
    terrace_area: numberValue(formData, "terrace_area"),
    cellar: bool(formData, "cellar"),
    cellar_area: numberValue(formData, "cellar_area"),
    garage: bool(formData, "garage"),
    garage_count: numberValue(formData, "garage_count"),
    parking_lots: numberValue(formData, "parking_lots"),
    parking: bool(formData, "parking"),
    garden_area: numberValue(formData, "garden_area"),
    basin: bool(formData, "basin"),
    basin_area: numberValue(formData, "basin_area"),
    description_short: text(formData, "description_short"),
    description_long: text(formData, "description_long"),
    advert_price_text_note: text(formData, "advert_price_text_note"),
    available_from: text(formData, "available_from"),
    ready_date: text(formData, "ready_date"),
    contact_name: text(formData, "contact_name"),
    contact_phone: text(formData, "contact_phone"),
    contact_email: text(formData, "contact_email"),
    seller_id: text(formData, "seller_id"),
    seller_rkid: text(formData, "seller_rkid"),
    locality_inaccuracy_level: numberValue(formData, "locality_inaccuracy_level") || 2,
    export_to_sreality: bool(formData, "export_to_sreality"),
    sreality_advert_id: text(formData, "sreality_advert_id"),
    sreality_advert_rkid: text(formData, "sreality_advert_rkid")
  };
}
