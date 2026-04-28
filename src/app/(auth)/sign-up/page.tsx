import { SignUpForm } from "@/features/auth/components/sign-up-form";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <SignUpForm />
      <p className="mt-4 text-sm text-muted-foreground">
        Já possui uma conta?{" "}
        <Link href="/sign-in" className="text-primary hover:text-ti-blue transition-colors font-medium">
          Entrar
        </Link>
      </p>
    </div>
  );
}
