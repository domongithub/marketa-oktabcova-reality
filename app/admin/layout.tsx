import type { ReactNode } from "react";

export const metadata = {
  title: "Admin | Markéta Oktábcová reality",
  robots: { index: false, follow: false }
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-[#f7f4ee] text-forest">{children}</div>;
}
