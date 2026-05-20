import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { getAdminFromSession } from "@/lib/admin/auth";

export default async function AdminLoginPage() {
  const admin = await getAdminFromSession();
  if (admin) redirect("/admin");

  return (
    <main className="grid min-h-screen place-items-center px-5">
      <div className="w-full max-w-md">
        <p className="mb-3 text-xs uppercase tracking-[0.24em] text-gold">Admin</p>
        <h1 className="mb-8 font-serif text-4xl text-forest">Přihlášení do CRM</h1>
        <AdminLoginForm />
      </div>
    </main>
  );
}
