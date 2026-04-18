---
stepsCompleted: ['step-01-init', 'step-02-discovery', 'step-02b-vision', 'step-02c-executive-summary', 'step-03-success']
inputDocuments: 
  - '_bmad-output/planning-artifacts/product-brief-foca-na-ti-concursos.md'
  - '_bmad-output/planning-artifacts/product-brief-foca-na-ti-concursos-distillate.md'
  - 'c:/Users/Thiago/Site - Resumos de TI/Documentação técnica atualizada.md'
workflowType: 'prd'
classification:
  projectType: 'web_app'
  domain: 'edtech'
  complexity: 'medium'
  projectContext: 'brownfield'
documentCounts:
  briefCount: 1
  researchCount: 0
  brainstormingCount: 0
  projectDocsCount: 1
---

# Product Requirements Document - Foca na TI - Concursos

**Author:** Thiago
**Date:** 2026-04-18

## Executive Summary

O **Foca na TI - Concursos** é uma plataforma de estudo de nicho projetada para transformar a preparação de candidatos da área de Tecnologia da Informação. O sistema resolve a fragmentação de materiais e a complexidade técnica excessiva através de uma biblioteca de resumos otimizada e integrada a uma IA contextual ativa. O foco do MVP é estabelecer o fluxo principal de consumo de conteúdo assistido, preparando o terreno para uma plataforma gamificada e autossustentável.

### What Makes This Special

O diferencial reside na **Ada AI**, que atua como um tutor ELI5 (*Explain Like I'm 5*) especializado em bibliografias de concursos de TI. Além disso, a plataforma utiliza uma estratégia de conteúdo baseada em dados: a transição da curadoria manual para o mapeamento automatizado de tendências de provas passadas garante que o aluno estude o que possui maior probabilidade estatística de cair, eliminando o desperdício de tempo com tópicos irrelevantes.

## Project Classification

- **Projeto:** Web App (Next.js/React)
- **Domínio:** EdTech (Educação & Concursos)
- **Complexidade:** Média (Integração de IA + Sistemas de Retenção)
- **Contexto:** Brownfield (Reconstrução v2 focada em escalabilidade e integridade de dados)

## Success Criteria

### User Success

*   **O "Aha!" do Aluno:** O aluno consegue esclarecer uma dúvida técnica complexa via **Ada AI** em menos de 1 minuto sem sair da página de estudo.
*   Taxa de conclusão de leitura de tópicos (Resumos) superior a 70%.
*   **Métrica de Retenção:** Alunos ativos realizando pelo menos 3 sessões de estudo por semana.

### Business Success

*   Conversão de usuários free para premium (assinatura).
*   Meta de **1.000 assinantes ativos** nos primeiros 6 meses pós-lançamento.
*   Custo de aquisição (CAC) reduzido através do engajamento orgânico com a IA.

### Technical Success

*   Integridade referencial de 100% (uso estrito de UUIDs e slugs, sem órfãos de Auth).
*   Latência da Ada AI inferior a 2 segundos para respostas iniciais (via streaming).
*   Disponibilidade da plataforma de 99.9% via infraestrutura Coolify.

### Measurable Outcomes

*   Aumento do tempo de permanência na plataforma por sessão (target: > 15 min).
*   Redução da taxa de suporte humano via esclarecimento preventivo pela Ada AI.

## Product Scope

### MVP - Minimum Viable Product

*   **Autenticação e Perfis**: Login/Cadastro via Supabase Auth e perfis de usuário resilientes.
*   **Biblioteca de Conteúdo**: Navegação em tópicos de TI com exibição em Markdown/HTML.
*   **Ada AI Contextual**: Integração de chat que consome o contexto do resumo atual para suporte ELI5 e exemplos práticos.
*   **Gestão de Assinatura**: Integração básica com gateway de pagamento para planos recorrrentes.

### Growth Features (Post-MVP)

*   **Gamificação Completal**: Sistema de XP, Níveis, Streaks (Ofensivas) e Medalhas.
*   **Quizzes Integrados**: Questões de múltipla escolha vinculadas aos tópicos de estudo.
*   ** Flashcards (SRS)**: Algoritmo de repetição espaçada para memorização de longo prazo.
*   **Curadoria Comunitária**: Fluxo para que alunos de elite possam sugerir correções ou novos resumos.

### Vision (Future)

*   **Engine de Análise de Editais**: Automação via IA para mapear tendências de conteúdo baseadas em provas reais.
*   **Ecossistema de Revisão Dinâmico**: Geração de Mapas Mentais via IA e podcasts TTS personalizados para a trilha do aluno.
