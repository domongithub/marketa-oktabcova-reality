export const PROPERTY_STATUSES = ["draft", "active", "reserved", "sold", "rented", "hidden", "archived"] as const;
export const OFFER_TYPES = ["sale", "rent"] as const;
export const PROPERTY_TYPES = ["apartment", "house", "land", "commercial", "other"] as const;
export const SREALITY_STATUSES = [
  "not_exported",
  "dry_run_ready",
  "pending",
  "exported",
  "update_needed",
  "photo_sync_needed",
  "error",
  "removed"
] as const;

export type PropertyStatus = (typeof PROPERTY_STATUSES)[number];
export type OfferType = (typeof OFFER_TYPES)[number];
export type PropertyType = (typeof PROPERTY_TYPES)[number];
export type SrealityStatus = (typeof SREALITY_STATUSES)[number];

export type PropertyImageRecord = {
  id: string;
  property_id: string;
  url: string;
  storage_path: string | null;
  alt: string | null;
  sort_order: number;
  is_main: boolean;
  sreality_photo_id: string | null;
  sreality_photo_rkid: string | null;
  sreality_photo_kind: number | null;
  sreality_room_type: number | null;
  created_at: string;
  updated_at: string;
};

export type PropertyRecord = {
  id: string;
  title: string;
  slug: string;
  internal_code: string | null;
  status: PropertyStatus;
  show_on_website: boolean;
  offer_type: OfferType;
  property_type: PropertyType;
  ownership_type: string | null;
  layout: string | null;
  location: string | null;
  address: string | null;
  city: string | null;
  city_part: string | null;
  district: string | null;
  region: string | null;
  postal_code: string | null;
  street: string | null;
  house_number: string | null;
  orientation_number: string | null;
  gps_lat: number | null;
  gps_lng: number | null;
  price: number | null;
  price_note: string | null;
  currency: string;
  price_unit: string | null;
  price_negotiation: boolean;
  usable_area: number | null;
  floor_area: number | null;
  land_area: number | null;
  built_area: number | null;
  floor: number | null;
  floors_total: number | null;
  condition: string | null;
  building_type: string | null;
  energy_class: string | null;
  object_type: string | null;
  object_kind: string | null;
  object_location: string | null;
  advert_subtype: string | null;
  advert_room_count: string | null;
  sale_date: string | null;
  first_tour_date: string | null;
  first_tour_date_to: string | null;
  exclusivity: boolean;
  elevator: string | null;
  furnished: string | null;
  balcony: boolean;
  balcony_area: number | null;
  loggia: boolean;
  loggia_area: number | null;
  terrace: boolean;
  terrace_area: number | null;
  cellar: boolean;
  cellar_area: number | null;
  garage: boolean;
  garage_count: number | null;
  parking_lots: number | null;
  parking: boolean;
  garden_area: number | null;
  basin: boolean;
  basin_area: number | null;
  description_short: string | null;
  description_long: string | null;
  advert_price_text_note: string | null;
  available_from: string | null;
  ready_date: string | null;
  contact_name: string | null;
  contact_phone: string | null;
  contact_email: string | null;
  seller_id: string | null;
  seller_rkid: string | null;
  locality_inaccuracy_level: number;
  export_to_sreality: boolean;
  sreality_advert_id: string | null;
  sreality_advert_rkid: string | null;
  sreality_status: SrealityStatus;
  sreality_published_status: string | null;
  sreality_advert_url: string | null;
  sreality_hash_id: string | null;
  sreality_last_export_at: string | null;
  sreality_last_update_at: string | null;
  sreality_last_photo_sync_at: string | null;
  sreality_error: string | null;
  sreality_payload_preview: Record<string, unknown> | null;
  sreality_response_log: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
  published_at: string | null;
  sold_at: string | null;
  rented_at: string | null;
  archived_at: string | null;
  property_images?: PropertyImageRecord[];
};

export type AdminUser = {
  id: string;
  email: string;
  name: string;
  role: "admin";
};

export type SrealityExportLog = {
  id: string;
  property_id: string | null;
  action: string;
  status: string;
  request_payload: Record<string, unknown> | null;
  response_payload: Record<string, unknown> | null;
  status_code: number | null;
  status_message: string | null;
  error_message: string | null;
  performed_by: string | null;
  created_at: string;
};
