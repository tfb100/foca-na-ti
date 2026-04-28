"use server";

import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { profiles } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function updateProfileAction(data: { displayName: string }) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: "Usuário não autenticado." };
    }

    if (!db) {
        return { success: false, error: "Banco de dados não disponível." };
    }

    // Atualizar no banco de dados
    await db.update(profiles)
      .set({ 
        displayName: data.displayName,
        updatedAt: new Date()
      })
      .where(eq(profiles.userId, user.id));

    revalidatePath("/profile");
    
    return { success: true };
  } catch (error) {
    console.error("Error updating profile:", error);
    return { success: false, error: "Erro interno no servidor." };
  }
}
