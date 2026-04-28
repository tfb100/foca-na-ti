import Link from "next/link";
import { BackgroundVisuals } from "@/components/ui/background-visuals";
import { TypingText } from "@/components/ui/typing-text";
import { TiltCard } from "@/components/ui/tilt-card";
import { 
  ShieldCheck, 
  Terminal,
  Database, 
  GraduationCap, 
  Trophy, 
  Layers,
  ArrowRight
} from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <BackgroundVisuals />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-8 animate-pulse-slow">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary">Plataforma Especialista</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1] text-foreground">
            <TypingText text="Seu QG definitivo para " />
            <TypingText 
              text="aprovação em concursos de TI" 
              className="text-primary" 
              delay={1.6} 
            />
          </h1>
          
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg mb-12 leading-relaxed">
            Abandone os materiais genéricos. Acesse o acervo técnico mais completo do Brasil, 
            desenhado para quem mira o topo das carreiras de TI.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
            <Link 
              href="/sign-up" 
              className="group flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-bold text-lg shadow-glow hover:px-10 transition-all"
            >
              Quero ser aprovado
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <div className="flex items-center -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-muted backdrop-blur-sm" />
              ))}
              <div className="pl-6 text-sm text-muted-foreground">
                <span className="text-foreground font-bold">+1.2k</span> alunos estudando hoje
              </div>
            </div>
          </div>

          {/* Stats Bento Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { label: "Lições Técnicas", value: "+500", icon: Layers },
              { label: "Questões Comentadas", value: "+2k", icon: Trophy },
              { label: "Disciplinas", value: "15", icon: Database },
              { label: "Taxa de Aprovação", value: "85%", icon: GraduationCap },
            ].map((stat, idx) => (
              <div key={idx} className="p-6 rounded-2xl border border-border bg-muted/20 backdrop-blur-sm">
                <stat.icon className="w-5 h-5 text-primary mb-3 mx-auto" />
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-6 bg-background/80">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Por que o Foca na TI?</h2>
            <p className="text-muted-foreground">O material que você não encontra em cursinhos convencionais.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <TiltCard className="border-ti-orange/30">
              <Terminal className="w-10 h-10 text-ti-orange mb-6" />
              <h3 className="text-xl font-bold mb-3">Conteúdo High-Level</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Resumos focados em Arquitetura, DevOps, Desenvolvimento e Segurança. 
                Sem rodeios, direto ao que cai na prova.
              </p>
            </TiltCard>
            
            <TiltCard className="border-ti-crimson/30">
              <Database className="w-10 h-10 text-ti-crimson mb-6" />
              <h3 className="text-xl font-bold mb-3">Banco de Questões</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Filtros inteligentes e comentários técnicos aprofundados para você 
                não apenas decorar, mas entender a lógica da banca.
              </p>
            </TiltCard>
            
            <TiltCard className="border-ti-red/30">
              <Layers className="w-10 h-10 text-ti-red mb-6" />
              <h3 className="text-xl font-bold mb-3">Flashcards & Resumos</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Metodologia de repetição espaçada e resumos visuais para fixar 
                conceitos complexos em tempo recorde.
              </p>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <footer className="py-20 px-6 border-t border-border bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Pronto para subir de nível?</h2>
          <p className="text-muted-foreground mb-10">
            Junte-se à elite dos concurseiros de TI e acelere sua nomeação.
          </p>
          <Link 
            href="/sign-up" 
            className="inline-flex items-center gap-2 px-10 py-5 bg-primary text-primary-foreground rounded-full font-bold text-xl shadow-glow hover:scale-105 transition-all"
          >
            Começar Grátis
            <ArrowRight className="w-6 h-6" />
          </Link>
          <div className="mt-16 pt-8 border-t border-border text-sm text-muted-foreground">
            © 2026 Foca na TI. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
