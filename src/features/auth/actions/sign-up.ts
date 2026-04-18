"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { z } from "zod";

const signUpSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  fullName: z.string().min(2, "Nome muito curto"),
});

export type SignUpActionResponse = {
  success: boolean;
  error?: string;
};

export async function signUpAction(formData: FormData): Promise<SignUpActionResponse> {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const fullName = formData.get("fullName") as string;

  // Validação
  const result = signUpSchema.safeParse({ email, password, fullName });
  if (!result.success) {
    return { success: false, error: result.error.issues[0].message };
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback`,
    },
  });

  if (error) {
    if (error.message.includes("already registered")) {
      return { success: false, error: "Este e-mail já está cadastrado." };
    }
    return { success: false, error: error.message };
  }

  return { success: true };
}
