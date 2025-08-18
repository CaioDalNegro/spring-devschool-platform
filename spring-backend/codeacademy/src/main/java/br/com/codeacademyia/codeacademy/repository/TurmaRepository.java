package br.com.codeacademyia.codeacademy.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.codeacademyia.codeacademy.model.Turma;

public interface TurmaRepository extends JpaRepository<Turma, Long> {
}
