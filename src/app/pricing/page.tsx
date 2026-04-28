import { Check, Terminal, Zap, Crown } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BackgroundVisuals } from "@/components/ui/background-visuals";
import { PricingButton } from "@/features/auth/components/pricing-button";

export default function PricingPage() {
  return (
    <div className="relative min-h-screen pt-24 pb-12 px-6">
      <BackgroundVisuals />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 mb-4">
            <Zap className="w-3 h-3 text-primary" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-black text-primary">Acesso Premium</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">Escolha seu plano de <span className="text-glow text-primary">guerra</span></h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Libere todo o potencial da Ada AI e acesse o acervo completo de resumos técnicos.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Plano Mensal */}
          <Card className="bg-card/30 backdrop-blur-md border-border relative overflow-hidden group hover:border-primary/50 transition-all duration-500">
            <CardHeader className="p-8">
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <Terminal className="w-5 h-5 text-muted-foreground" />
                Mensal
              </CardTitle>
              <CardDescription>Ideal para revisões rápidas e sprints de estudo.</CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-0 space-y-6">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black">R$ 49</span>
                <span className="text-muted-foreground font-medium">/mês</span>
              </div>
              
              <ul className="space-y-4">
                {[
                  "Acesso a todos os resumos",
                  "Ada AI ilimitada",
                  "Chat contextual (RAG)",
                  "Heatmaps de tendências",
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-zinc-300">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="p-8 pt-0">
              <PricingButton 
                plan="Mensal" 
                variant="outline" 
                className="w-full h-12 font-bold text-base bg-white/5" 
              />
            </CardFooter>
          </Card>

          {/* Plano Anual */}
          <Card className="bg-card/40 backdrop-blur-xl border-primary/50 relative overflow-hidden group shadow-glow-sm transition-all duration-500 scale-105 border-2">
            <div className="absolute top-0 right-0 p-4">
              <Badge className="bg-primary text-primary-foreground font-black tracking-tighter uppercase text-[10px]">Melhor Valor</Badge>
            </div>
            
            <CardHeader className="p-8">
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <Crown className="w-5 h-5 text-primary" />
                Anual
              </CardTitle>
              <CardDescription>Para concursistas de elite focado na nomeação.</CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-0 space-y-6">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black">R$ 399</span>
                <span className="text-muted-foreground font-medium">/ano</span>
                <Badge variant="outline" className="text-emerald-500 border-emerald-500/30 text-[9px]">ECONOMIZE 32%</Badge>
              </div>
              
              <ul className="space-y-4">
                {[
                  "Tudo do plano Mensal",
                  "Flashcards SRS automáticos",
                  "Roadmaps sugeridos pela Ada",
                  "Suporte prioritário",
                  "Acesso antecipado a novos temas",
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-zinc-100">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="p-8 pt-0">
              <PricingButton 
                plan="Anual" 
                className="w-full h-12 font-black text-lg shadow-glow" 
              />
            </CardFooter>
          </Card>
        </div>

        <p className="text-center mt-12 text-sm text-muted-foreground">
          Pagamento seguro via Stripe/Pagar.me. Cancele a qualquer momento.
        </p>
      </div>
    </div>
  );
}
