import { 
  ResizableHandle, 
  ResizablePanel, 
  ResizablePanelGroup 
} from "@/components/ui/resizable";
import { MarkdownReader } from "@/features/library/components/markdown-reader";
import { getSummaryAction } from "@/features/library/actions/get-summary";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft, MessageSquare, Share2, Bookmark } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { profiles, studyLogs } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { AdaChatPane } from "@/features/brain/components/ada-chat-pane";
import { CompleteStudyButton } from "@/features/library/components/complete-study-button";

export const dynamic = "force-dynamic";

export default async function SummaryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getSummaryAction(slug);
  
  if (!data) {
    redirect("/library");
  }

  const { summary, category } = data;

  // 1. Verificar permissão de acesso
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let isUserPremium = false;
  let isCompleted = false;

  if (user && db) {
    const profile = await db.query.profiles.findFirst({
      where: eq(profiles.userId, user.id)
    });
    isUserPremium = profile?.isPremium || false;

    if (profile && db) {
      const studyLog = await db.query.studyLogs.findFirst({
        where: and(
          eq(studyLogs.profileId, profile.id),
          eq(studyLogs.summaryId, summary.id)
        )
      });
      isCompleted = !!studyLog;
    }
  }

  // Se o resumo é premium e o usuário não é, redireciona
  if (summary.isPremium && !isUserPremium) {
    redirect("/pricing");
  }

  return (
    <div className="h-screen flex flex-col bg-background text-foreground overflow-hidden">
      {/* Top Navigation */}
      <header className="h-14 border-b border-border flex items-center px-6 justify-between bg-background shrink-0 z-40">
        <div className="flex items-center gap-4">
          <Link href="/library">
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground/60 hover:text-foreground font-bold">
              <ChevronLeft className="h-4 w-4" />
              Biblioteca
            </Button>
          </Link>
          <div className="h-4 w-[1px] bg-border" />
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/20 text-[9px] font-black uppercase tracking-[0.2em] px-2">
              {category?.name || "Geral"}
            </Badge>
            <h2 className="text-sm font-black tracking-tight text-foreground truncate max-w-[400px]">
              {summary.title}
            </h2>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground/60 hover:text-foreground">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground/60 hover:text-foreground">
            <Bookmark className="h-4 w-4" />
          </Button>
          <Button className="gap-2 bg-primary text-primary-foreground hover:opacity-90 h-9 px-4 font-bold shadow-glow">
            <MessageSquare className="h-4 w-4" />
            Ada AI
          </Button>
        </div>
      </header>


      {/* Área Principal de Conteúdo */}
      <div className="flex-1 min-h-0 relative w-full h-full">
        <ResizablePanelGroup direction="horizontal" className="h-full w-full">
          <ResizablePanel 
            defaultSize={70} 
            minSize={50} 
            className="h-full bg-background"
          >
            <div className="h-full overflow-y-auto relative custom-scrollbar bg-background">
              <div className="max-w-4xl mx-auto py-12 px-6 lg:px-12">
                <MarkdownReader content={summary.content} />
                
                <div className="mt-16 flex justify-center">
                  <CompleteStudyButton 
                    summaryId={summary.id} 
                    isCompleted={isCompleted} 
                  />
                </div>
                
                <footer className="mt-20 pt-8 border-t border-border flex justify-between items-center text-muted-foreground/40 text-[10px] font-bold uppercase tracking-widest">
                  <p>© 2026 Foca na TI</p>
                  <div className="flex gap-4 italic font-normal normal-case tracking-normal">
                    <span>Relevância: {summary.relevanceWeight}%</span>
                  </div>
                </footer>
              </div>
            </div>
          </ResizablePanel>
          
          <ResizableHandle withHandle className="bg-border hover:bg-primary/30 transition-colors w-[1px]" />
          
          <ResizablePanel 
            defaultSize={30} 
            minSize={25} 
            className="h-full border-l border-border"
          >
            <AdaChatPane summaryId={summary.id} title={summary.title} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

    </div>

  );
}
