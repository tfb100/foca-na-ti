"use server";

import { db } from "@/lib/db";
import { summaries } from "@/db/schema";
import { eq } from "drizzle-orm";
import { generateText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";

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

    const apiKey = process.env.OPENROUTER_API_KEY;
    
    if (!apiKey) {
      console.error("DEBUG: OPENROUTER_API_KEY está faltando no process.env");
    }

    // Configurar o client customizado do OpenRouter usando a API compatível com OpenAI
    const openrouter = createOpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: apiKey,
      headers: {
        "HTTP-Referer": "http://localhost:3000", // Necessário para rankings no OpenRouter
        "X-Title": "Foca na TI",
      }
    });

    // Filtrar histórico para garantir que não comece com mensagem do assistente (exigência de alguns modelos do OpenRouter)
    const formattedMessages = history.map(m => ({ role: m.role as "user" | "assistant", content: m.content }));
    
    // Se a primeira mensagem for do assistente, removemos ela para evitar o erro 'invalid_prompt'
    while (formattedMessages.length > 0 && formattedMessages[0].role === "assistant") {
      formattedMessages.shift();
    }

    // 2. Chamada ao OpenRouter usando o roteador gratuito automático (escolhe o mais rápido/estável)
    const { text } = await generateText({
      model: openrouter("openrouter/free"),
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
      4. Se a pergunta não tiver nada a ver com TI ou com o resumo, responda gentilmente que seu foco é ajudar na aprovação em concursos de tecnologia.
      5. IMPORTANTE: Suas respostas devem ser SEMPRE em Português do Brasil (PT-BR), independente do idioma em que a pergunta for feita.`,
      messages: [
        ...formattedMessages,
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
  } catch (error: any) {
    console.error("Erro detalhado na Ada AI (OpenRouter):", {
      name: error?.name,
      message: error?.message,
      statusCode: error?.statusCode,
      responseBody: error?.responseBody,
      data: error?.data
    });
    
    return {
      answer: `Desculpe, tive um soluço técnico ao processar sua dúvida.\n\n**Detalhe:** ${error?.message || "Erro desconhecido"}`,
      thoughts: ["Erro na conexão com o provedor de IA via OpenRouter."],
      sources: []
    };
  }

}
