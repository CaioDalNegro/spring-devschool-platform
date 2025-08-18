package br.com.codeacademyia.codeacademy.repository;

import br.com.codeacademyia.codeacademy.model.Professor;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfessorRepository extends JpaRepository<Professor, UUID> {

    boolean existsByEmailAndSenha(String email, String senha);
}