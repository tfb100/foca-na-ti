"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { KeyRound, Mail, ArrowLeft, CheckCircle2 } from "lucide-react";

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      });
      if (error) throw error;
      setSuccess(true);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Ocorreu um erro inesperado");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6 w-full max-w-sm", className)} {...props}>
      {success ? (
        <Card className="tech-card border-ti-cyan/20 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-ti-cyan to-ti-blue" />
          <CardHeader className="text-center pt-8">
            <div className="mx-auto w-12 h-12 rounded-full bg-ti-cyan/10 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-6 h-6 text-ti-cyan" />
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight">Verifique seu E-mail</CardTitle>
            <CardDescription className="text-muted-foreground/80">
              Instruções de recuperação enviadas com sucesso.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center pb-8">
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Se você possui uma conta cadastrada com este e-mail, receberá um link para criar uma nova senha em instantes.
            </p>
            <Link href="/sign-in">
              <Button variant="outline" className="w-full border-white/10 hover:bg-white/5">
                Voltar para o Login
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <Card className="tech-card border-white/5 overflow-hidden">
          <CardHeader className="space-y-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                <KeyRound className="w-4 h-4 text-primary" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary">Recuperação</span>
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight">Esqueceu a senha?</CardTitle>
            <CardDescription className="text-muted-foreground/80">
              Digite seu e-mail para receber um link de redefinição.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleForgotPassword} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">E-mail</Label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground/40 group-focus-within:text-ti-cyan transition-colors" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="exemplo@email.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-black/40 border-white/5 focus:border-ti-cyan/50 focus:ring-ti-cyan/20 transition-all"
                  />
                </div>
              </div>
              
              {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-xs text-center font-medium">
                  {error}
                </div>
              )}

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-glow" disabled={isLoading}>
                {isLoading ? "Enviando..." : "Enviar link de recuperação"}
              </Button>
              
              <div className="text-center">
                <Link
                  href="/sign-in"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  Voltar para o login
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
