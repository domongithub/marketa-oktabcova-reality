import type { PropertyRecord } from "@/lib/crm/types";

export function mapPropertyImagesToSrealityPhotos(property: PropertyRecord) {
  return [...(property.property_images || [])]
    .sort((a, b) => a.sort_order - b.sort_order)
    .slice(0, 100)
    .map((image, index) => ({
      url: image.url,
      main: image.is_main || index === 0 ? 1 : 0,
      order: index + 1,
      alt: image.alt || property.title,
      photo_id: image.sreality_photo_id || undefined,
      photo_rkid: image.sreality_photo_rkid || image.id,
      photo_kind: image.sreality_photo_kind || undefined,
      room_type: image.sreality_room_type || undefined
    }));
}
