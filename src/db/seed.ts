import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });


const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString);
const db = drizzle(client, { schema });

async function main() {
  const maskedUrl = connectionString.replace(/:([^@]+)@/, ":****@");
  console.log(`🌱 Seeding database using: ${maskedUrl}`);

  try {
    // 1. Limpar tabelas existentes (ordem importa devido a FKs)
    console.log("🧹 Clearing old data...");
    await db.delete(schema.summaries);
    await db.delete(schema.categories);
  } catch (err) {
    console.error("❌ Error during cleanup:", err);
    throw err;
  }


  // 2. Criar Categorias Principais
  const parents = await db.insert(schema.categories).values([
    { name: "Engenharia de Software", slug: "engenharia-de-software", icon: "code" },
    { name: "Redes de Computadores", slug: "redes-de-computadores", icon: "network" },
    { name: "Segurança da Informação", slug: "seguranca-da-informacao", icon: "shield" },
    { name: "Banco de Dados", slug: "banco-de-dados", icon: "database" },
  ]).returning();

  const engSoftParent = parents.find(p => p.slug === "engenharia-de-software")!;
  const redesParent = parents.find(p => p.slug === "redes-de-computadores")!;

  // 3. Criar Subcategorias
  const subCategories = await db.insert(schema.categories).values([
    { name: "Arquitetura", slug: "arquitetura", icon: "cpu", parentId: engSoftParent.id },
    { name: "Metodologias Ágeis", slug: "metodologias-ageis", icon: "globe", parentId: engSoftParent.id },
    { name: "Protocolos", slug: "protocolos", icon: "globe", parentId: redesParent.id },
    { name: "Infraestrutura", slug: "infraestrutura", icon: "network", parentId: redesParent.id },
  ]).returning();

  const categories = [...parents, ...subCategories];

  const engSoft = categories.find((c) => c.slug === "engenharia-de-software")!;
  const redes = categories.find((c) => c.slug === "redes-de-computadores")!;
  const seguranca = categories.find((c) => c.slug === "seguranca-da-informacao")!;
  const bd = categories.find((c) => c.slug === "banco-de-dados")!;
  const arquitetura = categories.find((c) => c.slug === "arquitetura")!;
  const protocolos = categories.find((c) => c.slug === "protocolos")!;


  // 3. Criar Resumos
  await db.insert(schema.summaries).values([
    {
      title: "Clean Architecture: O Guia Definitivo",
      slug: "clean-architecture-guia",
      content: `# Clean Architecture

A arquitetura limpa foca na separação de preocupações...

![Estrutura da Arquitetura Limpa](https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?q=80&w=2070&auto=format&fit=crop)

## Camadas

1. **Entities**: Regras de negócio da empresa.
2. **Use Cases**: Regras de negócio da aplicação.
3. **Interface Adapters**: Gateways, Presenters, Controllers.
4. **Frameworks & Drivers**: DB, UI, Dispositivos.`,
      categoryId: arquitetura.id,
      shortDescription: "Aprenda os princípios da arquitetura limpa de Robert C. Martin.",
      isPremium: true,
      relevanceWeight: 85,
    },
    {
      title: "Kubernetes Avançado: Pods e Services",
      slug: "kubernetes-avancado-pods-services",
      content: `# Kubernetes: O Orquestrador Moderno

O Kubernetes (K8s) é essencial para gerenciar containers em escala.

<iframe src="https://www.youtube.com/embed/PzhfAnN2nSw" title="Kubernetes Tutorial" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

### Componentes Principais
- **Pods**: Menor unidade implantável.
- **Services**: Abstração para expor um grupo de Pods.
- **Ingress**: Gerencia acesso externo aos serviços.`,
      categoryId: arquitetura.id,
      shortDescription: "Domine a orquestração de containers com K8s.",
      isPremium: true,
      relevanceWeight: 90,
    },
    {
      title: "Modelo OSI: As 7 Camadas",
      slug: "modelo-osi-7-camadas",
      content: `# Modelo OSI

O modelo OSI é uma referência para o entendimento de redes...

![Mapa do Modelo OSI](https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2070&auto=format&fit=crop)

| Camada | Nome | Função |
|---|---|---|
| 7 | Aplicação | Interface com usuário |
| 4 | Transporte | Entrega ponto-a-ponto |
| 1 | Física | Bits e sinais |`,
      categoryId: protocolos.id,
      shortDescription: "Resumo completo das 7 camadas do modelo OSI para concursos.",
      isPremium: false,
      relevanceWeight: 95,
    },

    {
      title: "SQL vs NoSQL: Quando usar cada um?",
      slug: "sql-vs-nosql-guia-pratico",
      content: `# Banco de Dados: SQL vs NoSQL

Escolher o banco correto impacta diretamente a escalabilidade.

![Bancos de Dados Modernos](https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=2021&auto=format&fit=crop)

- **SQL**: Estruturado, ACID, RDBMS (Postgres, MySQL).
- **NoSQL**: Flexível, Teorema CAP, Documentos/Chave-Valor (MongoDB, Redis).`,
      categoryId: bd.id,
      shortDescription: "Entenda os trade-offs entre bancos relacionais e não-relacionais.",
      isPremium: false,
      relevanceWeight: 75,
    },
  ]);


  console.log("✅ Database seeded successfully!");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
