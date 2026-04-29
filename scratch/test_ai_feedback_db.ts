import { db } from "../src/lib/db";
import { aiFeedbacks, profiles, summaries } from "../src/db/schema";
import { desc } from "drizzle-orm";

async function runTest() {
  try {
    console.log("Iniciando teste de integridade da tabela ai_feedbacks...");

    // 1. Pegar um profileId válido para o teste
    const profileList = await db.select().from(profiles).limit(1);
    if (profileList.length === 0) {
      console.log("Nenhum perfil encontrado no banco para testar.");
      return;
    }
    const testProfile = profileList[0];
    console.log("Perfil de teste selecionado:", testProfile.id);

    // 2. Tentar inserir um feedback
    const mockPrompt = "Qual a diferença entre RTO e RPO?";
    const mockResponse = "RTO é tempo de recuperação, RPO é ponto de recuperação dos dados.";

    console.log("Inserindo feedback simulado (LIKE)...");
    const inserted = await db.insert(aiFeedbacks).values({
      profileId: testProfile.id,
      userPrompt: mockPrompt,
      adaResponse: mockResponse,
      feedbackType: "like"
    }).returning();

    console.log("Inserção bem-sucedida!", inserted[0]);

    // 3. Consultar o banco para listar os últimos feedbacks
    console.log("\nBuscando últimos feedbacks no banco...");
    const latestFeedbacks = await db.select().from(aiFeedbacks).orderBy(desc(aiFeedbacks.createdAt)).limit(3);
    
    console.log(`Encontrados ${latestFeedbacks.length} feedbacks:`);
    latestFeedbacks.forEach((fb, index) => {
      console.log(`${index + 1}. [${fb.feedbackType.toUpperCase()}] Prompt: "${fb.userPrompt.substring(0, 30)}..." | Data: ${fb.createdAt}`);
    });

    console.log("\nTeste de integridade finalizado com SUCESSO!");
  } catch (error) {
    console.error("ERRO no teste de integridade:", error);
  }
}

runTest();
