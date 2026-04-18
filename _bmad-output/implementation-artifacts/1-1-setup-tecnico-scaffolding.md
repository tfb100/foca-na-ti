# Story 1.1: Setup Técnico e Scaffolding Inicial

Status: completed

## Story

As a Desenvolvedor,
I want inicializar o projeto Next.js com o template `with-supabase` e configurar o Drizzle ORM,
so that a implementação siga a arquitetura feature-driven definida e o ambiente esteja pronto para as próximas stories.

## Acceptance Criteria

1. **Given** o repositório em branco,
   **When** executo o comando de inicialização com o template Supabase,
   **Then** a estrutura de pastas `src/features`, `src/components`, `src/lib`, `src/db`, `src/hooks` e `src/types` está criada conforme a arquitetura feature-driven.

2. **And** a conexão com o banco de dados Supabase está validada via variáveis de ambiente (`.env.local`) e o cliente Drizzle ORM se conecta sem erros.

3. **And** o Tailwind CSS está configurado com a paleta "Tech-Dark" (Slate-950 fundo, Indigo-500 ação primária) e as fontes Inter e JetBrains Mono estão registradas via `next/font`.

4. **And** o shadcn/ui está inicializado com o tema dark/slate e os componentes base estão disponíveis em `src/components/ui/`.

## Tasks / Subtasks

- [x] Task 1: Inicializar projeto Next.js com template with-supabase (AC: 1)
  - [x] 1.1: Executar o comando exato de criação: `npx create-next-app@latest ./ --example with-supabase --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"`
  - [x] 1.2: Verificar que o projeto compila sem erros (`npm run build` passa limpo)
  - [x] 1.3: Confirmar que `src/middleware.ts` existe e contém a lógica de refresh de sessão Supabase

- [x] Task 2: Criar estrutura de pastas feature-driven (AC: 1)
  - [x] 2.1: Criar diretórios de features: `src/features/ada-ai/`, `src/features/summaries/`, `src/features/trends/`, `src/features/auth/`
  - [x] 2.2: Criar diretórios de infraestrutura: `src/db/migrations/`, `src/hooks/`, `src/types/`
  - [x] 2.3: Criar `src/types/index.ts` com tipo placeholder e comentário de propósito do módulo
  - [x] 2.4: Mover `utils/supabase/` do template para `src/lib/supabase/` para alinhar com a arquitetura
  - [x] 2.5: Remover páginas de exemplo do template que não pertencem à arquitetura (ex: `app/notes/` se existir)

- [x] Task 3: Instalar e configurar Drizzle ORM (AC: 2)
  - [x] 3.1: Instalar dependências de produção: `npm install drizzle-orm postgres`
  - [x] 3.2: Instalar dependência de dev: `npm install -D drizzle-kit`
  - [x] 3.3: Criar `drizzle.config.ts` na raiz do projeto (ver template em Dev Notes)
  - [x] 3.4: Criar `src/db/schema.ts` com a tabela `profiles` inicial (ver schema em Dev Notes)
  - [x] 3.5: Criar `src/lib/db.ts` com a instância do cliente Drizzle (ver template em Dev Notes)
  - [x] 3.6: Adicionar scripts ao `package.json`: `"db:generate": "drizzle-kit generate"` e `"db:migrate": "drizzle-kit migrate"`

- [x] Task 4: Configurar e validar variáveis de ambiente (AC: 2)
  - [x] 4.1: Criar `.env.local` com as 3 variáveis obrigatórias: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `DATABASE_URL`
  - [x] 4.2: Criar `.env.example` sem valores (documentação para outros devs)
  - [x] 4.3: Adicionar `.env.local` ao `.gitignore` (o template já faz isso, verificar)
  - [x] 4.4: Executar `npm run db:generate` para validar que o Drizzle conecta e gera a migration inicial sem erro

