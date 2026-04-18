---
stepsCompleted: [1]
inputDocuments:
  - 'prd.md'
  - 'architecture.md'
  - 'ux-design-specification.md'
workflowType: 'epics-and-stories'
project_name: 'Foca na TI - Concursos'
user_name: 'Thiago'
status: 'Completed'
last_updated: '2026-04-18'
---

# Epics and User Stories: Foca na TI - Concursos

This document translates product requirements and architectural decisions into actionable development units.

## 1. Extracted Requirements

### Functional Requirements (FR)
- **FR1**: Usuário pode criar uma conta e realizar login de forma segura.
- **FR2**: Usuário pode assinar planos de acesso recorrente (mensal/anual).
- **FR3**: O Sistema deve bloquear acesso a conteúdos premium para usuários não-assinantes.
- **FR4**: O Usuário pode gerenciar seu perfil e preferências de estudo.
- **FR5**: O Usuário pode visualizar uma lista categorizada de resumos de TI.
- **FR6**: O Usuário pode ler conteúdos em formato Markdown otimizado para mobile.
- **FR7**: O Usuário pode marcar resumos como "Lidos" ou "Para Revisar".
- **FR8**: O Sistema deve salvar o progresso de leitura do usuário automaticamente.
- **FR9**: O Usuário pode pesquisar resumos por palavras-chave ou categorias.
- **FR10**: O Usuário pode abrir um chat com a Ada AI a partir de qualquer resumo.
- **FR11**: A Ada AI deve responder dúvidas utilizando o conteúdo do resumo aberto como contexto principal (RAG).
- **FR12**: O Usuário pode solicitar que a Ada explique um conceito difícil "como se eu tivesse 5 anos" (ELI5).
- **FR13**: O Usuário pode avaliar a utilidade das respostas da Ada (Feedback Positivo/Negativo).
- **FR14**: O Usuário pode visualizar quais temas estão "Quentes" (High Trend) com base em editais recentes.
- **FR15**: O Sistema deve exibir um Roadmap sugerido baseado na análise de recorrência de provas.
- **FR16**: O Administrador (Curador) pode inserir e atualizar pesos de recorrência para os temas manualmente (MVP).
- **FR17**: O Administrador pode criar, editar e excluir resumos Markdown via painel interno.
- **FR18**: O Administrador pode visualizar métricas básicas de uso e retenção.
- **FR19**: O Sistema deve permitir a exportação de dados de uso para fins de análise de engajamento.

### Non-Functional Requirements (NFR)
- **NFR1**: Tempo de Resposta inicial < 1.5s em 4G (LCP otimizado).
- **NFR2**: Streaming da Ada AI inicia em < 2s.
- **NFR3**: Conformidade com LGPD e criptografia de dados em repouso/trânsito.
- **NFR4**: Chaves de API gerenciadas via Secrets (Server-side apenas).
- **NFR5**: Suporte a 500 usuários simultâneos via renderização eficiente (SSR/ISR).
- **NFR6**: Conformidade WCAG 2.1 Nível AA (Contraste, Teclado, ARIA).
- **NFR7**: Disponibilidade 99.9% (SLA).

### Technical Requirements (Architecture)
- **Starter Template**: Next.js 15 (App Router) via `with-supabase` example.
- **Database**: Supabase (Postgres + pgvector) com Drizzle ORM para migrations.
- **AI Engine**: Vercel AI SDK para streaming e orquestração de prompts.
- **Project Structure**: Feature-driven architecture (`src/features/`).
- **Naming Patterns**: `snake_case` (DB), `kebab-case` (files), `PascalCase` (components).
- **Deployment**: Dockerized Next.js via Coolify.

