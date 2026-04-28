"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Flame, Calendar, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface StreakCardProps {
  streak: number;
}

export function StreakCard({ streak }: StreakCardProps) {
  return (
    <Card className="border-border bg-card/40 backdrop-blur-sm overflow-hidden relative group h-full">
      <CardContent className="p-6 flex flex-col justify-between h-full">
        <div className="flex justify-between items-start">
          <div className="p-2 rounded-xl bg-ti-orange/10 border border-ti-orange/20">
            <Flame className={cn("h-6 w-6 text-ti-orange", streak > 0 && "animate-pulse-slow")} />
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Fogo nos Estudos</p>
            <p className="text-3xl font-black tracking-tighter text-ti-orange">{streak} Dias</p>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <div className="flex items-center gap-3 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground/40" />
            <span className="text-muted-foreground">Consistência Mensal</span>
            <span className="ml-auto font-bold text-foreground">85%</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground/40" />
            <span className="text-muted-foreground">Média Diária</span>
            <span className="ml-auto font-bold text-foreground">45 min</span>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-border/50">
          <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:text-primary/80 transition-colors">
            Ver Calendário Completo →
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
