import { NextResponse } from "next/server";
import { createAdminSession, findAdminByEmail } from "@/lib/admin/auth";
import { verifyPassword } from "@/lib/admin/password";

export async function POST(request: Request) {
  const { email, password } = (await request.json()) as { email?: string; password?: string };

  if (!email || !password) {
    return NextResponse.json({ ok: false, message: "Vyplňte e-mail a heslo." }, { status: 400 });
  }

  const user = await findAdminByEmail(email.toLowerCase().trim());
  if (!user || !(await verifyPassword(password, user.password_hash))) {
    return NextResponse.json({ ok: false, message: "Neplatné přihlašovací údaje." }, { status: 401 });
  }

  await createAdminSession(user);
  return NextResponse.json({ ok: true });
}
