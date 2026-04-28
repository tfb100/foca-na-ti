"use server";

import { db } from "@/lib/db";
import { categories, summaries } from "@/db/schema";
import { eq, inArray, ilike, or, and } from "drizzle-orm";

export async function getLibraryDataAction(categorySlug?: string, searchQuery?: string) {
  try {
    if (!db) {
      throw new Error("Database not initialized");
    }

    // 1. Buscar todas as categorias para a sidebar
    const allCategories = await db.select().from(categories);

    // 2. Buscar resumos filtrados ou todos
    let summariesQuery = db.select({
      id: summaries.id,
      title: summaries.title,
      slug: summaries.slug,
      shortDescription: summaries.shortDescription,
      isPremium: summaries.isPremium,
      relevanceWeight: summaries.relevanceWeight,
      category: {
        name: categories.name,
        slug: categories.slug
      }
    }).from(summaries)
      .leftJoin(categories, eq(summaries.categoryId, categories.id));

    // 3. Aplicar Filtros (Categoria e Busca)
    const conditions = [];

    if (categorySlug) {
      const targetCategory = allCategories.find(c => c.slug === categorySlug);
      if (targetCategory) {
        const categoryIds = [
          targetCategory.id,
          ...allCategories
            .filter(c => c.parentId === targetCategory.id)
            .map(c => c.id)
        ];
        conditions.push(inArray(summaries.categoryId, categoryIds));
      }
    }

    if (searchQuery) {
      conditions.push(
        or(
          ilike(summaries.title, `%${searchQuery}%`),
          ilike(summaries.shortDescription, `%${searchQuery}%`)
        )
      );
    }

    if (conditions.length > 0) {
      // @ts-ignore
      summariesQuery = summariesQuery.where(conditions.length > 1 ? and(...conditions) : conditions[0]);
    }

    const allSummaries = await summariesQuery;



    return {
      categories: allCategories,
      summaries: allSummaries,
    };
  } catch (error) {
    console.error("Error fetching library data:", error);
    // Mock data fallback para desenvolvimento sem DB local configurado
    return {
      categories: [
        { id: "1", name: "Redes", slug: "redes", icon: "network" },
        { id: "2", name: "Engenharia", slug: "engenharia", icon: "code" }
      ],
      summaries: [
        {
          id: "m1",
          title: "Mock: Redes de Computadores",
          slug: "redes-mock",
          shortDescription: "Este é um dado de exemplo pois o banco não está conectado.",
          isPremium: false,
          relevanceWeight: 90,
          category: { name: "Redes", slug: "redes" }
        }
      ],
      isError: true
    };
  }
}
