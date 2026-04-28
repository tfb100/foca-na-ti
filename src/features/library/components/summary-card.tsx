import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface SummaryCardProps {
  summary: {
    id: string;
    title: string;
    slug: string;
    shortDescription: string | null;
    isPremium: boolean;
    relevanceWeight: number;
    category?: {
      name: string;
    } | null;
  };
  isUserPremium?: boolean;
}

export function SummaryCard({ summary, isUserPremium = false }: SummaryCardProps) {
  const isLocked = summary.isPremium && !isUserPremium;
  const href = isLocked ? "/pricing" : `/library/${summary.slug}`;
  const getRelevanceColor = (weight: number) => {
    if (weight >= 80) return "bg-ti-orange/10 text-ti-orange border-ti-orange/20 shadow-[0_0_15px_-3px_rgba(249,115,22,0.2)]";
    if (weight >= 50) return "bg-ti-red/10 text-ti-red border-ti-red/20";
    return "bg-muted text-muted-foreground/40 border-border";
  };

  return (
    <Link href={href} className={cn("block group", isLocked && "cursor-pointer")}>
      <Card className={cn(
        "h-full border-border bg-card/40 backdrop-blur-md hover:bg-card/60 transition-all duration-300 hover:border-primary/30 relative overflow-hidden group-hover:shadow-glow",
        isLocked && "grayscale-[0.5] opacity-80"
      )}>
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
          <div className="space-y-1">
            {summary.category && (
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary/80">
                {summary.category.name}
              </span>
            )}
            <CardTitle className="text-lg font-bold leading-tight text-foreground group-hover:text-primary transition-colors">
              {summary.title}
            </CardTitle>
          </div>
          <div className="flex gap-2">
            {isLocked && (
              <div className="p-1.5 rounded-full border bg-amber-500 text-black border-amber-600 animate-pulse-slow">
                <Lock className="h-3 w-3 fill-current" />
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-muted-foreground/80 line-clamp-2 text-[13px] mb-4 leading-relaxed">
            {summary.shortDescription || "Explore os conceitos fundamentais deste tópico focado em concursos."}
          </CardDescription>
          
          <div className="flex items-center justify-between mt-auto">
            <Badge variant="outline" className={cn("gap-1 font-mono text-[10px] py-0.5", getRelevanceColor(summary.relevanceWeight))}>
              <Zap className="h-3 w-3 fill-current" />
              {summary.relevanceWeight}% RECORRÊNCIA
            </Badge>
            
            <span className="text-[11px] text-muted-foreground/40 font-bold uppercase tracking-tight group-hover:text-primary transition-colors">
              {isLocked ? "Desbloquear com Premium →" : "Acessar Conteúdo →"}
            </span>
          </div>
        </CardContent>


        {/* Efeito de brilho na base do card */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </Card>
    </Link>
  );
}
