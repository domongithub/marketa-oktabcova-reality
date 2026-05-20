import "server-only";
import { SrealityError } from "@/services/sreality/errors";
import { computeSrealitySessionId } from "@/services/sreality/session";

type XmlRpcValue = string | number | boolean | null | XmlRpcValue[] | { [key: string]: XmlRpcValue };

function escapeXml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function serializeValue(value: XmlRpcValue): string {
  if (Array.isArray(value)) {
    return `<value><array><data>${value.map(serializeValue).join("")}</data></array></value>`;
  }
  if (value && typeof value === "object") {
    return `<value><struct>${Object.entries(value)
      .map(([key, item]) => `<member><name>${escapeXml(key)}</name>${serializeValue(item)}</member>`)
      .join("")}</struct></value>`;
  }
  if (typeof value === "number") return Number.isInteger(value) ? `<value><int>${value}</int></value>` : `<value><double>${value}</double></value>`;
  if (typeof value === "boolean") return `<value><boolean>${value ? 1 : 0}</boolean></value>`;
  if (value === null) return "<value><nil/></value>";
  return `<value><string>${escapeXml(String(value))}</string></value>`;
}

async function rawXmlRpc(methodName: string, params: XmlRpcValue[] = []) {
  const endpoint = process.env.SREALITY_IMPORT_URL || "https://import.sreality.cz/RPC2";
  const body = `<?xml version="1.0"?><methodCall><methodName>${methodName}</methodName><params>${params
    .map((param) => `<param>${serializeValue(param)}</param>`)
    .join("")}</params></methodCall>`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "content-type": "text/xml; charset=utf-8" },
    body
  });

  const text = await response.text();
  return { response, text };
}

function readStatusCode(xml: string) {
  const statusMatch = xml.match(/<name>status<\/name>\s*<value>\s*<(?:int|i4)>(\d+)<\/(?:int|i4)>/);
  return statusMatch ? Number(statusMatch[1]) : null;
}

function readStringMember(xml: string, name: string) {
  const match = xml.match(new RegExp(`<name>${name}<\\/name>\\s*<value>\\s*<string>([\\s\\S]*?)<\\/string>`));
  return match ? match[1] : null;
}

export class SrealityClient {
  private sessionId: string | null = null;

  async getHash(clientId = process.env.SREALITY_CLIENT_ID || "") {
    const { text } = await rawXmlRpc("getHash", [clientId]);
    const hash = readStringMember(text, "session_id") || readStringMember(text, "hash") || text.match(/<string>(.*?)<\/string>/)?.[1];
    if (!hash) throw new SrealityError(407, "Nepodařilo se získat session hash.", text);
    return hash;
  }

  async login() {
    const clientId = process.env.SREALITY_CLIENT_ID || "";
    const passwordMd5 = process.env.SREALITY_PASSWORD_MD5 || "";
    const softwareKey = process.env.SREALITY_SOFTWARE_KEY || "";
    const hash = await this.getHash(clientId);
    this.sessionId = computeSrealitySessionId(hash, passwordMd5, softwareKey);
    const result = await rawXmlRpc("login", [this.sessionId]);
    this.assertOk(result.text);
    return this.sessionId;
  }

  nextSession() {
    if (!this.sessionId) throw new SrealityError(407, "Chybí aktivní session.", null);
    this.sessionId = computeSrealitySessionId(this.sessionId, process.env.SREALITY_PASSWORD_MD5 || "", process.env.SREALITY_SOFTWARE_KEY || "");
    return this.sessionId;
  }

  async logout() {
    if (!this.sessionId) return;
    const result = await rawXmlRpc("logout", [this.nextSession()]);
    this.assertOk(result.text);
    this.sessionId = null;
  }

  async callSrealityMethod(methodName: string, params: XmlRpcValue[] = []) {
    const sessionId = this.nextSession();
    const result = await rawXmlRpc(methodName, [sessionId, ...params]);
    this.assertOk(result.text);
    return { raw: result.text, statusCode: readStatusCode(result.text) || 200 };
  }

  addAdvert(advertData: Record<string, XmlRpcValue>) {
    return this.callSrealityMethod("addAdvert", [advertData]);
  }

  delAdvert(advertId: string | number, advertRkid?: string | null) {
    return this.callSrealityMethod("delAdvert", [advertId, advertRkid || ""]);
  }

  listAdvert() {
    return this.callSrealityMethod("listAdvert");
  }

  addPhoto(advertId: string | number, advertRkid: string | null, data: Record<string, XmlRpcValue>) {
    return this.callSrealityMethod("addPhoto", [advertId, advertRkid || "", data]);
  }

  delPhoto(photoId: string | number, photoRkid?: string | null) {
    return this.callSrealityMethod("delPhoto", [photoId, photoRkid || ""]);
  }

  listPhoto(advertId: string | number, advertRkid?: string | null) {
    return this.callSrealityMethod("listPhoto", [advertId, advertRkid || ""]);
  }

  private assertOk(xml: string) {
    const statusCode = readStatusCode(xml);
    if (statusCode && (statusCode < 200 || statusCode >= 300)) {
      throw new SrealityError(statusCode, readStringMember(xml, "statusMessage") || "", xml);
    }
  }
}
