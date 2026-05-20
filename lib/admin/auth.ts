import "server-only";
import crypto from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import type { AdminUser } from "@/lib/crm/types";

const cookieName = "marketa_admin_session";
const sessionMaxAge = 60 * 60 * 8;

function getSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("Missing ADMIN_SESSION_SECRET.");
  return secret;
}

function sign(value: string) {
  return crypto.createHmac("sha256", getSecret()).update(value).digest("hex");
}

export async function createAdminSession(user: AdminUser) {
  const payload = JSON.stringify({ id: user.id, email: user.email, role: user.role, exp: Math.floor(Date.now() / 1000) + sessionMaxAge });
  const encoded = Buffer.from(payload).toString("base64url");
  const value = `${encoded}.${sign(encoded)}`;
  const cookieStore = await cookies();
  cookieStore.set(cookieName, value, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: sessionMaxAge,
    path: "/"
  });
}

export async function destroyAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(cookieName);
}

export async function getAdminFromSession(): Promise<AdminUser | null> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(cookieName)?.value;
  if (!raw) return null;
  const [encoded, signature] = raw.split(".");
  if (!encoded || !signature || sign(encoded) !== signature) return null;
  const payload = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8")) as AdminUser & { exp: number };
  if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000) || payload.role !== "admin") return null;
  return { id: payload.id, email: payload.email, name: payload.email, role: "admin" };
}

export async function requireAdmin() {
  const admin = await getAdminFromSession();
  if (!admin) redirect("/admin/login");
  return admin;
}

export async function findAdminByEmail(email: string) {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.from("admin_users").select("id,email,name,role,password_hash").eq("email", email).single();
  if (error || !data) return null;
  return data as AdminUser & { password_hash: string };
}
