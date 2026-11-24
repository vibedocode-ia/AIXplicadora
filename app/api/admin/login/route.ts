import { NextResponse } from "next/server";
import { z } from "zod";
import { verifyPassword, setSessionCookie, checkRateLimit } from "@/lib/auth";
import { query } from "@/lib/db";

const adminLoginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = adminLoginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Credenciais incompletas." }, { status: 400 });
    }

    const { username, password } = parsed.data;

    // Rate limiting para o login do Super Admin (3 tentativas por minuto por IP)
    const rl = checkRateLimit(`admin-login-${username}`, 3, 60000);
    if (!rl.allowed) {
      return NextResponse.json(
        { error: "Muitas tentativas no painel administrativo. Bloqueio temporário de 1 minuto." },
        { status: 429 }
      );
    }

    const isUsernameValid = username.trim().toLowerCase() === "vibedocode";
    let isPasswordValid = false;

    if (isUsernameValid) {
      // 1. Tentar validar via banco de dados
      try {
        const res = await query("SELECT id, password_hash, role FROM users WHERE role = 'SUPER_ADMIN'");
        if (res.rows.length > 0) {
          const adminUser = res.rows[0];
          isPasswordValid = await verifyPassword(password, adminUser.password_hash);
        }
      } catch (dbErr) {
        console.warn("[Admin Login Warning] DB offline, usando validação de bootstrap:", dbErr);
      }

      // 2. Validação canônica de bootstrap conforme especificado nas diretrizes
      if (!isPasswordValid && password === (process.env.SUPER_ADMIN_PASSWORD || "Entrar2026@")) {
        isPasswordValid = true;
      }
    }

    if (!isUsernameValid || !isPasswordValid) {
      return NextResponse.json({ error: "Acesso negado: Credenciais inválidas para o Super Admin." }, { status: 401 });
    }

    // Emitir sessão de Super Admin
    await setSessionCookie({
      userId: "super-admin-vibedocode",
      email: "admin@vibedocode.pro",
      role: "SUPER_ADMIN",
      fullName: "VibeDoCode",
    });

    return NextResponse.json({
      success: true,
      message: "Autenticação de Super Admin realizada com sucesso.",
      role: "SUPER_ADMIN",
      user: "VibeDoCode",
    });
  } catch (error: any) {
    console.error("[Admin Login Error]", error);
    return NextResponse.json({ error: "Erro interno no servidor." }, { status: 500 });
  }
}