- [x] Task 5: Configurar design tokens e shadcn/ui (AC: 3, 4)
  - [x] 5.1: Atualizar `tailwind.config.ts` com extensão de cores customizadas do tema Tech-Dark (ver tokens em Dev Notes)
  - [x] 5.2: Configurar fontes `Inter` e `JetBrains_Mono` em `src/app/layout.tsx` via `next/font/google` com variáveis CSS
  - [x] 5.3: Executar `npx shadcn@latest init` com: style=New York, base color=Slate, CSS variables=Yes
  - [x] 5.4: Instalar componentes base necessários para as próximas stories: `npx shadcn@latest add button card sheet tabs scroll-area resizable separator input label`

- [x] Task 6: Criar testes de validação de infraestrutura (AC: 1, 2)
  - [x] 6.1: Criar `src/lib/db.test.ts` que verifica que a instância do Drizzle é criada sem lançar exceção (mock `DATABASE_URL`)
  - [x] 6.2: Criar `src/lib/supabase/client.test.ts` que verifica que `createBrowserClient` inicializa sem erro
  - [x] 6.3: Executar `npm test` e garantir que todos os testes passam sem erros

## Dev Notes

### Visão Geral
Esta story é o alicerce de todo o projeto. Não há feature de usuário final — apenas infraestrutura técnica. Qualquer desvio dos padrões de nomenclatura ou estrutura aqui causará retrabalho em cascata nas 20+ stories seguintes. **Seguir rigorosamente cada decisão arquitetural abaixo.**

---

### Comando de Inicialização Exato
```bash
npx create-next-app@latest ./ --example with-supabase --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```
- `./` inicializa no diretório atual do repositório
- `--example with-supabase` traz Auth SSR pré-configurado com Server Components e middleware de refresh de sessão
- `--src-dir` cria a pasta `src/` obrigatória pela arquitetura
- `--import-alias "@/*"` habilita imports absolutos (`@/features/...`)

**NÃO reinventar** a integração Supabase Auth que o template fornece. Apenas reorganizar os arquivos para o padrão `src/lib/supabase/`.

---

### Estrutura de Pastas Obrigatória
```
src/
├── app/                    # APENAS orquestração de rotas — ZERO lógica de negócio
│   ├── (auth)/             # Grupo de rotas de autenticação (template já cria)
│   ├── (dashboard)/        # Área autenticada — criar vazio para as próximas stories
│   └── api/                # Apenas webhooks externos
├── features/               # TODO o código de domínio vive aqui
│   ├── ada-ai/
│   ├── summaries/
│   ├── trends/
│   └── auth/
├── components/
│   └── ui/                 # shadcn/ui gerado pelo CLI — não modificar diretamente
├── db/
│   ├── schema.ts
│   └── migrations/         # Gerado pelo drizzle-kit
├── lib/
│   ├── db.ts               # Cliente Drizzle (único ponto de acesso ao DB)
│   ├── supabase/           # Clientes Supabase (mover de utils/ do template)
│   └── env.ts              # Validação de variáveis de ambiente
├── hooks/
└── types/
    └── index.ts
```
**REGRA CRÍTICA**: Lógica de negócio NUNCA em `src/app`. O `app` directory apenas importa e compõe features.

---

### Drizzle ORM — drizzle.config.ts
```typescript
// drizzle.config.ts (raiz do projeto)
import type { Config } from 'drizzle-kit';

export default {
  schema: './src/db/schema.ts',
  out: './src/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;
```
**CRÍTICO**: Usar `dialect: 'postgresql'` (não `driver: 'pg'`). A API mudou no Drizzle Kit 0.21+. Versão antiga usa `driver` — nova usa `dialect`.

---

### Drizzle ORM — src/lib/db.ts
```typescript
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '@/db/schema';

const client = postgres(process.env.DATABASE_URL!);
export const db = drizzle(client, { schema });
```
- `DATABASE_URL` é a connection string PostgreSQL do Supabase — **NUNCA** exposta ao cliente
- Importar `schema` permite usar Drizzle relational queries: `db.query.profiles.findMany()`

---

### Schema Inicial — src/db/schema.ts
```typescript
import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';

export const profiles = pgTable('profiles', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().unique(),   // FK lógica para auth.users do Supabase
  displayName: text('display_name'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});
```
**Convenções obrigatórias**: `snake_case` e plural no banco. `camelCase` nos campos do schema Drizzle (Drizzle mapeia automaticamente). Tabelas sempre plurais: `profiles`, não `profile`.

