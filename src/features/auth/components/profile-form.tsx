"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateProfileAction } from "@/features/auth/actions/update-profile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Save } from "lucide-react";

interface ProfileFormProps {
  profile: {
    displayName: string | null;
  };
}

export function ProfileForm({ profile }: ProfileFormProps) {
  const [displayName, setDisplayName] = useState(profile.displayName || "");
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsPending(true);

    try {
      const result = await updateProfileAction({ displayName });
      
      if (result.success) {
        toast.success("Perfil atualizado com sucesso!");
        router.refresh();
      } else {
        toast.error(result.error || "Erro ao atualizar perfil.");
      }
    } catch (error) {
      toast.error("Algo deu errado.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="displayName" className="text-xs uppercase tracking-widest font-black text-primary/60">
          Nome de Exibição
        </Label>
        <Input
          id="displayName"
          placeholder="Como quer ser chamado?"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="bg-card/30 border-border focus:ring-primary h-12 rounded-xl"
          maxLength={50}
        />
        <p className="text-[10px] text-muted-foreground/40 italic">O nome que aparece nos placares e fóruns.</p>
      </div>

      <Button 
        type="submit" 
        disabled={isPending || displayName === profile.displayName}
        className="w-full md:w-auto min-w-[140px] h-12 rounded-xl font-bold gap-2 transition-all"
      >
        {isPending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Save className="h-4 w-4" />
        )}
        Simular Salvamento
      </Button>
    </form>
  );
}
