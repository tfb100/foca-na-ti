---
title: "Product Brief Distillate: Foca na TI - Concursos"
type: llm-distillate
source: "product-brief-foca-na-ti-concursos.md"
created: "2026-04-18T00:56:00Z"
purpose: "Token-efficient context for downstream PRD creation"
---

## Requisitos e Funcionalidades (Hints)
- **Ada AI ELI5/Contextual**: Chat integrado que deve "ler" o conteúdo do tópico. Comandos sugeridos: "Simplifique", "Dê um exemplo prático", "Como isso cai na prova?".
- **Sistema de Gamificação**: XP, Níveis, Streaks (Ofensivas), Medalhas (Achievements), Leaderboard.
- **Biblioteca Hierárquica**: Organização multinível (Ex: Redes > Protocolos > TCP/IP). Suporte a Markdown e HTML.
- **Prática SRS**: Flashcards com repetição espaçada (estilo Anki) integrados.
- **Dashboard de Desempenho**: Mapa de calor de conhecimento (matérias dominadas vs. reforço) e Tracker de Editais.
- **Monetização**: Sistema de Assinatura (Subscription model).

## Contexto Técnico e Restrições
- **Stack**: React 19, Vite 7, Tailwind 4, Supabase (Auth/Postgres/Storage), TanStack Query v5.
- **Banco de Dados**: PostgreSQL Relacional Puro no Supabase. **Obrigatório**: UUID/BigInt para PKs, Unique Slugs para URLs. Proibido o uso de Strings como PK para conteúdo.
- **Deployment**: Coolify/VPS. Variáveis de ambiente Vite devem ser Build Variables. Nginx com FQDN ou IPs internos estáveis (evitar UUIDs dinâmicos de containers).
- **Legado**: Partir do zero absoluto. **Não haverá migração de dados** do projeto antigo (para evitar importação de má arquitetura).

## Inteligência Competitiva
- **Concorrentes (Estratégia, Gran, TEC, QC)**: São focados em escala generalista (PDF/Vídeo).
- **Oportunidade Foca na TI**: Especialista de "Sniper" em TI. A IA ada não é um extra, é o motor da página. Automação futura baseada em coleta de provas para priorizar tendências.

## Decisões e Ideias Rejeitadas
- **Rejeitado**: Migração de dados legado (Racional: Evitar dívida técnica e arquitetura legada).
- **Rejeitado**: Chaves primárias de texto manual (Racional: Inconsistência de integridade).
- **Aceito (Ideia Futura)**: Curadoria Comunitária (Gamificar a criação de conteúdo pelos alunos).

## Questões em Aberto
- Nomes exatos das faixas de preço/planos de assinatura.
- Definição da lista prioritária de disciplinas para o lançamento (Manual).
- Critérios exatos para ganho de XP (leitura vs. acerto de questões).
