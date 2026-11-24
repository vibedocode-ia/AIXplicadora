import { NextResponse } from "next/server";
import { z } from "zod";
import { evaluateAutonomySolution, recordLearningEvidence } from "@/services/autonomy-service";
import { getSession } from "@/lib/auth";
import { query } from "@/lib/db";

const verifyAutonomiaSchema = z.object({
  originalProblem: z.string().min(1),
  twinChallenge: z.string().min(1),
  studentSolution: z.string().min(1),
  academicLevel: z.string().default("fundamental_2"),
  subject: z.string().default("Geral"),
  topic: z.string().default("Geral"),
  hintCount: z.number().default(0),
});

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: missionId } = await params;
    const session = await getSession();
    const userId = session?.userId || `user-guest`;

    const body = await req.json();
    const parsed = verifyAutonomiaSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0]?.message }, { status: 400 });
    }

    const { originalProblem, twinChallenge, studentSolution, academicLevel, subject, topic, hintCount } = parsed.data;

    // Avaliar a solução de autonomia via Astra Service
    const evaluation = await evaluateAutonomySolution({
      originalProblem,
      twinChallenge,
      studentSolution,
      academicLevel,
    });

    // Registrar evidência de aprendizagem
    const evidence = await recordLearningEvidence({
      userId,
      missionId,
      subject,
      topic,
      demonstratedAutonomy: evaluation.isAutonomous,
      hintCount,
    });

    // Atualizar status no banco de dados
    try {
      await query(
        `UPDATE missions 
         SET status = 'COMPLETED', finished_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP 
         WHERE id = $1`,
        [missionId]
      );

      await query(
        `INSERT INTO learning_evidences (user_id, mission_id, subject, topic, demonstrated_autonomy, hint_count, mastery_level)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [userId, missionId, subject, topic, evaluation.isAutonomous, hintCount, evaluation.masteryLevel]
      );
    } catch (dbErr) {
      console.warn("[Verify Autonomia DB] Persistência em contingência local:", dbErr);
    }

    return NextResponse.json({
      success: true,
      evaluation,
      evidenceId: evidence.id,
      missionStatus: "COMPLETED",
    });
  } catch (error: any) {
    console.error("[Verify Autonomia Error]", error);
    return NextResponse.json({ error: "Erro ao validar autonomia do desafio gêmeo." }, { status: 500 });
  }
}
