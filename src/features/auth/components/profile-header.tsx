import { Badge } from "@/components/ui/badge";
import { User, ShieldCheck, Zap, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { getXPProgress } from "../utils/gamification";

interface ProfileHeaderProps {
  profile: {
    displayName: string | null;
    isPremium: boolean;
    xp: number;
  };
  email: string;
}

export function ProfileHeader({ profile, email }: ProfileHeaderProps) {
  const { currentLevel } = getXPProgress(profile.xp);

  return (
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-ti-orange/20 to-primary/20 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-1000" />
      <div className="relative flex flex-col md:flex-row items-center gap-8 p-8 rounded-3xl border border-border bg-card/60 backdrop-blur-xl">
        <div className="relative">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/10 to-background border border-border flex items-center justify-center relative overflow-hidden group-hover:border-primary/50 transition-colors">
            <User className="w-10 h-10 text-primary" />
            <div className="absolute inset-0 bg-primary/5 animate-pulse" />
          </div>
          <div className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-background border-2 border-primary flex items-center justify-center shadow-lg">
            <span className="text-xs font-black text-primary">{currentLevel}</span>
          </div>
          {profile.isPremium && (
            <div className="absolute -top-3 -right-3 p-1.5 rounded-xl bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.5)]">
              <Zap className="h-4 w-4 fill-current" />
            </div>
          )}
        </div>

        <div className="flex-1 text-center md:text-left space-y-2">
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <h1 className="text-3xl font-black tracking-tight text-foreground">
                {profile.displayName || "Novo Aluno"}
              </h1>
              <div className="flex items-center gap-1 bg-primary/10 px-2 py-0.5 rounded-md border border-primary/20">
                <Star className="h-3 w-3 text-primary fill-primary" />
                <span className="text-[10px] font-black text-primary">NÍVEL {currentLevel}</span>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-2">
              <Badge variant={profile.isPremium ? "default" : "outline"} className={cn(
                "px-3 py-1 font-black uppercase tracking-widest text-[10px]",
                profile.isPremium ? "bg-amber-500 text-black border-amber-600" : "text-muted-foreground/60"
              )}>
                {profile.isPremium ? "MEMBRO PREMIUM" : "PLANO GRATUITO"}
              </Badge>
              {profile.isPremium && (
                <div className="flex items-center gap-1 text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20 text-[10px] font-bold">
                  <ShieldCheck className="h-3 w-3" />
                  ACESSO TOTAL
                </div>
              )}
            </div>
          </div>
          <p className="font-mono text-xs text-muted-foreground/60">{email}</p>
        </div>
      </div>
    </div>
  );
}
