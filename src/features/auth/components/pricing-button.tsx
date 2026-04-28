"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { upgradeToPremiumAction } from "@/features/auth/actions/upgrade-premium";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export function PricingButton({ 
  plan, 
  variant = "default",
  className
}: { 
  plan: string, 
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive",
  className?: string
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpgrade = async () => {
    setLoading(true);
    
    try {
      const result = await upgradeToPremiumAction();
      
      if (result.success) {
        toast.success(`Parabéns! Você agora é um assinante ${plan}.`, {
          description: "Todo o conteúdo foi desbloqueado."
        });
        router.push("/library");
      } else {
        toast.error("Erro na assinatura", {
          description: result.error
        });
        if (result.error?.includes("logado")) {
          router.push("/sign-in");
        }
      }
    } catch (error) {
      toast.error("Ocorreu um erro inesperado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button 
      onClick={handleUpgrade} 
      disabled={loading}
      variant={variant}
      className={className}
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processando...
        </>
      ) : (
        `Assinar Plano ${plan}`
      )}
    </Button>
  );
}
