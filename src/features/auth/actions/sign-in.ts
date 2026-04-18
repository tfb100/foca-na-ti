"use server";

import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

const signInSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(1, "A senha é obrigatória"),
});

export type SignInActionResponse = {
  success: boolean;
  error?: string;
};

export async function signInAction(formData: FormData): Promise<SignInActionResponse> {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Validação básica
  const result = signInSchema.safeParse({ email, password });
  if (!result.success) {
    return { success: false, error: result.error.issues[0].message };
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    if (error.message.includes("Invalid login credentials")) {
      return { success: false, error: "E-mail ou senha incorretos." };
    }
    if (error.message.includes("Email not confirmed")) {
      return { success: false, error: "Por favor, confirme seu e-mail antes de entrar." };
    }
    return { success: false, error: error.message };
  }

  return { success: true };
}
