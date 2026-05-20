import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/auth";

type NominatimPlace = {
  display_name: string;
  lat: string;
  lon: string;
  address?: {
    city?: string;
    town?: string;
    village?: string;
    municipality?: string;
    suburb?: string;
    city_district?: string;
    road?: string;
    pedestrian?: string;
    house_number?: string;
    postcode?: string;
  };
};

type AddressSuggestion = {
  label: string;
  city?: string;
  cityPart?: string;
  street?: string;
  houseNumber?: string;
  postalCode?: string;
  lat?: string;
  lng?: string;
};

type MapySuggestItem = {
  name?: string;
  label?: string;
  location?: string;
  zip?: string;
  position?: {
    lat?: number;
    lon?: number;
  };
  regionalStructure?: Array<{
    type?: string;
    name?: string;
  }>;
};

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function queryVariants(query: string) {
  const normalized = normalize(query);
  const variants = new Set([query, `${query} Česko`]);

  const streetHints: Record<string, string[]> = {
    lubl: ["Lublaňská", "Lublaňská Praha", "Lublaňská Česko"],
    lublan: ["Lublaňská", "Lublaňská Praha", "Lublaňská Česko"],
    lublanska: ["Lublaňská", "Lublaňská Praha", "Lublaňská Česko"]
  };

  for (const [prefix, hints] of Object.entries(streetHints)) {
    if (normalized.startsWith(prefix) || prefix.startsWith(normalized)) {
      hints.forEach((hint) => variants.add(hint));
    }
  }

  return [...variants].slice(0, 5);
}

function parseHouseNumber(label: string) {
  return label.match(/\b\d+[a-zA-Z]?(?:\/\d+[a-zA-Z]?)?\b/)?.[0];
}

function dedupe(items: AddressSuggestion[]) {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = normalize(`${item.label}-${item.lat}-${item.lng}`);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function sortSuggestions(items: AddressSuggestion[], query: string) {
  const normalizedQuery = normalize(query);
  return [...items].sort((a, b) => {
    const aLabel = normalize(`${a.street || ""} ${a.label}`);
    const bLabel = normalize(`${b.street || ""} ${b.label}`);
    const aStarts = aLabel.startsWith(normalizedQuery) || aLabel.includes(` ${normalizedQuery}`);
    const bStarts = bLabel.startsWith(normalizedQuery) || bLabel.includes(` ${normalizedQuery}`);
    if (aStarts === bStarts) return 0;
    return aStarts ? -1 : 1;
  });
}

async function fetchMapySuggestions(query: string): Promise<AddressSuggestion[]> {
  const apiKey = process.env.MAPY_API_KEY;
  if (!apiKey) return [];

  const url = new URL("https://api.mapy.com/v1/suggest");
  url.searchParams.set("query", query);
  url.searchParams.set("lang", "cs");
  url.searchParams.set("limit", "8");
  url.searchParams.set("apikey", apiKey);
  url.searchParams.set("locality", "cz");

  const response = await fetch(url, { next: { revalidate: 60 * 60 * 24 } }).catch(() => null);
  if (!response?.ok) return [];

  const data = (await response.json()) as { items?: MapySuggestItem[] };
  return (data.items || []).map((item) => {
    const city = item.regionalStructure?.find((part) => ["municipality", "regional.municipality"].includes(part.type || ""))?.name;
    const cityPart = item.regionalStructure?.find((part) => ["ward", "regional.ward", "quarter"].includes(part.type || ""))?.name;
    return {
      label: item.label || [item.name, item.location].filter(Boolean).join(", "),
      city,
      cityPart,
      street: item.name?.replace(parseHouseNumber(item.name) || "", "").trim(),
      houseNumber: item.name ? parseHouseNumber(item.name) : undefined,
      postalCode: item.zip,
      lat: item.position?.lat ? String(item.position.lat) : undefined,
      lng: item.position?.lon ? String(item.position.lon) : undefined
    };
  });
}

async function fetchNominatimSuggestions(query: string): Promise<AddressSuggestion[]> {
  const places: NominatimPlace[] = [];
  for (const variant of queryVariants(query)) {
    const url = new URL("https://nominatim.openstreetmap.org/search");
    url.searchParams.set("format", "jsonv2");
    url.searchParams.set("addressdetails", "1");
    url.searchParams.set("limit", "6");
    url.searchParams.set("countrycodes", "cz");
    url.searchParams.set("q", variant);

    const response = await fetch(url, {
      headers: {
        "accept-language": "cs",
        "user-agent": "marketa-oktabcova-reality-admin/1.0"
      },
      next: { revalidate: 60 * 60 * 24 }
    }).catch(() => null);

    if (response?.ok) {
      places.push(...((await response.json()) as NominatimPlace[]));
    }
  }

  return places.map((place) => {
    const address = place.address || {};
    return {
      label: place.display_name,
      city: address.city || address.town || address.village || address.municipality,
      cityPart: address.suburb || address.city_district,
      street: address.road || address.pedestrian,
      houseNumber: address.house_number,
      postalCode: address.postcode,
      lat: place.lat,
      lng: place.lon
    };
  });
}

export async function GET(request: Request) {
  await requireAdmin();
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim();

  if (!query || query.length < 2) {
    return NextResponse.json({ suggestions: [] });
  }

  const mapy = await fetchMapySuggestions(query);
  const fallback = mapy.length ? [] : await fetchNominatimSuggestions(query);
  const suggestions = sortSuggestions(dedupe([...mapy, ...fallback]), query).slice(0, 8);

  return NextResponse.json({
    suggestions,
    provider: mapy.length ? "mapy" : "nominatim"
  });
}
