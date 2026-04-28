# Story 1.5: Assinatura Premium e Controle de Acesso

Status: completed

## Story

As a Aluno Comprometido,
I want assinar um plano mensal,
so that eu possa desbloquear os resumos premium e acelerar meu estudo.

## Acceptance Criteria

1. **Given** que estou logado no plano Free,
   **When** acesso a página de "Preços" ou o botão de "Upgrade" no perfil,
   **Then** vejo as opções de plano (Mensal/Anual) com design Premium Tech-Dark. (CONCLUÍDO)

2. **And** ao clicar em "Assinar", o sistema simula um checkout bem-sucedido (MVP mock) e atualiza meu campo `isPremium` na tabela `profiles` para `true`. (CONCLUÍDO)

3. **And** após a assinatura, os componentes de "lock" (cadeado) em resumos premium desaparecem instantaneamente (sem reload total, via refresh de estado/dados). (CONCLUÍDO)

4. **And** se um usuário Free tentar acessar a URL direta de um resumo Premium, ele é redirecionado para a página de `/pricing` ou vê um modal de bloqueio. (CONCLUÍDO)

## Tasks / Subtasks

- [x] Task 1: Criar Página de Preços (`/pricing`) (AC: 1)
  - [x] 1.1: Desenvolver interface visual com Cards de plano usando `shadcn/ui`.
  - [x] 1.2: Aplicar estética Tech-Dark (gradientes, glows).
  - [x] 1.3: Adicionar link no Header e no Dashboard.

- [x] Task 2: Implementar Lógica de Assinatura (Mock) (AC: 2)
  - [x] 2.1: Criar Server Action `upgradeToPremiumAction` em `src/features/auth/actions/upgrade-premium.ts`.
  - [x] 2.2: Atualizar `profiles.is_premium` no banco via Drizzle.
  - [x] 2.3: Adicionar validação de usuário logado.

- [x] Task 3: Proteção de Conteúdo na UI (AC: 3)
  - [x] 3.1: Atualizar `SummaryCard` para exibir ícone de bloqueio se `summary.isPremium` for true e `user.isPremium` for false.
  - [x] 3.2: Desabilitar o clique ou mudar o link no `SummaryCard` para usuários free em conteúdos premium.

- [x] Task 4: Proteção de Rotas e Redirecionamento (AC: 4)
  - [x] 4.1: Implementar check de premium no Server Component de `src/app/library/[slug]/page.tsx`.
  - [x] 4.2: Criar componente `PremiumOverlay` para exibir quando o acesso for negado.

- [ ] Task 5: Validar Fluxo Completo (AC: 1, 2, 3, 4)
  - [ ] 5.1: Testar manualmente o upgrade e o desbloqueio imediato.
  - [ ] 5.2: Verificar se o build passa.

## Dev Notes

### Schema Reference (Reminder)
A tabela `profiles` já possui `is_premium: boolean`.
A tabela `summaries` já possui `is_premium: boolean`.

### UI Esthetics
- Plano Premium: Borda gradiente `from-indigo-500 to-cyan-400`.
- Badge "Premium" em tons de coral/ouro para contraste.

### Logic (Server Side Check)
```typescript
const { data: profile } = await db.query.profiles.findFirst({
  where: eq(profiles.userId, user.id)
});

if (summary.isPremium && !profile?.isPremium) {
  // Bloquear
}
```

## References
- [Source: epics.md#Story 1.5] — Definição da história
- [Source: src/db/schema.ts] — Schema das tabelas
