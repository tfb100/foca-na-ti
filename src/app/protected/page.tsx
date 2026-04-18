import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Suspense } from "react";
import { LayoutDashboard, Shield, User } from "lucide-react";

async function UserDetails() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/sign-in");
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 p-4 rounded-xl border border-border bg-muted/20 backdrop-blur-sm">
        <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
          <User className="w-6 h-6 text-primary" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Usuário Autenticado</p>
          <p className="font-mono text-sm text-ti-orange">{data.user.email}</p>
        </div>
      </div>
      
      <div className="p-4 rounded-xl border border-border bg-muted/50 font-mono text-[10px] text-muted-foreground/60 overflow-hidden">
        <p className="mb-2 text-primary/40 leading-none tracking-tighter uppercase font-bold">Session_Metadata:</p>
        <pre className="max-h-32 overflow-auto scrollbar-hide">
          {JSON.stringify(data.user.user_metadata, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export default function ProtectedPage() {
  return (
    <div className="flex-1 w-full max-w-4xl mx-auto flex flex-col gap-12 py-12">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-ti-orange/20 bg-ti-orange/5 mb-4">
          <Shield className="w-3 h-3 text-ti-orange" />
          <span className="text-[10px] uppercase tracking-widest font-bold text-ti-orange">Acesso Seguro</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Área do <span className="text-glow text-primary">Concurseiro</span></h1>
        <p className="text-muted-foreground">Bem-vindo à sua central de estudos de alto nível.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="p-8 rounded-2xl border border-border bg-gradient-to-br from-muted/20 to-transparent backdrop-blur-md relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <LayoutDashboard className="w-24 h-24" />
          </div>
          <h2 className="text-xl font-bold mb-4 relative z-10">Status do Perfil</h2>
          <Suspense fallback={
            <div className="animate-pulse space-y-4">
              <div className="h-12 bg-white/5 rounded-xl" />
              <div className="h-32 bg-white/5 rounded-xl" />
            </div>
          }>
            <UserDetails />
          </Suspense>
        </div>

        <div className="flex flex-col gap-4">
          <div className="p-6 rounded-2xl border border-border bg-muted/20 hover:bg-muted/40 transition-colors cursor-pointer group">
            <h3 className="font-bold text-ti-orange group-hover:text-primary transition-colors">Ver Biblioteca</h3>
            <p className="text-sm text-muted-foreground">Acesse seus resumos e materiais de estudo.</p>
          </div>
          <div className="p-6 rounded-2xl border border-border bg-muted/20 hover:bg-muted/40 transition-colors cursor-pointer group">
            <h3 className="font-bold text-ti-orange group-hover:text-primary transition-colors">Configurações</h3>
            <p className="text-sm text-muted-foreground">Gerencie suas preferências e conta.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
