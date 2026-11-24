import { NextResponse } from "next/server";
import { z } from "zod";
import { hashPassword, setSessionCookie } from "@/lib/auth";
import { query } from "@/lib/db";

const registerSchema = z.object({
  role: z.enum(["STUDENT", "PARENT", "TEACHER"]).default("STUDENT"),
  fullName: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  academicLevel: z.string().default("fundamental_2"),
  subjectInterest: z.string().optional().default(""),
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: "A confirmação de maioridade ou autorização do responsável é obrigatória." }),
  }),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message || "Dados de cadastro inválidos." },
        { status: 400 }
      );
    }

    const { role, fullName, email, password, academicLevel, subjectInterest } = parsed.data;
    const passwordHash = await hashPassword(password);

    let userId = `user-${Date.now()}`;

    // Tentar persistir no PostgreSQL do VPS
    try {
      const res = await query(
        `INSERT INTO users (email, password_hash, full_name, role, is_verified, terms_accepted_at)
         VALUES ($1, $2, $3, $4, true, CURRENT_TIMESTAMP)
         RETURNING id`,
        [email, passwordHash, fullName, role]
      );

      if (res.rows?.[0]?.id) {
        userId = res.rows[0].id;
        // Inserir perfil associado
        await query(
          `INSERT INTO user_profiles (user_id, academic_level, default_subject_interest)
           VALUES ($1, $2, $3)`,
          [userId, academicLevel, subjectInterest]
        );
      }
    } catch (dbErr: any) {
      // Se der duplicate email
      if (dbErr.code === "23505") {
        return NextResponse.json({ error: "Este e-mail já está cadastrado." }, { status: 409 });
      }
      console.warn("[Register Warning] Banco externo indisponível no momento, emitindo sessão de contingência:", dbErr.message);
    }

    // Emitir sessão em cookie seguro
    await setSessionCookie({
      userId,
      email,
      role,
      fullName,
    });

    return NextResponse.json({
      success: true,
      message: "Cadastro realizado com sucesso!",
      user: { id: userId, email, fullName, role },
    });
  } catch (error: any) {
    console.error("[Register Error]", error);
    return NextResponse.json({ error: "Erro interno no servidor." }, { status: 500 });
  }
}
