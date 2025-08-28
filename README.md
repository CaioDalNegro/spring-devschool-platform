# CodeAcademy AI - Plataforma de Cursos de Programação

Este é um projeto de plataforma online para escolas de programação. A missão é criar um sistema completo que permita que professores criem cursos, turmas e desafios de programação, enquanto alunos podem se inscrever, enviar código e receber avaliação automática via Inteligência Artificial.

---

## 1. Introdução

O **CodeAcademy AI** visa transformar o ensino de programação, oferecendo um ambiente online onde o aprendizado é dinâmico, interativo e mensurável. O projeto será dividido em **frontend React.js** e **backend Java Spring Boot**, com comunicação via APIs REST.

---

## 2. Definição do Desafio

Você deve criar um sistema web completo hospedado em GitHub/GitLab, com funcionalidades para professores e alunos, seguindo as instruções abaixo.

### 2.1. Restrições Técnicas

O projeto:

- DEVE estar no GitHub ou GitLab.
- NÃO DEVE fazer fork de outro projeto.
- DEVE ter commits regulares mostrando evolução (mínimo 3 commits por funcionalidade).
- DEVE seguir boas práticas de código, organização e documentação.
- DEVE ter backend em **Spring Boot** com banco de dados relacional (**PostgreSQL/MySQL**).
- DEVE aceitar e responder com JSON para todas as requisições do frontend.
- DEVE implementar autenticação **JWT** e autorização por tipo de usuário (Aluno / Professor).
- DEVE armazenar dados persistentes no banco (não somente em memória).
- DEVE ser acessível via frontend React.js responsivo.

---

## 2.2. Funcionalidades Principais

### 2.2.1. Autenticação
- **POST /auth/login**: Login de usuário (Aluno ou Professor).
- **POST /auth/register**: Registro de usuário.
- Tokens JWT devem ser usados para autenticação em todas as rotas protegidas.

---

### 2.2.2. Gerenciamento de Cursos (Professor)
- **POST /courses**: Criar novo curso.
- **GET /courses**: Listar cursos do professor.
- **PUT /courses/{id}**: Atualizar informações do curso.
- **DELETE /courses/{id}**: Remover curso.

---

### 2.2.3. Gerenciamento de Turmas (Professor)
- **POST /classes**: Criar turma dentro de um curso.
- **GET /classes/{courseId}**: Listar turmas de um curso.
- **PUT /classes/{id}**: Atualizar turma.
- **DELETE /classes/{id}**: Remover turma.

---

### 2.2.4. Gerenciamento de Desafios (Professor)
- **POST /challenges**: Criar desafio dentro de uma turma.
- **GET /challenges/{classId}**: Listar desafios da turma.
- **PUT /challenges/{id}**: Atualizar desafio.
- **DELETE /challenges/{id}**: Remover desafio.

---

### 2.2.5. Submissão de Código (Aluno)
- **POST /submissions**: Submeter código para avaliação da IA.
  - Campos obrigatórios: `alunoId`, `challengeId`, `codigo`, `linguagem`.
- **GET /submissions/{challengeId}**: Listar submissões do aluno para determinado desafio.
- IA deve retornar:
  - Status de compilação.
  - Resultados de testes.
  - Feedback sobre performance e boas práticas.

---

### 2.2.6. Ranking e Progresso (Aluno)
- **GET /ranking/{classId}**: Ranking dos alunos na turma.
- **GET /progress/{alunoId}**: Progresso individual com desafios concluídos, pontos e medalhas.

---

## 3. Extras (Desejáveis)

- Testes automatizados (unitários e de integração) para backend.
- Containerização com Docker (backend, banco de dados e sandbox de execução de código).
- Logs detalhados e healthcheck endpoint.
- Documentação da API (Swagger/OpenAPI ou similar).
- Configuração do sistema via arquivo YAML/JSON (ex: quantidade de testes, limite de submissões, etc).
- Suporte a múltiplas linguagens de programação (Java, Python, C++, etc).

---

## 4. Tecnologias Recomendadas

### Frontend:
- React.js / Vite
- React Router
- Axios
- Tailwind CSS
- Monaco Editor (editor de código online)
- Context API ou Redux Toolkit

### Backend:
- Java Spring Boot
- Spring Web, Spring Data JPA, Spring Security, JWT
- PostgreSQL ou MySQL
- Lombok
- Docker (para sandbox de execução de código)

---

## 5. Observações Finais

- Não existe uma única forma de implementar; serão avaliados **qualidade do código, organização, testes e documentação**.
- Priorize **segurança**, **performance** e **boa experiência do usuário**.
- É altamente recomendável implementar **feedback imediato da IA** para os alunos, gamificação e painel de progresso.
- Documente como **compilar, rodar e testar** o projeto para que qualquer pessoa consiga executar localmente ou em ambiente de produção.
