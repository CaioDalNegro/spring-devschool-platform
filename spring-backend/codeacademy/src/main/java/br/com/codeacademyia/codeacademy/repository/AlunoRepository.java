package br.com.codeacademyia.codeacademy.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.codeacademyia.codeacademy.model.Aluno;

public interface AlunoRepository extends JpaRepository<Aluno, UUID> {
    Aluno findByEmail(String email);
    Optional<Aluno> findByEmailAndSenha(String email, String senha);
}