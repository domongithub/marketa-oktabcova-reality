"use client";

import { useEffect, useMemo, useState } from "react";

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

function setInput(name: string, value?: string) {
  if (!value) return;
  const input = document.querySelector<HTMLInputElement>(`[name="${name}"]`);
  if (input) input.value = value;
}

export function AddressAutocomplete() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const canSearch = useMemo(() => query.trim().length >= 2, [query]);

  useEffect(() => {
    if (!canSearch) {
      return;
    }
    const controller = new AbortController();
    const timeout = window.setTimeout(async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(`/admin/address-suggest?q=${encodeURIComponent(query)}`, {
          signal: controller.signal
        });
        if (!response.ok) throw new Error("Adresní našeptávač se nepodařilo načíst.");
        const data = (await response.json()) as { suggestions?: AddressSuggestion[] };
        setSuggestions(data.suggestions || []);
        if (!data.suggestions?.length) setError("Nic jsem nenašel. Zkuste zadat ulici i město, třeba 'M. Alše Most'.");
      } catch {
        if (!controller.signal.aborted) {
          setSuggestions([]);
          setError("Našeptávač teď neodpovídá. Adresu můžete vyplnit ručně.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 280);

    return () => {
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [canSearch, query]);

  function applySuggestion(suggestion: AddressSuggestion) {
    setQuery(suggestion.label);
    setSuggestions([]);
    setInput("location", suggestion.label);
    setInput("city", suggestion.city);
    setInput("city_part", suggestion.cityPart);
    setInput("street", suggestion.street);
    setInput("house_number", suggestion.houseNumber);
    setInput("postal_code", suggestion.postalCode);
    setInput("gps_lat", suggestion.lat);
    setInput("gps_lng", suggestion.lng);
    setInput("locality_inaccuracy_level", "2");
  }

  return (
    <div className="relative grid gap-2 text-sm md:col-span-2">
      <label htmlFor="address-autocomplete" className="font-medium">
        Vyhledat adresu
      </label>
      <input
        id="address-autocomplete"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          if (event.target.value.trim().length < 2) setSuggestions([]);
        }}
        placeholder="Začněte psát ulici, město nebo číslo popisné"
        className="border border-forest/15 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gold/60"
      />
      <p className="text-xs leading-5 text-muted">
        Výběr automaticky doplní lokalitu pro web, město, ulici, číslo, PSČ a GPS pro Sreality.
      </p>
      {canSearch && suggestions.length ? (
        <div className="absolute left-0 right-0 top-[72px] z-20 max-h-72 overflow-auto border border-forest/10 bg-white shadow-soft">
          {suggestions.map((suggestion) => (
            <button
              key={`${suggestion.label}-${suggestion.lat}-${suggestion.lng}`}
              type="button"
              onClick={() => applySuggestion(suggestion)}
              className="block w-full border-b border-forest/10 px-3 py-3 text-left text-sm hover:bg-linen focus:bg-linen focus:outline-none"
            >
              {suggestion.label}
            </button>
          ))}
        </div>
      ) : null}
      {loading ? <p className="text-xs text-muted">Hledám adresy...</p> : null}
      {!loading && error ? <p className="text-xs text-red-700">{error}</p> : null}
    </div>
  );
}
