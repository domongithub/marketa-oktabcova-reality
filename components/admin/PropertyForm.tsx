import Image from "next/image";
import type { PropertyRecord } from "@/lib/crm/types";
import { deleteImageAction, setMainImageAction } from "@/app/admin/actions";
import { AddressAutocomplete } from "@/components/admin/AddressAutocomplete";
import { offerTypeOptions, propertyTypeOptions, statusOptions } from "@/lib/crm/labels";

function Input({ label, name, defaultValue, type = "text", required }: { label: string; name: string; defaultValue?: string | number | null; type?: string; required?: boolean }) {
  return (
    <label className="grid gap-2 text-sm">
      <span className="font-medium">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue ?? ""}
        className="border border-forest/15 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gold/60"
      />
    </label>
  );
}

function Textarea({ label, name, defaultValue, rows = 4 }: { label: string; name: string; defaultValue?: string | null; rows?: number }) {
  return (
    <label className="grid gap-2 text-sm md:col-span-2">
      <span className="font-medium">{label}</span>
      <textarea
        name={name}
        rows={rows}
        defaultValue={defaultValue ?? ""}
        className="border border-forest/15 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gold/60"
      />
    </label>
  );
}

function Select({ label, name, defaultValue, options }: { label: string; name: string; defaultValue?: string | null; options: { value: string; label: string }[] }) {
  return (
    <label className="grid gap-2 text-sm">
      <span className="font-medium">{label}</span>
      <select name={name} defaultValue={defaultValue ?? options[0]?.value} className="border border-forest/15 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gold/60">
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function Checkbox({ label, name, defaultChecked }: { label: string; name: string; defaultChecked?: boolean }) {
  return (
    <label className="flex items-center gap-3 text-sm font-medium">
      <input name={name} type="checkbox" defaultChecked={defaultChecked} className="h-4 w-4 accent-forest focus:outline-none focus:ring-2 focus:ring-gold/60" />
      {label}
    </label>
  );
}

function ChoiceGrid({ label, name, defaultValue, options, required }: { label: string; name: string; defaultValue?: string | null; options: { value: string; label: string }[]; required?: boolean }) {
  return (
    <fieldset className="grid gap-3 md:col-span-2">
      <legend className="text-sm font-medium">{label}{required ? " *" : ""}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <label key={option.value} className="cursor-pointer">
            <input className="peer sr-only" type="radio" name={name} value={option.value} defaultChecked={defaultValue === option.value} required={required} />
            <span className="inline-flex border border-forest/15 bg-linen/60 px-3 py-2 text-sm transition peer-checked:border-forest peer-checked:bg-forest peer-checked:text-white hover:border-gold/60">
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function Section({ title, children, defaultOpen = true, note }: { title: string; children: React.ReactNode; defaultOpen?: boolean; note?: string }) {
  return (
    <details open={defaultOpen} className="border border-forest/10 bg-white p-5 shadow-soft open:pb-6">
      <summary className="cursor-pointer list-none font-serif text-2xl text-forest focus:outline-none focus:ring-2 focus:ring-gold/60">
        {title}
      </summary>
      {note ? <p className="mt-2 text-sm leading-6 text-muted">{note}</p> : null}
      <div className="mt-5 grid gap-4 md:grid-cols-2">{children}</div>
    </details>
  );
}

const subtypeOptions = [
  { value: "2", label: "1+kk" },
  { value: "3", label: "1+1" },
  { value: "4", label: "2+kk" },
  { value: "5", label: "2+1" },
  { value: "6", label: "3+kk" },
  { value: "7", label: "3+1" },
  { value: "8", label: "4+kk" },
  { value: "9", label: "4+1" },
  { value: "10", label: "5+kk" },
  { value: "11", label: "5+1" },
  { value: "12", label: "6 a více" },
  { value: "16", label: "Atypický" },
  { value: "37", label: "Rodinný dům" },
  { value: "33", label: "Chata" },
  { value: "43", label: "Chalupa" },
  { value: "19", label: "Pozemek k bydlení" },
  { value: "25", label: "Kanceláře" },
  { value: "28", label: "Obchodní prostor" }
];

const buildingTypeOptions = [
  { value: "drevostavba", label: "Dřevostavba" },
  { value: "cihlova", label: "Cihlová" },
  { value: "kamenna", label: "Kamenná" },
  { value: "montovana", label: "Montovaná" },
  { value: "panelova", label: "Panelová" },
  { value: "skeletova", label: "Skeletová" },
  { value: "smisena", label: "Smíšená" },
  { value: "modularni", label: "Modulární" }
];

const conditionOptions = [
  { value: "velmiDobry", label: "Velmi dobrý" },
  { value: "dobry", label: "Dobrý" },
  { value: "spatny", label: "Špatný" },
  { value: "veVystavbe", label: "Ve výstavbě" },
  { value: "projekt", label: "Projekt" },
  { value: "novostavba", label: "Novostavba" },
  { value: "kDemolici", label: "K demolici" },
  { value: "predRekonstrukci", label: "Před rekonstrukcí" },
  { value: "poRekonstrukci", label: "Po rekonstrukci" },
  { value: "vRekonstrukci", label: "V rekonstrukci" }
];

const objectTypeOptions = [
  { value: "1", label: "Přízemní" },
  { value: "2", label: "Patrový" }
];

const roomCountOptions = [
  { value: "1", label: "1 pokoj" },
  { value: "2", label: "2 pokoje" },
  { value: "3", label: "3 pokoje" },
  { value: "4", label: "4 pokoje" },
  { value: "5", label: "5 a více pokojů" },
  { value: "16", label: "Atypický" }
];

const ownershipOptions = [
  { value: "osobni", label: "Osobní" },
  { value: "druzstevni", label: "Družstevní" },
  { value: "statniObecni", label: "Státní/obecní" }
];

export function PropertyForm({ property, action }: { property?: PropertyRecord; action: (formData: FormData) => Promise<void> }) {
  const photoSection = property ? (
    <Section title="Fotky" note="Nahrajte fotky z počítače nebo vložte URL. První hlavní fotka se použije na webu i jako hlavní podklad pro Sreality.">
      <label className="grid gap-2 text-sm md:col-span-2">
        <span className="font-medium">Nahrát fotky z počítače</span>
        <input name="image_files" type="file" multiple accept="image/*" className="border border-forest/15 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gold/60" />
      </label>
      <Input label="Nebo přidat fotku přes URL" name="image_url" />
      <Input label="Alt text" name="image_alt" />
      <Input label="Pořadí" name="image_sort" type="number" />
      <Checkbox label="Nastavit jako hlavní" name="image_main" />
      <div className="md:col-span-2 grid gap-4 md:grid-cols-3">
        {[...(property.property_images || [])].sort((a, b) => a.sort_order - b.sort_order).map((image) => (
          <div key={image.id} className="border border-forest/10 p-3">
            <div className="relative aspect-[4/3] overflow-hidden bg-linen">
              <Image src={image.url} alt={image.alt || property.title} fill sizes="280px" className="object-cover" />
            </div>
            <p className="mt-2 text-xs text-muted">Pořadí {image.sort_order} {image.is_main ? "· hlavní" : ""}</p>
            <div className="mt-3 flex gap-2">
              <button formAction={setMainImageAction.bind(null, property.id, image.id)} className="border border-forest/15 px-3 py-2 text-xs hover:border-gold/60">
                Hlavní
              </button>
              <button formAction={deleteImageAction.bind(null, property.id, image.id)} className="border border-red-200 px-3 py-2 text-xs text-red-700 hover:bg-red-50">
                Smazat
              </button>
            </div>
          </div>
        ))}
      </div>
    </Section>
  ) : (
    <Section title="Fotky" note="Fotky půjdou nahrát hned po prvním uložení nemovitosti. Nejdřív vyplňte základ a klikněte na Uložit nemovitost.">
      <p className="text-sm leading-6 text-muted md:col-span-2">Po uložení se otevře editace, kde bude upload fotek z počítače i přidání přes URL.</p>
    </Section>
  );

  return (
    <form action={action} className="grid gap-6">
      <Section title="Základ">
        <Input label="Název *" name="title" defaultValue={property?.title} required />
        <Input label="Slug *" name="slug" defaultValue={property?.slug} required />
        <Input label="Interní kód" name="internal_code" defaultValue={property?.internal_code} />
        <Select label="Stav" name="status" defaultValue={property?.status} options={statusOptions} />
        <Select label="Typ nabídky" name="offer_type" defaultValue={property?.offer_type} options={offerTypeOptions} />
        <Select label="Typ nemovitosti" name="property_type" defaultValue={property?.property_type} options={propertyTypeOptions} />
        <Checkbox label="Publikovat na webu" name="show_on_website" defaultChecked={property?.show_on_website} />
      </Section>

      <Section title="Lokalita" note="Pro Sreality je nejspolehlivější vybrat adresu z našeptávače. Ručně upravujte jen detaily, které se nedoplní.">
        <AddressAutocomplete />
        <Input label="Lokalita pro web" name="location" defaultValue={property?.location} />
        <Input label="Město *" name="city" defaultValue={property?.city} />
        <Input label="Část města" name="city_part" defaultValue={property?.city_part} />
        <Input label="Ulice" name="street" defaultValue={property?.street} />
        <Input label="Číslo popisné" name="house_number" defaultValue={property?.house_number} />
        <Input label="Číslo orientační" name="orientation_number" defaultValue={property?.orientation_number} />
        <Input label="PSČ" name="postal_code" defaultValue={property?.postal_code} />
        <Input label="Okres" name="district" defaultValue={property?.district} />
        <Input label="Kraj" name="region" defaultValue={property?.region} />
        <Input label="GPS lat" name="gps_lat" defaultValue={property?.gps_lat} />
        <Input label="GPS lng" name="gps_lng" defaultValue={property?.gps_lng} />
        <Input label="Znepřesnění lokality" name="locality_inaccuracy_level" type="number" defaultValue={property?.locality_inaccuracy_level ?? 2} />
      </Section>

      {photoSection}

      <Section title="Vlastnosti nemovitosti" note="Tyto parametry se používají pro web i Sreality. Povinné položky stačí vyplnit až před exportem.">
        <Select label="Podkategorie nemovitosti" name="advert_subtype" defaultValue={property?.advert_subtype} options={[{ value: "", label: "Vyberte" }, ...subtypeOptions]} />
        <ChoiceGrid label="Z čeho je budova postavená?" name="building_type" defaultValue={property?.building_type} options={buildingTypeOptions} />
        <ChoiceGrid label="Jaký je stav nemovitosti?" name="condition" defaultValue={property?.condition} options={conditionOptions} />
        <ChoiceGrid label="Jaký je typ objektu?" name="object_type" defaultValue={property?.object_type} options={objectTypeOptions} />
        <ChoiceGrid label="Jaký je počet pokojů?" name="advert_room_count" defaultValue={property?.advert_room_count} options={roomCountOptions} />
        <ChoiceGrid label="Vlastnictví" name="ownership_type" defaultValue={property?.ownership_type} options={ownershipOptions} />
        <Input label="Dispozice pro web" name="layout" defaultValue={property?.layout} />
        <Input label="Užitná plocha" name="usable_area" type="number" defaultValue={property?.usable_area} />
        <Input label="Plocha pozemku" name="land_area" type="number" defaultValue={property?.land_area} />
        <Input label="Podlahová plocha" name="floor_area" type="number" defaultValue={property?.floor_area} />
        <Input label="Zastavěná plocha" name="built_area" type="number" defaultValue={property?.built_area} />
        <Input label="Podlaží" name="floor" type="number" defaultValue={property?.floor} />
        <Input label="Počet podlaží" name="floors_total" type="number" defaultValue={property?.floors_total} />
        <Input label="Energetická třída" name="energy_class" defaultValue={property?.energy_class} />
      </Section>

      <Section title="Cena">
        <Input label="Cena *" name="price" type="number" defaultValue={property?.price} />
        <Input label="Měna" name="currency" defaultValue={property?.currency ?? "CZK"} />
        <Input label="Poznámka k ceně" name="price_note" defaultValue={property?.price_note} />
      </Section>

      <Section title="Vybavení a příslušenství" defaultOpen={false} note="Tyto položky jsou důležité hlavně pro kontrolu Sreality. U bytu typicky řešte balkon, lodžii, terasu, sklep, garáž a parkování.">
        <Checkbox label="Balkon" name="balcony" defaultChecked={property?.balcony} />
        <Input label="Balkon m²" name="balcony_area" type="number" defaultValue={property?.balcony_area} />
        <Checkbox label="Lodžie" name="loggia" defaultChecked={property?.loggia} />
        <Input label="Lodžie m²" name="loggia_area" type="number" defaultValue={property?.loggia_area} />
        <Checkbox label="Terasa" name="terrace" defaultChecked={property?.terrace} />
        <Input label="Terasa m²" name="terrace_area" type="number" defaultValue={property?.terrace_area} />
        <Checkbox label="Sklep" name="cellar" defaultChecked={property?.cellar} />
        <Input label="Sklep m²" name="cellar_area" type="number" defaultValue={property?.cellar_area} />
        <Checkbox label="Garáž" name="garage" defaultChecked={property?.garage} />
        <Input label="Počet garáží" name="garage_count" type="number" defaultValue={property?.garage_count} />
        <Checkbox label="Parkovací stání" name="parking" defaultChecked={property?.parking} />
        <Input label="Parkovací místa" name="parking_lots" type="number" defaultValue={property?.parking_lots} />
        <Checkbox label="Bazén" name="basin" defaultChecked={property?.basin} />
        <Input label="Bazén m²" name="basin_area" type="number" defaultValue={property?.basin_area} />
      </Section>

      <Section title="Popisy">
        <Textarea label="Krátký popis pro web" name="description_short" defaultValue={property?.description_short} />
        <Textarea label="Dlouhý popis" name="description_long" rows={8} defaultValue={property?.description_long} />
        <Input label="Sreality poznámka k ceně" name="advert_price_text_note" defaultValue={property?.advert_price_text_note} />
      </Section>

      <Section title="Kontakt a Sreality" defaultOpen={false}>
        <Input label="Kontakt jméno" name="contact_name" defaultValue={property?.contact_name} />
        <Input label="Telefon" name="contact_phone" defaultValue={property?.contact_phone} />
        <Input label="E-mail" name="contact_email" type="email" defaultValue={property?.contact_email} />
        <Input label="Dostupné od" name="available_from" type="date" defaultValue={property?.available_from} />
        <Input label="Ready date pro pronájem" name="ready_date" type="date" defaultValue={property?.ready_date} />
        <Input label="Termín prodeje" name="sale_date" type="date" defaultValue={property?.sale_date} />
        <Input label="Termín prohlídky od" name="first_tour_date" type="date" defaultValue={property?.first_tour_date} />
        <Input label="Termín prohlídky do" name="first_tour_date_to" type="date" defaultValue={property?.first_tour_date_to} />
        <Input label="Sreality advert ID" name="sreality_advert_id" defaultValue={property?.sreality_advert_id} />
        <Input label="Sreality RKID" name="sreality_advert_rkid" defaultValue={property?.sreality_advert_rkid} />
        <Input label="Seller ID" name="seller_id" defaultValue={property?.seller_id} />
        <Input label="Seller RKID" name="seller_rkid" defaultValue={property?.seller_rkid} />
        <Checkbox label="Exkluzivní zastoupení" name="exclusivity" defaultChecked={property?.exclusivity} />
        <Checkbox label="Připravit pro Sreality export" name="export_to_sreality" defaultChecked={property?.export_to_sreality} />
      </Section>

      <button className="w-fit bg-forest px-6 py-3 text-sm font-semibold text-white hover:bg-[#073b23] focus:outline-none focus:ring-2 focus:ring-gold/60">
        Uložit nemovitost
      </button>
    </form>
  );
}
