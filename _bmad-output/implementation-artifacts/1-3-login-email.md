# Story 1.3: Login com E-mail e Senha

Status: completed

## Story

As a Usuário Cadastrado,
I want entrar na minha conta usando meu e-mail e senha,
so that eu possa acessar meu dashboard pessoal e retomar meus estudos.

## Acceptance Criteria

1. **Given** que estou na página de login (`/sign-in`),
   **When** insiro credenciais válidas e clico em "Entrar",
   **Then** o sistema autentica meu usuário via Supabase Auth e me redireciona para a página inicial (`/`).

2. **And** se as credenciais forem inválidas, o sistema exibe a mensagem "E-mail ou senha incorretos".

3. **And** se minha conta ainda não foi confirmada por e-mail, o sistema exibe um aviso informando que a confirmação é necessária.

## Tasks / Subtasks

- [x] Task 1: Implementar UI da Página de Login (AC: 1)
  - [x] 1.1: Criar componente `SignInForm` em `src/features/auth/components/sign-in-form.tsx`.
  - [x] 1.2: Utilizar `shadcn/ui` (Card, Input, Button).
  - [x] 1.3: Adicionar link para a página de `/sign-up`.

- [x] Task 2: Criar Server Action de Login (AC: 1, 2, 3)
  - [x] 2.1: Criar `src/features/auth/actions/sign-in.ts`.
  - [x] 2.2: Implementar chamada ao `supabase.auth.signInWithPassword`.
  - [x] 2.3: Configurar redirecionamento automático após sucesso.
  - [x] 2.4: Tratar mensagens de erro específicas.

- [x] Task 3: Configurar Rota de Login (AC: 1)
  - [x] 3.1: Criar a página `src/app/(auth)/sign-in/page.tsx`.
  - [x] 3.2: Implementar verificação de usuário logado no servidor.

- [x] Task 4: Validar Implementação (AC: 1, 2)
  - [x] 4.1: Criar teste de unidade para a action de login.
  - [x] 4.2: Validar o build final.

## Dev Notes

### Redirecionamento de Usuário Logado
No `src/app/(auth)/sign-in/page.tsx`, podemos adicionar uma verificação rápida no lado do servidor para evitar que usuários já autenticados vejam a tela de login:

```typescript
const supabase = await createClient();
const { data: { user } } = await supabase.auth.getUser();
if (user) redirect("/");
```

### Mensagens de Erro Supabase
- `Invalid login credentials`: Mapear para "E-mail ou senha incorretos".
- `Email not confirmed`: Mapear para "Por favor, confirme seu e-mail antes de entrar".

## References
- [Source: epics.md#Story 1.3] — Definição da história
- [Source: 1-2-cadastro-conta.md] — Referência visual e de componentes
