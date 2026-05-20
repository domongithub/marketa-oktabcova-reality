import crypto from "node:crypto";

export function computeSrealitySessionId(sessionId: string, passwordMd5: string, softwareKey: string) {
  const fixedPart = sessionId.slice(0, 48);
  const varPart = crypto.createHash("md5").update(`${sessionId}${passwordMd5}${softwareKey}`).digest("hex");
  return `${fixedPart}${varPart}`;
}

export function canUseLiveSrealityExport() {
  return (
    process.env.SREALITY_EXPORT_ENABLED === "true" &&
    Boolean(process.env.SREALITY_CLIENT_ID) &&
    Boolean(process.env.SREALITY_PASSWORD_MD5) &&
    Boolean(process.env.SREALITY_SOFTWARE_KEY)
  );
}

export function getSrealityRuntimeStatus() {
  return {
    importUrl: process.env.SREALITY_IMPORT_URL || "https://import.sreality.cz/RPC2",
    clientIdConfigured: Boolean(process.env.SREALITY_CLIENT_ID),
    passwordConfigured: Boolean(process.env.SREALITY_PASSWORD_MD5),
    softwareKeyConfigured: Boolean(process.env.SREALITY_SOFTWARE_KEY),
    exportEnabled: process.env.SREALITY_EXPORT_ENABLED === "true",
    liveReady: canUseLiveSrealityExport()
  };
}
