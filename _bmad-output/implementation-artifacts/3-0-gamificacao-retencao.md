# Épico 3: Gamificação e Retenção

Este épico foca em transformar o estudo passivo em uma experiência engajadora através de sistemas de recompensa, visualização de progresso e gatilhos de retenção.

## Objetivo
- Implementar um sistema de XP e níveis baseado no consumo de conteúdo.
- Rastrear a consistência do aluno via Streaks (sequências diárias).
- Criar um Dashboard de Progresso visualmente impactante.

## User Stories
- **Story 3.1: Sistema de Progressão (XP)**
  - Como aluno, quero ganhar pontos ao ler um resumo completo para sentir meu progresso.
- **Story 3.2: Consistência de Estudo (Streaks)**
  - Como aluno, quero manter uma sequência diária para me manter motivado.
- **Story 3.3: Dashboard Mobile-First**
  - Como aluno, quero ver meu nível, medalhas e estatísticas em um painel "Premium-High".

## Tasks / Subtasks

- [x] Task 1: Infraestrutura de Gamificação (Database)
  - [x] 1.1: Adicionar campos `xp` e `streak` na tabela `profiles`.
  - [x] 1.2: Criar tabela `study_logs` para rastrear conclusões de resumos.
  - [x] 1.3: Rodar migrations do Drizzle. (Geradas, pendente aplicação manual se DB estiver off)

- [x] Task 2: Lógica de Recompensa (Server Actions)
  - [x] 2.1: Criar Server Action `completeSummaryAction` para registrar estudo e conceder XP.
  - [x] 2.2: Implementar lógica de cálculo de nível baseado em XP acumulado.
  - [x] 2.3: Validar duplicidade (XP concedido apenas 1x por resumo).

- [x] Task 3: Interface de Gamificação (UI/UX)
  - [x] 3.1: Criar componente `XPProgressCard` para o perfil.
  - [x] 3.2: Criar `StreakCard` focado em retenção.
  - [x] 3.3: Adicionar botão "Marcar como Concluído" com animação de Confetti nos resumos.

- [x] Task 4: Dashboard de Impacto
  - [x] 4.1: Refatorar a `/profile` para se tornar um Dashboard de Estudo funcional.
  - [x] 4.2: Implementar estatísticas reais de temas concluídos.

## Design Aesthetic (Premium-High)
- Uso de gradientes metálicos para níveis (Bronze, Prata, Ouro, Platina).
- Efeitos de brilho e reflexo em cards de conquista.
- Micro-interações suaves ao ganhar XP.
