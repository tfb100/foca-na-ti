"use server";

import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { profiles, studyLogs } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { XP_PER_SUMMARY, calculateStreak } from "@/features/auth/utils/gamification";

export async function completeSummaryAction(summaryId: string) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { success: false, error: "Usuário não autenticado" };

    const profile = await db.query.profiles.findFirst({
      where: eq(profiles.userId, user.id)
    });

    if (!profile) return { success: false, error: "Perfil não encontrado" };

    // 1. Verificar se já foi concluído antes
    const existingLog = await db.query.studyLogs.findFirst({
      where: and(
        eq(studyLogs.profileId, profile.id),
        eq(studyLogs.summaryId, summaryId)
      )
    });

    if (existingLog) {
      return { success: true, message: "Já concluído anteriormente", alreadyDone: true };
    }

    // 2. Calcular XP e Streak
    const newStreak = calculateStreak(profile.lastStudyDate, profile.streak);
    const newXP = profile.xp + XP_PER_SUMMARY;

    // 3. Persistir mudanças
    await db.transaction(async (tx) => {
      // Atualizar perfil
      await tx.update(profiles)
        .set({
          xp: newXP,
          streak: newStreak,
          lastStudyDate: new Date(),
          updatedAt: new Date()
        })
        .where(eq(profiles.id, profile.id));

      // Criar log
      await tx.insert(studyLogs).values({
        profileId: profile.id,
        summaryId: summaryId,
        xpEarned: XP_PER_SUMMARY,
        completedAt: new Date()
      });
    });

    return { 
      success: true, 
      xpEarned: XP_PER_SUMMARY, 
      newStreak,
      message: "Resumo concluído com sucesso!" 
    };

  } catch (error) {
    console.error("Erro ao concluir resumo:", error);
    return { success: false, error: "Falha ao registrar conclusão" };
  }
}