### UX Design Requirements (UX-DR)
- **UX-DR1**: Implementar sistema de cores "Tech-Dark Dashboard" (Slate-950 para fundo, Slate-900 para cards).
- **UX-DR2**: Configurar tipografia Inter (UI/Leitura) e JetBrains Mono (Código/Dados).
- **UX-DR3**: Implementar layout Split-View (3 colunas) usando `Resizable Panels` (shadcn/ui).
- **UX-DR4**: Desenvolver `AdaChatPane` com streaming, cursor pulsante e destaque de fontes.
- **UX-DR5**: Desenvolver `SummaryBlock` com "Source Anchors" para highlight sincronizado com a Ada.
- **UX-DR6**: Criar `TrendHeatmap` (SVG) para visualização de recorrência de tópicos.
- **UX-DR7**: Criar `SRSFlashcard` com animações de rotação (Framer Motion).
- **UX-DR8**: Implementar "Progressive Disclosure" em filtros e menus densos.
- **UX-DR9**: Garantir `aria-live` nas respostas da Ada e `skip links` para navegação por teclado.
- **UX-DR10**: Estratégia touch-first com `Sheets` (gavetas) para controles principais no mobile.

## 2. Requirements Coverage Map

### FR Coverage Map
- **FR1**: Epic 1 - Cadastro e Login seguro
- **FR2**: Epic 1 - Sistema de Assinaturas
- **FR3**: Epic 1 - Bloqueio de Conteúdo Premium
- **FR4**: Epic 1 - Perfil do Usuário
- **FR5**: Epic 2 - Lista Categorizada de Resumos
- **FR6**: Epic 2 - Leitura Markdown Mobile-first
- **FR7**: Epic 5 - Marcação de Status (Lido/Revisar)
- **FR8**: Epic 5 - Salvamento de Progresso de Leitura
- **FR9**: Epic 2 - Busca Semântica/Texto
- **FR10**: Epic 3 - Acesso à Ada AI via Resumo
- **FR11**: Epic 3 - Respostas Contextuais (RAG)
- **FR12**: Epic 3 - Modo ELI5 ("5 anos")
- **FR13**: Epic 3 - Feedback de Utilidade da IA
- **FR14**: Epic 4 - Visualização de temas "Quentes" (Heatmap)
- **FR15**: Epic 4 - Roadmap Sugerido
- **FR16**: Epic 6 - Gestão de Pesos de Recorrência (Admin)
- **FR17**: Epic 6 - Gestão de Conteúdo Markdown (Curadoria)
- **FR18**: Epic 6 - Dashboard de Métricas de Uso
- **FR19**: Epic 6 - Exportação de Dados

## 3. Epics and User Stories List

### Epic 1: Fundação do Aluno (Auth & Subscription)
Este épico estabelece a base técnica e de acesso à plataforma, permitindo que o ambiente seja configurado e o usuário se identifique.
**FRs cobertos:** FR1, FR2, FR3, FR4.

#### Story 1.1: Setup Técnico e Scaffolding Inicial [DONE]
As a Desenvolvedor,
I want inicializar o projeto Next.js com o template `with-supabase` e configurar o Drizzle ORM,
So that a implementação siga a arquitetura feature-driven definida.

**Acceptance Criteria:**
- **Given** o repositório em branco.
- **When** executo o comando de inicialização com o template Supabase.
- **Then** a estrutura de pastas `/src/features`, `/src/components` e `/src/lib` é criada.
- **And** a conexão com o banco de dados e as variáveis de ambiente estão validadas.
- **And** [x] Executado testes de validação de infraestrutura.

#### Story 1.2: Cadastro de Conta com Email e Senha [DONE]
As a Futuro Concurseiro,
I want criar uma conta usando meu e-mail,
So that eu possa salvar meu progresso de estudo.

**Acceptance Criteria:**
- **Given** que estou na tela de registro (`/sign-up`).
- **When** preencho e-mail/senha válidos e submeto.
- **Then** o Supabase cria o usuário e envia um e-mail de confirmação.
- **And** sou redirecionado para um dashboard inicial.
- **And** [x] Trigger de criação automática de perfil implementado.

