# Foca na TI - Guia de Desenvolvimento do Novo Projeto

> "Aprenda com o passado, foque no futuro."

Este documento serve como a Especificação de Requisitos e Roadmap para a construção do **Foca na TI** do zero, integrando as melhores funcionalidades do projeto anterior e corrigindo as falhas técnicas encontradas.

---

## 🎯 1. Requisitos Funcionais (O Coração da Ferramenta)

### 1.1. Biblioteca de Estudo Inteligente
- **Base de Resumos**: Suporte a Markdown e HTML rico, organizado por categorias hierárquicas (ex: Redes -> Protocolos -> TCP/IP).
- **IA Assistant (Ada)**: Chat integrado em cada tópico para tirar dúvidas em tempo real, gerar exemplos práticos e criar analogias (ELI5).
- **Favoritos e Histórico**: Sistema de marcação de tópicos lidos e favoritagem para revisão rápida.

### 1.2. Prática e Fixação
- **Quizzes Dinâmicos**: Questões com feedback imediato, explicação da resposta e níveis de dificuldade.
- **Flashcards (SRS)**: Implementação de Repetição Espaçada (estilo Anki) para memorização de termos técnicos e siglas.
- **Simulados de Concursos**: Provas baseadas em editais específicos (CEBRASPE, FGV, etc.) com cronômetro e ranking.

### 1.3. Gamificação e Engajamento
- **Progressão de XP**: Pontuação por leitura, conclusão de quizzes e desafios diários.
- **Streaks (Ofensivas)**: Contador de dias consecutivos de estudo para incentivar a disciplina.
- **Achievements**: Sistema de medalhas ("Mestre das Redes", "Guerreiro do SQL") para celebrar marcos.
- **Leaderboard**: Ranking global e entre amigos para fomentar a competição saudável.

---

## 🚀 2. Sugestões de Melhorias (Específicas para Alunos de TI)

### 2.1. Gestão de Desempenho
- **Mapa de Calor de Conhecimento**: Visualização de quais matérias o aluno domina e quais precisa reforçar.
- **Foco em Editais**: Ferramenta de "Checklist de Edital" que vincula o conteúdo estudado às exigências de um concurso específico.

### 2.2. Novas Mídias e Ferramentas
- **Visualizador de Mapas Mentais**: Integração nativa com mapas mentais interativos para cada tópico.
- **Podcast de Estudo (TTS)**: Conversão de resumos em áudio para que o aluno possa estudar enquanto se desloca.
- **Modo Offline (PWA)**: Capacidade de salvar tópicos para leitura offline.

---

## 🛠️ 3. Lições Aprendidas (Aprendendo com os Erros)

### 3.1. Arquitetura de Banco de Dados (Supabase/PostgreSQL)
- **IDs e Slugs**: **NUNCA** usar `text` como Primary Key para conteúdo. Usar `UUID` ou `BIGINT` para IDs internos e um campo `unique slug` para as URLs. Isso evita quebras em chaves estrangeiras ao renomear tópicos.
- **Triggers de Auth**: Garantir que o trigger de criação do `profile` seja resiliente a falta de metadados (`COALESCE`), evitando erros 500 no cadastro.
- **Tipagem Consistente**: Manter consistência absoluta entre tipos de dados (evitar misturar `uuid` e `bigint` em chaves relacionadas).

### 3.2. Infraestrutura e Deployment (Coolify/Nginx)
- **Nginx Sem Mistérios**: Não usar nomes de containers manuais que mudam com o UUID do Coolify. Usar endereços internos estáveis (FQDN) ou IPs internos.
- **Variáveis de Build**: No Vite, as variáveis de ambiente (VITE_*) devem ser configuradas como **Build Variables** no Coolify, ou não estarão presentes no código compilado.
- **Migrações Organizadas**: Usar um sistema de migração numerado (ex: `0001_initial.sql`, `0002_add_cols.sql`) para garantir que o ambiente de produção e local estejam sempre sincronizados.

---

## 📅 4. Roadmap de Desenvolvimento (Visão Inicial)

### Fase 1: Fundação (Semanas 1-2)
- Setup do repositório com Vite 7 e Tailwind 4.
- Modelagem do banco de dados (Schema v2).
- Sistema de autenticação e perfis robusto.

### Fase 2: Conteúdo e Estudo (Semanas 3-4)
- Upload da base inicial de resumos.
- Integração com Gemini para resumos e chat Ada.
- Implementação dos Quizzes e Flashcards básicos.

### Fase 3: Gamificação e Análise (Semanas 5-6)
- Sistema de XP, Níveis e Streaks.
- Dashboard de desempenho por disciplina.
- Simulados temporizados.

### Fase 4: Polimento e Lançamento (Semanas 7-8)
- PWA (Estudo Offline).
- Melhorias de UX/UI Pro Max.
- Deploy final em produção com infraestrutura estável.
