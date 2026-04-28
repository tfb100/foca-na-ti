import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Target, Award, Clock } from "lucide-react";

export function ProfileStats() {
  const stats = [
    { label: "Resumos Lidos", value: "12", icon: BookOpen, color: "text-primary" },
    { label: "Questões (Soon)", value: "0", icon: Target, color: "text-ti-orange" },
    { label: "Conquistas", value: "3", icon: Award, color: "text-amber-500" },
    { label: "Horas de Foco", value: "4.5h", icon: Clock, color: "text-cyan-400" },
  ];

  return (
    <div className="grid grid-cols-1 gap-4">
      <Card className="border-border bg-card/40 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-black uppercase tracking-widest text-muted-foreground/40">Seu Progresso</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-4 p-4 rounded-xl border border-border bg-background/50 hover:border-primary/30 transition-colors group">
              <div className="p-2 rounded-lg bg-card border border-border group-hover:border-primary/20">
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-muted-foreground/40 tracking-wider font-mono">{stat.label}</p>
                <p className="text-xl font-black text-foreground">{stat.value}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      
      <div className="p-6 rounded-3xl border border-border bg-gradient-to-br from-ti-orange/10 via-transparent to-primary/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5">
            <Award className="h-24 w-24" />
        </div>
        <p className="text-xs font-black uppercase tracking-[0.2em] text-ti-orange mb-2">Próximo Marco</p>
        <h4 className="font-bold text-foreground mb-4">Leia +3 resumos para ganhar a badge: "Iniciado em TI"</h4>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden border border-border">
            <div className="h-full bg-ti-orange w-3/4 rounded-full" />
        </div>
      </div>
    </div>
  );
}
