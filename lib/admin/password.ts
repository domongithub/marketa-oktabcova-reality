import crypto from "node:crypto";

export async function hashPassword(password: string) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = await new Promise<Buffer>((resolve, reject) => {
    crypto.scrypt(password, salt, 64, (error, derivedKey) => (error ? reject(error) : resolve(derivedKey)));
  });
  return `scrypt:${salt}:${hash.toString("hex")}`;
}

export async function verifyPassword(password: string, storedHash: string) {
  const [, salt, hash] = storedHash.split(":");
  if (!salt || !hash) return false;
  const derived = await new Promise<Buffer>((resolve, reject) => {
    crypto.scrypt(password, salt, 64, (error, derivedKey) => (error ? reject(error) : resolve(derivedKey)));
  });
  return crypto.timingSafeEqual(Buffer.from(hash, "hex"), derived);
}
