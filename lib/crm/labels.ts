import type { OfferType, PropertyStatus, PropertyType, SrealityStatus } from "@/lib/crm/types";

export const statusLabels: Record<PropertyStatus, string> = {
  draft: "Rozpracováno",
  active: "Aktivní nabídka",
  reserved: "Rezervováno",
  sold: "Prodáno",
  rented: "Pronajato",
  hidden: "Skryto z webu",
  archived: "Archivováno"
};

export const offerTypeLabels: Record<OfferType, string> = {
  sale: "Prodej",
  rent: "Pronájem"
};

export const propertyTypeLabels: Record<PropertyType, string> = {
  apartment: "Byt",
  house: "Dům",
  land: "Pozemek",
  commercial: "Komerční prostor",
  other: "Ostatní"
};

export const srealityStatusLabels: Record<SrealityStatus, string> = {
  not_exported: "Neodesláno",
  dry_run_ready: "Připraveno v testu",
  pending: "Čeká na zpracování",
  exported: "Odesláno na Sreality",
  update_needed: "Vyžaduje aktualizaci",
  photo_sync_needed: "Vyžaduje synchronizaci fotek",
  error: "Chyba exportu",
  removed: "Staženo ze Srealit"
};

export const statusOptions = Object.entries(statusLabels).map(([value, label]) => ({ value, label }));
export const offerTypeOptions = Object.entries(offerTypeLabels).map(([value, label]) => ({ value, label }));
export const propertyTypeOptions = Object.entries(propertyTypeLabels).map(([value, label]) => ({ value, label }));
