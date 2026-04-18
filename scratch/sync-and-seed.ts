import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "../src/db/schema";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString);
const db = drizzle(client, { schema });

async function main() {
  console.log("🔍 Iniciando sincronização forçada...");

  try {
    // 1. Criar tabelas manualmente se não existirem
    console.log("🔨 Verificando/Criando tabelas...");
    
    await client`
      CREATE TABLE IF NOT EXISTS "categories" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "name" text NOT NULL,
        "slug" text NOT NULL UNIQUE,
        "icon" text
      );
    `;

    await client`
      ALTER TABLE "categories" ADD COLUMN IF NOT EXISTS "icon" text;
    `;

    await client`
      CREATE TABLE IF NOT EXISTS "summaries" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "title" text NOT NULL,
        "slug" text NOT NULL UNIQUE,
        "content" text NOT NULL DEFAULT '',
        "category_id" uuid NOT NULL REFERENCES "categories"("id"),
        "short_description" text,
        "is_premium" boolean DEFAULT false NOT NULL,
        "relevance_weight" integer DEFAULT 1 NOT NULL,
        "created_at" timestamp with time zone DEFAULT now() NOT NULL,
        "updated_at" timestamp with time zone DEFAULT now() NOT NULL
      );
    `;

    await client`
      ALTER TABLE "summaries" ADD COLUMN IF NOT EXISTS "content" text NOT NULL DEFAULT '';
    `;


    console.log("✅ Tabelas prontas.");

    // 2. Limpar dados antigos
    console.log("🧹 Limpando dados para re-seed...");
    await db.delete(schema.summaries);
    await db.delete(schema.categories);

    // 3. Inserir Categorias
    console.log("🌱 Inserindo categorais...");
    const categories = await db.insert(schema.categories).values([
      { name: "Engenharia de Software", slug: "engenharia-de-software", icon: "code" },
      { name: "Redes de Computadores", slug: "redes-de-computadores", icon: "network" },
      { name: "Segurança da Informação", slug: "seguranca-da-informacao", icon: "shield" },
      { name: "Banco de Dados", slug: "banco-de-dados", icon: "database" },
    ]).returning();

    const catMap = Object.fromEntries(categories.map(c => [c.slug, c.id]));

    // 4. Inserir Resumos
    console.log("📚 Inserindo resumos...");
    await db.insert(schema.summaries).values([
      {
        title: "Clean Architecture: O Guia Definitivo",
        slug: "clean-architecture-guia",
        content: "# Clean Architecture\n\nA arquitetura limpa foca na separação de preocupações...\n\n## Camadas\n\n1. Entities\n2. Use Cases\n3. Interface Adapters\n4. Frameworks & Drivers",
        categoryId: catMap["engenharia-de-software"],
        shortDescription: "Aprenda os princípios da arquitetura limpa de Robert C. Martin.",
        isPremium: true,
        relevanceWeight: 85,
      },
      {
        title: "Modelo OSI: As 7 Camadas",
        slug: "modelo-osi-7-camadas",
        content: "# Modelo OSI\n\nO modelo OSI é uma referência para o entendimento de redes...\n\n| Camada | Nome | Função |\n|---|---|---|\n| 7 | Aplicação | Interface com usuário |\n| 1 | Física | Bits e sinais |",
        categoryId: catMap["redes-de-computadores"],
        shortDescription: "Resumo completo das 7 camadas do modelo OSI para concursos.",
        isPremium: false,
        relevanceWeight: 95,
      },
      {
        title: "Gestão de Vulnerabilidades com OWASP",
        slug: "owasp-vulnerabilities",
        content: "# OWASP Top 10\n\nA segurança da informação depende de mitigação constante...\n\n1. Broken Access Control\n2. Cryptographic Failures\n3. Injection",
        categoryId: catMap["seguranca-da-informacao"],
        shortDescription: "Guia essencial sobre as principais vulnerabilidades web.",
        isPremium: true,
        relevanceWeight: 90,
      }
    ]);

    console.log("🚀 Banco de dados sincronizado e populado!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Erro na sincronização:", error);
    process.exit(1);
  }
}

main();
