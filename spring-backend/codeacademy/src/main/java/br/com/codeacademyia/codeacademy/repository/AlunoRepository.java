package br.com.codeacademyia.codeacademy.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.codeacademyia.codeacademy.model.Aluno;

public interface AlunoRepository extends JpaRepository<Aluno, Long> {

    boolean existsByEmailAndSenha(String email, String senha);
}