# 📋 Andamento do Projeto: Foca na TI - Concursos

> **Última Atualização:** 28/04/2026
> **Status Geral:** ~60% Concluído (MVP: ~95%)

---

## 📊 Dashboard de Progresso

| Épico | Funcionalidade | Status | Progresso |
| :--- | :--- | :--- | :--- |
| **1. Fundação** | Auth, Perfis, Login Social e Assinaturas | ✅ Concluído | 100% |
| **2. Biblioteca** | Navegação, Busca, Visualizador e Mobile | ✅ Concluído | 100% |
| **3. Ada AI** | Chat Contextual (RAG), Split-view e ELI5 | 🔄 Polimento | 90% |
| **4. Tendências** | Heatmaps de provas e Roadmaps Sugeridos | ❌ Pendente | 0% |
| **5. Retenção** | XP, Ofensivas (Done) / Flashcards SRS (Pending) | 🔄 Em curso | 40% |
| **6. Admin** | Painel de Curadoria e Gestão de Pesos | ❌ Pendente | 0% |

---

## ✅ Funcionalidades Entregues

### Fundação e Acesso
- [x] **Auth Completo:** Cadastro/Login via e-mail e Google (Supabase).
- [x] **Perfis Resilientes:** Sincronização automática entre Auth e DB.
- [x] **Gestão Premium:** Lógica de bloqueio de conteúdo e remoção de cadeados para assinantes.

### Biblioteca de Resumos
- [x] **Navegação Inteligente:** Filtros por categoria e busca instantânea.
- [x] **Visualizador Premium:** Renderização de Markdown com destaque de código.
- [x] **Design Responsivo:** Navegação otimizada para mobile via Sheets.

### Ada AI (Versão 1.0)
- [x] **Chat Contextual:** RAG (Retrieval-Augmented Generation) integrado ao banco de dados.
- [x] **Interface Split-view:** Painel lateral ajustável para não perder o foco.
- [x] **Atalho ELI5:** Explicações simplificadas automáticas.

### Gamificação (Base)
- [x] **Sistema de XP:** Ganho de pontos por leitura concluída.
- [x] **Sistema de Ofensivas:** Rastreamento de dias seguidos de estudo.
- [x] **Dashboard de Progresso:** Página de perfil transformada em central de estatísticas.

---

## 🚩 Pendências (Backlog do PRD)

### 📈 Motor de Tendências (Próximo Grande Marco)
- [ ] **TrendHeatmap:** Componente visual de calor para recorrência de temas.
- [ ] **Roadmap Dinâmico:** Algoritmo da Ada para sugerir trilhas de estudo.
- [ ] **Perfil de Lacuna:** Comparativo visual "O que eu li" vs "O que cai".

### 🧠 Flashcards e Memorização (SRS)
- [ ] **Ada Flashcards:** Geração automática de cards via IA após leitura.
- [ ] **Interface de Revisão:** Sistema de repetição espaçada (Repetir/Fácil/Difícil).

### 🛠️ Gestão e Curadoria (Admin)
- [ ] **Painel Administrativo:** CRUD de resumos e categorias.
- [ ] **Calibrador de Pesos:** Interface para ajustar importância estatística dos temas.

### 🎨 Polimentos e UX
- [ ] **Source Anchors:** Destaque no texto do resumo ao clicar nas fontes da Ada.
- [ ] **Medalhas e Conquistas:** Visualização de badges no perfil por marcos atingidos.

---

## 📝 Notas de Versão (Sessão Atual)
- Ajustada a visibilidade do cadeado: oculto para Premium, visível com animação para Free.
- Slogan da Home corrigido e animado com efeito de digitação sequencial.
- Gamificação (XP/Streak) totalmente integrada ao fluxo de estudo.
