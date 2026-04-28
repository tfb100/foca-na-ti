"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { completeSummaryAction } from "../actions/complete-summary";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import { cn } from "@/lib/utils";

interface CompleteStudyButtonProps {
  summaryId: string;
  isCompleted?: boolean;
}

export function CompleteStudyButton({ summaryId, isCompleted: initialCompleted }: CompleteStudyButtonProps) {
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(initialCompleted);

  const handleComplete = async () => {
    if (completed) return;
    
    setLoading(true);
    try {
      const result = await completeSummaryAction(summaryId);
      
      if (result.success) {
        setCompleted(true);
        
        if (!result.alreadyDone) {
          // Efeito de Confete
          confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#FF5733", "#FF8D33", "#00F5FF", "#FFFFFF"]
          });
          
          toast.success("Resumo Concluído!", {
            description: `Você ganhou +${result.xpEarned} XP! Streak atual: ${result.newStreak} dias.`,
            icon: <Sparkles className="h-4 w-4 text-primary" />
          });
        }
      } else {
        toast.error("Erro ao salvar progresso", {
          description: result.error
        });
      }
    } catch (error) {
      toast.error("Erro inesperado ao concluir estudo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleComplete}
      disabled={loading || completed}
      variant={completed ? "secondary" : "default"}
      size="lg"
      className={cn(
        "gap-3 font-black uppercase tracking-widest text-xs h-14 px-8 rounded-2xl transition-all duration-500",
        completed ? "bg-primary/10 text-primary border-primary/20 pointer-events-none" : "shadow-glow hover:scale-105 active:scale-95"
      )}
    >
      {loading ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : completed ? (
        <>
          <CheckCircle2 className="h-5 w-5" />
          Estudo Concluído
        </>
      ) : (
        <>
          <Sparkles className="h-5 w-5" />
          Marcar como Concluído
        </>
      )}
    </Button>
  );
}
