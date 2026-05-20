export const SREALITY = {
  advertFunction: { sale: 1, rent: 2, auction: 3, share: 4 },
  advertType: { apartment: 1, house: 2, land: 3, commercial: 4, other: 5 },
  advertLifetime: { days7: 1, days14: 2, days30: 3, days90: 4, days180: 6, days360: 7, days45: 8 },
  currency: { CZK: 1, USD: 2, EUR: 3 },
  priceUnit: { property: 1, month: 2, sqm: 3, sqmMonth: 4, sqmYear: 5, year: 6, day: 7, hour: 8 },
  apartmentSubtype: {
    "1+kk": 2,
    "1+1": 3,
    "2+kk": 4,
    "2+1": 5,
    "3+kk": 6,
    "3+1": 7,
    "4+kk": 8,
    "4+1": 9,
    "5+kk": 10,
    "5+1": 11,
    "6+": 12,
    atypicky: 16,
    pokoj: 47
  },
  houseSubtype: { chata: 33, pamatka: 35, rodinny: 37, vila: 39, naKlic: 40, chalupa: 43, usedlost: 44, vicegeneracni: 54 },
  landSubtype: { komercni: 18, bydleni: 19, pole: 20, lesy: 21, louky: 22, zahrady: 23, ostatni: 24, rybniky: 46, sadyVinice: 48 },
  commercialSubtype: { kancelare: 25, sklady: 26, vyroba: 27, obchod: 28, ubytovani: 29, restaurace: 30, zemedelsky: 31, ostatni: 32, cinzovniDum: 38, virtualni: 49, ordinace: 56, apartmany: 57 },
  buildingType: { drevostavba: 1, cihlova: 2, kamenna: 3, montovana: 4, panelova: 5, skeletova: 6, smisena: 7, modularni: 8 },
  buildingCondition: { velmiDobry: 1, dobry: 2, spatny: 3, veVystavbe: 4, projekt: 5, novostavba: 6, kDemolici: 7, predRekonstrukci: 8, poRekonstrukci: 9, vRekonstrukci: 10 },
  ownership: { osobni: 1, druzstevni: 2, statniObecni: 3 },
  energy: { A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7 },
  yesNo: { ano: 1, ne: 2 },
  furnished: { ano: 1, ne: 2, castecne: 3 },
  extraInfo: { reserved: 1, sold: 2 },
  objectType: { prizemni: 1, patrovy: 2 },
  objectKind: { radovy: 1, rohovy: 2, vBloku: 3, samostatny: 4 },
  objectLocation: { centrum: 1, klidna: 2, rusna: 3, okraj: 4, sidliste: 5, polosamota: 6, samota: 7 },
  roomType: {
    obyvak: 1,
    obyvakJidelna: 2,
    jidelna: 3,
    pokoj: 4,
    kuchyne: 5,
    koupelna: 6,
    chodba: 10,
    sklep: 18,
    zahrada: 19,
    parkovani: 21,
    pudorys2d: 22,
    energetickyStitek: 25,
    venkovniDum: 29,
    detail: 30
  }
} as const;

export const SREALITY_LABELS = {
  status: {
    not_exported: "Neexportováno",
    dry_run_ready: "Dry-run připraven",
    pending: "Čeká",
    exported: "Exportováno",
    update_needed: "Vyžaduje aktualizaci",
    photo_sync_needed: "Vyžaduje synchronizaci fotek",
    error: "Chyba",
    removed: "Staženo"
  }
};
