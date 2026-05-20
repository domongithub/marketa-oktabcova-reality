import assert from "node:assert/strict";
import crypto from "node:crypto";
import type { PropertyRecord } from "../lib/crm/types";
import { translateSrealityStatus } from "../services/sreality/errors";
import { mapPropertyToSrealityAdvert } from "../services/sreality/mapper";
import { computeSrealitySessionId } from "../services/sreality/session";
import { validateForSreality } from "../services/sreality/validator";

const sample: PropertyRecord = {
  id: "sample-property",
  title: "Byt 2+kk v Mostě",
  slug: "byt-2-kk-v-moste",
  internal_code: "MO-001",
  status: "active",
  show_on_website: true,
  offer_type: "sale",
  property_type: "apartment",
  ownership_type: "osobni",
  layout: "2+kk",
  location: "Most",
  address: null,
  city: "Most",
  city_part: null,
  district: "Most",
  region: "Ústecký kraj",
  postal_code: null,
  street: null,
  house_number: null,
  orientation_number: null,
  gps_lat: null,
  gps_lng: null,
  price: 3200000,
  price_note: null,
  currency: "CZK",
  price_unit: null,
  price_negotiation: false,
  usable_area: 52,
  floor_area: 52,
  land_area: null,
  built_area: null,
  floor: 2,
  floors_total: 5,
  condition: "velmiDobry",
  building_type: "cihlova",
  energy_class: "C",
  object_type: null,
  object_kind: null,
  object_location: null,
  advert_subtype: null,
  advert_room_count: null,
  sale_date: null,
  first_tour_date: null,
  first_tour_date_to: null,
  exclusivity: false,
  elevator: null,
  furnished: null,
  balcony: false,
  balcony_area: null,
  loggia: false,
  loggia_area: null,
  terrace: false,
  terrace_area: null,
  cellar: true,
  cellar_area: 2,
  garage: false,
  garage_count: null,
  parking_lots: 0,
  parking: false,
  garden_area: null,
  basin: false,
  basin_area: null,
  description_short: "Testovací byt pro validaci exportu.",
  description_long: "Testovací byt 2+kk v Mostě s osobním vlastnictvím, cihlovou stavbou a velmi dobrým stavem.",
  advert_price_text_note: null,
  available_from: null,
  ready_date: null,
  contact_name: "Markéta Oktábcová",
  contact_phone: "+420602280203",
  contact_email: "reality@marketaoktabcova.cz",
  seller_id: null,
  seller_rkid: null,
  locality_inaccuracy_level: 2,
  export_to_sreality: true,
  sreality_advert_id: null,
  sreality_advert_rkid: null,
  sreality_status: "not_exported",
  sreality_published_status: null,
  sreality_advert_url: null,
  sreality_hash_id: null,
  sreality_last_export_at: null,
  sreality_last_update_at: null,
  sreality_last_photo_sync_at: null,
  sreality_error: null,
  sreality_payload_preview: null,
  sreality_response_log: null,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  published_at: null,
  sold_at: null,
  rented_at: null,
  archived_at: null,
  property_images: [1, 2, 3].map((index) => ({
    id: `image-${index}`,
    property_id: "sample-property",
    url: `https://example.com/image-${index}.jpg`,
    storage_path: null,
    alt: `Fotografie ${index}`,
    sort_order: index,
    is_main: index === 1,
    sreality_photo_id: null,
    sreality_photo_rkid: null,
    sreality_photo_kind: null,
    sreality_room_type: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }))
};

const sessionId = "a".repeat(64);
const expected = `${sessionId.slice(0, 48)}${crypto.createHash("md5").update(`${sessionId}passwordsoftware`).digest("hex")}`;
assert.equal(computeSrealitySessionId(sessionId, "password", "software"), expected);

const validation = validateForSreality(sample);
assert.equal(validation.valid, true, validation.errors.join(", "));

const payload = mapPropertyToSrealityAdvert(sample);
assert.equal(payload.advert_function, 1);
assert.equal(payload.advert_type, 1);
assert.equal(payload.advert_subtype, 4);
assert.equal(payload.advert_price_currency, 1);

assert.equal(translateSrealityStatus(452), "Chybí povinné položky nebo mají špatný typ");
assert.equal(validateForSreality({ ...sample, property_images: [] }).valid, false);

console.log("CRM/Sreality validační testy prošly.");
