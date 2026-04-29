import { db } from "../src/lib/db";
import { sql } from "drizzle-orm";

async function run() {
  try {
    console.log("Aplicando a migração 0004 manualmente...");
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS "ai_feedbacks" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "profile_id" uuid NOT NULL,
        "summary_id" uuid,
        "user_prompt" text NOT NULL,
        "ada_response" text NOT NULL,
        "feedback_type" text NOT NULL,
        "feedback_note" text,
        "created_at" timestamp with time zone DEFAULT now() NOT NULL
      );
    `);
    
    // Tentando adicionar constraints separadamente caso a tabela já estivesse criada
    try {
      await db.execute(sql`ALTER TABLE "ai_feedbacks" ADD CONSTRAINT "ai_feedbacks_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;`);
      await db.execute(sql`ALTER TABLE "ai_feedbacks" ADD CONSTRAINT "ai_feedbacks_summary_id_summaries_id_fk" FOREIGN KEY ("summary_id") REFERENCES "public"."summaries"("id") ON DELETE no action ON UPDATE no action;`);
    } catch(e) {
       console.log("Aviso: Foreign keys já existem ou erro secundário:", e.message);
    }

    console.log("Tabela ai_feedbacks garantida com sucesso!");
  } catch (error) {
    console.error("Erro fatal ao aplicar migração:", error);
  }
}

run();
