import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Code2, 
  Network, 
  Shield, 
  Database, 
  Cpu, 
  Globe,
  LayoutGrid
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string | null;
  parentId?: string | null;
}

interface LibrarySidebarProps {
  categories: Category[];
  activeSlug?: string;
}

const iconMap: Record<string, any> = {
  code: Code2,
  network: Network,
  shield: Shield,
  database: Database,
  cpu: Cpu,
  globe: Globe,
};

export function LibrarySidebar({ categories, activeSlug }: LibrarySidebarProps) {
  // Separar categorias principais das subcategorias
  const parentCategories = categories.filter(c => !c.parentId);
  
  return (
    <div className="flex h-full flex-col bg-background border-r border-border">
      <div className="p-6">
        <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">
          Explorar Conteúdo
        </h2>
      </div>

      <ScrollArea className="flex-1 px-3">
        <div className="space-y-1 py-2">
          <Link href="/library">
            <Button
              variant={!activeSlug ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start gap-3 h-10 px-4",
                !activeSlug ? "bg-primary/20 text-primary hover:bg-primary/30 font-bold" : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <LayoutGrid className="h-4 w-4" />
              Todos os Temas
            </Button>
          </Link>
          
          <div className="mt-6 px-3 py-2">
            <h3 className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-[0.2em]">
              Disciplinas
            </h3>
          </div>

          <div className="space-y-4">
            {parentCategories.map((parent) => {
              const ParentIcon = iconMap[parent.icon || "code"] || Code2;
              const isParentActive = activeSlug === parent.slug;
              const children = categories.filter(c => c.parentId === parent.id);

              return (
                <div key={parent.id} className="space-y-1">
                  <Link href={`/library?category=${parent.slug}`}>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start gap-3 transition-all h-10 px-4",
                        isParentActive 
                          ? "bg-primary/10 text-primary hover:bg-primary/20 font-bold border border-primary/20" 
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      )}
                    >
                      <ParentIcon className={cn("h-4 w-4", isParentActive ? "text-primary" : "text-muted-foreground/40")} />
                      {parent.name}
                    </Button>
                  </Link>

                  {/* Subcategorias */}
                  {children.length > 0 && (
                    <div className="ml-4 pl-3 border-l border-border space-y-1 pt-1">
                      {children.map((child) => {
                        const isChildActive = activeSlug === child.slug;
                        return (
                          <Link key={child.id} href={`/library?category=${child.slug}`}>
                            <Button
                              variant="ghost"
                              className={cn(
                                "w-full justify-start gap-2 h-8 px-3 text-[13px] transition-colors",
                                isChildActive 
                                  ? "text-primary font-bold bg-primary/5" 
                                  : "text-muted-foreground/60 hover:text-foreground hover:bg-muted"
                              )}
                            >
                              <div className={cn("w-1 h-1 rounded-full", isChildActive ? "bg-primary shadow-[0_0_8px_rgba(var(--primary),0.5)]" : "bg-foreground/10")} />
                              {child.name}
                            </Button>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

