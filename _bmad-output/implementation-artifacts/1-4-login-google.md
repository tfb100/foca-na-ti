# Story 1.4: Login Social com Google

Status: completed

## Story

As a Usuário com pressa,
I want entrar usando minha conta do Google,
so that eu possa acessar a plataforma rapidamente sem precisar criar e lembrar de uma nova senha.

## Acceptance Criteria

1. **Given** que estou na página de login ou registro,
   **When** clico no botão "Continuar com Google",
   **Then** o sistema me redireciona para o fluxo de autenticação OAuth do Google via Supabase.

2. **And** após a autenticação bem-sucedida, sou redirecionado de volta para a Home (`/`).

3. **And** se for meu primeiro acesso, um registro na tabela `profiles` é criado automaticamente (reutilizando o Trigger da Story 1.2).

4. **And** se ocorrer algum erro no fluxo OAuth, sou redirecionado para `/auth/error` com uma mensagem explicativa.

## Tasks / Subtasks

- [x] Task 1: Criar Action de Login Social (AC: 1, 2)
  - [x] 1.1: Criar `src/features/auth/actions/social-auth.ts`.
  - [x] 1.2: Implementar função `signInWithGoogleAction` usando `supabase.auth.signInWithOAuth`.
  - [x] 1.3: Configurar os parâmetros `redirectTo` corretamente.

- [x] Task 2: Integrar Botão Social na UI (AC: 1)
  - [x] 2.1: Criar componente reutilizável `SocialAuthButtons` em `src/features/auth/components/social-auth-buttons.tsx`.
  - [x] 2.2: Adicionar o botão "Continuar com Google" (estilo shadcn com ícone do Google).
  - [x] 2.3: Inserir o componente nos formulários `SignInForm` e `SignUpForm`.

- [x] Task 3: Configurar Rota de Callback (AC: 2)
  - [x] 3.1: Garantir que a rota `src/app/auth/callback/route.ts` lida com OAuth (Confirmado).
  - [x] 3.2: Garantir que o `exchangeCodeForSession` funcione para fluxos sociais (Confirmado).

- [x] Task 4: Validar Fluxo (AC: 1, 4)
  - [x] 4.1: Validar build e tipos.

## Dev Notes

### Implementação OAuth
```typescript
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'google',
  options: {
    redirectTo: `${origin}/auth/callback`,
  },
});
```

### UI Design (Google Button)
- Usar variante `outline` do Button.
- Adicionar ícone SVG oficial do Google.
- Separador visual ("Ou continue com") entre o forms de e-mail e os botões sociais.

## References
- [Source: epics.md#Story 1.4] — Definição da história
- [Source: 1-2-cadastro-conta.md] — Trigger de Banco de Dados
