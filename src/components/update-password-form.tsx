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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ShieldCheck, Lock, Save } from "lucide-react";

export function UpdatePasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      router.push("/protected");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Erro ao atualizar senha");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6 w-full max-w-sm", className)} {...props}>
      <Card className="tech-card border-white/5 overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
          <ShieldCheck className="w-24 h-24" />
        </div>
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 rounded-lg bg-ti-cyan/10 border border-ti-cyan/20">
              <Lock className="w-4 h-4 text-ti-cyan" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-ti-cyan">Segurança</span>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">Nova Senha</CardTitle>
          <CardDescription className="text-muted-foreground/80">
            Defina uma senha robusta para proteger sua conta.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpdatePassword} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">Nova Senha</Label>
              <div className="relative group">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground/40 group-focus-within:text-ti-cyan transition-colors" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-black/40 border-white/5 focus:border-ti-cyan/50 focus:ring-ti-cyan/20 transition-all"
                />
              </div>
              <p className="text-[10px] text-muted-foreground/40 pt-1 italic">
                Use pelo menos 8 caracteres com letras e números.
              </p>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-xs text-center font-medium">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-glow flex items-center gap-2" disabled={isLoading}>
              {isLoading ? (
                "Salvando..."
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Atualizar Senha
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
