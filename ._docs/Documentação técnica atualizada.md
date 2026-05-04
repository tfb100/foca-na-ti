# Documentação Técnica - Resumos de TI

> Plataforma educacional para resumos de tecnologia com gamificação

## Visão Geral do Projeto

Resumos de TI é uma aplicação web completa que serve como uma biblioteca de resumos técnicos nas áreas de tecnologia da informação. O sistema permite que estudantes e profissionais acessem conteúdos organizados por categoria, façam quizzes parafixação do conhecimento, acompanhem seu progresso através de um sistema de gamificação, e interactuem com um assistente virtual (Ada).

### Objetivos do Sistema

- Disponibilizar resumos de tópicos de TI (redes, segurança, cloud, etc.)
- Organizar conteúdo por categorias temáticas
- Gamificar a experiência de estudo com XP, níveis e conquistas
- Fornecer quizzes interativos parafixação
- Permitir favoritagem de tópicos
- Assistente virtual para dúvidas

---

## Arquitetura do Sistema

### Stack Tecnológico

| Camada | Tecnologia |
|--------|-------------|
| Frontend | React 19, React Router DOM 7 |
| Estilização | Tailwind CSS 4 |
| Estado/Data | TanStack React Query v5 |
| Backend | Supabase (PostgreSQL + Auth + Storage) |
| Build Tool | Vite 7 |
| Testes | Vitest, Playwright |
| Linting | ESLint 9 |

### Estrutura de Diretórios

```
Site - Resumos de TI/
├── src/
│   ├── components/          # Componentes React
│   │   ├── Gamification/    # Componentes de gamificação
│   │   ├── AdminPage.jsx   # Página administrativa
│   │   ├── Footer.jsx      # Rodapé
│   │   ├── Header.jsx      # Cabeçalho
│   │   ├── Hero.jsx        # Seção hero da home
│   │   ├── HomePage.jsx    # Página principal
│   │   ├── Login.jsx      # Página de login
│   │   ├── MindMapViewer.jsx # Visualizador de mind maps
│   │   ├── PodcastPlayer.jsx # Player de podcasts
│   │   ├── Quiz.jsx       # Sistema de quizzes
│   │   ├── Search.jsx     # Busca de tópicos
│   │   ├── SummaryCard.jsx # Card de resumo
│   │   ├── Toast.jsx      # Notificações toast
│   │   └── TopicPage.jsx  # Página de详细内容 do tópico
│   ├── hooks/              # Custom hooks React
│   │   ├── useFavorites.js # Gerenciamento de favoritos
│   │   ├── useGamification.js # Sistema de gamificação
│   │   └── useTopics.js    # Busca de tópicos (React Query)
│   ├── services/           # Serviços externos
│   │   ├── aiService.js    # Integração com Ada IA
│   │   ├── confettiService.js # Efeitos visuais
│   │   └── ttsService.js   # Text-to-speech
│   ├── context/           # React Contexts
│   │   └── ThemeContext.jsx # Tema claro/escuro
│   ├── supabaseClient.js  # Cliente Supabase
│   ├── App.jsx            # Componente principal
│   ├── main.jsx           # Entry point React
│   └── index.css          # Estilos globais
├── database/              # Scripts SQL do banco
├── public/                # Arquivos estáticos
├── dist/                 # Build de produção
├── tests/                # Testes E2E Playwright
├── package.json
├── vite.config.js
└── tailwind.config.js
```

---

## Banco de Dados (Supabase/PostgreSQL)

### Tabelas Principais

#### `profiles`

Tabela de perfis de usuários vinculada à autenticação do Supabase.

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| `id` | uuid | PK, referência a auth.users |
| `email` | text | Email do usu��rio |
| `full_name` | text | Nome completo |
| `role` | text | Papel (admin/student) |
| `created_at` | timestamptz | Data de criação |
| `updated_at` | timestamptz | Data de atualização |

#### `topics`

