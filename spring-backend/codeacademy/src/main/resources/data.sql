-- ==========================================
-- TABELAS
-- ==========================================

-- CREATE TABLE aluno(
-- 	id_aluno UUID PRIMARY KEY,
--     email VARCHAR(100) UNIQUE NOT NULL,
--     nome VARCHAR(100) NOT NULL,
-- 	senha VARCHAR(100) NOT NULL UNIQUE
-- );

-- CREATE TABLE professor(
-- 	id_professor UUID PRIMARY KEY,
--     email VARCHAR(100) UNIQUE NOT NULL,
--     nome VARCHAR(100) NOT NULL,
-- 	senha VARCHAR(100) NOT NULL UNIQUE
-- );

-- CREATE TABLE curso(
-- 	id_curso UUID PRIMARY KEY,
-- 	nome VARCHAR(100) NOT NULL,
-- 	descricao VARCHAR(100),
-- 	id_professor UUID NOT NULL REFERENCES professor(id_professor)
-- );

-- CREATE TABLE turma (
--     id_turma UUID PRIMARY KEY,
--     id_curso UUID NOT NULL,
--     nome_turma VARCHAR(100) NOT NULL,
--     qtd_alunos INT DEFAULT 0,
--     qtd_desafios INT DEFAULT 0,
--     FOREIGN KEY (id_curso) REFERENCES curso(id_curso)
--         ON DELETE CASCADE
-- );

-- CREATE TABLE turma_aluno (
--     id_turma UUID NOT NULL REFERENCES turma(id_turma) ON DELETE CASCADE,
--     id_aluno UUID NOT NULL REFERENCES aluno(id_aluno) ON DELETE CASCADE,
--     data_matricula DATE,
--     PRIMARY KEY (id_turma, id_aluno)
-- );

-- CREATE TABLE atividade (
-- 	id_atividade UUID NOT NULL PRIMARY KEY,
-- 	id_turma UUID NOT NULL REFERENCES turma(id_turma) ON DELETE CASCADE,
-- 	titulo VARCHAR(100) NOT NULL,
-- 	descricao VARCHAR(100) NOT NULL,
-- 	data_entrega DATE NOT NULL,
--     data_publicacao DATE NOT NULL,
--     caminho VARCHAR(255)
-- );

-- CREATE TABLE turmaAtividade(
-- 	id_turma UUID NOT NULL REFERENCES turma(id_turma) ON DELETE CASCADE,
--     id_atividade UUID NOT NULL REFERENCES atividade(id_atividade) ON DELETE CASCADE,
--     PRIMARY KEY (id_turma, id_atividade)
-- );

-- CREATE TABLE aulas(
-- 	id_aula UUID UNIQUE NOT NULL PRIMARY KEY,
-- 	id_turma UUID NOT NULL REFERENCES turma(id_turma),
-- 	titulo VARCHAR(255) NOT NULL,
-- 	descricao VARCHAR(255),
-- 	data_publicacao DATE NOT NULL,
-- 	caminho VARCHAR(255)
-- );