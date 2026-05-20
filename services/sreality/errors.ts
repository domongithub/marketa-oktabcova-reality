export const SREALITY_ERROR_MESSAGES: Record<number, string> = {
  200: "OK",
  202: "RUIAN/UIR kód nebyl nalezen, ale inzerát byl přijat",
  203: "Adresa je nejednoznačně zadaná, ale inzerát byl přijat",
  204: "Některé povinné položky už nešlo změnit",
  205: "Bez přesné adresy se inzerát nemusí časem zobrazovat ve všech filtrech",
  404: "Nenalezeno",
  405: "Software key není aktivní",
  407: "Neplatné přihlášení nebo špatná session",
  410: "Obrázek je příliš velký",
  412: "Fotografie má příliš malé rozlišení",
  413: "Video je příliš velký",
  414: "Překročen limit fotek/videí",
  415: "Firma není aktivní",
  450: "Fotografie už existuje nebo patří k jinému inzerátu",
  451: "Fotografie je duplicitní",
  452: "Chybí povinné položky nebo mají špatný typ",
  453: "Adresa nebyla nalezena",
  454: "RUIAN/UIR ani textová lokalita nebyla rozpoznána",
  455: "Nevalidní textová položka",
  461: "Makléř neexistuje",
  462: "Login makléře už existuje",
  463: "Login makléře nebyl nalezen",
  476: "Neplatný formát obrázku",
  484: "Hlavní položky už není možné změnit",
  485: "Nejednoznačné RKID",
  500: "Interní chyba Sreality"
};

export function translateSrealityStatus(code?: number | null) {
  if (!code) return "Neznámý stav odpovědi";
  return SREALITY_ERROR_MESSAGES[code] || "Neznámá chyba Sreality";
}

export function srealityRecommendation(code?: number | null) {
  if (!code) return "Zkontrolujte odpověď importu a zkuste akci zopakovat.";
  if ([452, 455].includes(code)) return "Zkontrolujte povinná pole, datové typy a délku textů v detailu nemovitosti.";
  if ([453, 454].includes(code)) return "Doplňte město, ulici, číslo domu nebo zvolte větší znepřesnění lokality.";
  if ([410, 412, 414, 476].includes(code)) return "Zkontrolujte formát, velikost, rozlišení a počet fotografií.";
  if ([405, 407, 415].includes(code)) return "Zkontrolujte přístupové údaje, software key a aktivní účet realitní kanceláře.";
  if ([204, 484, 485].includes(code)) return "Neměňte hlavní parametry existujícího inzerátu, případně inzerát stáhněte a založte znovu.";
  return "Zkontrolujte detailní odpověď Srealit a data inzerátu.";
}

export class SrealityError extends Error {
  constructor(
    public statusCode: number,
    public statusMessage: string,
    public responsePayload?: unknown
  ) {
    super(`${statusCode}: ${translateSrealityStatus(statusCode)}${statusMessage ? ` (${statusMessage})` : ""}`);
  }
}