Tabela principal de resumos/tópicos.

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| `id` | text | PK, slug único (ex: 'nuvem', 'seguranca') |
| `title` | text | Título do resumo |
| `description` | text | Descrição curta |
| `category` | text | Categoria (Rede, Segurança, Cloud, etc.) |
| `content_html` | text | Conteúdo HTML completo |
| `created_at` | timestamptz | Data de criação |
| `slug` | text | Slug URL amigável |

#### `quiz_questions`

Questões de quiz vinculadas aos tópicos.

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| `id` | bigint | PK auto-gerado |
| `topic_id` | text | FK para topics |
| `question` | text | Texto da pergunta |
| `options` | jsonb | Array de opções ["A", "B", "C", "D"] |
| `correct_index` | integer | Índice da resposta correta (0-based) |
| `difficulty` | text | Dificuldade (Fácil/Médio/Difícil) |
| `created_at` | timestamptz | Data de criação |

#### `videos`

Videos relacionados aos tópicos.

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| `id` | bigint | PK auto-gerado |
| `topic_id` | text | FK para topics |
| `title` | text | Título do vídeo |
| `url` | text | URL do vídeo |
| `duration` | text | Duração |
| `created_at` | timestamptz | Data de criação |

#### `favorites`

Tabela de favoritos dos usuários.

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| `id` | bigint | PK auto-gerado |
| `user_id` | uuid | FK para auth.users |
| `topic_id` | text | FK para topics |
| `created_at` | timestamptz | Data de criação |

### Tabelas de Gamificação

#### `user_stats`

Estatísticas de progresso do usuário.

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| `user_id` | uuid | PK, FK para auth.users |
| `xp` | integer | Pontos de experiência |
| `level` | integer | Nível atual |
| `current_streak` | integer | Dias consecutivos |
| `longest_streak` | integer | Maior sequência |
| `last_activity_date` | date | Última atividade |
| `quizzes_completed` | integer | Quizzes completados |
| `created_at` | timestamptz | Data de criação |

#### `achievements`

Conquistas disponíveis.

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| `id` | text | PK (ex: 'first_quiz') |
| `title` | text | Título |
| `description` | text | Descrição |
| `icon_url` | text | URL do ícone |
| `xp_reward` | integer | XP concedido |
| `condition_type` | text | Tipo de condição |
| `condition_value` | integer | Valor necessário |
| `created_at` | timestamptz | Data de criação |

#### `user_achievements`

Conquistas desbloqueadas pelo usuário.

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| `user_id` | uuid | PK parcial, FK |
| `achievement_id` | text | PK parcial, FK |
| `unlocked_at` | timestamptz | Data de desbloqueio |

#### `daily_challenges`

Desafios diários.

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| `id` | uuid | PK |
| `date` | date | Data do desafio |
| `description` | text | Descrição |
| `target_type` | text | Tipo de alvo |
| `target_count` | integer | Quantidade necessária |
| `xp_reward` | integer | XP concedido |
| `created_at` | timestamptz | Data de criação |

### Segurança (RLS)

Todas as tabelas possuem Row Level Security (RLS) habilitado:

- **topics, quiz_questions, videos**: Leitura pública
- **profiles, user_stats, user_achievements**: Apenas próprio usuário
- **achievements, daily_challenges**: Leitura pública

---

## Autenticação

O sistema utiliza o **Supabase Auth** para gerenciamento de usuários.

### Fluxo de Autenticação

1. Usuário acessa página `/login`
2. Realiza login/signup com email e senha
3. Sistema cria entrada em `profiles` automaticamente
4. Dado perfil vinculado ao usuário logado

### Papéis (RBAC)

| Papel | Acesso |
|-------|--------|
| `student` | Padrão, acesso a浏览, quizzes, gamificação |
| `admin` | Acesso total, incluindopágina administrativa |

### Proteção de Rotas

```jsx
<ProtectedRoute user={user} userProfile={userProfile} allowedRoles={['admin']}>
  <AdminPage />
</ProtectedRoute>
```

---

## Features Principais

### 1. Navegação de Resumos

