import { NextResponse, type NextRequest } from "next/server";

const rewrites: Record<string, string> = {
  "/správa-nemovitostí": "/sprava-nemovitosti",
  "/odhad-nemovitostí": "/odhad-nemovitosti"
};

export function proxy(request: NextRequest) {
  const pathname = decodeURIComponent(request.nextUrl.pathname);
  const target = rewrites[pathname];

  if (!target) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = target;

  return NextResponse.rewrite(url);
}
