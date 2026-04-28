"use server";

import { db } from "@/lib/db";
import { aiFeedbacks, profiles } from "@/db/schema";
import { eq } from "drizzle-orm";
import { createClient } from "@/lib/supabase/server";

export async function saveAdaFeedbackAction({
  summaryId,
  userPrompt,
  adaResponse,
  feedbackType,
  feedbackNote
}: {
  summaryId?: string;
  userPrompt: string;
  adaResponse: string;
  feedbackType: "like" | "dislike";
  feedbackNote?: string;
}) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("Usuário não autenticado");
    }

    // Buscar o profileId correspondente ao usuário
    const profileData = await db
      .select()
      .from(profiles)
      .where(eq(profiles.userId, user.id))
      .limit(1);

    if (profileData.length === 0) {
      throw new Error("Perfil não encontrado");
    }

    const profileId = profileData[0].id;

    // Salvar o feedback
    await db.insert(aiFeedbacks).values({
      profileId,
      summaryId: summaryId || null,
      userPrompt,
      adaResponse,
      feedbackType,
      feedbackNote
    });

    return { success: true };
  } catch (error: any) {
    console.error("Erro ao salvar feedback da Ada:", error);
    return { success: false, error: error.message };
  }
}
