stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
inputDocuments:
  - 'prd.md'
  - 'product-brief-foca-na-ti-concursos.md'
  - 'Documentação técnica atualizada.md'
workflowType: 'architecture'
lastStep: 8
status: 'complete'
project_name: 'Foca na TI - Concursos'
user_name: 'Thiago'
date: '2026-04-18'
completedAt: '2026-04-18'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**
Orquestração de um ecossistema de aprendizado EdTech com biblioteca de resumos Markdown, tutor interativo via IA (Ada) e motor de tendências baseado em recorrência de provas. Exige sincronização entre o gestor de conteúdo (Admin) e o consumo final (Mobile-first).

**Non-Functional Requirements:**
- **Performance**: LCP < 1.5s e resposta de IA < 2s.
- **Segurança**: Gestão rigorosa de chaves de IA (Secrets) e conformidade LGPD.
- **Escala**: Suporte a 500 usuários simultâneos com renderização eficiente.

**Scale & Complexity:**
- Primary domain: Web App / PWA Full-stack
- Complexity level: High (AI Orchestration + RAG)
- Estimated architectural components: 4 (Frontend UI, Auth/DB Service, AI Engine service, Markdown Processor)

### Technical Constraints & Dependencies
- Framework: Next.js 15 (App Router mandatory)
- Database: Supabase (Postgres + Vector)
- Infrastructure: Coolify (Docker/VPS)
- Input: Conteúdo puramente Markdown (sem DB legado).

### Cross-Cutting Concerns Identified
- **RBAC**: Gestão de acessos baseada em assinatura.
- **Cache Strategy**: Otimização de resumos estáticos vs. chat dinâmico.
- **RAG Latency**: Estratégia de streaming para a Ada AI.

## Starter Template Evaluation

### Primary Technology Domain
Web Application Full-stack (Next.js + Supabase Architecture)

### Selected Starter: Next.js with-supabase
**Rationale for Selection:**
Fornece uma base de autenticação SSR pré-configurada, essencial para garantir que o conteúdo premium dos resumos seja protegido no servidor (evitando flashes de conteúdo não-autorizado) e facilitando a integração futura com a Ada AI via Server Actions.

