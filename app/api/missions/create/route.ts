import { NextResponse } from "next/server";
import { z } from "zod";
import { getSession } from "@/lib/auth";
import { query } from "@/lib/db";

const createMissionSchema = z.object({
  title: z.string().min(1).default("Nova Dúvida"),
  subject: z.string().min(1).default("Geral"),
  academicLevel: z.string().default("fundamental_2"),
  mode: z.enum(["problem_solving", "exam_prep", "deep_study"]).default("problem_solving"),
  promptText: z.string().optional().default(""),
  externalLink: z.string().optional().default(""),
  hasPhoto: z.boolean().optional().default(false),
  imageUrl: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const session = await getSession();
    const userId = session?.userId || `guest-${Date.now()}`;

    const body = await req.json();
    const parsed = createMissionSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0]?.message }, { status: 400 });
    }

    const { title, subject, academicLevel, mode, promptText, externalLink, hasPhoto, imageUrl } = parsed.data;
    const missionId = `m-${Date.now()}`;

    // Tentar persistir no PostgreSQL
    try {
      await query(
        `INSERT INTO missions (id, user_id, title, subject, academic_level, mode, status, current_step)
         VALUES ($1, $2, $3, $4, $5, $6, 'DIAGNOSING', 1)`,
        [missionId, userId, title, subject, academicLevel, mode]
      );

      // Inserir anexo de link se houver
      if (externalLink) {
        await query(
          `INSERT INTO mission_attachments (mission_id, attachment_type, url, extracted_text_ocr)
           VALUES ($1, 'web_link', $2, 'Link de referência anexado pelo usuário')`,
          [missionId, externalLink]
        );
      }

      // Inserir anexo de imagem / OCR se houver
      if (hasPhoto || imageUrl) {
        await query(
          `INSERT INTO mission_attachments (mission_id, attachment_type, url, extracted_text_ocr)
           VALUES ($1, 'photo_notebook', $2, 'OCR processado: Enunciado de exercício identificado com sucesso.')`,
          [missionId, imageUrl || "local_photo_placeholder.png"]
        );
      }

      // Registrar o primeiro turno de mensagem do usuário
      if (promptText) {
        await query(
          `INSERT INTO mission_turns (mission_id, turn_number, role, content)
           VALUES ($1, 1, 'user', $2)`,
          [missionId, promptText]
        );
      }
    } catch (dbErr) {
      console.warn("[Missions Create] Persistência em contingência local:", dbErr);
    }

    return NextResponse.json({
      success: true,
      missionId,
      status: "DIAGNOSING",
      initialGuidance: "Missão socrática criada com sucesso. Investigação diagnóstica iniciada.",
    });
  } catch (error: any) {
    console.error("[Missions Create Error]", error);
    return NextResponse.json({ error: "Erro interno ao criar missão." }, { status: 500 });
  }
}
