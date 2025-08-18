package br.com.codeacademyia.codeacademy.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.codeacademyia.codeacademy.model.Aluno;

public interface AlunoRepository extends JpaRepository<Aluno, UUID> {

    boolean existsByEmailAndSenha(String email, String senha);
}