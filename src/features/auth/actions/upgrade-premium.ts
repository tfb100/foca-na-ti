"use server";

import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { profiles } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function upgradeToPremiumAction() {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return { success: false, error: "Você precisa estar logado para assinar." };
    }

    // Em uma implementação real, aqui seria validado o webhook do Stripe/Pagar.me
    // Como é um MVP/Mock, atualizamos direto.

    if (!db) {
      return { success: false, error: "Banco de dados indisponível no momento." };
    }

    await db
      .update(profiles)
      .set({ isPremium: true, updatedAt: new Date() })
      .where(eq(profiles.userId, user.id));

    revalidatePath("/");
    revalidatePath("/library");
    revalidatePath("/pricing");
    revalidatePath("/protected");

    return { success: true };
  } catch (error) {
    console.error("Erro no upgrade premium:", error);
    return { success: false, error: "Falha ao processar assinatura. Tente novamente." };
  }
}
