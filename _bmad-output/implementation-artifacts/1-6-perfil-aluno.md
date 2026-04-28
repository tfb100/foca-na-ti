# Story 1.6: Perfil do Aluno e Preferências

Status: completed

## Story

As a Concurseiro,
I want visualizar e gerenciar meu perfil,
so that eu possa acompanhar meu progresso e personalizar minha experiência.

## Acceptance Criteria

1. **Given** que estou logado,
   **When** acesso a página `/profile`,
   **Then** vejo minhas informações básicas (Nome, Email, Status de Assinatura). (CONCLUÍDO)

2. **And** posso editar meu nome de exibição e salvar as alterações. (CONCLUÍDO)

3. **And** visualizo estatísticas de estudo (ex: Total de resumos lidos - mockado inicialmente). (CONCLUÍDO)

4. **And** o status de assinatura (Free/Premium) é exibido com badge visual de destaque. (CONCLUÍDO)

## Tasks / Subtasks

- [x] Task 1: Criar Página de Perfil (`src/app/profile/page.tsx`)
  - [x] 1.1: Desenvolver layout com Grid para informações e estatísticas.
  - [x] 1.2: Implementar busca de dados do perfil via Drizzle.

- [x] Task 2: Implementar Edição de Perfil
  - [x] 2.1: Criar formulário em Client Component para editar o nome.
  - [x] 2.2: Criar Server Action `updateProfileAction` em `src/features/auth/actions/update-profile.ts`.

- [x] Task 3: Dashboard de Progresso (Estatísticas)
  - [x] 3.1: Criar cards de estatísticas (Resumos Lidos, Temas Favoritos).
  - [x] 3.2: Implementar lógica de busca dessas contagens (queries Drizzle).

- [x] Task 4: UI Refinement
  - [x] 4.1: Adicionar badges Premium e feedback visual de status.
  - [x] 4.2: Integrar troca de tema se aplicável. (Integrado no header)
