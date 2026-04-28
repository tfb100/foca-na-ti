import { db } from "../src/lib/db";
import { aiFeedbacks } from "../src/db/schema";

async function check() {
  try {
    const feedbacks = await db.select().from(aiFeedbacks).limit(1);
    console.log("A tabela ai_feedbacks existe! Número de registros:", feedbacks.length);
  } catch (error) {
    console.error("Erro ao acessar ai_feedbacks:", error);
  }
}

check();