- Listagem com paginação infinita (20 itens por página)
- Filtro por categoria
- Busca por texto (title, description, category)
- Cards com preview rápido

### 2. Página de Tópico

- Renderização de conteúdo HTML
- Quiz integrado ao tópico
- Vídeos relacionados
- Favoritação
- Mind map (ReactFlow)
- ELI5 (Explain Like I'm 5) - explicações simplificadas

### 3. Sistema de Quizzes

- Perguntas com 4 opções
- Dificuldade variavel
- Feedback imediato
- tracking de quizzes completados

### 4. Gamificação

- Sistema de XP e níveis
- Sequência diária (streaks)
- Conquistas/desbloqueios
- Desafios diários
- Leaderboard
- Loja virtual (shop)

### 5. Busca

- Busca global na home
- Parâmetros de URL (?search=termo)

### 6. Tema Claro/Escuro

- Toggle no header
- Persistência via localStorage

### 7. Assistente Virtual Ada

- Chatbot integrado
- Respostas baseadas em IA
- Interface de chat na página de tópico

### 8. Podcast Player

- Reprodução de áudios
- Controles de play/pause/progress

---

## Hooks Personalizados

### `useTopics.js`

Gerencia a busca de tópicos com paginação infinita.

```javascript
const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } = useTopics();
```

### `useFavorites.js`

Gerencia favoritos do usuário.

### `useGamification.js`

Gerencia XP, níveis, conquistas e desafio diário.

---

## Principais Componentes

### App.jsx

Componente raiz que configura:

- Router (React Router DOM)
- Theme Provider
- Toast Provider
- Autenticação global
- Rotas

### HomePage.jsx

- Hero section
- Filtro de categorias
- Grid de SummaryCards
- Botão "Carregar Mais"

### TopicPage.jsx

- Título e descrição
- Conteúdo HTML
- Quiz
- Vídeos
- ADA Chat
- Favoritos

### GamificationDashboard.jsx

- Estatísticas do usuário
- Level progress
- Achievements
- Challenges
- Shop

### Login.jsx

- Formulário de login/signup
- Integração Supabase Auth

---

## Scripts de Desenvolvimento

```bash
# Development server
npm run dev

# Build de produção
npm run build

# Linting
npm run lint

# Testes unitários
npm run test

# Preview do build
npm run preview
```

---

## Variáveis de Ambiente

```env
VITE_SUPABASE_URL=https://[project].supabase.co
VITE_SUPABASE_ANON_KEY=[anon-key]
```

---

##部署

### Docker

O projeto inclui Dockerfile para contenedorização:

```bash
docker build -t resumos-ti .
docker run -p 3000:3000 resumos-ti
```

### Nginx

Configuração de produção em `nginx.conf`:

- Proxy reverso para Vite
- Headers de cache
- Compressão gzip

---

## Glossário

| Termo | Definição |
|-------|-----------|
| Topic | Resumo/tutorial de um tópico de TI |
| Category | Categoria do tópico (Rede, Segurança, Cloud, etc.) |
| XP | Pontos de experiência |
| Streak | Dias consecutivos de estudo |
| Achievement | Conquista desbloqueável |
| Challenge | Desafio diário |
| RLS | Row Level Security do PostgreSQL |
| Supabase | Backend as a Service |

---

## Para Novo Desenvolvedor

### Primeiros Passos

1. Clone o repositório
2. Execute `npm install`
3. Configure `.env` com credenciais Supabase
4. Execute `npm run dev`
5. Acesse `http://localhost:5173`

### Estrutura de Arquivos Importantes

- `src/App.jsx` - rotas e providers
- `src/supabaseClient.js` - configuração do Supabase
- `src/hooks/useTopics.js` - busca de dados
- `database/db_schema.sql` - schema do banco

### Onde Adicionar

- **Novo tópico**: Use painel admin ou insira via SQL
- **Nova feature**: Adicione em `src/components`
- **Novo hook**: Adicione em `src/hooks`
- **Novo banco**: Adicione script em `database/`