import type { PropertyRecord } from "@/lib/crm/types";
import { SREALITY } from "@/services/sreality/codebooks";

function asNumber(value: string | number | null | undefined, fallback?: number) {
  if (typeof value === "number") return value;
  if (!value) return fallback;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function boolToYesNo(value: boolean | null | undefined) {
  return value ? SREALITY.yesNo.ano : SREALITY.yesNo.ne;
}

function energyRating(value: string | null) {
  if (!value) return undefined;
  const key = value.trim().toUpperCase() as keyof typeof SREALITY.energy;
  return SREALITY.energy[key];
}

function mapLayout(property: PropertyRecord) {
  if (property.property_type !== "apartment") return undefined;
  if (property.advert_subtype) return Number(property.advert_subtype);
  const key = (property.layout || "").trim() as keyof typeof SREALITY.apartmentSubtype;
  return SREALITY.apartmentSubtype[key] || SREALITY.apartmentSubtype.atypicky;
}

function mapHouseSubtype(property: PropertyRecord) {
  if (property.advert_subtype) return Number(property.advert_subtype);
  const normalized = `${property.layout || ""} ${property.title || ""}`.toLowerCase();
  if (normalized.includes("chata")) return SREALITY.houseSubtype.chata;
  if (normalized.includes("chalupa")) return SREALITY.houseSubtype.chalupa;
  if (normalized.includes("vila")) return SREALITY.houseSubtype.vila;
  return SREALITY.houseSubtype.rodinny;
}

function mapSubtype(property: PropertyRecord) {
  if (property.property_type === "apartment") return mapLayout(property);
  if (property.property_type === "house") return mapHouseSubtype(property);
  if (property.advert_subtype) return Number(property.advert_subtype);
  if (property.property_type === "land") return SREALITY.landSubtype.bydleni;
  if (property.property_type === "commercial") return SREALITY.commercialSubtype.ostatni;
  return 36;
}

function mapCode(value: string | null, codebook: Record<string, number>, fallback: number) {
  if (!value) return fallback;
  const key = value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "")
    .replace(/-/g, "")
    .toLowerCase();
  return codebook[key] || fallback;
}

export function mapPropertyToSrealityAdvert(property: PropertyRecord): Record<string, string | number | boolean> {
  const advertData: Record<string, string | number | boolean | undefined | null> = {
    advert_function: property.offer_type === "rent" ? SREALITY.advertFunction.rent : SREALITY.advertFunction.sale,
    advert_lifetime: SREALITY.advertLifetime.days90,
    advert_price: property.price || 0,
    advert_price_currency: SREALITY.currency[property.currency as keyof typeof SREALITY.currency] || SREALITY.currency.CZK,
    advert_price_unit: property.offer_type === "rent" ? SREALITY.priceUnit.month : SREALITY.priceUnit.property,
    advert_type: SREALITY.advertType[property.property_type],
    advert_subtype: mapSubtype(property),
    description: property.description_long || property.description_short || property.title,
    locality_city: property.city || property.location,
    locality_citypart: property.city_part || undefined,
    locality_street: property.street || undefined,
    locality_cp: property.house_number || undefined,
    locality_co: property.orientation_number || undefined,
    locality_zip: property.postal_code || undefined,
    locality_latitude: property.gps_lat || undefined,
    locality_longitude: property.gps_lng || undefined,
    locality_inaccuracy_level: property.locality_inaccuracy_level || 2,
    advert_rkid: property.sreality_advert_rkid || property.internal_code || property.id,
    user_status: !["hidden", "archived", "sold", "rented"].includes(property.status),
    advert_price_text_note: property.advert_price_text_note || property.price_note || undefined
  };

  if (property.status === "reserved") advertData.extra_info = SREALITY.extraInfo.reserved;
  if (property.status === "sold") advertData.extra_info = SREALITY.extraInfo.sold;
  if (property.offer_type === "rent" && property.ready_date) advertData.ready_date = property.ready_date;
  if (property.sale_date) advertData.sale_date = property.sale_date;
  if (property.first_tour_date) advertData.first_tour_date = property.first_tour_date;
  if (property.first_tour_date_to) advertData.first_tour_date_to = property.first_tour_date_to;
  if (property.exclusivity) advertData.exclusively_at_rk = 1;

  if (property.property_type === "apartment") {
    Object.assign(advertData, {
      building_type: mapCode(property.building_type, SREALITY.buildingType, SREALITY.buildingType.panelova),
      building_condition: mapCode(property.condition, SREALITY.buildingCondition, SREALITY.buildingCondition.velmiDobry),
      ownership: mapCode(property.ownership_type, SREALITY.ownership, SREALITY.ownership.osobni),
      usable_area: property.usable_area,
      floor_number: property.floor,
      balcony: boolToYesNo(property.balcony),
      loggia: boolToYesNo(property.loggia),
      terrace: boolToYesNo(property.terrace),
      cellar: boolToYesNo(property.cellar),
      parking_lots: boolToYesNo(Boolean(property.parking_lots || property.parking)),
      parking: property.parking_lots || undefined,
      garage: boolToYesNo(property.garage)
    });
    if (energyRating(property.energy_class)) advertData.energy_efficiency_rating = energyRating(property.energy_class);
  }

  if (property.property_type === "house") {
    Object.assign(advertData, {
      building_type: mapCode(property.building_type, SREALITY.buildingType, SREALITY.buildingType.cihlova),
      building_condition: mapCode(property.condition, SREALITY.buildingCondition, SREALITY.buildingCondition.dobry),
      usable_area: property.usable_area,
      estate_area: property.land_area,
      cellar: boolToYesNo(property.cellar),
      garage: boolToYesNo(property.garage),
      parking_lots: boolToYesNo(Boolean(property.parking_lots || property.parking)),
      parking: property.parking_lots || undefined,
      basin: boolToYesNo(property.basin),
      object_type: asNumber(property.object_type, SREALITY.objectType.patrovy),
      advert_room_count: property.advert_room_count || property.layout || undefined
    });
    if (energyRating(property.energy_class)) advertData.energy_efficiency_rating = energyRating(property.energy_class);
  }

  if (property.property_type === "land") {
    advertData.estate_area = property.land_area;
  }

  if (property.property_type === "commercial") {
    Object.assign(advertData, {
      building_type: mapCode(property.building_type, SREALITY.buildingType, SREALITY.buildingType.cihlova),
      building_condition: mapCode(property.condition, SREALITY.buildingCondition, SREALITY.buildingCondition.dobry),
      usable_area: property.usable_area,
      garage: boolToYesNo(property.garage),
      parking_lots: boolToYesNo(Boolean(property.parking_lots || property.parking)),
      parking: property.parking_lots || undefined,
      object_type: asNumber(property.object_type, SREALITY.objectType.patrovy)
    });
    if (energyRating(property.energy_class)) advertData.energy_efficiency_rating = energyRating(property.energy_class);
  }

  return Object.fromEntries(Object.entries(advertData).filter(([, value]) => value !== undefined && value !== null && value !== "")) as Record<string, string | number | boolean>;
}
