"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function AdminLoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: form.get("email"), password: form.get("password") })
    });
    const data = (await response.json()) as { ok: boolean; message?: string };
    setLoading(false);
    if (!data.ok) {
      setError(data.message || "Přihlášení se nepodařilo.");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 bg-white p-8 shadow-soft">
      <label className="grid gap-2 text-sm font-medium">
        E-mail
        <input name="email" type="email" required className="border border-forest/15 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold/60" />
      </label>
      <label className="grid gap-2 text-sm font-medium">
        Heslo
        <input name="password" type="password" required className="border border-forest/15 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold/60" />
      </label>
      {error ? <p className="text-sm text-red-700">{error}</p> : null}
      <button disabled={loading} className="bg-forest px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#073b23] focus:outline-none focus:ring-2 focus:ring-gold/60 disabled:opacity-60">
        {loading ? "Přihlašuji..." : "Přihlásit"}
      </button>
    </form>
  );
}
