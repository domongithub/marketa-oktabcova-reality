import { hashPassword } from "../lib/admin/password";
import { readFileSync, existsSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";

function loadLocalEnv() {
  if (!existsSync(".env.local")) return;
  const content = readFileSync(".env.local", "utf8");
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const index = trimmed.indexOf("=");
    if (index === -1) continue;
    const key = trimmed.slice(0, index);
    const value = trimmed.slice(index + 1);
    process.env[key] ||= value;
  }
}

async function main() {
  const email = process.argv[2]?.toLowerCase();
  const password = process.argv[3];
  const name = process.argv[4] || "Admin";

  if (!email || !password) {
    console.error("Použití: npm run admin:create -- email@example.cz heslo \"Jméno\"");
    process.exit(1);
  }

  const passwordHash = await hashPassword(password);
  loadLocalEnv();
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Chybí SUPABASE_URL nebo SUPABASE_SERVICE_ROLE_KEY.");
  }
  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
  const { error } = await supabase.from("admin_users").upsert(
    {
      email,
      name,
      role: "admin",
      password_hash: passwordHash,
      updated_at: new Date().toISOString()
    },
    { onConflict: "email" }
  );

  if (error) throw error;
  console.log(`Admin uživatel ${email} je připravený.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
