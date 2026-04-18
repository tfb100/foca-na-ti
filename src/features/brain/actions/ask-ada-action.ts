"use server";

import { db } from "@/lib/db";
import { summaries } from "@/db/schema";
import { eq } from "drizzle-orm";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface BrainResponse {
  answer: string;
  thoughts: string[];
  sources: { title: string; url: string }[];
}

export async function askAdaAction(
  userMessage: string, 
  summaryId?: string,
  history: ChatMessage[] = []
): Promise<BrainResponse> {
  try {
    let context = "";
    let summaryTitle = "Contexto Geral";

    // 1. Recuperar contexto do resumo se fornecido
    if (summaryId && db) {
      const summaryData = await db
        .select()
        .from(summaries)
        .where(eq(summaries.id, summaryId))
        .limit(1);

      if (summaryData.length > 0) {
        context = summaryData[0].content;
        summaryTitle = summaryData[0].title;
      }
    }

    // 2. Chamada ao Gemini
    const { text } = await generateText({
      model: google("gemini-1.5-flash"),
      system: `Você é a ADA, uma mentora de IA especializada em concursos de TI. 
      Seu tom é profissional, encorajador e focado em eficiência.
      
      CONTEXTO ATUAL: Estamos lendo o resumo "${summaryTitle}".
      CONTEÚDO DO RESUMO: 
      ---
      ${context}
      ---
      
      INSTRUÇÕES:
      1. Use o conteúdo do resumo para responder, mas pode expandir com seu conhecimento base se necessário.
      2. Seja concisa. Alunos de concurso valorizam tempo.
      3. Use markdown para formatar a resposta (negrito, listas, etc).
      4. Se a pergunta não tiver nada a ver com TI ou com o resumo, responda gentilmente que seu foco é ajudar na aprovação em concursos de tecnologia.`,
      messages: [
        ...history.map(m => ({ role: m.role as "user" | "assistant", content: m.content })),
        { role: "user", content: userMessage }
      ],
    });

    // 3. Simulação de Pensamentos Analíticos (Baseado no fluxo real)
    const thoughts = [
      `Buscando referências em "${summaryTitle}"`,
      "Cruzando dados com padrões de bancas examinadoras (FGV, CESPE, FCC)",
      "Sintetizando explicação pedagógica para a dúvida do aluno"
    ];

    return {
      answer: text,
      thoughts,
      sources: summaryId ? [{ title: summaryTitle, url: `/library/${summaryId}` }] : []
    };
  } catch (error) {
    const errorDetail = error instanceof Error ? error.message : "Erro desconhecido";
    console.error("Erro na Ada AI (Gemini):", error);
    return {
      answer: `Desculpe, tive um soluço técnico ao acessar meu cérebro Gemini.\n\n**Detalhe:** ${errorDetail}`,
      thoughts: ["Erro na conexão com a API do Google."],
      sources: []
    };
  }

}