#### Story 1.3: Login Seguro e Proteção de Conteúdo [DONE]
As a Usuário Registrado,
I want fazer login de forma segura,
So that eu possa retomar meus estudos.

**Acceptance Criteria:**
- **Given** que possuo conta ativa.
- **When** insiro credenciais válidas.
- **Then** o Next.js Middleware permite o acesso às rotas `/dashboard/*`.
- **And** se eu tentar acessar sem login, sou redirecionado para `/login`.
- **And** [x] Implementado com Server Actions e guarda de rota SSR.

#### Story 1.4: Login Social com Google [DONE]
As a Usuário com pressa,
I want entrar usando minha conta Google,
So that eu não precise lembrar de mais uma senha.

**Acceptance Criteria:**
- **Given** que estou na tela de login ou registro.
- **When** clico no botão "Entrar com Google".
- **Then** sou redirecionado para o fluxo do Google.
- **And** após autenticado, sou redirecionado de volta para `/`.
- **And** [x] Integrado nos formulários de Sign-In e Sign-Up.

#### Story 1.5: Assinatura Premium e Controle de Acesso
As a Aluno Comprometido,
I want assinar um plano mensal,
So that eu possa desbloquear os resumos premium.

**Acceptance Criteria:**
- **Given** que estou logado no plano Free.
- **When** completo o checkout de assinatura (Stripe/Pagar.me Mockup).
- **Then** minha flag `is_premium` no banco Supabase muda para `true`.
- **And** componentes de "lock" (cadeado) desaparecem dos resumos restritos.

#### Story 1.6: Perfil do Aluno e Preferências
As a Usuário,
I want gerenciar meus dados básicos,
So that eu possa personalizar minha experiência.

**Acceptance Criteria:**
- **Given** que estou autenticado.
- **When** atualizo meu nome e preferências no `/profile`.
- **Then** o Drizzle ORM atualiza a tabela `profiles` com os novos dados.

### Epic 2: Biblioteca de Resumos Inteligente
Foco na experiência de descoberta e consumo de conteúdo técnico de alto nível, otimizando a leitura Markdown para dispositivos móveis e desktop.
**FRs cobertos:** FR5, FR6, FR9.

#### Story 2.1: Navegação por Categorias e Listagem de Temas
As a Aluno,
I want visualizar os resumos organizados por disciplinas,
So that eu possa localizar meu tópico de estudo.

**Acceptance Criteria:**
- **Given** que acesso o dashboard de Resumos.
- **When** seleciono uma categoria na barra lateral.
- **Then** a lista central filtra os temas correspondentes.
- **And** cada card exibe título, dificuldade e status (Lido/Novo).

#### Story 2.2: Visualizador Premium de Conteúdo Markdown
As a Aluno em Estudo,
I want ler o resumo com tipografia impecável e realce de código,
So that minha absorção do conteúdo técnico seja facilitada.

**Acceptance Criteria:**
- **Given** que selecionei um resumo para leitura.
- **When** o conteúdo é renderizado na tela.
- **Then** utiliza tipografia modernista (`Inter`) e paleta "Tech-Dark".
- **And** blocos de código possuem realce de sintaxe funcional.

#### Story 2.3: Busca Rápida de Resumos (Search)
As a Usuário com pressa,
I want pesquisar por palavras-chave,
So that eu encontre o tema específico rapidamente.

**Acceptance Criteria:**
- **Given** que estou na biblioteca de resumos.
- **When** digito termos na barra de busca.
- **Then** a lista é filtrada instantaneamente com os resultados correspondentes.

#### Story 2.4: Navegação Mobile Touch-First (Drawer)
As a Aluno Mobile,
I want acessar o menu lateral através de uma gaveta lateral (sheet),
So that eu tenha o máximo de espaço para leitura no celular.

**Acceptance Criteria:**
- **Given** um dispositivo móvel (viewport < 768px).
- **When** toco no ícone de menu superior.
- **Then** uma lateral deslizante (Sheet) exibe as categorias e navegação.

