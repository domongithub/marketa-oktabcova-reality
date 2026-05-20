import type { PropertyRecord } from "@/lib/crm/types";

export type SrealityValidationResult = {
  valid: boolean;
  errors: string[];
  warnings: string[];
};

function requireField(errors: string[], value: unknown, message: string) {
  if (value === null || value === undefined || value === "" || value === 0) errors.push(message);
}

function imageCount(property: PropertyRecord) {
  return property.property_images?.length || 0;
}

export function validateForSreality(property: PropertyRecord): SrealityValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  requireField(errors, property.offer_type, "Chybí typ nabídky.");
  requireField(errors, property.property_type, "Chybí typ nemovitosti.");
  requireField(errors, property.price, "Chybí cena inzerátu.");
  requireField(errors, property.currency, "Chybí měna ceny.");
  requireField(errors, property.description_long || property.description_short, "Chybí popis nemovitosti.");
  requireField(errors, property.city || property.location, "Chybí město nebo lokalita.");
  requireField(errors, property.locality_inaccuracy_level, "Chybí úroveň znepřesnění lokality.");
  requireField(errors, property.advert_subtype || property.layout, "Chybí podkategorie nemovitosti.");

  if (imageCount(property) < 3) errors.push("Chybí minimálně 3 fotografie pro publikování na Sreality.");
  if (imageCount(property) > 100) errors.push("Nemovitost má více než 100 fotografií.");

  if (property.property_type === "apartment") {
    requireField(errors, property.building_type, "Chybí typ stavby.");
    requireField(errors, property.condition, "Chybí stav nemovitosti.");
    requireField(errors, property.ownership_type, "Chybí typ vlastnictví.");
    requireField(errors, property.usable_area, "Chybí užitná plocha.");
    if (property.floor === null || property.floor === undefined) errors.push("Chybí podlaží bytu.");
    if (property.parking_lots === null || property.parking_lots === undefined) errors.push("Chybí počet parkovacích míst.");
    if (property.ownership_type === "druzstevni" && property.offer_type === "sale") {
      warnings.push("U družstevního prodeje ověřte nastavení převodu do OV/personal podle dokumentace Sreality.");
    }
  }

  if (property.property_type === "house") {
    requireField(errors, property.building_type, "Chybí typ stavby.");
    requireField(errors, property.condition, "Chybí stav domu.");
    requireField(errors, property.usable_area, "Chybí užitná plocha domu.");
    requireField(errors, property.land_area, "Chybí plocha pozemku.");
    if (property.parking_lots === null || property.parking_lots === undefined) errors.push("Chybí počet parkovacích míst.");
    requireField(errors, property.object_type, "Chybí typ objektu.");
  }

  if (property.property_type === "land") {
    requireField(errors, property.land_area, "Chybí plocha pozemku.");
  }

  if (property.property_type === "commercial") {
    requireField(errors, property.building_type, "Chybí typ stavby.");
    requireField(errors, property.condition, "Chybí stav komerční nemovitosti.");
    requireField(errors, property.usable_area, "Chybí užitná plocha komerční nemovitosti.");
    if (property.parking_lots === null || property.parking_lots === undefined) errors.push("Chybí počet parkovacích míst.");
  }

  if (property.offer_type === "rent" && !property.ready_date && !property.available_from) {
    errors.push("U pronájmu chybí datum dostupnosti.");
  }

  if (["draft", "hidden", "archived"].includes(property.status)) {
    warnings.push("Nemovitost není veřejně publikovaná. Ostrý export je vhodné provádět až u aktivní nebo rezervované nabídky.");
  }

  return { valid: errors.length === 0, errors, warnings };
}
