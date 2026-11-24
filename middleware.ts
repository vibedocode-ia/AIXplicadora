import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("aixplicadora_session")?.value;

  // Proteger rotas de administração
  if (pathname.startsWith("/api/admin")) {
    if (!token) {
      return NextResponse.json({ error: "Não autorizado: Sessão ausente." }, { status: 401 });
    }
  }

  // Proteger rotas de missões do usuário autenticado
  if (pathname.startsWith("/missao") || pathname.startsWith("/familia") || pathname.startsWith("/trilhas")) {
    if (!token) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/missao/:path*",
    "/familia/:path*",
    "/trilhas/:path*",
    "/api/admin/:path*",
  ],
};
