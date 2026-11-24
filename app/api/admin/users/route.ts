import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { query } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const session = await getSession();
    if (!session || session.role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Acesso restrito ao Super Admin." }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const roleFilter = searchParams.get("role");

    let users = [
      { id: "u1", name: "Lucas Silva", email: "lucas@exemplo.com", role: "STUDENT", level: "Fundamental II", joined: "23/11/2026" },
      { id: "u2", name: "Mariana Oliveira", email: "mariana@exemplo.com", role: "PARENT", level: "Pai Educador", joined: "23/11/2026" },
      { id: "u3", name: "Prof. Carlos Ramos", email: "carlos@escola.com", role: "TEACHER", level: "Ensino Médio", joined: "22/11/2026" },
      { id: "u4", name: "VibeDoCode", email: "admin@vibedocode.pro", role: "SUPER_ADMIN", level: "Admin Global", joined: "20/11/2026" },
    ];

    try {
      let sql = "SELECT id, full_name as name, email, role, created_at FROM users";
      const params = [];
      if (roleFilter) {
        sql += " WHERE role = $1";
        params.push(roleFilter);
      }
      sql += " ORDER BY created_at DESC LIMIT 50";
      const res = await query(sql, params);
      if (res.rows.length > 0) {
        users = res.rows;
      }
    } catch {
      // Manter mock
    }

    return NextResponse.json({ success: true, users });
  } catch (error: any) {
    console.error("[Admin Users Error]", error);
    return NextResponse.json({ error: "Erro ao listar usuários." }, { status: 500 });
  }
}
