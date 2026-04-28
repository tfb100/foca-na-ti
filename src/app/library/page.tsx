import { Suspense } from "react";
import { 
  ResizableHandle, 
  ResizablePanel, 
  ResizablePanelGroup 
} from "@/components/ui/resizable";
import { LibrarySidebar } from "@/features/library/components/library-sidebar";
import { SummaryCard } from "@/features/library/components/summary-card";
import { getLibraryDataAction } from "@/features/library/actions/get-library-data";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { profiles } from "@/db/schema";
import { eq } from "drizzle-orm";
import { MobileLibraryNav } from "@/features/library/components/mobile-library-nav";

import { LibrarySearch } from "@/features/library/components/library-search";

export const dynamic = "force-dynamic";

export default async function LibraryPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ category?: string; q?: string }> 
}) {
  const { category, q } = await searchParams;
  const { categories, summaries } = await getLibraryDataAction(category, q);

  // 1. Verificar status premium do usuário
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  let isUserPremium = false;
  if (user && db) {
    const profile = await db.query.profiles.findFirst({
      where: eq(profiles.userId, user.id)
    });
    isUserPremium = profile?.isPremium || false;
  }

  return (
    <div className="h-screen flex flex-col bg-background text-foreground overflow-hidden">

      {/* Search Header */}
      <header className="h-16 border-b border-border flex items-center px-8 justify-between bg-background shrink-0 z-30">
        <div className="flex items-center gap-4 flex-1 max-w-xl">
          <MobileLibraryNav categories={categories} activeSlug={category} />
          <Suspense fallback={<div className="h-11 w-full bg-card/30 animate-pulse rounded-xl" />}>
            <LibrarySearch />
          </Suspense>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
            {summaries.length} TEMAS ENCONTRADOS
          </span>
        </div>
      </header>

      {/* Área Principal com Sidebar Estática para evitar colapso */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar com largura garantida */}
        <aside className="w-[280px] shrink-0 border-r border-border bg-background hidden md:block overflow-y-auto custom-scrollbar">
          <LibrarySidebar categories={categories} activeSlug={category} />
        </aside>

        {/* Grid de Conteúdo */}
        <main className="flex-1 overflow-y-auto custom-scrollbar bg-background/50 p-8">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="space-y-4">
              <h1 className="text-4xl font-black tracking-tight text-foreground">
                Biblioteca de Resumos
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
                Conteúdo técnico de alto impacto, focado no que as bancas realmente cobram em TI.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 pb-20">
              {summaries.map((summary) => (
                <SummaryCard key={summary.id} summary={summary} isUserPremium={isUserPremium} />
              ))}
            </div>

            {summaries.length === 0 && (
              <div className="text-center py-32 border-2 border-dashed border-border rounded-3xl">
                <p className="text-muted-foreground/40 font-bold text-xl">Nenhum resumo disponível nesta categoria.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>


  );
}
