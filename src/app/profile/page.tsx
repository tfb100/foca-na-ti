import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { profiles } from "@/db/schema";
import { eq } from "drizzle-orm";
import { ProfileHeader } from "@/features/auth/components/profile-header";
import { ProfileForm } from "@/features/auth/components/profile-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { XPProgressCard } from "@/features/auth/components/xp-progress-card";
import { StreakCard } from "@/features/auth/components/streak-card";
import { count } from "drizzle-orm";
import { studyLogs } from "@/db/schema";
import { BookOpen, Trophy } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || !db) {
    redirect("/sign-in");
  }

  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.userId, user.id)
  });

  if (!profile) {
    // Caso de borda: Perfil ainda não sincronizado (trigger falhou ou delay)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground animate-pulse">Sincronizando perfil...</p>
      </div>
    );
  }

  const [completedCount] = await db
    .select({ value: count() })
    .from(studyLogs)
    .where(eq(studyLogs.profileId, profile.id));

  return (
    <div className="flex-1 w-full max-w-5xl mx-auto py-12 px-4 space-y-12">
      <ProfileHeader profile={profile} email={user.email!} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Coluna de Configurações */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="border-border bg-card/40 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Informações Pessoais</CardTitle>
              <CardDescription>Atualize seu nome de exibição e como você aparece na plataforma.</CardDescription>
            </CardHeader>
            <CardContent>
              <ProfileForm profile={profile} />
            </CardContent>
          </Card>

          <Card className="border-border bg-card/40 backdrop-blur-sm border-dashed">
            <CardHeader>
              <CardTitle className="text-muted-foreground/60">Configurações de Conta</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-muted/20">
                <div>
                  <p className="font-bold">E-mail</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
                <span className="text-[10px] bg-primary/20 text-primary px-2 py-1 rounded-full font-bold uppercase tracking-widest">Verificado</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Coluna de Estatísticas */}
        <div className="space-y-8">
          <XPProgressCard xp={profile.xp} />
          <StreakCard streak={profile.streak} />
          
          <Card className="border-border bg-card/40 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Temas Estudados</p>
                  <p className="text-2xl font-black text-foreground">{completedCount.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
