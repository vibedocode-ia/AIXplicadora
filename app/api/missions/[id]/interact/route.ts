import { NextResponse } from "next/server";
import { z } from "zod";
import { processSocraticStep, SocraticState } from "@/services/socratic-service";
import { query } from "@/lib/db";

const interactSchema = z.object({
  userResponse: z.string().optional().default(""),
  requestHint: z.boolean().optional().default(false),
  currentHintCount: z.number().optional().default(0),
  currentState: z.string().optional().default("DIAGNOSING"),
  academicLevel: z.string().optional().default("fundamental_2"),
  role: z.string().optional().default("STUDENT"),
  subject: z.string().optional().default("Geral"),
});

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: missionId } = await params;
    const body = await req.json();
    const parsed = interactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0]?.message }, { status: 400 });
    }

    const { userResponse, requestHint, currentHintCount, currentState, academicLevel, role, subject } = parsed.data;

    // Processar o passo socrático via motor Astra
    const result = await processSocraticStep({
      missionId,
      userResponse,
      requestHint,
      currentHintCount,
      currentState,
      academicLevel,
      role,
      subject,
    });

    // Tentar persistir na tabela mission_turns
    try {
      if (userResponse) {
        await query(
          `INSERT INTO mission_turns (mission_id, turn_number, role, content)
           VALUES ($1, (SELECT COALESCE(MAX(turn_number), 0) + 1 FROM mission_turns WHERE mission_id = $1), 'user', $2)`,
          [missionId, userResponse]
        );
      }

      await query(
        `INSERT INTO mission_turns (mission_id, turn_number, role, content, hint_level)
         VALUES ($1, (SELECT COALESCE(MAX(turn_number), 0) + 1 FROM mission_turns WHERE mission_id = $1), 'assistant', $2, $3)`,
        [missionId, result.aiMessage, result.newHintCount]
      );

      await query(
        `UPDATE missions SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2`,
        [result.nextState, missionId]
      );
    } catch (dbErr) {
      console.warn("[Interact Warning] Persistência em contingência local:", dbErr);
    }

    return NextResponse.json({
      success: true,
      nextState: result.nextState,
      aiMessage: result.aiMessage,
      newHintCount: result.newHintCount,
      isAutonomyReady: result.isAutonomyReady,
    });
  } catch (error: any) {
    console.error("[Interact Error]", error);
    return NextResponse.json({ error: "Erro interno no motor socrático." }, { status: 500 });
  }
}
