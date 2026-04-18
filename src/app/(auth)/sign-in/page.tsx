import { SignInForm } from "@/features/auth/components/sign-in-form";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <SignInForm />
      <p className="mt-4 text-sm text-muted-foreground">
        Ainda não tem uma conta?{" "}
        <Link href="/sign-up" className="text-primary hover:text-ti-blue transition-colors font-medium">
          Cadastre-se
        </Link>
      </p>
    </div>
  );
}