---

### Variáveis de Ambiente Obrigatórias
| Variável | Origem | Uso |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Dashboard → API → Project URL | Client + Server |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Dashboard → API → anon/public key | Client + Server |
| `DATABASE_URL` | Supabase Dashboard → Database → Connection String → **Transaction Pooler** | Apenas Server-side |

**LGPD/Segurança**: `DATABASE_URL` sem prefixo `NEXT_PUBLIC_` — nunca enviada ao browser. Usar Transaction Pooler (porta 6543) para compatibilidade com ambientes serverless/edge.

---

### Design Tokens — tailwind.config.ts
```typescript
// Na seção theme.extend.colors:
'ada-from': '#6366f1',    // Indigo-500 — início do gradiente Ada AI
'ada-to': '#22d3ee',      // Cyan-400 — fim do gradiente Ada AI
'trend-hot': '#10b981',   // Emerald-500 — temas em alta
'trend-warn': '#f59e0b',  // Amber-500 — atenção
'trend-critical': '#f43f5e', // Rose-500 — crítico/erro
```
O shadcn/ui com base Slate já fornece as variáveis CSS `--background` (Slate-950 no dark) e `--primary` (configurável). Usar as variáveis CSS do shadcn como base e adicionar apenas os tokens específicos do domínio acima.

---

### Fontes — src/app/layout.tsx
```typescript
import { Inter, JetBrains_Mono } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});
```
- Inter → UI e conteúdo de leitura
- JetBrains Mono → blocos de código, dados técnicos, referências bibliográficas
- Aplicar no `<html className={`${inter.variable} ${jetbrainsMono.variable} dark`}>`
- O `dark` class no html habilita o dark mode do Tailwind/shadcn

---

### shadcn/ui — Configuração
```bash
npx shadcn@latest init
# Responder:
# Style: New York
# Base color: Slate
# CSS variables: Yes
# Tailwind config: tailwind.config.ts
```
Após init, instalar componentes necessários para as próximas 5 stories:
```bash
npx shadcn@latest add button card sheet tabs scroll-area resizable separator input label avatar badge
```

---

### Migração de utils/ → src/lib/supabase/
O template `with-supabase` gera os clientes em `utils/supabase/`. Mover para `src/lib/supabase/` e atualizar todos os imports. Arquivos afetados:
- `utils/supabase/client.ts` → `src/lib/supabase/client.ts`
- `utils/supabase/server.ts` → `src/lib/supabase/server.ts`
- `utils/supabase/middleware.ts` → `src/lib/supabase/middleware.ts` (se existir)
- Atualizar `src/middleware.ts` para importar de `@/lib/supabase/...`

---

### Error Handling Pattern (Estabelecer desde o início)
Server Actions devem sempre retornar:
```typescript
type ActionResult<T> = { data: T; error: null } | { data: null; error: string };
```
Definir este tipo em `src/types/index.ts` para uso em todas as stories seguintes.

---

### Project Structure Notes
- O template `with-supabase` pode criar `app/notes/` como exemplo — remover completamente
- Verificar se o template cria `components/` na raiz — mover para `src/components/` se necessário
- O `src/app/layout.tsx` gerado pelo template provavelmente tem configuração básica — atualizar com fontes e classe dark

### References
- [Source: architecture.md#Starter Template Evaluation] — comando de inicialização
- [Source: architecture.md#Core Architectural Decisions] — Drizzle ORM + Supabase pgvector
- [Source: architecture.md#Project Structure & Boundaries] — estrutura feature-driven
- [Source: architecture.md#Implementation Patterns & Consistency Rules] — naming conventions
- [Source: ux-design-specification.md#Design System Foundation] — shadcn/ui + New York style
- [Source: ux-design-specification.md#Visual Design Foundation] — paleta Tech-Dark e tipografia

## Dev Agent Record

### Agent Model Used
claude-sonnet-4-6

### Debug Log References

### Completion Notes List

### File List