### Epic 3: Ada AI - Tutoria Contextual
O coração do produto: a integração da IA Ada como uma tutora que entende o contexto do que está sendo lido em tempo real (RAG).
**FRs cobertos:** FR10, FR11, FR12, FR13.

#### Story 3.1: Interface de Estudo Split-View (Resumo + Ada)
As a Aluno,
I want ter o chat da Ada em uma lateral ajustável,
So that eu possa tirar dúvidas sem perder o foco na leitura principal.

**Acceptance Criteria:**
- **Given** que abri um resumo para leitura.
- **When** clico no botão "Perguntar à Ada".
- **Then** um painel lateral ajustável (ResizablePanel) é exibido.
- **And** em dispositivos móveis, o chat abre como uma Sheet tela cheia.

#### Story 3.2: Chat Contextual com RAG (Consciência de Conteúdo)
As a Aluno em dúvida,
I want fazer perguntas sobre o texto e receber respostas baseadas no resumo atual,
So that eu evite dispersão procurando explicações em fontes externas.

**Acceptance Criteria:**
- **Given** que o painel da Ada está aberto.
- **When** envio uma pergunta sobre o conteúdo.
- **Then** o sistema realiza busca semântica (RAG) no contexto do resumo.
- **And** a Ada responde utilizando apenas informações validadas do banco de dados.

#### Story 3.3: Atalho "ELI5" (Explique Simples)
As a Aluno travado em um conceito complexo,
I want um comando rápido para simplificar explicações,
So that eu supere bloqueios de aprendizado acadêmico.

**Acceptance Criteria:**
- **Given** uma explicação técnica no chat ou trecho selecionado.
- **When** aciono o comando "Explicar para uma criança".
- **Then** a Ada gera uma analogia simples e direta para o conceito.

#### Story 3.4: Feedback de Resposta e Fonte de Dados (Source Anchors)
As a Usuário,
I want visualizar as fontes das afirmações da Ada e avaliar as respostas,
So that eu tenha segurança na procedência dos dados informados.

**Acceptance Criteria:**
- **Given** que a Ada enviou uma resposta.
- **When** visualizo a mensagem no chat.
- **Then** o sistema exibe links que apontam para o trecho exato do resumo original.
- **And** ícones de feedback (Like/Dislike) permitem avaliar a precisão.

### Epic 4: Motor de Tendências e Roadmaps
Permite ao usuário estudar de forma estratégica, focando nos temas que mais caem nos concursos através de visualizações de dados caloríficos (Heatmaps).
**FRs cobertos:** FR14, FR15.

#### Story 4.1: Dashboard de Tendências (TrendHeatmap)
As a Estrategista de Estudo,
I want ver um mapa de calor dos temas mais recorrentes nos últimos concursos,
So that eu priorize o que realmente cai na prova.

**Acceptance Criteria:**
- **Given** que acesso o dashboard de Tendências.
- **When** o componente `TrendHeatmap` é carregado.
- **Then** o sistema processa os pesos de recorrência e exibe blocos coloridos por densidade de questões.
- **And** a interface permite interatividade (hover/click) para ver detalhes estatísticos.

#### Story 4.2: Roadmap Sugerido (Proposta da Ada)
As a Aluno Organizado,
I want que a Ada sugira uma trilha lógica de leitura,
So that eu não perca tempo decidindo o que estudar hoje.

**Acceptance Criteria:**
- **Given** que o sistema conhece meu histórico de leitura.
- **When** abro o painel "Sua Trilha Hoje".
- **Then** a Ada recomenda os 3 próximos tópicos baseados no peso de recorrência e complexidade.
- **And** as sugestões são clicáveis para início imediato da leitura.

#### Story 4.3: Perfil de Lacuna (O que eu li vs O que Cai)
As a Usuário analítico,
I want comparar meu progresso com a base de recorrência estatística,
So that eu identifique lacunas no meu plano de estudos.

