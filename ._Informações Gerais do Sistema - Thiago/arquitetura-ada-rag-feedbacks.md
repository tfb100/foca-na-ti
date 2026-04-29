# Entendendo a Arquitetura da Ada (RAG) e o Fluxo de Feedbacks

Este documento serve para compilar os conceitos de arquitetura do backend do projeto "Foca na TI", detalhando como a IA (Ada) processa as informações das aulas, e como o sistema lida com os feedbacks (Likes/Dislikes) dos usuários.

---

## 1. O Nosso Sistema é um RAG?

**Sim! O nosso projeto utiliza a arquitetura RAG (Retrieval-Augmented Generation).** 

No mundo da Inteligência Artificial, o RAG é um método em que a IA recebe informações de um banco de dados externo para melhorar suas respostas, em vez de depender apenas do conhecimento com o qual foi originalmente treinada.

A essência de um sistema RAG é composta por três passos:
1. **Retrieval (Recuperação):** Buscar informações em uma base de dados externa.
2. **Augmented (Aumento/Injeção):** Pegar essa informação recuperada e "injetar" junto com a pergunta do usuário no prompt que é enviado para a IA.
3. **Generation (Geração):** A IA gera a resposta baseada nesses fatos que acabaram de ser entregues a ela.

No projeto **Foca na TI**, quando o usuário está lendo uma aula (ex: "Protocolo TCP/IP") e faz uma pergunta para a Ada:
- O backend usa o ID da matéria para puxar o texto inteiro da aula do banco de dados (PostgreSQL).
- Injetamos esse texto nas instruções da Ada no exato momento da pergunta.
- A Ada gera uma resposta fiel à matéria que o usuário está estudando.

### RAG Determinístico vs RAG Semântico (Vector DB)
Existem diferentes níveis de RAG:
*   **RAG Determinístico / Context-Aware RAG (A nossa arquitetura atual):** Nós sabemos exatamente qual documento recuperar porque o usuário está "dentro" dele lendo a matéria. Puxamos a aula exata através do ID (`summaryId`). É extremamente rápido, barato, preciso e não tem chance de a IA misturar aulas diferentes.
*   **Vector RAG / RAG Semântico:** Usado quando existem milhares de PDFs/Documentos. O sistema converte a pergunta em números (Embeddings), procura em um "Banco de Dados Vetorial" por semelhança matemática, e envia pequenos parágrafos avulsos para a IA. Não usamos essa versão por não ser necessária no momento.

---

## 2. Fluxo de Aprendizado e Feedbacks (Likes/Dislikes)

Na interface do chat da Ada, o usuário pode dar um "Like" (Curtir) ou "Dislike" (Não Curtir) nas respostas, além de poder deixar uma nota por escrito sobre o porquê do feedback.

### Como funciona hoje (Fluxo de Curadoria)?
O aprendizado da Ada **não é retroativo automático para ela mesma em tempo real**.

1. **Salvamento no Banco:** A ação de Like/Dislike salva um registro na tabela `ai_feedbacks` contendo:
   - Quem é o usuário (`profileId`)
   - Em qual matéria estava (`summaryId`)
   - A pergunta (`userPrompt`)
   - A resposta da Ada (`adaResponse`)
   - O tipo de feedback (`like` ou `dislike`)
   - Uma nota opcional (`feedbackNote`)
2. **A IA não lê esses dados automaticamente:** Se o usuário fizer uma nova pergunta 5 segundos depois, a Ada **não** consultará a tabela de `ai_feedbacks` para compor a nova resposta. Inserir esse histórico vetorial para cada pergunta deixaria o sistema lento e muito caro devido à quantidade de *tokens* gerados desnecessariamente.

### O Fluxo Ideal Planejado
A tabela `ai_feedbacks` foi projetada para ser uma ferramenta de **Curadoria e Fine-Tuning** sob supervisão:

- **Auditoria Humana (Desenvolvedores/Professores):** Consultar os `Dislikes` no banco ajuda os curadores de conteúdo a identificar lacunas nos resumos (Ex: "A Ada não soube explicar a camada OSI pois não estava claro no texto base"). A equipe humana vai lá e ajusta a matéria.
- **Fine-Tuning Futuro:** Com o acúmulo de dados, é possível exportar um pacote com milhares de interações com `Like` para "treinar" um modelo dedicado (Fine-Tuning) ou usar para criar *Few-Shot Prompting*, ensinando definitivamente o modelo base como ele deve soar e estruturar as respostas.

### Resumo
A injeção do resumo da aula é o que garante que nosso projeto é um RAG. O botão de Feedback é, atualmente, uma ferramenta de métrica de qualidade para a equipe que gerencia a plataforma, servindo de pilar para o futuro aprimoramento em massa da inteligência artificial.
