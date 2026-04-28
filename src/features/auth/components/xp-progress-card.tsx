"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getXPProgress } from "../utils/gamification";
import { Zap, Trophy, Target } from "lucide-react";

interface XPProgressCardProps {
  xp: number;
}

export function XPProgressCard({ xp }: XPProgressCardProps) {
  const { currentLevel, progress, xpInCurrentLevel, xpForNextLevel } = getXPProgress(xp);

  return (
    <Card className="border-border bg-card/40 backdrop-blur-sm overflow-hidden relative group">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <Trophy className="h-24 w-24 text-primary" />
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-black uppercase tracking-widest text-muted-foreground/60 flex items-center gap-2">
          <Zap className="h-4 w-4 text-primary" />
          Nível do Aluno
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="flex items-end justify-between">
          <div className="space-y-1">
            <span className="text-5xl font-black tracking-tighter text-foreground">
              {currentLevel}
            </span>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
              Concurseiro Iniciante
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-black text-primary">
              {xpInCurrentLevel} <span className="text-muted-foreground/40">/ {xpForNextLevel} XP</span>
            </p>
          </div>
        </div>

        <Progress value={progress} className="h-3 bg-primary/10 border border-primary/5" />
        
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="p-3 rounded-xl bg-muted/20 border border-border space-y-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Total XP</p>
            <p className="font-mono font-bold text-foreground">{xp}</p>
          </div>
          <div className="p-3 rounded-xl bg-muted/20 border border-border space-y-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Próximo Nível</p>
            <p className="font-mono font-bold text-foreground">+{xpForNextLevel - xpInCurrentLevel} XP</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
