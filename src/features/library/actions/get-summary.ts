"use server";

import { db } from "@/lib/db";
import { summaries, categories } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getSummaryAction(slug: string) {
  try {
    if (!db) {
      console.error("DEBUG: Banco de dados não inicializado em getSummaryAction");
      throw new Error("Database not initialized");
    }

    console.log(`DEBUG: Buscando resumo com slug: ${slug}`);

    const results = await db.select()
      .from(summaries)
      .where(eq(summaries.slug, slug));

    if (!results || results.length === 0) {
      console.warn(`DEBUG: Nenhum resumo encontrado para o slug: ${slug}`);
      return null;
    }

    // Se categoria for necessária, fazemos um fetch separado para garantir isolamento
    let category = null;
    if (results[0].categoryId) {
      const catResults = await db.select().from(categories).where(eq(categories.id, results[0].categoryId));
      category = catResults[0] || null;
    }

    console.log(`DEBUG: Resumo real encontrado: ${results[0].title}`);
    return {
      summary: results[0],
      category
    };

  } catch (error) {
    console.error("Error fetching summary:", error);
    
    // Fallback apenas se estivermos em desenvolvimento e o erro for persistente
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
    
    if (process.env.NODE_ENV === "development") {
      return {
        summary: {
          id: "m1",
          title: "Mock: Erro no Banco",
          slug: "error-mock",
          content: `# Erro de Conexão\n\n**Detalhe:** ${errorMessage}\n\nNão foi possível carregar o conteúdo do banco de dados local. Verifique se o Docker está rodando e se a porta 54332 está acessível.`,
          shortDescription: "Mock",
          isPremium: false,
          relevanceWeight: 0,
        },
        category: { name: "Erro", slug: "erro" }
      };
    }

    
    return null;
  }
}