**Acceptance Criteria:**
- **Given** as estatísticas de leitura do usuário.
- **When** visualizo o relatório de desempenho.
- **Then** um gráfico compara a incidência em provas (pesos) com o status de leitura do aluno.
- **And** temas prioritários não lidos são destacados visualmente.

### Epic 5: Retenção com Flashcards IA (SRS)
Sistema de fixação de longo prazo utilizando repetição espaçada, onde a Ada gera exercícios baseados na leitura do dia.
**FRs cobertos:** FR7, FR8.

#### Story 5.1: Geração Automática de Flashcards (Ada Magic)
As a Aluno focado em Memorização,
I want que a Ada gere flashcards automaticamente após a leitura,
So that eu poupe tempo na criação de material de revisão.

**Acceptance Criteria:**
- **Given** que finalizei um resumo técnico.
- **When** clico no botão "Gerar Revisão".
- **Then** a Ada extrai 5-8 pontos-chave e cria flashcards (Pergunta/Resposta).
- **And** os cards são persistidos na base de dados do usuário.

#### Story 5.2: Interface de Revisão Ativa (Anki-style)
As a Aluno em dia de Revisão,
I want praticar meus flashcards com uma interface fluida e gestos intuitivos,
So that a fixação seja rápida e eficiente.

**Acceptance Criteria:**
- **Given** que selecionei uma sessão de revisão no Dashboard.
- **When** o card é exibido.
- **Then** posso revelar a resposta e classificar meu desempenho (Errei/Bom/Fácil).
- **And** o sistema aplica o algoritmo de repetição espaçada para agendar a próxima visualização.

#### Story 5.3: Dashboard de Retenção e Domínio
As a Usuário motivado,
I want acompanhar meu nível de domínio de cada disciplina,
So that eu saiba quais áreas precisam de mais esforço.

**Acceptance Criteria:**
- **Given** meu histórico de respostas nos flashcards.
- **When** acesso o painel de Desempenho.
- **Then** visualizo barras de progresso que indicam o "Nível de Domínio" por tema.
- **And** recebo alertas sobre temas que estão com a "retirada de memória" baixa.

### Epic 6: Central de Curadoria e Gestão (Admin)
Ferramentas para administração da plataforma, permitindo que curadores de conteúdo mantenham os resumos e estatísticas de recorrência atualizados.
**FRs cobertos:** FR16, FR17, FR18, FR19.

#### Story 6.1: Painel de Edição de Resumos (Curador Workflow)
As a Curador de Conteúdo,
I want criar e editar resumos Markdown via interface web,
So that eu mantenha a base de conhecimento sempre atualizada.

**Acceptance Criteria:**
- **Given** que estou logado com perfil Administrador.
- **When** acesso a área `/admin/contents`.
- **Then** o sistema permite criar um novo resumo, definindo categoria, dificuldade e conteúdo Markdown.
- **And** as alterações ficam disponíveis imediatamente para os usuários Premium.

#### Story 6.2: Calibração de Pesos de Recorrência
As a Curador,
I want definir o peso de importância de cada tema baseado em provas recentes,
So that o Motor de Tendências (Heatmap) dos alunos seja preciso.

**Acceptance Criteria:**
- **Given** a lista de temas no painel administrativo.
- **When** altero o "Peso Estatístico" de uma disciplina ou tema.
- **Then** a alteração é refletida automaticamente em todos os componentes visuais de tendência.

#### Story 6.3: Monitoramento de Uso e Exportação de KPIs
As a Administrador,
I want visualizar métricas de consumo e exportar dados de uso,
So that eu identifique demandas por novos conteúdos e gerencie a base.

**Acceptance Criteria:**
- **Given** o dashboard administrativo.
- **When** visualizo o relatório de "Temas mais lidos".
- **Then** o sistema exibe volumetria de acesso e feedback da Ada para cada tema.
- **And** permite exportar a base de usuários e status de assinatura em formato estruturado.
