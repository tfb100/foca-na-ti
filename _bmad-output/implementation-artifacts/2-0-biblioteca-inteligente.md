# Epic 2: Biblioteca de Resumos Inteligente

Status: planning

## Story

Foco na experiência de descoberta e consumo de conteúdo técnico de alto nível, otimizando a leitura Markdown para dispositivos móveis e desktop.

## User Stories (Included)

- **Story 2.1**: Navegação por Categorias e Listagem de Temas (CONCLUÍDO - Base)
- **Story 2.2**: Visualizador Premium de Conteúdo Markdown (CONCLUÍDO - Base)
- **Story 2.3**: Busca Rápida de Resumos (PENDENTE)
- **Story 2.4**: Navegação Mobile Touch-First (Drawer) (PENDENTE)

## Acceptance Criteria

1. **Given** que estou na biblioteca,
   **When** digito termos na busca,
   **Then** a lista de resumos é filtrada em tempo real com debouncing.

2. **And** se estou no mobile, o menu de categorias é acessível via Drawer/Sheet (gaveta lateral).

3. **And** o visualizador de markdown suporta realce de sintaxe premium e layout responsivo impecável.

## Tasks / Subtasks

- [x] Task 1: Busca em Tempo Real (Story 2.3)
  - [x] 1.1: Criar componente `LibrarySearch` (Client Component) com input persistente.
  - [x] 1.2: Implementar lógica de filtragem via `router.push`.
  - [x] 1.3: Atualizar `getLibraryDataAction` para suportar parâmetro `search`.

- [x] Task 2: Navegação Mobile Drawer (Story 2.4)
  - [x] 2.1: Implementar `MobileLibraryNav` usando o componente `Sheet` do `shadcn/ui`.
  - [x] 2.2: Reutilizar o `LibrarySidebar` dentro do Drawer para consistência.
  - [x] 2.3: Ocultar sidebar estática em telas pequenas e exibir botão "Categorias".

- [x] Task 3: Polimento do Visualizador Markdown (Story 2.2)
  - [x] 3.1: Adicionar "Copiar Código" nos blocos de `pre`.
  - [x] 3.2: Implementar suporte a "Callouts" personalizados (ex: Avisos de Prova).
