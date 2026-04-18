# Story 1.2: Cadastro de Conta com Email e Senha

Status: completed

## Story

As a Futuro Concurseiro,
I want criar uma conta usando meu e-mail,
so that eu possa salvar meu progresso de estudo e acessar materiais exclusivos.

## Acceptance Criteria

1. **Given** que estou na página de registro (`/sign-up`),
   **When** preencho um e-mail válido e uma senha forte (mínimo 6 caracteres) e clico em "Criar Conta",
   **Then** o sistema utiliza o Supabase Auth para registrar o usuário.

2. **And** se o e-mail já estiver cadastrado, o sistema exibe uma mensagem de erro amigável sem expor dados sensíveis.

3. **And** após o sucesso, o sistema envia um e-mail de confirmação (configuração padrão do Supabase) e exibe uma mensagem instruindo o usuário a verificar sua caixa de entrada.

4. **And** um registro correspondente na tabela `profiles` é criado automaticamente via Trigger no banco de dados para armazenar metadados do usuário.

## Tasks / Subtasks

- [x] Task 1: Preparar o Banco de Dados (Auth Trigger) (AC: 4)
  - [x] 1.1: Criar migration no Drizzle para a função SQL `handle_new_user` que insere no `profiles`.
  - [x] 1.2: Criar migration para o trigger `on_auth_user_created` na tabela `auth.users`.
  - [x] 1.3: Executar `npm run db:generate` (Migration 0001 criada).

- [x] Task 2: Implementar Componentes de UI de Cadastro (AC: 1)
  - [x] 2.1: Criar componente de formulário `SignUpForm` em `src/features/auth/components/sign-up-form.tsx` usando `shadcn/ui`.
  - [x] 2.2: Adicionar validação de campos com `zod` e `react-hook-form`.
  - [x] 2.3: Implementar estado de carregamento (loading) no botão de submissão.

- [x] Task 3: Criar Server Action de Autenticação (AC: 1, 2)
  - [x] 3.1: Criar `src/features/auth/actions/sign-up.ts`.
  - [x] 3.2: Implementar chamada ao `supabase.auth.signUp` com redirecionamento para página de confirmação.
  - [x] 3.3: Tratar erros comuns do Supabase (e-mail duplicado, senha fraca).

- [x] Task 4: Configurar Rota e Página de Registro (AC: 1, 3)
  - [x] 4.1: Criar a página `src/app/(auth)/sign-up/page.tsx`.
  - [x] 4.2: Criar página de sucesso de e-mail enviado `src/app/(auth)/confirm-email/page.tsx`.
  - [x] 4.3: Garantir integração com o layout "Tech-Dark".

- [x] Task 5: Validar Fluxo Completo (Testes) (AC: 1, 2, 4)
  - [x] 5.1: Criar teste de integração/unidade para a action de sign-up.
  - [x] 5.2: Validar que o build passa sem erros de tipo.

## Dev Notes

### Supabase Auth Trigger (Crucial para AC 4)
Para manter a sincronia entre `auth.users` (Supabase) e nossa tabela `profiles` (Drizzle), usaremos um gatilho direto no Postgres:

```sql
-- Função para criar perfil automaticamente
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (user_id, display_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger disparado após INSERT em auth.users
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

### Validação com Zod
```typescript
const signUpSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  fullName: z.string().min(2, "Nome muito curto"),
});
```

### UI Aesthetics (Tech-Dark)
- Usar gradiente `from-indigo-500 to-cyan-400` no botão principal.
- Card com `bg-slate-900/50 backdrop-blur-md` e borda sutil `border-slate-800`.

## References
- [Source: epics.md#Story 1.2] — Definição da história
- [Source: architecture.md#Auth Patterns] — Padrões de autenticação SSR
- [Source: ux-design-specification.md#Forms] — Estilo visual de interfaces de input