**Initialization Command:**
```bash
npx create-next-app@latest ./ --example with-supabase --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

## Core Architectural Decisions

### Data Architecture
- **Vector Database**: **Supabase pgvector (Nativo)**. 
- **Racional**: Permite cruzamento de dados relacionais (usuário, assinatura, roadmap) com dados semânticos (embeddings) em uma única query SQL.
- **Migration & ORM**: **Drizzle ORM**. Fornece Tipagem TypeScript ponta-a-ponta e um sistema de migrations (Drizzle Kit) extremamente rápido e seguro para Next.js.

### AI & Content Orchestration
- **Orchestration**: **Next.js Server Actions / API Routes**.
- **Racional**: Utilização do **Vercel AI SDK** para streaming de respostas. Facilita o consumo de chaves de API via Server-side sem expor ao cliente.
- **Multimodal Strategy**: Implementação de uma arquitetura de **Ingestão Híbrida**.
    - **Original Assets**: Supabase Storage (S3).
    - **Metadata & Fragments**: Tabelas Postgres com identificação de tipo (`content_type: 'markdown' | 'pdf' | 'video'`).
    - **Vector Fragments**: Pedaços (chunks) vetorizados indexados para busca rápida.

### Infrastructure & Deployment
- **Hosting**: VPS próprio gerenciado via **Coolify**.
- **Padrão de Deployment**: Dockerized Next.js, permitindo portabilidade total entre provedores de nuvem.

## Implementation Patterns & Consistency Rules

### Naming Patterns
- **Database (Supabase/Postgres)**: `snake_case` e Plural (ex: `study_summaries`, `knowledge_base`).
- **Files/Folders**: `kebab-case` (ex: `ada-chat-window.tsx`).
- **Code (TS)**: `PascalCase` para componentes/classes, `camelCase` para funções/variáveis.
- **REST/JSON API**: `camelCase` para payloads e respostas de objetos.

### Structure Patterns
- **Organization**: Feature-driven architecture (ex: `src/features/[feature-name]/...`).
- **Shared UI**: `src/components/ui` (para shadcn/ui base).
- **Testing**: Co-localização de arquivos `*.test.ts/tsx`.

### Process Patterns
- **Loading UI**: Priorização de React Suspense + Skeleton Screens.
- **Error Handling**: Padrão funcional para Server Actions `{ data: T | null, error: string | null }`.
- **Global State**: Minimalista, priorizando URL State (nuqs) e Server State (React Query/Next Cache).

## Project Structure & Boundaries

### Complete Project Directory Structure

```text
src/
├── app/                    # Orquestração de rotas (Next.js App Router)
│   ├── (auth)/             # Fluxos de entrada e registro
│   ├── (dashboard)/        # Área do aluno (Mobile-first)
│   │   ├── summaries/      # Biblioteca de Resumos
│   │   ├── ada-chat/       # Tutor IA Interativo
│   │   └── trends/         # Painel de Tendências
│   └── api/                # Webhooks e Ingestão de Dados
├── features/               # Domínios de Negócio (Feature-Driven)
│   ├── ada-ai/             # Lógica RAG, Prompts, Streaming
│   ├── summaries/          # Gestor de Resumos e Assets
│   ├── trends/             # Algoritmos de Recorrência
│   └── auth/               # Integração Supabase Auth
├── components/             # UI Compartilhada (shadcn/ui + shared)
├── db/                     # Camada de Dados (Drizzle Schema + Migrations)
├── lib/                    # SDKs e Configurações (Supabase, AI SDK)
├── hooks/                  # Reutilização de lógica de Client UI
└── types/                  # Definições globais de TypeScript
```

### Architectural Boundaries
- **API Boundary**: Server Actions são o meio primário de comunicação. Rotas `/api` reservadas para webhooks ou integrações externas.
- **Component Boundary**: Lógica de negócio pesada **não** vive em `src/app`. Vive em `src/features`. O diretório `app` apenas orquestra os componentes.
- **Data Boundary**: Acesso direto ao DB apenas via Drizzle no servidor. O cliente comunica via Server Actions tipadas.

### Shared Concerns Mapping
- **Auth System**: `src/features/auth` + `src/middleware.ts`.
- **RAG Engine**: `src/features/ada-ai` interagindo com `pgvector` em `src/db/schema`.
- **Markdown Processing**: `src/features/summaries/lib/markdown.ts`.

## Architecture Validation Results

### Coherence Validation ✅
Todas as escolhas tecnológicas (Next.js 15, Supabase, Drizzle) são compatíveis e representam o estado da arte para 2026. Os padrões de nomenclatura alinham o banco de dados com a lógica de frontend TypeScript de forma fluida.

### Requirements Coverage Validation ✅
- **Funcional**: Ada AI e Resumos Multimodais possuem infraestrutura dedicada em `src/features` e suporte nativo a vetores via Supabase.
- **Não-Funcional**: Performance garantida via SSR/ISR e Latência de IA otimizada via Server Actions e busca semântica em DB local (Postgres).

### Implementation Readiness Validation ✅
**Status: READY FOR IMPLEMENTATION**
A arquitetura está completa, com limites de componentes claros e mapeamento de requisitos direto para pastas do projeto.

### Architecture Completeness Checklist
- [x] Project context thoroughly analyzed
- [x] Scale and complexity assessed
- [x] Technical constraints identified
- [x] Architectural decisions documented with versions
- [x] Implementation patterns established (Naming, Structure, Error Handling)
- [x] Complete directory structure defined
- [x] Requirements to structure mapping complete

### Implementation Handoff Guide
- **Primeiro Passo**: Executar `npx create-next-app@latest ./ --example with-supabase`.
- **Foco Inicial**: Setup do Drizzle ORM sobre o Supabase para refletir o schema da `knowledge_base` e `study_summaries`.
