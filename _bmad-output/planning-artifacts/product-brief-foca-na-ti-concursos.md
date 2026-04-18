---
title: "Product Brief: Foca na TI - Concursos"
status: "complete"
created: "2026-04-18T00:52:00Z"
updated: "2026-04-18T00:56:00Z"
inputs: 
  - "c:/Users/Thiago/Site - Resumos de TI/Foca na TI - Novo projeto.md"
  - "c:/Users/Thiago/Site - Resumos de TI/Documentação técnica atualizada.md"
  - "c:/Users/Thiago/Site - Resumos de TI/supabase/migrations/20260209110000_fix_slug_and_quiz_schema.sql"
---

# Product Brief: Foca na TI - Concursos

## Executive Summary

O **Foca na TI - Concursos** é uma plataforma de estudo especializada para candidatos da área de Tecnologia da Informação (TI) em concursos públicos brasileiros. Ao contrário de plataformas generalistas, o sistema oferece uma experiência de nicho, combinando uma biblioteca de resumos técnicos estruturados com a **Ada**, uma assistente de IA integrada que explica conceitos complexos em tempo real e gera exemplos práticos.

O projeto surge de uma reconstrução total (v2), iniciando do zero absoluto para garantir uma arquitetura profissional e escalável, corrigindo as falhas do legado. A sustentabilidade será baseada em um modelo de **assinatura**, onde o valor central reside na organização, praticidade e acompanhamento da evolução através de um sistema gamificado.

## O Problema

Candidatos a cargos de TI enfrentam um volume esmagador de conteúdo altamente volátil. As dores principais são:
1. **Fadiga de Conteúdo Generalista**: Materiais atuais são densos e não otimizados para a velocidade de consulta de TI.
2. **IA Desconexa**: Chatbots genéricos não têm o contexto do material de estudo, gerando respostas rasas.
3. **Falta de Fixação Integrada**: A necessidade de usar múltiplas ferramentas (PDFs, Anki,Sites de Questões) gera perda de produtividade.
4. **Legado Técnico Frágil**: O sistema anterior carecia de uma fundação relacional sólida, dificultando a experiência do usuário e a manutenção.

## A Solução

O Foca na TI v2 consolida o estudo em um ambiente "resiliente por design":
- **Biblioteca Estruturada**: Conteúdo Markdown/HTML organizado hierarquicamente.
- **Ada AI (ELI5/Contextual)**: IA integrada que simplifica termos técnicos e cria analogias no contexto de concursos.
- **Estratégia de Conteúdo Evolutiva**: Inicialmente curado de forma manual, evoluindo para uma automação baseada na análise de provas reais para identificar tendências de conteúdo ("o que mais cai").
- **Gamificação e Retenção**: Sistema focado em mostrar o progresso e a evolução do aluno, gerando engajamento contínuo.

## O Que Nos Torna Diferentes

- **Especialismo de Nicho**: Foco 100% no ecossistema de TI para concursos.
- **Integração Profunda com IA**: A Ada é um componente central, não um widget externo.
- **Curadoria Inteligente**: Uso de dados de provas passadas para priorizar o que o aluno estuda.
- **Arquitetura de Próxima Geração**: Uso estrito de chaves UUID, relacionamentos consistentes no PostgreSQL e infra profissional (Coolify/Nginx).

## Usuários-Alvo

- **Concurseiros de TI em Fase de Revisão**: Precisam de resumos rápidos e suporte de IA para dúvidas específicas de bancas (CEBRASPE, FGV, FCC).
- **Iniciantes em TI**: Precisam de linguagem acessível (ELI5) para conceitos técnicos complexos.

## Critérios de Sucesso

- **Volume de Assinantes**: Crescimento da base pagante (meta de 1.000 usuários ativos).
- **Retenção de Tempo**: Aumento do tempo de permanência diária na plataforma.
- **Eficácia de Estudo**: Engajamento contínuo com a Ada e conclusão de trilhas de conteúdo.

## Scope (MVP)

### IN (Lançamento)
- **Consulta de Conteúdos assistida pela Ada**: Foco total na experiência de leitura e suporte de IA contextual.
- Sistema de Autenticação e Perfis robusto (Supabase).
- Arquitetura de Dados Profissional (Zero migração de dados antigos, novo schema relacional).

### OUT (Roadmap)
- Gamificação (XP, Medalhas, Leaderboard).
- Quizzes e Flashcards SRS (Anki-like).
- Curadoria Comunitária (Permitir que usuários contribuam com conteúdo).
- Podcast TTS e Mapas Mentais.

## Visão

Tornar-se o **Cérebro de Estudo do Candidato de TI**, evoluindo para um ecossistema autossustentável via Curadoria Comunitária e IA preditiva que mapeia exatamente o que cai em cada concurso.
